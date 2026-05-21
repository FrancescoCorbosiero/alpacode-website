import type { APIRoute } from "astro";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { business } from "../../data/business";

// This route runs on demand (form POST), the rest of the site is static.
export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function readEnv(key: string): string | undefined {
  const fromProcess =
    typeof process !== "undefined" ? process.env?.[key] : undefined;
  return fromProcess ?? (import.meta.env as Record<string, string | undefined>)[key];
}

let sesClient: SESv2Client | null = null;
const getSes = (region: string) => (sesClient ??= new SESv2Client({ region }));

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = (await request.json()) as Record<string, string>;
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }

  // Honeypot — silently accept and drop bot submissions.
  if (body.website && body.website.trim() !== "") {
    return json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message || !isEmail(email)) {
    return json({ ok: false, error: "validation" }, 422);
  }

  const subject = `Nuovo contatto · ${name}`;
  const lines = [
    `Nome: ${name}`,
    body.company ? `Azienda: ${body.company}` : null,
    `Email: ${email}`,
    body.topic ? `Argomento: ${body.topic}` : null,
    body.budget ? `Budget: ${body.budget}` : null,
    body.lang ? `Lingua: ${body.lang}` : null,
    "",
    message,
  ]
    .filter(Boolean)
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
