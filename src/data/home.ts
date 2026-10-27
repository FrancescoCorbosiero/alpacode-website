import type { Lang } from "../i18n/types";

/* ---------------- Hero ---------------- */
export interface HeroData {
  /** One plain line above the headline. */
  kicker: string;
  /** The h1, one entry per line; wrap the highlighted word in *asterisks*. */
  claim: string[];
  lede: string;
  cta1: string;
  cta2: string;
}

export const hero: Record<Lang, HeroData> = {
  it: {
    kicker: "Studio digitale a Monza e Milano",
    claim: ["Digitalizziamo *privati*", "e imprese,", "in tutta Italia."],
    lede: "Siti, e-commerce, branding, pubblicità, software e formazione: tutto il digitale della tua attività, da un solo studio.",
    cta1: "Prenota una call",
    cta2: "Esplora i lavori",
  },
  en: {
    kicker: "Digital studio in Monza & Milan",
    claim: ["We digitalize *people*", "and businesses,", "right across Italy."],
    lede: "Websites, e-commerce, branding, advertising, software and training: all the digital side of your business, from one studio.",
    cta1: "Book a call",
    cta2: "See the work",
  },
};

/* ---------------- Hero background video ----------------
   null → the typographic hero (brand lockup over the cube field).
   Set → the "blueprint" hero: full-bleed video in a duotone of the brand
   blue, paper-colored type (components.css, .hero--video). The footage
   (blue ink spreading in milk) is made web-ready by
   tools/media/hero-video.mjs (`npm run hero-video`, needs ffmpeg) from
   tools/media/hero-source.mp4: a seamless crossfaded loop, the blue grade
   that keeps the type AA without a scrim, VP9 WebM + H.264 MP4 with no
   audio, and the first frame as poster. Replace the source and re-run it;
   another clip works as long as it gets the same grade. Reduced-motion
   visitors and Save-Data connections get the poster only; everyone else
   gets a pause button (WCAG 2.2.2). */
export interface HeroVideo {
  /** H.264 MP4 — required, plays everywhere. */
  mp4: string;
  /** VP9/AV1 WebM — optional, smaller where supported. */
  webm?: string;
  /** First-frame still: shown before playback and instead of the video
   *  under reduced motion / Save-Data. */
  poster: string;
}

export const heroVideo: HeroVideo | null = {
  mp4: "/media/hero.mp4",
  webm: "/media/hero.webm",
  poster: "/media/hero-poster.webp",
};

/* ---------------- Statement (between the pitch and the services) ---------------- */
export const homeStatement: Record<Lang, string> = {
  it: "Un sito bello non basta. Lavoriamo perché sia visibile, credibile e porti clienti: lo progettiamo, lo costruiamo e lo seguiamo anche dopo il lancio.",
  en: "A good-looking site isn't enough. We work so it's visible, credible and brings in clients: we design it, build it, and look after it once it's live.",
};

/* ---------------- 01 Verbs ---------------- */
export interface Verb {
  num: string;
  word: string;
  accent: string;
  d: string;
  items: string[];
}
export interface VerbsData {
  num: string;
  heading: string;
  lede: string;
  list: Verb[];
}

