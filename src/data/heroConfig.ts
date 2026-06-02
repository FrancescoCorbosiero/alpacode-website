import type { Lang } from "../i18n/types";

/* ============================================================
   Hero style switches — flip these, nothing else.

   Both layouts are kept in the codebase; these constants only
   choose which one renders. No layout is deleted.
   ============================================================ */

/** Home hero layout.
 *  - "monogram" (default): the monumental centered wordmark composition.
 *  - "split": the ads-style two-column hero (text left, image right). */
export const HOME_HERO: "monogram" | "split" = "monogram";

/** Campaign (ads) hero layout.
 *  - "background" (default): full-bleed background image + overlay, bold
 *    marketing headline — the attention-grabbing treatment.
 *  - "split": the editorial two-column hero (text left, image right). */
export const CAMPAIGN_HERO: "background" | "split" = "background";

/** Hero image for the home "split" layout. Local override:
 *  drop src/assets/campaigns/home-hero.<ext> to replace the hotlink. */
export const HOME_HERO_IMAGE = {
  id: "home-hero",
  src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=70",
  alt: {
    it: "Il team Alpacode al lavoro su un progetto digitale",
    en: "The Alpacode team working on a digital project",
  } as Record<Lang, string>,
};
