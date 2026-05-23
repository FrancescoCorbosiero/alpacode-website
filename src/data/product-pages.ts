/* ============================================================
   Product detail pages — content for the standalone presentations
   of Hive Commerce and Alpacode Pro Kit.

   Structure is stable: feature counts, FAQ counts and qualification
   lists can change length without code changes.
   ============================================================ */
import type { Lang } from "../i18n/types";

export interface FeatureItem {
  /** Short, JetBrains-Mono'd index, e.g. "01". */
  n: string;
  t: string;
  d: string;
}

export interface StepItem {
  n: string;
  t: string;
  d: string;
}

export interface QualifyItem {
  /** Symbol shown before the line. Convention: "+" for fits, "−" for misfits. */
  mark: "+" | "-";
  t: string;
}

export interface ComparisonRow {
  /** Capability or trait being compared. */
  k: string;
  /** This product's answer. */
  ours: string;
  /** The alternative's answer. */
  theirs: string;
}

export interface FaqItem {
  q: string;
  a: string;
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

  /** Features grid — 4–6 cards. */
  featuresEyebrow: string;
  featuresHeading: string;
  features: FeatureItem[];

  /** "What's inside" or "How it works" — 3–6 steps/items. */
  stepsEyebrow: string;
  stepsHeading: string;
  stepsLede: string;
  steps: StepItem[];

  /** Qualification — for who / not for who. */
  forWhoEyebrow: string;
  forWhoHeading: string;
  forWho: QualifyItem[];
  notFor: QualifyItem[];
  forWhoLabel: string;
  notForLabel: string;

  /** Differentiator — a 1-line manifesto + a comparison table. */
  vsEyebrow: string;
  vsHeading: string;
  vsClaim: string;
  vsOursLabel: string;
  vsTheirsLabel: string;
  vsRows: ComparisonRow[];

  /** FAQ — 4–6 disclosure items. */
  faqEyebrow: string;
  faqHeading: string;
  faq: FaqItem[];

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
      "Aggiornare prezzi, smaltire ordini, rispondere ai clienti, sincronizzare il magazzino, mandare le email giuste al momento giusto: è un secondo lavoro a tempo pieno. Hive Commerce nasce per togliertelo. Lo costruiamo nel modo in cui vorremmo che fosse fatto un plugin: zero gergo, niente abbonamenti a sorpresa, e un tema grafico che non sembra del 2014.",

    featuresEyebrow: "§ 02 — DENTRO IL PLUGIN",
    featuresHeading: "Cosa fa, in concreto.",
    features: [
      {
        n: "01",
        t: "Gestione automatica del catalogo",
        d: "Importazione, aggiornamento prezzi, varianti, fotografie e SEO dei prodotti — sincronizzati con la tua fonte dati o un CSV.",
      },
      {
        n: "02",
        t: "Ordini e clienti, da soli",
        d: "Routing degli ordini, email transazionali in italiano, regole di sconto, gestione resi e fatturazione elettronica connessa.",
      },
      {
        n: "03",
        t: "Magazzino sincronizzato",
        d: "Stock condiviso tra negozio fisico, marketplace e WooCommerce. Aggiornamenti in tempo reale, soglie di riordino, alert.",
      },
      {
        n: "04",
        t: "Tema grafico incluso",
        d: "Un tema pulito, veloce, mobile-first, già pensato per convertire. Personalizzabile senza toccare codice.",
      },
      {
        n: "05",
        t: "Marketing automation integrato",
        d: "Carrelli abbandonati, riacquisto, recensioni post-vendita e segmentazione clienti — già configurato, basta accenderlo.",
      },
      {
        n: "06",
        t: "Aggiornamenti continui",
        d: "Roadmap pubblica, nuove funzionalità ogni mese, supporto da una persona vera. Niente upsell nascosti.",
      },
    ],

