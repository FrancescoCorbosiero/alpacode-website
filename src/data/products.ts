import type { Lang } from "../i18n/types";
import { doorTo } from "@shared/data/compartments";

/** A package the studio runs: its card opens the studio's page. */
const studioPack = (id: string) => doorTo("studio", `/pacchetti/#${id}`, { site: "house", where: "prodotti" });

export interface ProductMeta {
  k: string;
  v: string;
}
export interface Product {
  n: string;
  /** Short badge, e.g. "Prodotto di punta", "Kit digitale", "Pacchetto". */
  tag: string;
  t: string;
  d: string;
  forWho: string;
  items: string[];
  meta: ProductMeta[];
  /** When set, the card links to a dedicated product page under /<slug>. */
  slug?: string;
  /** When set, the card opens a compartment's page instead (the studio's
   *  marketing packages). */
  door?: string;
}
export interface ProductGroup {
  label: string;
  tagline: string;
  /** Renders the cards with the special "flagship" treatment. */
  featured?: boolean;
  list: Product[];
}
export interface ProdottiPageData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  intro: string;
  groups: ProductGroup[];
}

export const prodotti: Record<Lang, ProdottiPageData> = {
  it: {
    crumb: "Prodotti",
    h1Line1: "Prodotti &",
    h1Line2: "pacchetti.",
    lede: "I nostri prodotti digitali e i pacchetti pronti: soluzioni già definite, da cui partire subito. Scegli il punto da cui iniziare: il resto lo decidiamo insieme.",
    intro: "Ogni pacchetto dice cosa contiene e in quanto tempo arriva. Se ti serve qualcosa di più su misura, ci sono i servizi.",
    groups: [
      {
        label: "Prodotti digitali",
        tagline: "I nostri prodotti, pronti a lavorare per te.",
        featured: true,
        list: [
          {
            n: "01",
            tag: "Prodotto di punta",
            t: "Hive Commerce",
            d: "Il nostro plugin per WooCommerce che automatizza la gestione del tuo e-commerce. Funzionalità complete e tema grafico incluso: tutto il necessario per avviare un'attività commerciale online.",
            forWho: "Per chi avvia un e-commerce",
            items: ["Gestione e-commerce automatizzata", "Tema grafico incluso", "Set di funzionalità completo", "Plug-and-play su WooCommerce", "Aggiornamenti continui"],
            meta: [
              { k: "Tipo", v: "Plugin WooCommerce" },
              { k: "Incluso", v: "Tema grafico" },
              { k: "Licenza", v: "Su richiesta" },
            ],
            slug: "hive-commerce",
          },
          {
            n: "02",
            tag: "Kit digitale",
            t: "Alpacode Pro Kit",
            d: "Il kit completo per iniziare la carriera da Web Master: guide, PDF, risorse, repository, codice e kit di sviluppo WordPress, più una dashboard gestionale. Letteralmente tutto.",
            forWho: "Per chi vuole diventare Web Master",
            items: ["Guide e PDF", "Risorse e repository", "Codice e kit di sviluppo WordPress", "Dashboard gestionale", "Aggiornamenti a vita"],
            meta: [
              { k: "Formato", v: "Pacchetto digitale" },
              { k: "Licenza", v: "Personale" },
              { k: "Aggiornamenti", v: "A vita" },
            ],
            slug: "alpacode-pro-kit",
          },
          {
            n: "03",
            tag: "Assistente AI",
            t: "Paco",
            d: "L'assistente AI che fa da tramite tra te e il tuo sito web. Il sito lo genera lui, tu lo gestisci scrivendogli su WhatsApp: aggiornamenti, offerte e risposte ai clienti, tutto in chat.",
            forWho: "Per chi vuole gestire il sito da WhatsApp",
            items: ["Sito web generato dall'AI", "Gestione in chat, su WhatsApp", "Risponde ai tuoi clienti", "Zero pannelli di controllo", "Sempre aggiornato"],
            meta: [
              { k: "Tipo", v: "Chatbot AI" },
              { k: "Canale", v: "WhatsApp" },
              { k: "Licenza", v: "Su richiesta" },
            ],
            slug: "paco",
          },
        ],
      },
      {
        label: "Pacchetti pronti",
        tagline: "Soluzioni già definite, per partire in fretta.",
        list: [
          {
            n: "04",
            tag: "Pacchetto",
            t: "Sito Pronto",
            d: "Il sito della tua attività, pronto in poche settimane. Design su misura, veloce e pensato per portarti clienti.",
            forWho: "Per professionisti e piccole imprese",
            items: ["Design su misura", "Fino a 5 pagine", "Ottimizzato per mobile", "SEO di base + Google", "Modulo contatti", "Formazione all'uso"],
            meta: [
              { k: "Tempi", v: "2 — 3 settimane" },
              { k: "Pagine", v: "Fino a 5" },
              { k: "Dopo", v: "Manutenzione opzionale" },
            ],
          },
          {
            n: "05",
            tag: "Pacchetto",
            t: "E-commerce Starter",
            d: "Un negozio online pronto a vendere: catalogo, pagamenti e spedizioni già configurati e collaudati.",
            forWho: "Per chi vuole iniziare a vendere online",
            items: ["Catalogo prodotti", "Pagamenti sicuri", "Spedizioni & magazzino", "Gestione ordini", "Pronto da mobile", "Formazione all'uso"],
            meta: [
              { k: "Tempi", v: "3 — 5 settimane" },
              { k: "Consegna", v: "Configurato e collaudato" },
              { k: "Base", v: "WooCommerce / Shopify" },
            ],
          },
          {
            n: "06",
            tag: "Pacchetto",
            t: "Brand Kit",
            d: "Logo, colori e identità visiva pronti all'uso. Tutto quello che serve per presentarti bene, ovunque.",
            forWho: "Per chi parte da zero o rinnova",
            items: ["Logo e varianti", "Palette e font", "Linee guida d'uso", "Template per i social", "Biglietti & firme email"],
            meta: [
              { k: "Tempi", v: "~ 2 settimane" },
              { k: "Dove", v: "Alpacode Studio" },
              { k: "Consegna", v: "File pronti all'uso" },
            ],
            door: studioPack("brand-kit"),
          },
          {
            n: "07",
            tag: "Pacchetto",
            t: "Landing & ADV",
            d: "Una pagina pensata per convertire e una campagna pubblicitaria avviata e tracciata. Per un lancio o una promozione.",
            forWho: "Per lanci, eventi e promozioni",
            items: ["Landing page mirata", "Tracciamento conversioni", "Setup campagne Google & Meta", "Primo mese di gestione", "Report dei risultati"],
            meta: [
              { k: "Tempi", v: "1 — 2 settimane" },
              { k: "Dove", v: "Alpacode Studio" },
              { k: "Canali", v: "Google · Meta" },
            ],
            door: studioPack("landing-adv"),
          },
        ],
      },
    ],
  },
  en: {
    crumb: "Products",
    h1Line1: "Products &",
    h1Line2: "packages.",
    lede: "Our digital products and ready-made packages: solutions already defined, ready to start from. Pick where to begin — we'll work out the rest together.",
    intro: "Each package spells out what's inside and how long it takes. If you need something more bespoke, that's what services are for.",
    groups: [
      {
        label: "Digital products",
        tagline: "Our own products, ready to work for you.",
        featured: true,
        list: [
          {
            n: "01",
            tag: "Flagship product",
            t: "Hive Commerce",
            d: "Our WooCommerce plugin that automates your e-commerce. Full feature set and a graphic theme included: everything you need to launch an online business.",
            forWho: "For launching an e-commerce",
            items: ["Automated e-commerce management", "Graphic theme included", "Complete feature set", "Plug-and-play on WooCommerce", "Continuous updates"],
            meta: [
              { k: "Type", v: "WooCommerce plugin" },
              { k: "Included", v: "Graphic theme" },
              { k: "License", v: "On request" },
            ],
            slug: "hive-commerce",
          },
          {
            n: "02",
            tag: "Digital kit",
            t: "Alpacode Pro Kit",
            d: "The complete kit to start a career as a Web Master: guides, PDFs, resources, repositories, code and WordPress dev kits, plus a management dashboard. Literally everything.",
            forWho: "For becoming a Web Master",
            items: ["Guides and PDFs", "Resources and repositories", "Code and WordPress dev kits", "Management dashboard", "Lifetime updates"],
            meta: [
              { k: "Format", v: "Digital pack" },
              { k: "License", v: "Personal" },
              { k: "Updates", v: "Lifetime" },
            ],
            slug: "alpacode-pro-kit",
          },
          {
            n: "03",
            tag: "AI concierge",
            t: "Paco",
            d: "The AI concierge that sits between you and your website. It generates the site, you run it by texting on WhatsApp: updates, offers and customer replies, all in chat.",
            forWho: "For running your site from WhatsApp",
            items: ["AI-generated website", "Managed in chat, on WhatsApp", "Answers your customers", "Zero control panels", "Always up to date"],
            meta: [
              { k: "Type", v: "AI chatbot" },
              { k: "Channel", v: "WhatsApp" },
              { k: "License", v: "On request" },
            ],
            slug: "paco",
          },
        ],
      },
      {
        label: "Ready-made packages",
        tagline: "Solutions already defined, to get going fast.",
        list: [
          {
            n: "04",
            tag: "Package",
            t: "Ready Site",
            d: "Your business website, ready in a few weeks. Custom design, fast, and built to bring you clients.",
            forWho: "For professionals and small businesses",
            items: ["Custom design", "Up to 5 pages", "Mobile-optimized", "Basic SEO + Google", "Contact form", "Hands-on training"],
            meta: [
              { k: "Lead time", v: "2 — 3 weeks" },
              { k: "Pages", v: "Up to 5" },
              { k: "After", v: "Optional maintenance" },
            ],
          },
          {
            n: "05",
            tag: "Package",
            t: "E-commerce Starter",
            d: "An online shop ready to sell: catalog, payments and shipping already set up and tested.",
            forWho: "For those starting to sell online",
            items: ["Product catalog", "Secure payments", "Shipping & stock", "Order management", "Mobile-ready", "Hands-on training"],
            meta: [
              { k: "Lead time", v: "3 — 5 weeks" },
              { k: "Delivery", v: "Set up and tested" },
              { k: "Base", v: "WooCommerce / Shopify" },
            ],
          },
          {
            n: "06",
            tag: "Package",
            t: "Brand Kit",
            d: "Logo, colors and a visual identity ready to use. Everything you need to present yourself well, everywhere.",
            forWho: "For starting from scratch or refreshing",
            items: ["Logo and variants", "Palette and fonts", "Usage guidelines", "Social templates", "Cards & email signatures"],
            meta: [
              { k: "Lead time", v: "~ 2 weeks" },
              { k: "Where", v: "Alpacode Studio" },
              { k: "Delivery", v: "Ready-to-use files" },
            ],
            door: studioPack("brand-kit"),
          },
          {
            n: "07",
            tag: "Package",
            t: "Landing & ADV",
            d: "A page built to convert and an advertising campaign launched and tracked. For a launch or a promotion.",
            forWho: "For launches, events and promotions",
            items: ["Focused landing page", "Conversion tracking", "Google & Meta campaign setup", "First month of management", "Results report"],
            meta: [
              { k: "Lead time", v: "1 — 2 weeks" },
              { k: "Where", v: "Alpacode Studio" },
              { k: "Channels", v: "Google · Meta" },
            ],
            door: studioPack("landing-adv"),
          },
        ],
      },
    ],
  },
};
