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
      { k: "Ambiti", v: "03", d: "costruire · consigliare · insegnare" },
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
      { k: "Practice", v: "03", d: "build · advise · teach" },
    ],
    statusLabel: "AVAILABLE",
    statusVal: "New projects Q3 2026",
  },
};

/* ---------------- §01 Verbs ---------------- */
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
    num: "§01 · SERVIZI",
    heading: "Tre verbi.\nNiente di più.",
    lede: "Ci concentriamo su poche cose e le facciamo bene. Niente pacchetti gonfiati, niente costi nascosti, parole chiare.",
    list: [
      {
        num: "01",
        word: "Costruire",
        accent: "ire",
        d: "Siti, web app, software su misura, integrazioni. Soluzioni curate, costruite per durare e semplici da gestire nel tempo.",
        items: ["Sviluppo siti & web app", "Software su misura", "Integrazioni & automazioni", "Performance & SEO"],
      },
      {
        num: "02",
        word: "Consigliare",
        accent: "are",
        d: "Audit, roadmap, scelte tecnologiche. Lavoriamo a fianco del cliente, in italiano e senza fumo.",
        items: ["Audit tecnico & UX", "Roadmap di prodotto", "Trasformazione digitale", "Selezione fornitori"],
      },
      {
        num: "03",
        word: "Insegnare",
        accent: "are",
        d: "Corsi e percorsi pratici per chi vuole imparare a muoversi nel digitale. Materiali che restano, esempi concreti.",
        items: ["Percorsi per chi inizia", "Approfondimenti pratici", "Kit e risorse pronte", "Formazione per team"],
      },
    ],
  },
  en: {
    num: "§01 · SERVICES",
    heading: "Three verbs.\nNothing more.",
    lede: "We focus on a few things and do them well. No padded packages, no hidden costs, plain words.",
    list: [
      {
        num: "01",
        word: "Build",
        accent: "d",
        d: "Websites, web apps, custom software, integrations. Crafted to last and easy to maintain over time.",
        items: ["Websites & web apps", "Custom software", "Integrations & automations", "Performance & SEO"],
      },
      {
        num: "02",
        word: "Advise",
        accent: "e",
        d: "Audits, roadmaps, technology choices. We work next to the client, plainly, no smoke.",
        items: ["Tech & UX audits", "Product roadmap", "Digital transformation", "Vendor selection"],
      },
      {
        num: "03",
        word: "Teach",
        accent: "h",
        d: "Practical courses and paths for anyone who wants to find their way in digital. Materials that last, real examples.",
        items: ["Paths for beginners", "Practical deep-dives", "Ready-made kits & resources", "Team training"],
      },
    ],
  },
};

/* ---------------- §02 Cases ---------------- */
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
}
export interface CasesData {
  num: string;
  heading: string;
  lede: string;
  list: CaseStudy[];
}

