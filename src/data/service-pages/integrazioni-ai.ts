/* /servizi/integrazioni-ai — Integrazioni AI (LLM) (05).
   Its machine: a client's question comes in, the answer is looked up
   in the business's own systems, drafted, approved by a person, sent. */
import type { Lang } from "../../i18n/types";
import type { ServiceCopy } from "./types";

export const integrazioniAi: Record<Lang, ServiceCopy> = {
  it: {
    meta: {
      title: "Integrazioni AI e modelli linguistici (LLM) per imprese — Alpacode",
      description:
        "Modelli linguistici dentro processi reali: assistenti che rispondono ai clienti con i tuoi dati, documenti letti e smistati, bozze che approvi tu. Solo casi d'uso concreti.",
      ogAlt: "Integrazioni AI: dentro il tuo lavoro, non per fare scena.",
    },
    name: "Integrazioni AI (LLM)",
    portal: "L'AI dentro il lavoro, non per fare scena.",
    hero: {
      kicker: "integrazioni AI (LLM)",
      lines: ["L'AI dentro", "il tuo lavoro."],
      accent: { before: "Non ", mark: "per fare scena", after: "." },
      lede: "Modelli linguistici dentro processi reali: assistenti che rispondono ai clienti, automazioni che fanno risparmiare ore di lavoro, contenuti generati e curati. Solo casi d'uso concreti, con un ritorno chiaro sull'investimento.",
      cta: "Raccontaci dove perdete tempo",
      alt: "Quando serve",
    },
    machine: {
      kind: "answer",
      inbox: "Richieste dei clienti",
      threads: [
        {
          q: "Il mio ordine è già partito?",
          source: "Gestionale · ordine 1043: spedito ieri",
          a: "Sì, è partito ieri e arriva domani. Ti lascio il link per seguirlo.",
        },
        {
          q: "Avete ancora la taglia 42?",
          source: "Magazzino · taglia 42: disponibile",
          a: "Sì, è disponibile: la trovi qui, con la consegna in due giorni.",
        },
      ],
      draft: "Bozza dell'AI",
      approve: "Approva e invia",
      sent: "Inviata",
    },
    facts: [
      { k: "Ambiti", v: "Assistenti · automazioni · contenuti" },
      { k: "Dove", v: "Nei sistemi che usi già" },
      { k: "Formula", v: "Su misura" },
    ],
    when: {
      title: "Quando serve.",
      items: [
        {
          t: "Le stesse domande,",
          strike: "ogni giorno",
          fix: "una volta, bene",
          d: "Orari, ordini, disponibilità: rispondere uno per uno porta via ore che servirebbero altrove.",
        },
        {
          t: "Documenti",
          strike: "da aprire uno per uno",
          fix: "già smistati",
          d: "Email, PDF, moduli: qualcuno li legge, copia i dati e li manda alla persona giusta.",
        },
        {
          t: "Testi",
          strike: "sempre uguali",
          fix: "già impostati",
          d: "Schede prodotto, risposte, riepiloghi: lavoro ripetitivo che si può preparare, e tu rileggi.",
        },
      ],
    },
    includes: {
      title: "Cosa comprende.",
      lede: "Si parte da un caso d'uso con un ritorno chiaro, lo si prova sui casi veri, poi si decide il resto.",
      items: [
        { t: "Assistenti per i clienti", d: "Rispondono con le informazioni della tua attività, non con frasi generiche." },
        { t: "Documenti letti e smistati", d: "Email, PDF e moduli: i dati estratti, la richiesta alla persona giusta." },
        { t: "Bozze che rileggi tu", d: "Risposte, schede e riepiloghi preparati: una persona approva prima di inviare." },
        { t: "Nei tuoi strumenti", d: "Email, sito, gestionale, WhatsApp: niente app nuove da imparare." },
        { t: "I dati, decisi insieme", d: "Cosa l'AI può leggere, e cosa no, lo scriviamo prima di iniziare." },
        { t: "Misurato", d: "Quanto tempo fa risparmiare lo misuriamo sui casi veri, prima di andare avanti." },
      ],
    },
    steps: {
      title: "Come lavoriamo.",
      items: [
        { t: "Call gratuita", d: "Ci racconti dove perdete tempo: domande, documenti, testi." },
        { t: "Un caso d'uso", d: "Scegliamo il primo, quello con il ritorno più chiaro." },
        { t: "La prova", d: "Lo provate sui vostri casi veri, con una persona che controlla." },
        { t: "Dentro il lavoro", d: "Lo colleghiamo ai vostri strumenti e lo seguiamo nel tempo." },
      ],
    },
    qa: {
      title: "Le domande\ngiuste.",
      items: [
        {
          q: "L'AI può sbagliare?",
          a: "Sì, per questo la usiamo dove un errore si vede e si corregge, e dove serve una persona approva prima che qualcosa esca.",
        },
        {
          q: "Che fine fanno i nostri dati?",
          a: "Decidiamo insieme cosa può leggere e da dove passano i dati, e lo scriviamo nella proposta prima di iniziare.",
        },
        {
          q: "Serve un'azienda grande?",
          a: "No. Spesso il caso d'uso migliore è piccolo: le risposte alle email, le schede prodotto, un documento che arriva ogni giorno.",
        },
        {
          q: "Quali modelli usate?",
          a: "Quelli adatti al caso: i modelli linguistici delle principali piattaforme, scelti per qualità, costo e dove trattano i dati.",
        },
        {
          q: "E se non funziona per noi?",
          a: "Lo vedete nella prova, sui casi veri, prima di andare avanti. Se un'automazione semplice basta, vi proponiamo quella.",
        },
      ],
    },
    lead: {
      title: "Raccontaci\ndove perdete tempo.",
      lede: "Le domande che arrivano ogni giorno, i documenti da smistare, i testi sempre uguali. Ti rispondiamo per fissare la prima call.",
      topic: "Servizio · Integrazioni AI (LLM)",
      legend: "Cosa ti serve",
      choices: [
        { id: "assistente", name: "Un assistente per i clienti" },
        { id: "documenti", name: "Leggere e smistare documenti" },
        { id: "contenuti", name: "Bozze e contenuti" },
      ],
      message: { label: "Due righe sul caso (facoltativo)", ph: "Cosa fate a mano, quante volte al giorno, con quali strumenti." },
    },
    portals: "Gli altri servizi",
  },
  en: {
    meta: {
      title: "AI integrations and language models (LLMs) for businesses — Alpacode",
      description:
        "Language models inside real processes: assistants that answer clients with your data, documents read and sorted, drafts you approve. Concrete use cases only.",
      ogAlt: "AI integrations: inside your work, not for show.",
    },
    name: "AI integrations (LLM)",
    portal: "AI inside the work, not for show.",
    hero: {
      kicker: "AI integrations (LLM)",
      lines: ["AI inside", "your work."],
      accent: { before: "Not ", mark: "for show", after: "." },
      lede: "Language models inside real processes: assistants that answer clients, automations that save hours of work, content generated and curated. Concrete use cases only, with a clear return on the investment.",
      cta: "Tell us where time goes",
      alt: "When it's needed",
    },
    machine: {
      kind: "answer",
      inbox: "Client requests",
      threads: [
        {
          q: "Has my order shipped yet?",
          source: "Management · order 1043: shipped yesterday",
          a: "Yes, it left yesterday and arrives tomorrow. Here's the link to track it.",
        },
        {
          q: "Do you still have size 42?",
          source: "Stock · size 42: available",
          a: "Yes, it's available: you'll find it here, delivered in two days.",
        },
      ],
      draft: "AI draft",
      approve: "Approve and send",
      sent: "Sent",
    },
    facts: [
      { k: "Areas", v: "Assistants · automations · content" },
      { k: "Where", v: "In the systems you already use" },
      { k: "Formula", v: "Custom" },
    ],
    when: {
      title: "When it's needed.",
      items: [
        {
          t: "The same questions,",
          strike: "every day",
          fix: "once, and well",
          d: "Opening hours, orders, availability: answering one by one takes hours that belong elsewhere.",
        },
        {
          t: "Documents",
          strike: "opened one by one",
          fix: "already sorted",
          d: "Emails, PDFs, forms: someone reads them, copies the data and forwards them to the right person.",
        },
        {
          t: "Texts that are",
          strike: "always the same",
          fix: "already drafted",
          d: "Product sheets, replies, summaries: repetitive work that can be prepared, and you read it over.",
        },
      ],
    },
    includes: {
      title: "What it covers.",
      lede: "We start with one use case with a clear return, test it on real cases, then decide the rest.",
      items: [
        { t: "Assistants for clients", d: "They answer with your business's information, not with generic lines." },
        { t: "Documents read and sorted", d: "Emails, PDFs and forms: the data extracted, the request to the right person." },
        { t: "Drafts you read over", d: "Replies, sheets and summaries prepared: a person approves before they go out." },
        { t: "In your tools", d: "Email, website, management system, WhatsApp: no new apps to learn." },
        { t: "The data, agreed together", d: "What the AI may read, and what not, is written down before we start." },
        { t: "Measured", d: "How much time it saves is measured on real cases, before going further." },
      ],
    },
    steps: {
      title: "How we work.",
      items: [
        { t: "Free call", d: "Tell us where time goes: questions, documents, texts." },
        { t: "One use case", d: "We pick the first one, the one with the clearest return." },
        { t: "The trial", d: "You try it on your real cases, with a person checking." },
        { t: "Into the work", d: "We connect it to your tools and look after it over time." },
      ],
    },
    qa: {
      title: "The right\nquestions.",
      items: [
        {
          q: "Can the AI make mistakes?",
          a: "Yes, which is why we use it where a mistake shows and gets corrected, and where needed a person approves before anything goes out.",
        },
        {
          q: "What happens to our data?",
          a: "We decide together what it may read and where the data goes, and we write it in the proposal before we start.",
        },
        {
          q: "Do you need to be a big company?",
          a: "No. The best use case is often small: replies to emails, product sheets, a document that arrives every day.",
        },
        {
          q: "Which models do you use?",
          a: "The right ones for the case: language models from the main platforms, chosen for quality, cost and where they process the data.",
        },
        {
          q: "What if it doesn't work for us?",
          a: "You see it in the trial, on real cases, before going further. If a simple automation is enough, that's what we propose.",
        },
      ],
    },
    lead: {
      title: "Tell us\nwhere time goes.",
      lede: "The questions that come in every day, the documents to sort, the texts that are always the same. We'll reply to set up the first call.",
      topic: "Service · AI integrations (LLM)",
      legend: "What you need",
      choices: [
        { id: "assistente", name: "An assistant for clients" },
        { id: "documenti", name: "Read and sort documents" },
        { id: "contenuti", name: "Drafts and content" },
      ],
      message: { label: "A couple of lines on the case (optional)", ph: "What you do by hand, how often, with which tools." },
    },
    portals: "The other services",
  },
};