export const verbs: Record<Lang, VerbsData> = {
  it: {
    num: "Cosa facciamo",
    heading: "Tre modi\ndi aiutarti.",
    lede: "Dal primo sito alla digitalizzazione completa. Ci occupiamo di tutto il digitale della tua attività — anche di quello che di solito chiedi a un'agenzia.",
    list: [
      {
        num: "01",
        word: "Costruire",
        accent: "ire",
        d: "La base digitale della tua attività: il sito, il negozio online, il gestionale. Curati, semplici da usare e fatti per durare.",
        items: ["Siti & e-commerce", "Software & gestionali", "App e portali su misura", "Veloci e sempre online"],
      },
      {
        num: "02",
        word: "Far crescere",
        accent: "ere",
        d: "Branding, design, pubblicità e SEO: tutto quello che un'agenzia di comunicazione fa per farti trovare, scegliere e ricordare.",
        items: ["Branding & identità visiva", "Design e UI/UX", "Campagne Google & Meta", "SEO e contenuti"],
      },
      {
        num: "03",
        word: "Insegnare",
        accent: "are",
        d: "Corsi, kit e percorsi pratici per imparare a gestire il tuo digitale in autonomia. Formiamo te e il tuo team, al vostro ritmo.",
        items: ["Corsi pratici", "Kit e risorse pronte", "Formazione per team", "Assistenza dopo il corso"],
      },
    ],
  },
  en: {
    num: "What we do",
    heading: "Three ways\nto help.",
    lede: "From a first website to full digitalization. We handle all the digital side of your business — including what you'd normally ask an agency for.",
    list: [
      {
        num: "01",
        word: "Build",
        accent: "d",
        d: "The digital backbone of your business: the site, the online shop, the internal tools. Crafted, easy to use and made to last.",
        items: ["Websites & e-commerce", "Software & internal tools", "Custom apps and portals", "Fast and always online"],
      },
      {
        num: "02",
        word: "Grow",
        accent: "w",
        d: "Branding, design, advertising and SEO: everything a communication agency does to help people find, choose and remember you.",
        items: ["Branding & visual identity", "Design and UI/UX", "Google & Meta campaigns", "SEO and content"],
      },
      {
        num: "03",
        word: "Teach",
        accent: "h",
        d: "Practical courses, kits and paths to learn how to run your own digital, at your pace. We train you and your team.",
        items: ["Practical courses", "Ready-made kits & resources", "Team training", "Help after the course"],
      },
    ],
  },
};

/* ---------------- 02 Cases ---------------- */
/* The cases themselves are work entries with `featured` and `case`
   (src/content/work/*.md): the same story on the home and on the
   case page. */
export interface CasesData {
  num: string;
  heading: string;
  lede: string;
}

export const cases: Record<Lang, CasesData> = {
  it: {
    num: "Casi di studio",
    heading: "Quello che\nabbiamo costruito.",
    lede: "Tre progetti recenti, raccontati con il prima e il dopo. La prova che conta più di ogni promessa.",
  },
  en: {
    num: "Case studies",
    heading: "What we have built.",
    lede: "Three recent projects, told by their before and after. The proof that matters more than any promise.",
  },
};

/* ---------------- 03 Manifesto ---------------- */
export interface Pillar {
  n: string;
  label: string;
  t: string;
  d: string;
}
export interface ManifestoData {
  num: string;
  heading: string;
  lede: string;
  pillars: Pillar[];
  /** The manifesto is signed by a person, not a brand. */
  sig: { name: string; role: string };
}

export const manifesto: Record<Lang, ManifestoData> = {
  it: {
    num: "Manifesto",
    heading: "Il web\nè cambiato.",
    lede: "La nostra missione è una: abbattere la barriera dei costi e dei tecnicismi, e digitalizzare privati e imprese in tutta Italia.",
    pillars: [
      { n: "I", label: "Pilastro I", t: "Il digitale è per tutti.", d: "Un sito o un'app non devono essere un lusso da migliaia di euro. Troviamo soluzioni alla portata di privati e piccole imprese, non solo dei grandi." },
      { n: "II", label: "Pilastro II", t: "Si sceglie insieme.", d: "Ogni scelta tecnica te la spieghiamo in parole semplici, prima di farla: cosa costruiamo, in che ordine e perché. A decidere sei tu." },
      { n: "III", label: "Pilastro III", t: "Conta il risultato.", d: "Un sito bello non basta. Lavoriamo perché sia visibile, credibile e porti clienti — e lo misuriamo con numeri veri." },
      { n: "IV", label: "Pilastro IV", t: "Condividiamo quello che sappiamo.", d: "Quello che impariamo lo restituiamo in corsi, guide e risorse. La conoscenza serve poco se resta chiusa." },
    ],
    sig: { name: "Francesco Corbosiero", role: "fondatore, Alpacode" },
  },
  en: {
    num: "Manifesto",
    heading: "The web\nhas changed.",
    lede: "Our mission is simple: break down the barrier of cost and jargon, and digitalize individuals and businesses across Italy.",
    pillars: [
      { n: "I", label: "Pillar I", t: "Digital is for everyone.", d: "A website or an app shouldn't be a thousands-of-euros luxury. We find solutions within reach for individuals and small businesses, not just the big players." },
      { n: "II", label: "Pillar II", t: "We choose together.", d: "We explain every technical choice in plain words before we make it: what we build, in what order and why. You have the final say." },
      { n: "III", label: "Pillar III", t: "Results are what count.", d: "A good-looking site isn't enough. We work so it's visible, credible and brings clients — and we measure it with real numbers." },
      { n: "IV", label: "Pillar IV", t: "We share what we know.", d: "What we learn we give back as courses, guides and resources. Knowledge serves little if it stays locked away." },
    ],
    sig: { name: "Francesco Corbosiero", role: "founder, Alpacode" },
  },
};