    stepsEyebrow: "§ 03 — COME ENTRA NEL TUO SITO",
    stepsHeading: "Quattro passi, in ordine.",
    stepsLede:
      "Dal momento in cui ti diamo accesso, ci sono al massimo due settimane di lavoro fra te e un negozio che gira da solo.",
    steps: [
      {
        n: "01",
        t: "Diagnosi iniziale",
        d: "Una call di 30 minuti per capire catalogo, volumi, integrazioni esistenti e cosa ti fa perdere più tempo oggi.",
      },
      {
        n: "02",
        t: "Installazione & configurazione",
        d: "Installiamo il plugin sul tuo WordPress, importiamo i prodotti, mappiamo i flussi. Niente downtime, niente perdita di dati.",
      },
      {
        n: "03",
        t: "Tema e personalizzazione",
        d: "Adattiamo il tema grafico al tuo brand: colori, font, struttura. Lo facciamo girare su mobile e desktop prima di pubblicarlo.",
      },
      {
        n: "04",
        t: "Lancio & supporto",
        d: "Pubblichiamo, monitoriamo i primi giorni, ti formiamo all'uso della dashboard. Da lì in poi sei autonomo — ma ci siamo.",
      },
    ],

    forWhoEyebrow: "§ 04 — PER CHI È",
    forWhoHeading: "Onestamente: a chi serve, e a chi no.",
    forWhoLabel: "Hive è per te se",
    notForLabel: "Non è per te se",
    forWho: [
      { mark: "+", t: "Hai un negozio fisico o un brand e vuoi vendere online sul serio." },
      { mark: "+", t: "Sei già su WooCommerce e ti stai annoiando a fare le stesse cose ogni settimana." },
      { mark: "+", t: "Hai un catalogo da 50 a 5.000 prodotti e l'idea di aggiornarli a mano ti fa paura." },
      { mark: "+", t: "Vuoi che il tuo e-commerce sembri progettato, non assemblato." },
    ],
    notFor: [
      { mark: "-", t: "Vendi 2 prodotti su Instagram: ti basta un link, non un plugin." },
      { mark: "-", t: "Hai una piattaforma proprietaria custom: Hive vive su WooCommerce." },
      { mark: "-", t: "Cerchi il prezzo più basso del mercato: il nostro non lo è, ma è onesto." },
    ],

    vsEyebrow: "§ 05 — HIVE VS IL RESTO",
    vsHeading: "Cosa cambia, in pratica.",
    vsClaim:
      "I plugin commerciali ti vendono moduli. Noi ti vendiamo un e-commerce finito, e poi smettiamo di disturbarti.",
    vsOursLabel: "Hive Commerce",
    vsTheirsLabel: "Plugin tipico",
    vsRows: [
      { k: "Tema grafico", ours: "Incluso, già pensato per convertire", theirs: "Da comprare a parte, spesso datato" },
      { k: "Automazioni", ours: "Già attive al lancio", theirs: "Add-on a pagamento" },
      { k: "Aggiornamenti", ours: "Continui, gratuiti, con changelog", theirs: "Sporadici, con sorprese" },
      { k: "Supporto", ours: "Una persona vera in italiano", theirs: "Ticket in inglese, 48h+" },
      { k: "Prezzo", ours: "Definito prima, niente upsell", theirs: "Licenza + moduli + supporto premium" },
    ],

    faqEyebrow: "§ 06 — DOMANDE",
    faqHeading: "Quelle vere.",
    faq: [
      {
        q: "Quanto costa Hive Commerce?",
        a: "Il prezzo dipende dalle dimensioni del catalogo e dalle integrazioni. Dopo una call gratuita ti diamo una cifra chiara e definitiva, senza moduli a pagamento da aggiungere dopo. Le licenze partono da una quota una tantum più un canone annuale di manutenzione opzionale.",
      },
      {
        q: "Funziona col mio tema attuale?",
        a: "Hive include un tema grafico ottimizzato. Se ne hai già uno, possiamo valutare: nella maggior parte dei casi conviene migrare al tema Hive, perché è pensato per le sue automazioni. Altrimenti adattiamo il plugin al tuo, con qualche limite.",
      },
      {
        q: "Posso provarlo prima?",
        a: "Sì. In fase di early access, organizziamo una demo guidata su un'installazione di prova dove vedi tutte le automazioni dal vivo, con i tuoi dati di esempio.",
      },
      {
        q: "Cosa succede se WooCommerce si aggiorna?",
        a: "Manteniamo Hive compatibile con le ultime versioni stabili di WordPress e WooCommerce. Gli aggiornamenti del plugin sono inclusi nella manutenzione e arrivano automaticamente al tuo sito.",
      },
      {
        q: "Quando esce davvero?",
        a: "Lancio pubblico previsto per il terzo trimestre 2026. Chi entra in early access lo riceve gratis per i primi sei mesi e contribuisce alla roadmap.",
      },
    ],

