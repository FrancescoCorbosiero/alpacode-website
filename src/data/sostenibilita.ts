import type { Lang, Localized } from "../i18n/types";

/* ============================================================
   Sostenibilità ambientale — showcase page + annual report.

   Two pages share this file:
     /sostenibilita-ambientale         → the commitment, qualitative
     /sostenibilita-ambientale-report  → the numbers, per quarter

   THREE IRON RULES FOR THIS FILE
   ------------------------------
   1. NO INVENTED RESULTS. Every figure on the report page is
      DERIVED, in code, from the raw inputs in `REPORT_YEARS`
      and the published factors in `FACTORS`. Never hard-code a
      headline number: if it can't be computed from an input,
      it doesn't go on the page.

   2. THE INPUTS ARE THE ONLY THING TO EDIT. Once a quarter,
      close it: set `state: "closed"`, fill its `input`, write
      the note. The totals, the chart and the KPI tiles follow.
      Inputs are internal operational counts — keep the evidence
      (calendar, travel receipts, document register) so the
      numbers stay defensible if anyone asks.

   3. CONSERVATIVE IN BOTH DIRECTIONS. Factors for things we
      AVOID are set at the low end of the public ranges (we
      understate the benefit); factors for what we EMIT are set
      at the high end (we overstate our own footprint). A
      self-reported avoided-emissions number is only worth
      something if it errs against itself.

   No certifications are claimed anywhere. These are internal
   estimates and both pages say so, plainly.
   ============================================================ */

/* ============================================================
   PART 1 — Showcase page copy
   ============================================================ */

export interface SustainData {
  hero: {
    crumb: string;
    line1: string;
    line2: string;
    lede: string;
    cta1: string;
    cta2: string;
    meta: { k: string; v: string }[];
  };

  ticker: string[];

  /* Where the saving actually is — four pillars. */
  savingKicker: string;
  savingTitle: string;
  savingLede: string;
  savings: { n: string; k: string; v: string; d: string }[];

  /* How we actually work — the mechanics. */
  howKicker: string;
  howTitle: string;
  howLede: string;
  howRows: { n: string; t: string; d: string }[];

  /* What we do NOT claim — the honesty band. */
  limitsKicker: string;
  limitsTitle: string;
  limitsLede: string;
  limits: string[];

  /* Commitments. */
  pledgeKicker: string;
  pledgeTitle: string;
  pledgeLede: string;
  pledges: { n: string; t: string; d: string; when: string }[];

  /* Portal card → the report. */
  crossTag: string;
  crossTitle: string;
  crossBody: string;
  crossCta: string;

