import type { Lang } from "../i18n/types";
import type { PartnerFormLabels } from "../components/islands/PartnerForm";

/* ============================================================
   Collabora con noi — how independent professionals can propose
   a collaboration (ex /lavora-con-noi, which still redirects).

   Why it was rewritten: "Lavora con noi" reads as a careers page,
   and too many people wrote in asking to be hired. Alpacode does
   not hire and publishes no job ads. This page only explains how
   professionals with their own activity can PROPOSE a
   collaboration, and what happens next.

   Three iron rules for this page's copy:

   1. NOT HIRING — SAID EARLY AND PLAINLY. The hero, the first
      section and the first FAQ all say it. Never use recruiting
      vocabulary: "candidati", "candidatura", "posizioni aperte",
      "cerchiamo", "sempre aperte", "assunzione", "stipendio" —
      and "CV" only to say we don't evaluate them.

   2. LEGAL FRAMING. Alpacode (regime forfettario) does not employ
      staff; every collaboration is autonomous work (P.IVA to
      P.IVA, or occasional self-employment for a single assignment
      where the law allows it). Changes should be checked against
      that line.

   3. NO INVENTED NUMBERS OR PROMISES. No rates, no response
      times, no "we always reply": we write when a project fits.
   ============================================================ */

export interface CollaboraData {
  /* Meta title/description live with the other pages' in i18n/ui.ts (meta). */

  hero: {
    label: string;
    line1: string;
    line2: string;
    lede: string;
    cta1: string;
    cta2: string;
    facts: { k: string; v: string }[];
  };

  /* What it is — and what it isn't */
  isLabel: string;
  isTitle: string;
  isLede: string;
  isNot: { title: string; items: string[] };
  is: { title: string; items: string[] };

  /* Scroll-scrubbed statement */
  statement: string;

  /* How a collaboration actually happens */
  howLabel: string;
  howTitle: string;
  howLede: string;
  howSteps: { t: string; d: string }[];

  /* The crafts we most often need (not positions) */
  craftsLabel: string;
  craftsTitle: string;
  craftsNote: string;
  crafts: { t: string; d: string }[];

  /* The two legal forms */
  formsLabel: string;
  formsTitle: string;
  formsLede: string;
  forms: { tag: string; title: string; body: string; note: string }[];

  /* Compliance block */
  pactLabel: string;
  pactTitle: string;
  pactBody: string;
  pactPoints: string[];

  /* FAQ */
  faqLabel: string;
  faqTitle: string;
  faq: { q: string; a: string }[];

  /* Cross-link to the partner program */
  cross: { tag: string; title: string; body: string; cta: string };

  /* Proposal form */
  formLabel: string;
  formTitle: string;
  formLede: string;
  formLabels: PartnerFormLabels;
}

