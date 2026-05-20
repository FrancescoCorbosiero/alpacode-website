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
    eyebrow: "MZ · MI — IT · EST. 2018",
    sub: "Soluzioni Digitali",
    cta1: "Prenota una call",
    cta2: "Esplora i lavori",
    meta: [
      { k: "Sede", v: "Monza · Milano", d: "IT" },
      { k: "Operatività", v: "Lun — Ven", d: "09:00 — 18:00 CET" },
      { k: "Progetti", v: "120+", d: "consegnati dal 2018" },
      { k: "Ambiti", v: "03", d: "costruire · consigliare · insegnare" },
    ],
    statusLabel: "DISPONIBILE",
    statusVal: "Nuovi progetti Q3 2026",
  },
  en: {
    eyebrow: "MZ · MI — IT · EST. 2018",
    sub: "Digital Solutions",
    cta1: "Book a call",
    cta2: "See the work",
    meta: [
      { k: "Studio", v: "Monza · Milan", d: "IT" },
      { k: "Hours", v: "Mon — Fri", d: "09:00 — 18:00 CET" },
      { k: "Projects", v: "120+", d: "delivered since 2018" },
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
    lede: "Da otto anni facciamo solo tre cose, ma le facciamo con cura. Niente bundle confusi, niente upsell, niente jargon.",
    list: [
      {
        num: "01",
        word: "Costruire",
        accent: "ire",
        d: "Siti, web app, software su misura, integrazioni. Codice scritto a mano, manutenibile, documentato.",
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
        d: "Corsi e kit professionali su WordPress, front-end e back-end. Materiali che restano, esercizi reali.",
        items: ["Corso WordPress Gutenberg", "Front-end moderno", "Back-end & API", "Kit per professionisti"],
      },
    ],
  },
  en: {
    num: "§01 · SERVICES",
    heading: "Three verbs.\nNothing more.",
    lede: "For eight years we have done only three things, and we do them with care. No confusing bundles, no upsell, no jargon.",
    list: [
      {
        num: "01",
        word: "Build",
        accent: "d",
        d: "Websites, web apps, custom software, integrations. Hand-written, maintainable, documented code.",
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
        d: "Courses and pro kits on WordPress, front-end and back-end. Materials that last, real exercises.",
        items: ["WordPress Gutenberg", "Modern front-end", "Back-end & APIs", "Pro kits"],
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
    lede: "Tre progetti recenti, raccontati con i numeri prima e dopo. Le foto le carichi tu — sono spazi pronti per le tue immagini.",
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
    lede: "Three recent projects, told in numbers before and after. Drop your own images into the slots.",
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
    heading: "Come\nlavoriamo.",
    lede: "Quattro principi che applichiamo a ogni progetto, anche quando nessuno ci guarda.",
    pillars: [
      { n: "I", label: "PILASTRO I", t: "Il codice è materia.", d: "Lo scriviamo a mano, lo trattiamo come si tratta il legno o il metallo: con attenzione, senza scorciatoie, sapendo che qualcun altro lo leggerà." },
      { n: "II", label: "PILASTRO II", t: "La calma è un metodo.", d: "Non rispondiamo in cinque minuti, ma in cinque ore lavorate. Ti diamo il tempo per pensare, lo prendiamo per fare." },
      { n: "III", label: "PILASTRO III", t: "Diciamo di no.", d: "Se non è la cosa giusta per te, lo diciamo. Indicare la porta giusta è parte del lavoro, anche quando non porta a noi." },
      { n: "IV", label: "PILASTRO IV", t: "Insegniamo quello che sappiamo.", d: "Quello che impariamo lo restituiamo in corsi, kit e articoli. La conoscenza serve poco se resta chiusa in uno studio." },
    ],
  },
  en: {
    num: "§03 · MANIFESTO",
    heading: "How we work.",
    lede: "Four principles we apply to every project, even when nobody is watching.",
    pillars: [
      { n: "I", label: "PILLAR I", t: "Code is material.", d: "We write it by hand, treating it like wood or metal: with care, no shortcuts, knowing someone else will read it." },
      { n: "II", label: "PILLAR II", t: "Calm is a method.", d: "We don't answer in five minutes; we answer in five worked hours. You get time to think, we take time to act." },
      { n: "III", label: "PILLAR III", t: "We say no.", d: "If it's not the right thing for you, we say so. Pointing to the right door is part of the job, even when it doesn't lead to us." },
      { n: "IV", label: "PILLAR IV", t: "We teach what we know.", d: "What we learn we give back as courses, kits and articles. Knowledge serves little if it stays locked in a studio." },
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
      { k: "Scrivici", v: "ciao@alpacode.it", href: "mailto:ciao@alpacode.it" },
      { k: "Prenota una call", v: "30 min · gratis", href: "contatti" },
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
      { k: "Write us", v: "ciao@alpacode.it", href: "mailto:ciao@alpacode.it" },
      { k: "Book a call", v: "30 min · free", href: "contatti" },
      { k: "Studio", v: "Monza · Milan · IT" },
    ],
    cta: "Open the contact form",
  },
};
