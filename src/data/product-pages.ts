/* ============================================================
   Product detail pages — early-access teasers for Hive Commerce
   and Alpacode Pro Kit. Lean structure: hero, pitch, four features,
   early-access perks, final CTA.
   ============================================================ */
import type { Lang } from "../i18n/types";

export interface FeatureItem {
  /** Short, JetBrains-Mono'd index, e.g. "01". */
  n: string;
  t: string;
  d: string;
}

export interface PerkItem {
  n: string;
  t: string;
  d: string;
}

export interface MetaCell {
  k: string;
  v: string;
}

export interface ProductPage {
  /** Title that ships in <head>. */
  title: string;
  /** Description in <head> and OG. */
  description: string;
  /** Path under public/, e.g. "/og-hive-commerce.svg". */
  ogImage: string;

  /** Page header crumb, e.g. "PRODOTTI · HIVE COMMERCE". */
  crumb: string;
  /** Pre-launch eyebrow, e.g. "EARLY ACCESS · Q3 2026". */
  eyebrow: string;
  /** Bold display headline. Renders as two lines with <br/>. */
  h1Line1: string;
  h1Line2: string;
  /** 1–2 line lede beneath the headline. */
  lede: string;
  /** CTAs on the hero. */
  ctaPrimary: string;
  ctaSecondary: string;
  /** Four key facts shown beneath the hero as a meta strip. */
  heroMeta: MetaCell[];

  /** Pitch block — manifesto sentence + 1–2 paragraphs of "why". */
  pitchEyebrow: string;
  pitchLead: string;
  pitchBody: string;

  /** Features highlights — exactly 4 cards. */
  featuresEyebrow: string;
  featuresHeading: string;
  features: FeatureItem[];

  /** Early-access pitch — 3 perks of joining now. */
  eaEyebrow: string;
  eaHeading: string;
  eaLede: string;
  eaPerks: PerkItem[];
  eaCta: string;

  /** Final CTA section. */
  ctaFinalEyebrow: string;
  ctaFinalLine1: string;
  ctaFinalLine2: string;
  ctaFinalSub: string;
  ctaFinalCta: string;
  ctaFinalAlt: string;

  /** Floating sticky pill label. */
  stickyCta: string;
}

/* ------------------------------------------------------------
   Hive Commerce
   ------------------------------------------------------------ */
