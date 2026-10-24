/* ============================================================
   Where the clients are: the places the map of "Dove operiamo"
   lights up. Every work entry names one (src/content/work/*.md,
   `place`) and the map shows only the places that have a client —
   never a city for the look of it.
   Coordinates are the town centres (WGS84). Brianza is an area, not a
   town: it's drawn at its heart, between Seregno and Carate.
   ============================================================ */
import type { Lang } from "../i18n/types";

export interface Place {
  name: Record<Lang, string>;
  lat: number;
  lon: number;
}

export const PLACES = {
  monza: { name: { it: "Monza", en: "Monza" }, lat: 45.5845, lon: 9.2744 },
  milano: { name: { it: "Milano", en: "Milan" }, lat: 45.4642, lon: 9.19 },
  brianza: { name: { it: "Brianza", en: "Brianza" }, lat: 45.69, lon: 9.25 },
  seregno: { name: { it: "Seregno", en: "Seregno" }, lat: 45.6503, lon: 9.2028 },
  "cesano-maderno": { name: { it: "Cesano Maderno", en: "Cesano Maderno" }, lat: 45.6297, lon: 9.1447 },
  piacenza: { name: { it: "Piacenza", en: "Piacenza" }, lat: 45.0526, lon: 9.6929 },
  roma: { name: { it: "Roma", en: "Rome" }, lat: 41.9028, lon: 12.4964 },
} satisfies Record<string, Place>;

export type PlaceId = keyof typeof PLACES;
export const PLACE_IDS = Object.keys(PLACES) as [PlaceId, ...PlaceId[]];

/** The studio's base: the arcs of the map start here. */
export const BASE: PlaceId = "monza";

/** The places within a short drive of the base: on the map they are one
 *  cluster with the base, so they get no label of their own. */
export const LOCAL: PlaceId[] = ["monza", "milano", "brianza", "seregno", "cesano-maderno"];
