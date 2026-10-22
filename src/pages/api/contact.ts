import type { APIRoute } from "astro";
import { sendMail } from "../../lib/server/mail";
import { clientIp, isEmail, json, notJson, rateLimiter, readJson, str } from "../../lib/server/guard";

// This route runs on demand (form POST), the rest of the site is static.
export const prerender = false;

/* ---- Abuse guards ----------------------------------------------------
   Payload and field caps live in lib/server/guard.ts (shared with
   /api/referral); this form allows five submissions per IP per ten
   minutes. */
const MAX_MESSAGE = 5_000;
const rateLimited = rateLimiter(5, 10 * 60_000);

export const POST: APIRoute = async (context) => {
  const { request } = context;
  const wrongType = notJson(request);
  if (wrongType) return wrongType;
  // clientAddress is read lazily: its getter throws where it's unavailable.
  if (rateLimited(clientIp(request, () => context.clientAddress))) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }
  const body = await readJson(request);
  if (body instanceof Response) return body;

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
  // Collaboration proposals are not leads — keep them apart in the inbox.
  const subject =
    campaign === "collabora-con-noi"
      ? `Proposta di collaborazione · ${audience || "—"} · ${name}`
      : campaign
        ? `Lead offerta · ${audience || campaign} · ${name}`
        : `Nuovo contatto · ${name}`;
  const company = str(body.company);
  const phone = str(body.phone);
  const offer = str(body.offer);
  const price = str(body.price);
  const topic = str(body.topic);
  const budget = str(body.budget);
  const lang = str(body.lang);
  // The campaign landings add a few labelled answers of their own
  // ("Profilo: Web designer", "Siti dei clienti: 15"…).
  const details = Array.isArray(body.details)
    ? body.details.slice(0, 8).map((d) => str(d, 200)).filter(Boolean)
    : [];
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
    ...details,
    lang ? `Lingua: ${lang}` : null,
    message ? "" : null,
    message || null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const sent = await sendMail({ tag: "contact", subject, text: lines, replyTo: email });
  if (sent === "failed") {
    // 503, not 502: Cloudflare swaps an origin's 502/504 for its own
    // "Bad gateway" page, which hides this JSON and reads as an outage.
    return json({ ok: false, error: "send_failed" }, 503);
  }
  return json({ ok: true, delivered: sent === "sent" });
};
