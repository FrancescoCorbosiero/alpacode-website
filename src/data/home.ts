import type { Lang } from "../i18n/types";

/* ---------------- Hero ---------------- */
export interface HeroMetaCell {
  k: string;
  v: string;
  d: string;
}
export interface HeroData {
  eyebrow: string;
  sub: string;
  cta1: string;
  cta2: string;
  meta: HeroMetaCell[];
  statusLabel: string;
  statusVal: string;
}

export const hero: Record<Lang, HeroData> = {
  it: {
    eyebrow: "MZ · MI — IT · EST. 2025",
    sub: "Soluzioni Digitali",
    cta1: "Prenota una call",
    cta2: "Esplora i lavori",
    meta: [
      { k: "Sede", v: "Monza · Milano", d: "IT" },
      { k: "Operatività", v: "Lun — Ven", d: "09:00 — 18:00 CET" },
      { k: "Dal", v: "2025", d: "un progetto alla volta" },
      { k: "Ambiti", v: "03", d: "costruire · far crescere · insegnare" },
    ],
    statusLabel: "DISPONIBILE",
    statusVal: "Nuovi progetti Q3 2026",
  },
  en: {
    eyebrow: "MZ · MI — IT · EST. 2025",
    sub: "Digital Solutions",
    cta1: "Book a call",
    cta2: "See the work",
    meta: [
      { k: "Studio", v: "Monza · Milan", d: "IT" },
      { k: "Hours", v: "Mon — Fri", d: "09:00 — 18:00 CET" },
      { k: "Since", v: "2025", d: "one project at a time" },
      { k: "Practice", v: "03", d: "build · grow · teach" },
    ],
    statusLabel: "AVAILABLE",
    statusVal: "New projects Q3 2026",
  },
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
    num: "02 · COSA FACCIAMO",
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
    num: "02 · WHAT WE DO",
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
export interface CaseStudy {
  key: string;
  ind: string;
  nm: string;
  problem: string;
  ptext: string;
  mBefore: { v: string; d: string };
  mAfter: { v: string; d: string };
  quote: string;
  attr: string;
  tag: string;
  /** Resolved at build from src/assets/work/<key>.<ext> (see Home.astro). */
  img?: string;
}
export interface CasesData {
  num: string;
  heading: string;
  lede: string;
  list: CaseStudy[];
}

export const cases: Record<Lang, CasesData> = {
  it: {
    num: "05 · CASI DI STUDIO",
    heading: "Quello che\nabbiamo costruito.",
    lede: "Tre progetti recenti, raccontati con i numeri prima e dopo. La prova che conta più di ogni promessa.",
    list: [
      {
        key: "edilcalmi",
        ind: "Impresa edile · Brianza",
        nm: "EdilCalmi",
        problem: "Maestri artigiani con anni di lavori alle spalle, ma invisibili online: i clienti arrivavano solo col passaparola.",
        ptext:
          "Una landing page diretta e senza fronzoli: i lavori in evidenza, la serietà dei maestri artigiani e il preventivo gratuito a un clic. Ogni sezione porta a un'unica azione — chiedere un preventivo — con i contatti sempre a portata di mano.",
        mBefore: { v: "Offline", d: "solo passaparola" },
        mAfter: { v: "24/7", d: "preventivi dal sito" },
        quote: "«Ora i clienti ci trovano da soli e arrivano già con le idee chiare.»",
        attr: "— Antonio, EdilCalmi",
        tag: "2025 · LANDING & LEAD",
      },
      {
        key: "resellpiacenza",
        ind: "Streetwear & sneakers · Piacenza",
        nm: "ResellPiacenza",
        problem: "Un negozio con un pubblico di veri appassionati, ma vendite ferme ai confini della città.",
        ptext:
          "Un e-commerce completo per vendere capi e sneakers da collezione in tutta Italia: saldi, categorie, pezzi autenticati e checkout rapido. Instagram, TikTok e WhatsApp integrati per trasformare i follower in clienti.",
        mBefore: { v: "Locale", d: "vendite in negozio" },
        mAfter: { v: "Online", d: "vendite in tutta Italia" },
        quote: "«Vendiamo a clienti che non sarebbero mai entrati in negozio.»",
        attr: "— ResellPiacenza",
        tag: "2025 · E-COMMERCE",
      },
      {
        key: "cesana",
        ind: "Broker assicurativo · Milano",
        nm: "Cesana Assicuratori & Brokers",
        problem: "Competenze assicurative di alto livello, raccontate da un sito che non rendeva loro giustizia.",
        ptext:
          "Un sito aziendale che trasmette autorevolezza e chiarezza: settori e servizi, convenzioni, angolo del consumatore e reclami, tutto navigabile. Un'architettura dei contenuti pensata per generare contatti qualificati nei comparti B2B.",
        mBefore: { v: "Datato", d: "poco credibile" },
        mAfter: { v: "8 aree", d: "per settore e comparto" },
        quote: "«Finalmente il sito parla come parliamo noi ai nostri clienti.»",
        attr: "— direzione, Cesana Assicuratori & Brokers",
        tag: "2025 · WEB AZIENDALE",
      },
    ],
  },
  en: {
    num: "05 · CASE STUDIES",
    heading: "What we have built.",
    lede: "Three recent projects, told in numbers before and after. The proof that matters more than any promise.",
    list: [
      {
        key: "edilcalmi",
        ind: "Construction firm · Brianza",
        nm: "EdilCalmi",
        problem: "Skilled craftsmen with years of work behind them, but invisible online: clients came only by word of mouth.",
        ptext:
          "A direct, no-frills landing page: the work front and center, the craftsmen's reputation, and a free quote one click away. Every section drives a single action — request a quote — with contacts always within reach.",
        mBefore: { v: "Offline", d: "word-of-mouth only" },
        mAfter: { v: "24/7", d: "quote requests online" },
        quote: "“Now clients find us on their own and arrive with clear ideas.”",
        attr: "— Antonio, EdilCalmi",
        tag: "2025 · LANDING & LEAD",
      },
      {
        key: "resellpiacenza",
        ind: "Streetwear & sneakers · Piacenza",
        nm: "ResellPiacenza",
        problem: "A shop with a passionate following, but sales stuck at the city limits.",
        ptext:
          "A full e-commerce to sell collectible apparel and sneakers across Italy: sales, categories, authenticated pieces and fast checkout. Instagram, TikTok and WhatsApp built in to turn followers into customers.",
        mBefore: { v: "Local", d: "in-store sales" },
        mAfter: { v: "Online", d: "sales across Italy" },
        quote: "“We sell to customers who'd never have walked into the shop.”",
        attr: "— ResellPiacenza",
        tag: "2025 · E-COMMERCE",
      },
      {
        key: "cesana",
        ind: "Insurance broker · Milan",
        nm: "Cesana Assicuratori & Brokers",
        problem: "High-level insurance expertise, told by a site that didn't do it justice.",
        ptext:
          "A corporate site that conveys authority and clarity: sectors and services, agreements, a consumer corner and complaints, all navigable. A content architecture built to generate qualified B2B leads.",
        mBefore: { v: "Dated", d: "low credibility" },
        mAfter: { v: "8 areas", d: "by sector & line" },
        quote: "“At last the site speaks the way we speak to our clients.”",
        attr: "— management, Cesana Assicuratori & Brokers",
        tag: "2025 · CORPORATE WEB",
      },
    ],
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
}

export const manifesto: Record<Lang, ManifestoData> = {
  it: {
    num: "08 · MANIFESTO",
    heading: "Il web\nè cambiato.",
    lede: "La nostra missione è una: abbattere la barriera dei costi e dei tecnicismi, e digitalizzare privati e imprese in tutta Italia.",
    pillars: [
      { n: "I", label: "PILASTRO I", t: "Il digitale è per tutti.", d: "Un sito o un'app non devono essere un lusso da migliaia di euro. Troviamo soluzioni alla portata di privati e piccole imprese, non solo dei grandi." },
      { n: "II", label: "PILASTRO II", t: "Trasparenza, dall'inizio.", d: "Prezzi, tempi e scelte sul tavolo prima di partire. Sai sempre cosa stai pagando e perché — nessun costo a sorpresa." },
      { n: "III", label: "PILASTRO III", t: "Conta il risultato.", d: "Un sito bello non basta. Lavoriamo perché sia visibile, credibile e porti clienti — e lo misuriamo con numeri veri." },
      { n: "IV", label: "PILASTRO IV", t: "Condividiamo quello che sappiamo.", d: "Quello che impariamo lo restituiamo in corsi, guide e risorse. La conoscenza serve poco se resta chiusa." },
    ],
  },
  en: {
    num: "08 · MANIFESTO",
    heading: "The web\nhas changed.",
    lede: "Our mission is simple: break down the barrier of cost and jargon, and digitalize individuals and businesses across Italy.",
    pillars: [
      { n: "I", label: "PILLAR I", t: "Digital is for everyone.", d: "A website or an app shouldn't be a thousands-of-euros luxury. We find solutions within reach for individuals and small businesses, not just the big players." },
      { n: "II", label: "PILLAR II", t: "Transparent from the start.", d: "Prices, timing and choices on the table before we begin. You always know what you're paying and why — no surprise costs." },
      { n: "III", label: "PILLAR III", t: "Results are what count.", d: "A good-looking site isn't enough. We work so it's visible, credible and brings clients — and we measure it with real numbers." },
      { n: "IV", label: "PILLAR IV", t: "We share what we know.", d: "What we learn we give back as courses, guides and resources. Knowledge serves little if it stays locked away." },
    ],
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
    num: "CONTATTI",
    line1: "Hai un progetto?",
    underline: "Parliamone.",
    sub: "Una call di trenta minuti per capirci. Niente vendite, niente pressioni. Ti diciamo subito se possiamo aiutarti e in che modo.",
    grid: [
      { k: "Scrivici", v: "info@alpacode.it", href: "mailto:info@alpacode.it" },
      { k: "Prenota una call", v: "30 min · gratis", href: "prenota" },
      { k: "Sede", v: "Monza · Milano · IT" },
    ],
    cta: "Apri il modulo di contatto",
  },
  en: {
    num: "CONTACT",
    line1: "Have a project?",
    underline: "Let's talk.",
    sub: "A thirty-minute call to understand. No sales, no pressure. We'll tell you right away if we can help, and how.",
    grid: [
      { k: "Write us", v: "info@alpacode.it", href: "mailto:info@alpacode.it" },
      { k: "Book a call", v: "30 min · free", href: "prenota" },
      { k: "Studio", v: "Monza · Milan · IT" },
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
    num: "01 · ALPACODE PER I PROFESSIONISTI DIGITALI",
    lead: "Come e perché dovresti digitalizzare la tua attività.",
    intro: "Se lavori online, hai bisogno di un sito dedicato alla tua attività: visibile su Google, credibile, fatto per portarti clienti. Un sito datato, invece, li allontana.",
    objection: "Ma come, se i preventivi superano le migliaia di euro?",
    answer: "Alpacode è qui per questo.",
    body: "Abbattiamo la barriera dei costi e dei tecnicismi. Niente parcelle da agenzia, niente sorprese: un prezzo chiaro, deciso prima di partire e calibrato su quello che ti serve davvero. E usiamo l'AI dove fa la differenza, per accelerare il lavoro e tenere bassi i costi.",
    chips: ["Prezzo deciso prima", "Niente costi nascosti", "Pagamenti rateizzabili", "Prima call gratuita"],
  },
  en: {
    num: "01 · ALPACODE FOR DIGITAL PROFESSIONALS",
    lead: "How and why you should digitalize your business.",
    intro: "If you work online, you need a website dedicated to your business: visible on Google, credible, built to bring you clients. A dated site, instead, pushes them away.",
    objection: "But how, when quotes run into the thousands of euros?",
    answer: "That's exactly why Alpacode exists.",
    body: "We tear down the barrier of cost and jargon. No agency-sized invoices, no surprises: a clear price, agreed before we start and sized to what you actually need. And we use AI where it counts, to move faster and keep costs down.",
    chips: ["Price agreed up front", "No hidden costs", "Installments available", "First call free"],
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
    num: "03 · COSA OTTIENI",
    heading: "Cosa puoi\naspettarti.",
    lede: "Le competenze tecniche sono il punto di partenza, non l'argomento. A fare la differenza sono il metodo con cui lavoriamo e il risultato che resta alla tua attività.",
    groups: [
      {
        label: "Il nostro lavoro",
        items: [
          { t: "Professionalità", d: "Persone vere, metodo chiaro, consegne nei tempi. Tratti con chi costruisce, non con un centralino." },
          { t: "Affidabilità", d: "Diciamo quello che facciamo e facciamo quello che diciamo. Anche dopo la consegna restiamo al tuo fianco." },
          { t: "Convenienza", d: "Il giusto lavoro al giusto prezzo. Niente sovrapprezzi da agenzia, niente voci che non ti servono." },
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
    num: "03 · WHAT YOU GET",
    heading: "What you can\nexpect.",
    lede: "Technical skill is the starting point, not the pitch. What makes the difference is the method we work with and the result your business is left with.",
    groups: [
      {
        label: "Our work",
        items: [
          { t: "Professionalism", d: "Real people, a clear method, delivered on time. You deal with the people who build, not a call center." },
          { t: "Reliability", d: "We say what we do and do what we say. And we stay by your side long after launch." },
          { t: "Value", d: "The right work at the right price. No agency markup, no line items you don't need." },
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
    num: "04 · IL PERCORSO",
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
    num: "04 · THE PATH",
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
    num: "06 · PRODOTTI",
    heading: "Pacchetti pronti,\nprezzo deciso prima.",
    lede: "Non solo lavori su misura: pacchetti già pronti, con un prezzo chiaro fin dall'inizio. Per partire in fretta, senza preventivi infiniti.",
    cta: "Vedi tutti i prodotti",
  },
  en: {
    num: "06 · PRODUCTS",
    heading: "Ready packages,\nprice agreed up front.",
    lede: "Not only bespoke work: ready-made packages with a clear price from the start. To get going fast, without endless quotes.",
    cta: "See all products",
  },
};

/* ---------------- 07 Process ---------------- */
export interface ProcessStep {
  n: string;
  t: string;
  d: string;
}
export interface ProcessData {
  num: string;
  heading: string;
  lede: string;
  steps: ProcessStep[];
}

export const process: Record<Lang, ProcessData> = {
  it: {
    num: "07 · METODO",
    heading: "Come si parte.",
    lede: "Quattro passi, zero sorprese. Il prezzo lo conosci prima di firmare qualsiasi cosa.",
    steps: [
      { n: "01", t: "Call gratuita", d: "Trenta minuti per capire cosa ti serve. Niente vendite, niente impegno." },
      { n: "02", t: "Proposta chiara", d: "Scope, tempi e prezzo deciso prima. In parole semplici, nero su bianco." },
      { n: "03", t: "Costruiamo insieme", d: "Aggiornamenti a ogni passo. Vedi crescere il progetto e decidi tu." },
      { n: "04", t: "Lancio & supporto", d: "Andiamo online e restiamo. Manutenzione e modifiche quando servono." },
    ],
  },
  en: {
    num: "07 · METHOD",
    heading: "How it starts.",
    lede: "Four steps, zero surprises. You know the price before you sign anything.",
    steps: [
      { n: "01", t: "Free call", d: "Thirty minutes to understand what you need. No sales, no commitment." },
      { n: "02", t: "Clear proposal", d: "Scope, timing and a price agreed up front. In plain words, in writing." },
      { n: "03", t: "We build together", d: "Updates at every step. You watch it grow and you decide." },
      { n: "04", t: "Launch & support", d: "We go live and we stay. Maintenance and changes whenever you need them." },
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
  note: string;
  cta: string;
}

export const coverage: Record<Lang, CoverageData> = {
  it: {
    num: "09 · DOVE OPERIAMO",
    heading: "Da Milano e la Brianza,\nin tutta Italia.",
    lede: "La nostra base è tra Monza, Milano e la Brianza. Ma il digitale non ha confini: lavoriamo da remoto con clienti in tutto il Paese, con la stessa cura di quando siamo di persona.",
    baseLabel: "Base",
    baseValue: "Monza · Milano · Brianza",
    reachLabel: "Copertura",
    reachValue: "Tutta Italia, da remoto",
    hqLabel: "MILANO · BRIANZA",
    note: "Per i progetti più grandi, veniamo volentieri da te.",
    cta: "Lavoriamo insieme",
  },
  en: {
    num: "09 · WHERE WE WORK",
    heading: "From Milan and Brianza,\nacross all Italy.",
    lede: "Our base is between Monza, Milan and the Brianza. But digital has no borders: we work remotely with clients all over the country, with the same care as in person.",
    baseLabel: "Base",
    baseValue: "Monza · Milan · Brianza",
    reachLabel: "Reach",
    reachValue: "All Italy, remotely",
    hqLabel: "MILAN · BRIANZA",
    note: "For bigger projects, we're happy to come to you.",
    cta: "Let's work together",
  },
};

/* ---------------- AI (how we keep quality high, price low) ---------------- */
export interface AiPoint {
  t: string;
  d: string;
}
export interface AiData {
  num: string;
  heading: string;
  lede: string;
  points: AiPoint[];
}

export const ai: Record<Lang, AiData> = {
  it: {
    num: "L'AI, AL NOSTRO FIANCO",
    heading: "L'AI ha cambiato\nle regole.",
    lede: "L'intelligenza artificiale ha rivoluzionato il web e il digitale: per un lavoro di qualità non servono più migliaia di euro. La usiamo per tenere alta la qualità e contenere il prezzo finale — così molte più persone possono avere il proprio spazio digitale.",
    points: [
      { t: "Qualità, non scorciatoie.", d: "L'AI accelera il lavoro ripetitivo. Le scelte, la cura e il controllo finale restano umani — i nostri." },
      { t: "Meno costi, meno prezzo.", d: "Lavorando in modo più efficiente abbattiamo i costi. E quel risparmio finisce nel prezzo che paghi tu." },
      { t: "Il digitale per tutti.", d: "Un sito di qualità non è più un lusso da grandi budget: oggi è alla portata di privati e piccole realtà." },
    ],
  },
  en: {
    num: "AI, BY OUR SIDE",
    heading: "AI changed\nthe rules.",
    lede: "Artificial intelligence has transformed the web and the digital world: quality work no longer costs thousands. We use it to keep quality high and the final price low — so many more people can have their own digital space.",
    points: [
      { t: "Quality, not shortcuts.", d: "AI speeds up the repetitive work. The decisions, the care and the final check stay human — ours." },
      { t: "Lower cost, lower price.", d: "By working more efficiently we cut costs. And that saving ends up in the price you pay." },
      { t: "Digital for everyone.", d: "A quality website is no longer a big-budget luxury: today it's within reach of individuals and small businesses." },
    ],
  },
};
