import type { Lang, Localized } from "../i18n/types";
import type { PledgeStatus, QuarterId, QuarterState } from "./report-common";

/* ============================================================
   Impatto sociale — annual report.

   Companion to the environmental report: same four-quarter
   structure, same discipline, a different subject.

   THE RULES ARE THE ENVIRONMENTAL REPORT'S RULES
   ----------------------------------------------
   1. NO INVENTED RESULTS. Every figure is a plain internal count
      or is DERIVED in code from those counts. If it can't be
      taken out of our own records, it doesn't go on the page.

   2. THE COUNTS ARE THE ONLY THING TO EDIT. Close a quarter by
      setting `state: "closed"` and filling its `input`. Shares,
      totals and charts follow.

   3. WE COUNT WHAT WE DO, NOT WHAT IT CAUSED. No client revenue,
      no jobs created, no "lives changed". Those depend on a
      hundred things that aren't us, and claiming them would be
      the whole reason nobody believes impact reports. What each
      indicator means is spelled out on the page, in the method
      block — an indicator whose definition can't be written in
      one sentence doesn't belong here.
   ============================================================ */

/* ============================================================
   PART 1 — Counts and derived figures
   ============================================================ */

/**
 * Raw operational counts for one quarter. All are integers taken
 * from the studio's own register.
 */
export interface QuarterInput {
  /** Projects started for individuals, artisans and small businesses. */
  projects: number;
  /** Of those, priced in full and agreed in writing before starting. */
  fixedPriceProjects: number;
  /** Businesses brought online for the first time (no site before). */
  firstTimeOnline: number;
  /** Of those projects, handed over with written docs + a training session. */
  handoverDocumented: number;
  /** Projects for businesses outside the metropolitan-city capitals. */
  projectsOutsideMetro: number;
  /** Classroom hours actually delivered, in person or on call. */
  trainingHours: number;
  /** Distinct people trained in the quarter. */
  peopleTrained: number;
  /** Guides and articles published free, no sign-up, no email wall. */
  freeResources: number;
}

export interface Quarter {
  q: QuarterId;
  /** Months covered — numeric so it reads the same in both languages. */
  months: string;
  state: QuarterState;
  /** Present only for closed quarters. */
  input?: QuarterInput;
  note: Localized;
}

export interface ReportYear {
  year: number;
  /** Reporting cut-off, dd.mm.yyyy. */
  updated: string;
  status: Localized;
  /**
   * Italian regions with at least one delivery during the year.
   * NOT additive across quarters (the same region recurs), so it is
   * declared once for the year instead of being summed.
   */
  regions: number;
  quarters: Quarter[];
  pledges: PledgeStatus[];
}

/* ------------------------------------------------------------
   THE DATA. Add a new object at the top of the array each
   January; close each quarter as it ends.
   ------------------------------------------------------------ */
