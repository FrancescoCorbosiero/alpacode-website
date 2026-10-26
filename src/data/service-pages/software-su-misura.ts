/* /servizi/software-su-misura — Software & automazioni (04).
   Its machine: the spreadsheet that runs everything turns into a
   process, each step passing the work to the next on its own. */
import type { Lang } from "../../i18n/types";
import type { ServiceCopy } from "./types";

export const software: Record<Lang, ServiceCopy> = {
  it: {
    meta: {
      title: "Software gestionali su misura e automazioni — Alpacode",
      description:
        "Gestionali, portali, integrazioni e automazioni su misura, con l'AI dove serve: il lavoro ripetitivo lo fa il software. Trasformiamo fogli Excel in processi che si tengono in piedi.",
      ogAlt: "Software e automazioni: dal foglio Excel a un processo che si tiene in piedi.",
    },
    name: "Software & automazioni",
    portal: "Dal foglio Excel a un processo vero.",
    hero: {
      kicker: "software & automazioni",
      lines: ["Dal foglio Excel", "a un processo"],
      accent: { before: "che ", mark: "si tiene in piedi", after: "." },
      lede: "Gestionali, integrazioni e automazioni — con l'AI dove serve — che fanno il lavoro noioso al posto tuo. Trasformiamo fogli Excel in processi che si tengono in piedi.",
      cta: "Raccontaci il processo",
      alt: "Quando serve",
    },
    machine: {
      kind: "pipeline",
      sheet: "ordini_DEFINITIVO_v3.xlsx",
      cols: ["Cliente", "Articolo", "Q.tà", "Stato"],
      nodes: ["Ordine", "Magazzino", "Fattura", "Spedizione"],
      auto: "in automatico",
      note: "nessuno ricopia più niente",
    },
    facts: [
      { k: "Ambiti", v: "Gestione · ERP · CRM" },
      { k: "Tempi", v: "da 6 a 20 settimane" },
      { k: "Formula", v: "Su misura" },
    ],
    when: {
      title: "Quando serve.",
      items: [
        {
          t: "Lo stesso dato, scritto",
          strike: "tre volte",
          fix: "una volta sola",
          d: "Ordini, fatture, magazzino: ricopiati a mano da un posto all'altro, con un errore ogni tanto che nessuno vede.",
        },
        {
          t: "Un foglio Excel",
          strike: "regge tutto",
          fix: "va in pensione",
          d: "Funziona finché lo apre una persona sola, e finché quella persona non va in ferie.",
        },
        {
          t: "Gli strumenti",
          strike: "non si parlano",
          fix: "si passano il lavoro",
          d: "Il gestionale, il sito, la contabilità: ognuno per conto suo, e tu in mezzo a fare da ponte.",
        },
      ],
    },
    includes: {
      title: "Cosa comprende.",
      lede: "Software costruito su come lavorate voi, non il contrario: dai gestionali alle automazioni piccole che fanno risparmiare ore.",
      items: [
        { t: "Gestionali su misura", d: "Ordini, clienti, magazzino, commesse: come lavorate voi, in un posto solo." },
        { t: "Portali e aree clienti", d: "Ordini, documenti, tracciamento: i clienti fanno da sé, il telefono si libera." },
        { t: "Integrazioni", d: "Colleghiamo gli strumenti che usate già: sito, contabilità, magazzino, CRM." },
        { t: "Automazioni", d: "Email, documenti, notifiche e report che partono da soli, al momento giusto." },
        { t: "L'AI dove serve", d: "Leggere documenti, smistare richieste, preparare bozze. Mai per fare scena." },
        { t: "Fatto per durare", d: "Codice documentato e scritto per reggere carichi e anni." },
      ],
    },
    steps: {
      title: "Come lavoriamo.",
      items: [
        { t: "Call gratuita", d: "Ci racconti il processo che non funziona, e dove perdete tempo." },
        { t: "La mappa del processo", d: "Disegniamo come lavorate oggi e come potreste lavorare, prima di scrivere codice." },
        { t: "Sviluppo per rilasci", d: "Si parte dal pezzo che rende di più: lo usate mentre il resto cresce." },
        { t: "In funzione", d: "Lo mettiamo in produzione, formiamo chi lo usa e restiamo per farlo evolvere." },
      ],
    },
    works: {
      title: "Software\nche gira davvero.",
      lede: "Portali, gestionali e cataloghi su misura, in uso ogni giorno.",
    },
    qa: {
      title: "Le domande\ngiuste.",
      items: [
        {
          q: "Perché su misura e non un software pronto?",
          a: "Se un software pronto fa al caso tuo, te lo diciamo. Il su misura serve quando il vostro modo di lavorare è il vostro vantaggio, e un programma generico vi costringerebbe a cambiarlo.",
        },
        {
          q: "Quanto tempo ci vuole?",
          a: "Da sei a venti settimane, a seconda di cosa deve fare. Lavoriamo per rilasci: le prime parti si usano prima della fine.",
        },
        {
          q: "Possiamo partire da un pezzo solo?",
          a: "Sì, ed è spesso il modo migliore: si automatizza il passaggio che fa perdere più tempo, poi il resto.",
        },
        {
          q: "Con quali tecnologie lavorate?",
          a: "Java e Spring Boot per i sistemi che devono reggere carichi e anni, WordPress quando basta, e le API degli strumenti che usate già.",
        },
        {
          q: "Usate l'intelligenza artificiale?",
          a: "Dove serve davvero: leggere documenti, classificare richieste, preparare bozze. Dove un'automazione semplice basta, usiamo quella.",
        },
      ],
    },
    lead: {
      title: "Raccontaci\nil processo.",
      lede: "Quale lavoro vi porta via più tempo, con quali strumenti lo fate oggi. Ti rispondiamo per fissare la prima call.",
      topic: "Servizio · Software & automazioni",
      legend: "Cosa ti serve",
      choices: [
        { id: "gestionale", name: "Un gestionale su misura" },
        { id: "integrazione", name: "Collegare gli strumenti" },
        { id: "automazione", name: "Automatizzare un passaggio" },
      ],
      message: { label: "Due righe sul processo (facoltativo)", ph: "Cosa fate a mano oggi, con quali strumenti." },
    },
    portals: "Gli altri servizi",
  },
  en: {
    meta: {
      title: "Custom management software and automation — Alpacode",
      description:
        "Custom management systems, portals, integrations and automations, with AI where it helps: the repetitive work is the software's. We turn spreadsheets into processes that hold up.",
      ogAlt: "Software and automation: from a spreadsheet to a process that holds up.",
    },
    name: "Software & automation",
    portal: "From a spreadsheet to a real process.",
    hero: {
      kicker: "software & automation",
      lines: ["From a spreadsheet", "to a process"],
      accent: { before: "that ", mark: "holds up", after: "." },
      lede: "Management systems, integrations and automations — with AI where it helps — that do the boring work for you. We turn spreadsheets into processes that hold up.",
      cta: "Tell us about the process",
      alt: "When it's needed",
    },
    machine: {
      kind: "pipeline",
      sheet: "orders_FINAL_v3.xlsx",
      cols: ["Client", "Item", "Qty", "Status"],
      nodes: ["Order", "Stock", "Invoice", "Shipping"],
      auto: "automatically",
      note: "nobody copies anything again",
    },
    facts: [
      { k: "Areas", v: "Management · ERP · CRM" },
      { k: "Timing", v: "6 to 20 weeks" },
      { k: "Formula", v: "Custom" },
    ],
    when: {
      title: "When it's needed.",
      items: [
        {
          t: "The same data, typed",
          strike: "three times",
          fix: "just once",
          d: "Orders, invoices, stock: copied by hand from one place to another, with the odd mistake nobody sees.",
        },
        {
          t: "One spreadsheet",
          strike: "runs everything",
          fix: "retires",
          d: "It works as long as one person opens it, and as long as that person never goes on holiday.",
        },
        {
          t: "The tools",
          strike: "don't talk",
          fix: "hand the work on",
          d: "The management system, the site, the accounts: each on its own, and you in the middle, bridging.",
        },
      ],
    },
    includes: {
      title: "What it covers.",
      lede: "Software built on how you work, not the other way round: from management systems to the small automations that save hours.",
      items: [
        { t: "Custom management systems", d: "Orders, clients, stock, jobs: the way you work, in one place." },
        { t: "Portals and client areas", d: "Orders, documents, tracking: clients serve themselves, the phone goes quiet." },
        { t: "Integrations", d: "We connect the tools you already use: site, accounts, stock, CRM." },
        { t: "Automations", d: "Emails, documents, notifications and reports that go out on their own, on time." },
        { t: "AI where it helps", d: "Reading documents, sorting requests, drafting. Never for show." },
        { t: "Built to last", d: "Documented code, written to carry the load and the years." },
      ],
    },
    steps: {
      title: "How we work.",
      items: [
        { t: "Free call", d: "Tell us about the process that isn't working, and where time goes." },
        { t: "Mapping the process", d: "We draw how you work today and how you could, before writing code." },
        { t: "Built in releases", d: "We start with the piece that pays back most: you use it while the rest grows." },
        { t: "Up and running", d: "We put it into production, train the people who use it and stay to evolve it." },
      ],
    },
    works: {
      title: "Software\nthat really runs.",
      lede: "Custom portals, management systems and catalogues, in use every day.",
    },
    qa: {
      title: "The right\nquestions.",
      items: [
        {
          q: "Why custom rather than off the shelf?",
          a: "If ready-made software fits, we tell you. Custom pays off when the way you work is your edge, and a generic program would force you to change it.",
        },
        {
          q: "How long does it take?",
          a: "Six to twenty weeks, depending on what it has to do. We work in releases: the first parts are in use before the end.",
        },
        {
          q: "Can we start with one piece?",
          a: "Yes, and it's often the best way: we automate the step that wastes the most time, then the rest.",
        },
        {
          q: "Which technologies do you use?",
          a: "Java and Spring Boot for systems that must carry the load and the years, WordPress when it's enough, and the APIs of the tools you already use.",
        },
        {
          q: "Do you use artificial intelligence?",
          a: "Where it really helps: reading documents, classifying requests, drafting. Where a simple automation is enough, we use that.",
        },
      ],
    },
    lead: {
      title: "Tell us\nabout the process.",
      lede: "Which work takes up most of your time, and with which tools you do it today. We'll reply to set up the first call.",
      topic: "Service · Software & automation",
      legend: "What you need",
      choices: [
        { id: "gestionale", name: "A custom management system" },
        { id: "integrazione", name: "Connect our tools" },
        { id: "automazione", name: "Automate a step" },
      ],
      message: { label: "A couple of lines on the process (optional)", ph: "What you do by hand today, with which tools." },
    },
    portals: "The other services",
  },
};
