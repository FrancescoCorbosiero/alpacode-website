/* Structured data of the program's doors: the FAQ (FAQPage) and where
   the page sits (BreadcrumbList: Home › Segnala un amico › Nuove attività). */
import type { Lang } from "../../i18n/types";
import { landing } from "../../data/voucher/landing";
import { breadcrumbSchema, faqPageSchema } from "../schema";
import { programPath, type ProgramId } from "./program";

export function landingJsonLd(program: ProgramId, lang: Lang, site: URL): object[] {
  const c = landing[program][lang];
  const url = (path: string) => new URL(path, site).href;
  const crumbs = [
    { name: "Alpacode", url: url(lang === "it" ? "/" : "/en/") },
    { name: landing.sito[lang].crumb, url: url(programPath("sito", lang)) },
    ...(program === "sito" ? [] : [{ name: c.crumb, url: url(programPath(program, lang)) }]),
  ];
  return [faqPageSchema(c.faq.items), breadcrumbSchema(crumbs)];
}