export const REPORT_YEARS: ReportYear[] = [
  {
    year: 2026,
    updated: "30.06.2026",
    status: {
      it: "Anno in corso — Q1 e Q2 chiusi, Q3 in corso.",
      en: "Year in progress — Q1 and Q2 closed, Q3 running.",
    },
    regions: 5,
    quarters: [
      {
        q: "Q1",
        months: "01 — 03",
        state: "closed",
        input: {
          projects: 7,
          fixedPriceProjects: 7,
          firstTimeOnline: 3,
          handoverDocumented: 6,
          projectsOutsideMetro: 4,
          trainingHours: 32,
          peopleTrained: 14,
          freeResources: 2,
        },
        note: {
          it: "Tre attività portate online per la prima volta. Una consegna è andata senza sessione di formazione: il cliente aveva già una persona interna che gestiva il sito.",
          en: "Three businesses brought online for the first time. One handover went without a training session: the client already had someone in-house running the site.",
        },
      },
      {
        q: "Q2",
        months: "04 — 06",
        state: "closed",
        input: {
          projects: 9,
          fixedPriceProjects: 9,
          firstTimeOnline: 4,
          handoverDocumented: 8,
          projectsOutsideMetro: 6,
          trainingHours: 44,
          peopleTrained: 19,
          freeResources: 3,
        },
        note: {
          it: "Trimestre più pieno del precedente e più spostato fuori dalle città capoluogo. Una consegna resta senza documentazione completa: è un arretrato, non una scelta.",
          en: "A fuller quarter than the previous one, and one weighted further outside the main cities. One handover is still short of full documentation: that's a backlog, not a choice.",
        },
      },
      {
        q: "Q3",
        months: "07 — 09",
        state: "open",
        note: {
          it: "In corso. I dati vengono pubblicati alla chiusura del trimestre.",
          en: "In progress. Figures are published when the quarter closes.",
        },
      },
      {
        q: "Q4",
        months: "10 — 12",
        state: "upcoming",
        note: { it: "Non ancora iniziato.", en: "Not started yet." },
      },
    ],
    pledges: [
      {
        t: { it: "Prezzo deciso prima, sempre", en: "Price agreed up front, always" },
        state: "done",
        note: {
          it: "Tutti i progetti dei trimestri chiusi sono partiti con il prezzo pieno concordato per iscritto.",
          en: "Every project in the closed quarters started with the full price agreed in writing.",
        },
      },
      {
        t: {
          it: "Documentazione in italiano a ogni consegna",
          en: "Documentation in Italian at every handover",
        },
        state: "doing",
        note: {
          it: "Non ancora al 100%: due consegne su sedici sono uscite senza il pacchetto completo.",
          en: "Not at 100% yet: two handovers out of sixteen went out without the full package.",
        },
      },
      {
        t: {
          it: "Guide gratuite, senza registrazione",
          en: "Free guides, no sign-up",
        },
        state: "done",
        note: {
          it: "Tutto quello che pubblichiamo sul blog è leggibile senza account e senza lasciare l'email.",
          en: "Everything we publish on the blog is readable without an account and without leaving an email.",
        },
      },
      {
        t: {
          it: "Corsi accessibili anche a chi parte da zero",
          en: "Courses that work for people starting from zero",
        },
        state: "doing",
        note: {
          it: "Ogni percorso ha un ingresso base. Sul supporto dopo l'aula stiamo ancora sistemando i tempi di risposta.",
          en: "Every track has a beginner entry point. We're still tightening response times on post-class support.",
        },
      },
      {
        t: {
          it: "Pubblicare questo report ogni anno",
          en: "Publish this report every year",
        },
        state: "doing",
        note: {
          it: "Prima edizione. Aggiornata alla chiusura di ogni trimestre.",
          en: "First edition. Updated at the close of each quarter.",
        },
      },
    ],
  },
];

/* ------------------------------------------------------------
   Derived figures — the only place a number is ever produced.
   ------------------------------------------------------------ */

export interface Totals extends QuarterInput {
  closedQuarters: number;
}

const EMPTY: Totals = {
  projects: 0,
  fixedPriceProjects: 0,
  firstTimeOnline: 0,
  handoverDocumented: 0,
  projectsOutsideMetro: 0,
  trainingHours: 0,
  peopleTrained: 0,
  freeResources: 0,
  closedQuarters: 0,
};

/** Sum of the closed quarters only. Open quarters contribute nothing. */
export function yearTotals(year: ReportYear): Totals {
  return year.quarters
    .filter((q) => q.state === "closed" && q.input)
    .reduce<Totals>(
      (acc, q) => {
        const i = q.input!;
        return {
          projects: acc.projects + i.projects,
          fixedPriceProjects: acc.fixedPriceProjects + i.fixedPriceProjects,
          firstTimeOnline: acc.firstTimeOnline + i.firstTimeOnline,
          handoverDocumented: acc.handoverDocumented + i.handoverDocumented,
          projectsOutsideMetro: acc.projectsOutsideMetro + i.projectsOutsideMetro,
          trainingHours: acc.trainingHours + i.trainingHours,
          peopleTrained: acc.peopleTrained + i.peopleTrained,
          freeResources: acc.freeResources + i.freeResources,
          closedQuarters: acc.closedQuarters + 1,
        };
      },
      { ...EMPTY },
    );
}

