/* ============================================================
   The service pages (/servizi/<slug>/): one per service that is the
   house's own work, in the order of /servizi. Each one tells one or
   more rows of /servizi (`rows`, their numbers: the row links to its
   page), and names the works that prove it (by kind or by id; none,
   none shown: no placeholder proof). The copy is in the files next
   to this one; the view is components/landing/ServiceLanding.astro;
   the hero's machine is lib/landing/machines.ts.
   The growth services (/servizi 07–10) are Alpacode Studio's work:
   they open its door, they have no page here.
   ============================================================ */
import type { Lang } from "../../i18n/types";
import { localizePath } from "../../i18n/utils";
import type { WorkKind } from "../work-kinds";
import type { ServiceCopy } from "./types";
import { consulenza } from "./consulenza-digitale";
import { sitiWeb } from "./siti-web";
import { ecommerce } from "./e-commerce";
import { software } from "./software-su-misura";
import { integrazioniAi } from "./integrazioni-ai";
import { manutenzione } from "./manutenzione";
import { formazione } from "./formazione";

export type { ServiceCopy, MachineCopy } from "./types";

export const SERVICE_SLUGS = [
  "consulenza-digitale",
  "siti-web",
  "e-commerce",
  "software-su-misura",
  "integrazioni-ai",
  "manutenzione",
  "formazione",
] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export interface ServicePage {
  slug: ServiceSlug;
  /** The rows of /servizi this page tells, by number. */
  rows: string[];
  /** The works that prove it: every work of these kinds, plus these. */
  works?: { kinds?: WorkKind[]; ids?: string[] };
  copy: Record<Lang, ServiceCopy>;
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "consulenza-digitale",
    rows: ["01"],
    works: { ids: ["logistica-sanchez", "shoes-clothing-store"] },
    copy: consulenza,
  },
  { slug: "siti-web", rows: ["02"], works: { kinds: ["sito"] }, copy: sitiWeb },
  { slug: "e-commerce", rows: ["03"], works: { kinds: ["ecommerce"] }, copy: ecommerce },
  {
    slug: "software-su-misura",
    rows: ["04"],
    works: { kinds: ["software"], ids: ["shoes-clothing-store"] },
    copy: software,
  },
  { slug: "integrazioni-ai", rows: ["05"], copy: integrazioniAi },
  { slug: "manutenzione", rows: ["06"], copy: manutenzione },
  { slug: "formazione", rows: ["11", "13"], copy: formazione },
];

/** The page's path, as localizePath takes it. */
export const servicePath = (slug: ServiceSlug): string => `servizi/${slug}`;
export const serviceHref = (slug: ServiceSlug, lang: Lang): string => localizePath(servicePath(slug), lang);

export const servicePage = (slug: ServiceSlug): ServicePage => {
  const page = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!page) throw new Error(`No service page "${slug}"`);
  return page;
};

/** The page that tells a row of /servizi, if it has one. */
export const servicePageForRow = (n: string): ServicePage | undefined => SERVICE_PAGES.find((s) => s.rows.includes(n));
