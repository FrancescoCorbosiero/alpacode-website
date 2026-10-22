/* ============================================================
   /per-chi-fa-siti/ai — for developers and web designers who still
   build every client site by hand, one at a time.

   The pitch: the way sites are made has changed. A system, AI
   agents and automatic checks do the repetitive part; the person
   keeps the choices. Alpacode works this way — this page included
   (the "make-of" panel shows its own data) — and sells the same
   formula as the hosting page: codebase / course + codebase / 1:1.

   No figures on speed or savings: the page shows how the work is
   split, not a percentage.
   ============================================================ */
import type { Lang } from "../../i18n/types";
import type { FormulaCopy, Objection } from "./shared";

export interface AiCopy {
  meta: { title: string; description: string; ogAlt: string };
  hero: {
    kicker: string;
    lines: string[];
    accent: { before: string; mark: string; after: string };
    lede: string;
    cta: string;
    alt: string;
    /** The press stamps out one site per client type. */
    clients: string[];
    stamp: string;
  };
  shift: {
    beats: { title: string; body: string }[];
    you: string;
    ai: string;
    time: string;
    /** keep: stays with the person. */
    tasks: { t: string; keep?: boolean }[];
  };
  line: {
    title: string;
    lede: string;
    stations: { name: string; d: string }[];
    demo: {
      brief: string[];
      name: string;
      headline: string;
      cta: string;
      domain: string;
      pen: string;
      checks: string[];
      live: string;
    };
  };
  makeof: {
    title: string;
    body: string;
    show: string;
    hide: string;
    page: string;
    data: string;
  };
  kit: {
    title: string;
    lede: string;
    items: { name: string; d: string }[];
    hosting: { q: string; link: string };
  };
  formula: FormulaCopy;
  qa: { title: string; items: Objection[] };
  lead: { title: string; lede: string; topic: string; sites: string; sitesPh: string };
}

