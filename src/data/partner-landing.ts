/* ============================================================
   Partner landing — /partner
   The "symbiosis" pitch: professionals with a client portfolio
   (SMM, accountants, sales agents, photographers…) become
   partners, not just clients. Three models: refer (segnala),
   resell white-label (rivendi), swap leads (scambia).

   No hard numbers on commissions or margins on purpose: terms
   are agreed on the first call and put in writing — the copy
   says exactly that instead of promising figures.
   ============================================================ */
import type { Lang } from "../i18n/types";

export interface PartnerMode {
  id: "segnala" | "rivendi" | "scambia";
  tab: string;
  headline: string;
  blurb: string;
  /** Label on the top rail (you → us). */
  flowTo: string;
  /** Label on the bottom rail (us → you). */
  flowFrom: string;
  bullets: string[];
}

export interface PartnerProfession {
  t: string;
  d: string;
}

export interface PartnerCopy {
  title: string;
  description: string;
  ogImage: string;

  /* Hero */
  eyebrow: string;
  h1Lines: string[];
  h1Accent: string;
  lede: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroMeta: { k: string; v: string }[];

  ticker: string[];

  /* Thesis */
  thesisKicker: string;
  thesisLead: string;
  thesisBody: string;

  /* Symbiosis diagram */
  symbKicker: string;
  symbTitle: string;
  symbLede: string;
  youLabel: string;
  usLabel: string;
  usSub: string;
  youSub: string;
  modes: PartnerMode[];

  /* Professions */
  whoKicker: string;
  whoTitle: string;
  whoLede: string;
  professions: PartnerProfession[];

  /* The open ledger — what each side gains */
  dealKicker: string;
  dealTitle: string;
  dealLede: string;
  yoursLabel: string;
  yours: string[];
  oursLabel: string;
  ours: string[];

  /* Steps */
  stepsKicker: string;
  stepsTitle: string;
  steps: { n: string; t: string; d: string }[];

  /* Principles */
  prinKicker: string;
  prinTitle: string;
  principles: { t: string; d: string }[];

  /* FAQ */
  faqKicker: string;
  faqTitle: string;
  faq: { q: string; a: string }[];

  /* Trust / credentials */
  trustKicker: string;
  trustTitle: string;
  trustLede: string;

  /* Cross-links: the SMM offer + direct training */
  crossTag: string;
  crossTitle: string;
  crossBody: string;
  crossCta: string;
  trainTag: string;
  trainTitle: string;
  trainBody: string;
  trainCta: string;

  /* Form */
  formKicker: string;
  formTitle: string;
  formLede: string;
  privacyLink: string;

  /* Final */
  finalKicker: string;
  finalLine1: string;
  finalLine2: string;
  finalSub: string;
  finalCta: string;
  finalAlt: string;

  stickyCta: string;
}