    ctaFinalEyebrow: "§ 07 — INIZIA",
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
      "Updating prices, shipping orders, replying to customers, syncing stock, sending the right email at the right moment: it's a full-time second job. Hive Commerce exists to take it away from you. We build it the way we'd want a plugin built: no jargon, no surprise subscriptions, and a theme that doesn't look like it's from 2014.",

    featuresEyebrow: "§ 02 — INSIDE THE PLUGIN",
    featuresHeading: "What it does, concretely.",
    features: [
      {
        n: "01",
        t: "Automatic catalog management",
        d: "Imports, price updates, variants, photos and product SEO — synced with your data source or a CSV.",
      },
      {
        n: "02",
        t: "Orders & customers, on autopilot",
        d: "Order routing, transactional emails, discount rules, returns and connected e-invoicing.",
      },
      {
        n: "03",
        t: "Inventory in sync",
        d: "Shared stock across your physical store, marketplaces and WooCommerce. Real-time updates, reorder thresholds, alerts.",
      },
      {
        n: "04",
        t: "Graphic theme included",
        d: "Clean, fast, mobile-first theme, built to convert. Fully customizable without touching code.",
      },
      {
        n: "05",
        t: "Marketing automation built in",
        d: "Abandoned carts, repeat-buy nudges, post-purchase reviews and customer segmentation — pre-configured, just switch on.",
      },
      {
        n: "06",
        t: "Continuous updates",
        d: "Public roadmap, new features every month, support from a real person. No hidden upsells.",
      },
    ],

    stepsEyebrow: "§ 03 — HOW IT LANDS IN YOUR SITE",
    stepsHeading: "Four steps, in order.",
    stepsLede:
      "From the moment we hand you access, it's at most two weeks of work between you and a store that runs on its own.",
    steps: [
      {
        n: "01",
        t: "Initial diagnostic",
        d: "A 30-minute call to map catalog, volumes, existing integrations and what's eating most of your time today.",
      },
      {
        n: "02",
        t: "Install & configure",
        d: "We install the plugin on your WordPress, import your products, map your flows. No downtime, no data loss.",
      },
      {
        n: "03",
        t: "Theme & customization",
        d: "We tune the included theme to your brand: colors, fonts, structure. Run it on mobile and desktop before publishing.",
      },
      {
        n: "04",
        t: "Launch & support",
        d: "We publish, monitor the first days, train you on the dashboard. From there you're autonomous — but we're around.",
      },
    ],

    forWhoEyebrow: "§ 04 — WHO IT'S FOR",
    forWhoHeading: "Honestly: who needs it, and who doesn't.",
    forWhoLabel: "Hive is for you if",
    notForLabel: "It's not for you if",
    forWho: [
      { mark: "+", t: "You have a physical store or a brand and want to sell online for real." },
      { mark: "+", t: "You're already on WooCommerce and tired of doing the same chores every week." },
      { mark: "+", t: "You have 50–5,000 products and the idea of updating them by hand scares you." },
      { mark: "+", t: "You want your store to look designed, not assembled." },
    ],
    notFor: [
      { mark: "-", t: "You sell 2 products on Instagram: you need a link, not a plugin." },
      { mark: "-", t: "You're on a custom proprietary platform: Hive lives on WooCommerce." },
      { mark: "-", t: "You're hunting for the cheapest plugin on the market: ours isn't, but it's honest." },
    ],

    vsEyebrow: "§ 05 — HIVE VS THE REST",
    vsHeading: "What changes, in practice.",
    vsClaim:
      "Commercial plugins sell you modules. We sell you a finished e-commerce, then we get out of your way.",
    vsOursLabel: "Hive Commerce",
    vsTheirsLabel: "Typical plugin",
    vsRows: [
      { k: "Graphic theme", ours: "Included, built to convert", theirs: "Bought separately, often dated" },
      { k: "Automations", ours: "Live at launch", theirs: "Paid add-ons" },
      { k: "Updates", ours: "Continuous, free, with changelog", theirs: "Sporadic, with surprises" },
      { k: "Support", ours: "A real person, in your language", theirs: "Tickets in English, 48h+" },
      { k: "Pricing", ours: "Set up-front, no upsells", theirs: "License + modules + premium support" },
    ],

