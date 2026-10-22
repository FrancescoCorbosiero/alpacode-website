import type { Lang, Localized } from "../i18n/types";

/* ============================================================
   Campaigns — data-driven advertising landing pages.

   Each entry in CAMPAIGNS generates one pre-rendered landing
   page at /offerta/<slug> (IT) and /en/offerta/<slug> (EN), on
   the landing kit (components/landing/OfferLanding.astro).

   To launch a new target: add one object to CAMPAIGNS. Copy,
   price, the round and SEO all live here — no new components.

   The shared offer, stats, steps, promises and FAQ are kept in
   one place so every campaign stays consistent; only the
   audience-specific bits (hero, pains, search, price) differ.
   Copy rules: docs/landing-factory.md — say what's included
   and how it's done, never the price-reassurance tic.
   ============================================================ */

export type CampaignSlug =
  | "social-media-manager"
  | "coach-consulenti"
  | "liberi-professionisti"
  | "educatori-cinofili"
  | "olistica-yoga";

/** The two versions of the offer, shown as tabs on every page. */
export type VariantId = "all-inclusive" | "premium-extras";

export interface OfferVariant {
  id: VariantId;
  /** Short label for the tab (and the lead form's choice). */
  tab: Localized;
  /** Headline on the proposal sheet. */
  headline: Localized;
  blurb: Localized;
  /** What's included — the checklist. */
  includes: Localized[];
  /** Small line under the price. */
  priceNote: Localized;
}

export interface Campaign {
  slug: CampaignSlug;
  /** Audience name, used in headings and the lead tag. */
  audience: Localized;
  /** The handwritten kicker above the hero headline. */
  eyebrow: Localized;
  /** Yearly price in euro: site, domain, hosting, email, first-year care. */
  price: number;
  /** Seats in the round. */
  seats: number;
  /** Seats still open — EDIT THIS BY HAND as people sign up. Shown only
   *  once it's below `seats`. */
  seatsLeft: number;
  /** When the round closes (ISO, with timezone). */
  deadlineISO: string;
  hero: {
    line1: Localized;
    line2: Localized;
    lede: Localized;
    /** The pen corrects line 2: `strike` (a piece of it) is struck
     *  through and `write` (may be empty) handwritten above it. Without
     *  it, line 2 is underlined. */
    fix?: { strike: Localized; write: Localized };
  };
  /** Hero image. `id` resolves to src/assets/campaigns/<id>.<ext> when that
   *  file exists (optimized by Astro); otherwise `src` (Unsplash) is used. */
  heroImage: { id: string; src: string; alt: Localized };
  /** What their clients type into Google (the search scene). */
  search: Localized;
  /** Audience-specific reasons the offer answers: exactly three. */
  pains: { k: Localized; v: Localized }[];
  meta: { title: Localized; description: Localized };
  /** The line other landings use to point here (data/audiences.ts). */
  portal: Localized;
}

/** Build an Unsplash URL at a sensible delivery size.
 *  Hotlinked at runtime by the visitor's browser — no build dependency. */
export const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/* ---------- Shared building blocks ---------- */

/** Italy's digital gap — real, citable figures. Attribution shown; `bar`
 *  draws Italy against the EU where the source gives both. */
export const STATS: { value: string; label: Localized; source: string; bar?: { it: number; eu: number } }[] = [
  {
    value: "45,8%",
    label: {
      it: "degli italiani ha competenze digitali di base (UE: 55,5%)",
      en: "of Italians have basic digital skills (EU: 55.5%)",
    },
    source: "ISTAT 2025",
    bar: { it: 45.8, eu: 55.5 },
  },
  {
    value: "13%",
    label: {
      it: "delle PMI italiane vende online (media UE: 19,1%)",
      en: "of Italian SMEs sell online (EU average: 19.1%)",
    },
    source: "DESI 2024",
    bar: { it: 13, eu: 19.1 },
  },
  {
    value: "≈ 1 su 2",
    label: {
      it: "dei piccoli professionisti non ha un sito proprio aggiornato",
      en: "small professionals lack an up-to-date website of their own",
    },
    source: "Eurostat",
  },
];

