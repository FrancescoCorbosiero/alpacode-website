import type { Lang } from "../i18n/types";
import type { ServiceSlug } from "./service-pages";

/* ============================================================
   The brief — "il progetto in 60 secondi" (/contatti, #brief).

   Three taps + a contact, and beside them the brief writes itself:
   a sheet addressed to the person who reads it, each answer typed in
   as it's chosen. The low-friction way in: deliberately NOT a quote
   configurator — a person reads the brief and answers, and the
   number comes with the written proposal after the call (faq.ts).
   Never add automatic pricing here.

   A link can preset the first answer: /contatti/?servizio=<slug>
   (a service page's slug, data/service-pages) or ?per=<option id>.
   ============================================================ */

export interface WizardOption {
  id: string;
  label: string;
}

export interface WizardStep {
  /** The question, as the builder asks it. */
  q: string;
  /** The answer's line on the sheet ("Mi serve", "Sono a"…). */
  line: string;
  options: WizardOption[];
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
  phone: string;
  phonePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  consent: string;
  send: string;
  sending: string;
  note: string;
  /** The sheet beside the builder. */
  sheet: {
    title: string;
    to: string;
    toName: string;
    from: string;
    email: string;
    phone: string;
    message: string;
    empty: string;
    stamp: string;
    /** "{n}" becomes how many answers are left. */
    left: string;
    ready: string;
    draft: string;
  };
  successTitle: string;
  successBody: string;
  successCta: string;
  successAlt: string;
  /** "{email}" renders as a mailto link (FormError). */
  error: string;
  /** Too many sends from one connection (the API's 429); "{email}" too. */
  busy: string;
  restart: string;
}

/** Which first answer a service page presets. */
export const PRESET: Record<ServiceSlug, string> = {
  "consulenza-digitale": "consulenza",
  "siti-web": "sito",
  "e-commerce": "ecommerce",
  "software-su-misura": "software",
  "integrazioni-ai": "ai",
  manutenzione: "manutenzione",
  formazione: "formazione",
};

