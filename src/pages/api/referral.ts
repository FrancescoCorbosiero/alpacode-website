/* ============================================================
   POST /api/referral — the referral program's endpoint
   («Segnala un amico», /voucher/).

   kind "referrer"  name + email (+ phone, payout) -> issues the
                    personal code and the invite link for the door
                    the visitor is on (program: sito | nuova-attivita).
   kind "direct"    the referrer's details + the friend's (name,
                    email and/or phone, what they need or what they
                    opened, a note) and an explicit "they agreed to be
                    contacted" tick.
   kind "friend"    a request sent from an invite page, carrying the
                    referral code (or none, for a direct visit).

   Every accepted submission is appended to the ledger and emailed
   to the studio (shared/server/mail.ts; without AWS_REGION it is logged
   instead, so the flow is testable locally). A submission is only
   refused when it would otherwise be lost: mail failed AND ledger
   unavailable. Abuse guards: shared/server/guard.ts, like /api/contact.
   ============================================================ */
import type { APIRoute } from "astro";
import { business } from "@shared/data/business";
import { shared, type BusinessId, type NeedId, type PayoutId } from "../../data/voucher/shared";
import { kit } from "../../data/voucher/kit";
import { invitePath, isProgram, PROGRAM_LABEL, type ProgramId } from "../../lib/voucher/program";
import { nameFromCode, normalizeCode } from "../../lib/voucher/referral-code";
import { issueCode } from "../../lib/server/codes";
import { append, priorReferral, referrerByCode, type LedgerEntry, type Person } from "../../lib/server/ledger";
import { sendMail } from "@shared/server/mail";
import { autoReply, replyAllowed } from "@shared/server/reply";
import { readEnv } from "@shared/server/env";
import { CAL_LINK, CAL_ORIGIN } from "../../lib/calcom";
import { clientIp, isEmail, json, notJson, rateLimiter, readJson, str } from "@shared/server/guard";
import type { Lang } from "../../i18n/types";

export const prerender = false;

const rateLimited = rateLimiter(8, 10 * 60_000);

const PAYOUTS: PayoutId[] = ["bonifico", "paypal", "buono"];
const NEEDS: NeedId[] = ["sito", "ecommerce", "software", "formazione", "brand", "pubblicita", "altro"];
const BUSINESSES: BusinessId[] = ["negozio", "locale", "studio", "benessere", "artigiano", "ecommerce", "altro"];
const NEED_LABEL: Record<NeedId, string> = {
  sito: "Sito web",
  ecommerce: "E-commerce",
  software: "Software / gestionale",
  formazione: "Formazione",
  brand: "Logo e brand",
  pubblicita: "Pubblicità",
  altro: "Non lo sa ancora",
};
const businessLabel = (id: BusinessId): string => kit.it.types.find((t) => t.id === id)?.label ?? id;

const oneOf = <T extends string>(v: unknown, list: readonly T[], fallback: T): T =>
  list.includes(v as T) ? (v as T) : fallback;
const maybeOneOf = <T extends string>(v: unknown, list: readonly T[]): T | undefined =>
  list.includes(v as T) ? (v as T) : undefined;
/** A checkbox group: the known values, each once, in the list's order. */
const someOf = <T extends string>(v: unknown, list: readonly T[]): T[] =>
  Array.isArray(v) ? list.filter((x) => v.includes(x)) : [];

function siteOrigin(): string {
  return (readEnv("SITE_URL") ?? import.meta.env.SITE ?? "https://alpacode.it").replace(/\/+$/, "");
}

const ROME: Intl.DateTimeFormatOptions = {
  timeZone: "Europe/Rome",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};
const stamp = (d = new Date()) => d.toLocaleString("it-IT", ROME);

const lines = (rows: (string | null | false | undefined)[]) => rows.filter((r): r is string => typeof r === "string").join("\n");

function person(body: Record<string, unknown>): Person {
  return { name: str(body.name, 120), email: str(body.email), phone: str(body.phone, 40) };
}

function personLines(label: string, p: Person): string[] {
  return [`${label}: ${p.name}`, `Email: ${p.email || "—"}`, `Telefono: ${p.phone || "—"}`];
}