export const cases: Record<Lang, CasesData> = {
  it: {
    num: "§02 · CASI DI STUDIO",
    heading: "Quello che\nabbiamo costruito.",
    lede: "Tre progetti recenti, raccontati con i numeri prima e dopo.",
    list: [
      {
        key: "studio-legale",
        ind: "Studio professionale · Milano",
        nm: "Sito istituzionale & area clienti",
        problem: "Sito statico del 2014, niente lead, processi via email.",
        ptext:
          "Abbiamo riprogettato l'identità digitale e costruito un'area clienti riservata: documenti, fatture e prenotazioni in un unico posto. Il sito principale ora carica in meno di un secondo.",
        mBefore: { v: "5.8s", d: "LCP medio" },
        mAfter: { v: "0.7s", d: "LCP medio" },
        quote: "«È la prima volta in dieci anni che i clienti ci scrivono per dire che il sito è chiaro.»",
        attr: "— Avv. M., partner",
        tag: "2025 · WEB + SOFTWARE",
      },
      {
        key: "manifatturiero",
        ind: "PMI manifatturiera · Brianza",
        nm: "Configuratore prodotto B2B",
        problem: "Cataloghi PDF, listini Excel, quotazioni che richiedevano due giorni.",
        ptext:
          "Un configuratore web collegato all'ERP: il commerciale costruisce l'offerta in 6 minuti, il cliente la riceve in PDF firmato. Onboarding fatto in 2 mezze giornate.",
        mBefore: { v: "2 gg", d: "tempo medio offerta" },
        mAfter: { v: "6 min", d: "tempo medio offerta" },
        quote: "«Abbiamo ridotto del 40% le richieste di chiarimento dei clienti.»",
        attr: "— S., responsabile commerciale",
        tag: "2024 · SOFTWARE",
      },
      {
        key: "scuola",
        ind: "Istituto di formazione · Milano",
        nm: "Piattaforma corsi & community",
        problem: "Tre piattaforme scollegate, studenti che si perdevano tra Moodle, Zoom e WhatsApp.",
        ptext:
          "Una piattaforma unica con corsi on-demand, live, esercizi corretti automaticamente e una community. Costruita in WordPress + headless. Sostiene 2.000 studenti attivi.",
        mBefore: { v: "31%", d: "tasso di completamento" },
        mAfter: { v: "78%", d: "tasso di completamento" },
        quote: "«Gli studenti tornano per la community, restano per i corsi.»",
        attr: "— G., direzione didattica",
        tag: "2025 · WEB + FORMAZIONE",
      },
    ],
  },
  en: {
    num: "§02 · CASE STUDIES",
    heading: "What we have built.",
    lede: "Three recent projects, told in numbers before and after.",
    list: [
      {
        key: "law-firm",
        ind: "Professional firm · Milan",
        nm: "Institutional site & client portal",
        problem: "Static 2014 website, no leads, processes via email.",
        ptext:
          "We redesigned the digital identity and built a private client area: documents, invoices and bookings in one place. The main site now loads under one second.",
        mBefore: { v: "5.8s", d: "median LCP" },
        mAfter: { v: "0.7s", d: "median LCP" },
        quote: "“For the first time in ten years, clients write to say the site is clear.”",
        attr: "— M., partner",
        tag: "2025 · WEB + SOFTWARE",
      },
      {
        key: "manufacturer",
        ind: "Manufacturing SMB · Brianza",
        nm: "B2B product configurator",
        problem: "PDF catalogs, Excel price lists, quotes that took two days.",
        ptext:
          "A web configurator connected to the ERP: sales builds a quote in 6 minutes, the client receives a signed PDF. Onboarding done in two half-days.",
        mBefore: { v: "2 d", d: "avg quote time" },
        mAfter: { v: "6 min", d: "avg quote time" },
        quote: "“We cut customer follow-up questions by 40%.”",
        attr: "— S., head of sales",
        tag: "2024 · SOFTWARE",
      },
      {
        key: "school",
        ind: "Training institute · Milan",
        nm: "Courses & community platform",
        problem: "Three disconnected platforms — Moodle, Zoom, WhatsApp.",
        ptext:
          "A single platform with on-demand and live courses, auto-graded exercises and a community. WordPress + headless. Supports 2,000 active students.",
        mBefore: { v: "31%", d: "completion rate" },
        mAfter: { v: "78%", d: "completion rate" },
        quote: "“Students come back for the community, stay for the courses.”",
        attr: "— G., academic director",
        tag: "2025 · WEB + TRAINING",
      },
    ],
  },
};

/* ---------------- §03 Manifesto ---------------- */
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
    num: "§03 · MANIFESTO",
    heading: "Il web\nè cambiato.",
    lede: "La nostra missione è una: abbattere la barriera dei costi e dei tecnicismi, e rendere il digitale accessibile a chiunque.",
    pillars: [
      { n: "I", label: "PILASTRO I", t: "Il digitale è per tutti.", d: "Un sito o un'app non devono essere un lusso. Lavoriamo per trovare soluzioni alla portata anche di chi parte con poco." },
      { n: "II", label: "PILASTRO II", t: "Parliamo chiaro.", d: "Niente tecnicismi, niente sigle. Spieghiamo ogni scelta in parole semplici, così decidi con cognizione." },
      { n: "III", label: "PILASTRO III", t: "Onestà prima di tutto.", d: "Costi trasparenti, nessuna sorpresa. E se non siamo la scelta giusta per te, te lo diciamo." },
      { n: "IV", label: "PILASTRO IV", t: "Condividiamo quello che sappiamo.", d: "Quello che impariamo lo restituiamo in corsi, guide e risorse. La conoscenza serve poco se resta chiusa." },
    ],
  },
  en: {
    num: "§03 · MANIFESTO",
    heading: "The web\nhas changed.",
    lede: "Our mission is simple: break down the barrier of cost and jargon, and make digital accessible to everyone.",
    pillars: [
      { n: "I", label: "PILLAR I", t: "Digital is for everyone.", d: "A website or an app shouldn't be a luxury. We work to find solutions within reach, even on a small budget." },
      { n: "II", label: "PILLAR II", t: "We speak plainly.", d: "No jargon, no acronyms. We explain every choice in plain words, so you can decide with clarity." },
      { n: "III", label: "PILLAR III", t: "Honesty first.", d: "Transparent costs, no surprises. And if we're not the right fit for you, we'll say so." },
      { n: "IV", label: "PILLAR IV", t: "We share what we know.", d: "What we learn we give back as courses, guides and resources. Knowledge serves little if it stays locked away." },
    ],
  },
};

/* ---------------- §04 Final CTA ---------------- */
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
    num: "§04 · CONTATTI",
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
    num: "§04 · CONTACT",
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