export const collabora: Record<Lang, CollaboraData> = {
  it: {
    hero: {
      label: "Collabora con noi",
      line1: "Non assumiamo.",
      line2: "Collaboriamo.",
      lede: "Alpacode non ha posizioni aperte e non seleziona personale. Questa pagina è per professionisti con un'attività propria — freelance, studi, piccole agenzie — che vogliono proporci una collaborazione: quando un progetto richiede il loro mestiere, lavoriamo insieme con un accordo scritto.",
      cta1: "Proponi una collaborazione",
      cta2: "Cosa è, e cosa no",
      facts: [
        { k: "Posizioni aperte", v: "Nessuna" },
        { k: "Annunci di lavoro", v: "Nessuno" },
        { k: "Collaborazioni", v: "Tra professionisti autonomi" },
      ],
    },

    isLabel: "Prima di scriverci",
    isTitle: "Cosa è, e cosa no.",
    isLede: "Lo diciamo subito, così nessuno perde tempo: né tu, né noi.",
    isNot: {
      title: "Non è",
      items: [
        "Un'offerta di lavoro o un annuncio.",
        "Una selezione del personale: non valutiamo CV.",
        "Un impiego da dipendente, full-time o part-time.",
        "Uno stage, un tirocinio o un primo impiego.",
      ],
    },
    is: {
      title: "È",
      items: [
        "Una collaborazione tra professionisti autonomi.",
        "Su incarichi definiti, quando un progetto lo richiede.",
        "Regolata da un accordo scritto, prima di iniziare.",
        "Da remoto, con i tuoi strumenti e i tuoi tempi.",
      ],
    },

    statement:
      "Non stiamo selezionando nessuno. Ma a volte un progetto chiede un mestiere che non copriamo: in quel momento coinvolgiamo un professionista che conosciamo già — magari tu, se ci hai scritto prima.",

    howLabel: "Come succede",
    howTitle: "Nascono dai progetti.",
    howLede:
      "Non c'è un processo di selezione, perché non c'è una selezione. C'è una porta aperta e un modo semplice di passarci.",
    howSteps: [
      {
        t: "Ci proponi una collaborazione",
        d: "Chi sei, la tua attività, cosa sai fare e un portfolio. Una proposta concreta vale più di un curriculum.",
      },
      {
        t: "La leggiamo e la teniamo presente",
        d: "Nessun colloquio, nessuna graduatoria: la tua proposta resta tra i professionisti a cui pensiamo quando serve.",
      },
      {
        t: "Quando c'è un progetto, ti scriviamo noi",
        d: "Se arriva un lavoro adatto al tuo mestiere, ti contattiamo. Può succedere presto o più avanti: dipende dai progetti.",
      },
      {
        t: "Accordo scritto, poi si parte",
        d: "Oggetto, scadenza, compenso e diritti d'uso nero su bianco, prima di iniziare. Poi lavori in autonomia.",
      },
    ],

    craftsLabel: "Gli ambiti",
    craftsTitle: "Dove capita di collaborare.",
    craftsNote:
      "Non sono posizioni aperte: sono i mestieri che i nostri progetti chiedono più spesso. Se fai qualcosa di raro e lo fai bene, scrivici lo stesso.",
    crafts: [
      {
        t: "Grafica e illustrazione",
        d: "Identità visive, illustrazione, materiali per campagne.",
      },
      {
        t: "UI / UX design",
        d: "Interfacce per siti e prodotti, dal wireframe al design system, con attenzione vera all'accessibilità.",
      },
      {
        t: "Sviluppo web e software",
        d: "WordPress, Astro, React, gestionali. Codice pulito, performance, niente scorciatoie.",
      },
      {
        t: "Advertising e SEO",
        d: "Campagne, funnel e contenuti, misurati prima di promettere.",
      },
      {
        t: "Social media",
        d: "Canali e contenuti per i clienti che portiamo online. Metodo, non improvvisazione.",
      },
    ],

    formsLabel: "Come si inquadra",
    formsTitle: "Lavoro autonomo, in due forme.",
    formsLede:
      "Qualunque sia la forma, il principio non cambia: niente subordinazione, accordo scritto, compenso definito prima di iniziare.",
    forms: [
      {
        tag: "La forma abituale",
        title: "Da partita IVA a partita IVA",
        body: "Il rapporto classico tra professionisti: incarichi singoli, subforniture o un'area in outsourcing. Accordo quadro, fattura, tempi e responsabilità chiari.",
        note: "È la forma giusta per qualsiasi collaborazione ricorrente.",
      },
      {
        tag: "Per un incarico singolo",
        title: "Prestazione occasionale",
        body: "Per un lavoro puntuale e circoscritto, nelle forme di lavoro autonomo occasionale previste dalla legge. Resta un incarico definito: nessun orario, nessuna continuità promessa.",
        note: "L'inquadramento corretto lo verifichiamo insieme, prima di partire.",
      },
    ],

    pactLabel: "Il patto",
    pactTitle: "Quattro impegni, uguali per tutti.",
    pactBody:
      "Alpacode opera in regime forfettario e non assume personale dipendente: ogni collaborazione è lavoro autonomo, nelle forme previste dalla legge. Nessuna zona grigia.",
    pactPoints: [
      "Nessun rapporto di lavoro dipendente, dichiarato o mascherato.",
      "Accordo scritto sempre: oggetto, scadenza, compenso e diritti d'uso, prima di iniziare.",
      "Autonomia reale: niente orari imposti, niente postazione fissa — conta la consegna.",
      "Ogni compenso passa da ricevuta o fattura, secondo il tuo inquadramento.",
    ],

    faqLabel: "Domande",
    faqTitle: "Le risposte rapide.",
    faq: [
      {
        q: "State assumendo?",
        a: "No. Alpacode non assume personale dipendente: non abbiamo posizioni aperte, non pubblichiamo annunci di lavoro e non facciamo selezioni. Offriamo solo collaborazioni tra professionisti autonomi.",
      },
      {
        q: "Posso mandarvi il mio CV?",
        a: "Non serve: non facciamo selezioni, quindi non valutiamo curriculum. Se hai un'attività tua, mandaci invece una proposta di collaborazione con il tuo portfolio.",
      },
      {
        q: "Offrite stage o tirocini?",
        a: "No. Non attiviamo stage, tirocini o percorsi di inserimento.",
      },
      {
        q: "Serve la partita IVA?",
        a: "Per collaborazioni ricorrenti sì: è la forma giusta tra professionisti. Per un incarico singolo e circoscritto la legge prevede anche la prestazione occasionale. In ogni caso, l'inquadramento lo verifichiamo insieme prima di partire.",
      },
      {
        q: "Mi risponderete?",
        a: "Leggiamo ogni proposta, ma scriviamo quando c'è un progetto concreto in cui ha senso coinvolgerti. Se non ti contattiamo subito non è un no: vuol dire che quel progetto, per ora, non c'è.",
      },
      {
        q: "Come funziona il compenso?",
        a: "Si concorda per iscritto prima di iniziare, insieme a oggetto e scadenza. A consegna accettata il pagamento è puntuale, con ricevuta o fattura secondo il tuo inquadramento.",
      },
    ],

    cross: {
      tag: "Porti clienti invece di produrre?",
      title: "C'è il programma partner.",
      body: "Se il tuo forte è la rete — clienti, contatti, un pubblico che si fida — il programma partner ti riserva una nicchia e un'area: tu porti le opportunità, noi costruiamo.",
      cta: "Scopri il programma partner",
    },

    formLabel: "Proposta",
    formTitle: "Proponi una collaborazione.",
    formLede:
      "Per professionisti con un'attività propria. Raccontaci chi sei, cosa fai e come immagini la collaborazione: se arriva il progetto giusto, ti scriviamo noi.",
    formLabels: {
      name: "Nome e cognome, o studio",
      namePlaceholder: "Maria Rossi · Studio Rossi",
      email: "Email",
      emailPlaceholder: "nome@dominio.it",
      phone: "Telefono (opzionale)",
      phonePlaceholder: "+39 …",
      profession: "Il tuo ambito",
      professions: [
        "Grafica e illustrazione",
        "UI / UX design",
        "Sviluppo web e software",
        "Advertising e SEO",
        "Social media",
        "Altro",
      ],
      zone: "Portfolio o sito (opzionale)",
      zonePlaceholder: "sito, Behance, GitHub, profilo…",
      message: "La tua proposta",
      messagePlaceholder:
        "La tua attività (partita IVA, studio, agenzia), cosa proponi e come immagini la collaborazione.",
      send: "Invia la proposta",
      consent:
        "Ho letto la privacy policy e acconsento al trattamento dei dati per essere ricontattato/a.",
      ack: "Ho capito che non è un'offerta di lavoro: propongo una collaborazione come professionista autonomo.",
      confirm: "Grazie, proposta ricevuta. Se arriva il progetto giusto, ti scriviamo noi.",
      error: "Qualcosa è andato storto: riprova o scrivici via email.",
    },
  },

  en: {
    hero: {
      label: "Collaborate with us",
      line1: "We don't hire.",
      line2: "We collaborate.",
      lede: "Alpacode has no open positions and runs no recruitment. This page is for professionals with a business of their own — freelancers, studios, small agencies — who want to propose a collaboration: when a project needs their craft, we work together under a written agreement.",
      cta1: "Propose a collaboration",
      cta2: "What it is, and what it isn't",
      facts: [
        { k: "Open positions", v: "None" },
        { k: "Job ads", v: "None" },
        { k: "Collaborations", v: "Between independent professionals" },
      ],
    },

    isLabel: "Before you write",
    isTitle: "What it is, and what it isn't.",
    isLede: "We say it up front, so nobody wastes time: neither you, nor us.",
    isNot: {
      title: "It isn't",
      items: [
        "A job offer or a job ad.",
        "A recruitment process: we don't evaluate CVs.",
        "Employment, full-time or part-time.",
        "An internship, a traineeship or a first job.",
      ],
    },
    is: {
      title: "It is",
      items: [
        "A collaboration between independent professionals.",
        "On defined assignments, when a project calls for it.",
        "Governed by a written agreement, before starting.",
        "Remote, with your own tools and your own hours.",
      ],
    },

    statement:
      "We're not recruiting anyone. But sometimes a project needs a craft we don't cover: that's when we bring in a professional we already know — maybe you, if you wrote to us first.",

    howLabel: "How it happens",
    howTitle: "They start from projects.",
    howLede:
      "There's no selection process, because there's no selection. There's an open door and a simple way through it.",
    howSteps: [
      {
        t: "You propose a collaboration",
        d: "Who you are, your business, what you do and a portfolio. A concrete proposal is worth more than a résumé.",
      },
      {
        t: "We read it and keep it in mind",
        d: "No interviews, no rankings: your proposal stays among the professionals we think of when the need comes up.",
      },
      {
        t: "When there's a project, we write to you",
        d: "If work that fits your craft comes in, we get in touch. It may happen soon or later on: it depends on the projects.",
      },
      {
        t: "Written agreement, then we start",
        d: "Scope, deadline, compensation and usage rights in black and white, before starting. Then you work autonomously.",
      },
    ],

    craftsLabel: "The crafts",
    craftsTitle: "Where collaborations happen.",
    craftsNote:
      "These aren't open positions: they're the crafts our projects ask for most often. If you do something rare and do it well, write anyway.",
    crafts: [
      {
        t: "Graphic design & illustration",
        d: "Visual identities, illustration, campaign material.",
      },
      {
        t: "UI / UX design",
        d: "Interfaces for sites and products, from wireframe to design system, with real attention to accessibility.",
      },
      {
        t: "Web & software development",
        d: "WordPress, Astro, React, management systems. Clean code, performance, no shortcuts.",
      },
      {
        t: "Advertising & SEO",
        d: "Campaigns, funnels and content, measured before promising.",
      },
      {
        t: "Social media",
        d: "Channels and content for the clients we bring online. Method, not improvisation.",
      },
    ],

    formsLabel: "How it's framed",
    formsTitle: "Autonomous work, in two forms.",
    formsLede:
      "Whatever the form, the principle stays the same: no subordination, a written agreement, compensation defined before starting.",
    forms: [
      {
        tag: "The usual form",
        title: "Business to business",
        body: "The classic relationship between professionals: single assignments, subcontracting or an outsourced area. Framework agreement, invoice, clear timelines and responsibilities.",
        note: "It's the right form for any recurring collaboration.",
      },
      {
        tag: "For a single assignment",
        title: "Occasional self-employment",
        body: "For a one-off, well-bounded piece of work, in the forms of occasional self-employment Italian law provides. It stays a defined assignment: no hours, no promised continuity.",
        note: "We verify the correct framing together, before starting.",
      },
    ],

    pactLabel: "The pact",
    pactTitle: "Four commitments, the same for everyone.",
    pactBody:
      "Alpacode operates under Italy's flat-rate regime and does not employ staff: every collaboration is autonomous work, in the forms provided by law. No grey areas.",
    pactPoints: [
      "No employment relationships, declared or disguised.",
      "Always a written agreement: scope, deadline, compensation and usage rights, before starting.",
      "Real autonomy: no imposed hours, no fixed desk — the delivery is what counts.",
      "Every payment goes through a receipt or invoice, according to your status.",
    ],

    faqLabel: "Questions",
    faqTitle: "Quick answers.",
    faq: [
      {
        q: "Are you hiring?",
        a: "No. Alpacode doesn't employ staff: we have no open positions, publish no job ads and run no recruitment. We only offer collaborations between independent professionals.",
      },
      {
        q: "Can I send you my CV?",
        a: "There's no need: we don't recruit, so we don't evaluate résumés. If you run your own business, send us a collaboration proposal with your portfolio instead.",
      },
      {
        q: "Do you offer internships?",
        a: "No. We don't offer internships, traineeships or placement programmes.",
      },
      {
        q: "Do I need a VAT number?",
        a: "For recurring collaborations, yes: it's the right form between professionals. For a single, well-bounded assignment, Italian law also provides occasional self-employment. Either way, we verify the correct framing together before starting.",
      },
      {
        q: "Will you reply?",
        a: "We read every proposal, but we write when there's a concrete project where involving you makes sense. If we don't get in touch right away it isn't a no: it means that project doesn't exist yet.",
      },
      {
        q: "How does compensation work?",
        a: "It's agreed in writing before starting, together with scope and deadline. Once the delivery is accepted, payment is prompt, with a receipt or invoice according to your status.",
      },
    ],

    cross: {
      tag: "Bringing clients instead of producing?",
      title: "There's the partner program.",
      body: "If your strength is your network — clients, contacts, an audience that trusts you — the partner program reserves you a niche and an area: you bring the opportunities, we build.",
      cta: "Discover the partner program",
    },

    formLabel: "Proposal",
    formTitle: "Propose a collaboration.",
    formLede:
      "For professionals with a business of their own. Tell us who you are, what you do and how you picture the collaboration: if the right project comes along, we'll write to you.",
    formLabels: {
      name: "Full name, or studio",
      namePlaceholder: "Maria Rossi · Studio Rossi",
      email: "Email",
      emailPlaceholder: "name@domain.com",
      phone: "Phone (optional)",
      phonePlaceholder: "+39 …",
      profession: "Your craft",
      professions: [
        "Graphic design & illustration",
        "UI / UX design",
        "Web & software development",
        "Advertising & SEO",
        "Social media",
        "Other",
      ],
      zone: "Portfolio or website (optional)",
      zonePlaceholder: "website, Behance, GitHub, profile…",
      message: "Your proposal",
      messagePlaceholder:
        "Your business (VAT number, studio, agency), what you propose and how you picture the collaboration.",
      send: "Send the proposal",
      consent:
        "I have read the privacy policy and consent to data processing to be contacted back.",
      ack: "I understand this is not a job offer: I'm proposing a collaboration as an independent professional.",
      confirm: "Thanks, proposal received. If the right project comes along, we'll write to you.",
      error: "Something went wrong: retry or email us.",
    },
  },
};
