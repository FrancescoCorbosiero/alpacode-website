import type { Lang, Localized } from "../i18n/types";

/* ============================================================
   Campaigns — data-driven advertising landing pages.

   Each entry in CAMPAIGNS generates one pre-rendered landing
   page at /offerta/<slug> (IT) and /en/offerta/<slug> (EN).

   To launch a new target: add one object to CAMPAIGNS. Copy,
   price, scarcity and SEO all live here — no new components.

   The shared offer, stats, steps, guarantees and FAQ are kept
   in SHARED so every campaign stays consistent; only the
   audience-specific bits (hero, pains, price, seats) differ.
   ============================================================ */

export type CampaignSlug =
  | "social-media-manager"
  | "coach-consulenti"
  | "liberi-professionisti"
  | "educatori-cinofili"
  | "olistica-yoga";

/** The two offer strategies, shown as a toggle on every page. */
export type VariantId = "all-inclusive" | "premium-extras";

export interface OfferVariant {
  id: VariantId;
  /** Short label for the toggle control. */
  tab: Localized;
  /** Headline shown when this variant is active. */
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
  /** Mono kicker above the hero headline. */
  eyebrow: Localized;
  /** Yearly, all-inclusive price in euro. */
  price: number;
  /** Total seats in the cohort (for the scarcity badge). */
  seats: number;
  /** Seats still open — EDIT THIS BY HAND as people sign up. */
  seatsLeft: number;
  /** Offer deadline (ISO, with timezone). Drives the countdown. */
  deadlineISO: string;
  hero: { line1: Localized; line2: Localized; lede: Localized };
  /** Hero image. `id` resolves to src/assets/campaigns/<id>.<ext> when that
   *  file exists (optimized by Astro); otherwise `src` (Unsplash) is used. */
  heroImage: { id: string; src: string; alt: Localized };
  /** Audience-specific reasons / pains the offer answers. */
  pains: { k: Localized; v: Localized }[];
  meta: { title: Localized; description: Localized };
}

/** Build an Unsplash URL at a sensible delivery size.
 *  Hotlinked at runtime by the visitor's browser — no build dependency. */
export const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/** Shared image for the AI section.
 *  Local override: drop src/assets/campaigns/ai.<ext> to replace the hotlink. */
export const AI_IMAGE = {
  id: "ai",
  src: unsplash("1677442136019-21780ecad995", 900),
  alt: {
    it: "Intelligenza artificiale al lavoro: tecnologia che rende il digitale accessibile",
    en: "Artificial intelligence at work: technology making digital accessible",
  } as Localized,
};

/* ---------- Shared building blocks ---------- */

