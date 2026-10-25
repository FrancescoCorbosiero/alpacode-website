import type { Lang, Localized } from "./types";
import type { PageKey } from "../data/pages";

/** Small UI strings shared across the chrome. */
export const ui = {
  cta: { it: "Prenota una call", en: "Book a call" },
  ctaShort: { it: "Prenota call", en: "Book call" },
  search: { it: "Cerca pagine, corsi, azioni…", en: "Search pages, courses, actions…" },
  langLabel: { it: "Lingua", en: "Language" },
  themeToggle: { it: "Tema scuro", en: "Dark theme" },
  skip: { it: "Vai al contenuto", en: "Skip to content" },
  searchOpen: { it: "Apri la ricerca", en: "Open search" },
  menuOpen: { it: "Apri il menu", en: "Open menu" },
  menuClose: { it: "Chiudi il menu", en: "Close menu" },
  menuTitle: { it: "Menu", en: "Menu" },
  menuExpand: { it: "Espandi", en: "Expand" },
  menuCollapse: { it: "Comprimi", en: "Collapse" },
} satisfies Record<string, Localized>;

export const footer = {
  nav: { it: "Naviga", en: "Navigate" },
  /* Accessible name of the footer's link columns (one nav landmark). */
  sitemap: { it: "Mappa del sito", en: "Site map" },
  follow: { it: "Seguici", en: "Follow us" },
  legal: { it: "Legale", en: "Legal" },
  rights: { it: "Tutti i diritti riservati", en: "All rights reserved" },
  services: { it: "Servizi", en: "Services" },
  marketing: { it: "Marketing", en: "Marketing" },
  referralTerms: { it: "Segnala un amico: condizioni", en: "Refer a friend: terms" },
  referralPrivacy: { it: "Segnala un amico: privacy", en: "Refer a friend: privacy" },
  /* Footer studio clock: "Monza, ore 19:44" — the time comes from
     Footer.astro's ticking script. */
  clock: { it: "Monza, ore", en: "Monza, local time" },
  base: {
    it: "Sede operativa · Monza · Milano · IT",
    en: "Studio · Monza · Milan · IT",
  },
  vat: { it: "P.IVA 14463350968", en: "VAT 14463350968" },
  hours: {
    it: "Disponibile lun–ven · 09:00–18:00 CET",
    en: "Available Mon–Fri · 09:00–18:00 CET",
  },
  bookCall: { it: "Prenota una call", en: "Book a call" },
  /* Secondary nav strip — indexes the marketing/program pages that
     deliberately have no primary-nav slot. */
  collab: { it: "Collabora", en: "Collaborate" },
  offers: { it: "Per professione", en: "By profession" },
  collaborate: { it: "Collabora con noi", en: "Collaborate with us" },
  partnerProgram: { it: "Programma partner", en: "Partner program" },
  referral: { it: "Segnala un amico", en: "Refer a friend" },
  referralNew: { it: "Segnala una nuova attività", en: "Refer a new business" },
  smmOffer: { it: "Per social media manager", en: "For social media managers" },
  builders: { it: "Per chi fa siti", en: "For people who build sites" },
  buildersHosting: { it: "Hosting per i siti dei clienti", en: "Hosting your clients' sites" },
  buildersAi: { it: "Siti per i clienti con l'AI", en: "Client sites with AI" },
  commitment: { it: "Impegno", en: "Commitment" },
  sustainability: { it: "Sostenibilità ambientale", en: "Environmental sustainability" },
  sustainabilityReport: { it: "Report di sostenibilità", en: "Sustainability report" },
  impactReport: { it: "Report di impatto sociale", en: "Social impact report" },
  privacy: { it: "Privacy", en: "Privacy" },
  cookies: { it: "Cookie", en: "Cookies" },
  terms: { it: "Termini", en: "Terms" },
  bottomLocation: "Monza · Milano · Italia",
} satisfies Record<string, Localized | string>;