  /* FAQ (also feeds FAQPage JSON-LD). */
  faqKicker: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const sostenibilita: Record<Lang, SustainData> = {
  it: {
    hero: {
      crumb: "§ 10 — Sostenibilità ambientale",
      line1: "La nostra impronta",
      line2: "è piccola come noi.",
      lede: "Siamo uno studio digitale piccolo e vogliamo che anche la nostra impronta lo sia. L'impegno parte dal modo in cui lavoriamo: remote-native, senza pendolarismo quotidiano né uffici energivori, e completamente paperless — documenti, contratti e fatture solo in digitale.",
      cta1: "Leggi il report",
      cta2: "Come lavoriamo",
      meta: [
        { k: "Modello", v: "Remote-native" },
        { k: "Carta", v: "Zero, dal primo giorno" },
        { k: "Rendicontazione", v: "Report pubblico" },
      ],
    },

    ticker: [
      "REMOTE-NATIVE",
      "ZERO PENDOLARISMO",
      "NESSUN UFFICIO DA SCALDARE",
      "PAPERLESS",
      "FIRMA DIGITALE",
      "TRASFERTE SOLO SE SERVONO",
      "REPORT PUBBLICO",
    ],

    savingKicker: "§ 01 — Dove sta il risparmio",
    savingTitle: "L'impatto minore è quello che non generi.",
    savingLede:
      "Non abbiamo inventato una tecnologia verde. Abbiamo tolto le tre cose che, in uno studio come il nostro, pesano davvero: il tragitto, la sede e la carta.",
    savings: [
      {
        n: "01",
        k: "Pendolarismo",
        v: "Zero km al giorno",
        d: "Nessuno di noi si sposta per andare a lavorare. È la voce più grande della nostra impronta evitata ed è anche la più facile da misurare: chilometri che non facciamo.",
      },
      {
        n: "02",
        k: "Sede",
        v: "Nessun ufficio",
        d: "Niente metri quadri da riscaldare d'inverno, raffrescare d'estate e illuminare tutto il giorno. Niente arredi da produrre, niente ristrutturazioni, niente pulizie settimanali.",
      },
      {
        n: "03",
        k: "Carta",
        v: "Solo digitale",
        d: "Preventivi, contratti e fatture nascono e restano digitali, con firma elettronica. Non stampiamo, non spediamo, non archiviamo faldoni.",
      },
      {
        n: "04",
        k: "Hardware",
        v: "Poche macchine, tenute a lungo",
        d: "Un portatile per persona, usato finché fa il suo lavoro. La sostituzione anticipata è la parte più sporca dell'informatica, e la evitiamo.",
      },
    ],

    howKicker: "§ 02 — Il metodo",
    howTitle: "Come lavoriamo davvero.",
    howLede:
      "Nessuna di queste è una scelta eroica: sono le condizioni normali di uno studio nato remote. Le scriviamo perché siano verificabili, non perché siano straordinarie.",
    howRows: [
      {
        n: "01",
        t: "Riunioni in call",
        d: "Ci parliamo in videochiamata, con appunti condivisi. Ci vediamo di persona quando la cosa lo merita davvero, non per abitudine o per protocollo.",
      },
      {
        n: "02",
        t: "Documenti solo digitali",
        d: "Proposte, contratti e fatture in PDF, firmati elettronicamente. La fattura elettronica è già obbligatoria in Italia: abbiamo esteso lo stesso principio a tutto il resto, archivio compreso.",
      },
      {
        n: "03",
        t: "Infrastruttura condivisa",
        d: "I siti che consegniamo girano su cloud AWS con CDN: capacità condivisa e dimensionata sul traffico reale, non macchine sempre accese in un armadio a fare niente.",
      },
      {
        n: "04",
        t: "Codice leggero",
        d: "Progettiamo per Core Web Vitals alti. Una pagina che pesa meno consuma meno banda e meno batteria su ogni dispositivo che la apre: moltiplicato per i visitatori, conta.",
      },
      {
        n: "05",
        t: "Trasferte scelte",
        d: "Ci muoviamo per i clienti quando serve, e quando c'è un collegamento sensato lo facciamo in treno. I chilometri che facciamo finiscono nel report e vengono sottratti dal risparmio.",
      },
    ],

    limitsKicker: "§ 03 — Onestà",
    limitsTitle: "Quello che non diciamo.",
    limitsLede:
      "Un impegno serio si riconosce anche da quello che non promette. Quattro cose che non affermiamo, per non farvele leggere tra le righe.",
    limits: [
      "Non siamo un'azienda certificata. Non abbiamo ISO 14001 né B Corp e non ci mettiamo addosso etichette che non abbiamo.",
      "Non compriamo crediti di carbonio per dichiararci neutrali. Preferiamo ridurre quello che dipende da noi e dire il resto senza azzerarlo sulla carta.",
      "Il digitale non è a impatto zero: server, reti e dispositivi consumano. Lavorare da remoto sposta anche una parte dei consumi nelle case di chi lavora.",
      "I numeri del report sono stime interne, calcolate con un metodo scritto e rifacibile da chiunque. Non sono un bilancio verificato da terzi.",
    ],

    pledgeKicker: "§ 04 — Impegni",
    pledgeTitle: "Cosa ci impegniamo a fare.",
    pledgeLede: "Pochi, concreti, verificabili. Il report annuale dice se li abbiamo rispettati.",
    pledges: [
      {
        n: "01",
        t: "Restare paperless",
        d: "Nessun documento stampato per l'attività di studio: preventivi, contratti, fatture e archivio solo in digitale.",
        when: "Continuo",
      },
      {
        n: "02",
        t: "Pubblicare il report ogni anno",
        d: "Quattro trimestri, gli stessi indicatori, lo stesso metodo. Anche negli anni in cui i numeri peggiorano.",
        when: "Ogni anno",
      },
      {
        n: "03",
        t: "Treno prima dell'auto",
        d: "Per le trasferte oltre i 100 km scegliamo il treno ogni volta che esiste un collegamento sensato.",
        when: "Continuo",
      },
      {
        n: "04",
        t: "Allungare la vita dell'hardware",
        d: "Riparazione prima della sostituzione, macchine tenute finché fanno il loro lavoro, ricollocazione o riciclo certificato a fine vita.",
        when: "Continuo",
      },
      {
        n: "05",
        t: "Chiedere conto ai fornitori",
        d: "A parità di condizioni preferiamo fornitori cloud con impegni pubblici e documentati sull'energia rinnovabile.",
        when: "Continuo",
      },
    ],

    crossTag: "Report",
    crossTitle: "I numeri, trimestre per trimestre.",
    crossBody:
      "Chilometri di pendolarismo non percorsi, documenti non stampati, trasferte effettuate e sottratte dal saldo. Con il metodo di calcolo e i fattori usati, in fondo alla pagina.",
    crossCta: "Apri il report",

    faqKicker: "§ 05 — Domande",
    faqTitle: "Le domande scomode.",
    faq: [
      {
        q: "Il lavoro da remoto è davvero più ecologico?",
        a: "Per uno studio come il nostro sì, e la ragione è banale: il pendolarismo quotidiano è la voce più pesante e sparisce del tutto. Va però detto che una parte dei consumi si sposta nelle case di chi lavora — riscaldamento ed elettricità che in ufficio sarebbero stati condivisi. Nel nostro caso il saldo resta ampiamente positivo perché non abbiamo mai avuto in parallelo una sede da mantenere.",
      },
      {
        q: "Avete una certificazione ambientale?",
        a: "No. Siamo una microimpresa e non abbiamo certificazioni di terze parti. Quello che pubblichiamo sono stime interne, calcolate con il metodo scritto in fondo al report: chiunque può rifare i conti e contestarli.",
      },
      {
        q: "Come calcolate i chilometri evitati?",
        a: "Persone dello studio, per giorni lavorati, per i chilometri di tragitto andata e ritorno che faremmo con una sede tra Monza e Milano. Il risultato viene moltiplicato per un fattore di emissione medio per auto passeggeri, tenuto volutamente al minimo dell'intervallo pubblico. Il metodo completo, con i fattori, è nel report.",
      },
      {
        q: "Compensate le emissioni residue?",
        a: "No, e non è una dimenticanza. Non compriamo crediti di carbonio: preferiamo ridurre quello che dipende da noi e dichiarare il resto, invece di azzerarlo contabilmente.",
      },
      {
        q: "Lavorate anche con clienti lontani?",
        a: "Sì, in tutta Italia, ed è parte del punto: il progetto viaggia, le persone no. Quando una trasferta serve davvero la facciamo, la scriviamo nel report e la sottraiamo dal risparmio dichiarato.",
      },
    ],
  },

  en: {
    hero: {
      crumb: "§ 10 — Environmental sustainability",
      line1: "Our footprint",
      line2: "is as small as we are.",
      lede: "We're a small digital studio and we want our footprint to be small too. The commitment starts with how we work: remote-native, with no daily commuting and no energy-hungry offices, and entirely paperless — documents, contracts and invoices in digital form only.",
      cta1: "Read the report",
      cta2: "How we work",
      meta: [
        { k: "Model", v: "Remote-native" },
        { k: "Paper", v: "Zero, from day one" },
        { k: "Reporting", v: "Published report" },
      ],
    },

    ticker: [
      "REMOTE-NATIVE",
      "ZERO COMMUTING",
      "NO OFFICE TO HEAT",
      "PAPERLESS",
      "DIGITAL SIGNATURES",
      "TRAVEL ONLY WHEN IT COUNTS",
      "PUBLISHED REPORT",
    ],

    savingKicker: "§ 01 — Where the saving is",
    savingTitle: "The smallest impact is the one you never create.",
    savingLede:
      "We haven't invented a green technology. We removed the three things that actually weigh in a studio like ours: the commute, the office and the paper.",
    savings: [
      {
        n: "01",
        k: "Commuting",
        v: "Zero km a day",
        d: "None of us travels in order to work. It's the largest item in our avoided footprint and also the easiest to measure: kilometres we don't drive.",
      },
      {
        n: "02",
        k: "Premises",
        v: "No office",
        d: "No square metres to heat in winter, cool in summer and light all day long. No furniture to manufacture, no fit-outs, no weekly cleaning.",
      },
      {
        n: "03",
        k: "Paper",
        v: "Digital only",
        d: "Quotes, contracts and invoices are born digital and stay digital, signed electronically. We don't print, we don't post, we don't file folders.",
      },
      {
        n: "04",
        k: "Hardware",
        v: "Few machines, kept for long",
        d: "One laptop per person, used for as long as it does the job. Early replacement is the dirtiest part of computing, and we avoid it.",
      },
    ],

    howKicker: "§ 02 — The method",
    howTitle: "How we actually work.",
    howLede:
      "None of this is heroic: these are the ordinary conditions of a studio born remote. We write them down so they can be checked, not because they're extraordinary.",
    howRows: [
      {
        n: "01",
        t: "Meetings on calls",
        d: "We talk over video, with shared notes. We meet in person when it genuinely deserves it, not out of habit or protocol.",
      },
      {
        n: "02",
        t: "Digital-only documents",
        d: "Proposals, contracts and invoices as PDFs, signed electronically. Electronic invoicing is already mandatory in Italy: we extended the same principle to everything else, archiving included.",
      },
      {
        n: "03",
        t: "Shared infrastructure",
        d: "The sites we ship run on AWS cloud with a CDN: shared capacity sized on real traffic, not machines left running in a cupboard doing nothing.",
      },
      {
        n: "04",
        t: "Lightweight code",
        d: "We design for high Core Web Vitals. A lighter page uses less bandwidth and less battery on every device that opens it: multiplied by the visitors, it counts.",
      },
      {
        n: "05",
        t: "Travel by choice",
        d: "We travel for clients when it's needed, and we take the train whenever there's a sensible connection. The kilometres we do travel go into the report and are subtracted from the saving.",
      },
    ],

    limitsKicker: "§ 03 — Honesty",
    limitsTitle: "What we don't claim.",
    limitsLede:
      "A serious commitment shows in what it refuses to promise. Four things we do not assert, so you don't read them between the lines.",
    limits: [
      "We are not a certified company. We hold neither ISO 14001 nor B Corp, and we don't wear labels we haven't earned.",
      "We don't buy carbon credits to declare ourselves neutral. We'd rather cut what's ours to cut and state the rest instead of zeroing it on paper.",
      "Digital is not zero-impact: servers, networks and devices consume. Working remotely also shifts part of that consumption into the homes of the people working.",
      "The report figures are internal estimates, calculated with a written method anyone can redo. They are not third-party assured accounts.",
    ],

    pledgeKicker: "§ 04 — Commitments",
    pledgeTitle: "What we commit to.",
    pledgeLede: "Few, concrete, checkable. The annual report says whether we kept them.",
    pledges: [
      {
        n: "01",
        t: "Stay paperless",
        d: "No printed documents for studio activity: quotes, contracts, invoices and archives in digital form only.",
        when: "Ongoing",
      },
      {
        n: "02",
        t: "Publish the report every year",
        d: "Four quarters, the same indicators, the same method. Including the years when the numbers get worse.",
        when: "Yearly",
      },
      {
        n: "03",
        t: "Train before car",
        d: "For trips beyond 100 km we take the train every time a sensible connection exists.",
        when: "Ongoing",
      },
      {
        n: "04",
        t: "Extend hardware life",
        d: "Repair before replacement, machines kept as long as they do their job, redeployment or certified recycling at end of life.",
        when: "Ongoing",
      },
      {
        n: "05",
        t: "Hold suppliers to account",
        d: "All else being equal we prefer cloud providers with public, documented renewable-energy commitments.",
        when: "Ongoing",
      },
    ],

    crossTag: "Report",
    crossTitle: "The numbers, quarter by quarter.",
    crossBody:
      "Commuting kilometres never driven, documents never printed, business travel actually taken and subtracted from the balance. With the calculation method and the factors used, at the foot of the page.",
    crossCta: "Open the report",

    faqKicker: "§ 05 — Questions",
    faqTitle: "The awkward questions.",
    faq: [
      {
        q: "Is remote work really greener?",
        a: "For a studio like ours yes, and the reason is mundane: daily commuting is the heaviest item and it disappears entirely. It should be said, though, that part of the consumption shifts into the homes of the people working — heating and electricity that an office would have shared. In our case the balance stays clearly positive because we never kept premises running in parallel.",
      },
      {
        q: "Do you hold an environmental certification?",
        a: "No. We're a micro-business with no third-party certifications. What we publish are internal estimates, calculated with the method written at the foot of the report: anyone can redo the arithmetic and challenge it.",
      },
      {
        q: "How do you calculate the avoided kilometres?",
        a: "Studio people, times worked days, times the round-trip kilometres we would drive with premises between Monza and Milan. That result is multiplied by an average passenger-car emission factor, deliberately taken at the bottom of the published range. The full method, with the factors, is in the report.",
      },
      {
        q: "Do you offset the residual emissions?",
        a: "No, and it isn't an oversight. We don't buy carbon credits: we'd rather cut what depends on us and declare the rest, instead of cancelling it in the accounts.",
      },
      {
        q: "Do you also work with distant clients?",
        a: "Yes, all across Italy, and that's part of the point: the project travels, the people don't. When a trip is genuinely needed we take it, write it into the report and subtract it from the declared saving.",
      },
    ],
  },
};

/* ============================================================
   PART 2 — Report: factors, inputs and derived figures
   ============================================================ */

/**
 * Emission factors. Conservative in both directions — low end of the
 * public range for what we avoid, high end for what we emit — so the
 * net figure always errs against us. Review once a year.
 */
export const FACTORS = {
  /** kg CO₂e per km, average passenger car. ISPRA/ACI put the Italian
   *  fleet average at roughly 120–160 g/km; we take the floor. */
  carKgPerKm: 0.12,
  /** kg CO₂e per passenger-km, rail. Public factors for Italian rail sit
   *  well below this; we take a deliberately high value for our own travel. */
  trainKgPerKm: 0.035,
  /** kg CO₂e per A4 sheet, cradle-to-customer. Office-paper LCA studies
   *  report 4.3–5 g per 80 g/m² sheet; we take the lower half. */
  sheetKgCo2e: 0.0045,
} as const;

/** Sources shown on the page next to the factors, so they can be checked. */
export const FACTOR_SOURCES: Localized<string[]> = {
  it: [
    "Auto passeggeri — banca dati dei fattori di emissione medi del parco circolante italiano (ISPRA), estremo inferiore dell'intervallo.",
    "Treno — fattore per passeggero-km tenuto sopra i valori dichiarati dagli operatori ferroviari italiani.",
    "Carta A4 — studi LCA sulla carta per ufficio da 80 g/m², metà inferiore dell'intervallo pubblicato.",
  ],
  en: [
    "Passenger car — average emission factors for the Italian vehicle fleet (ISPRA), bottom of the range.",
    "Rail — per passenger-km factor kept above the values published by Italian rail operators.",
    "A4 paper — LCA studies on 80 g/m² office paper, lower half of the published range.",
  ],
};

export type QuarterId = "Q1" | "Q2" | "Q3" | "Q4";

/** Closed = counted. Open = running, no figures yet. Upcoming = not started. */
export type QuarterState = "closed" | "open" | "upcoming";

/**
 * Raw operational counts for one quarter. THIS is what gets edited when a
 * quarter closes — everything on the page is derived from these.
 */
export interface QuarterInput {
  /** People in the studio over the quarter. Collaborators are autonomous
   *  and outside the reporting boundary — see the "limits" block. */
  people: number;
  /** Average worked days per person in the quarter. */
  workedDays: number;
  /** Round-trip commute avoided, km per person per worked day. Based on a
   *  notional office between Monza and Milan. */
  commuteKmPerDay: number;
  /** Documents issued and archived digitally instead of printed
   *  (quotes, contracts, invoices), counted as A4 sheets. */
  digitalDocs: number;
  /** Business travel actually taken, km. Remote-native isn't zero travel. */
  travelKmTrain: number;
  travelKmCar: number;
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

export interface PledgeStatus {
  t: Localized;
  state: "done" | "doing" | "planned";
  note: Localized;
}

export interface ReportYear {
  year: number;
  /** Reporting cut-off, dd.mm.yyyy — shown in the header. */
  updated: string;
  /** One line on where the year stands. */
  status: Localized;
  quarters: Quarter[];
  pledges: PledgeStatus[];
}

/* ------------------------------------------------------------
   THE DATA. Add a new object at the top of the array each January;
   close each quarter as it ends. Nothing else needs to change —
   the pages, the chart and the totals read from here.
   ------------------------------------------------------------ */
export const REPORT_YEARS: ReportYear[] = [
  {
    year: 2026,
    updated: "30.06.2026",
    status: {
      it: "Anno in corso — Q1 e Q2 chiusi, Q3 in corso.",
      en: "Year in progress — Q1 and Q2 closed, Q3 running.",
    },
    quarters: [
      {
        q: "Q1",
        months: "01 — 03",
        state: "closed",
        input: {
          people: 2,
          workedDays: 61,
          commuteKmPerDay: 24,
          digitalDocs: 210,
          travelKmTrain: 180,
          travelKmCar: 120,
        },
        note: {
          it: "Trimestre ordinario. Due trasferte dai clienti, una in treno e una in auto per un cantiere non servito dalla ferrovia.",
          en: "An ordinary quarter. Two client visits, one by train and one by car to a site with no rail connection.",
        },
      },
      {
        q: "Q2",
        months: "04 — 06",
        state: "closed",
        input: {
          people: 2,
          workedDays: 62,
          commuteKmPerDay: 24,
          digitalDocs: 240,
          travelKmTrain: 240,
          travelKmCar: 90,
        },
        note: {
          it: "Più documenti del trimestre precedente, tutti digitali. Rapporto treno/auto migliorato sulle trasferte lunghe.",
          en: "More documents than the previous quarter, all digital. A better train-to-car ratio on the longer trips.",
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
        note: {
          it: "Non ancora iniziato.",
          en: "Not started yet.",
        },
      },
    ],
    pledges: [
      {
        t: { it: "Restare paperless", en: "Stay paperless" },
        state: "done",
        note: {
          it: "Nessun documento di studio stampato nei trimestri chiusi.",
          en: "No studio document printed in the closed quarters.",
        },
      },
      {
        t: { it: "Pubblicare il report ogni anno", en: "Publish the report every year" },
        state: "doing",
        note: {
          it: "Prima edizione. Aggiornata alla chiusura di ogni trimestre.",
          en: "First edition. Updated at the close of each quarter.",
        },
      },
      {
        t: { it: "Treno prima dell'auto", en: "Train before car" },
        state: "doing",
        note: {
          it: "Rispettato dove esisteva un collegamento: l'auto è stata usata solo per destinazioni non servite.",
          en: "Kept wherever a connection existed: the car was used only for destinations without rail service.",
        },
      },
      {
        t: { it: "Allungare la vita dell'hardware", en: "Extend hardware life" },
        state: "done",
        note: {
          it: "Nessuna macchina sostituita nei trimestri chiusi.",
          en: "No machine replaced in the closed quarters.",
        },
      },
      {
        t: { it: "Chiedere conto ai fornitori", en: "Hold suppliers to account" },
        state: "planned",
        note: {
          it: "Revisione dei fornitori cloud programmata alla chiusura dell'anno.",
          en: "A review of cloud providers is scheduled at year end.",
        },
      },
    ],
  },
];

/* ------------------------------------------------------------
   Derived figures — the only place a number is ever produced.
   ------------------------------------------------------------ */

export interface QuarterFigures {
  /** Commute kilometres not driven. */
  commuteKm: number;
  /** kg CO₂e avoided by not commuting. */
  commuteKg: number;
  /** kg CO₂e avoided by not printing. */
  paperKg: number;
  /** Sheets never printed. */
  sheets: number;
  /** Business travel actually taken, km. */
  travelKm: number;
  /** kg CO₂e emitted by that travel. */
  travelKg: number;
  /** Avoided, before subtracting our own travel. */
  avoidedKg: number;
  /** Avoided minus emitted — the headline figure. */
  netKg: number;
}

export function quarterFigures(input: QuarterInput): QuarterFigures {
  const commuteKm = input.people * input.workedDays * input.commuteKmPerDay;
  const commuteKg = commuteKm * FACTORS.carKgPerKm;
  const paperKg = input.digitalDocs * FACTORS.sheetKgCo2e;
  const travelKm = input.travelKmTrain + input.travelKmCar;
  const travelKg =
    input.travelKmTrain * FACTORS.trainKgPerKm + input.travelKmCar * FACTORS.carKgPerKm;
  const avoidedKg = commuteKg + paperKg;
  return {
    commuteKm,
    commuteKg,
    paperKg,
    sheets: input.digitalDocs,
    travelKm,
    travelKg,
    avoidedKg,
    netKg: avoidedKg - travelKg,
  };
}

const EMPTY: QuarterFigures = {
  commuteKm: 0,
  commuteKg: 0,
  paperKg: 0,
  sheets: 0,
  travelKm: 0,
  travelKg: 0,
  avoidedKg: 0,
  netKg: 0,
};

/** Sum of the closed quarters only. Open quarters contribute nothing. */
export function yearTotals(year: ReportYear): QuarterFigures & { closedQuarters: number } {
  const closed = year.quarters.filter((q) => q.state === "closed" && q.input);
  const sum = closed.reduce<QuarterFigures>((acc, q) => {
    const f = quarterFigures(q.input!);
    return {
      commuteKm: acc.commuteKm + f.commuteKm,
      commuteKg: acc.commuteKg + f.commuteKg,
      paperKg: acc.paperKg + f.paperKg,
      sheets: acc.sheets + f.sheets,
      travelKm: acc.travelKm + f.travelKm,
      travelKg: acc.travelKg + f.travelKg,
      avoidedKg: acc.avoidedKg + f.avoidedKg,
      netKg: acc.netKg + f.netKg,
    };
  }, EMPTY);
  return { ...sum, closedQuarters: closed.length };
}

/* ============================================================
   PART 3 — Report page copy
   ============================================================ */

export interface ReportCopy {
  hero: {
    crumb: string;
    line1: string;
    line2: string;
    lede: string;
    cta1: string;
    cta2: string;
  };
  /** Header meta cells — `updated` is filled from the year data. */
  scopeLabel: string;
  scopeValue: string;
  updatedLabel: string;
  natureLabel: string;
  natureValue: string;

  yearLabel: string;
  archiveLabel: string;

  /** KPI tiles. */
  kpiKicker: string;
  kpiTitle: string;
  kpiLede: string;
  kpi: { k: string; unit: string; d: string }[];
  partialNote: string;

  /** Chart. */
  chartKicker: string;
  chartTitle: string;
  chartLede: string;
  chartAvoided: string;
  chartEmitted: string;
  chartAxis: string;
  chartNoData: string;
  chartCaption: string;

  /** Quarter detail. */
  quartersKicker: string;
  quartersTitle: string;
  quartersLede: string;
  stateLabel: Record<QuarterState, string>;
  rows: {
    commuteKm: string;
    commuteKg: string;
    sheets: string;
    paperKg: string;
    travelKm: string;
    travelKg: string;
    netKg: string;
  };

  /** Pledge status. */
  pledgeKicker: string;
  pledgeTitle: string;
  pledgeState: Record<PledgeStatus["state"], string>;

  /** Method. */
  methodKicker: string;
  methodTitle: string;
  methodLede: string;
  formulas: { t: string; f: string; d: string }[];
  factorsTitle: string;
  factorRows: { k: string; v: string }[];
  sourcesTitle: string;

  /** Boundary & limits. */
  boundaryKicker: string;
  boundaryTitle: string;
  boundaryLede: string;
  boundaryPoints: string[];

  /** Foot / cross-link. */
  crossTag: string;
  crossTitle: string;
  crossBody: string;
  crossCta: string;
  contactTitle: string;
  contactBody: string;
  contactCta: string;
}

export const report: Record<Lang, ReportCopy> = {
  it: {
    hero: {
      crumb: "§ 10.1 — Report di sostenibilità",
      line1: "Report di",
      line2: "sostenibilità.",
      lede: "Quattro trimestri, gli stessi indicatori ogni anno. I chilometri di pendolarismo che non abbiamo percorso, i documenti che non abbiamo stampato e le trasferte che abbiamo fatto davvero, sottratte dal saldo. Stime interne, con il metodo di calcolo in fondo alla pagina.",
      cta1: "Vai ai trimestri",
      cta2: "Metodo di calcolo",
    },
    scopeLabel: "Perimetro",
    scopeValue: "Le persone dello studio",
    updatedLabel: "Aggiornato al",
    natureLabel: "Natura dei dati",
    natureValue: "Stime interne, non certificate",

    yearLabel: "Anno",
    archiveLabel: "Archivio",

    kpiKicker: "§ 01 — Sintesi dell'anno",
    kpiTitle: "I numeri, in quattro righe.",
    kpiLede:
      "Somma dei trimestri chiusi. I trimestri ancora aperti non contribuiscono: nessuna proiezione, nessuna stima anticipata.",
    kpi: [
      {
        k: "Pendolarismo evitato",
        unit: "km",
        d: "Chilometri di tragitto casa-ufficio che non sono stati percorsi.",
      },
      {
        k: "CO₂e evitata, netta",
        unit: "kg",
        d: "Pendolarismo e carta evitati, meno le emissioni delle trasferte effettuate.",
      },
      {
        k: "Documenti solo digitali",
        unit: "fogli A4 equivalenti",
        d: "Preventivi, contratti e fatture emessi e archiviati senza stampa.",
      },
      {
        k: "Trasferte effettuate",
        unit: "km",
        d: "Chilometri percorsi davvero per i clienti, in treno e in auto.",
      },
    ],
    partialNote: "Dato parziale: comprende solo i trimestri chiusi.",

    chartKicker: "§ 02 — Saldo trimestrale",
    chartTitle: "Evitate sopra, emesse sotto.",
    chartLede:
      "Ogni trimestre su una scala comune, in kg CO₂e. Sopra la linea quello che non abbiamo prodotto, sotto quello che abbiamo prodotto muovendoci. La differenza è il saldo netto.",
    chartAvoided: "Evitate",
    chartEmitted: "Emesse",
    chartAxis: "kg CO₂e",
    chartNoData: "Nessun dato",
    chartCaption:
      "Sopra e sotto la linea la scala è la stessa: un millimetro vale gli stessi kg in entrambe le direzioni. Le barre sotto i 3 pixel sono portate a 3 per restare visibili; i valori esatti sono nella tabella qui sotto.",

    quartersKicker: "§ 03 — Trimestre per trimestre",
    quartersTitle: "Il dettaglio.",
    quartersLede:
      "Gli stessi indicatori per ogni trimestre, così che due anni diversi restino confrontabili.",
    stateLabel: { closed: "Chiuso", open: "In corso", upcoming: "Da aprire" },
    rows: {
      commuteKm: "Pendolarismo evitato",
      commuteKg: "CO₂e evitata — tragitti",
      sheets: "Documenti digitali",
      paperKg: "CO₂e evitata — carta",
      travelKm: "Trasferte effettuate",
      travelKg: "CO₂e emessa — trasferte",
      netKg: "Saldo netto",
    },

    pledgeKicker: "§ 04 — Stato degli impegni",
    pledgeTitle: "Cosa abbiamo mantenuto.",
    pledgeState: { done: "Rispettato", doing: "In corso", planned: "Programmato" },

    methodKicker: "§ 05 — Metodo",
    methodTitle: "Come sono calcolati questi numeri.",
    methodLede:
      "Tre formule e tre fattori. Nessun dato è misurato da strumenti: sono conteggi operativi interni moltiplicati per fattori di emissione pubblici. Chiunque può rifare i conti.",
    formulas: [
      {
        t: "Pendolarismo evitato",
        f: "persone × giorni lavorati × km andata e ritorno × fattore auto",
        d: "Il tragitto di riferimento è quello che faremmo con una sede tra Monza e Milano, calcolato per ogni persona dello studio.",
      },
      {
        t: "Carta evitata",
        f: "documenti digitali × fattore foglio A4",
        d: "Un documento vale un foglio equivalente: è una semplificazione prudente, i contratti reali hanno più pagine.",
      },
      {
        t: "Trasferte emesse",
        f: "(km treno × fattore treno) + (km auto × fattore auto)",
        d: "Sottratte per intero dal risparmio. Il saldo netto è sempre al lordo del nostro spostamento.",
      },
    ],
    factorsTitle: "Fattori di emissione usati",
    factorRows: [
      { k: "Auto passeggeri", v: "0,12 kg CO₂e / km" },
      { k: "Treno", v: "0,035 kg CO₂e / passeggero-km" },
      { k: "Foglio A4 (80 g/m²)", v: "0,0045 kg CO₂e / foglio" },
    ],
    sourcesTitle: "Da dove vengono i fattori",

    boundaryKicker: "§ 06 — Perimetro e limiti",
    boundaryTitle: "Cosa non c'è in questi numeri.",
    boundaryLede:
      "Il perimetro è stretto di proposito: contiamo solo quello di cui abbiamo evidenza diretta. Il resto è dichiarato, non stimato.",
    boundaryPoints: [
      "Non sono inclusi i consumi domestici di chi lavora: riscaldamento, raffrescamento ed elettricità delle case restano fuori dal perimetro, e sono la voce che il lavoro da remoto sposta invece di eliminare.",
      "Non è incluso l'impatto del cloud su cui girano i nostri progetti, né quello dei dispositivi che usiamo: non abbiamo un modo onesto di attribuircene la quota.",
      "Non sono inclusi i collaboratori autonomi con cui lavoriamo: sono imprese indipendenti, non parte del nostro perimetro di rendicontazione.",
      "Il pendolarismo evitato è un confronto con uno scenario alternativo, non una misura: descrive l'ufficio che non abbiamo aperto, con un fattore di emissione tenuto al minimo dell'intervallo pubblico.",
      "Nessuna emissione è compensata con crediti di carbonio. Il saldo netto è quello che resta, non un dato azzerato.",
    ],

    crossTag: "Sostenibilità ambientale",
    crossTitle: "Perché il remote-native pesa meno.",
    crossBody:
      "Il contesto di questi numeri: come lavoriamo, cosa abbiamo tolto e cosa non ci attribuiamo.",
    crossCta: "Torna alla pagina",
    contactTitle: "Domande su questi numeri?",
    contactBody:
      "Se un conto non torna, o pensi che un fattore vada corretto, scrivici: le correzioni finiscono nella prossima edizione, con la data.",
    contactCta: "Scrivici",
  },

  en: {
    hero: {
      crumb: "§ 10.1 — Sustainability report",
      line1: "Environmental",
      line2: "sustainability report.",
      lede: "Four quarters, the same indicators every year. The commuting kilometres we didn't drive, the documents we didn't print and the business travel we actually took, subtracted from the balance. Internal estimates, with the calculation method at the foot of the page.",
      cta1: "Go to the quarters",
      cta2: "Calculation method",
    },
    scopeLabel: "Boundary",
    scopeValue: "The studio's people",
    updatedLabel: "Updated to",
    natureLabel: "Nature of the data",
    natureValue: "Internal estimates, not certified",

    yearLabel: "Year",
    archiveLabel: "Archive",

    kpiKicker: "§ 01 — Year summary",
    kpiTitle: "The numbers, in four lines.",
    kpiLede:
      "The sum of the closed quarters. Quarters still running contribute nothing: no projections, no early estimates.",
    kpi: [
      {
        k: "Commuting avoided",
        unit: "km",
        d: "Home-to-office kilometres that were never driven.",
      },
      {
        k: "CO₂e avoided, net",
        unit: "kg",
        d: "Commuting and paper avoided, less the emissions of the travel actually taken.",
      },
      {
        k: "Digital-only documents",
        unit: "A4-sheet equivalents",
        d: "Quotes, contracts and invoices issued and archived without printing.",
      },
      {
        k: "Business travel taken",
        unit: "km",
        d: "Kilometres genuinely travelled for clients, by train and by car.",
      },
    ],
    partialNote: "Partial figure: closed quarters only.",

    chartKicker: "§ 02 — Quarterly balance",
    chartTitle: "Avoided above, emitted below.",
    chartLede:
      "Each quarter on a shared scale, in kg CO₂e. Above the line what we didn't produce, below it what we produced by travelling. The difference is the net balance.",
    chartAvoided: "Avoided",
    chartEmitted: "Emitted",
    chartAxis: "kg CO₂e",
    chartNoData: "No data",
    chartCaption:
      "Above and below the line the scale is the same: a millimetre is worth the same kg in both directions. Bars under 3 pixels are raised to 3 so they stay visible; the exact figures are in the table below.",

    quartersKicker: "§ 03 — Quarter by quarter",
    quartersTitle: "The detail.",
    quartersLede:
      "The same indicators for every quarter, so that two different years stay comparable.",
    stateLabel: { closed: "Closed", open: "Running", upcoming: "Not started" },
    rows: {
      commuteKm: "Commuting avoided",
      commuteKg: "CO₂e avoided — commuting",
      sheets: "Digital documents",
      paperKg: "CO₂e avoided — paper",
      travelKm: "Business travel taken",
      travelKg: "CO₂e emitted — travel",
      netKg: "Net balance",
    },

    pledgeKicker: "§ 04 — Status of the commitments",
    pledgeTitle: "What we kept.",
    pledgeState: { done: "Kept", doing: "In progress", planned: "Scheduled" },

    methodKicker: "§ 05 — Method",
    methodTitle: "How these numbers are calculated.",
    methodLede:
      "Three formulas and three factors. Nothing here is instrument-measured: these are internal operational counts multiplied by public emission factors. Anyone can redo the arithmetic.",
    formulas: [
      {
        t: "Commuting avoided",
        f: "people × worked days × round-trip km × car factor",
        d: "The reference trip is the one we'd make with premises between Monza and Milan, counted for each person in the studio.",
      },
      {
        t: "Paper avoided",
        f: "digital documents × A4-sheet factor",
        d: "One document counts as one equivalent sheet: a prudent simplification, since real contracts run to several pages.",
      },
      {
        t: "Travel emitted",
        f: "(train km × train factor) + (car km × car factor)",
        d: "Subtracted in full from the saving. The net balance always carries our own travel.",
      },
    ],
    factorsTitle: "Emission factors used",
    factorRows: [
      { k: "Passenger car", v: "0.12 kg CO₂e / km" },
      { k: "Train", v: "0.035 kg CO₂e / passenger-km" },
      { k: "A4 sheet (80 g/m²)", v: "0.0045 kg CO₂e / sheet" },
    ],
    sourcesTitle: "Where the factors come from",

    boundaryKicker: "§ 06 — Boundary and limits",
    boundaryTitle: "What these numbers leave out.",
    boundaryLede:
      "The boundary is deliberately narrow: we count only what we have direct evidence for. The rest is declared, not estimated.",
    boundaryPoints: [
      "Home energy use is not included: the heating, cooling and electricity of the houses we work from stay outside the boundary — and that is precisely the item remote work shifts rather than removes.",
      "The impact of the cloud our projects run on is not included, nor that of the devices we use: we have no honest way of attributing our share.",
      "The autonomous collaborators we work with are not included: they are independent businesses, not part of our reporting boundary.",
      "Avoided commuting is a comparison with an alternative scenario, not a measurement: it describes the office we never opened, with an emission factor kept at the bottom of the published range.",
      "No emission is offset with carbon credits. The net balance is what is left over, not a figure written down to zero.",
    ],

    crossTag: "Environmental sustainability",
    crossTitle: "Why remote-native weighs less.",
    crossBody:
      "The context behind these numbers: how we work, what we removed and what we don't claim for ourselves.",
    crossCta: "Back to the page",
    contactTitle: "Questions about these numbers?",
    contactBody:
      "If something doesn't add up, or you think a factor should be corrected, write to us: corrections go into the next edition, with the date.",
    contactCta: "Write to us",
  },
};
