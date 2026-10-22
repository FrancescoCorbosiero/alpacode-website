/* ============================================================
   /per-chi-fa-siti — the group page for people who build sites for
   clients (developers, web designers). Two doors — your own
   hosting, sites produced with AI — and the formula they share.
   The doors' pages: data/landing/hosting.ts, data/landing/ai.ts.
   ============================================================ */
import type { Lang } from "../../i18n/types";
import type { FormulaCopy } from "./shared";

export interface HubCopy {
  meta: { title: string; description: string; ogAlt: string };
  crumb: string;
  hero: {
    kicker: string;
    lines: string[];
    accent: { before: string; mark: string; after: string };
    lede: string;
  };
  doors: { slug: string; tag: string; title: string; body: string; cta: string }[];
  band: string[];
  formula: FormulaCopy;
  lead: { title: string; lede: string; topic: string };
  portalsTitle: string;
}

export const hub: Record<Lang, HubCopy> = {
  it: {
    meta: {
      title: "Per chi fa siti ai clienti: hosting tuo e siti con l'AI — Alpacode",
      description:
        "Sviluppatori e web designer: smetti di pagare un hosting per ogni cliente e sforna siti con l'AI. Codebase, corso o formazione 1:1, per una cosa o per entrambe.",
      ogAlt: "Fai siti per i clienti? Due cose cambiano i conti. — Alpacode",
    },
    crumb: "Per chi fa siti",
    hero: {
      kicker: "per sviluppatori e web designer",
      lines: ["Fai siti", "per i clienti?"],
      accent: { before: "", mark: "Due cose", after: " cambiano i conti." },
      lede: "Dove metti i siti dei clienti e come li produci: da lì dipende quanto ti resta del lavoro che fai. Su tutte e due ti diamo strumenti e formazione.",
    },
    doors: [
      {
        slug: "per-chi-fa-siti/hosting",
        tag: "Hosting",
        title: "Smetti di pagare un hosting per ogni cliente.",
        body: "Un server tuo e una codebase pronta: tutti i siti dei clienti in un posto solo, e il canone diventa margine.",
        cta: "Fai i conti",
      },
      {
        slug: "per-chi-fa-siti/ai",
        tag: "AI",
        title: "Sforna siti con l'AI, senza farli tutti uguali.",
        body: "Sistema, agenti e controlli: la catena di montaggio per produrre siti per i clienti, con le scelte che restano tue.",
        cta: "Guarda la catena",
      },
    ],
    band: ["Produci con la catena", "pubblica sul tuo server"],
    formula: {
      title: "Per tutte e due,\ntre modi di iniziare.",
      lede: "Su una cosa sola o su entrambe: la codebase c'è sempre, cambia quanto ti accompagniamo.",
      badge: "il più adatto a te",
      recommend: { dev: "codebase", designer: "corso" },
      tiers: [
        {
          id: "codebase",
          level: "Da solo",
          name: "Codebase",
          line: "Il codice, pronto.",
          forWho: "Per chi sa già muoversi tra server, Git e framework.",
          items: ["La codebase dell'hosting, della catena o di entrambe", "La documentazione per partire", "Gli aggiornamenti"],
          cta: "Scelgo la codebase",
        },
        {
          id: "corso",
          level: "Con il metodo",
          name: "Corso + codebase",
          line: "Ogni pezzo, capito.",
          forWho: "Per chi vuole capire come funziona prima di metterci i clienti.",
          carry: "Tutto della Codebase",
          items: ["I corsi in video, passo passo", "Esercizi su progetti di prova"],
          cta: "Scelgo il corso",
        },
        {
          id: "uno-a-uno",
          level: "Con noi accanto",
          name: "Formazione 1:1",
          line: "Qualcuno al tuo fianco.",
          forWho: "Per chi vuole partire in fretta, sui propri progetti.",
          carry: "Tutto del Corso + codebase",
          items: ["Sessioni individuali con chi ha costruito gli strumenti", "Tutto impostato insieme, sui tuoi clienti"],
          cta: "Scelgo l'1:1",
        },
      ],
      note: "Prezzi su richiesta: dipendono dal percorso e da cosa scegli.",
    },
    lead: {
      title: "Parliamone.",
      lede: "Raccontaci che siti fai, per chi e dove li ospiti: ti rispondiamo con il percorso adatto, di persona.",
      topic: "Per chi fa siti",
    },
    portalsTitle: "E per imparare il resto",
  },
  en: {
    meta: {
      title: "For people who build client sites: your own hosting, sites with AI — Alpacode",
      description:
        "Developers and web designers: stop paying a hosting plan per client and turn out sites with AI. Codebase, course or 1:1 training, for one or both.",
      ogAlt: "Building sites for clients? Two things change the maths. — Alpacode",
    },
    crumb: "For people who build sites",
    hero: {
      kicker: "for developers and web designers",
      lines: ["Building sites", "for clients?"],
      accent: { before: "", mark: "Two things", after: " change the maths." },
      lede: "Where you put your clients' sites and how you produce them: that's what decides how much of your work you keep. On both, we give you tools and training.",
    },
    doors: [
      {
        slug: "per-chi-fa-siti/hosting",
        tag: "Hosting",
        title: "Stop paying a hosting plan per client.",
        body: "Your own server and a ready codebase: all your clients' sites in one place, and the hosting fee becomes margin.",
        cta: "Do the maths",
      },
      {
        slug: "per-chi-fa-siti/ai",
        tag: "AI",
        title: "Turn out sites with AI, without making them alike.",
        body: "A system, agents and checks: the assembly line for producing client sites, with the choices left to you.",
        cta: "See the line",
      },
    ],
    band: ["Produce on the line", "publish on your server"],
    formula: {
      title: "For both,\nthree ways to start.",
      lede: "On one or on both: the codebase is always there, what changes is how far we walk with you.",
      badge: "the best fit for you",
      recommend: { dev: "codebase", designer: "corso" },
      tiers: [
        {
          id: "codebase",
          level: "On your own",
          name: "Codebase",
          line: "The code, ready.",
          forWho: "For people who already find their way around servers, Git and frameworks.",
          items: ["The hosting codebase, the line's, or both", "The docs to get going", "Updates"],
          cta: "I'll take the codebase",
        },
        {
          id: "corso",
          level: "With the method",
          name: "Course + codebase",
          line: "Every piece, understood.",
          forWho: "For people who want to know how it works before putting clients on it.",
          carry: "Everything in Codebase",
          items: ["The video courses, step by step", "Exercises on practice projects"],
          cta: "I'll take the course",
        },
        {
          id: "uno-a-uno",
          level: "With us beside you",
          name: "1:1 training",
          line: "Someone at your side.",
          forWho: "For people who want to move fast, on their own projects.",
          carry: "Everything in Course + codebase",
          items: ["One-to-one sessions with the people who built the tools", "Everything set up together, on your clients"],
          cta: "I'll take the 1:1",
        },
      ],
      note: "Prices on request: they depend on the path and on what you choose.",
    },
    lead: {
      title: "Let's talk.",
      lede: "Tell us what sites you build, for whom and where you host them: we'll reply with the right path, in person.",
      topic: "For people who build sites",
    },
    portalsTitle: "And to learn the rest",
  },
};
