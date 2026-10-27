/* /servizi/siti-web — Siti & web app (02).
   Its machine: the site goes from wireframe to built to live, and the
   first request comes in. */
import type { Lang } from "../../i18n/types";
import type { ServiceCopy } from "./types";

export const sitiWeb: Record<Lang, ServiceCopy> = {
  it: {
    meta: {
      title: "Siti web e web app su misura — Alpacode",
      description:
        "Siti vetrina, portali e aree riservate su misura: curati, veloci sul telefono, visibili su Google, con moduli che portano richieste. Lo vedi finito prima che vada online.",
      ogAlt: "Siti e web app: un sito bello non basta, deve portarti clienti.",
    },
    name: "Siti & web app",
    portal: "Un sito che ti porta clienti.",
    hero: {
      kicker: "siti & web app",
      lines: ["Un sito bello", "non basta."],
      accent: { before: "Deve ", mark: "portarti clienti", after: "." },
      lede: "Siti vetrina, portali e aree riservate su misura. Curati, semplici da gestire e fatti per durare nel tempo: visibili su Google, veloci sul telefono, con un modulo che ti porta richieste.",
      cta: "Raccontaci il tuo sito",
      alt: "Quando serve",
    },
    machine: {
      kind: "wireframe",
      url: "latuaattivita.it",
      brand: "La tua attività",
      headline: "Ti trovano. Ti scelgono.",
      cta: "Richiedi un preventivo",
      ping: "Nuova richiesta · dal sito",
      live: "Online",
      checks: ["Telefono", "Google", "Veloce"],
    },
    facts: [
      { k: "Per chi", v: "Privati & imprese" },
      { k: "Tempi", v: "da 3 a 12 settimane" },
      { k: "Formula", v: "Pacchetto o su misura" },
    ],
    when: {
      title: "Quando serve.",
      items: [
        {
          t: "Il sito",
          strike: "non c'è, o è datato",
          fix: "ti somiglia",
          d: "Chi ti cerca non ti trova, o trova una pagina ferma a dieci anni fa che non racconta più chi sei.",
        },
        {
          t: "C'è, ma",
          strike: "non porta nulla",
          fix: "porta richieste",
          d: "Nessuna chiamata, nessun modulo compilato: una vetrina in una via dove non passa nessuno.",
        },
        {
          t: "Ti serve",
          strike: "una vetrina",
          fix: "uno strumento",
          d: "Un'area riservata per i clienti, un portale, prenotazioni o documenti online: il sito che lavora con te.",
        },
      ],
    },
    includes: {
      title: "Cosa comprende.",
      lede: "Dal primo schizzo alla messa online, e dopo: un sito che si fa trovare e che sai gestire.",
      items: [
        { t: "Progetto su misura", d: "Struttura e grafica partono dalla tua attività, non da un modello riciclato." },
        { t: "Testi per Google", d: "Le parole che usano i tuoi clienti, nei punti che contano." },
        { t: "Pensato per il telefono", d: "Veloce e chiaro dove arriva la maggior parte delle visite." },
        { t: "Moduli che lavorano", d: "Preventivi, prenotazioni, contatti: arrivano nella tua casella." },
        { t: "Aree riservate e portali", d: "Quando serve: accessi per i clienti, documenti, ordini." },
        { t: "Lo approvi finito", d: "Va online quando lo hai visto e approvato. Poi restiamo per le modifiche." },
      ],
    },
    steps: {
      title: "Come lavoriamo.",
      items: [
        { t: "Call gratuita", d: "Trenta minuti per capire cosa ti serve. Niente vendite, niente impegno." },
        { t: "Proposta scritta", d: "Pagine, funzioni, tempi e costo, in parole semplici." },
        { t: "Design e sviluppo", d: "Aggiornamenti a ogni passo: vedi il sito crescere e decidi tu." },
        { t: "Online", d: "Va online quando lo approvi. E restiamo per quello che cambia." },
      ],
    },
    works: {
      title: "Alcuni siti\nche abbiamo fatto.",
      lede: "Ognuno racconta il problema che aveva e cosa è cambiato.",
    },
    qa: {
      title: "Le domande\ngiuste.",
      items: [
        {
          q: "Quanto tempo ci vuole?",
          a: "Da tre settimane per un sito vetrina a dodici per un portale con area riservata. I tempi esatti sono nella proposta scritta.",
        },
        {
          q: "Potrò modificarlo da solo?",
          a: "Sì. Testi, foto e notizie li cambi tu da un pannello semplice: te lo mostriamo con calma, una volta per tutte.",
        },
        {
          q: "Usate dei template?",
          a: "No: struttura e grafica partono dalla tua attività. Gli strumenti (WordPress o codice su misura) li scegliamo in base a cosa deve fare il sito.",
        },
        {
          q: "Ho già un sito: lo rifate da zero?",
          a: "Non per forza. Partiamo da quello che c'è: lo rinnoviamo, o lo rifacciamo se conviene di più. Te lo diciamo prima, con i motivi.",
        },
        {
          q: "Chi pensa a dominio e hosting?",
          a: "Possiamo pensarci noi, oppure lavorare su quelli che hai già. In ogni caso il dominio e i contenuti restano tuoi.",
        },
      ],
    },
    lead: {
      title: "Raccontaci\nil tuo sito.",
      lede: "Che attività hai, se un sito c'è già, cosa vorresti che facesse. Ti rispondiamo per fissare la prima call.",
      topic: "Servizio · Siti & web app",
      legend: "Cosa ti serve",
      choices: [
        { id: "vetrina", name: "Un sito nuovo" },
        { id: "rifacimento", name: "Rifare il sito che ho" },
        { id: "portale", name: "Un portale o un'area riservata" },
      ],
      message: { label: "Due righe sul sito (facoltativo)", ph: "Che attività è, cosa deve fare il sito." },
      extra: { name: "site", label: "Il sito che hai oggi (facoltativo)", ph: "www.…" },
    },
    portals: "Gli altri servizi",
  },
  en: {
    meta: {
      title: "Custom websites and web apps — Alpacode",
      description:
        "Websites, portals and private areas built to measure: well made, fast on a phone, found on Google, with forms that bring in requests. You see it finished before it goes live.",
      ogAlt: "Websites and web apps: a good-looking site isn't enough, it has to bring you clients.",
    },
    name: "Websites & web apps",
    portal: "A site that brings you clients.",
    hero: {
      kicker: "websites & web apps",
      lines: ["A good-looking site", "isn't enough."],
      accent: { before: "It has to ", mark: "bring you clients", after: "." },
      lede: "Showcase sites, portals and private areas built to measure. Well made, easy to run and built to last: found on Google, fast on a phone, with a form that brings you requests.",
      cta: "Tell us about your site",
      alt: "When it's needed",
    },
    machine: {
      kind: "wireframe",
      url: "yourbusiness.com",
      brand: "Your business",
      headline: "Found. And chosen.",
      cta: "Ask for a quote",
      ping: "New request · from the site",
      live: "Live",
      checks: ["Phone", "Google", "Fast"],
    },
    facts: [
      { k: "For", v: "People & businesses" },
      { k: "Timing", v: "3 to 12 weeks" },
      { k: "Formula", v: "Package or custom" },
    ],
    when: {
      title: "When it's needed.",
      items: [
        {
          t: "The site is",
          strike: "missing, or dated",
          fix: "like you",
          d: "People looking for you don't find you, or find a page stuck ten years ago that no longer says who you are.",
        },
        {
          t: "It's there, but",
          strike: "brings nothing",
          fix: "brings requests",
          d: "No calls, no forms sent: a shop window on a street nobody walks down.",
        },
        {
          t: "You need",
          strike: "a shop window",
          fix: "a tool",
          d: "A private area for clients, a portal, bookings or documents online: a site that works with you.",
        },
      ],
    },
    includes: {
      title: "What it covers.",
      lede: "From the first sketch to going live, and after: a site that gets found and that you can run.",
      items: [
        { t: "Designed to measure", d: "Structure and design start from your business, not from a recycled template." },
        { t: "Words for Google", d: "The words your clients use, where they count." },
        { t: "Made for the phone", d: "Fast and clear where most visits come from." },
        { t: "Forms that work", d: "Quotes, bookings, contacts: straight to your inbox." },
        { t: "Private areas and portals", d: "When needed: client logins, documents, orders." },
        { t: "You approve it finished", d: "It goes live once you've seen and approved it. Then we stay for the changes." },
      ],
    },
    steps: {
      title: "How we work.",
      items: [
        { t: "Free call", d: "Thirty minutes to understand what you need. No sales, no commitment." },
        { t: "Written proposal", d: "Pages, features, timing and cost, in plain words." },
        { t: "Design and build", d: "Updates at every step: you watch it grow and you decide." },
        { t: "Live", d: "It goes live when you approve it. And we stay for what changes." },
      ],
    },
    works: {
      title: "Some sites\nwe've built.",
      lede: "Each tells the problem it had and what changed.",
    },
    qa: {
      title: "The right\nquestions.",
      items: [
        {
          q: "How long does it take?",
          a: "From three weeks for a showcase site to twelve for a portal with a private area. The exact timing is in the written proposal.",
        },
        {
          q: "Can I edit it myself?",
          a: "Yes. Texts, photos and news are yours to change from a simple panel: we show you how, calmly, once and for all.",
        },
        {
          q: "Do you use templates?",
          a: "No: structure and design start from your business. The tools (WordPress or custom code) are chosen for what the site has to do.",
        },
        {
          q: "I have a site: do you start from scratch?",
          a: "Not necessarily. We start from what's there: we renew it, or rebuild it if that's better. We tell you first, with the reasons.",
        },
        {
          q: "Who takes care of domain and hosting?",
          a: "We can, or we work on the ones you already have. Either way, the domain and the content stay yours.",
        },
      ],
    },
    lead: {
      title: "Tell us\nabout your site.",
      lede: "What your business is, whether you have a site, what you'd like it to do. We'll reply to set up the first call.",
      topic: "Service · Websites & web apps",
      legend: "What you need",
      choices: [
        { id: "vetrina", name: "A new website" },
        { id: "rifacimento", name: "Redo the site I have" },
        { id: "portale", name: "A portal or a private area" },
      ],
      message: { label: "A couple of lines on the site (optional)", ph: "What the business is, what the site should do." },
      extra: { name: "site", label: "Your current site (optional)", ph: "www.…" },
    },
    portals: "The other services",
  },
};
