/* ============================================================
   Where the clients are: the places the map of "Dove operiamo"
   lights up. Every work entry names one (src/content/work/*.md,
   `place`) and the map lights only the places that have a client.
   Beside them, REFERENCES: a city for every region (the owner's call:
   «almeno una città importante per ogni regione»), its capital, drawn
   faint so the map reads as all of Italy — never listed as clients.
   Three of them, the biggest after Milan (Torino, Roma, Napoli), are
   connected to the base by an arc of reach (`hub`): a lighter arc than
   a client's, and the map's key says which is which.
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
  barletta: { name: { it: "Barletta", en: "Barletta" }, lat: 41.3196, lon: 16.2834 },
} satisfies Record<string, Place>;

/** The cities that orient the map: a faint dot and its name, the label
 *  on the side that keeps clear of the clients' and the arcs (`side`).
 *  Lombardy is the base, Puglia has a client (Barletta: Bari would sit
 *  on its label); Trentino-Alto Adige is Bolzano (Trento would sit on
 *  the base's label). */
export interface Reference extends Place {
  side: "left" | "right";
  /** Connected to the base by an arc of reach (not a client's). */
  hub?: boolean;
}
export const REFERENCES: Reference[] = [
  { name: { it: "Aosta", en: "Aosta" }, lat: 45.7372, lon: 7.3206, side: "left" },
  { name: { it: "Torino", en: "Turin" }, lat: 45.0703, lon: 7.6869, side: "left", hub: true },
  { name: { it: "Genova", en: "Genoa" }, lat: 44.4056, lon: 8.9463, side: "left" },
  { name: { it: "Bolzano", en: "Bolzano" }, lat: 46.4983, lon: 11.3548, side: "right" },
  { name: { it: "Venezia", en: "Venice" }, lat: 45.4408, lon: 12.3155, side: "right" },
  { name: { it: "Trieste", en: "Trieste" }, lat: 45.6495, lon: 13.7768, side: "right" },
  { name: { it: "Bologna", en: "Bologna" }, lat: 44.4949, lon: 11.3426, side: "left" },
  { name: { it: "Firenze", en: "Florence" }, lat: 43.7696, lon: 11.2558, side: "left" },
  { name: { it: "Perugia", en: "Perugia" }, lat: 43.1107, lon: 12.3908, side: "right" },
  { name: { it: "Ancona", en: "Ancona" }, lat: 43.6158, lon: 13.5189, side: "right" },
  { name: { it: "Roma", en: "Rome" }, lat: 41.9028, lon: 12.4964, side: "left", hub: true },
  { name: { it: "L'Aquila", en: "L'Aquila" }, lat: 42.3498, lon: 13.3995, side: "right" },
  { name: { it: "Campobasso", en: "Campobasso" }, lat: 41.5603, lon: 14.6627, side: "left" },
  { name: { it: "Napoli", en: "Naples" }, lat: 40.8518, lon: 14.2681, side: "left", hub: true },
  { name: { it: "Potenza", en: "Potenza" }, lat: 40.6404, lon: 15.8056, side: "right" },
  { name: { it: "Catanzaro", en: "Catanzaro" }, lat: 38.9098, lon: 16.5877, side: "right" },
  { name: { it: "Palermo", en: "Palermo" }, lat: 38.1157, lon: 13.3615, side: "left" },
  { name: { it: "Cagliari", en: "Cagliari" }, lat: 39.2238, lon: 9.1217, side: "right" },
];

export type PlaceId = keyof typeof PLACES;
export const PLACE_IDS = Object.keys(PLACES) as [PlaceId, ...PlaceId[]];

/** The studio's base: the arcs of the map start here. */
export const BASE: PlaceId = "monza";

/** The places within a short drive of the base: on the map they are one
 *  cluster with the base, so they get no label of their own. */
export const LOCAL: PlaceId[] = ["monza", "milano", "brianza", "seregno", "cesano-maderno"];
