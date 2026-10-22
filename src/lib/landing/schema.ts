/* Structured data of a campaign landing: its questions (FAQPage) and
   where it sits (BreadcrumbList: Alpacode › Per chi fa siti › Hosting). */
import type { Lang } from "../../i18n/types";
import { localizePath } from "../../i18n/utils";
import { breadcrumbSchema, faqPageSchema } from "../schema";

export function landingJsonLd(opts: {
  lang: Lang;
  site: URL;
  /** From the group down to this page; Alpacode's home comes first. */
  crumbs: { name: string; slug: string }[];
  faq: { q: string; a: string }[];
}): object[] {
  const { lang, site, crumbs, faq } = opts;
  const url = (slug: string) => new URL(localizePath(slug, lang), site).href;
  return [
    faqPageSchema(faq),
    breadcrumbSchema([{ name: "Alpacode", url: url("") }, ...crumbs.map((c) => ({ name: c.name, url: url(c.slug) }))]),
  ];
}
