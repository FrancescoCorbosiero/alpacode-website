/* ============================================================
   Alpacode FAST — the facts and the links.
   The studio's facts are kept in step with src/data/business.ts
   (FAST is its own build: it doesn't import from the studio's src).
   ============================================================ */

export const STUDIO = {
  name: "Soluzioni Digitali Alpacode",
  url: "https://alpacode.it",
  vat: "14463350968",
  email: "info@alpacode.it",
  /** International format, digits only: the wa.me links. */
  whatsapp: "393514003240",
} as const;

/** The Instagram handle, without the @. Empty hides the Instagram buttons
 *  (the WhatsApp ones always work). */
export const INSTAGRAM = "";

/** The keyword that opens the chooser. */
export const MASTER_KEYWORD = "FAST";

/** WhatsApp with the keyword already typed. */
export const wa = (keyword: string): string =>
  `https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent(keyword)}`;

/** The Instagram DM, when the handle is set. */
export const ig: string | null = INSTAGRAM ? `https://ig.me/m/${INSTAGRAM}` : null;

/** A page of the studio, tagged so its analytics know FAST sent the visit. */
export const studio = (path: string, door: string): string =>
  `${STUDIO.url}${path}?utm_source=fast&utm_medium=social&utm_campaign=${door}`;

export const euro = (n: number): string => `${n} €`;
