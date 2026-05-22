import type { Lang } from "../i18n/types";

export interface ProductMeta {
  k: string;
  v: string;
}
export interface Product {
  n: string;
  /** Short badge, e.g. "PRODOTTO DI PUNTA", "KIT DIGITALE", "PREZZO FISSO". */
  tag: string;
  t: string;
  d: string;
  forWho: string;
  items: string[];
  meta: ProductMeta[];
}
export interface ProductGroup {
  label: string;
  tagline: string;
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
    crumb: "03 · PRODOTTI",
    h1Line1: "Prodotti &",
    h1Line2: "pacchetti.",
    lede: "I nostri prodotti digitali e i pacchetti pronti, con un prezzo deciso prima di partire. Scegli il punto da cui iniziare: al resto pensiamo insieme.",
    intro: "Prezzo chiaro fin dall'inizio. Se ti serve qualcosa di più su misura, ci sono i servizi.",
    groups: [
      {
        label: "Prodotti digitali",
        tagline: "I nostri prodotti, pronti a lavorare per te.",
        list: [
          {
            n: "01",
            tag: "PRODOTTO DI PUNTA",
            t: "Hive Commerce",
            d: "Il nostro plugin per WooCommerce che automatizza la gestione del tuo e-commerce. Funzionalità complete e tema grafico incluso: tutto il necessario per avviare un'attività commerciale online.",
            forWho: "Per chi avvia un e-commerce",
            items: ["Gestione e-commerce automatizzata", "Tema grafico incluso", "Set di funzionalità completo", "Plug-and-play su WooCommerce", "Aggiornamenti continui"],
            meta: [
              { k: "Tipo", v: "Plugin WooCommerce" },
              { k: "Incluso", v: "Tema grafico" },
              { k: "Licenza", v: "Su richiesta" },
            ],
          },
          {
            n: "02",
            tag: "KIT DIGITALE",
            t: "Alpacode Pro Kit",
            d: "Il kit completo per iniziare la carriera da Web Master: guide, PDF, risorse, repository, codice e kit di sviluppo WordPress, più una dashboard gestionale. Letteralmente tutto.",
            forWho: "Per chi vuole diventare Web Master",
            items: ["Guide e PDF", "Risorse e repository", "Codice e kit di sviluppo WordPress", "Dashboard gestionale", "Aggiornamenti a vita"],
            meta: [
              { k: "Formato", v: "Pacchetto digitale" },
              { k: "Licenza", v: "Personale" },
              { k: "Prezzo", v: "Su richiesta" },
            ],
          },
        ],
      },
      {
        label: "Pacchetti pronti",
        tagline: "Soluzioni a prezzo fisso per partire in fretta.",
        list: [
          {
            n: "03",
            tag: "PREZZO FISSO",
            t: "Sito Pronto",
            d: "Il sito della tua attività, pronto in poche settimane. Design su misura, veloce e pensato per portarti clienti.",
            forWho: "Per professionisti e piccole imprese",
            items: ["Design su misura", "Fino a 5 pagine", "Ottimizzato per mobile", "SEO di base + Google", "Modulo contatti", "Formazione all'uso"],
            meta: [
              { k: "Tempi", v: "2 — 3 settimane" },
              { k: "Prezzo", v: "Fisso, deciso prima" },
              { k: "Dopo", v: "Care Plan opzionale" },
            ],
          },
          {
            n: "04",
            tag: "PREZZO FISSO",
            t: "E-commerce Starter",
            d: "Un negozio online pronto a vendere: catalogo, pagamenti e spedizioni già configurati e collaudati.",
            forWho: "Per chi vuole iniziare a vendere online",
            items: ["Catalogo prodotti", "Pagamenti sicuri", "Spedizioni & magazzino", "Gestione ordini", "Pronto da mobile", "Formazione all'uso"],
            meta: [
              { k: "Tempi", v: "3 — 5 settimane" },
              { k: "Prezzo", v: "Fisso, deciso prima" },
              { k: "Base", v: "WooCommerce / Shopify" },
            ],
          },
          {
            n: "05",
            tag: "PREZZO FISSO",
            t: "Brand Kit",
            d: "Logo, colori e identità visiva pronti all'uso. Tutto quello che serve per presentarti bene, ovunque.",
            forWho: "Per chi parte da zero o rinnova",
            items: ["Logo e varianti", "Palette e font", "Linee guida d'uso", "Template per i social", "Biglietti & firme email"],
            meta: [
              { k: "Tempi", v: "~ 2 settimane" },
              { k: "Prezzo", v: "Fisso, deciso prima" },
              { k: "Consegna", v: "File pronti all'uso" },
            ],
          },
          {
            n: "06",
            tag: "PREZZO FISSO",
            t: "Landing & ADV",
            d: "Una pagina pensata per convertire e una campagna pubblicitaria avviata e tracciata. Per un lancio o una promozione.",
            forWho: "Per lanci, eventi e promozioni",
            items: ["Landing page mirata", "Tracciamento conversioni", "Setup campagne Google & Meta", "Primo mese di gestione", "Report dei risultati"],
            meta: [
              { k: "Tempi", v: "1 — 2 settimane" },
              { k: "Prezzo", v: "Fisso + budget ADV" },
              { k: "Canali", v: "Google · Meta" },
            ],
          },
          {
            n: "07",
            tag: "ABBONAMENTO",
            t: "Care Plan",
            d: "Ci prendiamo cura del tuo sito tutti i mesi: aggiornamenti, sicurezza, backup e le modifiche che ti servono.",
            forWho: "Per chi è già online",
            items: ["Aggiornamenti & backup", "Sicurezza & monitoraggio", "Piccole modifiche incluse", "Canale di supporto dedicato", "Report periodico"],
            meta: [
              { k: "Formato", v: "Canone mensile" },
              { k: "Disdetta", v: "Quando vuoi" },
              { k: "Risposta", v: "< mezza giornata" },
            ],
          },
          {
            n: "08",
            tag: "SU MISURA",
            t: "Digitalizzazione Full",
            d: "Il percorso completo per digitalizzare tutta l'attività: dal sito ai gestionali, dal brand alla formazione del team.",
            forWho: "Per imprese che vogliono fare sul serio",
            items: ["Audit & roadmap", "Sito + software su misura", "Brand & comunicazione", "Integrazioni e automazioni", "Formazione del team", "Supporto continuativo"],
            meta: [
              { k: "Formato", v: "Percorso dedicato" },
              { k: "Prezzo", v: "Su misura, a fasi" },
              { k: "Durata", v: "Definita insieme" },
            ],
          },
        ],
      },
    ],
  },
  en: {
    crumb: "03 · PRODUCTS",
    h1Line1: "Products &",
    h1Line2: "packages.",
    lede: "Our digital products and ready-made packages, with a price agreed before we start. Pick where to begin — we'll figure out the rest together.",
    intro: "A clear price from the start. If you need something more bespoke, that's what services are for.",
    groups: [
      {
        label: "Digital products",
        tagline: "Our own products, ready to work for you.",
        list: [
          {
            n: "01",
            tag: "FLAGSHIP PRODUCT",
            t: "Hive Commerce",
            d: "Our WooCommerce plugin that automates your e-commerce. Full feature set and a graphic theme included: everything you need to launch an online business.",
            forWho: "For launching an e-commerce",
            items: ["Automated e-commerce management", "Graphic theme included", "Complete feature set", "Plug-and-play on WooCommerce", "Continuous updates"],
            meta: [
              { k: "Type", v: "WooCommerce plugin" },
              { k: "Included", v: "Graphic theme" },
              { k: "License", v: "On request" },
            ],
          },
          {
            n: "02",
            tag: "DIGITAL KIT",
            t: "Alpacode Pro Kit",
            d: "The complete kit to start a career as a Web Master: guides, PDFs, resources, repositories, code and WordPress dev kits, plus a management dashboard. Literally everything.",
            forWho: "For becoming a Web Master",
            items: ["Guides and PDFs", "Resources and repositories", "Code and WordPress dev kits", "Management dashboard", "Lifetime updates"],
            meta: [
              { k: "Format", v: "Digital pack" },
              { k: "License", v: "Personal" },
              { k: "Price", v: "On request" },
            ],
          },
        ],
      },
      {
        label: "Ready-made packages",
        tagline: "Fixed-price solutions to get going fast.",
        list: [
          {
            n: "03",
            tag: "FIXED PRICE",
            t: "Ready Site",
            d: "Your business website, ready in a few weeks. Custom design, fast, and built to bring you clients.",
            forWho: "For professionals and small businesses",
            items: ["Custom design", "Up to 5 pages", "Mobile-optimized", "Basic SEO + Google", "Contact form", "Hands-on training"],
            meta: [
              { k: "Lead time", v: "2 — 3 weeks" },
              { k: "Price", v: "Fixed, agreed first" },
              { k: "After", v: "Optional Care Plan" },
            ],
          },
          {
            n: "04",
            tag: "FIXED PRICE",
            t: "E-commerce Starter",
            d: "An online shop ready to sell: catalog, payments and shipping already set up and tested.",
            forWho: "For those starting to sell online",
            items: ["Product catalog", "Secure payments", "Shipping & stock", "Order management", "Mobile-ready", "Hands-on training"],
            meta: [
              { k: "Lead time", v: "3 — 5 weeks" },
              { k: "Price", v: "Fixed, agreed first" },
              { k: "Base", v: "WooCommerce / Shopify" },
            ],
          },
          {
            n: "05",
            tag: "FIXED PRICE",
            t: "Brand Kit",
            d: "Logo, colors and a visual identity ready to use. Everything you need to present yourself well, everywhere.",
            forWho: "For starting from scratch or refreshing",
            items: ["Logo and variants", "Palette and fonts", "Usage guidelines", "Social templates", "Cards & email signatures"],
            meta: [
              { k: "Lead time", v: "~ 2 weeks" },
              { k: "Price", v: "Fixed, agreed first" },
              { k: "Delivery", v: "Ready-to-use files" },
            ],
          },
          {
            n: "06",
            tag: "FIXED PRICE",
            t: "Landing & ADV",
            d: "A page built to convert and an advertising campaign launched and tracked. For a launch or a promotion.",
            forWho: "For launches, events and promotions",
            items: ["Focused landing page", "Conversion tracking", "Google & Meta campaign setup", "First month of management", "Results report"],
            meta: [
              { k: "Lead time", v: "1 — 2 weeks" },
              { k: "Price", v: "Fixed + ad budget" },
              { k: "Channels", v: "Google · Meta" },
            ],
          },
          {
            n: "07",
            tag: "SUBSCRIPTION",
            t: "Care Plan",
            d: "We look after your site every month: updates, security, backups and the changes you need.",
            forWho: "For those already online",
            items: ["Updates & backups", "Security & monitoring", "Small changes included", "Dedicated support channel", "Periodic report"],
            meta: [
              { k: "Format", v: "Monthly fee" },
              { k: "Cancel", v: "Anytime" },
              { k: "Reply", v: "< half a worked day" },
            ],
          },
          {
            n: "08",
            tag: "BESPOKE",
            t: "Full Digitalization",
            d: "The complete path to digitalize your whole business: from the site to internal tools, from brand to team training.",
            forWho: "For businesses that mean it",
            items: ["Audit & roadmap", "Custom site + software", "Brand & communication", "Integrations and automations", "Team training", "Ongoing support"],
            meta: [
              { k: "Format", v: "Dedicated path" },
              { k: "Price", v: "Bespoke, in phases" },
              { k: "Duration", v: "Set together" },
            ],
          },
        ],
      },
    ],
  },
};
