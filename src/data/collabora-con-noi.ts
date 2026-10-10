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

   1. NOT HIRING — SAID EARLY, CLEARLY AND KINDLY. The hero, the
      first section and the first FAQ all say it, in a warm tone (no
      "we don't hire" slammed in the face). Never use recruiting
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
      line1: "Collaborazioni",
      line2: "tra professionisti.",
      lede: "Siamo uno studio piccolo e non abbiamo posizioni aperte. Però ci piace lavorare con bravi professionisti: se hai un'attività tua — freelance, studio, piccola agenzia — e ti va di proporci una collaborazione, qui trovi come funziona. Quando un progetto chiede il tuo mestiere, lavoriamo insieme con un accordo chiaro e scritto.",
      cta1: "Proponi una collaborazione",
      cta2: "Cosa è, e cosa no",
      facts: [
        { k: "Con chi", v: "Professionisti con un'attività propria" },
        { k: "Quando", v: "Se un progetto lo richiede" },
        { k: "Come", v: "Da remoto, con accordo scritto" },
      ],
    },

    isLabel: "Per partire col piede giusto",
    isTitle: "Cosa è, e cosa no.",
    isLede: "Due righe di chiarezza prima di scriverci: ci aiutano a rispondere bene, e ti evitano di aspettare qualcosa che non possiamo offrire.",
    isNot: {
      title: "Non è",
      items: [
        "Un annuncio o un'offerta di lavoro.",
        "Una selezione: i curriculum non servono.",
        "Un posto da dipendente, full-time o part-time.",
        "Uno stage o un percorso di primo impiego.",
      ],
    },
    is: {
      title: "È",
      items: [
        "Un lavoro insieme, tra professionisti autonomi.",
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
      "Niente colloqui o graduatorie: solo una porta aperta e un modo semplice di bussare.",
    howSteps: [
      {
        t: "Ci proponi una collaborazione",
        d: "Chi sei, la tua attività, cosa sai fare e un portfolio. Una proposta concreta vale più di un curriculum.",
      },
      {
        t: "La leggiamo e la teniamo presente",
        d: "Con calma e con attenzione: la tua proposta resta tra i professionisti a cui pensiamo quando serve.",
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
      "Sono i mestieri che i nostri progetti chiedono più spesso. Se fai qualcosa di diverso e lo fai bene, scrivici lo stesso: le belle sorprese ci piacciono.",
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
      "Alpacode opera in regime forfettario e non ha personale dipendente: ogni collaborazione è lavoro autonomo, nelle forme previste dalla legge. Regole chiare, uguali per tutti, così si lavora tranquilli.",
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
        a: "No: Alpacode non ha posizioni da dipendente aperte e non pubblica annunci di lavoro. Quello che offriamo sono collaborazioni tra professionisti autonomi, quando un progetto le richiede.",
      },
      {
        q: "Posso mandarvi il mio CV?",
        a: "Non è necessario: non facendo selezioni, il curriculum ci dice poco. Se hai un'attività tua, ci aiuta molto di più un portfolio con due righe su come immagini la collaborazione.",
      },
      {
        q: "Offrite stage o tirocini?",
        a: "Al momento no: non attiviamo stage, tirocini o percorsi di inserimento.",
      },
      {
        q: "Serve la partita IVA?",
        a: "Per collaborazioni ricorrenti sì: è la forma giusta tra professionisti. Per un incarico singolo e circoscritto la legge prevede anche la prestazione occasionale. In ogni caso, l'inquadramento lo verifichiamo insieme prima di partire.",
      },
      {
        q: "Mi risponderete?",
        a: "Leggiamo ogni proposta con attenzione e ti scriviamo quando c'è un progetto in cui ha senso lavorare insieme. Può volerci un po': se non ti sentiamo subito, non è un no — è solo che quel progetto non è ancora arrivato.",
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
      "Raccontaci chi sei, cosa fai e come immagini di lavorare con noi. Bastano poche righe e un link ai tuoi lavori: quando arriva il progetto giusto, ti scriviamo noi.",
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
      ack: "Ho capito che si tratta di una collaborazione tra professionisti, non di un'offerta di lavoro.",
      confirm: "Grazie, proposta ricevuta. Se arriva il progetto giusto, ti scriviamo noi.",
      error: "Qualcosa è andato storto: riprova o scrivici via email.",
    },
  },

  en: {
    hero: {
      label: "Collaborate with us",
      line1: "Collaborations",
      line2: "between professionals.",
      lede: "We're a small studio with no open positions. But we enjoy working with good professionals: if you run a business of your own — freelancer, studio, small agency — and you'd like to propose a collaboration, this is how it works. When a project needs your craft, we work together under a clear, written agreement.",
      cta1: "Propose a collaboration",
      cta2: "What it is, and what it isn't",
      facts: [
        { k: "With whom", v: "Professionals with their own business" },
        { k: "When", v: "When a project calls for it" },
        { k: "How", v: "Remotely, with a written agreement" },
      ],
    },

    isLabel: "To start on the right foot",
    isTitle: "What it is, and what it isn't.",
    isLede: "A little clarity before you write: it helps us answer well, and saves you waiting for something we can't offer.",
    isNot: {
      title: "It isn't",
      items: [
        "A job offer or a job ad.",
        "A recruitment process: no CV needed.",
        "Employment, full-time or part-time.",
        "An internship or a first-job programme.",
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
      "No interviews, no rankings: just an open door and a simple way to knock.",
    howSteps: [
      {
        t: "You propose a collaboration",
        d: "Who you are, your business, what you do and a portfolio. A concrete proposal is worth more than a résumé.",
      },
      {
        t: "We read it and keep it in mind",
        d: "Calmly and carefully: your proposal stays among the professionals we think of when the need comes up.",
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
      "These are the crafts our projects ask for most often. If you do something different and do it well, write anyway: we like good surprises.",
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
      "Alpacode operates under Italy's flat-rate regime and has no employees: every collaboration is autonomous work, in the forms provided by law. Clear rules, the same for everyone, so everyone works at ease.",
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
        a: "No: Alpacode has no employee positions open and publishes no job ads. What we offer are collaborations between independent professionals, when a project calls for them.",
      },
      {
        q: "Can I send you my CV?",
        a: "It isn't necessary: since we don't recruit, a résumé tells us little. If you run your own business, a portfolio and a couple of lines on how you picture the collaboration help much more.",
      },
      {
        q: "Do you offer internships?",
        a: "Not at the moment: we don't offer internships, traineeships or placement programmes.",
      },
      {
        q: "Do I need a VAT number?",
        a: "For recurring collaborations, yes: it's the right form between professionals. For a single, well-bounded assignment, Italian law also provides occasional self-employment. Either way, we verify the correct framing together before starting.",
      },
      {
        q: "Will you reply?",
        a: "We read every proposal carefully and write to you when there's a project where working together makes sense. It can take a while: if you don't hear from us right away, it isn't a no — that project just hasn't arrived yet.",
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
      "Tell us who you are, what you do and how you picture working with us. A few lines and a link to your work are enough: when the right project comes along, we'll write to you.",
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
      ack: "I understand this is a collaboration between professionals, not a job offer.",
      confirm: "Thanks, proposal received. If the right project comes along, we'll write to you.",
      error: "Something went wrong: retry or email us.",
    },
  },
};