/* ---------------- 04 Final CTA ---------------- */
export interface CtaCell {
  k: string;
  v: string;
  href?: string;
}
export interface CtaData {
  num: string;
  line1: string;
  underline: string;
  sub: string;
  grid: CtaCell[];
  cta: string;
}

export const ctaFinal: Record<Lang, CtaData> = {
  it: {
    num: "Contatti",
    line1: "Hai un progetto?",
    underline: "Parliamone.",
    sub: "Una call di trenta minuti per capirci. Niente vendite, niente pressioni. Ti diciamo subito se possiamo aiutarti e in che modo.",
    grid: [
      { k: "Scrivici", v: "info@alpacode.it", href: "mailto:info@alpacode.it" },
      { k: "Prenota una call", v: "30 min · gratis", href: "prenota" },
      { k: "Racconta il progetto", v: "60 secondi · 3 tap", href: "contatti#brief" },
    ],
    cta: "Apri il modulo di contatto",
  },
  en: {
    num: "Contact",
    line1: "Have a project?",
    underline: "Let's talk.",
    sub: "A thirty-minute call to understand. No sales, no pressure. We'll tell you right away if we can help, and how.",
    grid: [
      { k: "Write us", v: "info@alpacode.it", href: "mailto:info@alpacode.it" },
      { k: "Book a call", v: "30 min · free", href: "prenota" },
      { k: "Tell us your project", v: "60 seconds · 3 taps", href: "contatti#brief" },
    ],
    cta: "Open the contact form",
  },
};

/* ---------------- 01 Pitch (cost-barrier) ---------------- */
export interface PitchData {
  num: string;
  lead: string;
  intro: string;
  objection: string;
  answer: string;
  body: string;
  chips: string[];
}

export const pitch: Record<Lang, PitchData> = {
  it: {
    num: "Alpacode per i professionisti digitali",
    lead: "Come e perché dovresti digitalizzare la tua attività.",
    intro: "Se lavori online, hai bisogno di un sito dedicato alla tua attività: visibile su Google, credibile, fatto per portarti clienti. Un sito datato, invece, li allontana.",
    objection: "Ma come, se i preventivi superano le migliaia di euro?",
    answer: "Alpacode è qui per questo.",
    body: "Abbattiamo la barriera dei costi e dei tecnicismi. Partiamo da cosa ti serve davvero e dal budget che hai, anche quando è contenuto, e costruiamo quello. L'AI la usiamo dove accelera il lavoro ripetitivo: il tempo, e il tuo investimento, vanno nelle scelte che contano.",
    chips: ["Prima call gratuita", "Proposta scritta in pochi giorni", "Pagamenti rateizzabili", "Un solo referente"],
  },
  en: {
    num: "Alpacode for digital professionals",
    lead: "How and why you should digitalize your business.",
    intro: "If you work online, you need a website dedicated to your business: visible on Google, credible, built to bring you clients. A dated site, instead, pushes them away.",
    objection: "But how, when quotes run into the thousands of euros?",
    answer: "That's exactly why Alpacode exists.",
    body: "We tear down the barrier of cost and jargon. We start from what you actually need and the budget you have, even a small one, and build exactly that. We use AI where it speeds up the repetitive work: the time, and your money, go into the decisions that matter.",
    chips: ["First call free", "Written proposal within days", "Installments available", "One point of contact"],
  },
};

/* ---------------- 03 Values ---------------- */
export interface ValueItem {
  t: string;
  d: string;
}
export interface ValueGroup {
  label: string;
  items: ValueItem[];
}
export interface ValuesData {
  num: string;
  heading: string;
  lede: string;
  groups: ValueGroup[];
}

