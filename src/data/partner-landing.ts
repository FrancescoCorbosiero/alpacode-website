/* ============================================================
   Partner landing — /partner
   Professionals with a client portfolio (SMM, accountants, sales
   agents, photographers…) become partners: they refer (segnala),
   resell white-label (rivendi) or swap leads (scambia). On the
   landing kit (components/landing/PartnerLanding.astro), green.

   No hard numbers on commissions or margins on purpose: terms are
   agreed on the first call and put in writing — the copy says
   exactly that instead of promising figures. Copy rules:
   docs/landing-factory.md.
   ============================================================ */
import type { Lang } from "../i18n/types";
import type { Objection } from "./landing/shared";

export interface PartnerMode {
  id: "segnala" | "rivendi" | "scambia";
  tab: string;
  headline: string;
  blurb: string;
  /** What travels from you to us (top rail). */
  flowTo: string;
  /** What comes back (bottom rail). */
  flowFrom: string;
  bullets: string[];
}

export interface PartnerCopy {
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
    you: string;
    us: string;
    youSub: string;
    usSub: string;
  };
  band: string[];
  thesis: { kicker: string; lead: string; body: string };
  channel: { kicker: string; title: string; lede: string; modes: PartnerMode[] };
  who: { title: string; lede: string; professions: { t: string; d: string }[] };
  deal: {
    kicker: string;
    title: string;
    lede: string;
    yoursLabel: string;
    yours: string[];
    oursLabel: string;
    ours: string[];
  };
  steps: { title: string; items: { t: string; d: string }[] };
  pact: { kicker: string; title: string; clauses: { t: string; d: string }[]; sign: string };
  qa: { title: string; items: Objection[] };
  lead: {
    title: string;
    lede: string;
    profession: { label: string; ph: string };
    zone: { label: string; ph: string };
    message: { label: string; ph: string };
    modelLegend: string;
  };
  portalsTitle: string;
  sticky: string;
}

