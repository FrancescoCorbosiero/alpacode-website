/* ============================================================
   The kinds of work the /lavori filters sort by. Apart from
   work.ts because the content schema (src/content.config.ts) reads
   them too, and it can't import a module that reads the collection.
   ============================================================ */
import type { Lang } from "../i18n/types";

export const WORK_KINDS = ["sito", "ecommerce", "software"] as const;
export type WorkKind = (typeof WORK_KINDS)[number];

export const KIND_LABELS: Record<WorkKind, Record<Lang, string>> = {
  sito: { it: "Siti", en: "Websites" },
  ecommerce: { it: "E-commerce", en: "E-commerce" },
  software: { it: "Software", en: "Software" },
};
