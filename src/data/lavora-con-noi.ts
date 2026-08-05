import type { Lang } from "../i18n/types";
import type { PartnerFormLabels } from "../components/islands/PartnerForm";

/* ============================================================
   Lavora con noi — collaborator recruiting page.

   Voice: direct, concrete, zero hype (house rules). Two iron
   rules for this page's copy:

   1. LEGAL FRAMING. Alpacode (regime forfettario) does not hire
      employees; every collaboration is autonomous work. Never
      use employment vocabulary ("subordinato", "assunzione",
      "stipendio") — what we offer is project-based autonomous
      collaboration (prestazione d'opera / P.IVA-to-P.IVA).
      Wording here was chosen to stay on the right side of that
      line; changes should be checked against it.

   2. NO INVENTED NUMBERS. No percentages, no rates, no quota
      splits — compensation is "concordato per iscritto prima
      di iniziare", full stop.
   ============================================================ */

export interface LavoraData {
  /* Meta title/description live with the other pages' in i18n/ui.ts (meta). */
  hero: { crumb: string; line1: string; line2: string; lede: string };

  /* Remote-native principles */
  remoteKicker: string;
  remoteTitle: string;
  remoteLede: string;
  remotePoints: { k: string; v: string }[];

  /* The two collaboration tracks */
  pathsKicker: string;
  pathsTitle: string;
  pathsLede: string;
  paths: {
    tag: string;
    title: string;
    body: string;
    steps: { n: string; t: string; d: string }[];
    note: string;
  }[];

  /* Compliance block */
  ruleKicker: string;
  ruleTitle: string;
  ruleBody: string;
  rulePoints: string[];

  /* Who we look for */
  figuresKicker: string;
  figuresTitle: string;
  figuresLede: string;
  figures: { role: string; d: string }[];
  figuresFoot: string;

  /* How it starts */
  howKicker: string;
  howTitle: string;
  howSteps: { n: string; t: string; d: string }[];

  /* FAQ */
  faqKicker: string;
  faqTitle: string;
  faq: { q: string; a: string }[];

  /* Cross-link to the partner program */
  crossTag: string;
  crossTitle: string;
  crossBody: string;
  crossCta: string;

  /* Form */
  formKicker: string;
  formTitle: string;
  formLede: string;
  formLabels: PartnerFormLabels;
}

