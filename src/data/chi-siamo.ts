/* ============================================================
   Chi siamo (/chi-siamo, /en/chi-siamo) — the studio and its people.

   The studio first, then the people who work in it: the founder
   (his own words come from his LinkedIn profile), the social media
   manager, the technology partner for enterprise projects, and the
   network of independents around them (Collabora con noi). The
   site's voice stays "noi".

   PLACEHOLDERS — to replace with the real ones:
   - Irene's and Riccardo's bios are drawn from their roles only, and
     every portrait is a monogram (`photo: null`): drop a photo in
     src/assets/people/<id>.(jpg|png|webp) and it takes its place.
   - `linkedin: null` hides the profile link.
   ============================================================ */
import type { Lang } from "../i18n/types";

export interface Person {
  id: string;
  name: string;
  role: string;
  /** A paragraph or two, in the third person. */
  bio: string[];
  /** What they work with. */
  tags: string[];
  linkedin: string | null;
  /** True while the bio is a placeholder written from the role. */
  draft?: boolean;
}

export interface ChiSiamoData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  what: { kicker: string; title: string; items: { t: string; d: string }[] };
  statement: string;
  people: { kicker: string; title: string; lede: string; list: Person[] };
  fit: { kicker: string; title: string; items: string[] };
  network: { title: string; text: string; cta: string };
}

