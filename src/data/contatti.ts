import type { Lang } from "../i18n/types";

export interface ContattiData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  labels: {
    name: string;
    namePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    topic: string;
    topicPlaceholder: string;
    topics: string[];
    budget: string;
    budgetPlaceholder: string;
    budgets: string[];
    msg: string;
    msgPlaceholder: string;
    send: string;
    consent: string;
    confirm: string;
    error: string;
  };
  info: {
    h: string;
    email: string;
    emailV: string;
    base: string;
    baseV: string;
    vat: string;
    vatV: string;
    hours: string;
    hoursV: string;
    reply: string;
    replyV: string;
    availableLabel: string;
    availableV: string;
  };
}

export const contatti: Record<Lang, ContattiData> = {
  it: {
    crumb: "§07 · CONTATTI",
    h1Line1: "Parliamone,",
    h1Line2: "con calma.",
    lede: "Compila il modulo o scrivici direttamente. Ti rispondiamo entro mezza giornata lavorata, in italiano, da una persona vera.",
    labels: {
      name: "Nome e cognome",
      namePlaceholder: "Mario Rossi",
      company: "Azienda (opzionale)",
      companyPlaceholder: "Studio Rossi srl",
      email: "Email",
      emailPlaceholder: "nome@dominio.it",
      topic: "Di cosa parliamo?",
      topicPlaceholder: "Scegli un argomento",
      topics: ["Un nuovo progetto", "Consulenza", "Manutenzione", "Corsi & formazione", "Altro"],
      budget: "Budget orientativo",
      budgetPlaceholder: "Scegli una fascia",
      budgets: ["Budget contenuto", "1.000 — 5.000 €", "5.000 — 15.000 €", "Oltre 15.000 €", "Non lo so ancora"],
      msg: "Raccontaci",
      msgPlaceholder: "Una riga sul progetto, il problema, l'obiettivo.",
      send: "Invia il messaggio",
      consent: "Ho letto la privacy policy e acconsento al trattamento dei dati per essere ricontattato/a.",
      confirm: "GRAZIE — TI RISPONDIAMO PRESTO",
      error: "QUALCOSA È ANDATO STORTO — RIPROVA O SCRIVICI VIA EMAIL",
    },
    info: {
      h: "Diretto.",
      email: "Email",
      emailV: "info@alpacode.it",
      base: "Sede operativa",
      baseV: "Monza · Milano · IT",
      vat: "P. IVA",
      vatV: "14463350968",
      hours: "Orari",
      hoursV: "Lun — Ven · 09:00 — 18:00 CET",
      reply: "Tempo di risposta",
      replyV: "< mezza giornata lavorata",
      availableLabel: "DISPONIBILE",
      availableV: "Stiamo prendendo nuovi progetti per Q3 2026.",
    },
  },
  en: {
    crumb: "§07 · CONTACT",
    h1Line1: "Let's talk,",
    h1Line2: "calmly.",
    lede: "Fill the form or write directly. We reply within half a worked day, in English or Italian, from a real person.",
    labels: {
      name: "Name",
      namePlaceholder: "Jane Doe",
      company: "Company (optional)",
      companyPlaceholder: "Acme Inc.",
      email: "Email",
      emailPlaceholder: "name@domain.com",
      topic: "What about?",
      topicPlaceholder: "Choose a topic",
      topics: ["A new project", "Consulting", "Maintenance", "Courses & training", "Other"],
      budget: "Indicative budget",
      budgetPlaceholder: "Choose a range",
      budgets: ["Small budget", "1,000 — 5,000 €", "5,000 — 15,000 €", "Over 15,000 €", "Not sure yet"],
      msg: "Tell us",
      msgPlaceholder: "A line about the project, the problem, the goal.",
      send: "Send message",
      consent: "I have read the privacy policy and consent to data processing to be contacted back.",
      confirm: "THANKS — WE'LL REPLY SOON",
      error: "SOMETHING WENT WRONG — RETRY OR EMAIL US",
    },
    info: {
      h: "Direct.",
      email: "Email",
      emailV: "info@alpacode.it",
      base: "Studio",
      baseV: "Monza · Milan · IT",
      vat: "VAT",
      vatV: "14463350968",
      hours: "Hours",
      hoursV: "Mon — Fri · 09:00 — 18:00 CET",
      reply: "Response time",
      replyV: "< half a worked day",
      availableLabel: "AVAILABLE",
      availableV: "We're taking new projects for Q3 2026.",
    },
  },
};