export const hiveCommerce: Record<Lang, ProductPage> = {
  it: {
    title: "Hive Commerce · Plugin WooCommerce per e-commerce in autonomia · Alpacode",
    description:
      "Hive Commerce è il plugin che automatizza la gestione del tuo e-commerce su WooCommerce: tema grafico incluso, set di funzionalità completo, aggiornamenti continui. Early access da Q3 2026.",
    ogImage: "/og-hive-commerce.svg",

    crumb: "PRODOTTI · 01 HIVE COMMERCE",
    eyebrow: "EARLY ACCESS · Q3 2026",
    h1Line1: "Il tuo e-commerce,",
    h1Line2: "che si gestisce da solo.",
    lede:
      "Hive Commerce è il plugin che automatizza l'operativo di un negozio su WooCommerce. Catalogo, ordini, fornitori, comunicazioni: ci pensa lui. Tu vendi, basta.",
    ctaPrimary: "Prenota una call",
    ctaSecondary: "Richiedi l'early access",
    heroMeta: [
      { k: "Tipo", v: "Plugin WooCommerce" },
      { k: "Incluso", v: "Tema grafico" },
      { k: "Disponibile", v: "Q3 2026" },
      { k: "Licenza", v: "Su richiesta" },
    ],

    pitchEyebrow: "§ 01 — PERCHÉ HIVE",
    pitchLead:
      "La maggior parte degli e-commerce muore per stanchezza, non per concorrenza.",
    pitchBody:
      "Aggiornare prezzi, smaltire ordini, rispondere ai clienti, sincronizzare il magazzino: è un secondo lavoro a tempo pieno. Hive Commerce nasce per togliertelo. Zero gergo, niente abbonamenti a sorpresa, e un tema grafico che non sembra del 2014.",

    featuresEyebrow: "§ 02 — DENTRO IL PLUGIN",
    featuresHeading: "Cosa fa, in concreto.",
    features: [
      {
        n: "01",
        t: "Gestione automatica del catalogo",
        d: "Importazione, aggiornamento prezzi, varianti e SEO dei prodotti — sincronizzati con la tua fonte dati o un CSV.",
      },
      {
        n: "02",
        t: "Ordini e clienti, da soli",
        d: "Routing degli ordini, email transazionali in italiano, regole di sconto e fatturazione elettronica connessa.",
      },
      {
        n: "03",
        t: "Tema grafico incluso",
        d: "Un tema pulito, veloce, mobile-first, pensato per convertire. Personalizzabile senza toccare codice.",
      },
      {
        n: "04",
        t: "Marketing automation integrato",
        d: "Carrelli abbandonati, riacquisto, recensioni post-vendita e segmentazione clienti — già configurato.",
      },
    ],

    eaEyebrow: "§ 03 — EARLY ACCESS",
    eaHeading: "Entra prima.",
    eaLede:
      "Lancio pubblico nel terzo trimestre 2026. Chi sale a bordo adesso non aspetta — e non paga come gli altri.",
    eaPerks: [
      {
        n: "01",
        t: "Accesso anticipato",
        d: "Sei tra i primi a installarlo, con sei mesi di vantaggio sul lancio pubblico.",
      },
      {
        n: "02",
        t: "Prezzo fondatori",
        d: "Tariffa bloccata a vita. La pagi una volta sola, quando entri.",
      },
      {
        n: "03",
        t: "Roadmap condivisa",
        d: "Le tue richieste pesano. Decidi insieme a noi cosa entra nelle prossime versioni.",
      },
    ],
    eaCta: "Richiedi l'early access",

    ctaFinalEyebrow: "§ 04 — INIZIA",
    ctaFinalLine1: "Pronto a smettere",
    ctaFinalLine2: "di gestire il negozio a mano?",
    ctaFinalSub:
      "Trenta minuti di call: ti facciamo vedere Hive in azione e ti diciamo se ha senso per te. Tutto qui.",
    ctaFinalCta: "Prenota una call",
    ctaFinalAlt: "Torna ai prodotti",

    stickyCta: "Prenota una call",
  },

  en: {
    title: "Hive Commerce · WooCommerce plugin for self-running e-commerce · Alpacode",
    description:
      "Hive Commerce is the plugin that automates the operations of your WooCommerce store: graphic theme included, complete feature set, continuous updates. Early access from Q3 2026.",
    ogImage: "/og-hive-commerce.svg",

    crumb: "PRODUCTS · 01 HIVE COMMERCE",
    eyebrow: "EARLY ACCESS · Q3 2026",
    h1Line1: "Your e-commerce,",
    h1Line2: "running on its own.",
    lede:
      "Hive Commerce is the plugin that automates the day-to-day of a WooCommerce store. Catalog, orders, suppliers, messages: it handles them. You sell, that's it.",
    ctaPrimary: "Book a call",
    ctaSecondary: "Request early access",
    heroMeta: [
      { k: "Type", v: "WooCommerce plugin" },
      { k: "Included", v: "Graphic theme" },
      { k: "Available", v: "Q3 2026" },
      { k: "License", v: "On request" },
    ],

    pitchEyebrow: "§ 01 — WHY HIVE",
    pitchLead: "Most e-commerce stores die of exhaustion, not competition.",
    pitchBody:
      "Updating prices, shipping orders, replying to customers, syncing stock: it's a full-time second job. Hive Commerce exists to take it away from you. No jargon, no surprise subscriptions, and a theme that doesn't look like it's from 2014.",

    featuresEyebrow: "§ 02 — INSIDE THE PLUGIN",
    featuresHeading: "What it does, concretely.",
    features: [
      {
        n: "01",
        t: "Automatic catalog management",
        d: "Imports, price updates, variants and product SEO — synced with your data source or a CSV.",
      },
      {
        n: "02",
        t: "Orders & customers, on autopilot",
        d: "Order routing, transactional emails, discount rules and connected e-invoicing.",
      },
      {
        n: "03",
        t: "Graphic theme included",
        d: "Clean, fast, mobile-first theme, built to convert. Fully customizable without touching code.",
      },
      {
        n: "04",
        t: "Marketing automation built in",
        d: "Abandoned carts, repeat-buy nudges, post-purchase reviews and customer segmentation — pre-configured.",
      },
    ],

    eaEyebrow: "§ 03 — EARLY ACCESS",
    eaHeading: "Get in early.",
    eaLede:
      "Public launch is Q3 2026. Coming on board now means you don't wait — and you don't pay like everyone else.",
    eaPerks: [
      {
        n: "01",
        t: "Early entry",
        d: "You're among the first to install it, with a six-month head start on the public launch.",
      },
      {
        n: "02",
        t: "Founder pricing",
        d: "Rate locked for life. Paid once, when you join.",
      },
      {
        n: "03",
        t: "Shared roadmap",
        d: "Your requests carry weight. Decide with us what ships next.",
      },
    ],
    eaCta: "Request early access",

    ctaFinalEyebrow: "§ 04 — START",
    ctaFinalLine1: "Ready to stop",
    ctaFinalLine2: "running the store by hand?",
    ctaFinalSub:
      "Thirty minutes on a call: we show you Hive in action and tell you straight if it fits. That's it.",
    ctaFinalCta: "Book a call",
    ctaFinalAlt: "Back to products",

    stickyCta: "Book a call",
  },
};