/** The two versions, parameterised by price. */
export function offerVariants(price: number): OfferVariant[] {
  return [
    {
      id: "all-inclusive",
      tab: { it: "Il sito completo", en: "The complete site" },
      headline: {
        it: "Un sito completo, online e tuo.",
        en: "A complete site, online and yours.",
      },
      blurb: {
        it: "Progettato e scritto su misura, con tutto quello che serve per stare online: lo costruiamo, lo pubblichiamo e lo seguiamo per un anno.",
        en: "Designed and written for you, with everything it takes to be online: we build it, publish it and look after it for a year.",
      },
      includes: [
        { it: "Sito web completo, scritto e progettato su misura", en: "Complete website, written and designed for you" },
        { it: "Dominio incluso (es. nometuo.it)", en: "Domain included (e.g. yourname.com)" },
        { it: "Hosting veloce e sicuro, gestito da noi", en: "Fast, secure hosting, managed by us" },
        { it: "Caselle email professionali sul tuo dominio", en: "Professional email on your domain" },
        { it: "Manutenzione e aggiornamenti per il primo anno", en: "Maintenance and updates for the first year" },
        { it: "Certificato SSL e backup automatici", en: "SSL certificate and automatic backups" },
      ],
      priceNote: {
        it: `${price} € all'anno: sito, dominio, hosting, email e manutenzione.`,
        en: `€${price} a year: site, domain, hosting, email and maintenance.`,
      },
    },
    {
      id: "premium-extras",
      tab: { it: "Il sito + gli extra", en: "The site + extras" },
      headline: {
        it: "Lo stesso sito, con i servizi che lo fanno trovare.",
        en: "The same site, with the services that get it found.",
      },
      blurb: {
        it: "Tutto il sito completo, più i servizi di contorno che di solito si pagano a parte: compresi, per chi entra in questa tornata.",
        en: "Everything in the complete site, plus the add-on services usually billed separately: included, for those who join this round.",
      },
      includes: [
        { it: "Tutto il sito completo", en: "Everything in the complete site" },
        { it: "Ottimizzazione SEO di base per farti trovare su Google", en: "Basic SEO so people find you on Google" },
        { it: "Profilo Google Business impostato e ottimizzato", en: "Google Business profile set up and optimised" },
        { it: "Collegamento ai tuoi canali social", en: "Connected to your social channels" },
        { it: "Modulo contatti e prenotazioni integrato", en: "Integrated contact & booking form" },
        { it: "Report mensile di visite e contatti", en: "Monthly report on visits and leads" },
      ],
      priceNote: {
        it: `${price} € all'anno, con gli extra compresi.`,
        en: `€${price} a year, extras included.`,
      },
    },
  ];
}

/** From the first message to the site online. */
export const STEPS: { t: Localized; d: Localized }[] = [
  {
    t: { it: "Ci scrivi", en: "You write to us" },
    d: {
      it: "Due minuti di modulo, qui sotto. Ti ricontatta una persona entro mezza giornata lavorativa.",
      en: "A two-minute form, below. A person gets back to you within half a working day.",
    },
  },
  {
    t: { it: "Lo costruiamo", en: "We build it" },
    d: {
      it: "Testi, grafica, dominio, hosting: partiamo da quello che fai e ce ne occupiamo noi.",
      en: "Copy, design, domain, hosting: we start from what you do and take care of it.",
    },
  },
  {
    t: { it: "Lo vedi finito", en: "You see it finished" },
    d: {
      it: "Ti mostriamo il sito completo, prima di qualsiasi pagamento.",
      en: "We show you the complete site, before any payment.",
    },
  },
  {
    t: { it: "Va online", en: "It goes live" },
    d: {
      it: "Se ti convince, paghi e lo pubblichiamo. Se non ti convince, non paghi nulla.",
      en: "If it convinces you, you pay and we publish it. If not, you pay nothing.",
    },
  },
];

/** The proposal's terms — facts from the FAQ, not slogans. */
export const PROMISES: { t: Localized; d: Localized }[] = [
  {
    t: { it: "Paghi dopo averlo visto", en: "You pay after seeing it" },
    d: {
      it: "Il sito lo giudichi finito, non su una promessa. Se non ti convince, non paghi nulla.",
      en: "You judge the site finished, not on a promise. If it doesn't convince you, you pay nothing.",
    },
  },
  {
    t: { it: "Il primo anno è seguito", en: "The first year is looked after" },
    d: {
      it: "Manutenzione e aggiornamenti per tutto il primo anno sono nel prezzo.",
      en: "Maintenance and updates for the whole first year are in the price.",
    },
  },
  {
    t: { it: "Le piccole modifiche le facciamo noi", en: "We make the small changes" },
    d: {
      it: "Un orario nuovo, un servizio in più: ce lo scrivi e lo sistemiamo.",
      en: "New opening hours, one more service: you tell us and we sort it.",
    },
  },
  {
    t: { it: "Se vuoi fare da te, puoi", en: "If you'd rather do it yourself, you can" },
    d: {
      it: "Ti lasciamo gli accessi e una breve guida per gestire i contenuti.",
      en: "We hand over access and a short guide to manage the content.",
    },
  },
];

