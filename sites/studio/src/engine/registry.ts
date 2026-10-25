/* ============================================================
   Alpacode Studio's effects, with config.ts the site's settings for its
   engine.
   `effects` are in the main bundle and built on every page;
   `lazy` ones are fetched only by pages that have their hook.
   The same engine as the house's, on the contract of alpacode-motion,
   the motion catalog (FrancescoCorbosiero/alpacode-motion): reference
   only, never edited from here. The studio's core.css leaves the intro
   section out (its hero has its own); meter and feed stand on stage.
   The studio's own moves, made for its pages: feed (the three verbs on
   a phone), scribble (the notes in the hand), type (the readers'
   phrases), grow (the last call's «crescere»), stamp (the prices);
   tilt is the house's, leaning further.
   ============================================================ */
import type { Effect, LazyEffect } from "./core/kit";
import * as deal from "./effects/deal";
import * as grow from "./effects/grow";
import * as reveal from "./effects/reveal";
import * as scribble from "./effects/scribble";
import * as skew from "./effects/skew";
import * as stamp from "./effects/stamp";
import * as tilt from "./effects/tilt";
import * as type from "./effects/type";

export const effects: Effect[] = [reveal, deal, skew, scribble, type, grow, stamp, tilt];

export const lazy: LazyEffect[] = [
  { hook: '[data-scene="meter"]', load: () => import("./effects/meter") },
  { hook: '[data-scene="feed"]', load: () => import("./effects/feed") },
];
