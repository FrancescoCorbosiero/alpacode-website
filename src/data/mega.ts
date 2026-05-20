import type { Localized } from "../i18n/types";

export interface MegaItem {
  n: string;
  t: Localized;
  d: Localized;
}

export interface MegaMenu {
  feature: { small: Localized; display: Localized; cta: Localized; href: "servizi" | "scuola" };
  colA: { title: Localized; items: MegaItem[] };
  colB: { title: Localized; items: MegaItem[] };
}

export const megaServizi: MegaMenu = {
  feature: {
    small: { it: "Servizio in evidenza", en: "Featured service" },
    display: {
      it: "Costruiamo prodotti digitali che durano.",
      en: "We build digital products that last.",
    },
    cta: { it: "Vedi tutti i servizi", en: "All services" },
    href: "servizi",
  },
  colA: {
    title: { it: "Aree", en: "Practice" },
    items: [
      {
        n: "01",
        t: { it: "Sviluppo siti & web app", en: "Websites & web apps" },
        d: {
          it: "WordPress, headless, e-commerce su misura, prodotti SaaS",
          en: "WordPress, headless, e-commerce, custom SaaS products",
        },
      },
      {
        n: "02",
        t: { it: "Software & integrazioni", en: "Software & integrations" },
        d: {
          it: "Back-end, automazioni, API, sistemi gestionali",
          en: "Back-end, automations, APIs, ERP-like systems",
        },
      },
    ],
  },
  colB: {
    title: { it: "Estensioni", en: "Extensions" },
    items: [
      {
        n: "03",
        t: { it: "Consulenza digitale", en: "Digital consulting" },
        d: {
          it: "Audit, roadmap tecnologica, trasformazione di processi",
          en: "Audits, tech roadmap, process transformation",
        },
      },
      {
        n: "04",
        t: { it: "Performance & SEO", en: "Performance & SEO" },
        d: {
          it: "Misurazione, ottimizzazioni Core Web Vitals, search",
          en: "Measurement, Core Web Vitals, search optimization",
        },
      },
    ],
  },
};

export const megaScuola: MegaMenu = {
  feature: {
    small: { it: "Corso in partenza", en: "Upcoming course" },
    display: {
      it: "Impara facendo, da chi costruisce ogni giorno.",
      en: "Learn by doing, from people who ship every day.",
    },
    cta: { it: "Vai alla scuola", en: "Visit the school" },
    href: "scuola",
  },
  colA: {
    title: { it: "Percorsi", en: "Tracks" },
    items: [
      {
        n: "01",
        t: { it: "WordPress Gutenberg", en: "WordPress Gutenberg" },
        d: {
          it: "Blocchi, full-site editing, theme.json, performance",
          en: "Blocks, full-site editing, theme.json, performance",
        },
      },
      {
        n: "02",
        t: { it: "Front-end moderno", en: "Modern front-end" },
        d: {
          it: "HTML, CSS, JavaScript, accessibilità, design systems",
          en: "HTML, CSS, JavaScript, accessibility, design systems",
        },
      },
    ],
  },
  colB: {
    title: { it: "Risorse", en: "Resources" },
    items: [
      {
        n: "03",
        t: { it: "Back-end & API", en: "Back-end & APIs" },
        d: {
          it: "PHP, Node, database, REST, sicurezza",
          en: "PHP, Node, databases, REST, security",
        },
      },
      {
        n: "04",
        t: { it: "Kit per professionisti", en: "Pro kits" },
        d: {
          it: "Template, starter, snippet pronti all'uso",
          en: "Templates, starters, ready-made snippets",
        },
      },
    ],
  },
};

export const megaByKey = (key: "servizi" | "scuola"): MegaMenu =>
  key === "servizi" ? megaServizi : megaScuola;