export const chiSiamo: Record<Lang, ChiSiamoData> = {
  it: {
    crumb: "Chi siamo",
    h1Line1: "Uno studio piccolo,",
    h1Line2: "per scelta.",
    lede: "Aiutiamo aziende, professionisti e agenzie a costruire la propria presenza digitale e a farla crescere. Siti, e-commerce, software su misura, integrazioni di intelligenza artificiale: tutto pensato per dare risultati misurabili, non solo per fare bella figura online.",
    what: {
      kicker: "Cosa facciamo, in concreto",
      title: "Cinque cose,\nfatte bene.",
      items: [
        {
          t: "Siti che lavorano davvero",
          d: "Veloci, ben posizionati sui motori di ricerca, costruiti per trasformare i visitatori in clienti. SEO, prestazioni e design non sono extra: fanno parte del progetto dall'inizio.",
        },
        {
          t: "E-commerce e gestione automatizzata",
          d: "Portiamo online la tua attività commerciale, ma non solo: costruiamo un sistema su misura per gestirla in automatico.",
        },
        {
          t: "Software e applicazioni web su misura",
          d: "Per chi ha esigenze che gli strumenti pronti non coprono: gestionali, portali, automazioni, integrazioni con i sistemi che usate già. Dal piccolo strumento interno alla piattaforma completa.",
        },
        {
          t: "Integrazioni di modelli LLM",
          d: "Assistenti che rispondono ai clienti, automazioni che fanno risparmiare ore di lavoro, contenuti generati e curati. Solo casi d'uso concreti, con un ritorno chiaro sull'investimento.",
        },
        {
          t: "Consulenza digitale",
          d: "Per chi vuole capire prima di spendere: l'analisi della situazione, la scelta degli strumenti giusti, una strategia sostenibile. Senza venderti soluzioni che non ti servono.",
        },
      ],
    },
    statement:
      "Agenzie piccole e grandi aziende, progetti enterprise e attività locali: il rigore di chi ha visto progetti complessi, la concretezza di chi sa lavorare con budget veri.",
    people: {
      kicker: "Le persone",
      title: "Chi trovi\ndall'altra parte.",
      lede: "Un fondatore che costruisce quello che progetta, e le persone con cui lavora ogni giorno. Chi segue il tuo progetto è anche chi lo realizza.",
      list: [
        {
          id: "francesco-corbosiero",
          name: "Francesco Corbosiero",
          role: "Fondatore · ingegnere full stack",
          bio: [
            "Costruisce ecosistemi digitali per PMI e agenzie: Java e Spring Boot, WordPress, integrazioni di modelli LLM. Prima di Alpacode è stato software developer in Red Software Systems e poi, dal 2022 al 2025, in GFT Technologies, su progetti enterprise.",
            "Dal 2025 guida Alpacode, da Monza. Porta a ogni cliente la doppia esperienza delle grandi aziende e delle attività locali.",
          ],
          tags: ["Java · Spring Boot", "WordPress", "Integrazioni LLM", "Software su misura", "SEO e analytics"],
          linkedin: null,
        },
        {
          id: "irene-bellapianta",
          name: "Irene Bellapianta",
          role: "Social media manager",
          bio: ["Segue i social dei progetti di Alpacode: piano editoriale, contenuti, community. Il marketing di Alpacode Studio passa anche da lei."],
          tags: ["Social", "Contenuti", "Community"],
          linkedin: null,
          draft: true,
        },
        {
          id: "riccardo-grassi",
          name: "Riccardo Grassi",
          role: "Partner tecnologico · progetti enterprise",
          bio: ["Affianca Alpacode sui progetti enterprise: architetture, integrazioni e sistemi che devono reggere carichi e anni."],
          tags: ["Enterprise", "Architetture", "Integrazioni"],
          linkedin: null,
          draft: true,
        },
      ],
    },
    fit: {
      kicker: "Lavoriamo insieme se",
      title: "Lavoriamo\ninsieme se…",
      items: [
        "Vuoi un sito o un e-commerce che produca risultati, non solo complimenti.",
        "Hai un'idea o un'esigenza specifica che richiede uno strumento su misura.",
        "Sei un'agenzia che cerca un partner tecnico affidabile per i suoi progetti.",
        "Vuoi capire come l'intelligenza artificiale può davvero aiutare la tua attività.",
      ],
    },
    network: {
      title: "Intorno, una rete di professionisti.",
      text: "Designer, sviluppatori, fotografi, copywriter: sui progetti che lo chiedono lavoriamo con professionisti indipendenti, scelti per quello che sanno fare.",
      cta: "Collabora con noi",
    },
  },
  en: {
    crumb: "About",
    h1Line1: "A small studio,",
    h1Line2: "by choice.",
    lede: "We help companies, professionals and agencies build their digital presence and make it grow. Websites, e-commerce, custom software, artificial intelligence integrations: all designed to deliver measurable results, not just to look good online.",
    what: {
      kicker: "What we do, concretely",
      title: "Five things,\ndone well.",
      items: [
        {
          t: "Websites that actually work",
          d: "Fast, well placed on search engines, built to turn visitors into clients. SEO, performance and design aren't extras: they're part of the project from the start.",
        },
        {
          t: "E-commerce and automated management",
          d: "We take your shop online, and more: we build a bespoke system to run it automatically.",
        },
        {
          t: "Custom software and web applications",
          d: "For needs off-the-shelf tools don't cover: internal tools, portals, automations, integrations with the systems you already use. From a small internal tool to a complete platform.",
        },
        {
          t: "LLM integrations",
          d: "Assistants that answer your clients, automations that save hours of work, content generated and curated. Concrete use cases only, with a clear return on the investment.",
        },
        {
          t: "Digital consulting",
          d: "For people who want to understand before spending: an analysis of where you are, the right tools, a sustainable strategy. Without selling you solutions you don't need.",
        },
      ],
    },
    statement:
      "Small agencies and large companies, enterprise projects and local businesses: the rigour of people who've seen complex projects, the pragmatism of people who know how to work with real budgets.",
    people: {
      kicker: "The people",
      title: "Who you find\non the other side.",
      lede: "A founder who builds what he designs, and the people he works with every day. Whoever follows your project is also who makes it.",
      list: [
        {
          id: "francesco-corbosiero",
          name: "Francesco Corbosiero",
          role: "Founder · full-stack engineer",
          bio: [
            "He builds digital ecosystems for SMEs and agencies: Java and Spring Boot, WordPress, LLM integrations. Before Alpacode he was a software developer at Red Software Systems and then, from 2022 to 2025, at GFT Technologies, on enterprise projects.",
            "Since 2025 he has led Alpacode, from Monza. He brings every client the double experience of large companies and local businesses.",
          ],
          tags: ["Java · Spring Boot", "WordPress", "LLM integrations", "Custom software", "SEO and analytics"],
          linkedin: null,
        },
        {
          id: "irene-bellapianta",
          name: "Irene Bellapianta",
          role: "Social media manager",
          bio: ["She runs the social side of Alpacode's projects: editorial plan, content, community. Alpacode Studio's marketing goes through her too."],
          tags: ["Social", "Content", "Community"],
          linkedin: null,
          draft: true,
        },
        {
          id: "riccardo-grassi",
          name: "Riccardo Grassi",
          role: "Technology partner · enterprise projects",
          bio: ["He works alongside Alpacode on enterprise projects: architectures, integrations and systems that have to hold up under load and over the years."],
          tags: ["Enterprise", "Architectures", "Integrations"],
          linkedin: null,
          draft: true,
        },
      ],
    },
    fit: {
      kicker: "Let's work together if",
      title: "Let's work\ntogether if…",
      items: [
        "You want a site or an e-commerce that brings results, not just compliments.",
        "You have an idea or a specific need that calls for a bespoke tool.",
        "You're an agency looking for a reliable technical partner for your projects.",
        "You want to understand how artificial intelligence can really help your business.",
      ],
    },
    network: {
      title: "Around us, a network of professionals.",
      text: "Designers, developers, photographers, copywriters: on the projects that call for it we work with independent professionals, chosen for what they do well.",
      cta: "Work with us",
    },
  },
};
