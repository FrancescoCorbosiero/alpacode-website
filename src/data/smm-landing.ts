/* ============================================================
   SMM landing — /social-media-manager
   For social media managers who don't own a website: they grow
   everyone else's brand, and a brand that looks for them finds a
   link in bio. On the landing kit (components/landing/
   SmmLanding.astro), in the house's blue.

   The hook is the mirror: type your name and see your socials and
   your own site side by side, the links moving into the site.
   The audience comes from the social-media-manager
   campaign (data/campaigns.ts), so both pages tell the same story.
   Copy rules: docs/landing-factory.md.
   ============================================================ */
import type { Lang } from "../i18n/types";
import { campaignBySlug, type Campaign } from "./campaigns";
import type { Objection } from "./landing/shared";

/** The campaign this page shares its audience with. */
export const SMM_CAMPAIGN: Campaign = campaignBySlug("social-media-manager")!;

export interface SmmCopy {
  title: string;
  description: string;
  ogImage: string;
  ogAlt: string;
  hero: {
    kicker: string;
    lines: string[];
    accent: string;
    lede: string;
    cta: string;
    alt: string;
    /** The phone's feed: other people's brands. */
    me: string;
    feed: string[];
    note: string;
  };
  band: string[];
  mirror: {
    title: string;
    lede: string;
    inputLabel: string;
    inputPlaceholder: string;
    /** TLD used to build the live domain preview, e.g. ".it". */
    tld: string;
    leftTag: string;
    leftBio: string;
    leftLinks: string[];
    leftFoot: string;
    rightTag: string;
    rightRole: string;
    rightNav: string[];
    rightStats: { k: string; v: string }[];
    rightTiles: string[];
    rightCta: string;
    rightFoot: string;
    caption: string;
  };
  rent: {
    kicker: string;
    title: string;
    beats: { t: string; d: string }[];
    /** A notification per beat, on the phone. */
    notes: { app: string; text: string }[];
  };
  offer: {
    title: string;
    blurb: string;
    why: string;
    includesLabel: string;
    includes: string[];
    /** The line under the sheet's headline. */
    note: string;
    cta: string;
  };
  steps: { title: string; items: { t: string; d: string }[] };
  qa: { title: string; items: Objection[] };
  lead: {
    title: string;
    lede: string;
    company: { label: string; ph: string };
    message: { label: string; ph: string };
  };
  portalsTitle: string;
}