export const ai: Record<Lang, AiCopy> = {
  it: {
    meta: {
      title: "Sforna siti per i tuoi clienti con l'AI: il metodo, la catena, gli strumenti — Alpacode",
      description:
        "Il modo di fare siti è cambiato. Sistema, agenti AI e controlli automatici: ti mostriamo come produrre siti per i clienti in serie, senza farli tutti uguali.",
      ogAlt: "Sforna siti per i tuoi clienti. Con l'AI. — Alpacode",
    },
    hero: {
      kicker: "per sviluppatori e web designer",
      lines: ["Sforna siti", "per i tuoi clienti."],
      accent: { before: "", mark: "Con l'AI", after: "." },
      lede: "Fare un sito alla volta, a mano, da zero, era il mestiere di ieri. Oggi un sistema ben fatto e agenti AI ben istruiti fanno il lavoro ripetitivo; a te restano le scelte. Ti mostriamo come lavoriamo noi, e ti diamo gli stessi strumenti.",
      cta: "Scegli come iniziare",
      alt: "Guarda la catena",
      clients: ["Pizzeria", "Studio legale", "Palestra", "Fiorista", "Ottica", "Agriturismo"],
      stamp: "pronto",
    },
    shift: {
      beats: [
        {
          title: "Il mestiere\nè cambiato.",
          body: "Un sito fatto a mano è una fila di lavori: strutture, componenti, varianti, testi di partenza, immagini, controlli. Tutti necessari, quasi tutti uguali da un cliente all'altro.",
        },
        {
          title: "La parte ripetitiva\nla fanno gli agenti.",
          body: "Generano, adattano e verificano. A te restano brief, struttura, scelte e revisione: la parte che i clienti pagano davvero.",
        },
      ],
      you: "Tu",
      ai: "Agenti AI",
      time: "il tuo tempo",
      tasks: [
        { t: "Brief", keep: true },
        { t: "Struttura", keep: true },
        { t: "Componenti" },
        { t: "Varianti" },
        { t: "Testi di partenza" },
        { t: "Immagini e alt" },
        { t: "SEO tecnica" },
        { t: "Accessibilità" },
        { t: "Test" },
        { t: "Pubblicazione" },
        { t: "Scelte", keep: true },
        { t: "Revisione", keep: true },
      ],
    },
    line: {
      title: "La catena\ndi montaggio.",
      lede: "Sei stazioni, sempre le stesse. Il sito passa da una all'altra e a ogni passaggio si avvicina a quello che consegni.",
      stations: [
        { name: "Brief", d: "Il cliente, il settore, gli obiettivi: una scheda, sempre la stessa." },
        { name: "Sistema", d: "Token, componenti e modelli di pagina: lo stampo che rende ogni sito coerente e veloce da comporre." },
        { name: "Agenti AI", d: "Dal brief alla prima versione: pagine, testi di partenza, varianti. Arriva mentre lavori ad altro." },
        { name: "Revisione", d: "Qui entri tu: tagli, correggi, alzi il livello. L'AI propone, tu firmi." },
        { name: "Controlli", d: "Build, accessibilità, prestazioni e SEO tecnica, verificati in automatico a ogni modifica." },
        { name: "Online", d: "Un comando e il sito è pubblicato. Il prossimo è già sulla linea." },
      ],
      demo: {
        brief: ["Pizzeria da Gino", "Monza, dal 1987", "obiettivo: prenotazioni"],
        name: "Da Gino",
        headline: "La pizza di Monza, dal 1987.",
        cta: "Prenota un tavolo",
        domain: "pizzeriadagino.it",
        pen: "più grande!",
        checks: ["Build", "Accessibilità", "Prestazioni", "SEO"],
        live: "online",
      },
    },
    makeof: {
      title: "Questa pagina è uscita\ndalla stessa catena.",
      body: "Non è un modo di dire: i testi che leggi stanno in un file di dati, la pagina è composta da un sistema di componenti, e l'abbiamo prodotta con il metodo che insegniamo. Guarda tu.",
      show: "Mostra i dati",
      hide: "Mostra la pagina",
      page: "La pagina",
      data: "I dati",
    },
    kit: {
      title: "La tua catena,\ngià montata.",
      lede: "La codebase è la catena pronta: la imposti una volta, poi ogni cliente nuovo è un brief, non un progetto da zero.",
      items: [
        { name: "Sistema di design", d: "Token, tipografia, griglie e componenti, da adattare all'identità di ogni cliente." },
        { name: "Modelli di pagina", d: "Home, servizi, landing, contatti, blog: struttura e contenuti tenuti separati." },
        { name: "Istruzioni per gli agenti", d: "Le procedure che fanno lavorare un agente AI come uno del team: dal brief alla pagina, con le tue regole." },
        { name: "Contenuti a schema", d: "Testi e dati in file strutturati: cambi cliente, non riscrivi il sito." },
        { name: "Controlli automatici", d: "Tipi, build, accessibilità e prestazioni verificati prima di ogni pubblicazione." },
        { name: "Pubblicazione", d: "Online con un comando, su un server tuo o del cliente." },
      ],
      hosting: { q: "E dove li metti online?", link: "Sul tuo server, senza un canone per cliente" },
    },
    formula: {
      title: "Scegli quanto\nvuoi fare da solo.",
      lede: "La codebase c'è sempre. Cambia quanto ti accompagniamo: dalla catena pronta a qualcuno che la monta insieme a te.",
      badge: "il più adatto a te",
      recommend: { dev: "codebase", designer: "corso" },
      tiers: [
        {
          id: "codebase",
          level: "Da solo",
          name: "Codebase",
          line: "La catena, pronta.",
          forWho: "Per chi lavora già con Git e un framework moderno e vuole partire subito.",
          items: [
            "Sistema, modelli di pagina, istruzioni per gli agenti, controlli e pubblicazione",
            "Documentazione per impostarla sul primo cliente",
            "Gli aggiornamenti della codebase",
          ],
          cta: "Scelgo la codebase",
        },
        {
          id: "corso",
          level: "Con il metodo",
          name: "Corso + codebase",
          line: "Il metodo, dall'inizio.",
          forWho: "Per chi vuole imparare a guidare gli agenti prima di metterli sui clienti.",
          carry: "Tutto della Codebase",
          items: [
            "Il corso in video: progetto, brief per l'agente, revisione, consegna",
            "Un sito d'esempio costruito passo passo, dall'inizio alla fine",
            "Come adattare il sistema al tuo stile",
          ],
          cta: "Scelgo il corso",
        },
        {
          id: "uno-a-uno",
          level: "Con noi accanto",
          name: "Formazione 1:1",
          line: "La tua catena, montata insieme.",
          forWho: "Per chi vuole partire in fretta, sui clienti veri.",
          carry: "Tutto del Corso + codebase",
          items: [
            "Sessioni individuali con chi usa la catena ogni giorno",
            "La tua catena impostata insieme, sui tuoi progetti",
            "Revisione dei primi siti che produci così",
          ],
          cta: "Scelgo l'1:1",
        },
      ],
      note: "Prezzi su richiesta: dipendono dal percorso che scegli.",
    },
    qa: {
      title: "Le domande\nche ci fanno.",
      items: [
        {
          q: "Così i siti vengono tutti uguali?",
          a: "Uguali vengono i siti fatti con lo stesso template. Una catena parte da un sistema che adatti a ogni cliente: cambiano identità, struttura e contenuti; resta uguale solo il livello di qualità.",
        },
        {
          q: "Devo saper programmare?",
          a: "Per usare la codebase da solo, quel tanto che basta a leggere un progetto. Se arrivi dal design, il corso parte dalle basi e ti porta a guidare gli agenti invece di scrivere ogni riga.",
        },
        {
          q: "Quali strumenti usate?",
          a: "Agenti AI per il codice, un framework moderno per i siti (Astro) e Git per tutto. Il metodo non dipende da un singolo strumento: quando ne esce uno migliore, cambi un pezzo della catena, non la catena.",
        },
        {
          q: "E con WordPress?",
          a: "Il metodo vale anche lì, e per chi lavora su WordPress c'è il corso «WordPress + AI». La codebase è pensata per siti moderni: più veloci, più semplici da mantenere.",
        },
        {
          q: "E se l'AI sbaglia?",
          a: "Sbaglia, a volte. Per questo nella catena ci sono la revisione e i controlli automatici: niente va online senza essere passato da tutti e due.",
        },
        {
          q: "Lo devo dire ai clienti?",
          a: "Diglielo pure: è un punto a tuo favore. Ai clienti interessano tempi, qualità e un sito che funziona; la catena serve a darglieli.",
        },
      ],
    },
    lead: {
      title: "Parliamone.",
      lede: "Raccontaci che siti fai e con quali strumenti: ti rispondiamo con il percorso adatto, di persona.",
      topic: "Siti con l'AI",
      sites: "Siti che consegni in un anno (facoltativo)",
      sitesPh: "es. 12",
    },
  },

  en: {
    meta: {
      title: "Turn out sites for your clients with AI: the method, the line, the tools — Alpacode",
      description:
        "The way sites are made has changed. A system, AI agents and automatic checks: we show you how to produce client sites in series, without making them all alike.",
      ogAlt: "Turn out sites for your clients. With AI. — Alpacode",
    },
    hero: {
      kicker: "for developers and web designers",
      lines: ["Turn out sites", "for your clients."],
      accent: { before: "", mark: "With AI", after: "." },
      lede: "Building one site at a time, by hand, from scratch, was yesterday's craft. Today a well-made system and well-instructed AI agents do the repetitive work; the choices stay with you. We show you how we work, and give you the same tools.",
      cta: "Choose how to start",
      alt: "See the line",
      clients: ["Pizzeria", "Law firm", "Gym", "Florist", "Optician", "Farm stay"],
      stamp: "ready",
    },
    shift: {
      beats: [
        {
          title: "The craft\nhas changed.",
          body: "A hand-built site is a queue of jobs: structures, components, variants, first drafts, images, checks. All of them needed, nearly all of them the same from one client to the next.",
        },
        {
          title: "The repetitive part\ngoes to the agents.",
          body: "They generate, adapt and verify. You keep the brief, the structure, the choices and the review: the part clients actually pay for.",
        },
      ],
      you: "You",
      ai: "AI agents",
      time: "your time",
      tasks: [
        { t: "Brief", keep: true },
        { t: "Structure", keep: true },
        { t: "Components" },
        { t: "Variants" },
        { t: "First drafts" },
        { t: "Images and alt" },
        { t: "Technical SEO" },
        { t: "Accessibility" },
        { t: "Tests" },
        { t: "Publishing" },
        { t: "Choices", keep: true },
        { t: "Review", keep: true },
      ],
    },
    line: {
      title: "The assembly\nline.",
      lede: "Six stations, always the same. The site moves from one to the next and at each step gets closer to what you deliver.",
      stations: [
        { name: "Brief", d: "The client, the sector, the goals: one sheet, always the same." },
        { name: "System", d: "Tokens, components and page templates: the mould that keeps every site consistent and quick to put together." },
        { name: "AI agents", d: "From the brief to the first version: pages, first drafts, variants. It arrives while you work on something else." },
        { name: "Review", d: "This is where you come in: cut, correct, raise the bar. The AI proposes, you sign off." },
        { name: "Checks", d: "Build, accessibility, performance and technical SEO, verified automatically on every change." },
        { name: "Live", d: "One command and the site is published. The next one is already on the line." },
      ],
      demo: {
        brief: ["Pizzeria da Gino", "Monza, since 1987", "goal: bookings"],
        name: "Da Gino",
        headline: "Monza's pizza, since 1987.",
        cta: "Book a table",
        domain: "pizzeriadagino.it",
        pen: "bigger!",
        checks: ["Build", "Accessibility", "Performance", "SEO"],
        live: "live",
      },
    },
    makeof: {
      title: "This page came off\nthe same line.",
      body: "Not a figure of speech: the copy you're reading lives in a data file, the page is put together by a component system, and we produced it with the method we teach. See for yourself.",
      show: "Show the data",
      hide: "Show the page",
      page: "The page",
      data: "The data",
    },
    kit: {
      title: "Your line,\nalready set up.",
      lede: "The codebase is the ready-made line: you set it up once, then every new client is a brief, not a project from scratch.",
      items: [
        { name: "Design system", d: "Tokens, type, grids and components, to adapt to each client's identity." },
        { name: "Page templates", d: "Home, services, landing, contact, blog: structure and content kept apart." },
        { name: "Agent instructions", d: "The procedures that make an AI agent work like one of the team: from brief to page, by your rules." },
        { name: "Schema-based content", d: "Copy and data in structured files: change client, don't rewrite the site." },
        { name: "Automatic checks", d: "Types, build, accessibility and performance verified before every release." },
        { name: "Publishing", d: "Live with one command, on your server or the client's." },
      ],
      hosting: { q: "And where do they go live?", link: "On your own server, without a plan per client" },
    },
    formula: {
      title: "Choose how much\nyou do on your own.",
      lede: "The codebase is always there. What changes is how far we walk with you: from the ready-made line to someone setting it up with you.",
      badge: "the best fit for you",
      recommend: { dev: "codebase", designer: "corso" },
      tiers: [
        {
          id: "codebase",
          level: "On your own",
          name: "Codebase",
          line: "The line, ready.",
          forWho: "For people who already work with Git and a modern framework and want to start now.",
          items: [
            "System, page templates, agent instructions, checks and publishing",
            "Docs to set it up on your first client",
            "Updates to the codebase",
          ],
          cta: "I'll take the codebase",
        },
        {
          id: "corso",
          level: "With the method",
          name: "Course + codebase",
          line: "The method, from the start.",
          forWho: "For people who want to learn to steer the agents before putting them on clients.",
          carry: "Everything in Codebase",
          items: [
            "The video course: project, brief for the agent, review, delivery",
            "A sample site built step by step, start to finish",
            "How to adapt the system to your style",
          ],
          cta: "I'll take the course",
        },
        {
          id: "uno-a-uno",
          level: "With us beside you",
          name: "1:1 training",
          line: "Your line, set up together.",
          forWho: "For people who want to move fast, on real clients.",
          carry: "Everything in Course + codebase",
          items: [
            "One-to-one sessions with people who use the line every day",
            "Your line set up together, on your projects",
            "Review of the first sites you produce this way",
          ],
          cta: "I'll take the 1:1",
        },
      ],
      note: "Prices on request: they depend on the path you choose.",
    },
    qa: {
      title: "The questions\nwe get asked.",
      items: [
        {
          q: "Won't the sites all look alike?",
          a: "Sites made from the same template look alike. A line starts from a system you adapt to each client: identity, structure and content change; only the level of quality stays the same.",
        },
        {
          q: "Do I need to code?",
          a: "To use the codebase on your own, enough to read a project. If you come from design, the course starts from the basics and gets you steering the agents instead of writing every line.",
        },
        {
          q: "Which tools do you use?",
          a: "AI coding agents, a modern framework for sites (Astro) and Git for everything. The method doesn't hang on one tool: when a better one comes out, you swap a piece of the line, not the line.",
        },
        {
          q: "What about WordPress?",
          a: "The method works there too, and for people on WordPress there's the «WordPress + AI» course. The codebase is built for modern sites: faster, simpler to maintain.",
        },
        {
          q: "What if the AI gets it wrong?",
          a: "It does, sometimes. That's why the line has the review and the automatic checks: nothing goes live without passing both.",
        },
        {
          q: "Should I tell my clients?",
          a: "Go ahead: it counts in your favour. Clients care about timing, quality and a site that works; the line is there to give them that.",
        },
      ],
    },
    lead: {
      title: "Let's talk.",
      lede: "Tell us what sites you build and with which tools: we'll reply with the right path, in person.",
      topic: "Sites with AI",
      sites: "Sites you deliver in a year (optional)",
      sitesPh: "e.g. 12",
    },
  },
};