export const partnerLanding: Record<Lang, PartnerCopy> = {
  it: {
    title: "Programma Partner · Porta il digitale ai tuoi clienti, senza farlo tu — Alpacode",
    description:
      "Hai un portafoglio clienti che ti chiede siti e servizi digitali? Segnala, rivendi in white-label o scambia lead con noi. Il cliente resta tuo, le condizioni sono scritte. Un partner per nicchia e zona.",
    ogImage: "/og-partner.svg",

    eyebrow: "Programma partner · Un partner per nicchia e area",
    h1Lines: ["La fiducia è tua.", "Il digitale è nostro."],
    h1Accent: "Cresciamo insieme.",
    lede: "Prima o poi un tuo cliente te lo chiede: «mi fai anche il sito?». Da oggi la risposta è sì. Tu porti la relazione e la conoscenza del tuo mercato; noi progettazione, sviluppo e manutenzione. Ogni collaborazione parte da condizioni scritte e un referente dedicato.",
    ctaPrimary: "Candidati come partner",
    ctaSecondary: "Guarda come gira",
    heroMeta: [
      { k: "Modelli", v: "3" },
      { k: "Costo d'ingresso", v: "0 €" },
      { k: "Esclusiva", v: "Nicchia + area" },
      { k: "Condizioni", v: "Scritte, prima" },
    ],

    ticker: [
      "SEGNALA",
      "RIVENDI",
      "SCAMBIA",
      "WHITE-LABEL",
      "LEAD CALDI",
      "IL CLIENTE RESTA TUO",
      "ZERO COSTI FISSI",
      "UN PARTNER PER AREA",
    ],

    thesisKicker: "§ 01 — La tesi",
    thesisLead: "Il passaparola è il canale di vendita più potente del mondo. Quasi nessuno lo progetta.",
    thesisBody:
      "Chi lavora coi clienti ogni giorno — chi gestisce i loro social, i loro conti, le loro vendite — ha in mano la cosa più difficile da costruire: la fiducia. Noi abbiamo quella più difficile da improvvisare: un laboratorio che progetta siti, e-commerce e automazioni. Il programma partner collega le due cose. Con regole chiare, per iscritto.",

    symbKicker: "§ 02 — La collaborazione",
    symbTitle: "Un canale che gira in due direzioni.",
    symbLede:
      "Tre modelli. Puoi sceglierne uno, combinarli, o iniziare con un solo cliente per provare. Sotto, cosa scorre da una parte e cosa torna dall'altra.",
    youLabel: "TU",
    youSub: "la relazione",
    usLabel: "NOI",
    usSub: "il laboratorio",
    modes: [
      {
        id: "segnala",
        tab: "Segnala",
        headline: "Porti un contatto. Chiudi il cerchio.",
        blurb:
          "Un tuo cliente ha bisogno di un sito? Ce lo presenti tu. Al progetto firmato, la provvigione concordata è tua — e il cliente resta tuo.",
        flowTo: "presentazione a un tuo cliente",
        flowFrom: "provvigione concordata + il merito",
        bullets: [
          "Zero lavoro operativo: fai solo l'introduzione",
          "Provvigione definita per iscritto, prima di iniziare",
          "Il cliente continua a vedere te come riferimento",
        ],
      },
      {
        id: "rivendi",
        tab: "Rivendi",
        headline: "Vendi col tuo brand. Costruiamo noi.",
        blurb:
          "Aggiungi «siti e digitale» al tuo listino. Tu vendi al tuo prezzo, noi realizziamo dietro le quinte in white-label: il margine è tuo, la firma pure.",
        flowTo: "progetto del tuo cliente",
        flowFrom: "sito chiavi in mano, col tuo brand",
        bullets: [
          "Listino e materiali di vendita pronti all'uso",
          "White-label vero: non compariamo mai",
          "Il prezzo finale lo decidi tu, il margine è tuo",
        ],
      },
      {
        id: "scambia",
        tab: "Scambia",
        headline: "I nostri clienti cercano te. I tuoi cercano noi.",
        blurb:
          "I nostri clienti chiedono di continuo social, contenuti, contabilità, vendite. Te li presentiamo. Tu fai lo stesso con chi ti chiede il digitale. Il canale si ripaga da solo.",
        flowTo: "chi cerca il digitale",
        flowFrom: "chi cerca i tuoi servizi",
        bullets: [
          "Scambio reciproco, tracciato, alla pari",
          "Sei tu il fornitore che consigliamo nella tua nicchia",
          "Si combina con gli altri due modelli",
        ],
      },
    ],

    whoKicker: "§ 03 — Per chi è",
    whoTitle: "Stesso profilo, mestieri diversi.",
    whoLede:
      "Se hai clienti che si fidano di te, il programma funziona. Questi sono i profili con cui gira meglio.",
    professions: [
      {
        t: "Social media manager",
        d: "I tuoi clienti hanno i social e non hanno il sito. Sei il partner perfetto — e lo sai.",
      },
      {
        t: "Commercialisti & consulenti",
        d: "Ogni nuova partita IVA che apri ha bisogno di esistere online. Tu sei la prima persona che incontra.",
      },
      {
        t: "Venditori & agenti",
        d: "Giri aziende tutto il giorno. Quante hanno un digitale fermo a dieci anni fa?",
      },
      {
        t: "Fotografi & videomaker",
        d: "Il servizio è splendido — e finisce su un sito vecchio che lo mortifica. Chiudi tu il cerchio.",
      },
      {
        t: "Copywriter & marketer",
        d: "Scrivi funnel e campagne che atterrano su pagine di altri. Portale in casa.",
      },
      {
        t: "Coach & formatori",
        d: "La tua community ti chiede di continuo «chi mi fa il sito?». Ora hai la risposta.",
      },
    ],

    dealKicker: "§ 04 — Patti chiari",
    dealTitle: "Cosa ci guadagni. Cosa ci guadagniamo.",
    dealLede:
      "Una collaborazione funziona solo se conviene a tutti e due. Ecco il conto, alla luce del sole.",
    yoursLabel: "Per te",
    yours: [
      "Un servizio in più a listino, senza costi fissi",
      "Provvigioni o margine su ogni progetto chiuso",
      "Lead dai nostri clienti che cercano i tuoi servizi",
      "Un reparto tecnico on-demand, senza assumerlo",
    ],
    oursLabel: "Per noi",
    ours: [
      "Clienti che arrivano già con la tua fiducia addosso",
      "Un alleato che conosce la sua nicchia meglio di noi",
      "Il tuo sguardo sul mercato in cui lavori ogni giorno",
      "Progetti veri, invece di budget bruciati in pubblicità",
    ],

    stepsKicker: "§ 05 — Come funziona",
    stepsTitle: "Tre passi. Nero su bianco.",
    steps: [
      {
        n: "01",
        t: "Ci conosciamo",
        d: "Trenta minuti di call: ci racconti la tua nicchia, i tuoi clienti tipo e come lavori.",
      },
      {
        n: "02",
        t: "Definiamo il modello",
        d: "Segnala, rivendi, scambia — o un mix. Provvigioni e confini scritti prima di iniziare.",
      },
      {
        n: "03",
        t: "Primo cliente pilota",
        d: "Si parte con un progetto vero. Se gira, si scala. Se non gira, nessun vincolo.",
      },
    ],

    prinKicker: "§ 06 — I principi",
    prinTitle: "Le regole che rendono facile fidarsi.",
    principles: [
      {
        t: "Il cliente resta tuo",
        d: "Mai un rapporto diretto senza di te. Lo scriviamo nel patto di partnership.",
      },
      {
        t: "Condizioni scritte, prima",
        d: "Provvigioni, prezzi e confini definiti alla prima call e messi per iscritto.",
      },
      {
        t: "White-label vero",
        d: "Se rivendi, non compariamo: il sito nasce col tuo nome sopra.",
      },
      {
        t: "Zero vincoli",
        d: "Niente esclusiva obbligatoria, niente minimi, niente quote. Resti perché conviene.",
      },
    ],

    faqKicker: "§ 07 — Obiezioni",
    faqTitle: "Le domande giuste. Le risposte dritte.",
    faq: [
      {
        q: "Quanto si guadagna?",
        a: "Dipende dal modello: provvigione sulla segnalazione, margine libero sulla rivendita, scambio alla pari sui lead. I numeri esatti li definiamo insieme alla prima call e finiscono per iscritto — prima di qualunque progetto.",
      },
      {
        q: "Devo saper vendere siti web?",
        a: "No. Ti prepariamo noi: listino chiaro, materiale da mostrare, demo funzionanti. E alla call col cliente, se vuoi, ci siamo anche noi — presentati da te.",
      },
      {
        q: "E se il cliente vi contatta direttamente?",
        a: "Resta tuo. La provenienza di ogni contatto si registra e il patto la protegge: nessun rapporto diretto senza di te.",
      },
      {
        q: "Serve la partita IVA?",
        a: "Per rivendere sì. Per segnalare basta un accordo scritto: la forma giusta la troviamo insieme, in base alla tua situazione.",
      },
      {
        q: "Posso essere partner e cliente insieme?",
        a: "Certo — è la combinazione migliore. Molti partner partono dal proprio sito e poi portano i clienti: chi mostra il proprio dominio vende molto meglio il nostro lavoro.",
      },
      {
        q: "Quanti partner prendete?",
        a: "Uno per nicchia e area: non ha senso mettere in concorrenza due alleati. Se la tua è libera, è tua finché la collaborazione è attiva.",
      },
    ],

    trustKicker: "§ 08 — Credenziali",
    trustTitle: "La fiducia si costruisce coi fatti.",
    trustLede:
      "Il tuo nome finirà accanto al nostro lavoro: hai il diritto di sapere su cosa poggia. Infrastruttura, metodo e risultati verificabili.",

    crossTag: "Per i social media manager",
    crossTitle: "Prima il tuo sito, poi la tua area.",
    crossBody:
      "Sei un social media manager senza sito? C'è un'offerta pensata per te: sito personale, portfolio e media kit a 300 € l'anno, tutto incluso. Partire dal proprio dominio è il modo migliore di vendere il nostro lavoro ai tuoi clienti.",
    crossCta: "Scopri l'offerta SMM",
    trainTag: "Formazione diretta",
    trainTitle: "Vuoi anche capire come lavoriamo?",
    trainBody:
      "Alpacode è anche scuola: corsi su WordPress, sviluppo e AI, tenuti da chi li applica ogni giorno in studio. Molti partner iniziano da qui — capire il mestiere rende più facile venderlo.",
    trainCta: "Vedi i corsi",

    formKicker: "§ 09 — Candidati",
    formTitle: "Riserva la tua area.",
    formLede:
      "Raccontaci chi sei e con che clienti lavori. Ti rispondiamo entro mezza giornata lavorata — e se la tua nicchia è libera, la riserviamo per te.",
    privacyLink: "Come trattiamo i tuoi dati →",

    finalKicker: "§ 10 — Ultima cosa",
    finalLine1: "Da soli si vende.",
    finalLine2: "Insieme si cresce.",
    finalSub:
      "Trenta minuti di call. Zero costi, zero vincoli, condizioni scritte. E una nicchia che può diventare tua.",
    finalCta: "Candidati come partner",
    finalAlt: "Preferisci scriverci?",

    stickyCta: "Candidati come partner",
  },

  en: {
    title: "Partner Program · Bring digital to your clients, without building it — Alpacode",
    description:
      "Got a client portfolio asking for websites and digital services? Refer, resell white-label or swap leads with us. The client stays yours, the terms are written. One partner per niche and area.",
    ogImage: "/og-partner.svg",

    eyebrow: "Partner program · One partner per niche and area",
    h1Lines: ["The trust is yours.", "The craft is ours."],
    h1Accent: "Let's grow together.",
    lede: "Sooner or later a client asks you: “could you do my website too?”. From today the answer is yes. You bring the relationship and your knowledge of the market; we bring design, development and maintenance. Every collaboration starts from written terms and a dedicated contact.",
    ctaPrimary: "Apply as a partner",
    ctaSecondary: "See how it flows",
    heroMeta: [
      { k: "Models", v: "3" },
      { k: "Entry cost", v: "€0" },
      { k: "Exclusivity", v: "Niche + area" },
      { k: "Terms", v: "Written, first" },
    ],

    ticker: [
      "REFER",
      "RESELL",
      "SWAP",
      "WHITE-LABEL",
      "WARM LEADS",
      "THE CLIENT STAYS YOURS",
      "ZERO FIXED COSTS",
      "ONE PARTNER PER AREA",
    ],

    thesisKicker: "§ 01 — The thesis",
    thesisLead: "Word of mouth is the most powerful sales channel in the world. Almost nobody engineers it.",
    thesisBody:
      "People who work with clients every day — running their socials, their books, their sales — hold the hardest thing to build: trust. We hold the hardest thing to improvise: a studio that designs websites, e-commerce and automations. The partner program connects the two. With clear rules, in writing.",

    symbKicker: "§ 02 — The collaboration",
    symbTitle: "A channel that flows both ways.",
    symbLede:
      "Three models. Pick one, combine them, or start with a single client to test the waters. Below: what flows one way, and what comes back.",
    youLabel: "YOU",
    youSub: "the relationship",
    usLabel: "US",
    usSub: "the studio",
    modes: [
      {
        id: "segnala",
        tab: "Refer",
        headline: "You make the intro. You close the loop.",
        blurb:
          "One of your clients needs a website? You introduce us. When the project signs, the agreed commission is yours — and the client stays yours.",
        flowTo: "an intro to your client",
        flowFrom: "agreed commission + the credit",
        bullets: [
          "Zero operational work: you just make the intro",
          "Commission set in writing, before anything starts",
          "The client keeps seeing you as their reference",
        ],
      },
      {
        id: "rivendi",
        tab: "Resell",
        headline: "You sell under your brand. We build.",
        blurb:
          "Add “websites & digital” to your price list. You sell at your price, we deliver behind the scenes, white-label: the margin is yours, and so is the signature.",
        flowTo: "your client's project",
        flowFrom: "a turnkey site, under your brand",
        bullets: [
          "Ready-to-use price list and sales material",
          "True white-label: we never appear",
          "You set the final price and keep the margin",
        ],
      },
      {
        id: "scambia",
        tab: "Swap",
        headline: "Our clients need you. Yours need us.",
        blurb:
          "Our clients constantly ask for socials, content, accounting, sales. We introduce them to you. You do the same with whoever asks you for digital. The channel pays for itself.",
        flowTo: "people who need digital",
        flowFrom: "people who need your services",
        bullets: [
          "Reciprocal, tracked, even exchange",
          "You're the provider we recommend in your niche",
          "Combines with the other two models",
        ],
      },
    ],

    whoKicker: "§ 03 — Who it's for",
    whoTitle: "Same profile, different trades.",
    whoLede:
      "If you have clients who trust you, the program works. These are the profiles it runs best with.",
    professions: [
      {
        t: "Social media managers",
        d: "Your clients have socials and no website. You're the perfect partner — and you know it.",
      },
      {
        t: "Accountants & consultants",
        d: "Every new business you register needs to exist online. You're the first person it meets.",
      },
      {
        t: "Sales reps & agents",
        d: "You visit companies all day. How many have a digital presence stuck ten years ago?",
      },
      {
        t: "Photographers & videomakers",
        d: "The shoot is stunning — and it ends up on an old site that buries it. Close the loop yourself.",
      },
      {
        t: "Copywriters & marketers",
        d: "You write funnels and campaigns that land on other people's pages. Bring them home.",
      },
      {
        t: "Coaches & trainers",
        d: "Your community keeps asking “who can build my site?”. Now you have the answer.",
      },
    ],

    dealKicker: "§ 04 — Open ledger",
    dealTitle: "What you gain. What we gain.",
    dealLede: "A collaboration only works if it pays for both sides. Here's the ledger, in the open.",
    yoursLabel: "For you",
    yours: [
      "One more service on your list, zero fixed costs",
      "Commission or margin on every closed project",
      "Leads from our clients who need your services",
      "An on-demand tech department, without hiring it",
    ],
    oursLabel: "For us",
    ours: [
      "Clients who arrive carrying your trust",
      "An ally who knows their niche better than we do",
      "Your eyes on the market you work in every day",
      "Real projects, instead of budgets burned on ads",
    ],

    stepsKicker: "§ 05 — How it works",
    stepsTitle: "Three steps. In writing.",
    steps: [
      {
        n: "01",
        t: "We meet",
        d: "Thirty minutes on a call: you tell us about your niche, your typical clients, how you work.",
      },
      {
        n: "02",
        t: "We define the model",
        d: "Refer, resell, swap — or a mix. Commissions and boundaries written down before we start.",
      },
      {
        n: "03",
        t: "First pilot client",
        d: "We start with a real project. If it flows, we scale. If it doesn't, no strings.",
      },
    ],

    prinKicker: "§ 06 — The principles",
    prinTitle: "The rules that make trust easy.",
    principles: [
      {
        t: "The client stays yours",
        d: "Never a direct relationship without you. It's written into the partnership pact.",
      },
      {
        t: "Terms in writing, first",
        d: "Commissions, prices and boundaries defined on the first call and put on paper.",
      },
      {
        t: "True white-label",
        d: "If you resell, we don't appear: the site is born with your name on it.",
      },
      {
        t: "Zero lock-in",
        d: "No forced exclusivity, no minimums, no fees. You stay because it pays.",
      },
    ],

    faqKicker: "§ 07 — Objections",
    faqTitle: "The right questions. Straight answers.",
    faq: [
      {
        q: "How much do I earn?",
        a: "It depends on the model: a commission on referrals, a free margin on resales, an even swap on leads. The exact numbers are defined together on the first call and put in writing — before any project.",
      },
      {
        q: "Do I need to know how to sell websites?",
        a: "No. We prepare you: a clear price list, material to show, working demos. And on the client call, if you want, we're there too — introduced by you.",
      },
      {
        q: "What if the client contacts you directly?",
        a: "They stay yours. Every contact's origin is recorded and the pact protects it: no direct relationship without you.",
      },
      {
        q: "Do I need to be registered as a business?",
        a: "To resell, yes. To refer, a written agreement is enough: we find the right setup together, based on your situation.",
      },
      {
        q: "Can I be a partner and a client at once?",
        a: "Absolutely — it's the best combination. Many partners start with their own site and then bring clients: showing your own domain sells our work much better.",
      },
      {
        q: "How many partners do you take?",
        a: "One per niche and area: it makes no sense to pit two allies against each other. If yours is free, it's yours for as long as the collaboration is active.",
      },
    ],

    trustKicker: "§ 08 — Credentials",
    trustTitle: "Trust is built on facts.",
    trustLede:
      "Your name will sit next to our work: you have the right to know what it rests on. Infrastructure, method and verifiable results.",

    crossTag: "For social media managers",
    crossTitle: "Your site first, your area next.",
    crossBody:
      "Are you a social media manager without a website? There's an offer built for you: personal site, portfolio and media kit at €300 a year, all included. Starting from your own domain is the best way to sell our work to your clients.",
    crossCta: "See the SMM offer",
    trainTag: "Direct training",
    trainTitle: "Want to understand how we work, too?",
    trainBody:
      "Alpacode is also a school: courses on WordPress, development and AI, taught by the people who apply them in the studio every day. Many partners start here — knowing the craft makes it easier to sell.",
    trainCta: "See the courses",

    formKicker: "§ 09 — Apply",
    formTitle: "Reserve your area.",
    formLede:
      "Tell us who you are and what clients you work with. We reply within half a worked day — and if your niche is free, we reserve it for you.",
    privacyLink: "How we handle your data →",

    finalKicker: "§ 10 — One last thing",
    finalLine1: "Alone, you sell.",
    finalLine2: "Together, you grow.",
    finalSub:
      "Thirty minutes on a call. Zero costs, zero lock-in, written terms. And a niche that can become yours.",
    finalCta: "Apply as a partner",
    finalAlt: "Prefer email?",

    stickyCta: "Apply as a partner",
  },
};
