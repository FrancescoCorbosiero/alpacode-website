import type { Lang, Localized } from "../i18n/types";

export type PageKey =
  | "home"
  | "servizi"
  | "prodotti"
  | "lavori"
  | "learning"
  | "blog"
  | "faq"
  | "contatti"
  /* Not in PAGES (no primary-nav slot): reachable from the footer's
     secondary nav, the ⌘K palette and cross-links. */
  | "lavora-con-noi"
  | "sostenibilita-ambientale"
  | "sostenibilita-ambientale-report";

export type MegaKey = "servizi" | "prodotti" | "learning";

export interface NavPage {
  num: string;
  key: PageKey;
  /** Shared slug (empty string for the home page). */
  slug: string;
  label: Localized;
  /** Which mega-menu, if any, this nav item opens. */
  mega?: MegaKey;
}

export const PAGES: NavPage[] = [
  { num: "01", key: "home", slug: "", label: { it: "Home", en: "Home" } },
  { num: "02", key: "servizi", slug: "servizi", label: { it: "Servizi", en: "Services" }, mega: "servizi" },
  { num: "03", key: "prodotti", slug: "prodotti", label: { it: "Prodotti", en: "Products" }, mega: "prodotti" },
  { num: "04", key: "lavori", slug: "lavori", label: { it: "Lavori", en: "Work" } },
  { num: "05", key: "learning", slug: "learning", label: { it: "Learning", en: "Learning" }, mega: "learning" },
  { num: "06", key: "blog", slug: "blog", label: { it: "Blog", en: "Blog" } },
  { num: "07", key: "faq", slug: "faq", label: { it: "FAQ", en: "FAQ" } },
  { num: "08", key: "contatti", slug: "contatti", label: { it: "Contatti", en: "Contact" } },
];

export const pageByKey = (key: PageKey): NavPage =>
  PAGES.find((p) => p.key === key)!;

export const label = (page: NavPage, lang: Lang): string => page.label[lang];