export const partnerLanding: Record<Lang, PartnerCopy> = {
  it: {
    title: "Programma Partner · Porta il digitale ai tuoi clienti, senza farlo tu — Alpacode",
    description:
      "Hai un portafoglio clienti che ti chiede siti e servizi digitali? Segnala, rivendi in white-label o scambia lead con noi. Il cliente resta tuo, le condizioni sono scritte. Un partner per nicchia e zona.",
    ogImage: "/og-partner.png",
    ogAlt: "La fiducia è tua. Il digitale è nostro. Cresciamo insieme. — Alpacode",
    hero: {
      kicker: "per chi ha un portafoglio clienti",
      lines: ["La fiducia è tua.", "Il digitale è nostro."],
      accent: "Cresciamo insieme.",
      lede: "Prima o poi un tuo cliente te lo chiede: «mi fai anche il sito?». Da oggi la risposta è sì. Tu porti la relazione e la conoscenza del tuo mercato; noi progettazione, sviluppo e manutenzione. Ogni collaborazione parte da condizioni scritte e un referente dedicato.",
      cta: "Candidati come partner",
      alt: "Guarda come gira",
      you: "TU",
      us: "NOI",
      youSub: "la relazione",
      usSub: "il laboratorio",
    },
    band: ["SEGNALA", "RIVENDI", "SCAMBIA", "WHITE-LABEL", "IL CLIENTE RESTA TUO", "UN PARTNER PER AREA"],
    thesis: {
      kicker: "la tesi",
      lead: "Il passaparola è il canale di vendita più potente del mondo. Quasi nessuno lo progetta.",
      body: "Chi lavora coi clienti ogni giorno — chi gestisce i loro social, i loro conti, le loro vendite — ha in mano la cosa più difficile da costruire: la fiducia. Noi abbiamo quella più difficile da improvvisare: un laboratorio che progetta siti, e-commerce e automazioni. Il programma partner collega le due cose, con regole scritte.",
    },
    channel: {
      kicker: "tre modelli",
      title: "Un canale che gira\nin due direzioni.",
      lede: "Puoi sceglierne uno, combinarli, o iniziare con un solo cliente per provare. Cosa va da te a noi, e cosa torna indietro.",
      modes: [
        {
          id: "segnala",
          tab: "Segnala",
          headline: "Porti un contatto. Chiudi il cerchio.",
          blurb: "Un tuo cliente ha bisogno di un sito? Ce lo presenti tu. Al progetto firmato, la provvigione concordata è tua — e il cliente resta tuo.",
          flowTo: "presentazione a un tuo cliente",
          flowFrom: "provvigione concordata + il merito",
          bullets: [
            "Nessun lavoro operativo: fai solo l'introduzione",
            "Provvigione definita per iscritto, prima di iniziare",
            "Il cliente continua a vedere te come riferimento",
          ],
        },
        {
          id: "rivendi",
          tab: "Rivendi",
          headline: "Vendi col tuo brand. Costruiamo noi.",
          blurb: "Aggiungi «siti e digitale» al tuo listino. Tu vendi al tuo prezzo, noi realizziamo dietro le quinte in white-label: il margine è tuo, la firma pure.",
          flowTo: "il progetto del tuo cliente",
          flowFrom: "il sito chiavi in mano, col tuo brand",
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
          blurb: "I nostri clienti chiedono di continuo social, contenuti, contabilità, vendite. Te li presentiamo. Tu fai lo stesso con chi ti chiede il digitale. Il canale si ripaga da solo.",
          flowTo: "chi cerca il digitale",
          flowFrom: "chi cerca i tuoi servizi",
          bullets: [
            "Scambio reciproco, tracciato, alla pari",
            "Sei tu il fornitore che consigliamo nella tua nicchia",
            "Si combina con gli altri due modelli",
          ],
        },
      ],
    },
    who: {
      title: "Stesso profilo,\nmestieri diversi.",
      lede: "Se hai clienti che si fidano di te, il programma funziona. Questi sono i profili con cui gira meglio.",
      professions: [
        { t: "Social media manager", d: "I tuoi clienti hanno i social e non hanno il sito. Sei il partner perfetto — e lo sai." },
        { t: "Commercialisti e consulenti", d: "Ogni nuova partita IVA che apri ha bisogno di esistere online. Tu sei la prima persona che incontra." },
        { t: "Venditori e agenti", d: "Giri aziende tutto il giorno. Quante hanno un digitale fermo a dieci anni fa?" },
        { t: "Fotografi e videomaker", d: "Il servizio è splendido — e finisce su un sito vecchio che lo mortifica. Chiudi tu il cerchio." },
        { t: "Copywriter e marketer", d: "Scrivi funnel e campagne che atterrano su pagine di altri. Portale in casa." },
        { t: "Coach e formatori", d: "La tua community ti chiede di continuo «chi mi fa il sito?». Ora hai la risposta." },
      ],
    },
    deal: {
      kicker: "conviene a tutti e due",
      title: "Cosa ci guadagni.\nCosa ci guadagniamo.",
      lede: "Una collaborazione funziona solo se conviene a entrambi: da una parte e dall'altra della bilancia.",
      yoursLabel: "Per te",
      yours: [
        "Un servizio in più a listino, senza costi fissi",
        "Provvigioni o margine su ogni progetto chiuso",
        "Lead dai nostri clienti che cercano i tuoi servizi",
        "Un reparto tecnico su richiesta, senza assumerlo",
      ],
      oursLabel: "Per noi",
      ours: [
        "Clienti che arrivano già con la tua fiducia addosso",
        "Un alleato che conosce la sua nicchia meglio di noi",
        "Il tuo sguardo sul mercato in cui lavori ogni giorno",
        "Progetti veri, invece di budget bruciati in pubblicità",
      ],
    },
    steps: {
      title: "Dalla prima call\nal primo cliente.",
      items: [
        { t: "Ci conosciamo", d: "Trenta minuti di call: ci racconti la tua nicchia, i tuoi clienti tipo e come lavori." },
        { t: "Definiamo il modello", d: "Segnala, rivendi, scambia — o un mix. Provvigioni e confini scritti prima di iniziare." },
        { t: "Primo cliente pilota", d: "Si parte con un progetto vero. Se gira, si scala. Se non gira, nessun vincolo." },
      ],
    },
    pact: {
      kicker: "le regole",
      title: "Il patto.",
      clauses: [
        { t: "Il cliente resta tuo", d: "Mai un rapporto diretto senza di te: lo scriviamo nel patto di partnership." },
        { t: "Condizioni prima di iniziare", d: "Provvigioni, prezzi e confini definiti alla prima call e messi per iscritto." },
        { t: "White-label vero", d: "Se rivendi, non compariamo: il sito nasce col tuo nome sopra." },
        { t: "Nessun vincolo", d: "Niente esclusiva obbligatoria, niente minimi, niente quote. Resti perché conviene." },
      ],
      sign: "Alpacode",
    },
    qa: {
      title: "Le domande giuste.\nLe risposte dritte.",
      items: [
        {
          q: "Quanto si guadagna?",
          a: "Dipende dal modello: provvigione sulla segnalazione, margine libero sulla rivendita, scambio alla pari sui lead. I numeri esatti li definiamo insieme alla prima call e finiscono per iscritto — prima di qualunque progetto.",
        },
        {
          q: "Con l'AI, i miei clienti non faranno tutto da soli?",
          a: "Qualcuno ci proverà. Gli altri vogliono un sito che funzioni senza pensarci, e lo chiedono a chi conoscono già: a te. Con lo studio dietro, quella richiesta diventa un servizio tuo.",
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
    },
    lead: {
      title: "Riserva la tua area.",
      lede: "Raccontaci chi sei e con che clienti lavori. Ti rispondiamo entro mezza giornata lavorativa — e se la tua nicchia è libera, la riserviamo per te.",
      profession: { label: "Di cosa ti occupi", ph: "Es. social media manager" },
      zone: { label: "Area di attività", ph: "Es. Milano e provincia" },
      message: { label: "I tuoi clienti tipo (facoltativo)", ph: "Che clienti segui, cosa ti chiedono." },
      modelLegend: "Il modello che ti interessa",
    },
    portalsTitle: "Non è il tuo caso? C'è anche questo",
    sticky: "Candidati come partner",
  },

  en: {
    title: "Partner Program · Bring digital to your clients, without building it — Alpacode",
    description:
      "Got a client portfolio asking for websites and digital services? Refer, resell white-label or swap leads with us. The client stays yours, the terms are written. One partner per niche and area.",
    ogImage: "/og-partner.png",
    ogAlt: "The trust is yours. The craft is ours. Let's grow together. — Alpacode",
    hero: {
      kicker: "for people with a client portfolio",
      lines: ["The trust is yours.", "The craft is ours."],
      accent: "Let's grow together.",
      lede: "Sooner or later a client asks you: “could you do my website too?”. From today the answer is yes. You bring the relationship and your knowledge of the market; we bring design, development and maintenance. Every collaboration starts from written terms and a dedicated contact.",
      cta: "Apply as a partner",
      alt: "See how it flows",
      you: "YOU",
      us: "US",
      youSub: "the relationship",
      usSub: "the studio",
    },
    band: ["REFER", "RESELL", "SWAP", "WHITE-LABEL", "THE CLIENT STAYS YOURS", "ONE PARTNER PER AREA"],
    thesis: {
      kicker: "the thesis",
      lead: "Word of mouth is the most powerful sales channel in the world. Almost nobody engineers it.",
      body: "People who work with clients every day — running their socials, their books, their sales — hold the hardest thing to build: trust. We hold the hardest thing to improvise: a studio that designs websites, e-commerce and automations. The partner program connects the two, with written rules.",
    },
    channel: {
      kicker: "three models",
      title: "A channel that flows\nboth ways.",
      lede: "Pick one, combine them, or start with a single client to test the waters. What goes from you to us, and what comes back.",
      modes: [
        {
          id: "segnala",
          tab: "Refer",
          headline: "You make the intro. You close the loop.",
          blurb: "One of your clients needs a website? You introduce us. When the project signs, the agreed commission is yours — and the client stays yours.",
          flowTo: "an intro to your client",
          flowFrom: "agreed commission + the credit",
          bullets: [
            "No operational work: you just make the intro",
            "Commission set in writing, before anything starts",
            "The client keeps seeing you as their reference",
          ],
        },
        {
          id: "rivendi",
          tab: "Resell",
          headline: "You sell under your brand. We build.",
          blurb: "Add “websites & digital” to your price list. You sell at your price, we deliver behind the scenes, white-label: the margin is yours, and so is the signature.",
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
          blurb: "Our clients constantly ask for socials, content, accounting, sales. We introduce them to you. You do the same with whoever asks you for digital. The channel pays for itself.",
          flowTo: "people who need digital",
          flowFrom: "people who need your services",
          bullets: [
            "Reciprocal, tracked, even exchange",
            "You're the provider we recommend in your niche",
            "Combines with the other two models",
          ],
        },
      ],
    },
    who: {
      title: "Same profile,\ndifferent trades.",
      lede: "If you have clients who trust you, the program works. These are the profiles it runs best with.",
      professions: [
        { t: "Social media managers", d: "Your clients have socials and no website. You're the perfect partner — and you know it." },
        { t: "Accountants and consultants", d: "Every new business you register needs to exist online. You're the first person it meets." },
        { t: "Sales reps and agents", d: "You visit companies all day. How many have a digital presence stuck ten years ago?" },
        { t: "Photographers and videomakers", d: "The shoot is stunning — and it ends up on an old site that buries it. Close the loop yourself." },
        { t: "Copywriters and marketers", d: "You write funnels and campaigns that land on other people's pages. Bring them home." },
        { t: "Coaches and trainers", d: "Your community keeps asking “who can build my site?”. Now you have the answer." },
      ],
    },
    deal: {
      kicker: "it pays for both",
      title: "What you gain.\nWhat we gain.",
      lede: "A collaboration only works if it pays for both sides: one on each side of the scale.",
      yoursLabel: "For you",
      yours: [
        "One more service on your list, without fixed costs",
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
    },
    steps: {
      title: "From the first call\nto the first client.",
      items: [
        { t: "We meet", d: "Thirty minutes on a call: you tell us about your niche, your typical clients, how you work." },
        { t: "We define the model", d: "Refer, resell, swap — or a mix. Commissions and boundaries written down before we start." },
        { t: "First pilot client", d: "We start with a real project. If it flows, we scale. If it doesn't, no strings." },
      ],
    },
    pact: {
      kicker: "the rules",
      title: "The pact.",
      clauses: [
        { t: "The client stays yours", d: "Never a direct relationship without you: it's written into the partnership pact." },
        { t: "Terms before we start", d: "Commissions, prices and boundaries defined on the first call and put in writing." },
        { t: "True white-label", d: "If you resell, we don't appear: the site is born with your name on it." },
        { t: "No lock-in", d: "No forced exclusivity, no minimums, no fees. You stay because it pays." },
      ],
      sign: "Alpacode",
    },
    qa: {
      title: "The right questions.\nStraight answers.",
      items: [
        {
          q: "How much can I earn?",
          a: "It depends on the model: commission on referrals, free margin on resale, an even swap on leads. We set the exact numbers together on the first call and put them in writing — before any project.",
        },
        {
          q: "With AI, won't my clients just do it all themselves?",
          a: "Some will try. The rest want a site that works without thinking about it, and they ask someone they already know: you. With the studio behind you, that request becomes a service of yours.",
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
    },
    lead: {
      title: "Reserve your area.",
      lede: "Tell us who you are and which clients you work with. We'll reply within half a working day — and if your niche is free, we'll hold it for you.",
      profession: { label: "What you do", ph: "e.g. social media manager" },
      zone: { label: "Area of activity", ph: "e.g. Milan area" },
      message: { label: "Your typical clients (optional)", ph: "Who you work with, what they ask you for." },
      modelLegend: "The model you're interested in",
    },
    portalsTitle: "Not quite you? There's this too",
    sticky: "Apply as a partner",
  },
};