/** How it's done: a method, not a template. */
export function how(price: number) {
  return {
    kicker: { it: "come lavoriamo", en: "how we work" } as Localized,
    title: { it: "Un metodo,\nnon un template.", en: "A method,\nnot a template." } as Localized,
    lede: {
      it: `Ogni sito parte dal nostro sistema e prende la tua identità. L'AI fa il lavoro ripetitivo, le persone fanno le scelte: per questo un sito fatto bene arriva presto, e può costare ${price} € l'anno.`,
      en: `Every site starts from our system and takes on your identity. AI does the repetitive work, people make the choices: that's why a well-made site arrives quickly, and can cost €${price} a year.`,
    } as Localized,
    points: [
      {
        k: { it: "L'AI dove serve", en: "AI where it helps" },
        v: {
          it: "Strutture, varianti, controlli: li automatizziamo. Testi, scelte e verifica finale restano nostri.",
          en: "Structures, variants, checks: we automate them. Copy, choices and the final check stay ours.",
        },
      },
      {
        k: { it: "Lo stesso sistema dei progetti grandi", en: "The same system as the big projects" },
        v: {
          it: "La stessa cura e la stessa infrastruttura dei nostri lavori più impegnativi: veloce, accessibile, ben fatto.",
          en: "The same care and infrastructure as our most demanding work: fast, accessible, well made.",
        },
      },
      {
        k: { it: "Il risparmio va nel prezzo", en: "The saving goes into the price" },
        v: {
          it: "Lavorare così costa meno anche a noi: è quello che rende possibile questa cifra.",
          en: "Working this way costs us less too: that's what makes this figure possible.",
        },
      },
    ] as { k: Localized; v: Localized }[],
  };
}

export const FAQ: { q: Localized; a: Localized }[] = [
  {
    q: { it: "Devo pagare qualcosa prima?", en: "Do I pay anything up front?" },
    a: {
      it: "No. Costruiamo il sito, te lo mostriamo finito e solo allora decidi. Se non ti convince, non paghi nulla.",
      en: "No. We build the site, show it to you finished, and only then you decide. If it doesn't convince you, you pay nothing.",
    },
  },
  {
    q: { it: "Cosa comprende il prezzo?", en: "What does the price cover?" },
    a: {
      it: "Il sito completo, il dominio, l'hosting, le caselle email professionali e la manutenzione per il primo anno.",
      en: "The complete site, the domain, hosting, professional email and maintenance for the first year.",
    },
  },
  {
    q: { it: "E dal secondo anno?", en: "And from the second year?" },
    a: {
      it: "Si rinnova alla stessa cifra annuale, con gli stessi servizi. Quando saldi il secondo anno ti regaliamo i mesi che mancano fino a fine anno, così dal terzo il rinnovo cade nel mese che preferisci.",
      en: "It renews at the same yearly figure, with the same services. When you settle the second year we gift you the months left until year-end, so from the third year renewal falls in the month you prefer.",
    },
  },
  {
    q: { it: "Come fate a farlo a questo prezzo?", en: "How can you do it at this price?" },
    a: {
      it: "Con un metodo: partiamo da un sistema collaudato, usiamo l'AI per il lavoro ripetitivo e mettiamo il tempo nelle scelte. Lavorare così costa meno anche a noi, e la differenza finisce nel prezzo.",
      en: "With a method: we start from a proven system, use AI for the repetitive work and put the time into the choices. Working this way costs us less too, and the difference goes into the price.",
    },
  },
  {
    q: { it: "Posso aggiornare i contenuti?", en: "Can I update the content?" },
    a: {
      it: "Sì. Le piccole modifiche le facciamo noi, comprese nel servizio. Se preferisci gestire da solo, ti lasciamo gli accessi e una breve guida.",
      en: "Yes. We make small changes for you, included in the service. If you prefer to manage it yourself, we hand over access and a short guide.",
    },
  },
];

