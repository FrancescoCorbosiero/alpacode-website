/* /servizi/consulenza-digitale — Consulenza & digitalizzazione (01).
   Its machine: the tasks of a business, scattered, sorted into a
   roadmap (now, next, later). */
import type { Lang } from "../../i18n/types";
import type { ServiceCopy } from "./types";

export const consulenza: Record<Lang, ServiceCopy> = {
  it: {
    meta: {
      title: "Consulenza e digitalizzazione per imprese — Alpacode",
      description:
        "Capiamo come lavori oggi e tracciamo la strada: cosa digitalizzare, in che ordine, con che budget. Una roadmap scritta, da Monza e Milano in tutta Italia.",
      ogAlt: "Consulenza e digitalizzazione: prima la strada, poi gli strumenti.",
    },
    name: "Consulenza & digitalizzazione",
    portal: "Prima la strada, poi gli strumenti.",
    hero: {
      kicker: "consulenza & digitalizzazione",
      lines: ["Digitalizzare non è", "comprare software."],
      accent: { before: "È ", mark: "mettere in ordine", after: "." },
      lede: "Capiamo dove sei e dove vuoi arrivare, poi tracciamo la strada: cosa serve davvero, in che ordine, con che budget. A volte bastano pochi incontri.",
      cta: "Raccontaci dove sei",
      alt: "Quando serve",
    },
    machine: {
      kind: "roadmap",
      cols: ["Subito", "Poi", "Più avanti"],
      chips: [
        { t: "Fatture in Excel", col: 0 },
        { t: "Ordini su WhatsApp", col: 0 },
        { t: "Sito datato", col: 1 },
        { t: "Clienti su carta", col: 1 },
        { t: "Magazzino a mano", col: 2 },
        { t: "Report a fine mese", col: 2 },
      ],
      note: "la tua roadmap",
    },
    facts: [
      { k: "Formato", v: "Remoto · in studio" },
      { k: "Tempi", v: "da 2 a 8 settimane" },
      { k: "Si parte da", v: "Una call di 30 minuti" },
    ],
    when: {
      title: "Quando serve.",
      items: [
        {
          t: "Gli strumenti",
          strike: "si accumulano",
          fix: "lavorano insieme",
          d: "Un gestionale, tre fogli Excel, le chat: ognuno fa un pezzo e nessuno parla con gli altri.",
        },
        {
          t: "Non sai",
          strike: "da dove partire",
          fix: "il primo passo",
          d: "Le proposte arrivano da tutte le parti, ognuna con la sua urgenza. Serve qualcuno che metta in fila le cose.",
        },
        {
          t: "Hai già speso,",
          strike: "senza risultati",
          fix: "e ora sai perché",
          d: "Un software comprato e mai usato, un sito che non porta nulla: prima di spendere ancora, si capisce cosa non ha funzionato.",
        },
      ],
    },
    includes: {
      title: "Cosa comprende.",
      lede: "Un lavoro di testa prima che di strumenti: alla fine sai cosa fare, in che ordine e perché.",
      items: [
        { t: "Come lavori oggi", d: "Processi, strumenti, dati: dove si perde tempo e dove si sbaglia." },
        { t: "Una roadmap scritta", d: "Cosa fare, in che ordine, con che budget, in un documento che resta tuo." },
        { t: "Gli strumenti giusti", d: "Quali tenere, quali cambiare, quali non servono: senza legarti a un fornitore." },
        { t: "Le priorità", d: "Si parte da quello che rende di più, anche quando il budget è contenuto." },
        { t: "Affiancamento", d: "Ti accompagniamo nelle prime scelte e con i fornitori, se serve." },
        { t: "La messa in opera", d: "La roadmap la realizzi con chi vuoi. Con noi, si parte da dove siamo arrivati." },
      ],
    },
    steps: {
      title: "Come lavoriamo.",
      items: [
        { t: "Call di 30 minuti", d: "Ci racconti l'attività e cosa non funziona. Ti diciamo subito se e come possiamo aiutarti." },
        { t: "Analisi", d: "Guardiamo come lavorate: strumenti, passaggi, dati. In studio, da te o da remoto." },
        { t: "Roadmap", d: "Una proposta scritta: cosa fare, in che ordine, con che budget, in parole semplici." },
        { t: "Messa in opera", d: "La realizziamo insieme, un passo alla volta, o la consegni a chi preferisci." },
      ],
    },
    works: {
      title: "Dove l'abbiamo fatto.",
      lede: "Processi rimessi in ordine, prima ancora del software che li regge.",
    },
    qa: {
      title: "Le domande\ngiuste.",
      items: [
        {
          q: "Mi serve per forza un software nuovo?",
          a: "No. Spesso basta usare meglio quello che c'è già, o collegare due strumenti. Se un software nuovo serve, te lo diciamo e ti spieghiamo perché.",
        },
        {
          q: "Quanto tempo ci vuole?",
          a: "Da due a otto settimane per l'analisi e la roadmap, a seconda di quanto è grande l'attività. A volte bastano pochi incontri.",
        },
        {
          q: "Lavorate anche da remoto?",
          a: "Sì: in studio, da te o online. La maggior parte del lavoro si fa bene anche a distanza, in tutta Italia.",
        },
        {
          q: "E se poi voglio farlo realizzare da altri?",
          a: "La roadmap è tua. Puoi realizzarla con chi vuoi; se scegli noi, partiamo da lì senza ricominciare da capo.",
        },
        {
          q: "Siamo una realtà piccola: ha senso?",
          a: "Sì. Più l'attività è piccola, più conta non sprecare tempo e budget in strumenti che non servono.",
        },
      ],
    },
    lead: {
      title: "Raccontaci\ndove sei.",
      lede: "Due righe su com'è l'attività oggi e su cosa vorresti cambiare. Ti rispondiamo per fissare la prima call.",
      topic: "Servizio · Consulenza & digitalizzazione",
      legend: "Cosa ti serve",
      choices: [
        { id: "analisi", name: "Capire come lavoriamo" },
        { id: "roadmap", name: "Una roadmap per digitalizzare" },
        { id: "strumenti", name: "Scegliere gli strumenti" },
      ],
      message: { label: "Due righe sull'attività (facoltativo)", ph: "Cosa fate, con quali strumenti, cosa non funziona." },
    },
    portals: "Gli altri servizi",
  },
  en: {
    meta: {
      title: "IT consulting and digitalization for businesses — Alpacode",
      description:
        "We look at how you work today and map the way: what to digitalize, in what order, on what budget. A written roadmap, from Monza and Milan across Italy.",
      ogAlt: "Consulting and digitalization: first the way, then the tools.",
    },
    name: "Consulting & digitalization",
    portal: "First the way, then the tools.",
    hero: {
      kicker: "consulting & digitalization",
      lines: ["Going digital isn't", "buying software."],
      accent: { before: "It's ", mark: "putting things in order", after: "." },
      lede: "We understand where you are and where you want to go, then we map the way: what you really need, in what order, on what budget. Sometimes a few meetings are enough.",
      cta: "Tell us where you are",
      alt: "When it's needed",
    },
    machine: {
      kind: "roadmap",
      cols: ["Now", "Next", "Later"],
      chips: [
        { t: "Invoices in Excel", col: 0 },
        { t: "Orders on WhatsApp", col: 0 },
        { t: "An old website", col: 1 },
        { t: "Clients on paper", col: 1 },
        { t: "Stock by hand", col: 2 },
        { t: "Month-end reports", col: 2 },
      ],
      note: "your roadmap",
    },
    facts: [
      { k: "Format", v: "Remote · in the studio" },
      { k: "Timing", v: "2 to 8 weeks" },
      { k: "It starts with", v: "A 30-minute call" },
    ],
    when: {
      title: "When it's needed.",
      items: [
        {
          t: "The tools",
          strike: "pile up",
          fix: "work together",
          d: "A management system, three spreadsheets, the chats: each does a bit and none talks to the others.",
        },
        {
          t: "You don't know",
          strike: "where to start",
          fix: "the first step",
          d: "Proposals come from every side, each with its own urgency. Someone has to put things in line.",
        },
        {
          t: "You've already spent,",
          strike: "for nothing",
          fix: "and now you know why",
          d: "Software bought and never used, a site that brings nothing: before spending again, we find out what didn't work.",
        },
      ],
    },
    includes: {
      title: "What it covers.",
      lede: "Thinking before tools: at the end you know what to do, in what order and why.",
      items: [
        { t: "How you work today", d: "Processes, tools, data: where time goes and where mistakes happen." },
        { t: "A written roadmap", d: "What to do, in what order, on what budget, in a document that stays yours." },
        { t: "The right tools", d: "Which to keep, which to change, which you don't need: no lock-in to a vendor." },
        { t: "Priorities", d: "We start with what pays back most, even on a tight budget." },
        { t: "By your side", d: "We help with the first choices and with vendors, if needed." },
        { t: "Putting it to work", d: "You can build the roadmap with anyone. With us, we start from where we got to." },
      ],
    },
    steps: {
      title: "How we work.",
      items: [
        { t: "A 30-minute call", d: "Tell us about the business and what isn't working. We tell you right away if and how we can help." },
        { t: "Analysis", d: "We look at how you work: tools, steps, data. In the studio, at your place or remotely." },
        { t: "Roadmap", d: "A written proposal: what to do, in what order, on what budget, in plain words." },
        { t: "Putting it to work", d: "We build it together, one step at a time, or you hand it to whoever you like." },
      ],
    },
    works: {
      title: "Where we've done it.",
      lede: "Processes put in order, before the software that runs them.",
    },
    qa: {
      title: "The right\nquestions.",
      items: [
        {
          q: "Do I really need new software?",
          a: "No. Often it's enough to use what you have better, or to connect two tools. If new software is needed, we tell you and explain why.",
        },
        {
          q: "How long does it take?",
          a: "Two to eight weeks for the analysis and the roadmap, depending on the size of the business. Sometimes a few meetings are enough.",
        },
        {
          q: "Do you work remotely too?",
          a: "Yes: in the studio, at your place or online. Most of the work goes well at a distance too, anywhere in Italy.",
        },
        {
          q: "What if I want someone else to build it?",
          a: "The roadmap is yours. You can build it with anyone; if you choose us, we start from there without starting over.",
        },
        {
          q: "We're a small business: does it make sense?",
          a: "Yes. The smaller the business, the more it matters not to waste time and budget on tools you don't need.",
        },
      ],
    },
    lead: {
      title: "Tell us\nwhere you are.",
      lede: "A couple of lines on how the business runs today and what you'd like to change. We'll reply to set up the first call.",
      topic: "Service · Consulting & digitalization",
      legend: "What you need",
      choices: [
        { id: "analisi", name: "Understand how we work" },
        { id: "roadmap", name: "A roadmap to go digital" },
        { id: "strumenti", name: "Choose the tools" },
      ],
      message: { label: "A couple of lines on the business (optional)", ph: "What you do, with which tools, what isn't working." },
    },
    portals: "The other services",
  },
};
