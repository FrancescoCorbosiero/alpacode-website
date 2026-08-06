import type { Lang } from "../i18n/types";

/* ============================================================
   Brief wizard — "il progetto in 60 secondi".

   Three taps + a contact: the low-friction alternative to the
   full form. Deliberately NOT a quote configurator: the brand
   promise is "prezzo deciso prima, per iscritto" — so the
   wizard collects a structured brief and a human answers with
   the number. Never add automatic pricing here.
   ============================================================ */

export interface WizardStep {
  q: string;
  options: string[];
}

export interface WizardData {
  kicker: string;
  title: string;
  lede: string;
  stepLabel: string; // "Passo" / "Step"
  ofLabel: string; // "di" / "of"
  back: string;
  steps: WizardStep[]; // the three tap-steps
  contactQ: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  consent: string;
  send: string;
  sending: string;
  note: string;
  successTitle: string;
  successBody: string;
  successCta: string;
  error: string;
  restart: string;
}

export const wizard: Record<Lang, WizardData> = {
  it: {
    kicker: "§ 60 — Sessanta secondi",
    title: "Raccontaci il progetto in tre tap.",
    lede: "Niente moduli infiniti: tre domande secche, un contatto, e ti rispondiamo noi — con idee chiare e un numero scritto.",
    stepLabel: "Passo",
    ofLabel: "di",
    back: "← Indietro",
    steps: [
      {
        q: "Cosa ti serve?",
        options: [
          "Un sito nuovo",
          "Rifare il mio sito",
          "Un e-commerce",
          "Software o gestionale",
          "Pubblicità & SEO",
          "Non lo so ancora",
        ],
      },
      {
        q: "A che punto sei?",
        options: [
          "Ho solo l'idea",
          "Ho testi e materiali",
          "Ho già qualcosa online",
        ],
      },
      {
        q: "Quando vorresti partire?",
        options: [
          "Il prima possibile",
          "Entro un mese",
          "Nei prossimi mesi",
        ],
      },
    ],
    contactQ: "Dove ti rispondiamo?",
    name: "Nome",
    namePlaceholder: "Maria Rossi",
    email: "Email",
    emailPlaceholder: "nome@dominio.it",
    consent:
      "Ho letto la privacy policy e acconsento al trattamento dei dati per essere ricontattato/a.",
    send: "Invia — ti leggiamo a breve",
    sending: "Invio…",
    note: "Nessun preventivo automatico: ti risponde una persona, con un numero deciso prima e messo per iscritto.",
    successTitle: "Ricevuto. Ora tocca a noi.",
    successBody:
      "Ti rispondiamo entro mezza giornata lavorata, da persona vera. Se preferisci parlarne a voce, la call è gratis.",
    successCta: "Prenota una call di 30 minuti",
    error: "QUALCOSA È ANDATO STORTO — RIPROVA O SCRIVICI VIA EMAIL",
    restart: "Ricomincia",
  },
  en: {
    kicker: "§ 60 — Sixty seconds",
    title: "Tell us your project in three taps.",
    lede: "No endless forms: three quick questions, one contact, and we get back to you — with clear ideas and a written number.",
    stepLabel: "Step",
    ofLabel: "of",
    back: "← Back",
    steps: [
      {
        q: "What do you need?",
        options: [
          "A new website",
          "Redo my website",
          "An e-commerce",
          "Software or a system",
          "Ads & SEO",
          "I don't know yet",
        ],
      },
      {
        q: "Where are you at?",
        options: [
          "Just the idea",
          "I have copy and materials",
          "Something's already online",
        ],
      },
      {
        q: "When would you like to start?",
        options: ["As soon as possible", "Within a month", "In the coming months"],
      },
    ],
    contactQ: "Where do we reach you?",
    name: "Name",
    namePlaceholder: "Maria Rossi",
    email: "Email",
    emailPlaceholder: "name@domain.com",
    consent:
      "I have read the privacy policy and consent to data processing to be contacted back.",
    send: "Send — we'll read it shortly",
    sending: "Sending…",
    note: "No automatic quotes: a person answers, with a number agreed first and put in writing.",
    successTitle: "Got it. Our turn now.",
    successBody:
      "We reply within half a working day, from a real person. If you'd rather talk it through, the call is free.",
    successCta: "Book a 30-minute call",
    error: "SOMETHING WENT WRONG — RETRY OR EMAIL US",
    restart: "Start over",
  },
};