/* ---------- route ---------- */
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

  // Honeypot: pretend all went well, keep nothing.
  if (str(body.website) !== "") return json({ ok: true });

  const kind = str(body.kind);
  const lang: Lang = body.lang === "en" ? "en" : "it";
  const program: ProgramId = isProgram(body.program) ? body.program : "sito";
  if (body.consent !== true) return json({ ok: false, error: "consent" }, 422);

  const site = siteOrigin();
  const t = new Date().toISOString();
  const door = `Porta: ${PROGRAM_LABEL[program]}`;

  /* ---- 1. A referrer asks for a personal link ---- */
  if (kind === "referrer") {
    const referrer = person(body);
    if (referrer.name.length < 2 || !isEmail(referrer.email)) return json({ ok: false, error: "validation" }, 422);
    const payout = oneOf(body.payout, PAYOUTS, "bonifico");
    const code = issueCode(referrer.name, referrer.email, lang);
    const link = `${site}${invitePath(code, lang, program)}`;

    const stored = await append({ t, kind: "referrer", program, lang, code, referrer, payout });
    const mailed = await sendMail({
      tag: "referral",
      subject: `Nuovo link di segnalazione · ${code} · ${referrer.name}`,
      replyTo: referrer.email,
      text: lines([
        "Qualcuno ha generato il proprio link per il programma «Segnala un amico».",
        "",
        `Codice: ${code}`,
        `Link: ${link}`,
        door,
        ...personLines("Segnalatore", referrer),
        `Cashback preferito: ${payoutLabel(payout)}`,
        `Lingua: ${lang}`,
        `Data: ${stamp()}`,
        "",
        "Le richieste che arriveranno da questo link riportano lo stesso codice nell'oggetto.",
      ]),
    });
    if (mailed === "failed" && !stored) return json({ ok: false, error: "send_failed" }, 503);
    await confirmToReferrer(referrer, code, link, lang, program);
    return json({ ok: true, code, link });
  }

  /* ---- 2. A referrer sends us a friend's details ---- */
  if (kind === "direct") {
    const referrer = person(body);
    const f = (body.friend && typeof body.friend === "object" ? body.friend : {}) as Record<string, unknown>;
    const friend = {
      name: str(f.name, 120),
      email: str(f.email),
      phone: str(f.phone, 40),
      need: maybeOneOf(f.need, NEEDS),
      business: maybeOneOf(f.business, BUSINESSES),
      note: str(f.note, 1500),
    };
    if (referrer.name.length < 2 || !isEmail(referrer.email) || friend.name.length < 2) {
      return json({ ok: false, error: "validation" }, 422);
    }
    if (!friend.email && !friend.phone) return json({ ok: false, error: "contact" }, 422);
    if (friend.email && !isEmail(friend.email)) return json({ ok: false, error: "validation" }, 422);
    if (body.friendConsent !== true) return json({ ok: false, error: "consent" }, 422);

    const payout = oneOf(body.payout, PAYOUTS, "bonifico");
    const code = issueCode(referrer.name, referrer.email, lang);
    const link = `${site}${invitePath(code, lang, program)}`;
    const prior = await priorReferral(friend);

    const stored = await append({ t, kind: "direct", program, lang, code, referrer, payout, friend });
    const mailed = await sendMail({
      tag: "referral",
      subject: `${prior ? "[GIÀ SEGNALATA] " : ""}Segnalazione diretta · ${friend.name} · da ${referrer.name} (${code})`,
      replyTo: referrer.email,
      text: lines([
        "Nuova segnalazione diretta: il segnalatore dichiara di aver informato la persona e di avere il suo consenso a essere contattata.",
        "",
        ...personLines("Persona segnalata", friend),
        friend.business ? `Ha aperto: ${businessLabel(friend.business)}` : null,
        friend.need ? `Le serve: ${NEED_LABEL[friend.need]}` : null,
        friend.note ? `Note: ${friend.note}` : null,
        "",
        ...personLines("Segnalatore", referrer),
        `Codice: ${code}`,
        `Cashback preferito: ${payoutLabel(payout)}`,
        prior ? "" : null,
        prior ? priorNote(prior) : null,
        "",
        `${door} · Lingua: ${lang} · Data: ${stamp()}`,
        "Al primo contatto conferma con la persona che è d'accordo a essere contattata (informativa del programma).",
      ]),
    });
    if (mailed === "failed" && !stored) return json({ ok: false, error: "send_failed" }, 503);
    await confirmToReferrer(referrer, code, link, lang, program);
    return json({ ok: true, code, link });
  }

  /* ---- 3. A friend writes to us from an invite ---- */
  if (kind === "friend") {
    const needs = someOf(body.needs, NEEDS);
    const need = maybeOneOf(body.need, NEEDS);
    const friend = {
      ...person(body),
      need,
      needs: needs.length ? needs : undefined,
      business: maybeOneOf(body.business, BUSINESSES),
      message: str(body.message, 3000),
    };
    if (friend.name.length < 2 || !isEmail(friend.email)) return json({ ok: false, error: "validation" }, 422);
    const ref = normalizeCode(str(body.ref, 40)) ?? "";
    const owner = ref ? await referrerByCode(ref) : null;
    const prior = await priorReferral(friend);

    const stored = await append({ t, kind: "friend", program, lang, ref, friend });
    const refLine = !ref
      ? "Segnalatore: nessuno (visita diretta alla pagina invito)"
      : owner
        ? `Segnalatore: ${owner.name} · ${owner.email}${owner.phone ? ` · ${owner.phone}` : ""} (codice ${ref})`
        : `Segnalatore: ${nameFromCode(ref) ?? "—"} · codice ${ref} (non nel registro: cerca il codice nella casella)`;
    const wanted = [...(need ? [need] : []), ...needs.filter((n) => n !== need)].map((n) => NEED_LABEL[n]);
    const mailed = await sendMail({
      tag: "referral",
      subject: `${prior ? "[GIÀ SEGNALATA] " : ""}${ref ? `Richiesta da invito · ${ref}` : "Richiesta dalla pagina invito"} · ${friend.name}`,
      replyTo: friend.email,
      text: lines([
        "Nuova richiesta dal programma «Segnala un amico» (consenso privacy prestato nel modulo).",
        "",
        `Nome: ${friend.name}`,
        `Email: ${friend.email}`,
        `Telefono: ${friend.phone || "—"}`,
        friend.business ? `Ha aperto: ${businessLabel(friend.business)}` : null,
        `Gli serve: ${wanted.length ? wanted.join(", ") : "—"}`,
        friend.message ? "" : null,
        friend.message || null,
        "",
        refLine,
        prior ? priorNote(prior) : null,
        "",
        `${door} · Lingua: ${lang} · Data: ${stamp()}`,
      ]),
    });
    if (mailed === "failed" && !stored) return json({ ok: false, error: "send_failed" }, 503);
    // The friend who asked gets the house's reply (it doesn't hold the
    // answer up).
    if (replyAllowed(friend.email)) {
      void sendMail(
        autoReply({
          site: "house",
          lang,
          name: friend.name,
          email: friend.email,
          about: lang === "it" && wanted.length ? wanted.join(", ") : undefined,
          message: friend.message,
          book: `${CAL_ORIGIN}/${CAL_LINK}`,
          origin: context.site?.origin ?? "https://alpacode.it",
        }),
      );
    }
    return json({ ok: true });
  }

  return json({ ok: false, error: "invalid_kind" }, 400);
};

