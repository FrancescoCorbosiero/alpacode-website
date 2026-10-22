/* ============================================================
   Campaign landings — what the kit's pieces share
   (components/landing/*): the formula's shape, objections, the
   lead form's labels, the reader's profile.

   House rules for the copy (docs/landing-factory.md has them all):
   say what is delivered, how and by whom — never the price
   reassurance tic ("prezzo deciso prima", "niente costi
   nascosti", "nessuna sorpresa"…), never a number, a stat or a
   promise the studio hasn't agreed to.
   ============================================================ */
import type { Lang } from "../../i18n/types";

/** Who is reading a page for people who build sites for clients. */
export type ProfileId = "dev" | "designer";

/** The formula: the same three ways in on every page that sells tools
 *  and training — the codebase is always there, the company changes. */
export type TierId = "codebase" | "corso" | "uno-a-uno";

export interface Tier {
  id: TierId;
  /** How much of the way you walk alone. */
  level: string;
  name: string;
  line: string;
  forWho: string;
  /** "Everything in the level below" — the first, bold line. */
  carry?: string;
  items: string[];
  cta: string;
}

export interface FormulaCopy {
  title: string;
  lede: string;
  /** Handwritten next to the tier the reader's profile points to. */
  badge: string;
  recommend: Record<ProfileId, TierId>;
  tiers: Tier[];
  note: string;
}

export interface Objection {
  q: string;
  a: string;
}

export interface ProfileCopy {
  legend: string;
  options: Record<ProfileId, string>;
  /** The margin note next to the switch. */
  hand: string;
}

/** The lead form (components/landing/LeadForm.astro). */
export interface LeadFormCopy {
  name: string;
  namePh: string;
  email: string;
  emailPh: string;
  company: string;
  companyPh: string;
  message: string;
  messagePh: string;
  profileLegend: string;
  tierLegend: string;
  tierUnsure: string;
  /** "{privacy}" becomes the link to the privacy notice. */
  consent: string;
  privacy: string;
  send: string;
  sending: string;
  doneTitle: string;
  doneBody: string;
  doneAgain: string;
  invalid: string;
  /** "{email}" becomes a mailto link. */
  error: string;
  sticky: string;
}

export const leadForm: Record<Lang, LeadFormCopy> = {
  it: {
    name: "Nome e cognome",
    namePh: "Giulia Ferri",
    email: "Email",
    emailPh: "nome@studio.it",
    company: "Studio o attività (facoltativo)",
    companyPh: "Ferri Web",
    message: "Due righe su come lavori oggi (facoltativo)",
    messagePh: "Che siti fai, per chi, con quali strumenti.",
    profileLegend: "Ti riconosci di più in",
    tierLegend: "Il percorso che ti interessa",
    tierUnsure: "Non lo so ancora",
    consent: "Ho letto l'{privacy} e acconsento a essere ricontattato/a per questa richiesta.",
    privacy: "informativa privacy",
    send: "Invia la richiesta",
    sending: "Invio in corso…",
    doneTitle: "Ricevuto.",
    doneBody: "Ti scriviamo noi, di persona, all'indirizzo che ci hai lasciato: con il percorso adatto a te e i passi per partire.",
    doneAgain: "Invia un'altra richiesta",
    invalid: "Controlla i campi evidenziati: nome, un'email valida e il consenso.",
    error: "Non siamo riusciti a inviare la richiesta. Riprova tra poco o scrivici a {email}.",
    sticky: "Scegli come iniziare",
  },
  en: {
    name: "Full name",
    namePh: "Julia Ferri",
    email: "Email",
    emailPh: "name@studio.com",
    company: "Studio or business (optional)",
    companyPh: "Ferri Web",
    message: "A couple of lines on how you work today (optional)",
    messagePh: "What sites you build, for whom, with which tools.",
    profileLegend: "You're more of a",
    tierLegend: "The path you're interested in",
    tierUnsure: "Not sure yet",
    consent: "I have read the {privacy} and agree to be contacted about this request.",
    privacy: "privacy notice",
    send: "Send the request",
    sending: "Sending…",
    doneTitle: "Got it.",
    doneBody: "We'll write to you ourselves, at the address you left: with the path that fits you and the steps to get going.",
    doneAgain: "Send another request",
    invalid: "Check the highlighted fields: name, a valid email and the consent.",
    error: "We couldn't send your request. Try again shortly or write to us at {email}.",
    sticky: "Choose how to start",
  },
};

export const profiles: Record<Lang, ProfileCopy> = {
  it: {
    legend: "Come lavori?",
    options: { dev: "Sviluppatore", designer: "Web designer" },
    hand: "la pagina si adatta",
  },
  en: {
    legend: "How do you work?",
    options: { dev: "Developer", designer: "Web designer" },
    hand: "the page adapts",
  },
};
