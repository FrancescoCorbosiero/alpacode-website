/* ============================================================
   What the studio sells from the site: the site guide and its
   marketing module, the crash course for freelancers, and the site
   built in the course, hosted by Alpacode.

   Buying on the site. Each offer has a `checkout`: null until the
   product exists on a payment provider; then its link and the
   provider:
     lemonsqueezy  the checkout link of the product (Lemon Squeezy,
                   now part of Stripe): it opens as an overlay on the
                   page (lib/checkout.ts loads lemon.js on demand);
     gumroad       the product's gumroad.com link: overlay too
                   (gumroad.js, on demand);
     stripe        a Stripe Payment Link: the visitor goes to Stripe's
                   page and comes back to /grazie/.
   Without a checkout the button becomes "Chiedi", which opens the
   contact form with the product already chosen.
   A merchant of record (Lemon Squeezy, Gumroad) handles EU VAT on
   digital products and delivers the files; with Stripe alone the VAT
   is yours. Set the provider's success URL to
   https://studio.alpacode.it/grazie/ and its webhook to
   /api/checkout/<provider> (README, "Buying on the site").

   Prices are final prices to the consumer (VAT included). The
   contents are a draft of each product: line them up with the real
   guide, module and course before selling.
   ============================================================ */

export type Provider = "lemonsqueezy" | "gumroad" | "stripe";

export interface Checkout {
  provider: Provider;
  url: string;
}

export interface Offer {
  id: string;
  name: string;
  /** Euro, VAT included; null until it's set. */
  price: number | null;
  checkout: Checkout | null;
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

export interface Product {
  slug: string;
  name: string;
  kind: string;
  /** On the index card. */
  line: string;
  /** From the cheapest offer; null until set. */
  from: number | null;
  accent: string;
}

/* ---------- The site guide ---------- */

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

export const GUIDE_OFFERS: Offer[] = [
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

export const GUIDE_QA: Qa[] = [
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
    a: "In digitale, subito dopo l'acquisto: la scarichi dal link che ti arriva per email e la leggi da telefono o computer. È tua.",
  },
  {
    q: "E se mi blocco?",
    a: "Scrivici: ti diciamo come andare avanti. E se preferisci, il sito te lo fa Alpacode.",
  },
];

/* ---------- The crash course ---------- */

export const COURSE = {
  name: "AI al lavoro",
  /** Euro, VAT included; null until it's set (the page then asks). */
  price: null as number | null,
  checkout: null as Checkout | null,
  modules: [
    { t: "Cosa delegare", d: "Cosa dare all'AI, cosa no, e come controllare quello che fa." },
    { t: "I tuoi assistenti", d: "Istruzioni e flussi per il tuo mestiere: email, preventivi, contenuti, ricerche." },
    { t: "Il tuo sito, con l'AI", d: "Lo costruisci durante il corso. Lo ospita Alpacode: il primo anno è gratis." },
    { t: "Lavoro nuovo", d: "Il tempo che ti restituisce, trasformato in servizi e clienti." },
  ] as Chapter[],
};

/** The site built in the course, on Alpacode's hosting. */
export const HOSTING = {
  /** Euro per year from the second year; null until it's set (the page
   *  then names the yearly fee without a figure). */
  yearTwo: null as number | null,
};

/** The scene on the course page: the needle goes from fear to leverage. */
export const METER = [
  { word: "PAURA", t: "«Mi ruberà il lavoro.»", d: "Lo ruba a chi la subisce. Non a chi la usa." },
  { word: "METODO", t: "Le dai i compiti giusti.", d: "Nell'ordine giusto, con le istruzioni giuste: in poche ore fa il lavoro di un team." },
  { word: "LEVA", t: "Il tempo torna a te.", d: "E diventa lavoro nuovo: più clienti, più servizi, gli stessi giorni." },
];

export const COURSE_QA: Qa[] = [
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
    a: "Il primo anno lo ospita Alpacode, gratis. Dal secondo anno paghi il canone annuale; se non ti serve più, non rinnovi.",
  },
];

/* ---------- The index ---------- */

export const PRODUCTS: Product[] = [
  {
    slug: "guida-sito-vetrina",
    name: GUIDE.name,
    kind: "Guida · fai da te",
    line: "Il tuo sito vetrina, fatto da te con l'AI: dalla prima pagina al sito online. Con il modulo Marketing, anche i clienti che lo trovano.",
    from: GUIDE.price,
    accent: "#d4ff3a",
  },
  {
    slug: "ai-al-lavoro",
    name: `Crash course «${COURSE.name}»`,
    kind: "Crash course · per partite IVA",
    line: "L'AI al lavoro sul tuo mestiere, e il tuo sito costruito durante il corso: lo ospita Alpacode, gratis il primo anno.",
    from: COURSE.price,
    accent: "#9d8cff",
  },
];
