import type { Localized } from "../i18n";

/** Single source of truth for company facts. Change here, change everywhere. */
export const business = {
  name: "Soluzioni Digitali Alpacode",
  wordmark: "ALPACODE",
  email: "info@alpacode.it",
  vat: "14463350968",
  /** WhatsApp number, international format, digits only. Used only in the
   *  wa.me click-to-chat link — never rendered as visible text. */
  whatsapp: "393514003240",
  locations: "Monza · Milano · IT",
  locationsEn: "Monza · Milan · IT",
  hoursShort: "09:00 — 18:00 CET",
  social: {
    linkedin: "https://www.linkedin.com/company/soluzioni-digitali-alpacode/",
  },
  founded: "2025",
  /** The legal fine print the footers carry (the company data a site
   *  owes its visitors). What isn't confirmed yet is null and left out:
   *  docs/status.md lists it. */
  legal: {
    form: { it: "ditta individuale", en: "sole proprietorship" },
    office: { it: "Sede operativa: Monza · Milano (IT)", en: "Office: Monza · Milan (IT)" },
    /** Sede legale, the full street address. */
    registeredOffice: null as string | null,
    /** The REA number at the Chamber of Commerce (e.g. "MB-0000000"). */
    rea: null as string | null,
    /** The certified email (PEC). */
    pec: null as string | null,
  },
} as const;

/** The company line for a footer, from what's confirmed (business.legal). */
export function companyLine(lang: "it" | "en"): string {
  const l = business.legal;
  const vat = lang === "it" ? `P.IVA ${business.vat}` : `VAT ${business.vat}`;
  return [
    `${business.name} — ${l.form[lang]}`,
    l.registeredOffice ? `${lang === "it" ? "Sede legale" : "Registered office"}: ${l.registeredOffice}` : null,
    l.office[lang],
    vat,
    l.rea ? `REA ${l.rea}` : null,
    l.pec ? `PEC ${l.pec}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export const tagline: Localized = {
  it: "Digitalizziamo privati e imprese in Italia, dal primo sito al software su misura.",
  en: "We digitalize individuals and businesses across Italy, from a first website to custom software.",
};
