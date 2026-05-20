import type { Lang, Localized } from "./types";
import type { PageKey } from "../data/pages";

/** Small UI strings shared across the chrome. */
export const ui = {
  cta: { it: "Prenota una call", en: "Book a call" },
  ctaShort: { it: "Prenota call", en: "Book call" },
  search: { it: "Cerca pagine, corsi, azioni…", en: "Search pages, courses, actions…" },
  langLabel: { it: "Lingua", en: "Language" },
  skip: { it: "Vai al contenuto", en: "Skip to content" },
  searchOpen: { it: "Apri la ricerca", en: "Open search" },
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
  privacy: { it: "Privacy", en: "Privacy" },
  cookies: { it: "Cookie", en: "Cookies" },
  terms: { it: "Termini", en: "Terms" },
  bottomLocation: "ALPACODE · MZ — MI · IT",
  version: "v2.0 · 05.2026",
} satisfies Record<string, Localized | string>;

export const cmdk = {
  searchLabel: "SEARCH",
  esc: "ESC",
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
  home: {
    title: {
      it: "Alpacode · Soluzioni Digitali · Monza · Milano",
      en: "Alpacode · Digital Solutions · Monza · Milan",
    },
    description: {
      it: "Software, consulenza e formazione per chi costruisce in digitale. Sviluppo siti & web app, consulenza, corsi e kit professionali. Monza · Milano · IT.",
      en: "Software, consulting and training for those who build in digital. Websites & web apps, consulting, courses and pro kits. Monza · Milan · IT.",
    },
  },
  servizi: {
    title: {
      it: "Servizi · Alpacode Soluzioni Digitali",
      en: "Services · Alpacode Digital Solutions",
    },
    description: {
      it: "Tre aree, otto anni di pratica: sviluppo, software & integrazioni, consulenza, performance, manutenzione, corsi. Niente bundle gonfi, niente upsell.",
      en: "Three areas, eight years of practice: development, software & integrations, consulting, performance, maintenance, courses. No inflated bundles, no upsell.",
    },
  },
  lavori: {
    title: {
      it: "Lavori · Alpacode Soluzioni Digitali",
      en: "Work · Alpacode Digital Solutions",
    },
    description: {
      it: "Sei progetti recenti raccontati con i numeri prima e dopo: portali, configuratori B2B, piattaforme di formazione, e-commerce e dashboard interne.",
      en: "Six recent projects told in before/after numbers: portals, B2B configurators, learning platforms, e-commerce and internal dashboards.",
    },
  },
  scuola: {
    title: {
      it: "Scuola · Alpacode Soluzioni Digitali",
      en: "School · Alpacode Digital Solutions",
    },
    description: {
      it: "Corsi e kit professionali su WordPress, front-end e back-end. Per professionisti, team aziendali e studenti. Materiali che restano, esercizi reali.",
      en: "Courses and pro kits on WordPress, front-end and back-end. For professionals, internal teams and students. Materials that last, real exercises.",
    },
  },
  blog: {
    title: {
      it: "Blog · Alpacode Soluzioni Digitali",
      en: "Blog · Alpacode Digital Solutions",
    },
    description: {
      it: "Note, guide e pensieri. Articoli tecnici, ragionamenti lunghi, raramente news. Quello che impariamo lo scriviamo.",
      en: "Notes, guides and thoughts. Technical articles, long-form reasoning, rarely news. What we learn we write.",
    },
  },
  faq: {
    title: {
      it: "FAQ · Alpacode Soluzioni Digitali",
      en: "FAQ · Alpacode Digital Solutions",
    },
    description: {
      it: "Le domande che ci fanno davvero: costi, sedi, tecnologie, manutenzione, attestati, pagamenti, tempi. Raccolte qui per chi vuole capire prima di chiamare.",
      en: "The questions people actually ask: costs, locations, tech, maintenance, certificates, payments, timing. Gathered here before you call.",
    },
  },
  contatti: {
    title: {
      it: "Contatti · Alpacode Soluzioni Digitali",
      en: "Contact · Alpacode Digital Solutions",
    },
    description: {
      it: "Parliamone con calma. Compila il modulo o scrivici a ciao@alpacode.it. Rispondiamo entro mezza giornata lavorata, da una persona vera.",
      en: "Let's talk, calmly. Fill the form or write to ciao@alpacode.it. We reply within half a worked day, from a real person.",
    },
  },
};

export const t = (value: Localized, lang: Lang): string => value[lang];
