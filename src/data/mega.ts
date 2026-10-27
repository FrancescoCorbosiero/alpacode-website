import type { Localized } from "../i18n/types";
import type { MegaKey } from "./pages";
import { doorTo } from "@shared/data/compartments";

export interface MegaItem {
  n: string;
  t: Localized;
  d: Localized;
  /** Where the item leads, when it isn't the menu's page: a door into a
   *  compartment (shared/data/compartments.ts). */
  href?: string;
  /** Or a page of the house, as localizePath takes it (a service page). */
  slug?: string;
}

export interface MegaColumn {
  title: Localized;
  /** Set when the column is a compartment's door: its name by the title. */
  door?: Localized;
  items: MegaItem[];
}

export interface MegaMenu {
  feature: { small: Localized; display: Localized; cta: Localized; href: MegaKey };
  colA: MegaColumn;
  colB: MegaColumn;
}

/** The studio's services, from the house's mega menu. */
const studio = (hash: string) => doorTo("studio", `/servizi/${hash}`, { site: "house", where: "mega" });

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
  // Each service of the house leads to its page (data/service-pages).
  colA: {
    title: { it: "Costruire", en: "Build" },
    items: [
      {
        n: "01",
        t: { it: "Siti & web app", en: "Websites & web apps" },
        d: {
          it: "Siti vetrina, portali e aree riservate su misura",
          en: "Showcase sites, portals and private areas, to measure",
        },
        slug: "servizi/siti-web",
      },
      {
        n: "02",
        t: { it: "E-commerce", en: "E-commerce" },
        d: {
          it: "Negozi online che vendono, collegati al magazzino",
          en: "Online shops that sell, connected to your stock",
        },
        slug: "servizi/e-commerce",
      },
      {
        n: "03",
        t: { it: "Software & automazioni", en: "Software & automations" },
        d: {
          it: "Gestionali e integrazioni: processi che si tengono in piedi",
          en: "Management systems and integrations: processes that hold up",
        },
        slug: "servizi/software-su-misura",
      },
      {
        n: "04",
        t: { it: "Integrazioni AI", en: "AI integrations" },
        d: {
          it: "Modelli linguistici dentro il lavoro, non per fare scena",
          en: "Language models inside the work, not for show",
        },
        slug: "servizi/integrazioni-ai",
      },
    ],
  },
  // Growing is the studio's work: the column opens its door.
  colB: {
    title: { it: "Far crescere", en: "Grow" },
    door: { it: "Alpacode Studio", en: "Alpacode Studio, in Italian" },
    items: [
      {
        n: "05",
        t: { it: "Social & contenuti", en: "Social & content" },
        d: {
          it: "Piano editoriale, post e reel, community. Ti fanno vedere",
          en: "Editorial plan, posts and reels, community. Get seen",
        },
        href: studio("#vedere"),
      },
      {
        n: "06",
        t: { it: "Branding & design", en: "Branding & design" },
        d: {
          it: "Identità visiva, logo, UI/UX. Come ti vedono e ti ricordano",
          en: "Visual identity, logo, UI/UX. How people see and remember you",
        },
        href: studio("#ricordare"),
      },
      {
        n: "07",
        t: { it: "Pubblicità & SEO", en: "Advertising & SEO" },
        d: {
          it: "Campagne Google e Meta, ricerca, contenuti. Ti fanno trovare",
          en: "Google and Meta campaigns, search, content. Get found",
        },
        href: studio("#scegliere"),
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
      {
        n: "03",
        t: { it: "Paco", en: "Paco" },
        d: {
          it: "L'assistente AI che gestisce il tuo sito da WhatsApp",
          en: "The AI concierge that runs your website from WhatsApp",
        },
      },
    ],
  },
  colB: {
    title: { it: "Pacchetti pronti", en: "Ready-made packages" },
    items: [
      {
        n: "04",
        t: { it: "Sito Pronto", en: "Ready Site" },
        d: {
          it: "Il sito della tua attività, pronto in poche settimane",
          en: "Your business website, ready in a few weeks",
        },
      },
      {
        n: "05",
        t: { it: "Landing & ADV", en: "Landing & ADV" },
        d: {
          it: "Una landing e una campagna pubblicitaria avviata",
          en: "A landing and an advertising campaign, launched",
        },
      },
    ],
  },
};

export const megaLearning: MegaMenu = {
  feature: {
    small: { it: "Corso in partenza", en: "Upcoming course" },
    display: {
      it: "Impara facendo, da chi costruisce ogni giorno.",
      en: "Learn by doing, from people who ship every day.",
    },
    cta: { it: "Esplora i corsi", en: "Explore the courses" },
    href: "learning",
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
        t: { it: "WordPress with Sage Theme", en: "WordPress with Sage Theme" },
        d: {
          it: "Sviluppo WordPress moderno con Roots Sage e Blade",
          en: "Modern WordPress development with Roots Sage and Blade",
        },
      },
    ],
  },
  colB: {
    title: { it: "Avanzati & AI", en: "Advanced & AI" },
    items: [
      {
        n: "03",
        t: { it: "Advanced Java with Spring Boot", en: "Advanced Java with Spring Boot" },
        d: {
          it: "Back-end JVM, API REST, sicurezza e deploy",
          en: "JVM back-end, REST APIs, security and deploy",
        },
      },
      {
        n: "04",
        t: { it: "WordPress + AI", en: "WordPress + AI" },
        d: {
          it: "Automatizza la creazione di siti WordPress con l'AI",
          en: "Automate WordPress site creation with AI",
        },
      },
    ],
  },
};

export const megaByKey = (key: MegaKey): MegaMenu =>
  key === "servizi" ? megaServizi : key === "prodotti" ? megaProdotti : megaLearning;
