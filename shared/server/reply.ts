/* ============================================================
   The auto-reply: what the person who wrote gets back, in the voice
   and the look of the site they wrote from. alpacode.it: paper, ink
   and its blue, square corners, formal (IT and EN). Alpacode Studio:
   ink and volt, rounded, its own register (IT).
   HTML that holds in every client (tables, inline styles, the brand's
   faces with web-safe fallbacks), the same words as plain text.
   Off with CONTACT_AUTOREPLY=0. Two a day per address at most: a form
   can't be used to flood someone else's inbox.
   ============================================================ */
import type { Lang } from "../i18n";
import { business } from "../data/business";
import { readEnv } from "./env";
import { rateLimiter } from "./guard";
import type { Mail } from "./mail";

export type Site = "house" | "studio";

export interface ReplyInput {
  site: Site;
  lang: Lang;
  name: string;
  email: string;
  /** What it's about, as the person picked it (a topic, an offer, a page). */
  about?: string;
  message?: string;
  /** The booking page (a full URL). */
  book: string;
  /** The site's origin, for its links. */
  origin: string;
}

const perAddress = rateLimiter(2, 24 * 60 * 60_000);

/** Whether this address may get an auto-reply now (and counts it). */
export function replyAllowed(email: string): boolean {
  if (readEnv("CONTACT_AUTOREPLY") === "0") return false;
  return !perAddress(email.trim().toLowerCase());
}

const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
const firstName = (name: string): string => name.trim().split(/\s+/)[0] ?? "";
const clip = (s: string, max = 1500): string => (s.length > max ? `${s.slice(0, max).trimEnd()}…` : s);

const DISPLAY = "'Archivo Black','Arial Black',Arial,Helvetica,sans-serif";
const TEXT = "Manrope,'Helvetica Neue',Helvetica,Arial,sans-serif";
const FONTS = "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Manrope:wght@400;600;700;800&display=swap";

/* ---------- Words ---------- */

interface Words {
  subject: string;
  preheader: string;
  kicker: string;
  title: string;
  body: string;
  callLine: string;
  callButton: string;
  recapLabel: string;
  aboutLabel: string;
  noMessage: string;
  signoff: string;
  why: string;
  privacy: string;
  privacyPath: string;
}

function words(r: ReplyInput): Words {
  const first = firstName(r.name);
  const box = readEnv("CONTACT_TO_EMAIL") ?? business.email;
  if (r.site === "studio") {
    return {
      subject: `Ricevuto, ${first}. Ora tocca a noi.`,
      preheader: "Il tuo messaggio è arrivato: lo leggiamo noi e ti scriviamo da info@alpacode.it.",
      kicker: "Messaggio arrivato",
      title: "Ricevuto. Ora tocca a noi.",
      body: `Ciao ${first}, il tuo messaggio è arrivato e lo leggiamo noi, persone vere: la risposta ti arriva da ${box}.`,
      callLine: "Vuoi accorciare i tempi? Trenta minuti di call: ci racconti cosa ti serve, poi decidi tu.",
      callButton: "Prenota una call",
      recapLabel: "Cosa ci hai scritto",
      aboutLabel: "Argomento",
      noMessage: "Nessun messaggio: ci hai lasciato i tuoi contatti.",
      signoff: "Alpacode Studio",
      why: "Ti scriviamo perché hai compilato il modulo su studio.alpacode.it. Non eri tu? Ignora questa email: non ti scriveremo altro.",
      privacy: "Privacy",
      privacyPath: "/privacy/",
    };
  }
  if (r.lang === "en") {
    return {
      subject: "We've received your message · Alpacode",
      preheader: `Your message has arrived: a person on our team reads it and replies from ${box}.`,
      kicker: "Message received",
      title: `Thank you, ${first}.`,
      body: `Your message has arrived and a person on our team reads it: the reply comes from ${box}.`,
      callLine: "A thirty-minute call to understand. No sales, no pressure. We'll tell you right away if we can help, and how.",
      callButton: "Book a call",
      recapLabel: "Your message",
      aboutLabel: "Topic",
      noMessage: "No message: you left us your details.",
      signoff: "The Alpacode team",
      why: "You're receiving this email because you wrote to us through the form on alpacode.it. If you didn't, you can ignore it: we won't write again.",
      privacy: "Privacy",
      privacyPath: "/en/privacy/",
    };
  }
  return {
    subject: "Abbiamo ricevuto il tuo messaggio · Alpacode",
    preheader: `Il tuo messaggio è arrivato: lo legge una persona del team e ti risponde da ${box}.`,
    kicker: "Messaggio ricevuto",
    title: `Grazie, ${first}.`,
    body: `Il tuo messaggio è arrivato e lo legge una persona del team: la risposta ti arriva da ${box}.`,
    callLine: "Una call di trenta minuti per capirci. Niente vendite, niente pressioni. Ti diciamo subito se possiamo aiutarti e in che modo.",
    callButton: "Prenota una call",
    recapLabel: "Il tuo messaggio",
    aboutLabel: "Argomento",
    noMessage: "Nessun messaggio: ci hai lasciato i tuoi recapiti.",
    signoff: "Il team Alpacode",
    why: "Ricevi questa email perché ci hai scritto dal modulo di alpacode.it. Se non hai scritto tu, puoi ignorarla: non ti scriveremo altro.",
    privacy: "Privacy",
    privacyPath: "/privacy/",
  };
}

