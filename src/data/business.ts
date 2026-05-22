import type { Localized } from "../i18n/types";

/** Single source of truth for company facts. Change here, change everywhere. */
export const business = {
  name: "Soluzioni Digitali Alpacode",
  wordmark: "ALPACODE",
  email: "info@alpacode.it",
  vat: "14463350968",
  /** WhatsApp number, international format, digits only. TODO: set the real one. */
  whatsapp: "393330000000",
  locations: "Monza · Milano · IT",
  locationsEn: "Monza · Milan · IT",
  hoursShort: "09:00 — 18:00 CET",
  social: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
  },
  founded: "2025",
} as const;

export const tagline: Localized = {
  it: "Digitalizziamo privati e imprese in Italia. Con professionalità, senza preventivi da capogiro.",
  en: "We digitalize individuals and businesses across Italy. Professionally, without sky-high quotes.",
};