    faqEyebrow: "§ 06 — QUESTIONS",
    faqHeading: "The real ones.",
    faq: [
      {
        q: "What does Hive Commerce cost?",
        a: "It depends on catalog size and integrations. After a free call we give you a clear, final number, with no paid modules to bolt on later. Licenses start from a one-off fee plus an optional yearly maintenance.",
      },
      {
        q: "Does it work with my current theme?",
        a: "Hive includes an optimized theme. If you have one already, we'll evaluate: most of the time migrating to the Hive theme is worth it, because the automations are built for it. Otherwise we adapt the plugin to yours, within limits.",
      },
      {
        q: "Can I try it first?",
        a: "Yes. During early access we run a guided demo on a sandbox install where you see all automations live, on your own sample data.",
      },
      {
        q: "What happens when WooCommerce updates?",
        a: "We keep Hive compatible with the latest stable WordPress and WooCommerce. Plugin updates are included in maintenance and ship to your site automatically.",
      },
      {
        q: "When does it actually launch?",
        a: "Public launch is planned for Q3 2026. Early-access partners get the first six months free and shape the roadmap.",
      },
    ],

    ctaFinalEyebrow: "§ 07 — START",
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
      "Quasi tutti i corsi finiscono al punto in cui inizia il lavoro vero. Il Pro Kit parte da lì. Dentro c'è quello che usiamo noi in studio ogni giorno: codice già scritto, repository da clonare, template WordPress pronti, kit di sviluppo, checklist di consegna, una dashboard per gestire i tuoi progetti. Più una manciata di guide secche su quello che a scuola non ti dicono.",

    featuresEyebrow: "§ 02 — DENTRO IL KIT",
    featuresHeading: "Quello che apri il primo giorno.",
    features: [
      {
        n: "01",
        t: "Guide & PDF operativi",
        d: "Manuali secchi sui temi pratici: WordPress in produzione, performance, SEO tecnica, gestione cliente, fatturazione.",
      },
      {
        n: "02",
        t: "Repository di codice",
        d: "Snippet, hook, template, blocchi Gutenberg, configurazioni Sage. Tutto pronto da clonare, commentato, MIT-friendly.",
      },
      {
        n: "03",
        t: "Kit di sviluppo WordPress",
        d: "Stack Docker, script di deploy, configurazioni standard, plugin di base. Apri, lavori, consegni.",
      },
      {
        n: "04",
        t: "Dashboard gestionale",
        d: "L'app per gestire i tuoi clienti, i progetti, i tempi e le scadenze. Pensata per un freelance, non per un'agenzia.",
      },
      {
        n: "05",
        t: "Template di contratto",
        d: "Modelli di proposta, contratto e fattura già pronti, in italiano, scritti con un commercialista vero.",
      },
      {
        n: "06",
        t: "Aggiornamenti a vita",
        d: "Una volta dentro, gli aggiornamenti sono tuoi per sempre. Nuovo codice, nuove guide, nuova dashboard.",
      },
    ],

    stepsEyebrow: "§ 03 — COME SI USA",
    stepsHeading: "Da zero al primo cliente.",
    stepsLede:
      "Il Pro Kit non è un corso da seguire in sequenza. È una cassetta degli attrezzi. Ma se sei alla prima volta, l'ordine è questo.",
    steps: [
      {
        n: "01",
        t: "Setup dell'ambiente",
        d: "Installa il kit di sviluppo, configura Docker, clona i repository. Le prime guide ti accompagnano passo passo.",
      },
      {
        n: "02",
        t: "Primo sito di prova",
        d: "Costruisci un sito completo seguendo le guide, partendo dai template. Tre o quattro serate, niente di più.",
      },
      {
        n: "03",
        t: "Pacchetto di vendita",
        d: "Usa i template di contratto e i materiali commerciali per fare la tua prima proposta a un cliente reale.",
      },
      {
        n: "04",
        t: "Gestione & consegna",
        d: "Lavori il progetto dentro la dashboard, segui le checklist di consegna, fatturi. Da qui in poi è solo ripetizione.",
      },
    ],

    forWhoEyebrow: "§ 04 — PER CHI È",
    forWhoHeading: "Chi lo apre davvero, e chi no.",
    forWhoLabel: "Il Pro Kit è per te se",
    notForLabel: "Non è per te se",
    forWho: [
      { mark: "+", t: "Hai fatto un corso, sai le basi e ora vuoi capire come si lavora davvero." },
      { mark: "+", t: "Sei freelance da poco e perdi tempo a riscrivere le stesse cose da zero." },
      { mark: "+", t: "Vuoi specializzarti in WordPress senza inventarti soluzioni amatoriali." },
      { mark: "+", t: "Ti piacciono le cose ordinate, le checklist e il codice ben scritto." },
    ],
    notFor: [
      { mark: "-", t: "Stai cercando un corso introduttivo da zero: il Pro Kit dà per scontate le basi." },
      { mark: "-", t: "Non programmi e non hai intenzione di iniziare: serve un minimo di HTML/CSS/PHP." },
      { mark: "-", t: "Vuoi un template grafico Photoshop: questo è un kit per chi fa codice." },
    ],