function payoutLabel(id: PayoutId): string {
  return shared.it.payouts.find((p) => p.id === id)?.short ?? id;
}

function priorNote(prior: LedgerEntry): string {
  const when = stamp(new Date(prior.t));
  const via =
    prior.kind === "direct"
      ? `segnalazione diretta di ${prior.referrer.name} (${prior.code})`
      : prior.kind === "friend"
        ? `richiesta da invito ${prior.ref || "senza codice"}`
        : "registro";
  return `ATTENZIONE: questa persona risulta già segnalata il ${when} (${via}). Vale la prima segnalazione valida.`;
}

/** Optional: the referrer gets their link by email too
 *  (REFERRAL_CONFIRM_EMAILS=1 — needs SES out of the sandbox). */
async function confirmToReferrer(referrer: Person, code: string, link: string, lang: Lang, program: ProgramId): Promise<void> {
  if (readEnv("REFERRAL_CONFIRM_EMAILS") !== "1") return;
  const it = lang === "it";
  const first = referrer.name.split(/\s+/)[0] ?? "";
  const who =
    program === "nuova-attivita"
      ? it
        ? "Mandalo a chi ha appena aperto un'attività."
        : "Send it to someone who just opened a business."
      : it
        ? "Mandalo a chi pensi possa servire un sito web o un e-commerce."
        : "Send it to anyone who might need a website or an online store.";
  await sendMail({
    tag: "referral",
    to: referrer.email,
    replyTo: readEnv("CONTACT_TO_EMAIL") ?? business.email,
    subject: it ? "Il tuo link Alpacode per segnalare un amico" : "Your Alpacode link to refer a friend",
    text: it
      ? lines([
          `Ciao ${first},`,
          "",
          "ecco il tuo link personale del programma «Segnala un amico»:",
          link,
          "",
          `Il tuo codice: ${code}`,
          "",
          `${who} Se diventa nostro cliente ricevi fino a 100 € di cashback, con bonifico, PayPal o buono acquisto. Ti scriviamo noi a ogni passo.`,
          "",
          "Il link resta sempre lo stesso: se lo perdi, rigeneralo con questa email.",
          "",
          "Il team Alpacode",
          "https://alpacode.it",
        ])
      : lines([
          `Hi ${first},`,
          "",
          "here is your personal link for the refer-a-friend program:",
          link,
          "",
          `Your code: ${code}`,
          "",
          `${who} If they become our client you get up to €100 cashback, by bank transfer, PayPal or voucher. We'll keep you posted at every step.`,
          "",
          "The link never changes: if you lose it, generate it again with this email.",
          "",
          "The Alpacode team",
          "https://alpacode.it",
        ]),
  });
}