/* ------------------------------------------------------------
   Alpacode Pro Kit
   ------------------------------------------------------------ */
export const alpacodeProKit: Record<Lang, ProductPage> = {
  it: {
    title: "Alpacode Pro Kit · Il kit completo per diventare Web Master · Alpacode",
    description:
      "Alpacode Pro Kit: guide, PDF, repository, kit di sviluppo WordPress e dashboard gestionale. Tutto quello che serve per iniziare la carriera da Web Master. Early access da Q3 2026.",
    ogImage: "/og-alpacode-pro-kit.svg",

    crumb: "PRODOTTI · 02 ALPACODE PRO KIT",
    eyebrow: "EARLY ACCESS · Q3 2026",
    h1Line1: "Tutto quello",
    h1Line2: "che ti serve. Davvero.",
    lede:
      "Alpacode Pro Kit è il pacchetto digitale che ti porta da curioso a Web Master. Guide, repository, codice, kit di sviluppo, dashboard. Niente filler, niente corso da 12 ore.",
    ctaPrimary: "Prenota una call",
    ctaSecondary: "Richiedi l'early access",
    heroMeta: [
      { k: "Formato", v: "Pacchetto digitale" },
      { k: "Licenza", v: "Personale" },
      { k: "Aggiornamenti", v: "A vita" },
      { k: "Disponibile", v: "Q3 2026" },
    ],

    pitchEyebrow: "§ 01 — PERCHÉ IL KIT",
    pitchLead:
      "I corsi ti insegnano. Il Pro Kit ti dà gli strumenti per lavorare.",
    pitchBody:
      "Quasi tutti i corsi finiscono dove inizia il lavoro vero. Il Pro Kit parte da lì. Dentro c'è quello che usiamo noi in studio ogni giorno: codice già scritto, template WordPress pronti, kit di sviluppo, contratti, una dashboard per gestire i tuoi progetti.",

    featuresEyebrow: "§ 02 — DENTRO IL KIT",
    featuresHeading: "Quello che apri il primo giorno.",
    features: [
      {
        n: "01",
        t: "Repository di codice",
        d: "Snippet, hook, template, blocchi Gutenberg, configurazioni Sage. Tutto pronto da clonare, commentato.",
      },
      {
        n: "02",
        t: "Kit di sviluppo WordPress",
        d: "Stack Docker, script di deploy, configurazioni standard, plugin di base. Apri, lavori, consegni.",
      },
      {
        n: "03",
        t: "Dashboard gestionale",
        d: "L'app per gestire i tuoi clienti, i progetti, i tempi e le scadenze. Pensata per un freelance.",
      },
      {
        n: "04",
        t: "Template di contratto",
        d: "Proposta, contratto e fattura già pronti, in italiano, scritti con un commercialista vero.",
      },
    ],

    eaEyebrow: "§ 03 — EARLY ACCESS",
    eaHeading: "Sei tra i primi.",
    eaLede:
      "Lancio pubblico nel terzo trimestre 2026. Chi entra adesso porta a casa l'edizione fondatori — e ha voce in capitolo.",
    eaPerks: [
      {
        n: "01",
        t: "Accesso anticipato",
        d: "Apri il kit prima del lancio pubblico, con tutti gli aggiornamenti delle versioni a venire.",
      },
      {
        n: "02",
        t: "Edizione fondatori",
        d: "Dashboard gestionale a vita, prezzo bloccato, niente canone mensile.",
      },
      {
        n: "03",
        t: "Roadmap condivisa",
        d: "Decidi insieme a noi cosa entra. I tuoi casi reali diventano i prossimi template.",
      },
    ],
    eaCta: "Richiedi l'early access",

    ctaFinalEyebrow: "§ 04 — INIZIA",
    ctaFinalLine1: "Pronto a smettere",
    ctaFinalLine2: "di reinventare la ruota?",
    ctaFinalSub:
      "Trenta minuti di call: ti facciamo vedere cosa c'è dentro il kit e ti diciamo se è il momento giusto.",
    ctaFinalCta: "Prenota una call",
    ctaFinalAlt: "Torna ai prodotti",

    stickyCta: "Prenota una call",
  },

  en: {
    title: "Alpacode Pro Kit · The complete kit to become a Web Master · Alpacode",
    description:
      "Alpacode Pro Kit: guides, PDFs, repositories, WordPress dev kits and a management dashboard. Everything you need to start your Web Master career. Early access from Q3 2026.",
    ogImage: "/og-alpacode-pro-kit.svg",

    crumb: "PRODUCTS · 02 ALPACODE PRO KIT",
    eyebrow: "EARLY ACCESS · Q3 2026",
    h1Line1: "Everything",
    h1Line2: "you need. For real.",
    lede:
      "Alpacode Pro Kit is the digital pack that takes you from curious to Web Master. Guides, repositories, code, dev kits, dashboard. No filler, no 12-hour course.",
    ctaPrimary: "Book a call",
    ctaSecondary: "Request early access",
    heroMeta: [
      { k: "Format", v: "Digital pack" },
      { k: "License", v: "Personal" },
      { k: "Updates", v: "Lifetime" },
      { k: "Available", v: "Q3 2026" },
    ],

    pitchEyebrow: "§ 01 — WHY THE KIT",
    pitchLead: "Courses teach you. The Pro Kit gives you the tools to work.",
    pitchBody:
      "Most courses end where the real work begins. The Pro Kit starts there. Inside it is what we use in the studio every day: pre-written code, ready WordPress templates, dev kits, contracts, a dashboard to run your projects.",

    featuresEyebrow: "§ 02 — INSIDE THE KIT",
    featuresHeading: "What you open on day one.",
    features: [
      {
        n: "01",
        t: "Code repositories",
        d: "Snippets, hooks, templates, Gutenberg blocks, Sage configs. Ready to clone, commented.",
      },
      {
        n: "02",
        t: "WordPress dev kit",
        d: "Docker stack, deploy scripts, standard configs, base plugins. Open it, work, ship.",
      },
      {
        n: "03",
        t: "Management dashboard",
        d: "The app to manage clients, projects, time and deadlines. Built for a freelancer.",
      },
      {
        n: "04",
        t: "Contract templates",
        d: "Proposal, contract and invoice templates ready to use, written with a real accountant.",
      },
    ],

    eaEyebrow: "§ 03 — EARLY ACCESS",
    eaHeading: "You're among the first.",
    eaLede:
      "Public launch is Q3 2026. Joining now means you get the founders' edition — and you get a say.",
    eaPerks: [
      {
        n: "01",
        t: "Early entry",
        d: "Open the kit before the public launch, with all future version updates included.",
      },
      {
        n: "02",
        t: "Founders' edition",
        d: "Lifetime management dashboard, locked price, no monthly fee.",
      },
      {
        n: "03",
        t: "Shared roadmap",
        d: "Decide with us what ships next. Your real cases become the next templates.",
      },
    ],
    eaCta: "Request early access",

    ctaFinalEyebrow: "§ 04 — START",
    ctaFinalLine1: "Ready to stop",
    ctaFinalLine2: "reinventing the wheel?",
    ctaFinalSub:
      "Thirty minutes on a call: we show you what's in the kit and tell you straight if it's the right time.",
    ctaFinalCta: "Book a call",
    ctaFinalAlt: "Back to products",

    stickyCta: "Book a call",
  },
};