/** The search scene's other results — what people find instead of you. */
export const SEARCH = {
  others: [
    { k: { it: "Directory", en: "Directory" }, t: { it: "I 10 migliori in zona — recensioni", en: "The 10 best near you — reviews" } },
    { k: { it: "Social", en: "Social" }, t: { it: "Un profilo, qualche post, un link in bio", en: "A profile, a few posts, a link in bio" } },
    { k: { it: "Un concorrente", en: "A competitor" }, t: { it: "Chi ha un sito, e quindi viene scelto", en: "Someone with a site, who gets chosen" } },
  ],
  you: {
    k: { it: "tuonome.it", en: "yourname.com" },
    t: { it: "Il tuo nome — il sito ufficiale", en: "Your name — the official site" },
    hand: { it: "tu", en: "you" },
  },
  sections: {
    it: ["Chi sono", "Il metodo", "Percorsi e prezzi", "Prenota"],
    en: ["About", "The method", "Programmes and prices", "Book"],
  },
};

/** UI strings local to the campaign pages. */
export const COPY = {
  statsKicker: { it: "perché adesso", en: "why now" },
  statsTitle: {
    it: "L'Italia è ancora indietro.\nÈ un'occasione.",
    en: "Italy is still behind.\nThat's an opportunity.",
  },
  statsLede: {
    it: "Alpacode nasce per rendere l'Italia un po' più digitale, partendo da chi ci lavora ogni giorno: i professionisti.",
    en: "Alpacode exists to make Italy a little more digital, starting with the people who work in it every day: professionals.",
  },
  italy: { it: "Italia", en: "Italy" },
  eu: { it: "UE", en: "EU" },
  offerTitle: { it: "Due versioni,\nlo stesso prezzo.", en: "Two versions,\nthe same price." },
  includesLabel: { it: "Cosa ricevi", en: "What you get" },
  proposal: { it: "Proposta", en: "Proposal" },
  perYear: { it: "/anno", en: "/year" },
  stamp: { it: "Paghi solo se ti convince", en: "Pay only if it convinces you" },
  stepsTitle: { it: "Dal primo messaggio\nal sito online.", en: "From the first message\nto the site online." },
  faqTitle: { it: "Le domande\nche ci fanno.", en: "The questions\nwe get asked." },
  ctaPrimary: { it: "Voglio il mio sito", en: "I want my site" },
  ctaSecondary: { it: "Guarda l'offerta", en: "See the offer" },
  formTitle: { it: "Parliamone.", en: "Let's talk." },
  formLede: {
    it: "Compila il modulo: ti ricontattiamo per partire. Nessun impegno: paghi solo quando hai visto il sito finito.",
    en: "Fill in the form: we'll get back to you to start. No commitment: you pay only once you've seen the site finished.",
  },
  choiceLegend: { it: "La versione che ti interessa", en: "The version you're interested in" },
  /** "{n}" seats, "{date}" the round's close. */
  round: { it: "{n} posti in questa tornata · iscrizioni fino al {date}", en: "{n} seats this round · sign-ups until {date}" },
  left: { it: "ne restano {n}", en: "{n} left" },
  closed: {
    it: "Questa tornata è chiusa: scrivici e ti teniamo un posto nella prossima.",
    en: "This round is closed: write to us and we'll keep you a seat in the next one.",
  },
  portals: { it: "Non è il tuo caso? C'è anche questo", en: "Not quite you? There's this too" },
} satisfies Record<string, Localized>;

/* ---------- The campaigns ---------- */

// The round in progress: Q4 2026 (1 Oct – 31 Dec). +01:00 = CET, valid in December.
const DEADLINE = "2026-12-31T23:59:59+01:00";

