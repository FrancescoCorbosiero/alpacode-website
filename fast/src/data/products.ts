/* ============================================================
   What FAST sells: the site guide and its marketing module, the
   crash course for freelancers, and the site built in the course,
   hosted by the studio.

   Prices are final prices to the consumer (VAT included). A product
   without `checkout` is sold through its DM keyword: its buttons open
   WhatsApp with the keyword typed. Paste the checkout link (a merchant
   of record — Lemon Squeezy, Gumroad, Paddle — handles EU VAT on
   digital products) and the button becomes "Compra".

   The contents below are a draft of each product: line them up with
   the real guide, module and course before going live.
   ============================================================ */

export interface Offer {
  id: string;
  name: string;
  /** Euro, VAT included; null until it's set. */
  price: number | null;
  /** The checkout page; null: sold through the keyword. */
  checkout: string | null;
  blurb: string;
  includes: string[];
  featured?: boolean;
}

export interface Chapter {
  t: string;
  d: string;
}

export interface Qa {
  q: string;
  a: string;
}

/* ---------- The site guide (/sito) ---------- */

export const GUIDE = {
  name: "Guida Sito Vetrina",
  price: 22,
  chapters: [
    { t: "Prima del sito", d: "Cosa serve davvero, cosa è gratis e cosa no: dominio, spazio, email." },
    { t: "Il sito, con l'AI", d: "Struttura, testi e immagini con l'AI, senza scrivere una riga di codice." },
    { t: "Online", d: "Pubblicarlo, collegare il dominio, metterlo in sicurezza." },
    { t: "La gestione", d: "Aggiornarlo, fare i backup, non romperlo." },
  ] as Chapter[],
};

export const MARKETING = {
  name: "Modulo Marketing",
  price: 48,
  title: "Il sito c'è. Ora deve portarti clienti.",
  chapters: [
    { t: "Su Google", d: "La scheda della tua attività, e come farla vedere." },
    { t: "Le parole giuste", d: "Quelle che usano i tuoi clienti quando ti cercano." },
    { t: "Social e sito", d: "Dai post al sito, e dal sito ai messaggi." },
    { t: "Cosa funziona", d: "Misurare, e tenere solo quello che porta clienti." },
  ] as Chapter[],
};

export const SITO_OFFERS: Offer[] = [
  {
    id: "guida",
    name: "La guida",
    price: GUIDE.price,
    checkout: null,
    blurb: "Crea e gestisci il tuo sito vetrina, da solo.",
    includes: ["La guida Sito Vetrina", "Da leggere su telefono o computer", "Tua, per sempre"],
  },
  {
    id: "guida-marketing",
    name: "Guida + Marketing",
    price: GUIDE.price + MARKETING.price,
    checkout: null,
    blurb: "Il sito, e i clienti che lo trovano.",
    includes: ["La guida Sito Vetrina", `Il modulo Marketing (+${MARKETING.price} €)`, "Google, social, misure"],
    featured: true,
  },
];

export const SITO_QA: Qa[] = [
  {
    q: "Davvero il sito è gratis?",
    a: "Sì: la guida usa strumenti con un piano gratuito. Se vuoi un dominio tuo (nometuo.it) costa qualche euro l'anno, e la guida ti dice come prenderlo.",
  },
  {
    q: "Devo saper programmare?",
    a: "No. Se sai scrivere un messaggio, sai dare istruzioni all'AI: la guida ti dice quali, e in che ordine.",
  },
  {
    q: "Come la ricevo?",
    a: "In digitale: la leggi da telefono o computer, ed è tua.",
  },
  {
    q: "E se mi blocco?",
    a: "Scrivici SITO: ti diciamo come andare avanti. E se preferisci, il sito te lo facciamo noi.",
  },
];

/* ---------- The crash course (/ai) ---------- */

export const COURSE = {
  name: "AI al lavoro",
  /** Euro, VAT included; null until it's set (the page then sends the keyword). */
  price: null as number | null,
  checkout: null as string | null,
  modules: [
    { t: "Cosa delegare", d: "Cosa dare all'AI, cosa no, e come controllare quello che fa." },
    { t: "I tuoi assistenti", d: "Istruzioni e flussi per il tuo mestiere: email, preventivi, contenuti, ricerche." },
    { t: "Il tuo sito, con l'AI", d: "Lo costruisci durante il corso. Lo ospitiamo noi: il primo anno è gratis." },
    { t: "Lavoro nuovo", d: "Il tempo che ti restituisce, trasformato in servizi e clienti." },
  ] as Chapter[],
};

/** The site built in the course, on the studio's hosting. */
export const HOSTING = {
  /** Euro per year from the second year; null until it's set (the page
   *  then names the yearly fee without a figure). */
  yearTwo: null as number | null,
};

/** The scene on /ai: the needle goes from fear to leverage. */
export const METER = [
  { word: "PAURA", t: "«Mi ruberà il lavoro.»", d: "Lo ruba a chi la subisce. Non a chi la usa." },
  { word: "METODO", t: "Le dai i compiti giusti.", d: "Nell'ordine giusto, con le istruzioni giuste: in poche ore fa il lavoro di un team." },
  { word: "LEVA", t: "Il tempo torna a te.", d: "E diventa lavoro nuovo: più clienti, più servizi, gli stessi giorni." },
];

export const AI_QA: Qa[] = [
  {
    q: "Funziona per il mio lavoro?",
    a: "Se il tuo lavoro passa da un computer, sì: il corso parte da quello che fanno tutti i professionisti — email, preventivi, contenuti, ricerche — e lo porta sul tuo mestiere.",
  },
  {
    q: "Devo già saper usare l'AI?",
    a: "No: si parte da zero. Alla fine hai i tuoi assistenti, pronti al lavoro.",
  },
  {
    q: "Il sito gratis ha dei vincoli?",
    a: "Il primo anno lo ospitiamo noi, gratis. Dal secondo anno paghi il canone annuale; se non ti serve più, non rinnovi.",
  },
];