export const values: Record<Lang, ValuesData> = {
  it: {
    num: "Cosa ottieni",
    heading: "Cosa puoi\naspettarti.",
    lede: "Le competenze tecniche sono il punto di partenza, non l'argomento. A fare la differenza sono il metodo con cui lavoriamo e il risultato che resta alla tua attività.",
    groups: [
      {
        label: "Il nostro lavoro",
        items: [
          { t: "Professionalità", d: "Persone vere, metodo chiaro, consegne nei tempi. Tratti con chi costruisce, non con un centralino." },
          { t: "Affidabilità", d: "Diciamo quello che facciamo e facciamo quello che diciamo. Anche dopo la consegna restiamo al tuo fianco." },
          { t: "Convenienza", d: "Ti proponiamo solo il lavoro che serve alla tua attività: quello che non ti porta niente non finisce nel preventivo." },
        ],
      },
      {
        label: "Il tuo risultato",
        items: [
          { t: "Semplicità", d: "Strumenti che usi senza manuale. Ti spieghiamo tutto in parole semplici: a decidere sei sempre tu." },
          { t: "Investimento", d: "Non una spesa, ma qualcosa che ti torna indietro: più clienti, meno tempo perso, un'attività che cresce." },
          { t: "Feedback", d: "Ci confrontiamo a ogni passo e misuriamo i risultati con numeri veri. Niente promesse al buio." },
        ],
      },
    ],
  },
  en: {
    num: "What you get",
    heading: "What you can\nexpect.",
    lede: "Technical skill is the starting point, not the pitch. What makes the difference is the method we work with and the result your business is left with.",
    groups: [
      {
        label: "Our work",
        items: [
          { t: "Professionalism", d: "Real people, a clear method, delivered on time. You deal with the people who build, not a call center." },
          { t: "Reliability", d: "We say what we do and do what we say. And we stay by your side long after launch." },
          { t: "Value", d: "We only propose the work your business needs: anything that brings you nothing stays out of the quote." },
        ],
      },
      {
        label: "Your result",
        items: [
          { t: "Simplicity", d: "Tools you use without a manual. We explain everything in plain words: you always decide." },
          { t: "Investment", d: "Not an expense, but something that pays you back: more clients, less wasted time, a business that grows." },
          { t: "Feedback", d: "We check in at every step and measure results with real numbers. No promises in the dark." },
        ],
      },
    ],
  },
};

/* ---------------- 04 Scale (the path) ---------------- */
export interface ScaleStage {
  n: string;
  tab: string;
  title: string;
  d: string;
  items: string[];
  ideal: string;
}
export interface ScaleData {
  num: string;
  heading: string;
  lede: string;
  includeLabel: string;
  idealLabel: string;
  note: string;
  cta: string;
  stages: ScaleStage[];
}

