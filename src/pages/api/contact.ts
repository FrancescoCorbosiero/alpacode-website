import type { APIRoute } from "astro";
import { sendMail } from "@shared/server/mail";
import { autoReply, replyAllowed } from "@shared/server/reply";
import { clientIp, isEmail, json, notJson, rateLimiter, readJson, str } from "@shared/server/guard";
import { CAL_LINK, CAL_ORIGIN } from "../../lib/calcom";

// This route runs on demand (form POST), the rest of the site is static.
export const prerender = false;

/* ---- Abuse guards ----------------------------------------------------
   Payload and field caps live in shared/server/guard.ts (shared with
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
    // One address, every form of the site (the contact page and the
    // landings): trying them all in a row hits it.
    console.warn("[contact] rate limited: more than 5 in 10 minutes from one address");
    return json({ ok: false, error: "rate_limited" }, 429);
  }
  const body = await readJson(request);
  if (body instanceof Response) return body;

  // Honeypot: a bot (or an autofill that wrote in it) — answer ok, send
  // nothing, but leave a trace: a real lead taken for a bot is found in
  // the log, never lost without one.
  if (str(body.website) !== "") {
    console.warn(
      `[contact] honeypot filled (${JSON.stringify(str(body.website, 80))}): taken for a bot, not mailed — ${str(body.name)} <${str(body.email)}>, ${str(body.campaign) || "contatti"}`,
    );
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
  // The person who wrote gets a reply in the site's look; it doesn't
  // hold the answer up, and its failure (an SES sandbox) costs nothing.
  if (replyAllowed(email)) {
    void sendMail(
      autoReply({
        site: "house",
        lang: lang === "en" ? "en" : "it",
        name,
        email,
        about: topic || audience || undefined,
        message,
        book: `${CAL_ORIGIN}/${CAL_LINK}`,
        origin: context.site?.origin ?? "https://alpacode.it",
      }),
    );
  }
  return json({ ok: true, delivered: sent === "sent" });
};