/** Italy's digital gap — real, citable figures. Attribution shown. */
export const STATS: { value: string; label: Localized; source: string }[] = [
  {
    value: "45,8%",
    label: {
      it: "degli italiani ha competenze digitali di base (UE: 55,5%)",
      en: "of Italians have basic digital skills (EU: 55.5%)",
    },
    source: "ISTAT 2025",
  },
  {
    value: "13%",
    label: {
      it: "delle PMI italiane vende online (media UE: 19,1%)",
      en: "of Italian SMEs sell online (EU average: 19.1%)",
    },
    source: "DESI 2024",
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

/** The two strategies, parameterised by price. */
export function offerVariants(price: number): OfferVariant[] {
  return [
    {
      id: "all-inclusive",
      tab: { it: "Prezzo tutto incluso", en: "All-inclusive price" },
      headline: {
        it: "Un sito completo, online e tuo. Tutto incluso.",
        en: "A complete website, online and yours. All included.",
      },
      blurb: {
        it: "Un prezzo solo, deciso prima. Niente costi a sorpresa, niente abbonamenti nascosti.",
        en: "One price, agreed up front. No surprise costs, no hidden subscriptions.",
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
        it: `${price} € all'anno — tutto compreso, niente altro da pagare.`,
        en: `€${price} per year — everything included, nothing else to pay.`,
      },
    },
    {
      id: "premium-extras",
      tab: { it: "Stesso prezzo + extra premium", en: "Same price + premium extras" },
      headline: {
        it: "Lo stesso prezzo, con i servizi premium in regalo.",
        en: "The same price, with premium services on the house.",
      },
      blurb: {
        it: "Tutto quello del pacchetto base, più i servizi di contorno che di solito si pagano a parte. Gratis, per chi entra ora.",
        en: "Everything in the base package, plus the add-on services usually billed separately. Free, for those who join now.",
      },
      includes: [
        { it: "Tutto il pacchetto «tutto incluso»", en: "Everything in the all-inclusive package" },
        { it: "Ottimizzazione SEO di base per farti trovare su Google", en: "Basic SEO so people find you on Google" },
        { it: "Profilo Google Business impostato e ottimizzato", en: "Google Business profile set up and optimised" },
        { it: "Collegamento ai tuoi canali social", en: "Connected to your social channels" },
        { it: "Modulo contatti e prenotazioni integrato", en: "Integrated contact & booking form" },
        { it: "Report mensile di visite e contatti", en: "Monthly report on visits and leads" },
      ],
      priceNote: {
        it: `${price} € all'anno — stesso prezzo, extra inclusi senza sovrapprezzo.`,
        en: `€${price} per year — same price, extras at no surcharge.`,
      },
    },
  ];
}

/** How the offer works, in plain language. */
export const STEPS: { n: string; t: Localized; d: Localized }[] = [
  {
    n: "01",
    t: { it: "Ci scrivi", en: "You write to us" },
    d: {
      it: "Compili il modulo qui sotto. Ti ricontattiamo entro mezza giornata lavorata, da persona vera.",
      en: "You fill the form below. We get back within half a worked day, from a real person.",
    },
  },
  {
    n: "02",
    t: { it: "Costruiamo il sito", en: "We build the site" },
    d: {
      it: "Pensiamo a tutto noi: testi, grafica, dominio, hosting. Tu continui a lavorare.",
      en: "We handle everything: copy, design, domain, hosting. You keep working.",
    },
  },
  {
    n: "03",
    t: { it: "Vedi, poi paghi", en: "You see it, then pay" },
    d: {
      it: "Ti mostriamo il sito finito. Se ti piace, paghi e va online. Se non ti piace, non paghi nulla.",
      en: "We show you the finished site. If you like it, you pay and it goes live. If not, you pay nothing.",
    },
  },
];

/** Risk-reversal points, straight from the offer concepts. */
export const GUARANTEES: { t: Localized; d: Localized }[] = [
  {
    t: { it: "Prima vedi, poi paghi", en: "See it first, pay later" },
    d: {
      it: "Ti mostriamo il sito completo prima di qualsiasi pagamento. Se non ti convince, non paghi niente.",
      en: "We show you the complete site before any payment. If you're not convinced, you pay nothing.",
    },
  },
  {
    t: { it: "Prezzo deciso prima", en: "Price agreed up front" },
    d: {
      it: "Un numero solo, scritto chiaro. Niente preventivi da capogiro, niente sorprese in fattura.",
      en: "One clear number. No sky-high quotes, no surprises on the invoice.",
    },
  },
  {
    t: { it: "Qualità da agency", en: "Agency-grade quality" },
    d: {
      it: "Stessa cura di un'agenzia, a un prezzo pensato per la realtà dei professionisti italiani.",
      en: "The care of an agency, at a price built for Italian professionals' reality.",
    },
  },
  {
    t: { it: "Al resto pensiamo noi", en: "We handle the rest" },
    d: {
      it: "Dominio, hosting, email, aggiornamenti, sicurezza. Tu ti concentri sul tuo lavoro.",
      en: "Domain, hosting, email, updates, security. You focus on your work.",
    },
  },
];

/** The AI section — why quality no longer costs thousands. */
export const AI = {
  kicker: { it: "Come è possibile", en: "How it's possible" },
  title: {
    it: "L'AI ha cambiato le regole. Il prezzo, di conseguenza.",
    en: "AI changed the rules. So did the price.",
  },
  lede: {
    it: "L'intelligenza artificiale ha rivoluzionato il web e il mondo digitale: per un lavoro di qualità non servono più migliaia di euro. Noi usiamo l'AI per tenere alta la qualità e contenere il prezzo finale — così molte più figure possono finalmente avere il proprio spazio digitale.",
    en: "AI has transformed the web and the digital world: quality work no longer costs thousands. We use AI to keep quality high and the final price low — so many more people can finally have their own digital space.",
  },
  points: [
    {
      k: { it: "Qualità, non scorciatoie", en: "Quality, not shortcuts" },
      v: {
        it: "L'AI accelera il lavoro ripetitivo. Le scelte, la cura e il controllo finale restano umani.",
        en: "AI speeds up the repetitive work. The decisions, the care and the final check stay human.",
      },
    },
    {
      k: { it: "Meno costi, meno prezzo", en: "Lower cost, lower price" },
      v: {
        it: "Lavorando in modo più efficiente, abbattiamo i costi. E quel risparmio finisce nel tuo prezzo.",
        en: "By working more efficiently, we cut costs. And that saving ends up in your price.",
      },
    },
    {
      k: { it: "Il digitale per tutti", en: "Digital for everyone" },
      v: {
        it: "Un sito di qualità non è più un lusso da grandi budget: ora è alla portata di ogni professionista.",
        en: "A quality website is no longer a big-budget luxury: now it's within reach of every professional.",
      },
    },
  ],
} satisfies { kicker: Localized; title: Localized; lede: Localized; points: { k: Localized; v: Localized }[] };

export const FAQ: { q: Localized; a: Localized }[] = [
  {
    q: { it: "Devo pagare qualcosa in anticipo?", en: "Do I have to pay anything up front?" },
    a: {
      it: "No. Costruiamo il sito, te lo mostriamo finito e solo allora decidi. Se non ti piace, non paghi nulla. In alcuni casi il primo anno è addirittura gratuito.",
      en: "No. We build the site, show it to you finished, and only then you decide. If you don't like it, you pay nothing. In some cases the first year is even free.",
    },
  },
  {
    q: { it: "Cosa comprende esattamente il prezzo?", en: "What exactly does the price cover?" },
    a: {
      it: "Sito completo, dominio, hosting, email professionali e manutenzione per il primo anno. Niente costi nascosti: il prezzo che vedi è tutto quello che paghi.",
      en: "Complete site, domain, hosting, professional email and first-year maintenance. No hidden costs: the price you see is all you pay.",
    },
  },
  {
    q: { it: "E gli anni successivi?", en: "What about the following years?" },
    a: {
      it: "Dal secondo anno si rinnova alla stessa cifra annuale, sempre tutto incluso. Quando saldi il secondo anno ti regaliamo i mesi che mancano fino a fine anno, così dal terzo il rinnovo cade nel mese che preferisci.",
      en: "From the second year it renews at the same yearly figure, still all-inclusive. When you settle the second year we gift you the months left until year-end, so from the third year renewal falls in the month you prefer.",
    },
  },
  {
    q: { it: "Perché così conveniente?", en: "Why so affordable?" },
    a: {
      it: "Perché sfruttiamo l'AI e lavoriamo in modo snello: l'intelligenza artificiale ha abbattuto i costi del lavoro digitale di qualità. Quel risparmio lo giriamo a te. La qualità resta da agency; il prezzo è pensato per la situazione economica dei professionisti italiani.",
      en: "Because we leverage AI and work lean: artificial intelligence has cut the cost of quality digital work. We pass that saving on to you. The quality stays agency-grade; the price is built for Italian professionals' economic reality.",
    },
  },
  {
    q: { it: "Posso aggiornare i contenuti?", en: "Can I update the content?" },
    a: {
      it: "Sì. Piccole modifiche le facciamo noi, comprese nel servizio. Se preferisci gestire da solo, ti lasciamo gli accessi e una breve guida.",
      en: "Yes. We make small changes for you, included in the service. If you prefer to manage it yourself, we hand over access and a short guide.",
    },
  },
];

/** UI strings local to the campaign pages. */
export const COPY = {
  statsKicker: { it: "Perché adesso", en: "Why now" },
  statsTitle: {
    it: "L'Italia è ancora indietro. È un'occasione.",
    en: "Italy is still behind. That's an opportunity.",
  },
  statsLede: {
    it: "Alpacode nasce per rendere l'Italia un po' più digitale, partendo da chi ci lavora ogni giorno: i professionisti.",
    en: "Alpacode exists to make Italy a little more digital, starting with the people who work in it every day: professionals.",
  },
  offerKicker: { it: "L'offerta", en: "The offer" },
  offerTitle: { it: "Due modi di entrare. Tu scegli.", en: "Two ways in. You choose." },
  includesLabel: { it: "Cosa ricevi", en: "What you get" },
  stepsKicker: { it: "Come funziona", en: "How it works" },
  stepsTitle: { it: "Semplice, in tre passi.", en: "Simple, in three steps." },
  guaranteesKicker: { it: "Senza rischi", en: "No risk" },
  guaranteesTitle: { it: "Perché puoi fidarti.", en: "Why you can trust it." },
  faqKicker: { it: "Domande", en: "Questions" },
  faqTitle: { it: "Le risposte rapide.", en: "Quick answers." },
  seatsLabel: { it: "Posti rimasti", en: "Seats left" },
  ofLabel: { it: "su", en: "of" },
  deadlineLabel: { it: "L'offerta si chiude tra", en: "Offer closes in" },
  countdown: {
    days: { it: "giorni", en: "days" },
    hours: { it: "ore", en: "hours" },
    minutes: { it: "min", en: "min" },
    seconds: { it: "sec", en: "sec" },
  },
  closed: { it: "Iscrizioni chiuse per questa tornata", en: "Sign-ups closed for this round" },
  ctaPrimary: { it: "Blocca il mio posto", en: "Claim my seat" },
  ctaSecondary: { it: "Porta il tuo business online", en: "Bring your business online" },
  formKicker: { it: "Candidati", en: "Apply" },
  formTitle: { it: "Prendi il tuo posto.", en: "Take your seat." },
  formLede: {
    it: "Compila il modulo: ti ricontattiamo per partire. Nessun impegno, nessun pagamento finché non vedi il sito.",
    en: "Fill the form: we'll reach out to get started. No commitment, no payment until you see the site.",
  },
  chosenOffer: { it: "Offerta scelta", en: "Chosen offer" },
} satisfies Record<string, Localized | Record<string, Localized>>;

/* ---------- The campaigns ---------- */

// End of Q3 2026 (Q3 = 1 Jul – 30 Sep). +02:00 = CEST, valid in September.
const DEADLINE = "2026-09-30T23:59:59+02:00";

export const CAMPAIGNS: Campaign[] = [
  {
    slug: "social-media-manager",
    audience: { it: "Social media manager & creator", en: "Social media managers & creators" },
    eyebrow: { it: "Per chi vive di contenuti", en: "For people who live on content" },
    price: 300,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "Hai un pubblico.", en: "You have an audience." },
      line2: { it: "Ti manca una casa tua.", en: "You're missing a home of your own." },
      lede: {
        it: "Vivi sui social, ma le piattaforme non sono tue. Un sito personale è lo spazio che controlli davvero: portfolio, contatti, link, tutto in un posto solo. Lo costruiamo noi, a 300 € l'anno, tutto incluso.",
        en: "You live on social, but the platforms aren't yours. A personal site is the space you truly control: portfolio, contacts, links, all in one place. We build it for you, at €300 a year, all included.",
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
    pains: [
      { k: { it: "Niente più «link in bio»", en: "No more “link in bio”" }, v: { it: "Un indirizzo tuo, professionale, da mettere ovunque.", en: "Your own professional address, to put everywhere." } },
      { k: { it: "Mostra il tuo lavoro", en: "Show your work" }, v: { it: "Portfolio, collaborazioni e media kit sempre aggiornati.", en: "Portfolio, collabs and media kit always up to date." } },
      { k: { it: "Fatti trovare dai brand", en: "Get found by brands" }, v: { it: "Chi ti cerca su Google trova te, non altri.", en: "People searching you on Google find you, not others." } },
    ],
    meta: {
      title: {
        it: "Sito per social media manager e creator · 300 €/anno tutto incluso — Alpacode",
        en: "Website for social media managers & creators · €300/yr all-inclusive — Alpacode",
      },
      description: {
        it: "Il tuo spazio online personale, gestito da noi: sito, dominio, hosting. 300 € l'anno, tutto incluso. Vedi il sito, poi paghi. Solo 30 posti.",
        en: "Your personal online space, managed by us: site, domain, hosting. €300 a year, all included. See it first, then pay. Only 30 seats.",
      },
    },
  },
  {
    slug: "coach-consulenti",
    audience: { it: "Coach, consulenti & formatori", en: "Coaches, consultants & trainers" },
    eyebrow: { it: "Per chi vende competenza", en: "For people who sell expertise" },
    price: 350,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "La tua competenza vale.", en: "Your expertise is worth it." },
      line2: { it: "Il tuo sito dovrebbe dirlo.", en: "Your website should say so." },
      lede: {
        it: "Coach, consulente, formatore: il primo colloquio oggi avviene online. Un sito curato fa la differenza tra «ci penso» e «prenoto». Lo costruiamo noi, a 350 € l'anno, tutto incluso.",
        en: "Coach, consultant, trainer: the first conversation now happens online. A polished site is the difference between “I'll think about it” and “I'll book”. We build it for you, at €350 a year, all included.",
      },
    },
    heroImage: {
      id: "coach-consulenti",
      src: unsplash("1556761175-b413da4baf72"),
      alt: {
        it: "Sessione di consulenza one-to-one in ufficio",
        en: "One-to-one consulting session in an office",
      },
    },
    pains: [
      { k: { it: "Autorevolezza, subito", en: "Authority, instantly" }, v: { it: "Un sito serio comunica valore prima ancora di parlare.", en: "A serious site communicates value before you even speak." } },
      { k: { it: "Prenotazioni integrate", en: "Built-in booking" }, v: { it: "Calendario e modulo contatti per riempire l'agenda.", en: "Calendar and contact form to fill your agenda." } },
      { k: { it: "Racconta i risultati", en: "Tell your results" }, v: { it: "Testimonianze e casi che convincono al posto tuo.", en: "Testimonials and cases that persuade for you." } },
    ],
    meta: {
      title: {
        it: "Sito per coach e consulenti · 350 €/anno tutto incluso — Alpacode",
        en: "Website for coaches & consultants · €350/yr all-inclusive — Alpacode",
      },
      description: {
        it: "Sito professionale per coach, consulenti e formatori: dominio, hosting, prenotazioni. 350 € l'anno, tutto incluso. Prima vedi, poi paghi. Solo 30 posti.",
        en: "Professional site for coaches, consultants and trainers: domain, hosting, booking. €350 a year, all included. See it first, then pay. Only 30 seats.",
      },
    },
  },
  {
    slug: "liberi-professionisti",
    audience: { it: "Liberi professionisti", en: "Licensed professionals" },
    eyebrow: { it: "Per chi è iscritto a un albo", en: "For licensed professionals" },
    price: 450,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "I clienti ti cercano online.", en: "Clients look for you online." },
      line2: { it: "Ti trovano?", en: "Do they find you?" },
      lede: {
        it: "Avvocato, commercialista, architetto, psicologo: chi ha bisogno di te parte da una ricerca. Senza un sito tuo, finisci nelle mani delle directory. Ne costruiamo uno serio, a 450 € l'anno, tutto incluso.",
        en: "Lawyer, accountant, architect, psychologist: whoever needs you starts with a search. Without your own site, you end up in the hands of directories. We build a serious one, at €450 a year, all included.",
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
    pains: [
      { k: { it: "Presenza credibile", en: "Credible presence" }, v: { it: "Uno studio online all'altezza del tuo lavoro.", en: "An online practice worthy of your work." } },
      { k: { it: "Conforme e sicuro", en: "Compliant and secure" }, v: { it: "Privacy, cookie e dati trattati a norma.", en: "Privacy, cookies and data handled to standard." } },
      { k: { it: "Nuovi contatti", en: "New leads" }, v: { it: "Modulo riservato per richieste e primi appuntamenti.", en: "A private form for requests and first appointments." } },
    ],
    meta: {
      title: {
        it: "Sito per liberi professionisti · 450 €/anno tutto incluso — Alpacode",
        en: "Website for licensed professionals · €450/yr all-inclusive — Alpacode",
      },
      description: {
        it: "Sito professionale per avvocati, commercialisti, architetti e psicologi: dominio, hosting, conformità. 450 € l'anno, tutto incluso. Prima vedi, poi paghi. Solo 30 posti.",
        en: "Professional site for lawyers, accountants, architects and psychologists: domain, hosting, compliance. €450 a year, all included. See it first, then pay. Only 30 seats.",
      },
    },
  },
  {
    slug: "educatori-cinofili",
    audience: { it: "Educatori & addestratori cinofili", en: "Dog trainers & educators" },
    eyebrow: { it: "Per chi lavora con i cani", en: "For people who work with dogs" },
    price: 300,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "Bravissimo sul campo.", en: "Brilliant in the field." },
      line2: { it: "Invisibile su Google.", en: "Invisible on Google." },
      lede: {
        it: "Il passaparola riempie i corsi, i social tengono vivo il gruppo. Ma chi cerca «educatore cinofilo» nella tua zona trova altri. Un sito tuo mette ordine: chi sei, il metodo, i percorsi, le recensioni e le prenotazioni — senza form di Google e link Calendly sparsi. Lo costruiamo noi, a 300 € l'anno, tutto incluso.",
        en: "Word of mouth fills your classes, socials keep the group alive. But whoever searches “dog trainer” in your area finds someone else. Your own site puts it in order: who you are, your method, programs, reviews and bookings — no scattered Google Forms and Calendly links. We build it for you, at €300 a year, all included.",
      },
    },
    heroImage: {
      id: "educatori-cinofili",
      src: unsplash("1548199973-03cce0bbc87b"),
      alt: {
        it: "Educatore cinofilo a passeggio con i cani durante una lezione",
        en: "Dog trainer walking dogs during a lesson",
      },
    },
    pains: [
      { k: { it: "Fatti trovare, non solo seguire", en: "Get found, not just followed" }, v: { it: "Chi ha appena preso un cucciolo parte da Google, non da Instagram. Senza sito, trova i tuoi concorrenti.", en: "New puppy owners start from Google, not Instagram. Without a site, they find your competitors." } },
      { k: { it: "Basta link sparsi", en: "No more scattered links" }, v: { it: "Form di Google, Calendly, pagine social: tutto in un unico posto, professionale e tuo.", en: "Google Forms, Calendly, social pages: everything in one place, professional and yours." } },
      { k: { it: "Percorsi chiari, clienti decisi", en: "Clear programs, decided clients" }, v: { it: "Metodo, percorsi e prezzi spiegati bene: chi ti scrive ha già capito e scelto.", en: "Method, programs and prices well explained: whoever writes has already understood and chosen." } },
    ],
    meta: {
      title: {
        it: "Sito per educatori cinofili · 300 €/anno tutto incluso — Alpacode",
        en: "Website for dog trainers · €300/yr all-inclusive — Alpacode",
      },
      description: {
        it: "Sito professionale per educatori e addestratori cinofili: metodo, percorsi, recensioni e prenotazioni in un posto solo. 300 € l'anno, tutto incluso. Prima vedi, poi paghi. Solo 30 posti.",
        en: "Professional site for dog trainers and educators: method, programs, reviews and bookings in one place. €300 a year, all included. See it first, then pay. Only 30 seats.",
      },
    },
  },
  {
    slug: "olistica-yoga",
    audience: { it: "Yoga, olistica & benessere", en: "Yoga, holistic & wellness" },
    eyebrow: { it: "Per chi cura corpo e mente", en: "For those who care for body and mind" },
    price: 300,
    seats: 30,
    seatsLeft: 30,
    deadlineISO: DEADLINE,
    hero: {
      line1: { it: "Il tuo lavoro è unico.", en: "Your work is one of a kind." },
      line2: { it: "Online, non si vede.", en: "Online, it doesn't show." },
      lede: {
        it: "Discipline, percorsi, sensibilità: nessuno lavora come te. Ma sui social tutto scorre e tutto si somiglia. Un sito tuo dà casa e ordine a quello che fai: chi sei, le pratiche, gli orari, le prenotazioni. Lo costruiamo noi, a 300 € l'anno, tutto incluso.",
        en: "Disciplines, paths, sensibility: nobody works like you. But on social media everything scrolls by and looks the same. Your own site gives what you do a home and an order: who you are, your practices, schedules, bookings. We build it for you, at €300 a year, all included.",
      },
    },
    heroImage: {
      id: "olistica-yoga",
      src: unsplash("1544367567-0f2fcb009e0b"),
      alt: {
        it: "Pratica yoga all'aperto al tramonto",
        en: "Outdoor yoga practice at sunset",
      },
    },
    pains: [
      { k: { it: "Uno spazio che ti somiglia", en: "A space that feels like you" }, v: { it: "Niente template freddi: un sito che rispecchia il tuo modo di lavorare e la tua energia.", en: "No cold templates: a site that mirrors how you work and your energy." } },
      { k: { it: "Le tue pratiche, in chiaro", en: "Your practices, made clear" }, v: { it: "Discipline, percorsi, orari e prezzi ordinati — non sparsi tra post e stories.", en: "Disciplines, paths, schedules and prices organised — not scattered across posts and stories." } },
      { k: { it: "Chi cerca benessere ti trova", en: "Wellness seekers find you" }, v: { it: "Su Google, col tuo nome e la tua disciplina — anche chi non ti segue ancora.", en: "On Google, by your name and your discipline — even people who don't follow you yet." } },
    ],
    meta: {
      title: {
        it: "Sito per yoga e discipline olistiche · 300 €/anno tutto incluso — Alpacode",
        en: "Website for yoga & holistic practitioners · €300/yr all-inclusive — Alpacode",
      },
      description: {
        it: "Sito professionale per insegnanti di yoga e operatori olistici: pratiche, orari e prenotazioni in un posto solo, con la tua identità. 300 € l'anno, tutto incluso. Prima vedi, poi paghi. Solo 30 posti.",
        en: "Professional site for yoga teachers and holistic practitioners: practices, schedules and bookings in one place, with your identity. €300 a year, all included. See it first, then pay. Only 30 seats.",
      },
    },
  },
];

export const campaignBySlug = (slug: string): Campaign | undefined =>
  CAMPAIGNS.find((c) => c.slug === slug);

/** Pick the localized variant of a `{ it, en }` record. */
export const t = <T>(v: Record<Lang, T>, lang: Lang): T => v[lang];