export const wizard: Record<Lang, WizardData> = {
  it: {
    kicker: "Sessanta secondi",
    title: "Il tuo brief,\nscritto mentre rispondi.",
    lede: "Niente moduli infiniti: tre domande secche, un contatto. Il brief si compone qui accanto e arriva a chi lo legge — ti rispondiamo noi, con idee chiare e un numero scritto.",
    stepLabel: "Passo",
    ofLabel: "di",
    back: "← Indietro",
    steps: [
      {
        q: "Cosa ti serve?",
        line: "Mi serve",
        options: [
          { id: "sito", label: "Un sito nuovo" },
          { id: "rifare", label: "Rifare il mio sito" },
          { id: "ecommerce", label: "Un e-commerce" },
          { id: "software", label: "Software o gestionale" },
          { id: "ai", label: "Integrazioni AI" },
          { id: "consulenza", label: "Consulenza" },
          { id: "manutenzione", label: "Manutenzione" },
          { id: "formazione", label: "Formazione" },
          { id: "marketing", label: "Social, pubblicità & SEO" },
          { id: "nonso", label: "Non lo so ancora" },
        ],
      },
      {
        q: "A che punto sei?",
        line: "Sono a",
        options: [
          { id: "idea", label: "Ho solo l'idea" },
          { id: "materiali", label: "Ho testi e materiali" },
          { id: "online", label: "Ho già qualcosa online" },
        ],
      },
      {
        q: "Quando vorresti partire?",
        line: "Vorrei partire",
        options: [
          { id: "subito", label: "Il prima possibile" },
          { id: "mese", label: "Entro un mese" },
          { id: "mesi", label: "Nei prossimi mesi" },
        ],
      },
    ],
    contactQ: "Dove ti rispondiamo?",
    name: "Nome",
    namePlaceholder: "Maria Rossi",
    email: "Email",
    emailPlaceholder: "nome@dominio.it",
    phone: "Telefono (facoltativo)",
    phonePlaceholder: "Se preferisci una telefonata",
    message: "Vuoi aggiungere qualcosa? (facoltativo)",
    messagePlaceholder: "Una riga sul progetto, un link, un dubbio.",
    consent:
      "Ho letto la privacy policy e acconsento al trattamento dei dati per essere ricontattato/a.",
    send: "Invia il brief",
    sending: "Invio…",
    note: "Nessun preventivo automatico: ti risponde una persona che ha letto il tuo brief.",
    sheet: {
      title: "Brief",
      to: "Per",
      toName: "Francesco Corbosiero · Alpacode",
      from: "Da",
      email: "Email",
      phone: "Telefono",
      message: "Note",
      empty: "…",
      stamp: "Inviato",
      left: "Ancora {n} e il brief è pronto.",
      ready: "Pronto: manca solo il contatto.",
      draft: "Bozza salvata su questo dispositivo",
    },
    successTitle: "Ricevuto. Ora tocca a noi.",
    successBody:
      "Ti rispondiamo entro mezza giornata lavorata, da persona vera. Se preferisci parlarne a voce, scegli subito un orario: la call è gratuita.",
    successCta: "Scegli l'orario della call",
    successAlt: "Oppure scrivici su WhatsApp",
    error: "Qualcosa è andato storto: riprova o scrivici a {email}.",
    busy: "Troppe richieste da questa connessione in poco tempo. Riprova tra qualche minuto, o scrivici a {email}.",
    restart: "Scrivi un altro brief",
  },
  en: {
    kicker: "Sixty seconds",
    title: "Your brief,\nwritten as you answer.",
    lede: "No endless forms: three quick questions, one contact. The brief puts itself together alongside and goes to the person who reads it — we get back to you, with clear ideas and a written number.",
    stepLabel: "Step",
    ofLabel: "of",
    back: "← Back",
    steps: [
      {
        q: "What do you need?",
        line: "I need",
        options: [
          { id: "sito", label: "A new website" },
          { id: "rifare", label: "Redo my website" },
          { id: "ecommerce", label: "An e-commerce" },
          { id: "software", label: "Software or a system" },
          { id: "ai", label: "AI integrations" },
          { id: "consulenza", label: "Consulting" },
          { id: "manutenzione", label: "Maintenance" },
          { id: "formazione", label: "Training" },
          { id: "marketing", label: "Social, ads & SEO" },
          { id: "nonso", label: "I don't know yet" },
        ],
      },
      {
        q: "Where are you at?",
        line: "I'm at",
        options: [
          { id: "idea", label: "Just the idea" },
          { id: "materiali", label: "I have copy and materials" },
          { id: "online", label: "Something's already online" },
        ],
      },
      {
        q: "When would you like to start?",
        line: "I'd start",
        options: [
          { id: "subito", label: "As soon as possible" },
          { id: "mese", label: "Within a month" },
          { id: "mesi", label: "In the coming months" },
        ],
      },
    ],
    contactQ: "Where do we reach you?",
    name: "Name",
    namePlaceholder: "Maria Rossi",
    email: "Email",
    emailPlaceholder: "name@domain.com",
    phone: "Phone (optional)",
    phonePlaceholder: "If you'd rather have a call",
    message: "Anything to add? (optional)",
    messagePlaceholder: "A line on the project, a link, a doubt.",
    consent:
      "I have read the privacy policy and consent to data processing to be contacted back.",
    send: "Send the brief",
    sending: "Sending…",
    note: "No automatic quotes: a person who has read your brief answers.",
    sheet: {
      title: "Brief",
      to: "To",
      toName: "Francesco Corbosiero · Alpacode",
      from: "From",
      email: "Email",
      phone: "Phone",
      message: "Notes",
      empty: "…",
      stamp: "Sent",
      left: "{n} more and the brief is ready.",
      ready: "Ready: only the contact is missing.",
      draft: "Draft saved on this device",
    },
    successTitle: "Got it. Our turn now.",
    successBody:
      "We reply within half a working day, from a real person. If you'd rather talk it through, pick a time now: the call is free.",
    successCta: "Pick a time for the call",
    successAlt: "Or message us on WhatsApp",
    error: "Something went wrong: try again or email us at {email}.",
    busy: "Too many requests from this connection in a short time. Try again in a few minutes, or email us at {email}.",
    restart: "Write another brief",
  },
};
