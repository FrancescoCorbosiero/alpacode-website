import type { Localized } from "../i18n/types";
import type { MegaKey } from "./pages";

export interface MegaItem {
  n: string;
  t: Localized;
  d: Localized;
}

export interface MegaMenu {
  feature: { small: Localized; display: Localized; cta: Localized; href: MegaKey };
  colA: { title: Localized; items: MegaItem[] };
  colB: { title: Localized; items: MegaItem[] };
}

export const megaServizi: MegaMenu = {
  feature: {
    small: { it: "In evidenza", en: "Featured" },
    display: {
      it: "Dal sito alla digitalizzazione completa.",
      en: "From a website to full digitalization.",
    },
    cta: { it: "Vedi tutti i servizi", en: "All services" },
    href: "servizi",
  },
  colA: {
    title: { it: "Costruire", en: "Build" },
    items: [
      {
        n: "01",
        t: { it: "Siti & web app", en: "Websites & web apps" },
        d: {
          it: "Siti, e-commerce, gestionali e prodotti su misura",
          en: "Sites, e-commerce, portals and custom products",
        },
      },
      {
        n: "02",
        t: { it: "Software & automazioni", en: "Software & automations" },
        d: {
          it: "Integrazioni, gestionali, processi che si tengono in piedi",
          en: "Integrations, internal tools, processes that hold up",
        },
      },
    ],
  },
  colB: {
    title: { it: "Far crescere", en: "Grow" },
    items: [
      {
        n: "03",
        t: { it: "Branding & design", en: "Branding & design" },
        d: {
          it: "Identità visiva, logo, UI/UX. Come ti vedono e ti ricordano",
          en: "Visual identity, logo, UI/UX. How people see and remember you",
        },
      },
      {
        n: "04",
        t: { it: "Pubblicità & SEO", en: "Advertising & SEO" },
        d: {
          it: "Campagne Google e Meta, ricerca, contenuti. Ti fanno trovare",
          en: "Google and Meta campaigns, search, content. Get found",
        },
      },
    ],
  },
};

export const megaProdotti: MegaMenu = {
  feature: {
    small: { it: "Prodotto di punta", en: "Flagship product" },
    display: {
      it: "Hive Commerce: l'e-commerce, automatizzato.",
      en: "Hive Commerce: e-commerce, automated.",
    },
    cta: { it: "Vedi tutti i prodotti", en: "All products" },
    href: "prodotti",
  },
  colA: {
    title: { it: "Prodotti digitali", en: "Digital products" },
    items: [
      {
        n: "01",
        t: { it: "Hive Commerce", en: "Hive Commerce" },
        d: {
          it: "Plugin WooCommerce per gestire l'e-commerce, tema incluso",
          en: "WooCommerce plugin to run your shop, theme included",
        },
      },
      {
        n: "02",
        t: { it: "Alpacode Pro Kit", en: "Alpacode Pro Kit" },
        d: {
          it: "Il kit completo per la carriera da Web Master",
          en: "The complete kit for a Web Master career",
        },
      },
    ],
  },
  colB: {
    title: { it: "Pacchetti pronti", en: "Ready-made packages" },
    items: [
      {
        n: "03",
        t: { it: "Sito Pronto", en: "Ready Site" },
        d: {
          it: "Il sito della tua attività, a prezzo fisso e in poche settimane",
          en: "Your business website, fixed price, in a few weeks",
        },
      },
      {
        n: "04",
        t: { it: "Landing & ADV", en: "Landing & ADV" },
        d: {
          it: "Una landing e una campagna pubblicitaria avviata",
          en: "A landing and an advertising campaign, launched",
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

export const megaByKey = (key: MegaKey): MegaMenu =>
  key === "servizi" ? megaServizi : key === "prodotti" ? megaProdotti : megaScuola;
