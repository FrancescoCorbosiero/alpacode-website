import type { Localized } from "../i18n/types";

/** Single source of truth for company facts. Change here, change everywhere. */
export const business = {
  name: "Soluzioni Digitali Alpacode",
  wordmark: "ALPACODE",
  email: "ciao@alpacode.it",
  vat: "14463350968",
  locations: "Monza · Milano · IT",
  locationsEn: "Monza · Milan · IT",
  hoursShort: "09:00 — 18:00 CET",
  social: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
  },
  founded: "2018",
} as const;

export const tagline: Localized = {
  it: "Costruiamo software che dura, consigliamo con calma, insegniamo con metodo.",
  en: "We build software that lasts, advise calmly, teach with method.",
};
