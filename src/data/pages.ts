import type { Lang, Localized } from "../i18n/types";

export type PageKey =
  | "home"
  | "servizi"
  | "lavori"
  | "scuola"
  | "blog"
  | "faq"
  | "contatti";

export interface NavPage {
  num: string;
  key: PageKey;
  /** Shared slug (empty string for the home page). */
  slug: string;
  label: Localized;
  /** Which mega-menu, if any, this nav item opens. */
  mega?: "servizi" | "scuola";
}

export const PAGES: NavPage[] = [
  { num: "01", key: "home", slug: "", label: { it: "Home", en: "Home" } },
  { num: "02", key: "servizi", slug: "servizi", label: { it: "Servizi", en: "Services" }, mega: "servizi" },
  { num: "03", key: "lavori", slug: "lavori", label: { it: "Lavori", en: "Work" } },
  { num: "04", key: "scuola", slug: "scuola", label: { it: "Scuola", en: "School" }, mega: "scuola" },
  { num: "05", key: "blog", slug: "blog", label: { it: "Blog", en: "Blog" } },
  { num: "06", key: "faq", slug: "faq", label: { it: "FAQ", en: "FAQ" } },
  { num: "07", key: "contatti", slug: "contatti", label: { it: "Contatti", en: "Contact" } },
];

export const pageByKey = (key: PageKey): NavPage =>
  PAGES.find((p) => p.key === key)!;

export const label = (page: NavPage, lang: Lang): string => page.label[lang];
