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
    /** "{email}" renders as a mailto link (FormError). */
    error: string;
    /** Too many sends from one connection (the API's 429); "{email}" too. */
    busy: string;
  };
  /** The ways in, at the top: the brief, the call, WhatsApp, email. */
  channels: {
    kicker: string;
    title: string;
    brief: { t: string; d: string; go: string };
    call: { t: string; d: string; go: string };
    whatsapp: { t: string; d: string; go: string; text: string };
    email: { t: string; d: string; go: string; copy: string; copied: string };
    reply: string;
  };
  /** What happens once you've written. */
  next: { kicker: string; title: string; items: { t: string; d: string }[] };
  /** The long form's section. */
  long: { kicker: string; title: string; lede: string };
  /** The questions asked before writing: their q, as in data/faq.ts. */
  faq: { kicker: string; title: string; qs: string[]; more: string };
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
  /* The human block next to the 60-second wizard. */
  person: {
    h: string;
    points: { k: string; v: string }[];
    clockOpen: string;
    clockClosed: string;
    /** The face behind the inbox. Photo slot: src/assets/people/francesco.<ext>. */
    sig: { name: string; role: string; initials: string; photoAlt: string };
  };
}

export const contatti: Record<Lang, ContattiData> = {
  it: {
    crumb: "Contatti",
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
      confirm: "Grazie: ti rispondiamo presto.",
      error: "Qualcosa è andato storto: riprova o scrivici a {email}.",
      busy: "Troppe richieste da questa connessione in poco tempo. Riprova tra qualche minuto, o scrivici a {email}.",
    },
    channels: {
      kicker: "Come preferisci",
      title: "Quattro modi\nper cominciare.",
      brief: { t: "Il brief in 60 secondi", d: "Tre tap e un contatto: lo legge una persona, e ti risponde.", go: "Comincia" },
      call: { t: "Una call di 30 minuti", d: "Gratuita, senza impegno. Scegli tu il giorno e l'ora.", go: "Scegli l'orario" },
      whatsapp: {
        t: "WhatsApp",
        d: "Un messaggio veloce: ti rispondiamo in orario di studio.",
        go: "Scrivici",
        text: "Ciao Alpacode! Vorrei parlarvi di un progetto.",
      },
      email: { t: "Email", d: "Per gli allegati e le richieste lunghe.", go: "Scrivi", copy: "Copia l'indirizzo", copied: "Copiato" },
      reply: "Rispondiamo entro mezza giornata lavorata",
    },
    next: {
      kicker: "Dopo",
      title: "Cosa succede\nquando scrivi.",
      items: [
        { t: "Ti rispondiamo", d: "Entro mezza giornata lavorata, di persona: chi ti scrive è chi costruisce." },
        { t: "Una call di 30 minuti", d: "Gratuita: capiamo cosa ti serve e ti diciamo subito se possiamo aiutarti." },
        { t: "La proposta scritta", d: "Cosa faremo, in che ordine, in quanto tempo e con che costo." },
        { t: "Decidi tu", d: "Fino alla firma non c'è nessun impegno. Poi si costruisce, insieme." },
      ],
    },
    long: {
      kicker: "Per esteso",
      title: "Preferisci scrivere\ntutto per esteso?",
      lede: "Il modulo completo, per chi ha già le idee chiare o un progetto da raccontare per bene.",
    },
    faq: {
      kicker: "Prima di scrivere",
      title: "Le domande\nche ci fanno.",
      qs: ["Come funziona il preventivo?", "Quanto costa un sito?", "Con chi parlo durante il progetto?", "Lavorate solo a Monza e Milano?"],
      more: "Tutte le domande",
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
      availableLabel: "Disponibile",
      availableV: "Stiamo prendendo nuovi progetti.",
    },
    person: {
      h: "A chi stai scrivendo.",
      points: [
        {
          k: "Chi risponde",
          v: "Chi costruisce. Niente call center, niente risposte fotocopia.",
        },
        {
          k: "Quanto aspetti",
          v: "Mezza giornata lavorata, di solito meno.",
        },
        {
          k: "Come parliamo",
          v: "Italiano chiaro: se una cosa non ti serve, te lo diciamo.",
        },
      ],
      clockOpen: "In studio adesso",
      clockClosed: "Fuori orario · ti leggiamo al rientro",
      sig: {
        name: "Francesco Corbosiero",
        role: "Fondatore — è lui che ti risponde",
        initials: "FC",
        photoAlt: "Francesco Corbosiero, fondatore di Alpacode",
      },
    },
  },
  en: {
    crumb: "Contact",
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
      confirm: "Thanks: we'll reply soon.",
      error: "Something went wrong: try again or email us at {email}.",
      busy: "Too many requests from this connection in a short time. Try again in a few minutes, or email us at {email}.",
    },
    channels: {
      kicker: "However you like",
      title: "Four ways\nto start.",
      brief: { t: "The brief in 60 seconds", d: "Three taps and a contact: a person reads it, and answers.", go: "Start" },
      call: { t: "A 30-minute call", d: "Free, no commitment. You pick the day and the time.", go: "Pick a time" },
      whatsapp: {
        t: "WhatsApp",
        d: "A quick message: we reply during studio hours.",
        go: "Message us",
        text: "Hi Alpacode! I'd like to talk to you about a project.",
      },
      email: { t: "Email", d: "For attachments and long requests.", go: "Write", copy: "Copy the address", copied: "Copied" },
      reply: "We reply within half a working day",
    },
    next: {
      kicker: "Next",
      title: "What happens\nwhen you write.",
      items: [
        { t: "We reply", d: "Within half a working day, in person: whoever writes to you is who builds." },
        { t: "A 30-minute call", d: "Free: we understand what you need and tell you right away if we can help." },
        { t: "The written proposal", d: "What we'll do, in what order, how long it takes and what it costs." },
        { t: "You decide", d: "There's no commitment until you sign. Then we build, together." },
      ],
    },
    long: {
      kicker: "In full",
      title: "Would you rather\nwrite it all out?",
      lede: "The full form, for people who already have clear ideas or a project to tell properly.",
    },
    faq: {
      kicker: "Before you write",
      title: "The questions\npeople ask.",
      qs: ["How does the quote work?", "How much does a website cost?", "Who do I talk to during the project?", "Do you only work in Monza and Milan?"],
      more: "All the questions",
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
      availableLabel: "Available",
      availableV: "We're taking on new projects.",
    },
    person: {
      h: "Who you're writing to.",
      points: [
        {
          k: "Who answers",
          v: "The people who build. No call center, no copy-paste replies.",
        },
        {
          k: "How long you wait",
          v: "Half a working day, usually less.",
        },
        {
          k: "How we talk",
          v: "Plainly: if you don't need something, we tell you.",
        },
      ],
      clockOpen: "At the desk right now",
      clockClosed: "After hours · we'll read you when we're back",
      sig: {
        name: "Francesco Corbosiero",
        role: "Founder — he's the one who answers",
        initials: "FC",
        photoAlt: "Francesco Corbosiero, founder of Alpacode",
      },
    },
  },
};