    vsEyebrow: "§ 05 — KIT VS CORSO",
    vsHeading: "Differenza pratica.",
    vsClaim:
      "Un corso ti spiega cosa fare. Un kit te lo fa fare. Questo è un kit, e include tutto quello che serve per lavorare il giorno dopo.",
    vsOursLabel: "Alpacode Pro Kit",
    vsTheirsLabel: "Corso generico",
    vsRows: [
      { k: "Codice incluso", ours: "Repository pronti da clonare", theirs: "Snippet copiabili dalle slide" },
      { k: "Dashboard", ours: "Strumento gestionale incluso", theirs: "Niente, ti arrangi" },
      { k: "Template legali", ours: "Contratti e fatture pronti", theirs: "Non c'entrano col corso" },
      { k: "Aggiornamenti", ours: "A vita, senza pagare", theirs: "Vendita di una nuova edizione" },
      { k: "Supporto", ours: "Email diretta, risposta sotto 24h", theirs: "Forum, gruppo, FAQ" },
    ],

    faqEyebrow: "§ 06 — DOMANDE",
    faqHeading: "Quelle vere.",
    faq: [
      {
        q: "Quanto costa?",
        a: "Una sola cifra, una sola volta. La definiamo insieme in base a quello che ti serve davvero. La dashboard gestionale può richiedere un canone mensile minimo per la versione cloud, alternativa self-hosted gratuita.",
      },
      {
        q: "Serve saper programmare?",
        a: "Sì, un minimo. Devi essere comodo con HTML, CSS e un po' di PHP. Non è un corso da zero. Se sei completamente principiante, ti consigliamo prima il corso WordPress Gutenberg.",
      },
      {
        q: "È un corso o una libreria di codice?",
        a: "Né uno né l'altro: è un kit. C'è codice pronto, ci sono guide secche, c'è una dashboard, ci sono i contratti. Lo usi come ti serve, quando ti serve.",
      },
      {
        q: "Posso usarlo per i miei clienti?",
        a: "Sì. La licenza è personale ma copre tutti i progetti che fai per i tuoi clienti. Non puoi rivendere il kit o redistribuirlo.",
      },
      {
        q: "Quando arriva?",
        a: "Lancio pubblico previsto per il terzo trimestre 2026. L'early access include accesso anticipato e un'edizione 'fondatori' della dashboard a vita.",
      },
    ],

    ctaFinalEyebrow: "§ 07 — INIZIA",
    ctaFinalLine1: "Pronto a smettere",
    ctaFinalLine2: "di reinventare la ruota?",
    ctaFinalSub:
      "Trenta minuti di call: ti facciamo vedere cosa c'è dentro il kit e ti diciamo se è il momento giusto. Se non lo è, te lo diciamo.",
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
      "Most courses end where the real work begins. The Pro Kit starts there. Inside it is what we use in the studio every day: pre-written code, repos to clone, WordPress templates, dev kits, delivery checklists, a dashboard to run your projects. Plus a handful of sharp guides on what nobody teaches you in school.",

    featuresEyebrow: "§ 02 — INSIDE THE KIT",
    featuresHeading: "What you open on day one.",
    features: [
      {
        n: "01",
        t: "Operational guides & PDFs",
        d: "Tight manuals on the practical topics: WordPress in production, performance, technical SEO, client handling, invoicing.",
      },
      {
        n: "02",
        t: "Code repositories",
        d: "Snippets, hooks, templates, Gutenberg blocks, Sage configs. Ready to clone, commented, MIT-friendly.",
      },
      {
        n: "03",
        t: "WordPress dev kit",
        d: "Docker stack, deploy scripts, standard configs, base plugins. Open it, work, ship.",
      },
      {
        n: "04",
        t: "Management dashboard",
        d: "The app to manage clients, projects, time and deadlines. Built for a freelancer, not for an agency.",
      },
      {
        n: "05",
        t: "Contract templates",
        d: "Proposal, contract and invoice templates ready to use, written with a real accountant.",
      },
      {
        n: "06",
        t: "Lifetime updates",
        d: "Once you're in, updates are yours forever. New code, new guides, new dashboard.",
      },
    ],