export const scale: Record<Lang, ScaleData> = {
  it: {
    num: "Il percorso",
    heading: "Cresci alla\ntua scala.",
    lede: "Lavoriamo con realtà molto diverse e ci adattiamo a ognuna: da un semplice sito alla digitalizzazione completa, da un servizio flash alla consulenza dedicata. Scegli da dove partire.",
    includeLabel: "Cosa include",
    idealLabel: "Ideale per",
    note: "Partiamo da dove sei tu, non da un listino.",
    cta: "Trova il tuo punto di partenza",
    stages: [
      {
        n: "01",
        tab: "Esserci",
        title: "Un sito che ti fa fare bella figura.",
        d: "Il primo passo: una presenza online curata, veloce e visibile su Google. Un sito obsoleto allontana i clienti — uno fatto bene dà credibilità e raccoglie i primi contatti.",
        items: ["Sito o landing page", "Visibilità su Google", "Design & contenuti", "Modulo di contatto"],
        ideal: "Chi parte da zero o ha un sito ormai datato.",
      },
      {
        n: "02",
        tab: "Vendere",
        title: "Trasformare le visite in clienti.",
        d: "Non basta un sito bello da vedere: serve un sito che venda. E-commerce o funnel pensati per convertire, con la pubblicità che porta le persone giuste e i numeri che lo dimostrano.",
        items: ["E-commerce o funnel", "Pagamenti & spedizioni", "Campagne Google & Meta", "Tracciamento dei risultati"],
        ideal: "Chi vuole vendere online o generare contatti.",
      },
      {
        n: "03",
        tab: "Automatizzare",
        title: "Far lavorare il digitale per te.",
        d: "Gestionali, integrazioni e automazioni — anche con l'AI — che tolgono il lavoro ripetitivo e tengono tutto in ordine. Il tempo che risparmi torna alla tua attività.",
        items: ["Gestionale su misura", "Integrazioni ERP & CRM", "Automazioni di processo", "Dashboard e report"],
        ideal: "Chi perde troppo tempo in attività manuali.",
      },
      {
        n: "04",
        tab: "Digitalizzare tutto",
        title: "Tutta l'attività, online.",
        d: "Il percorso completo: strategia, sito, vendite, software, brand e formazione, seguiti nel tempo da un unico interlocutore. Una digitalizzazione vera, un passo alla volta.",
        items: ["Strategia & roadmap", "Tutto il digitale, integrato", "Brand & comunicazione", "Supporto continuativo"],
        ideal: "Imprese che vogliono digitalizzare sul serio.",
      },
    ],
  },
  en: {
    num: "The path",
    heading: "Grow at\nyour scale.",
    lede: "We work with very different realities and adapt to each one: from a simple website to full digitalization, from a flash service to dedicated consulting. Pick where to start.",
    includeLabel: "What's included",
    idealLabel: "Ideal for",
    note: "We start from where you are, not from a price list.",
    cta: "Find your starting point",
    stages: [
      {
        n: "01",
        tab: "Be there",
        title: "A site that makes a good impression.",
        d: "The first step: a polished online presence, fast and visible on Google. An outdated site pushes clients away — a good one gives credibility and gathers your first leads.",
        items: ["Website or landing page", "Visibility on Google", "Design & content", "Contact form"],
        ideal: "Starting from scratch or with a dated site.",
      },
      {
        n: "02",
        tab: "Sell",
        title: "Turn visits into clients.",
        d: "A nice-looking site isn't enough: you need one that sells. E-commerce or funnels built to convert, with advertising that brings the right people and numbers that prove it.",
        items: ["E-commerce or funnel", "Payments & shipping", "Google & Meta campaigns", "Results tracking"],
        ideal: "Selling online or generating leads.",
      },
      {
        n: "03",
        tab: "Automate",
        title: "Make digital work for you.",
        d: "Internal tools, integrations and automations — AI included — that remove repetitive work and keep everything in order. The time you save goes back to your business.",
        items: ["Custom internal tool", "ERP & CRM integrations", "Process automations", "Dashboards and reports"],
        ideal: "Losing too much time on manual tasks.",
      },
      {
        n: "04",
        tab: "Digitalize it all",
        title: "Your whole business, online.",
        d: "The complete path: strategy, site, sales, software, brand and training, followed over time by a single point of contact. Real digitalization, one step at a time.",
        items: ["Strategy & roadmap", "All your digital, integrated", "Brand & communication", "Ongoing support"],
        ideal: "Businesses ready to digitalize for real.",
      },
    ],
  },
};

/* ---------------- 06 Products teaser ---------------- */
export interface ProductsTeaserData {
  num: string;
  heading: string;
  lede: string;
  cta: string;
}

export const productsTeaser: Record<Lang, ProductsTeaserData> = {
  it: {
    num: "Prodotti",
    heading: "Pacchetti pronti,\nper partire subito.",
    lede: "Non solo lavori su misura: pacchetti con contenuti e tempi già definiti, per partire in fretta.",
    cta: "Vedi tutti i prodotti",
  },
  en: {
    num: "Products",
    heading: "Ready packages,\nto start right away.",
    lede: "Not only bespoke work: packages with scope and timing already set, to get going fast.",
    cta: "See all products",
  },
};

/* ---------------- 07 Process ---------------- */
export interface ProcessStep {
  n: string;
  t: string;
  d: string;
  /** On the departures board (Process.astro): the step's destination,
   *  eight letters at most, in the big flaps… */
  to: string;
  /** …and its note, in the board's blue. */
  note: string;
}
export interface ProcessData {
  num: string;
  heading: string;
  lede: string;
  /** The board's own words: its title, where it leaves from, the labels
   *  of its columns and of the steps to come. */
  board: { title: string; from: string; step: string; to: string; next: string };
  steps: ProcessStep[];
}

