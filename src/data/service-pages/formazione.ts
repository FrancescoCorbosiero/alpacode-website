/* /servizi/formazione — Corsi & percorsi, Formazione per team (11, 13).
   Its machine: the teacher shows the first move, you make the second,
   the third is yours alone. */
import type { Lang } from "../../i18n/types";
import type { ServiceCopy } from "./types";

export const formazione: Record<Lang, ServiceCopy> = {
  it: {
    meta: {
      title: "Formazione digitale per aziende e professionisti — Alpacode",
      description:
        "Formazione su misura per team e professionisti, sui tuoi strumenti e sui tuoi casi reali: in aula o da remoto, con supporto anche dopo l'aula. Percorsi da una giornata a 32 ore.",
      ogAlt: "Formazione: quello che impariamo, te lo lasciamo.",
    },
    name: "Formazione",
    portal: "Quello che impariamo, te lo lasciamo.",
    hero: {
      kicker: "formazione",
      lines: ["Quello che impariamo,", "te lo lasciamo."],
      accent: { before: "Così diventi ", mark: "autonomo", after: "." },
      lede: "Formazione su misura per le aziende e percorsi pratici per chi vuole imparare un mestiere digitale: sui tuoi strumenti e sui tuoi casi reali, in aula o da remoto, con supporto anche dopo l'aula.",
      cta: "Raccontaci chi deve imparare",
      alt: "Quando serve",
    },
    machine: {
      kind: "lesson",
      screen: "La tua pagina",
      teacher: "Docente",
      you: "Tu",
      blocks: ["Titolo", "Foto", "Modulo"],
      done: "Fatto da te",
    },
    facts: [
      { k: "Formato", v: "In aula · remoto" },
      { k: "Durata", v: "Da 1 giornata a 32 ore" },
      { k: "Programma", v: "Su misura" },
    ],
    when: {
      title: "Quando serve.",
      items: [
        {
          t: "Il team",
          strike: "usa male gli strumenti",
          fix: "li usa tutti",
          d: "Si pagano licenze per funzioni che nessuno conosce, e si lavora a mano dove il programma lo farebbe da sé.",
        },
        {
          t: "Dipendi da qualcuno",
          strike: "per ogni cosa",
          fix: "solo per le grandi",
          d: "Una modifica al sito, un report, una mail automatica: ogni volta c'è da chiedere, e da aspettare.",
        },
        {
          t: "Vuoi imparare",
          strike: "da tutorial sparsi",
          fix: "un mestiere",
          d: "Sviluppo web, WordPress, Java: dalle basi a un livello professionale, con chi lo fa ogni giorno.",
        },
      ],
    },
    includes: {
      title: "Cosa comprende.",
      lede: "Si impara facendo, su quello che usi davvero: dalla prima lezione al giorno in cui non ti serviamo più.",
      items: [
        { t: "Programma su misura", d: "Costruito sui vostri strumenti, sui vostri casi e sul livello di chi c'è in aula." },
        { t: "In aula o da remoto", d: "Da voi, in studio o online, in giornate o in moduli." },
        { t: "Pratica, non slide", d: "Si lavora su casi reali dal primo giorno, con le mani sulla tastiera." },
        { t: "Materiali che restano", d: "Guide, esercizi e registrazioni, da riaprire quando serve." },
        { t: "Supporto dopo l'aula", d: "Le domande vere arrivano mettendo in pratica: rispondiamo anche allora." },
        { t: "Percorsi professionali", d: "WordPress, Java con Spring Boot: corsi lunghi per chi vuole farne un lavoro." },
      ],
    },
    steps: {
      title: "Come lavoriamo.",
      items: [
        { t: "Call gratuita", d: "Chi deve imparare, cosa, per farci cosa." },
        { t: "Programma", d: "Una proposta scritta: argomenti, ore, formato e materiali." },
        { t: "In aula", d: "Lezioni pratiche, sui vostri strumenti e sui vostri casi." },
        { t: "Dopo l'aula", d: "Materiali, esercizi e un canale per le domande che arrivano dopo." },
      ],
    },
    qa: {
      title: "Le domande\ngiuste.",
      items: [
        {
          q: "Quanto dura?",
          a: "Da una giornata, per un tema preciso, fino a 32 ore per un percorso completo. La durata la decidiamo insieme nel programma.",
        },
        {
          q: "Serve una base tecnica?",
          a: "No. Partiamo dal livello di chi c'è in aula, e il programma lo dice prima di iniziare.",
        },
        {
          q: "Dove si fa?",
          a: "Da voi, nel nostro studio o da remoto. Per i team, spesso conviene in sede: si lavora sui vostri computer e sui vostri dati.",
        },
        {
          q: "Cosa resta dopo il corso?",
          a: "I materiali, gli esercizi e un canale per le domande che arrivano mettendo in pratica.",
        },
        {
          q: "Fate anche corsi per chi vuole fare questo lavoro?",
          a: "Sì: i percorsi di Learning, da WordPress a Java con Spring Boot, per chi vuole arrivare a un livello professionale.",
        },
      ],
    },
    lead: {
      title: "Raccontaci\nchi deve imparare.",
      lede: "Chi c'è in aula, cosa deve saper fare alla fine, con quali strumenti. Ti rispondiamo con una prima idea di programma.",
      topic: "Servizio · Formazione",
      legend: "Cosa ti serve",
      choices: [
        { id: "team", name: "Formazione per il team" },
        { id: "percorso", name: "Un percorso per me" },
        { id: "tema", name: "Un tema preciso" },
      ],
      message: { label: "Due righe sull'aula (facoltativo)", ph: "Quante persone, che livello, quali strumenti." },
    },
    portals: "Gli altri servizi",
  },
  en: {
    meta: {
      title: "Digital training for companies and professionals — Alpacode",
      description:
        "Training built for teams and professionals, on your tools and your real cases: in a classroom or remotely, with support after the course. From one day to 32 hours.",
      ogAlt: "Training: what we learn, we hand over to you.",
    },
    name: "Training",
    portal: "What we learn, we hand over to you.",
    hero: {
      kicker: "training",
      lines: ["What we learn,", "we hand over."],
      accent: { before: "So you can ", mark: "do it yourself", after: "." },
      lede: "Training built for companies and hands-on courses for people who want to learn a digital trade: on your tools and your real cases, in a classroom or remotely, with support after the course.",
      cta: "Tell us who needs to learn",
      alt: "When it's needed",
    },
    machine: {
      kind: "lesson",
      screen: "Your page",
      teacher: "Teacher",
      you: "You",
      blocks: ["Title", "Photo", "Form"],
      done: "Done by you",
    },
    facts: [
      { k: "Format", v: "Classroom · remote" },
      { k: "Length", v: "From 1 day to 32 hours" },
      { k: "Programme", v: "Built to measure" },
    ],
    when: {
      title: "When it's needed.",
      items: [
        {
          t: "The team",
          strike: "barely uses the tools",
          fix: "uses all of them",
          d: "You pay for licences nobody knows how to use, and work by hand where the program would do it alone.",
        },
        {
          t: "You depend on someone",
          strike: "for everything",
          fix: "for the big things only",
          d: "A change on the site, a report, an automatic email: every time there's someone to ask, and to wait for.",
        },
        {
          t: "You want to learn",
          strike: "from scattered tutorials",
          fix: "a trade",
          d: "Web development, WordPress, Java: from the basics to a professional level, with people who do it every day.",
        },
      ],
    },
    includes: {
      title: "What it covers.",
      lede: "You learn by doing, on what you really use: from the first lesson to the day you no longer need us.",
      items: [
        { t: "A programme to measure", d: "Built on your tools, your cases and the level of the people in the room." },
        { t: "Classroom or remote", d: "At your place, in the studio or online, in days or in modules." },
        { t: "Practice, not slides", d: "Real cases from day one, hands on the keyboard." },
        { t: "Materials that stay", d: "Guides, exercises and recordings, to reopen when needed." },
        { t: "Support after the course", d: "The real questions come with practice: we answer then too." },
        { t: "Professional tracks", d: "WordPress, Java with Spring Boot: long courses for people who want to make it a job." },
      ],
    },
    steps: {
      title: "How we work.",
      items: [
        { t: "Free call", d: "Who needs to learn, what, and to do what." },
        { t: "Programme", d: "A written proposal: topics, hours, format and materials." },
        { t: "In the room", d: "Hands-on lessons, on your tools and your cases." },
        { t: "After the course", d: "Materials, exercises and a channel for the questions that come later." },
      ],
    },
    qa: {
      title: "The right\nquestions.",
      items: [
        {
          q: "How long does it last?",
          a: "From one day, for a specific topic, up to 32 hours for a full track. We set the length together in the programme.",
        },
        {
          q: "Do we need a technical background?",
          a: "No. We start from the level of the people in the room, and the programme says so before we begin.",
        },
        {
          q: "Where does it take place?",
          a: "At your place, in our studio or remotely. For teams, on site is often best: we work on your computers and your data.",
        },
        {
          q: "What's left after the course?",
          a: "The materials, the exercises and a channel for the questions that come up in practice.",
        },
        {
          q: "Do you teach people who want to do this job?",
          a: "Yes: the Learning tracks, from WordPress to Java with Spring Boot, for people who want to reach a professional level.",
        },
      ],
    },
    lead: {
      title: "Tell us\nwho needs to learn.",
      lede: "Who's in the room, what they should be able to do at the end, with which tools. We'll reply with a first idea of the programme.",
      topic: "Service · Training",
      legend: "What you need",
      choices: [
        { id: "team", name: "Training for the team" },
        { id: "percorso", name: "A track for me" },
        { id: "tema", name: "A specific topic" },
      ],
      message: { label: "A couple of lines on the room (optional)", ph: "How many people, what level, which tools." },
    },
    portals: "The other services",
  },
};