export const cmdk = {
  searchLabel: "SEARCH",
  esc: "ESC",
  recent: { it: "Recenti", en: "Recent" },
  pages: { it: "Pagine", en: "Pages" },
  courses: { it: "Corsi", en: "Courses" },
  actions: { it: "Azioni", en: "Actions" },
  navigate: { it: "↑ ↓ NAVIGA", en: "↑ ↓ NAVIGATE" },
  open: { it: "↵ APRI", en: "↵ OPEN" },
  close: { it: "ESC CHIUDI", en: "ESC CLOSE" },
  empty: { it: "Nessun risultato.", en: "No results." },
  bookCall: { it: "Prenota una call", en: "Book a call" },
  bookCallSub: { it: "Apri contatti", en: "Open contact" },
  email: { it: "Scrivi un'email", en: "Write an email" },
  switchLang: { it: "Cambia lingua a EN", en: "Switch language to IT" },
  switchLangSub: { it: "Persistente", en: "Persistent" },
} satisfies Record<string, Localized | string>;

/** <title> and meta description per page. */
export const meta: Record<PageKey, { title: Localized; description: Localized }> = {
  "chi-siamo": {
    title: {
      it: "Chi siamo · Lo studio e le persone — Alpacode",
      en: "About · The studio and its people — Alpacode",
    },
    description: {
      it: "Alpacode è uno studio digitale di Monza: siti, e-commerce, software su misura e integrazioni AI per aziende, professionisti e agenzie. Le persone, il percorso, come lavoriamo.",
      en: "Alpacode is a digital studio in Monza: websites, e-commerce, custom software and AI integrations for companies, professionals and agencies. The people, the path, how we work.",
    },
  },
  "collabora-con-noi": {
    title: {
      it: "Collabora con noi · Collaborazioni tra professionisti — Alpacode",
      en: "Collaborate with us · Collaborations between professionals — Alpacode",
    },
    description: {
      it: "Alpacode non ha posizioni da dipendente aperte né annunci di lavoro: collaboriamo con professionisti indipendenti — freelance, studi, piccole agenzie — su incarichi definiti, con accordo scritto e compenso concordato prima. Qui puoi proporci una collaborazione.",
      en: "Alpacode has no employee positions open and no job ads: we collaborate with independent professionals — freelancers, studios, small agencies — on defined assignments, with a written agreement and the fee set before work starts. Propose a collaboration here.",
    },
  },
  "sostenibilita-ambientale": {
    title: {
      it: "Sostenibilità ambientale · Uno studio remote-native — Alpacode",
      en: "Environmental sustainability · A remote-native studio — Alpacode",
    },
    description: {
      it: "Siamo uno studio digitale piccolo e vogliamo che anche la nostra impronta lo sia: remote-native, senza pendolarismo quotidiano né uffici energivori, completamente paperless. Con un report pubblico ogni anno.",
      en: "We're a small digital studio and we want our footprint to be small too: remote-native, with no daily commuting and no energy-hungry offices, entirely paperless. With a report published every year.",
    },
  },
  "sostenibilita-ambientale-report": {
    title: {
      it: "Report di sostenibilità ambientale · Alpacode",
      en: "Environmental sustainability report · Alpacode",
    },
    description: {
      it: "Il nostro report ambientale, trimestre per trimestre: pendolarismo evitato, documenti solo digitali e trasferte effettuate, sottratte dal saldo. Stime interne con metodo e fattori di calcolo pubblicati.",
      en: "Our environmental report, quarter by quarter: commuting avoided, digital-only documents and business travel taken, subtracted from the balance. Internal estimates with the method and factors published.",
    },
  },
  "impatto-sociale-report": {
    title: {
      it: "Report di impatto sociale · Alpacode",
      en: "Social impact report · Alpacode",
    },
    description: {
      it: "Il nostro report di impatto sociale, trimestre per trimestre: progetti per privati e piccole attività, attività portate online per la prima volta, ore di formazione e persone formate. Conteggi interni, con la definizione di ogni indicatore.",
      en: "Our social impact report, quarter by quarter: projects for individuals and small businesses, businesses brought online for the first time, training hours and people trained. Internal counts, with every indicator defined.",
    },
  },
  home: {
    title: {
      it: "Alpacode · Digitalizziamo privati e imprese in Italia",
      en: "Alpacode · Digital solutions for people & businesses in Italy",
    },
    description: {
      it: "Digitalizziamo privati e imprese in tutta Italia: siti, e-commerce, branding, pubblicità, software e formazione, da un solo studio a Monza e Milano.",
      en: "We digitalize individuals and businesses across Italy: websites, e-commerce, branding, advertising, software and training, from one studio in Monza and Milan.",
    },
  },
  servizi: {
    title: {
      it: "Servizi · Alpacode Soluzioni Digitali",
      en: "Services · Alpacode Digital Solutions",
    },
    description: {
      it: "Costruire, far crescere, insegnare: siti, e-commerce, software, branding, design, pubblicità e SEO. Anche quello che chiedi a un'agenzia, con un solo referente.",
      en: "Build, grow, teach: websites, e-commerce, software, branding, design, advertising and SEO. Even what you'd ask an agency for, with one point of contact.",
    },
  },
  prodotti: {
    title: {
      it: "Prodotti · Alpacode Soluzioni Digitali",
      en: "Products · Alpacode Digital Solutions",
    },
    description: {
      it: "I prodotti digitali Alpacode — Hive Commerce, Alpacode Pro Kit e Paco — e i pacchetti pronti: Sito Pronto, E-commerce Starter, Brand Kit, Landing & ADV.",
      en: "Alpacode's digital products — Hive Commerce, Alpacode Pro Kit and Paco — plus ready-made packages: Ready Site, E-commerce Starter, Brand Kit, Landing & ADV.",
    },
  },
  lavori: {
    title: {
      it: "Lavori · Alpacode Soluzioni Digitali",
      en: "Work · Alpacode Digital Solutions",
    },
    description: {
      it: "Progetti reali in settori diversi: edilizia, streetwear, assicurazioni, fitness, e-commerce per la pesca, NCC di lusso e logistica. Una strategia su misura per ciascuno.",
      en: "Real projects across sectors: construction, streetwear, insurance, fitness, fishing e-commerce, luxury chauffeur and logistics. A tailored strategy for each.",
    },
  },
  learning: {
    title: {
      it: "Learning · Alpacode Soluzioni Digitali",
      en: "Learning · Alpacode Digital Solutions",
    },
    description: {
      it: "Corsi e kit professionali: WordPress (Gutenberg, Sage), front-end, Java/Spring Boot, automatizzazione WordPress con l'AI. Per professionisti, team aziendali e studenti.",
      en: "Courses and pro kits: WordPress (Gutenberg, Sage), front-end, Java/Spring Boot, AI-driven WordPress automation. For professionals, internal teams and students.",
    },
  },
  blog: {
    title: {
      it: "Blog · Alpacode Soluzioni Digitali",
      en: "Blog · Alpacode Digital Solutions",
    },
    description: {
      it: "Note, guide e riflessioni. Articoli tecnici, ragionamenti lunghi, raramente news. Quello che impariamo lo scriviamo.",
      en: "Notes, guides and insights. Technical articles, long-form reasoning, rarely news. What we learn we write.",
    },
  },
  faq: {
    title: {
      it: "FAQ · Alpacode Soluzioni Digitali",
      en: "FAQ · Alpacode Digital Solutions",
    },
    description: {
      it: "Le risposte alle domande che ci fanno più spesso, per argomento: costi e pagamenti, come lavoriamo, dopo il lancio, i siti a canone, il programma partner, la formazione, il marketing.",
      en: "Answers to the questions we hear most, by topic: costs and payments, how we work, after launch, sites on a yearly fee, the partner programme, training, marketing.",
    },
  },
  contatti: {
    title: {
      it: "Contatti · Alpacode Soluzioni Digitali",
      en: "Contact · Alpacode Digital Solutions",
    },
    description: {
      it: "Parliamone con calma. Compila il modulo o scrivici a info@alpacode.it. Rispondiamo entro mezza giornata lavorata, da una persona vera.",
      en: "Let's talk, calmly. Fill the form or write to info@alpacode.it. We reply within half a worked day, from a real person.",
    },
  },
};

export const t = (value: Localized, lang: Lang): string => value[lang];