export const lavoraConNoi: Record<Lang, LavoraData> = {
  it: {
    hero: {
      crumb: "§ 09 — Lavora con noi",
      line1: "Bravo nel tuo mestiere?",
      line2: "Il resto lo portiamo noi.",
      lede: "Cerchiamo collaboratori per task singoli o progetti interi: tu metti il mestiere, noi clienti, metodo e infrastruttura. Da qualsiasi punto d'Italia, con accordi chiari e per iscritto.",
    },

    remoteKicker: "§ 01 — Remote-native",
    remoteTitle: "Il talento non ha un indirizzo.",
    remoteLede:
      "Alpacode nasce distribuita: niente sede da raggiungere, niente ore di pendolarismo. Contano il lavoro consegnato e gli standard con cui è fatto.",
    remotePoints: [
      {
        k: "Da tutta Italia",
        v: "Città o provincia, nord o sud: se il lavoro regge i nostri standard, la geografia non è un requisito.",
      },
      {
        k: "Task o progetti interi",
        v: "Un'illustrazione, una landing, un gestionale completo: collaborazioni della misura giusta per te.",
      },
      {
        k: "Asincrono per default",
        v: "Poche call, quelle che servono. Brief scritti, scadenze chiare, strumenti condivisi.",
      },
    ],

    pathsKicker: "§ 02 — I due percorsi",
    pathsTitle: "Due modi di collaborare. Entrambi in regola.",
    pathsLede:
      "Qualunque sia il percorso, il principio non cambia: lavoro autonomo, accordo scritto, compenso definito prima di iniziare.",
    paths: [
      {
        tag: "Percorso A",
        title: "Su progetto, dentro la nostra pipeline",
        body: "Per chi vuole lavorare su incarichi definiti — anche senza una struttura propria. Il cliente, il contratto e le garanzie li gestiamo noi; tu ti concentri sul lavoro.",
        steps: [
          {
            n: "01",
            t: "Call conoscitiva",
            d: "Una chiamata per capire livello, strumenti e ambizioni. Portfolio alla mano, senza formalità.",
          },
          {
            n: "02",
            t: "Standard",
            d: "Manteniamo standard alti: se il livello c'è, entri nel giro. Se non ancora, ti diciamo cosa manca — onestamente.",
          },
          {
            n: "03",
            t: "Piena libertà, una regola",
            d: "Orari tuoi, metodo tuo, strumenti tuoi. L'unico vincolo è la scadenza concordata insieme all'inizio.",
          },
          {
            n: "04",
            t: "Consegna e compenso",
            d: "Il tuo compenso è definito per iscritto prima di iniziare. A consegna accettata, il pagamento è puntuale.",
          },
        ],
        note: "Inquadramento come prestazione di lavoro autonomo, nelle forme previste dalla legge per il tuo caso (occasionale o con partita IVA).",
      },
      {
        tag: "Percorso B",
        title: "Da partita IVA a partita IVA",
        body: "Il classico rapporto tra professionisti: incarichi, subforniture o outsourcing completo di un'area. Contratto, fattura, tempi e responsabilità chiari.",
        steps: [
          {
            n: "01",
            t: "Presentazione",
            d: "Ci racconti chi sei, cosa fai e su che volumi lavori. Studio, freelance o micro-agenzia: va bene tutto.",
          },
          {
            n: "02",
            t: "Accordo quadro",
            d: "Definiamo per iscritto ambiti, standard di qualità, tempi e condizioni economiche.",
          },
          {
            n: "03",
            t: "Incarichi",
            d: "Ti passiamo incarichi singoli o interi flussi in outsourcing, in base a capacità e disponibilità.",
          },
          {
            n: "04",
            t: "Fattura e pagamento",
            d: "Fatturi ad Alpacode secondo l'accordo. Pagamenti nei termini pattuiti, senza rincorse.",
          },
        ],
        note: "Per collaborazioni continuative o strutturate, questo è il percorso giusto fin dal primo giorno.",
      },
    ],

    ruleKicker: "§ 03 — La regola",
    ruleTitle: "Solo collaborazioni in regola.",
    ruleBody:
      "Alpacode opera in regime forfettario e non assume personale dipendente: ogni collaborazione è lavoro autonomo, nelle forme previste dalla legge. Non è un cavillo — è il patto di partenza.",
    rulePoints: [
      "Nessun rapporto di lavoro dipendente, dichiarato o mascherato.",
      "Accordo scritto sempre: oggetto, scadenza, compenso e diritti d'uso, prima di iniziare.",
      "Autonomia reale: niente orari imposti, niente postazione fissa — conta la consegna.",
      "Ogni compenso passa da ricevuta o fattura, secondo il tuo inquadramento.",
    ],

    figuresKicker: "§ 04 — Chi cerchiamo",
    figuresTitle: "Cinque mestieri, una soglia: la qualità.",
    figuresLede:
      "Collaborazioni singole o interi flussi in outsourcing. Quello che non cambia è lo standard.",
    figures: [
      {
        role: "Grafici",
        d: "Identità, illustrazione, materiali per campagne. Gusto brutalist benvenuto.",
      },
      {
        role: "Designer",
        d: "UI e UX per siti e prodotti: da Figma al design system, con attenzione vera all'accessibilità.",
      },
      {
        role: "Sviluppatori",
        d: "WordPress, Astro, React, gestionali. Codice pulito, performance, niente scorciatoie.",
      },
      {
        role: "Marketer",
        d: "Campagne, funnel, copy che vende senza urlare. Misurare prima di promettere.",
      },
      {
        role: "Social media manager",
        d: "Gestione canali e contenuti per i clienti che portiamo online. Metodo, non improvvisazione.",
      },
    ],
    figuresFoot:
      "Non ti riconosci ma sai fare qualcosa di raro? Scrivici lo stesso: le eccezioni buone ci interessano.",

    howKicker: "§ 05 — Come si parte",
    howTitle: "Dal form al primo progetto.",
    howSteps: [
      {
        n: "01",
        t: "Candidati",
        d: "Compila il form qui sotto con portfolio o link. Due minuti, zero burocrazia.",
      },
      {
        n: "02",
        t: "Call conoscitiva",
        d: "Se c'è potenziale ti scriviamo per una chiamata: livello, strumenti, aspettative.",
      },
      {
        n: "03",
        t: "Primo progetto",
        d: "Si parte con un incarico vero, di misura contenuta, con scadenza e compenso scritti.",
      },
      {
        n: "04",
        t: "Collaborazione",
        d: "Se la consegna regge gli standard, il giro continua: più progetti, più fiducia, più autonomia.",
      },
    ],

    faqKicker: "§ 06 — Domande",
    faqTitle: "Le risposte rapide.",
    faq: [
      {
        q: "Serve la partita IVA?",
        a: "Non necessariamente per iniziare: per incarichi singoli esistono forme di lavoro autonomo occasionale previste dalla legge. Per collaborazioni continuative o strutturate serve la partita IVA (Percorso B). In ogni caso, l'inquadramento corretto lo verifichiamo insieme prima di partire.",
      },
      {
        q: "Come e quanto vengo pagato?",
        a: "Il compenso si concorda per iscritto prima di iniziare il progetto, insieme a oggetto e scadenza. A consegna accettata, il pagamento è puntuale, con ricevuta o fattura secondo il tuo inquadramento.",
      },
      {
        q: "Da dove posso lavorare?",
        a: "Da dove vuoi, in Italia. Siamo remote-native: contano la consegna e la reperibilità concordata, non la sedia.",
      },
      {
        q: "È un contratto di lavoro dipendente?",
        a: "No, e non lo diventerà: Alpacode non assume personale. Offriamo collaborazioni di lavoro autonomo — su progetto o tra partite IVA — regolate da un accordo scritto.",
      },
      {
        q: "Che succede se non rispetto la scadenza?",
        a: "Le scadenze si concordano insieme, con margini realistici. Se qualcosa si mette male, lo diciamo prima: un ritardo comunicato si gestisce, uno scoperto a consegna no.",
      },
    ],

    crossTag: "Porti clienti invece di produrre?",
    crossTitle: "C'è il programma partner.",
    crossBody:
      "Se il tuo forte è la rete — clienti, contatti, un pubblico che si fida — il programma partner ti riserva una nicchia e un'area: tu porti le opportunità, noi costruiamo.",
    crossCta: "Scopri il programma partner",

    formKicker: "§ 07 — Candidati",
    formTitle: "Presentati.",
    formLede:
      "Nessun impegno: raccontaci chi sei e mostraci qualcosa di tuo. Ti rispondiamo in fretta, anche quando la risposta è «non ancora».",
    formLabels: {
      name: "Nome e cognome",
      namePlaceholder: "Maria Rossi",
      email: "Email",
      emailPlaceholder: "nome@dominio.it",
      phone: "Telefono (opzionale)",
      phonePlaceholder: "+39 …",
      profession: "Il tuo mestiere",
      professions: [
        "Grafico/a",
        "Designer",
        "Sviluppatore/trice",
        "Marketer",
        "Social media manager",
        "Altro",
      ],
      zone: "Portfolio o link (opzionale)",
      zonePlaceholder: "sito, Behance, GitHub, profilo…",
      message: "Due righe su di te",
      messagePlaceholder: "Cosa sai fare, con che strumenti, su che disponibilità.",
      send: "Invia la candidatura",
      consent:
        "Ho letto la privacy policy e acconsento al trattamento dei dati per essere ricontattato/a.",
      confirm: "GRAZIE — TI RISPONDIAMO PRESTO",
      error: "QUALCOSA È ANDATO STORTO — RIPROVA O SCRIVICI VIA EMAIL",
    },
  },

  en: {
    hero: {
      crumb: "§ 09 — Work with us",
      line1: "Good at your craft?",
      line2: "We bring the rest.",
      lede: "We're looking for collaborators for single tasks or entire projects: you bring the craft, we bring clients, method and infrastructure. From anywhere in Italy, with clear written agreements.",
    },

    remoteKicker: "§ 01 — Remote-native",
    remoteTitle: "Talent has no address.",
    remoteLede:
      "Alpacode was born distributed: no office to commute to, no hours lost on the road. What counts is the work delivered and the standards it's built to.",
    remotePoints: [
      {
        k: "From all of Italy",
        v: "City or countryside, north or south: if the work meets our standards, geography is not a requirement.",
      },
      {
        k: "Tasks or entire projects",
        v: "An illustration, a landing page, a complete management system: collaborations sized to fit you.",
      },
      {
        k: "Async by default",
        v: "Few calls — only the ones that matter. Written briefs, clear deadlines, shared tools.",
      },
    ],

    pathsKicker: "§ 02 — The two tracks",
    pathsTitle: "Two ways to collaborate. Both fully compliant.",
    pathsLede:
      "Whichever track fits, the principle stays the same: autonomous work, a written agreement, compensation defined before starting.",
    paths: [
      {
        tag: "Track A",
        title: "Project-based, inside our pipeline",
        body: "For those who want defined assignments — even without a structure of their own. We handle the client, the contract and the guarantees; you focus on the work.",
        steps: [
          {
            n: "01",
            t: "Intro call",
            d: "A call to understand level, tools and ambitions. Portfolio in hand, no formalities.",
          },
          {
            n: "02",
            t: "Standards",
            d: "We keep the bar high: if the level is there, you're in. If not yet, we tell you what's missing — honestly.",
          },
          {
            n: "03",
            t: "Full freedom, one rule",
            d: "Your hours, your method, your tools. The only constraint is the deadline we agree on together at the start.",
          },
          {
            n: "04",
            t: "Delivery and compensation",
            d: "Your compensation is set in writing before you start. Once the delivery is accepted, payment is prompt.",
          },
        ],
        note: "Framed as autonomous work, in the forms the law provides for your case (occasional self-employment or VAT number).",
      },
      {
        tag: "Track B",
        title: "Freelancer to freelancer",
        body: "The classic relationship between professionals: assignments, subcontracting or complete outsourcing of an area. Contract, invoice, clear timelines and responsibilities.",
        steps: [
          {
            n: "01",
            t: "Introduction",
            d: "Tell us who you are, what you do and at what volume. Studio, freelancer or micro-agency: all welcome.",
          },
          {
            n: "02",
            t: "Framework agreement",
            d: "We define scope, quality standards, timelines and terms — in writing.",
          },
          {
            n: "03",
            t: "Assignments",
            d: "We route single assignments or entire outsourced flows your way, based on capacity and availability.",
          },
          {
            n: "04",
            t: "Invoice and payment",
            d: "You invoice Alpacode per the agreement. Payments within the agreed terms, no chasing.",
          },
        ],
        note: "For ongoing or structured collaborations, this is the right track from day one.",
      },
    ],

    ruleKicker: "§ 03 — The rule",
    ruleTitle: "Compliant collaborations only.",
    ruleBody:
      "Alpacode operates under Italy's flat-rate regime and does not employ staff: every collaboration is autonomous work, in the forms provided by law. It's not small print — it's the starting pact.",
    rulePoints: [
      "No employment relationships, declared or disguised.",
      "Always a written agreement: scope, deadline, compensation and usage rights, before starting.",
      "Real autonomy: no imposed hours, no fixed desk — the delivery is what counts.",
      "Every payment goes through a receipt or invoice, according to your status.",
    ],

    figuresKicker: "§ 04 — Who we look for",
    figuresTitle: "Five crafts, one threshold: quality.",
    figuresLede:
      "Single collaborations or entire outsourced flows. What never changes is the standard.",
    figures: [
      {
        role: "Graphic artists",
        d: "Identity, illustration, campaign material. Brutalist taste welcome.",
      },
      {
        role: "Designers",
        d: "UI and UX for sites and products: from Figma to design systems, with real attention to accessibility.",
      },
      {
        role: "Developers",
        d: "WordPress, Astro, React, management systems. Clean code, performance, no shortcuts.",
      },
      {
        role: "Marketers",
        d: "Campaigns, funnels, copy that sells without shouting. Measure before you promise.",
      },
      {
        role: "Social media managers",
        d: "Channel and content management for the clients we bring online. Method, not improvisation.",
      },
    ],
    figuresFoot:
      "Don't see yourself here but you're rare at something? Write anyway: good exceptions interest us.",

    howKicker: "§ 05 — How it starts",
    howTitle: "From the form to the first project.",
    howSteps: [
      {
        n: "01",
        t: "Apply",
        d: "Fill in the form below with a portfolio or link. Two minutes, zero bureaucracy.",
      },
      {
        n: "02",
        t: "Intro call",
        d: "If there's potential we write you for a call: level, tools, expectations.",
      },
      {
        n: "03",
        t: "First project",
        d: "We start with a real, contained assignment — deadline and compensation in writing.",
      },
      {
        n: "04",
        t: "Collaboration",
        d: "If the delivery holds the standard, the loop continues: more projects, more trust, more autonomy.",
      },
    ],

    faqKicker: "§ 06 — Questions",
    faqTitle: "Quick answers.",
    faq: [
      {
        q: "Do I need a VAT number?",
        a: "Not necessarily to start: for single assignments, Italian law provides forms of occasional self-employment. Ongoing or structured collaborations require a VAT number (Track B). Either way, we verify the correct framing together before starting.",
      },
      {
        q: "How and how much do I get paid?",
        a: "Compensation is agreed in writing before the project starts, together with scope and deadline. Once the delivery is accepted, payment is prompt, with a receipt or invoice according to your status.",
      },
      {
        q: "Where can I work from?",
        a: "From wherever you want, in Italy. We're remote-native: what counts is the delivery and the agreed availability, not the chair.",
      },
      {
        q: "Is this an employment contract?",
        a: "No, and it won't become one: Alpacode doesn't employ staff. We offer autonomous collaborations — project-based or freelancer to freelancer — governed by a written agreement.",
      },
      {
        q: "What if I miss the deadline?",
        a: "Deadlines are agreed together, with realistic margins. If something goes sideways, we say it early: a communicated delay can be managed, a surprise at delivery can't.",
      },
    ],

    crossTag: "Bringing clients instead of producing?",
    crossTitle: "There's the partner program.",
    crossBody:
      "If your strength is your network — clients, contacts, an audience that trusts you — the partner program reserves you a niche and an area: you bring the opportunities, we build.",
    crossCta: "Discover the partner program",

    formKicker: "§ 07 — Apply",
    formTitle: "Introduce yourself.",
    formLede:
      "No commitment: tell us who you are and show us something of yours. We reply quickly, even when the answer is 'not yet'.",
    formLabels: {
      name: "Full name",
      namePlaceholder: "Maria Rossi",
      email: "Email",
      emailPlaceholder: "name@domain.com",
      phone: "Phone (optional)",
      phonePlaceholder: "+39 …",
      profession: "Your craft",
      professions: [
        "Graphic artist",
        "Designer",
        "Developer",
        "Marketer",
        "Social media manager",
        "Other",
      ],
      zone: "Portfolio or link (optional)",
      zonePlaceholder: "website, Behance, GitHub, profile…",
      message: "A couple of lines about you",
      messagePlaceholder: "What you do, with which tools, on what availability.",
      send: "Send application",
      consent:
        "I have read the privacy policy and consent to data processing to be contacted back.",
      confirm: "THANKS — WE'LL GET BACK TO YOU SOON",
      error: "SOMETHING WENT WRONG — RETRY OR EMAIL US",
    },
  },
};
