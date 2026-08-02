import type { APIRoute } from "astro";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { business } from "../../data/business";

// This route runs on demand (form POST), the rest of the site is static.
export const prerender = false;

/* ---- Abuse guards ----------------------------------------------------
   This endpoint is public and every accepted submission sends an SES
   email, so it needs caps: on payload size, on field lengths, and on
   submissions per IP. The limiter is in-memory, which is exactly right
   for the single-process standalone node server this deploys as. */
const MAX_BODY_BYTES = 20_000;
const MAX_FIELD = 200; // per short field (name, company, …)
const MAX_MESSAGE = 5_000;
const RATE_LIMIT = 5; // submissions…
const RATE_WINDOW_MS = 10 * 60_000; // …per IP per window

const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > cutoff);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [k, v] of hits) {
      if (!v.some((t) => t > cutoff)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT;
}

/** Client IP. Caddy appends the real client to X-Forwarded-For, so the
 *  last entry is the one our own proxy wrote (earlier ones are forgeable). */
function clientIp(request: Request, fallback: string): string {
  const xff = request.headers.get("x-forwarded-for");
  const last = xff?.split(",").pop()?.trim();
  return last || fallback;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

const isEmail = (v: string) => v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** JSON fields are attacker-controlled: coerce to string and cap length. */
const str = (v: unknown, max = MAX_FIELD): string =>
  (typeof v === "string" ? v : "").trim().slice(0, max);

function readEnv(key: string): string | undefined {
  const fromProcess =
    typeof process !== "undefined" ? process.env?.[key] : undefined;
  return fromProcess ?? (import.meta.env as Record<string, string | undefined>)[key];
}

let sesClient: SESv2Client | null = null;
const getSes = (region: string) => (sesClient ??= new SESv2Client({ region }));

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // The forms send JSON; anything else (e.g. a no-preflight text/plain
  // cross-site POST) has no business here.
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, error: "unsupported_media_type" }, 415);
  }

  let addr = "unknown";
  try {
    addr = clientIp(request, clientAddress);
  } catch {
    /* clientAddress can throw on prerendered/misconfigured setups */
  }
  if (rateLimited(addr)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ ok: false, error: "payload_too_large" }, 413);
    }
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }

  // Honeypot — silently accept and drop bot submissions.
  if (str(body.website) !== "") {
    return json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message, MAX_MESSAGE);

  // Message is optional (campaign lead forms keep friction low); name, a
  // valid email and the privacy consent are the hard requirements.
  if (!name || !email || !isEmail(email)) {
    return json({ ok: false, error: "validation" }, 422);
  }
  if (!body.consent) {
    return json({ ok: false, error: "consent" }, 422);
  }

  const campaign = str(body.campaign);
  const audience = str(body.audience);

  // Campaign leads carry extra attribution so we know which offer they chose.
  const subject = campaign
    ? `Lead offerta · ${audience || campaign} · ${name}`
    : `Nuovo contatto · ${name}`;
  const company = str(body.company);
  const phone = str(body.phone);
  const offer = str(body.offer);
  const price = str(body.price);
  const topic = str(body.topic);
  const budget = str(body.budget);
  const lang = str(body.lang);
  const lines = [
    `Nome: ${name}`,
    company ? `Azienda: ${company}` : null,
    `Email: ${email}`,
    phone ? `Telefono: ${phone}` : null,
    campaign ? `Campagna: ${campaign}` : null,
    audience ? `Target: ${audience}` : null,
    offer ? `Offerta scelta: ${offer}` : null,
    price ? `Prezzo: ${price}` : null,
    topic ? `Argomento: ${topic}` : null,
    budget ? `Budget: ${budget}` : null,
    lang ? `Lingua: ${lang}` : null,
    message ? "" : null,
    message || null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  // AWS SES. Credentials come from the standard provider chain
  // (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY env vars or an IAM role);
  // AWS_REGION is the toggle for "SES is configured".
  const region = readEnv("AWS_REGION") ?? readEnv("AWS_DEFAULT_REGION");
  const to = readEnv("CONTACT_TO_EMAIL") ?? business.email;
  const from = readEnv("CONTACT_FROM_EMAIL") ?? business.email;

  // No region configured (e.g. local dev) — log and succeed so the form is
  // testable end to end without AWS credentials.
  if (!region) {
    console.info("[contact] (no AWS_REGION — not sent via SES)\n" + lines);
    return json({ ok: true, delivered: false });
  }

  try {
    await getSes(region).send(
      new SendEmailCommand({
        FromEmailAddress: from,
        Destination: { ToAddresses: [to] },
        ReplyToAddresses: [email],
        Content: {
          Simple: {
            Subject: { Data: subject, Charset: "UTF-8" },
            Body: { Text: { Data: lines, Charset: "UTF-8" } },
          },
        },
      }),
    );
    return json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] SES error", err);
    return json({ ok: false, error: "send_failed" }, 502);
  }
};
