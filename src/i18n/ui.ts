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
  info: { it: "Informazioni", en: "Information" },
  nav: { it: "Naviga", en: "Navigate" },
  contact: { it: "Scrivici", en: "Write us" },
  legal: { it: "Legale", en: "Legal" },
  rights: {
    it: "© 2026 ALPACODE · Tutti i diritti riservati",
    en: "© 2026 ALPACODE · All rights reserved",
  },
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
  collab: { it: "Collabora", en: "Work with us" },
  offers: { it: "Offerte su misura", en: "Tailored offers" },
  workWithUs: { it: "Lavora con noi", en: "Work with us" },
  partnerProgram: { it: "Programma partner", en: "Partner program" },
  smmOffer: { it: "Per social media manager", en: "For social media managers" },
  privacy: { it: "Privacy", en: "Privacy" },
  cookies: { it: "Cookie", en: "Cookies" },
  terms: { it: "Termini", en: "Terms" },
  bottomLocation: "ALPACODE · MZ — MI · IT",
  version: "v2.0 · 05.2026",
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
  "lavora-con-noi": {
    title: {
      it: "Lavora con noi · Collaborazioni remote-native — Alpacode",
      en: "Work with us · Remote-native collaborations — Alpacode",
    },
    description: {
      it: "Cerchiamo grafici, designer, sviluppatori, marketer e social media manager per task e progetti interi. Remote-native, da tutta Italia, con accordi chiari e per iscritto.",
      en: "We're looking for graphic artists, designers, developers, marketers and social media managers for single tasks and entire projects. Remote-native, from anywhere in Italy, with clear written agreements.",
    },
  },
  home: {
    title: {
      it: "Alpacode · Digitalizziamo privati e imprese in Italia",
      en: "Alpacode · Digital solutions for people & businesses in Italy",
    },
    description: {
      it: "Digitalizziamo privati e imprese in tutta Italia: siti, e-commerce, branding, pubblicità, software e formazione. Prezzo deciso prima, niente sorprese.",
      en: "We digitalize individuals and businesses across Italy: websites, e-commerce, branding, advertising, software and training. Price agreed up front, no surprises.",
    },
  },
  servizi: {
    title: {
      it: "Servizi · Alpacode Soluzioni Digitali",
      en: "Services · Alpacode Digital Solutions",
    },
    description: {
      it: "Costruire, far crescere, insegnare: siti, e-commerce, software, branding, design, pubblicità e SEO. Anche quello che chiedi a un'agenzia, a un prezzo deciso prima.",
      en: "Build, grow, teach: websites, e-commerce, software, branding, design, advertising and SEO. Even what you'd ask an agency for, at a price agreed up front.",
    },
  },
  prodotti: {
    title: {
      it: "Prodotti · Alpacode Soluzioni Digitali",
      en: "Products · Alpacode Digital Solutions",
    },
    description: {
      it: "I prodotti digitali Alpacode — Hive Commerce e Alpacode Pro Kit — e i pacchetti pronti a prezzo fisso: Sito Pronto, E-commerce Starter, Brand Kit, Landing & ADV.",
      en: "Alpacode's digital products — Hive Commerce and Alpacode Pro Kit — plus fixed-price packages: Ready Site, E-commerce Starter, Brand Kit, Landing & ADV.",
    },
  },
  lavori: {
    title: {
      it: "Lavori · Alpacode Soluzioni Digitali",
      en: "Work · Alpacode Digital Solutions",
    },
    description: {
      it: "Progetti reali in settori diversi: edilizia, streetwear, editoria, fitness, e-commerce per la pesca, NCC di lusso e logistica. Una strategia su misura per ciascuno.",
      en: "Real projects across sectors: construction, streetwear, publishing, fitness, fishing e-commerce, luxury chauffeur and logistics. A tailored strategy for each.",
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
      it: "Le domande che ci fanno davvero: costi, pacchetti, branding e pubblicità, manutenzione, pagamenti a rate, tempi. Raccolte qui per chi vuole capire prima di chiamare.",
      en: "The questions people actually ask: costs, packages, branding and ads, maintenance, installments, timing. Gathered here before you call.",
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