export const process: Record<Lang, ProcessData> = {
  it: {
    num: "Metodo",
    heading: "Come si parte.",
    lede: "Dalla prima call al lancio, in quattro passi.",
    board: { title: "Partenze", from: "Monza · Milano", step: "Passo", to: "Destinazione", next: "A seguire" },
    steps: [
      { n: "01", t: "Call gratuita", d: "Trenta minuti per capire cosa ti serve. Niente vendite, niente impegno.", to: "CALL", note: "30 minuti" },
      { n: "02", t: "Proposta scritta", d: "Entro pochi giorni: cosa faremo, in quanto tempo e a che costo, in parole semplici.", to: "PROPOSTA", note: "cosa · tempi · costo" },
      { n: "03", t: "Costruiamo insieme", d: "Aggiornamenti a ogni passo. Vedi crescere il progetto e decidi tu.", to: "SVILUPPO", note: "lo vedi crescere" },
      { n: "04", t: "Lancio & supporto", d: "Andiamo online e restiamo. Manutenzione e modifiche quando servono.", to: "ONLINE", note: "e restiamo" },
    ],
  },
  en: {
    num: "Method",
    heading: "How it starts.",
    lede: "From the first call to launch, in four steps.",
    board: { title: "Departures", from: "Monza · Milan", step: "Step", to: "Destination", next: "Next" },
    steps: [
      { n: "01", t: "Free call", d: "Thirty minutes to understand what you need. No sales, no commitment.", to: "CALL", note: "30 minutes" },
      { n: "02", t: "Written proposal", d: "Within a few days: what we'll do, how long it takes and what it costs, in plain words.", to: "PROPOSAL", note: "what · when · cost" },
      { n: "03", t: "We build together", d: "Updates at every step. You watch it grow and you decide.", to: "BUILD", note: "you watch it grow" },
      { n: "04", t: "Launch & support", d: "We go live and we stay. Maintenance and changes whenever you need them.", to: "LIVE", note: "and we stay" },
    ],
  },
};

/* ---------------- 09 Coverage (map) ---------------- */
export interface CoverageData {
  num: string;
  heading: string;
  lede: string;
  baseLabel: string;
  baseValue: string;
  reachLabel: string;
  reachValue: string;
  hqLabel: string;
  /** The heading of the list of places with a client. */
  clientsLabel: string;
  /** The map's key: a client's arc, an arc of reach. */
  keyClients: string;
  keyReach: string;
  note: string;
  cta: string;
}

export const coverage: Record<Lang, CoverageData> = {
  it: {
    num: "Dove operiamo",
    heading: "Da Milano e la Brianza,\nin tutta Italia.",
    lede: "La nostra base è tra Monza, Milano e la Brianza. Ma il digitale non ha confini: lavoriamo da remoto con clienti in tutto il Paese, con la stessa cura di quando siamo di persona.",
    baseLabel: "Base",
    baseValue: "Monza · Milano · Brianza",
    reachLabel: "Copertura",
    reachValue: "Tutta Italia, da remoto",
    hqLabel: "Monza · Milano · Brianza",
    clientsLabel: "Dove sono i clienti",
    keyClients: "Clienti",
    keyReach: "Da remoto, in tutta Italia",
    note: "Per i progetti più grandi, veniamo volentieri da te.",
    cta: "Lavoriamo insieme",
  },
  en: {
    num: "Where we work",
    heading: "From Milan and Brianza,\nacross all Italy.",
    lede: "Our base is between Monza, Milan and the Brianza. But digital has no borders: we work remotely with clients all over the country, with the same care as in person.",
    baseLabel: "Base",
    baseValue: "Monza · Milan · Brianza",
    reachLabel: "Reach",
    reachValue: "All Italy, remotely",
    hqLabel: "Monza · Milan · Brianza",
    clientsLabel: "Where our clients are",
    keyClients: "Clients",
    keyReach: "Remotely, across Italy",
    note: "For bigger projects, we're happy to come to you.",
    cta: "Let's work together",
  },
};