/** Percentage of `part` over `whole`, rounded. 0 when there is nothing yet. */
export function share(part: number, whole: number): number {
  return whole > 0 ? Math.round((part / whole) * 100) : 0;
}

/* ============================================================
   PART 2 — Page copy
   ============================================================ */

export interface ImpactCopy {
  hero: {
    crumb: string;
    line1: string;
    line2: string;
    lede: string;
    cta1: string;
    cta2: string;
  };
  scopeLabel: string;
  scopeValue: string;
  updatedLabel: string;
  natureLabel: string;
  natureValue: string;

  yearLabel: string;
  archiveLabel: string;

  /** The framing: the gap we're trying to close. */
  gapKicker: string;
  gapTitle: string;
  gapLede: string;
  pillars: { n: string; t: string; d: string; k: string }[];

  /** KPI tiles — order matches the values assembled in the component. */
  kpiKicker: string;
  kpiTitle: string;
  kpiLede: string;
  kpi: { k: string; unit: string; d: string }[];
  partialNote: string;

  /** The three share meters. */
  metersTitle: string;
  meters: { k: string; d: string }[];
  meterOf: string;

  /** Small multiples. */
  chartKicker: string;
  chartTitle: string;
  chartLede: string;
  facets: { t: string; unit: string }[];
  chartNoData: string;
  chartCaption: string;

  /** Quarter detail. */
  quartersKicker: string;
  quartersTitle: string;
  quartersLede: string;
  stateLabel: Record<QuarterState, string>;
  rows: {
    projects: string;
    firstTimeOnline: string;
    fixedPriceProjects: string;
    handoverDocumented: string;
    projectsOutsideMetro: string;
    trainingHours: string;
    peopleTrained: string;
    freeResources: string;
  };

  /** Pledge status. */
  pledgeKicker: string;
  pledgeTitle: string;
  pledgeState: Record<PledgeStatus["state"], string>;

  /** Method — here honesty lives in the definitions, not in factors. */
  methodKicker: string;
  methodTitle: string;
  methodLede: string;
  definitions: { t: string; d: string }[];

  /** Boundary & limits. */
  boundaryKicker: string;
  boundaryTitle: string;
  boundaryLede: string;
  boundaryPoints: string[];

  /** Foot. */
  crossTag: string;
  crossTitle: string;
  crossBody: string;
  crossCta: string;
  contactTitle: string;
  contactBody: string;
  contactCta: string;
}