export const CAMPAIGNS: Campaign[] = [
  {
    slug: "social-media-manager",
    audience: { it: "Social media manager & creator", en: "Social media managers & creators" },
    eyebrow: { it: "per chi vive di contenuti", en: "for people who live on content" },
    price: 300,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "Hai un pubblico.", en: "You have an audience." },
      line2: { it: "Ti manca una casa tua.", en: "You're missing a home of your own." },
      lede: {
        it: "Vivi sui social, ma le piattaforme non sono tue. Un sito personale è lo spazio che controlli davvero: portfolio, contatti, link, tutto in un posto solo. Lo costruiamo noi: 300 € l'anno, con dominio, hosting ed email.",
        en: "You live on social, but the platforms aren't yours. A personal site is the space you truly control: portfolio, contacts, links, all in one place. We build it: €300 a year, with domain, hosting and email.",
      },
    },
    heroImage: {
      id: "social-media-manager",
      src: unsplash("1611162617474-5b21e879e113"),
      alt: {
        it: "Creator che lavora ai propri contenuti sullo smartphone",
        en: "Creator working on their content on a smartphone",
      },
    },
    search: { it: "social media manager milano", en: "social media manager milan" },
    pains: [
      { k: { it: "Niente più «link in bio»", en: "No more “link in bio”" }, v: { it: "Un indirizzo tuo, professionale, da mettere ovunque.", en: "Your own professional address, to put everywhere." } },
      { k: { it: "Mostra il tuo lavoro", en: "Show your work" }, v: { it: "Portfolio, collaborazioni e media kit sempre aggiornati.", en: "Portfolio, collabs and media kit always up to date." } },
      { k: { it: "Fatti trovare dai brand", en: "Get found by brands" }, v: { it: "Chi ti cerca su Google trova te, non altri.", en: "People searching you on Google find you, not others." } },
    ],
    meta: {
      title: {
        it: "Sito per social media manager e creator · 300 €/anno con dominio e hosting — Alpacode",
        en: "Website for social media managers & creators · €300/yr with domain and hosting — Alpacode",
      },
      description: {
        it: "Il tuo spazio online personale, gestito da noi: sito, dominio, hosting ed email a 300 € l'anno. Lo vedi finito, poi decidi se pagare.",
        en: "Your personal online space, managed by us: site, domain, hosting and email at €300 a year. You see it finished, then decide whether to pay.",
      },
    },
    portal: { it: "Il sito per social media manager e creator.", en: "The site for social media managers and creators." },
  },
  {
    slug: "coach-consulenti",
    audience: { it: "Coach, consulenti & formatori", en: "Coaches, consultants & trainers" },
    eyebrow: { it: "per chi vende competenza", en: "for people who sell expertise" },
    price: 350,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "La tua competenza vale.", en: "Your expertise is worth it." },
      line2: { it: "Il tuo sito dovrebbe dirlo.", en: "Your website should say so." },
      lede: {
        it: "Coach, consulente, formatore: il primo colloquio oggi avviene online. Un sito curato fa la differenza tra «ci penso» e «prenoto». Lo costruiamo noi: 350 € l'anno, con dominio, hosting ed email.",
        en: "Coach, consultant, trainer: the first conversation now happens online. A polished site is the difference between “I'll think about it” and “I'll book”. We build it: €350 a year, with domain, hosting and email.",
      },
      fix: { strike: { it: "dovrebbe dirlo", en: "should say so" }, write: { it: "lo dice", en: "says so" } },
    },
    heroImage: {
      id: "coach-consulenti",
      src: unsplash("1556761175-b413da4baf72"),
      alt: {
        it: "Sessione di consulenza one-to-one in ufficio",
        en: "One-to-one consulting session in an office",
      },
    },
    search: { it: "coach professionale vicino a me", en: "business coach near me" },
    pains: [
      { k: { it: "Autorevolezza, subito", en: "Authority, instantly" }, v: { it: "Un sito serio comunica valore prima ancora di parlare.", en: "A serious site communicates value before you even speak." } },
      { k: { it: "Prenotazioni integrate", en: "Built-in booking" }, v: { it: "Calendario e modulo contatti per riempire l'agenda.", en: "Calendar and contact form to fill your agenda." } },
      { k: { it: "Racconta i risultati", en: "Tell your results" }, v: { it: "Testimonianze e casi che convincono al posto tuo.", en: "Testimonials and cases that persuade for you." } },
    ],
    meta: {
      title: {
        it: "Sito per coach e consulenti · 350 €/anno con dominio e hosting — Alpacode",
        en: "Website for coaches & consultants · €350/yr with domain and hosting — Alpacode",
      },
      description: {
        it: "Sito professionale per coach, consulenti e formatori: dominio, hosting, prenotazioni. 350 € l'anno. Lo vedi finito, poi decidi se pagare.",
        en: "Professional site for coaches, consultants and trainers: domain, hosting, booking. €350 a year. You see it finished, then decide whether to pay.",
      },
    },
    portal: { it: "Il sito per coach, consulenti e formatori.", en: "The site for coaches, consultants and trainers." },
  },
  {
    slug: "liberi-professionisti",
    audience: { it: "Liberi professionisti", en: "Licensed professionals" },
    eyebrow: { it: "per chi è iscritto a un albo", en: "for licensed professionals" },
    price: 450,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "I clienti ti cercano online.", en: "Clients look for you online." },
      line2: { it: "Ti trovano?", en: "Do they find you?" },
      lede: {
        it: "Avvocato, commercialista, architetto, psicologo: chi ha bisogno di te parte da una ricerca. Senza un sito tuo, finisci nelle mani delle directory. Ne costruiamo uno serio: 450 € l'anno, con dominio, hosting ed email.",
        en: "Lawyer, accountant, architect, psychologist: whoever needs you starts with a search. Without your own site, you end up in the hands of directories. We build a serious one: €450 a year, with domain, hosting and email.",
      },
    },
    heroImage: {
      id: "liberi-professionisti",
      src: unsplash("1521791136064-7986c2920216"),
      alt: {
        it: "Professionisti che si stringono la mano dopo un incontro",
        en: "Professionals shaking hands after a meeting",
      },
    },
    search: { it: "commercialista monza", en: "accountant monza" },
    pains: [
      { k: { it: "Presenza credibile", en: "Credible presence" }, v: { it: "Uno studio online all'altezza del tuo lavoro.", en: "An online practice worthy of your work." } },
      { k: { it: "Conforme e sicuro", en: "Compliant and secure" }, v: { it: "Privacy, cookie e dati trattati a norma.", en: "Privacy, cookies and data handled to standard." } },
      { k: { it: "Nuovi contatti", en: "New leads" }, v: { it: "Modulo riservato per richieste e primi appuntamenti.", en: "A private form for requests and first appointments." } },
    ],
    meta: {
      title: {
        it: "Sito per liberi professionisti · 450 €/anno con dominio e hosting — Alpacode",
        en: "Website for licensed professionals · €450/yr with domain and hosting — Alpacode",
      },
      description: {
        it: "Sito professionale per avvocati, commercialisti, architetti e psicologi: dominio, hosting, conformità. 450 € l'anno. Lo vedi finito, poi decidi se pagare.",
        en: "Professional site for lawyers, accountants, architects and psychologists: domain, hosting, compliance. €450 a year. You see it finished, then decide whether to pay.",
      },
    },
    portal: { it: "Il sito per chi è iscritto a un albo.", en: "The site for licensed professionals." },
  },
  {
    slug: "educatori-cinofili",
    audience: { it: "Educatori & addestratori cinofili", en: "Dog trainers & educators" },
    eyebrow: { it: "per chi lavora con i cani", en: "for people who work with dogs" },
    price: 300,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "Bravissimo sul campo.", en: "Brilliant in the field." },
      line2: { it: "Invisibile su Google.", en: "Invisible on Google." },
      lede: {
        it: "Il passaparola riempie i corsi, i social tengono vivo il gruppo. Ma chi cerca «educatore cinofilo» nella tua zona trova altri. Un sito tuo mette ordine: chi sei, il metodo, i percorsi, le recensioni e le prenotazioni — senza form di Google e link Calendly sparsi. Lo costruiamo noi: 300 € l'anno, con dominio, hosting ed email.",
        en: "Word of mouth fills your classes, socials keep the group alive. But whoever searches “dog trainer” in your area finds someone else. Your own site puts it in order: who you are, your method, programmes, reviews and bookings — no scattered Google Forms and Calendly links. We build it: €300 a year, with domain, hosting and email.",
      },
      fix: { strike: { it: "Invisibile", en: "Invisible" }, write: { it: "trovabile", en: "found" } },
    },
    heroImage: {
      id: "educatori-cinofili",
      src: unsplash("1548199973-03cce0bbc87b"),
      alt: {
        it: "Educatore cinofilo a passeggio con i cani durante una lezione",
        en: "Dog trainer walking dogs during a lesson",
      },
    },
    search: { it: "educatore cinofilo vicino a me", en: "dog trainer near me" },
    pains: [
      { k: { it: "Fatti trovare, non solo seguire", en: "Get found, not just followed" }, v: { it: "Chi ha appena preso un cucciolo parte da Google, non da Instagram. Senza sito, trova i tuoi concorrenti.", en: "New puppy owners start from Google, not Instagram. Without a site, they find your competitors." } },
      { k: { it: "Basta link sparsi", en: "No more scattered links" }, v: { it: "Form di Google, Calendly, pagine social: tutto in un unico posto, professionale e tuo.", en: "Google Forms, Calendly, social pages: everything in one place, professional and yours." } },
      { k: { it: "Percorsi chiari, clienti decisi", en: "Clear programmes, decided clients" }, v: { it: "Metodo, percorsi e prezzi spiegati bene: chi ti scrive ha già capito e scelto.", en: "Method, programmes and prices well explained: whoever writes has already understood and chosen." } },
    ],
    meta: {
      title: {
        it: "Sito per educatori cinofili · 300 €/anno con dominio e hosting — Alpacode",
        en: "Website for dog trainers · €300/yr with domain and hosting — Alpacode",
      },
      description: {
        it: "Sito professionale per educatori e addestratori cinofili: metodo, percorsi, recensioni e prenotazioni in un posto solo. 300 € l'anno. Lo vedi finito, poi decidi.",
        en: "Professional site for dog trainers and educators: method, programmes, reviews and bookings in one place. €300 a year. You see it finished, then decide.",
      },
    },
    portal: { it: "Il sito per educatori cinofili.", en: "The site for dog trainers." },
  },
  {
    slug: "olistica-yoga",
    audience: { it: "Yoga, olistica & benessere", en: "Yoga, holistic & wellness" },
    eyebrow: { it: "per chi cura corpo e mente", en: "for those who care for body and mind" },
    price: 300,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "Il tuo lavoro è unico.", en: "Your work is one of a kind." },
      line2: { it: "Online, non si vede.", en: "Online, it doesn't show." },
      lede: {
        it: "Discipline, percorsi, sensibilità: nessuno lavora come te. Ma sui social tutto scorre e tutto si somiglia. Un sito tuo dà casa e ordine a quello che fai: chi sei, le pratiche, gli orari, le prenotazioni. Lo costruiamo noi: 300 € l'anno, con dominio, hosting ed email.",
        en: "Disciplines, paths, sensibility: nobody works like you. But on social media everything scrolls by and looks the same. Your own site gives what you do a home and an order: who you are, your practices, schedules, bookings. We build it: €300 a year, with domain, hosting and email.",
      },
      fix: { strike: { it: "non", en: "doesn't" }, write: { it: "", en: "does" } },
    },
    heroImage: {
      id: "olistica-yoga",
      src: unsplash("1544367567-0f2fcb009e0b"),
      alt: {
        it: "Pratica yoga all'aperto al tramonto",
        en: "Outdoor yoga practice at sunset",
      },
    },
    search: { it: "lezioni di yoga vicino a me", en: "yoga classes near me" },
    pains: [
      { k: { it: "Uno spazio che ti somiglia", en: "A space that feels like you" }, v: { it: "Niente template freddi: un sito che rispecchia il tuo modo di lavorare e la tua energia.", en: "No cold templates: a site that mirrors how you work and your energy." } },
      { k: { it: "Le tue pratiche, in chiaro", en: "Your practices, made clear" }, v: { it: "Discipline, percorsi, orari e prezzi ordinati — non sparsi tra post e stories.", en: "Disciplines, paths, schedules and prices organised — not scattered across posts and stories." } },
      { k: { it: "Chi cerca benessere ti trova", en: "Wellness seekers find you" }, v: { it: "Su Google, col tuo nome e la tua disciplina — anche chi non ti segue ancora.", en: "On Google, by your name and your discipline — even people who don't follow you yet." } },
    ],
    meta: {
      title: {
        it: "Sito per yoga e discipline olistiche · 300 €/anno con dominio e hosting — Alpacode",
        en: "Website for yoga & holistic practitioners · €300/yr with domain and hosting — Alpacode",
      },
      description: {
        it: "Sito professionale per insegnanti di yoga e operatori olistici: pratiche, orari e prenotazioni in un posto solo, con la tua identità. 300 € l'anno. Lo vedi finito, poi decidi.",
        en: "Professional site for yoga teachers and holistic practitioners: practices, schedules and bookings in one place, with your identity. €300 a year. You see it finished, then decide.",
      },
    },
    portal: { it: "Il sito per yoga e discipline olistiche.", en: "The site for yoga and holistic practitioners." },
  },
];

export const campaignBySlug = (slug: string): Campaign | undefined =>
  CAMPAIGNS.find((c) => c.slug === slug);

/** Pick the localized variant of a `{ it, en }` record. */
export const t = <T>(v: Record<Lang, T>, lang: Lang): T => v[lang];
