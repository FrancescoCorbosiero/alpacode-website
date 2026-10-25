import type { APIRoute } from "astro";
import { sendMail } from "@shared/server/mail";
import { autoReply, replyAllowed } from "@shared/server/reply";
import { clientIp, isEmail, json, notJson, rateLimiter, readJson, str } from "@shared/server/guard";
import { CAL } from "../../data/site";

/* The studio's contact form (components/ContactForm.astro). On demand;
   the rest of the site is prerendered. Same guards and the same sender
   as the house's /api/contact: five submissions per IP per ten
   minutes, a honeypot, the privacy consent required. Without
   AWS_REGION the message is logged (grep "\[studio\]"). */
export const prerender = false;

const MAX_MESSAGE = 5_000;
const rateLimited = rateLimiter(5, 10 * 60_000);

export const POST: APIRoute = async (context) => {
  const { request } = context;
  const wrongType = notJson(request);
  if (wrongType) return wrongType;
  if (rateLimited(clientIp(request, () => context.clientAddress))) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }
  const body = await readJson(request);
  if (body instanceof Response) return body;
  if (str(body.website) !== "") return json({ ok: true }); // a bot

  const name = str(body.name);
  const email = str(body.email);
  if (!name || !email || !isEmail(email)) return json({ ok: false, error: "validation" }, 422);
  if (!body.consent) return json({ ok: false, error: "consent" }, 422);

  const topic = str(body.topic) || "—";
  const offer = str(body.offer);
  const lines = [
    `Nome: ${name}`,
    `Email: ${email}`,
    str(body.phone) ? `Telefono: ${str(body.phone)}` : null,
    str(body.company) ? `Attività: ${str(body.company)}` : null,
    `Argomento: ${topic}`,
    offer ? `Offerta scelta: ${offer}` : null,
    str(body.page) ? `Pagina: ${str(body.page)}` : null,
    "Da: studio.alpacode.it",
    "",
    str(body.message, MAX_MESSAGE) || "(nessun messaggio)",
  ].filter((l) => l !== null);

  const sent = await sendMail({
    tag: "studio",
    subject: `Studio · ${offer || topic} · ${name}`,
    text: lines.join("\n"),
    replyTo: email,
  });
  if (sent === "failed") return json({ ok: false, error: "send_failed" }, 503);
  // The person who wrote gets a reply in the studio's look (it doesn't
  // hold the answer up).
  if (replyAllowed(email)) {
    void sendMail(
      autoReply({
        site: "studio",
        lang: "it",
        name,
        email,
        about: offer || (topic !== "—" ? topic : undefined),
        message: str(body.message, MAX_MESSAGE),
        book: CAL,
        origin: context.site?.origin ?? "https://studio.alpacode.it",
      }),
    );
  }
  return json({ ok: true, delivered: sent === "sent" });
};