/* ---------- Looks ---------- */

interface Look {
  page: string;
  card: string;
  ink: string;
  mute: string;
  rule: string;
  accent: string;
  onAccent: string;
  radius: string;
  wordmark: string;
  recap: string;
}

const LOOK: Record<Site, Look> = {
  house: {
    page: "#F0F3F9",
    card: "#FFFFFF",
    ink: "#0B0E14",
    mute: "#465065",
    rule: "#D3DAE6",
    accent: "#3B72E9",
    onAccent: "#FFFFFF",
    radius: "0",
    wordmark: "ALPACODE",
    recap: "#F0F3F9",
  },
  studio: {
    page: "#0B0E14",
    card: "#141922",
    ink: "#F0F3F9",
    mute: "#A9B1C1",
    rule: "#2A313E",
    accent: "#D4FF3A",
    onAccent: "#0B0E14",
    radius: "18px",
    wordmark: "ALPACODE STUDIO",
    recap: "#0F131A",
  },
};

function legalLine(site: Site): string {
  const owner = site === "studio" ? `Alpacode Studio è un marchio di ${business.name}` : business.name;
  return `${owner} · ${business.locations} · P.IVA ${business.vat}`;
}

/** The auto-reply for one submission, ready for sendMail(). */
export function autoReply(r: ReplyInput): Mail {
  const w = words(r);
  const l = LOOK[r.site];
  const message = clip((r.message ?? "").trim());
  const site = r.origin.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const privacy = `${r.origin.replace(/\/$/, "")}${w.privacyPath}`;
  const kicker =
    r.site === "studio"
      ? `<span style="display:inline-block;padding:6px 12px;border-radius:999px;background:${l.accent};color:${l.onAccent};font:800 12px/1 ${TEXT};letter-spacing:.06em;text-transform:uppercase">${esc(w.kicker)}</span>`
      : `<span style="display:inline-block;width:24px;height:3px;background:${l.accent};vertical-align:middle;margin-right:10px"></span><span style="font:700 13px/1 ${TEXT};color:${l.ink};vertical-align:middle">${esc(w.kicker)}</span>`;
  const title =
    r.site === "studio"
      ? `RICEVUTO.<br><span style="background:${l.accent};color:${l.onAccent};padding:0 .12em;border-radius:6px;-webkit-box-decoration-break:clone;box-decoration-break:clone">ORA TOCCA A NOI.</span>`
      : esc(w.title);
  const recap = [
    r.about ? `<p style="margin:0 0 10px;font:700 13px/1.4 ${TEXT};color:${l.mute}">${esc(w.aboutLabel)}: <span style="color:${l.ink}">${esc(r.about)}</span></p>` : "",
    `<p style="margin:0;font:400 15px/1.6 ${TEXT};color:${l.ink};white-space:pre-wrap">${message ? esc(message) : esc(w.noMessage)}</p>`,
  ].join("");

  const html = `<!doctype html>
<html lang="${r.site === "studio" ? "it" : r.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="${r.site === "studio" ? "dark" : "light"}">
<title>${esc(w.subject)}</title>
<link href="${FONTS}" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:${l.page};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(w.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${l.page}">
<tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${l.card};border-radius:${l.radius};${r.site === "house" ? `border:1px solid ${l.rule};` : ""}">
<tr><td style="padding:28px 32px 0">
<p style="margin:0;font:400 20px/1 ${DISPLAY};letter-spacing:-.02em;color:${l.ink}">${esc(l.wordmark)}</p>
</td></tr>
<tr><td style="padding:28px 32px 0">${kicker}</td></tr>
<tr><td style="padding:16px 32px 0">
<h1 style="margin:0;font:400 34px/1.06 ${DISPLAY};letter-spacing:-.02em;color:${l.ink}">${title}</h1>
</td></tr>
<tr><td style="padding:18px 32px 0">
<p style="margin:0;font:400 16px/1.6 ${TEXT};color:${l.ink}">${esc(w.body)}</p>
</td></tr>
<tr><td style="padding:22px 32px 0">
<p style="margin:0 0 16px;font:400 15px/1.6 ${TEXT};color:${l.mute}">${esc(w.callLine)}</p>
<a href="${esc(r.book)}" style="display:inline-block;padding:14px 22px;background:${l.accent};color:${l.onAccent};border-radius:${r.site === "studio" ? "999px" : "0"};font:700 15px/1 ${TEXT};text-decoration:none">${esc(w.callButton)} &rarr;</a>
</td></tr>
<tr><td style="padding:28px 32px 0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${l.recap};border-radius:${r.site === "studio" ? "14px" : "0"};${r.site === "house" ? `border-left:3px solid ${l.accent};` : ""}">
<tr><td style="padding:18px 20px">
<p style="margin:0 0 10px;font:800 12px/1 ${TEXT};letter-spacing:.06em;text-transform:uppercase;color:${l.mute}">${esc(w.recapLabel)}</p>
${recap}
</td></tr>
</table>
</td></tr>
<tr><td style="padding:26px 32px 30px">
<p style="margin:0;font:700 15px/1.4 ${TEXT};color:${l.ink}">${esc(w.signoff)}</p>
<p style="margin:4px 0 0;font:400 14px/1.4 ${TEXT}"><a href="${esc(r.origin)}" style="color:${l.accent};text-decoration:none">${esc(site)}</a></p>
</td></tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px">
<tr><td style="padding:18px 32px 0;font:400 12px/1.6 ${TEXT};color:${l.mute}">
${esc(legalLine(r.site))}<br>
${esc(w.why)} <a href="${esc(privacy)}" style="color:${l.mute}">${esc(w.privacy)}</a>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    w.title,
    "",
    w.body,
    "",
    w.callLine,
    `${w.callButton}: ${r.book}`,
    "",
    `${w.recapLabel}${r.about ? ` (${w.aboutLabel}: ${r.about})` : ""}:`,
    message || w.noMessage,
    "",
    w.signoff,
    r.origin,
    "",
    "—",
    legalLine(r.site),
    w.why,
    `${w.privacy}: ${privacy}`,
  ].join("\n");

  return {
    tag: r.site === "studio" ? "studio-reply" : "reply",
    to: r.email,
    replyTo: readEnv("CONTACT_TO_EMAIL") ?? business.email,
    fromName: r.site === "studio" ? "Alpacode Studio" : "Alpacode",
    subject: w.subject,
    text,
    html,
  };
}