export const smmLanding: Record<Lang, SmmCopy> = {
  it: {
    title: "Il sito per chi gestisce i social degli altri, con dominio e hosting — Alpacode",
    description: "Fai crescere i brand degli altri, ma un brand che cerca te trova un link in bio. Portfolio, media kit e contatti sul tuo dominio. Lo vedi finito prima che vada online.",
    ogImage: "/og-smm.png",
    ogAlt: "Fai crescere i brand degli altri. E il tuo? — Alpacode",
    hero: {
      kicker: "per chi gestisce i social degli altri",
      lines: ["Fai crescere", "i brand degli altri."],
      accent: "E il tuo?",
      lede: "Sei tu il motivo per cui i tuoi clienti hanno una presenza online impeccabile. Poi un brand cerca te su Google — e trova un link in bio. Ti costruiamo il tuo sito: portfolio, media kit, contatti, sul tuo dominio, con hosting ed email.",
      cta: "Voglio il mio sito",
      alt: "Fammi vedere",
      me: "@maria.rossi",
      feed: ["@caffe.brera", "@studio.lumen", "@bottega.verde", "@fitlab.monza", "@ottica.sole", "@pane.e.rose"],
      note: "tutti, tranne te",
    },
    band: ["TUONOME.IT", "PORTFOLIO", "MEDIA KIT", "LINK IN BIO, MA TUO", "CASE STUDY"],
    mirror: {
      title: "Scrivi il tuo nome.\nGuarda l'insieme.",
      lede: "I social ti hanno costruito il pubblico; il sito lo trasforma in clienti. Non è un aut-aut: è una somma. Fai la prova con il tuo nome.",
      inputLabel: "Il tuo nome",
      inputPlaceholder: "Maria Rossi",
      tld: ".it",
      leftTag: "I tuoi social · il palco",
      leftBio: "SMM · Content · Adv",
      leftLinks: ["I miei link", "Ultimo reel", "Collab & PR → DM", "Portfolio"],
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
      caption: "Lo costruiamo noi. Tu continui a postare.",
    },
    rent: {
      kicker: "la regola che ripeti ai clienti",
      title: "Non costruire la casa\nsu un terreno in affitto.",
      beats: [
        {
          t: "Il profilo non è tuo",
          d: "Follower, reach, visibilità: vivono su una piattaforma che non possiedi. Un cambio di algoritmo — o un blocco ingiusto — e sparisci dai feed, con tutto il tuo lavoro.",
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
      notes: [
        { app: "Avviso", text: "Alcuni tuoi contenuti non vengono più mostrati a chi non ti segue." },
        { app: "Ricerca", text: "Un brand ha cercato il tuo nome. Ha trovato: un link in bio." },
        { app: "Messaggio", text: "«Ciao! Hai un sito con i tuoi lavori? Così lo giro al team.»" },
      ],
    },
    offer: {
      title: "Il tuo sito,\nchiavi in mano.",
      blurb: "Lo costruiamo partendo dai tuoi social: tu continui a postare. Lo vedi finito prima che vada online.",
      why: "Come ci riusciamo: un sistema collaudato, l'AI sul lavoro ripetitivo e la cura dei nostri progetti più grandi, sulla stessa infrastruttura.",
      includesLabel: "Dentro il tuo sito",
      includes: [
        "Sito personale completo: home, portfolio, servizi, contatti",
        "Pagina media kit sempre aggiornata — basta PDF da rimandare in giro",
        "Pagina «link in bio» sul tuo dominio, da incollare nel profilo",
        "Dominio tuo (nomecognome.it) ed email professionale",
        "Hosting, SSL, backup e manutenzione: ci pensiamo noi",
        "SEO di base: chi cerca il tuo nome trova te",
      ],
      note: "Un servizio annuale, che si rinnova con gli stessi servizi.",
      cta: "Voglio il mio sito",
    },
    steps: {
      title: "Dal modulo\nal sito online.",
      items: [
        { t: "Ci scrivi", d: "Due minuti di modulo, qui sotto. Ti ricontatta una persona entro mezza giornata lavorativa." },
        { t: "Lo costruiamo", d: "Testi, design, dominio, hosting: partiamo dai tuoi social e facciamo tutto noi. Tu continui a postare." },
        { t: "Lo vedi finito", d: "Te lo mostriamo completo: quando lo approvi, va online." },
      ],
    },
    qa: {
      title: "Le hai già pensate.\nRispondiamo.",
      items: [
        {
          q: "Ho già Linktree. Non basta?",
          a: "Linktree è un elenco di link sul dominio di qualcun altro. Il tuo sito include anche una pagina «link in bio» — ma sul tuo dominio, con portfolio, media kit e contatti a un click. Stessa comodità, tutta un'altra impressione.",
        },
        {
          q: "Non ho tempo di gestire un sito.",
          a: "Infatti non lo gestisci: lo facciamo noi. Tu ci mandi bio, lavori e contatti; noi costruiamo e manteniamo. Le piccole modifiche sono comprese nel servizio.",
        },
        {
          q: "I clienti mi trovano già su Instagram.",
          a: "E va benissimo: il sito non sostituisce i social, li capitalizza. È dove mandi chi è già interessato — case study, servizi, modulo di contatto — ed è quello che un brand trova quando ti cerca su Google.",
        },
        {
          q: "Vedo il sito prima che vada online?",
          a: "Sì. Te lo mostriamo finito, lo rivediamo insieme e va online solo quando lo approvi.",
        },
        {
          q: "E dopo il primo anno?",
          a: "Il servizio si rinnova di anno in anno, con gli stessi servizi: dominio, hosting, email, manutenzione.",
        },
      ],
    },
    lead: {
      title: "Il prossimo brand\nda lanciare sei tu.",
      lede: "Due minuti di modulo: ti ricontattiamo per capire cosa ti serve e partire.",
      company: { label: "Il tuo profilo social (facoltativo)", ph: "@iltuoprofilo" },
      message: { label: "Due righe su di te (facoltativo)", ph: "Chi segui, chi ti segue, cosa ti serve." },
    },
    portalsTitle: "Lavori già con clienti tuoi? C'è anche questo",
  },

  en: {
    title: "The website for people who run everyone else's socials, with domain and hosting — Alpacode",
    description: "You grow other people's brands, but a brand searching for you finds a link in bio. Portfolio, media kit and contacts on your own domain. You see it finished before it goes live.",
    ogImage: "/og-smm.png",
    ogAlt: "You grow everyone else's brand. What about yours? — Alpacode",
    hero: {
      kicker: "for people who run other people's socials",
      lines: ["You grow", "everyone else's brand."],
      accent: "What about yours?",
      lede: "You're the reason your clients look flawless online. Then a brand googles you — and finds a link in bio. We build your site: portfolio, media kit, contacts, on your own domain, with hosting and email.",
      cta: "I want my site",
      alt: "Show me",
      me: "@jane.doe",
      feed: ["@brera.coffee", "@studio.lumen", "@green.workshop", "@fitlab.monza", "@sun.optics", "@bread.and.roses"],
      note: "everyone but you",
    },
    band: ["YOURNAME.COM", "PORTFOLIO", "MEDIA KIT", "LINK IN BIO, BUT YOURS", "CASE STUDIES"],
    mirror: {
      title: "Type your name.\nSee the whole picture.",
      lede: "Your socials built you an audience; a site turns it into clients. It's not either-or: it's a sum. Try it with your name.",
      inputLabel: "Your name",
      inputPlaceholder: "Jane Doe",
      tld: ".com",
      leftTag: "Your socials · the stage",
      leftBio: "SMM · Content · Adv",
      leftLinks: ["My links", "Latest reel", "Collabs & PR → DM", "Portfolio"],
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
      caption: "We build it. You keep posting.",
    },
    rent: {
      kicker: "the rule you repeat to your clients",
      title: "Don't build your house\non rented land.",
      beats: [
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
      notes: [
        { app: "Notice", text: "Some of your content is no longer shown to people who don't follow you." },
        { app: "Search", text: "A brand searched your name. It found: a link in bio." },
        { app: "Message", text: "“Hi! Do you have a site with your work? I'd send it to the team.”" },
      ],
    },
    offer: {
      title: "Your site,\nturnkey.",
      blurb: "We build it starting from your socials: you keep posting. You see it finished before it goes live.",
      why: "How we manage it: a proven system, AI on the repetitive work, and the care of our biggest projects, on the same infrastructure.",
      includesLabel: "Inside your site",
      includes: [
        "Complete personal site: home, portfolio, services, contact",
        "An always-up-to-date media kit page — no more PDFs flying around",
        "A “link in bio” page on your own domain, ready for your profile",
        "Your own domain (yourname.com) and professional email",
        "Hosting, SSL, backups and maintenance: we handle it",
        "Basic SEO: people searching your name find you",
      ],
      note: "A yearly service, renewed with the same services.",
      cta: "I want my site",
    },
    steps: {
      title: "From the form\nto the site online.",
      items: [
        { t: "You write to us", d: "A two-minute form, below. A person gets back to you within half a working day." },
        { t: "We build it", d: "Copy, design, domain, hosting: we start from your socials and do it all. You keep posting." },
        { t: "You see it finished", d: "We show it to you complete: once you approve it, it goes live." },
      ],
    },
    qa: {
      title: "You've already thought\nof these. Here's our answer.",
      items: [
        {
          q: "I already have Linktree. Isn't that enough?",
          a: "Linktree is a list of links on someone else's domain. Your site includes a “link in bio” page too — but on your own domain, with portfolio, media kit and contacts one click away. Same convenience, a whole other impression.",
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
          q: "Do I see the site before it goes live?",
          a: "Yes. We show it to you finished, go through it together, and it goes live only once you approve it.",
        },
        {
          q: "What about after the first year?",
          a: "The service renews year by year, with the same services: domain, hosting, email, maintenance.",
        },
      ],
    },
    lead: {
      title: "The next brand\nto launch is you.",
      lede: "A two-minute form: we'll get back to you to work out what you need and get started.",
      company: { label: "Your social handle (optional)", ph: "@yourhandle" },
      message: { label: "A couple of lines about you (optional)", ph: "What you do, what you need." },
    },
    portalsTitle: "Already working with clients of your own? There's this too",
  },
};