    stepsEyebrow: "§ 03 — HOW YOU USE IT",
    stepsHeading: "From zero to first client.",
    stepsLede:
      "The Pro Kit isn't a course to follow in order. It's a toolbox. But if it's your first time, this is the order.",
    steps: [
      {
        n: "01",
        t: "Set up the environment",
        d: "Install the dev kit, configure Docker, clone the repos. The first guides walk you through step by step.",
      },
      {
        n: "02",
        t: "First trial site",
        d: "Build a complete site following the guides, starting from the templates. Three or four evenings, no more.",
      },
      {
        n: "03",
        t: "Sales pack",
        d: "Use the contract templates and the commercial materials to make your first proposal to a real client.",
      },
      {
        n: "04",
        t: "Run & deliver",
        d: "Work the project inside the dashboard, follow the delivery checklists, invoice. From here it's just repetition.",
      },
    ],

    forWhoEyebrow: "§ 04 — WHO IT'S FOR",
    forWhoHeading: "Who really opens it, and who doesn't.",
    forWhoLabel: "The Pro Kit is for you if",
    notForLabel: "It's not for you if",
    forWho: [
      { mark: "+", t: "You've done a course, you know the basics, and now you want to see how real work happens." },
      { mark: "+", t: "You're a new freelancer and you waste time rewriting the same things from scratch." },
      { mark: "+", t: "You want to specialize in WordPress without inventing amateur solutions." },
      { mark: "+", t: "You like tidy things, checklists and well-written code." },
    ],
    notFor: [
      { mark: "-", t: "You're looking for a beginner course: the Pro Kit assumes the basics." },
      { mark: "-", t: "You don't code and don't plan to start: you need a baseline of HTML/CSS/PHP." },
      { mark: "-", t: "You want a Photoshop graphic template: this is a kit for people who write code." },
    ],

    vsEyebrow: "§ 05 — KIT VS COURSE",
    vsHeading: "Practical difference.",
    vsClaim:
      "A course explains what to do. A kit makes you do it. This is a kit, and it includes everything to work the next day.",
    vsOursLabel: "Alpacode Pro Kit",
    vsTheirsLabel: "Generic course",
    vsRows: [
      { k: "Code included", ours: "Ready-to-clone repositories", theirs: "Snippets copied from slides" },
      { k: "Dashboard", ours: "Built-in management tool", theirs: "Nothing, figure it out" },
      { k: "Legal templates", ours: "Contracts and invoices ready", theirs: "Not part of the course" },
      { k: "Updates", ours: "Lifetime, free", theirs: "Sold as a new edition" },
      { k: "Support", ours: "Direct email, reply under 24h", theirs: "Forum, group, FAQ" },
    ],

    faqEyebrow: "§ 06 — QUESTIONS",
    faqHeading: "The real ones.",
    faq: [
      {
        q: "How much does it cost?",
        a: "One price, paid once. We agree it together based on what you actually need. The management dashboard may carry a small monthly fee for the cloud version; the self-hosted version is free.",
      },
      {
        q: "Do I need to know how to code?",
        a: "Yes, a minimum. You should be comfortable with HTML, CSS and a bit of PHP. This isn't a beginner course. If you're a complete beginner, take the WordPress Gutenberg course first.",
      },
      {
        q: "Is it a course or a code library?",
        a: "Neither: it's a kit. There's ready code, there are sharp guides, there's a dashboard, there are the contracts. You use it as needed, when needed.",
      },
      {
        q: "Can I use it for my clients?",
        a: "Yes. The license is personal but covers all the work you do for your clients. You can't resell the kit or redistribute it.",
      },
      {
        q: "When does it arrive?",
        a: "Public launch is planned for Q3 2026. Early access includes early entry and a lifetime 'founders' edition of the dashboard.",
      },
    ],

    ctaFinalEyebrow: "§ 07 — START",
    ctaFinalLine1: "Ready to stop",
    ctaFinalLine2: "reinventing the wheel?",
    ctaFinalSub:
      "Thirty minutes on a call: we show you what's in the kit and tell you straight if it's the right time. If it isn't, we'll say so.",
    ctaFinalCta: "Book a call",
    ctaFinalAlt: "Back to products",

    stickyCta: "Book a call",
  },
};
