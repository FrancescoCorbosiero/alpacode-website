/* ============================================================
   SMM landing — /social-media-manager
   A bespoke, conversion-first single page for social media
   managers who don't own a website. Dark "signal magenta"
   variant of the product-page language, with an interactive
   "mirror" (type your name → see your socials AND your own
   site side by side) as the hook.

   Positioning: Alpacode as an authoritative house — studio,
   partner network and school. One clear, hard-to-refuse offer:
   agency-grade site, transparent yearly price, nothing upfront.

   Price, seats and deadline are NOT duplicated here: they come
   from the existing social-media-manager campaign entry, so
   both pages always tell the same story.
   ============================================================ */
import type { Lang } from "../i18n/types";
import { campaignBySlug, type Campaign } from "./campaigns";

/** Single source of truth for price / seats / deadline. */
export const SMM_CAMPAIGN: Campaign = campaignBySlug("social-media-manager")!;

export interface SmmNumber {
  v: string;
  l: string;
}

export interface SmmPain {
  t: string;
  d: string;
}

export interface SmmStep {
  n: string;
  t: string;
  d: string;
}

export interface SmmFaq {
  q: string;
  a: string;
}

export interface SmmPath {
  n: string;
  t: string;
  d: string;
  cta: string;
}

export interface SmmCopy {
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
  /** Mono link under the CTAs — the partner program, visible from second one. */
  heroPartnerNote: string;
  heroPartnerCta: string;
  heroCollabNote: string;
  heroCollabCta: string;
  /** Price cell in the hero scarcity band (deadline/seats labels come from COPY). */
  heroPriceK: string;
  heroPriceV: string;
  heroPriceSub: string;

  /* Ticker */
  ticker: string[];

  /* Mirror — the interactive proof */
  mirrorKicker: string;
  mirrorTitle: string;
  mirrorLede: string;
  inputLabel: string;
  inputPlaceholder: string;
  /** TLD used to build the live domain preview, e.g. ".it". */
  tld: string;
  leftTag: string;
  leftBioLabel: string;
  leftLinks: string[];
  leftFoot: string;
  rightTag: string;
  rightRole: string;
  rightNav: string[];
  rightStats: { k: string; v: string }[];
  rightTiles: string[];
  rightCta: string;
  rightFoot: string;
  mirrorCaption: string;

  /* Pains */
  painsKicker: string;
  painsTitle: string;
  painsLede: string;
  pains: SmmPain[];

  /* Rhetorical numbers */
  numbers: SmmNumber[];

  /* Offer */
  offerKicker: string;
  offerTitle: string;
  offerBlurb: string;
  /** The reason-why line that makes the price credible. */
  offerWhy: string;
  perYear: string;
  priceNote: string;
  includesLabel: string;
  includes: string[];
  offerCta: string;

  /* Express lane — direct online activation (mock checkout) */
  expressTitle: string;
  expressBody: string;
  expressCta: string;
  expressPay: string;
  expressNote: string;
  /** Label shown in the lead form when the express lane is chosen. */
  expressOfferLabel: string;

  /* Paths — client / partner / student */
  pathsKicker: string;
  pathsTitle: string;
  pathsLede: string;
  paths: SmmPath[];

  /* Steps */
  stepsKicker: string;
  stepsTitle: string;
  steps: SmmStep[];

  /* Guarantees */
  guarKicker: string;
  guarTitle: string;
  guarantees: SmmPain[];

  /* Trust / credentials */
  trustKicker: string;
  trustTitle: string;
  trustLede: string;

  /* FAQ */
  faqKicker: string;
  faqTitle: string;
  faq: SmmFaq[];

  /* Form */
  formKicker: string;
  formTitle: string;
  formLede: string;
  privacyLink: string;
  /** Label shown as the (default) chosen offer inside the lead form. */
  offerVariantLabel: string;

  /* Final CTA */
  finalKicker: string;
  finalLine1: string;
  finalLine2: string;
  finalSub: string;
  finalCta: string;
  finalAlt: string;

  stickyCta: string;
}

const price = SMM_CAMPAIGN.price;
const seats = SMM_CAMPAIGN.seats;