export const impatto: Record<Lang, ImpactCopy> = {
  it: {
    hero: {
      crumb: "§ 11 — Report di impatto sociale",
      line1: "Report di",
      line2: "impatto sociale.",
      lede: "Il divario digitale in Italia non riguarda solo le persone: riguarda le piccole attività che non possono permettersi la digitalizzazione, o che ne sono state scottate. Il nostro impatto sociale è tutto lì. Quattro trimestri, conteggi interni, con la definizione di ogni indicatore in fondo alla pagina.",
      cta1: "Vai ai trimestri",
      cta2: "Come contiamo",
    },
    scopeLabel: "Perimetro",
    scopeValue: "Privati, artigiani e piccole attività",
    updatedLabel: "Aggiornato al",
    natureLabel: "Natura dei dati",
    natureValue: "Conteggi interni, non certificati",

    yearLabel: "Anno",
    archiveLabel: "Archivio",

    gapKicker: "§ 01 — Il divario",
    gapTitle: "Tre cose, non venti.",
    gapLede:
      "Un impatto sociale credibile è corto. Il nostro sta in tre righe, e ogni riga ha dei numeri che la seguono nel resto della pagina.",
    pillars: [
      {
        n: "01",
        k: "Accessibilità",
        t: "Rendiamo la digitalizzazione accessibile.",
        d: "Lavoriamo con privati, artigiani e piccole imprese con prezzi chiari decisi prima di partire e soluzioni proporzionate al budget — senza preventivi da capogiro. Una piccola attività digitalizzata bene resta aperta, assume, tiene vivo il territorio.",
      },
      {
        n: "02",
        k: "Autonomia",
        t: "Rendiamo le persone autonome, non dipendenti da noi.",
        d: "Quello che impariamo lo lasciamo: corsi pratici, guide gratuite sul blog, documentazione in italiano, formazione con supporto anche dopo l'aula. Il successo per noi è un cliente che non ha più bisogno di chiamarci per ogni modifica.",
      },
      {
        n: "03",
        k: "Territorio",
        t: "Partiamo dal territorio.",
        d: "Siamo di Monza e Milano e lavoriamo in tutta Italia da remoto, portando alle attività locali competenze che di solito si fermano nelle grandi città.",
      },
    ],

    kpiKicker: "§ 02 — Sintesi dell'anno",
    kpiTitle: "I numeri, in quattro righe.",
    kpiLede:
      "Somma dei trimestri chiusi. I trimestri ancora aperti non contribuiscono: nessuna proiezione, nessuna stima anticipata.",
    kpi: [
      {
        k: "Progetti avviati",
        unit: "privati e piccole attività",
        d: "Lavori partiti con accordo scritto per un privato, un artigiano o un'impresa sotto i dieci addetti.",
      },
      {
        k: "Prime volte online",
        unit: "attività",
        d: "Attività che prima non avevano un sito proprio. I profili social non contano come sito.",
      },
      {
        k: "Formazione erogata",
        unit: "ore d'aula",
        d: "Ore effettivamente tenute, in presenza o in call. Preparazione e supporto post-corso esclusi.",
      },
      {
        k: "Persone formate",
        unit: "partecipanti distinti",
        d: "Chi segue due corsi nello stesso trimestre viene contato una volta sola.",
      },
    ],
    partialNote: "Dato parziale: comprende solo i trimestri chiusi.",

    metersTitle: "Le tre quote che ci interessano",
    meters: [
      {
        k: "Progetti a prezzo deciso prima",
        d: "Prezzo pieno concordato per iscritto prima di iniziare il lavoro.",
      },
      {
        k: "Consegne con documentazione e formazione",
        d: "Documentazione scritta in italiano più una sessione di formazione al passaggio di consegne.",
      },
      {
        k: "Progetti fuori dalle grandi città",
        d: "Attività in comuni che non sono capoluoghi di città metropolitana.",
      },
    ],
    meterOf: "su",

    chartKicker: "§ 03 — Andamento trimestrale",
    chartTitle: "Come si distribuisce l'anno.",
    chartLede:
      "Due grandezze diverse, due grafici separati: mettere progetti e ore sullo stesso asse le farebbe sembrare confrontabili, e non lo sono.",
    facets: [
      { t: "Progetti avviati", unit: "progetti" },
      { t: "Formazione erogata", unit: "ore d'aula" },
    ],
    chartNoData: "Nessun dato",
    chartCaption:
      "Ogni grafico ha la sua scala, perché misura una cosa diversa: le altezze si leggono dentro un riquadro, mai tra un riquadro e l'altro. I valori esatti sono nella tabella qui sotto.",

    quartersKicker: "§ 04 — Trimestre per trimestre",
    quartersTitle: "Il dettaglio.",
    quartersLede:
      "Gli stessi indicatori per ogni trimestre, così che due anni diversi restino confrontabili.",
    stateLabel: { closed: "Chiuso", open: "In corso", upcoming: "Da aprire" },
    rows: {
      projects: "Progetti avviati",
      firstTimeOnline: "Prime volte online",
      fixedPriceProjects: "A prezzo deciso prima",
      handoverDocumented: "Consegne documentate",
      projectsOutsideMetro: "Fuori dalle grandi città",
      trainingHours: "Ore di formazione",
      peopleTrained: "Persone formate",
      freeResources: "Risorse gratuite pubblicate",
    },

    pledgeKicker: "§ 05 — Stato degli impegni",
    pledgeTitle: "Cosa abbiamo mantenuto.",
    pledgeState: { done: "Rispettato", doing: "In corso", planned: "Programmato" },

    methodKicker: "§ 06 — Metodo",
    methodTitle: "Cosa vuol dire ogni numero.",
    methodLede:
      "Qui non ci sono formule: ci sono definizioni. Un indicatore la cui definizione non sta in una riga è un indicatore che serve a gonfiare, e non lo mettiamo.",
    definitions: [
      {
        t: "Progetto avviato",
        d: "Un lavoro partito con accordo scritto per un privato, un artigiano o un'impresa sotto i dieci addetti. Un cliente che torna con un secondo lavoro conta due volte; un lavoro diviso in fasi conta una volta sola.",
      },
      {
        t: "Prima volta online",
        d: "Il cliente non aveva un sito proprio prima di lavorare con noi. Una pagina Facebook o un profilo Instagram non contano come sito.",
      },
      {
        t: "Prezzo deciso prima",
        d: "Il prezzo pieno del lavoro è concordato per iscritto prima di iniziare. Le varianti richieste in corsa vengono quotate a parte e non tolgono il progetto dal conteggio.",
      },
      {
        t: "Consegna documentata",
        d: "Alla consegna il cliente riceve documentazione scritta in italiano e una sessione di formazione su come gestire quello che gli abbiamo costruito.",
      },
      {
        t: "Fuori dalle grandi città",
        d: "L'attività ha sede in un comune che non è capoluogo di città metropolitana.",
      },
      {
        t: "Ore di formazione e persone formate",
        d: "Ore d'aula effettivamente erogate, in presenza o in call; partecipanti distinti nel trimestre. Preparazione, materiali e supporto dopo il corso non sono contati.",
      },
      {
        t: "Risorsa gratuita",
        d: "Guida o articolo pubblicato sul blog, leggibile senza account e senza lasciare l'email.",
      },
      {
        t: "Regioni raggiunte",
        d: "Regioni italiane in cui abbiamo consegnato almeno un lavoro nell'anno. Non è un dato sommabile fra trimestri, quindi è dichiarato una volta sola per l'anno.",
      },
    ],

    boundaryKicker: "§ 07 — Perimetro e limiti",
    boundaryTitle: "Cosa non c'è in questi numeri.",
    boundaryLede:
      "Le voci che mancano sono quelle che farebbero più bella figura. Mancano apposta.",
    boundaryPoints: [
      "Non misuriamo i risultati dei clienti: fatturato, clienti acquisiti, posti di lavoro. Sarebbero i numeri più belli da mettere qui, ma su quei risultati incidono cento cose che non dipendono da noi, e attribuirceli sarebbe disonesto.",
      "Non misuriamo se chi si è formato con noi ha poi trovato lavoro. Non abbiamo modo di seguirlo nel tempo, e i dati che circolano su questo di solito sono raccolti male.",
      "Il lavoro per aziende strutturate non entra in questo report. Lo facciamo, ma non è impatto sociale: è lavoro.",
      "Non abbiamo un programma di volontariato o di donazioni da rendicontare. Se un giorno ci sarà, comparirà qui con i suoi numeri, non prima.",
      "I conteggi sono interni e non verificati da terzi: non c'è un revisore, c'è un registro che teniamo noi e le definizioni scritte qui sopra.",
    ],

    crossTag: "L'altro report",
    crossTitle: "Sostenibilità ambientale.",
    crossBody:
      "L'altro impegno che rendicontiamo con lo stesso metodo: pendolarismo evitato, documenti solo digitali, trasferte sottratte dal saldo.",
    crossCta: "Apri il report ambientale",
    contactTitle: "Domande su questi numeri?",
    contactBody:
      "Se un conteggio non ti torna, o pensi che una definizione sia comoda, scrivici: le correzioni finiscono nella prossima edizione, con la data.",
    contactCta: "Scrivici",
  },

  en: {
    hero: {
      crumb: "§ 11 — Social impact report",
      line1: "Social impact",
      line2: "report.",
      lede: "Italy's digital divide isn't only about people: it's about the small businesses that can't afford digitalisation, or that got burned by it. That's where our social impact sits. Four quarters, internal counts, with the definition of every indicator at the foot of the page.",
      cta1: "Go to the quarters",
      cta2: "How we count",
    },
    scopeLabel: "Boundary",
    scopeValue: "Individuals, artisans and small businesses",
    updatedLabel: "Updated to",
    natureLabel: "Nature of the data",
    natureValue: "Internal counts, not certified",

    yearLabel: "Year",
    archiveLabel: "Archive",

    gapKicker: "§ 01 — The gap",
    gapTitle: "Three things, not twenty.",
    gapLede:
      "A credible social impact is short. Ours fits in three lines, and every line has numbers following it through the rest of the page.",
    pillars: [
      {
        n: "01",
        k: "Access",
        t: "We make digitalisation affordable.",
        d: "We work with individuals, artisans and small businesses at clear prices agreed before starting, with solutions sized to the budget — no eye-watering quotes. A small business that is digitalised well stays open, hires, and keeps its area alive.",
      },
      {
        n: "02",
        k: "Independence",
        t: "We make people independent, not dependent on us.",
        d: "What we learn we leave behind: hands-on courses, free guides on the blog, documentation in Italian, training with support after the classroom too. Success, for us, is a client who no longer needs to call us for every change.",
      },
      {
        n: "03",
        k: "Territory",
        t: "We start from where we are.",
        d: "We're from Monza and Milan and we work remotely across Italy, bringing local businesses skills that usually stop inside the big cities.",
      },
    ],

    kpiKicker: "§ 02 — Year summary",
    kpiTitle: "The numbers, in four lines.",
    kpiLede:
      "The sum of the closed quarters. Quarters still running contribute nothing: no projections, no early estimates.",
    kpi: [
      {
        k: "Projects started",
        unit: "individuals and small businesses",
        d: "Work begun under a written agreement for an individual, an artisan or a business under ten staff.",
      },
      {
        k: "First time online",
        unit: "businesses",
        d: "Businesses that had no site of their own before. Social profiles don't count as a site.",
      },
      {
        k: "Training delivered",
        unit: "classroom hours",
        d: "Hours actually taught, in person or on call. Preparation and post-class support excluded.",
      },
      {
        k: "People trained",
        unit: "distinct participants",
        d: "Someone attending two courses in the same quarter is counted once.",
      },
    ],
    partialNote: "Partial figure: closed quarters only.",

    metersTitle: "The three shares we care about",
    meters: [
      {
        k: "Projects priced up front",
        d: "Full price agreed in writing before the work started.",
      },
      {
        k: "Handovers with documentation and training",
        d: "Written documentation in Italian plus a training session at handover.",
      },
      {
        k: "Projects outside the big cities",
        d: "Businesses in municipalities that are not metropolitan-city capitals.",
      },
    ],
    meterOf: "of",

    chartKicker: "§ 03 — Quarterly pattern",
    chartTitle: "How the year is spread.",
    chartLede:
      "Two different quantities, two separate charts: putting projects and hours on one axis would make them look comparable, and they are not.",
    facets: [
      { t: "Projects started", unit: "projects" },
      { t: "Training delivered", unit: "classroom hours" },
    ],
    chartNoData: "No data",
    chartCaption:
      "Each chart has its own scale, because each measures a different thing: heights read within a panel, never across panels. The exact figures are in the table below.",

    quartersKicker: "§ 04 — Quarter by quarter",
    quartersTitle: "The detail.",
    quartersLede:
      "The same indicators for every quarter, so that two different years stay comparable.",
    stateLabel: { closed: "Closed", open: "Running", upcoming: "Not started" },
    rows: {
      projects: "Projects started",
      firstTimeOnline: "First time online",
      fixedPriceProjects: "Priced up front",
      handoverDocumented: "Documented handovers",
      projectsOutsideMetro: "Outside the big cities",
      trainingHours: "Training hours",
      peopleTrained: "People trained",
      freeResources: "Free resources published",
    },

    pledgeKicker: "§ 05 — Status of the commitments",
    pledgeTitle: "What we kept.",
    pledgeState: { done: "Kept", doing: "In progress", planned: "Scheduled" },

    methodKicker: "§ 06 — Method",
    methodTitle: "What each number means.",
    methodLede:
      "There are no formulas here: there are definitions. An indicator whose definition doesn't fit on one line is an indicator built to inflate, and we leave it out.",
    definitions: [
      {
        t: "Project started",
        d: "Work begun under a written agreement for an individual, an artisan or a business under ten staff. A client returning with a second job counts twice; a job split into phases counts once.",
      },
      {
        t: "First time online",
        d: "The client had no site of their own before working with us. A Facebook page or an Instagram profile does not count as a site.",
      },
      {
        t: "Priced up front",
        d: "The full price of the work is agreed in writing before it starts. Changes requested mid-way are quoted separately and don't remove the project from the count.",
      },
      {
        t: "Documented handover",
        d: "At handover the client receives written documentation in Italian and a training session on running what we built for them.",
      },
      {
        t: "Outside the big cities",
        d: "The business is based in a municipality that is not a metropolitan-city capital.",
      },
      {
        t: "Training hours and people trained",
        d: "Classroom hours actually delivered, in person or on call; distinct participants in the quarter. Preparation, materials and post-course support are not counted.",
      },
      {
        t: "Free resource",
        d: "A guide or article published on the blog, readable without an account and without leaving an email address.",
      },
      {
        t: "Regions reached",
        d: "Italian regions where we delivered at least one job during the year. It cannot be summed across quarters, so it is stated once for the year.",
      },
    ],

    boundaryKicker: "§ 07 — Boundary and limits",
    boundaryTitle: "What these numbers leave out.",
    boundaryLede:
      "The missing items are the ones that would look best. They're missing on purpose.",
    boundaryPoints: [
      "We don't measure client outcomes: revenue, customers won, jobs created. Those would be the finest numbers to put here, but a hundred things that aren't us feed into them, and claiming them would be dishonest.",
      "We don't measure whether people we trained went on to find work. We have no way of following them over time, and the data that circulates on this is usually badly collected.",
      "Work for larger companies doesn't enter this report. We do it, but it isn't social impact: it's work.",
      "We have no volunteering or donation programme to report. If one day there is, it will appear here with its own numbers, and not before.",
      "The counts are internal and not third-party assured: there is no auditor, there is a register we keep ourselves and the definitions written above.",
    ],

    crossTag: "The other report",
    crossTitle: "Environmental sustainability.",
    crossBody:
      "The other commitment we report with the same method: commuting avoided, digital-only documents, business travel subtracted from the balance.",
    crossCta: "Open the environmental report",
    contactTitle: "Questions about these numbers?",
    contactBody:
      "If a count doesn't add up, or you think a definition is convenient, write to us: corrections go into the next edition, with the date.",
    contactCta: "Write to us",
  },
};
