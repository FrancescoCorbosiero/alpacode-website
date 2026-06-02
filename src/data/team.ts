import type { Lang, Localized } from "../i18n/types";

/* ============================================================
   Team — the people behind Alpacode.

   Photos: drop a file named <id>.<ext> into src/assets/team/
   (e.g. francesco.jpg). It's optimized automatically. Until then,
   an elegant monogram placeholder is shown — the build never breaks.
   ============================================================ */

export interface Person {
  /** Resolves to src/assets/team/<id>.<ext> when present. */
  id: string;
  name: string;
  /** Two-letter monogram for the photo fallback. */
  initials: string;
  role: Localized;
  /** Optional one-line note, kept lean. */
  note?: Localized;
}

export const team: Person[] = [
  {
    id: "francesco",
    name: "Francesco Corbosiero",
    initials: "FC",
    role: {
      it: "Web Master & Full-Stack Developer · Head Strategist",
      en: "Web Master & Full-Stack Developer · Head Strategist",
    },
    note: {
      it: "Tiene insieme tecnica e strategia: dall'architettura del sito alla direzione del progetto.",
      en: "Holds tech and strategy together: from site architecture to project direction.",
    },
  },
  {
    id: "riccardo",
    name: "Riccardo Grassi",
    initials: "RG",
    role: {
      it: "Public Relations",
      en: "Public Relations",
    },
    note: {
      it: "Il primo contatto con i clienti: relazioni, fiducia e rapporti che durano.",
      en: "The first point of contact: relationships, trust and partnerships that last.",
    },
  },
  {
    id: "irene",
    name: "Irene Bellapianta",
    initials: "IB",
    role: {
      it: "Social Media & Digital Marketing",
      en: "Social Media & Digital Marketing",
    },
    note: {
      it: "Dà voce ai progetti online: contenuti, social e campagne che si fanno notare.",
      en: "Gives projects a voice online: content, social and campaigns that get noticed.",
    },
  },
];

export const personeCopy = {
  crumb: { it: "PERSONE", en: "PEOPLE" },
  line1: { it: "Le persone", en: "The people" },
  line2: { it: "dietro Alpacode.", en: "behind Alpacode." },
  lede: {
    it: "Siamo un team piccolo e affiatato. Niente call center, niente reparti: parli direttamente con chi lavora al tuo progetto.",
    en: "We're a small, close-knit team. No call centres, no departments: you talk straight to the people working on your project.",
  },
  photoLabel: { it: "Foto in arrivo", en: "Photo coming soon" },
} satisfies Record<string, Localized>;