export const smmLanding: Record<Lang, SmmCopy> = {
  it: {
    title: `Il sito per chi gestisce i social degli altri · ${price} €/anno tutto incluso — Alpacode`,
    description: `Fai crescere i brand degli altri, ma un brand che cerca te trova un link in bio. Portfolio, media kit e contatti sul tuo dominio: ${price} € l'anno, tutto incluso. Prima vedi, poi paghi. Solo ${seats} posti.`,
    ogImage: "/og-smm.png",

    eyebrow: `Offerta lancio · Solo ${seats} posti`,
    h1Lines: ["Fai crescere", "i brand degli altri."],
    h1Accent: "E il tuo?",
    lede: `Sei tu il motivo per cui i tuoi clienti hanno una presenza online impeccabile. Poi un brand cerca te su Google — e trova un link in bio. Ti costruiamo il sito che meriti: portfolio, media kit, contatti. Tuo, a ${price} € l'anno, tutto incluso.`,
    ctaPrimary: "Voglio il mio sito",
    ctaSecondary: "Fammi vedere",
    heroPartnerNote: "Lavori già con clienti tuoi?",
    heroPartnerCta: "C'è il programma partner",
    heroCollabNote: "Preferisci lavorare nei nostri progetti?",
    heroCollabCta: "Lavora con noi",
    heroPriceK: "Prezzo bloccato",
    heroPriceV: `${price} € /anno`,
    heroPriceSub: "Tutto incluso · 0 € di anticipo",

    ticker: [
      "TUONOME.IT",
      "PORTFOLIO",
      "MEDIA KIT",
      "LINK IN BIO — MA TUO",
      "PRIMA VEDI, POI PAGHI",
      `${price} € L'ANNO`,
      "PROGRAMMA PARTNER",
      "FORMAZIONE",
      `SOLO ${seats} POSTI`,
    ],

    mirrorKicker: "§ 01 — Facciamo una prova",
    mirrorTitle: "Scrivi il tuo nome. Guarda l'insieme.",
    mirrorLede:
      "I social ti hanno costruito il pubblico; il sito lo trasforma in clienti. Non è un aut-aut: è una somma. Fai la prova con il tuo nome.",
    inputLabel: "Il tuo nome",
    inputPlaceholder: "Maria Rossi",
    tld: ".it",
    leftTag: "I tuoi social · il palco",
    leftBioLabel: "SMM · Content · Adv",
    leftLinks: [
      "I miei link",
      "Ultimo reel",
      "Collab & PR → DM",
      "Portfolio",
    ],
    leftFoot: "Qui il pubblico ti scopre.",
    rightTag: "Il tuo sito · la sede",
    rightRole: "Social Media Manager",
    rightNav: ["Portfolio", "Servizi", "Media kit", "Contatti"],
    rightStats: [
      { k: "Follower", v: "48K" },
      { k: "Eng. rate", v: "4,6%" },
      { k: "Collab", v: "30+" },
    ],
    rightTiles: ["Reel & campagne", "Contenuti UGC", "Case study"],
    rightCta: "Lavora con me",
    rightFoot: "Qui i brand ti scelgono.",
    mirrorCaption: "Lo costruiamo noi. Tu continui a postare.",

    painsKicker: "§ 02 — La verità",
    painsTitle: "Non costruire la casa su un terreno in affitto.",
    painsLede: "È la regola numero uno che ripeti ai tuoi clienti. Vale anche per te.",
    pains: [
      {
        t: "Il profilo non è tuo",
        d: "Follower, reach, visibilità: vivono su una piattaforma che non possiedi. Un cambio di algoritmo — o un ban ingiusto — e sparisci dai feed, con tutto il tuo lavoro.",
      },
      {
        t: "Un link in bio non firma contratti",
        d: "Prima di firmare un preventivo, un brand serio ti cerca su Google. Un elenco di link non è un portfolio: è un rinvio. Un sito è una stretta di mano.",
      },
      {
        t: "Il calzolaio con le scarpe rotte",
        d: "Vendi presenza digitale ogni giorno. Non averne una tua è l'unica obiezione che non dovresti mai lasciare in mano a un cliente.",
      },
    ],

    numbers: [
      {
        v: "0",
        l: "le piattaforme social che possiedi davvero. Il profilo è tuo; casa, regole e algoritmo sono loro.",
      },
      {
        v: "1",
        l: "la ricerca su Google che un brand fa prima di firmarti. Oggi, cosa trova?",
      },
      {
        v: "100%",
        l: "del tuo lavoro merita un indirizzo che nessun algoritmo può toccare.",
      },
    ],

    offerKicker: "§ 03 — L'offerta",
    offerTitle: "Un sito da agenzia. A un prezzo che le agenzie non fanno.",
    offerBlurb:
      "Un prezzo solo, deciso prima. Nessun anticipo: vedi il sito finito, poi decidi. Se non ti convince, non paghi niente.",
    offerWhy:
      "Come è possibile? Processi snelli e AI dove fa risparmiare tempo, non dove si vede. La qualità resta quella dei nostri progetti grandi; il risparmio finisce nel tuo prezzo.",
    perYear: "/anno",
    priceNote: "Rinnovo alla stessa cifra. Niente sorprese, niente costi nascosti.",
    includesLabel: "Dentro il tuo sito",
    includes: [
      "Sito personale completo: home, portfolio, servizi, contatti",
      "Pagina media kit sempre aggiornata — basta PDF da rimandare in giro",
      "Pagina «link in bio» sul tuo dominio, da incollare nel profilo",
      "Dominio tuo (nomecognome.it) ed email professionale",
      "Hosting, SSL, backup e manutenzione: ci pensiamo noi",
      "SEO di base: chi cerca il tuo nome trova te",
    ],
    offerCta: "Blocca il mio posto",

    expressTitle: "Corsia veloce",
    expressBody:
      "Hai già deciso? Attiva online e salta la call: al pagamento partiamo subito e ti contattiamo noi per i materiali.",
    expressCta: "Attiva subito",
    expressPay: "VISA · MASTERCARD · AMEX · SEPA",
    expressNote: "Pagamento sicuro · fattura inclusa",
    expressOfferLabel: "Corsia veloce — attivazione online",

    pathsKicker: "§ 04 — I percorsi",
    pathsTitle: "Un solo interlocutore. Tre modi di lavorare insieme.",
    pathsLede:
      "Alpacode non è solo il fornitore del tuo sito: è studio di sviluppo, rete di partner e scuola di formazione. Scegli il rapporto che ti serve oggi — o combinali.",
    paths: [
      {
        n: "01 · Cliente",
        t: "Il tuo sito, chiavi in mano",
        d: "Quello che vedi in questa pagina: costruiamo e manteniamo noi, tu resti sul tuo lavoro.",
        cta: "Blocca il posto",
      },
      {
        n: "02 · Partner",
        t: "Rivendi il digitale ai tuoi clienti",
        d: "Segnala o rivendi col tuo brand: costruiamo noi, il margine è tuo, il cliente resta tuo. E ti presentiamo chi cerca un social media manager.",
        cta: "Programma partner",
      },
      {
        n: "03 · Allievo",
        t: "Impara a farlo tu",
        d: "Corsi e formazione diretta su WordPress, sviluppo e AI. Insegniamo quello che facciamo ogni giorno in studio.",
        cta: "Vedi i corsi",
      },
    ],

    stepsKicker: "§ 05 — Come funziona",
    stepsTitle: "Tre passi. Zero pensieri.",
    steps: [
      {
        n: "01",
        t: "Ci scrivi",
        d: "Due minuti di modulo, qui sotto. Ti ricontatta una persona vera entro mezza giornata lavorata.",
      },
      {
        n: "02",
        t: "Costruiamo noi",
        d: "Testi, design, dominio, hosting: partiamo dai tuoi social e facciamo tutto noi. Tu continui a postare.",
      },
      {
        n: "03",
        t: "Vedi, poi paghi",
        d: "Ti mostriamo il sito finito. Ti piace? Va online. Non ti convince? Non paghi niente.",
      },
    ],

    guarKicker: "§ 06 — Senza rischi",
    guarTitle: "Perché è un sì facile.",
    guarantees: [
      {
        t: "Prima vedi, poi paghi",
        d: "Il sito lo giudichi finito, non su una promessa. Se non ti convince, zero euro.",
      },
      {
        t: "Prezzo deciso prima",
        d: `${price} € l'anno, scritto qui, davanti a tutti. Nessun preventivo a sorpresa.`,
      },
      {
        t: "Qualità da agenzia",
        d: "La stessa cura dei nostri progetti grandi, sulla stessa infrastruttura.",
      },
      {
        t: "Al resto pensiamo noi",
        d: "Dominio, hosting, email, aggiornamenti, sicurezza. Tu pensa ai contenuti.",
      },
    ],

    trustKicker: "§ 07 — Credenziali",
    trustTitle: "La fiducia si costruisce coi fatti.",
    trustLede:
      "Niente frasi a effetto: infrastruttura, metodo e risultati verificabili. Il resto lo lasciamo dire ai progetti.",

    faqKicker: "§ 08 — Obiezioni",
    faqTitle: "Le hai già pensate. Rispondiamo.",
    faq: [
      {
        q: "Ho già Linktree. Non basta?",
        a: "Linktree è un elenco di link sul dominio di qualcun altro. Il tuo sito include anche una pagina «link in bio» — ma sul tuo dominio, con portfolio, media kit e contatti a un click. Stessa comodità, tutta un'altra impressione.",
      },
      {
        q: "Non ho tempo di gestire un sito.",
        a: "Infatti non lo gestisci: lo facciamo noi. Tu ci mandi bio, lavori e contatti; noi costruiamo e manteniamo. Le piccole modifiche sono incluse nel servizio.",
      },
      {
        q: "I clienti mi trovano già su Instagram.",
        a: "E va benissimo: il sito non sostituisce i social, li capitalizza. È dove mandi chi è già interessato — case study, servizi, modulo di contatto — ed è quello che un brand trova quando ti cerca su Google.",
      },
      {
        q: "Devo pagare qualcosa in anticipo?",
        a: "No. Costruiamo il sito, te lo mostriamo finito e solo allora decidi. Se non ti piace, non paghi nulla. Se preferisci la corsia veloce, puoi attivare online e partire subito.",
      },
      {
        q: "E dopo il primo anno?",
        a: "Si rinnova alla stessa cifra, sempre tutto incluso: dominio, hosting, email, manutenzione. Niente aumenti a sorpresa: il prezzo lo conosci già adesso.",
      },
      {
        q: "Perché costa così poco?",
        a: "Perché lavoriamo in modo snello e usiamo l'AI dove fa risparmiare tempo, non dove si vede. La qualità resta da agenzia; il risparmio finisce nel prezzo.",
      },
    ],

    formKicker: "§ 09 — Candidati",
    formTitle: "Prendi il tuo posto.",
    formLede:
      "Compila il modulo: ti ricontattiamo per partire. Nessun impegno, nessun pagamento finché non vedi il sito finito.",
    privacyLink: "Come trattiamo i tuoi dati →",
    offerVariantLabel: "Sito personale — tutto incluso",

    finalKicker: "§ 10 — Ultima cosa",
    finalLine1: "Il prossimo brand",
    finalLine2: "da lanciare sei tu.",
    finalSub:
      "Trenta secondi per candidarti. Zero euro finché il sito non ti piace. E un indirizzo che finalmente è tuo.",
    finalCta: "Voglio il mio sito",
    finalAlt: "Preferisci scriverci?",

    stickyCta: "Blocca il mio posto",
  },

  en: {
    title: `The website for people who run everyone else's socials · €${price}/yr all-inclusive — Alpacode`,
    description: `You grow other people's brands, but a brand searching for you finds a link in bio. Portfolio, media kit and contacts on your own domain: €${price} a year, all included. See it first, then pay. Only ${seats} seats.`,
    ogImage: "/og-smm.png",

    eyebrow: `Launch offer · Only ${seats} seats`,
    h1Lines: ["You grow", "everyone else's brand."],
    h1Accent: "What about yours?",
    lede: `You're the reason your clients look flawless online. Then a brand googles you — and finds a link in bio. We build the site you deserve: portfolio, media kit, contacts. Yours, at €${price} a year, all included.`,
    ctaPrimary: "I want my site",
    ctaSecondary: "Show me",
    heroPartnerNote: "Already working with clients of your own?",
    heroPartnerCta: "There's a partner program",
    heroCollabNote: "Rather work inside our projects?",
    heroCollabCta: "Work with us",
    heroPriceK: "Locked price",
    heroPriceV: `€${price} /yr`,
    heroPriceSub: "All-inclusive · €0 upfront",

    ticker: [
      "YOURNAME.COM",
      "PORTFOLIO",
      "MEDIA KIT",
      "LINK IN BIO — BUT YOURS",
      "SEE IT FIRST, PAY LATER",
      `€${price} A YEAR`,
      "PARTNER PROGRAM",
      "TRAINING",
      `ONLY ${seats} SEATS`,
    ],

    mirrorKicker: "§ 01 — Try it yourself",
    mirrorTitle: "Type your name. See the whole picture.",
    mirrorLede:
      "Your socials built you an audience; a site turns it into clients. It's not either-or: it's a sum. Try it with your name.",
    inputLabel: "Your name",
    inputPlaceholder: "Jane Doe",
    tld: ".com",
    leftTag: "Your socials · the stage",
    leftBioLabel: "SMM · Content · Adv",
    leftLinks: [
      "My links",
      "Latest reel",
      "Collabs & PR → DM",
      "Portfolio",
    ],
    leftFoot: "Here, audiences discover you.",
    rightTag: "Your site · the headquarters",
    rightRole: "Social Media Manager",
    rightNav: ["Portfolio", "Services", "Media kit", "Contact"],
    rightStats: [
      { k: "Followers", v: "48K" },
      { k: "Eng. rate", v: "4.6%" },
      { k: "Collabs", v: "30+" },
    ],
    rightTiles: ["Reels & campaigns", "UGC content", "Case studies"],
    rightCta: "Work with me",
    rightFoot: "Here, brands choose you.",
    mirrorCaption: "We build it. You keep posting.",

    painsKicker: "§ 02 — The truth",
    painsTitle: "Don't build your house on rented land.",
    painsLede: "It's rule number one — the one you repeat to your clients. It applies to you too.",
    pains: [
      {
        t: "The profile isn't yours",
        d: "Followers, reach, visibility: they live on a platform you don't own. One algorithm change — or one unfair ban — and you vanish from the feeds, with all your work.",
      },
      {
        t: "A link in bio doesn't sign contracts",
        d: "Before signing a quote, a serious brand googles you. A list of links isn't a portfolio: it's a redirect. A website is a handshake.",
      },
      {
        t: "The shoemaker with broken shoes",
        d: "You sell digital presence every day. Not having your own is the one objection you should never leave in a client's hands.",
      },
    ],

    numbers: [
      {
        v: "0",
        l: "social platforms you actually own. The profile is yours; the house, the rules and the algorithm are theirs.",
      },
      {
        v: "1",
        l: "Google search — that's what a brand runs before signing you. Today, what does it find?",
      },
      {
        v: "100%",
        l: "of your work deserves an address no algorithm can touch.",
      },
    ],

    offerKicker: "§ 03 — The offer",
    offerTitle: "An agency-grade site. At a price agencies can't match.",
    offerBlurb:
      "One price, agreed up front. Nothing paid in advance: you see it finished, then you decide. If it doesn't convince you, you pay nothing.",
    offerWhy:
      "How is that possible? Lean processes and AI where it saves time, not where it shows. The quality stays that of our biggest projects; the saving ends up in your price.",
    perYear: "/yr",
    priceNote: "Renews at the same figure. No surprises, no hidden costs.",
    includesLabel: "Inside your site",
    includes: [
      "Complete personal site: home, portfolio, services, contact",
      "An always-up-to-date media kit page — no more PDFs flying around",
      "A “link in bio” page on your own domain, ready for your profile",
      "Your own domain (yourname.com) and professional email",
      "Hosting, SSL, backups and maintenance: we handle it",
      "Basic SEO: people searching your name find you",
    ],
    offerCta: "Claim my seat",

    expressTitle: "Fast lane",
    expressBody:
      "Already decided? Activate online and skip the call: we start right away and reach out for your materials.",
    expressCta: "Activate now",
    expressPay: "VISA · MASTERCARD · AMEX · SEPA",
    expressNote: "Secure payment · invoice included",
    expressOfferLabel: "Fast lane — online activation",

    pathsKicker: "§ 04 — The paths",
    pathsTitle: "One counterpart. Three ways to work together.",
    pathsLede:
      "Alpacode isn't just your site vendor: it's a development studio, a partner network and a school. Pick the relationship you need today — or combine them.",
    paths: [
      {
        n: "01 · Client",
        t: "Your site, turnkey",
        d: "What you see on this page: we build and maintain, you stay on your work.",
        cta: "Claim a seat",
      },
      {
        n: "02 · Partner",
        t: "Resell digital to your clients",
        d: "Refer or resell under your brand: we build, the margin is yours, the client stays yours. And we introduce you to people looking for a social media manager.",
        cta: "Partner program",
      },
      {
        n: "03 · Student",
        t: "Learn to do it yourself",
        d: "Courses and direct training on WordPress, development and AI. We teach what we do in the studio every day.",
        cta: "See the courses",
      },
    ],

    stepsKicker: "§ 05 — How it works",
    stepsTitle: "Three steps. Zero hassle.",
    steps: [
      {
        n: "01",
        t: "You write to us",
        d: "Two minutes on the form below. A real person gets back to you within half a worked day.",
      },
      {
        n: "02",
        t: "We build it",
        d: "Copy, design, domain, hosting: we start from your socials and do everything. You keep posting.",
      },
      {
        n: "03",
        t: "You see it, then pay",
        d: "We show you the finished site. Love it? It goes live. Not convinced? You pay nothing.",
      },
    ],

    guarKicker: "§ 06 — No risk",
    guarTitle: "Why it's an easy yes.",
    guarantees: [
      {
        t: "See it first, pay later",
        d: "You judge the finished site, not a promise. If it doesn't convince you, zero euros.",
      },
      {
        t: "Price agreed up front",
        d: `€${price} a year, written right here, in front of everyone. No surprise quotes.`,
      },
      {
        t: "Agency-grade quality",
        d: "The same care as our biggest projects, on the same infrastructure.",
      },
      {
        t: "We handle the rest",
        d: "Domain, hosting, email, updates, security. You think about the content.",
      },
    ],

    trustKicker: "§ 07 — Credentials",
    trustTitle: "Trust is built on facts.",
    trustLede:
      "No grand claims: infrastructure, method and verifiable results. We let the projects say the rest.",

    faqKicker: "§ 08 — Objections",
    faqTitle: "You've already thought them. We answer.",
    faq: [
      {
        q: "I already have Linktree. Isn't that enough?",
        a: "Linktree is a list of links on someone else's domain. Your site includes a “link in bio” page too — but on your own domain, with portfolio, media kit and contacts one click away. Same convenience, a whole different impression.",
      },
      {
        q: "I don't have time to run a website.",
        a: "Exactly — you don't run it: we do. You send us your bio, work and contacts; we build and maintain. Small changes are included in the service.",
      },
      {
        q: "Clients already find me on Instagram.",
        a: "Great: the site doesn't replace your socials, it capitalises on them. It's where you send people who are already interested — case studies, services, contact form — and what a brand finds when it googles you.",
      },
      {
        q: "Do I have to pay anything up front?",
        a: "No. We build the site, show it to you finished, and only then you decide. If you don't like it, you pay nothing. If you prefer the fast lane, you can activate online and start right away.",
      },
      {
        q: "What about after the first year?",
        a: "It renews at the same figure, still all-inclusive: domain, hosting, email, maintenance. No surprise increases: you already know the price now.",
      },
      {
        q: "Why is it so affordable?",
        a: "Because we work lean and use AI where it saves time, not where it shows. The quality stays agency-grade; the saving ends up in the price.",
      },
    ],

    formKicker: "§ 09 — Apply",
    formTitle: "Take your seat.",
    formLede:
      "Fill the form: we'll reach out to get started. No commitment, no payment until you see the finished site.",
    privacyLink: "How we handle your data →",
    offerVariantLabel: "Personal site — all-inclusive",

    finalKicker: "§ 10 — One last thing",
    finalLine1: "The next brand",
    finalLine2: "to launch is yours.",
    finalSub:
      "Thirty seconds to apply. Zero euros until you love the site. And an address that's finally yours.",
    finalCta: "I want my site",
    finalAlt: "Prefer email?",

    stickyCta: "Claim my seat",
  },
};
