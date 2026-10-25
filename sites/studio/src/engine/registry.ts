/* ============================================================
   Alpacode Studio's effects (alpacode-motion, the catalog's contract):
   the entries this site copies, written per site with config.ts.
   `effects` are in the main bundle and built on every page;
   `lazy` ones are fetched only by pages that have their hook.
   ============================================================ */
import type { Effect, LazyEffect } from "./core/kit";
import * as deal from "./effects/deal";
import * as reveal from "./effects/reveal";
import * as skew from "./effects/skew";

export const effects: Effect[] = [reveal, deal, skew];

export const lazy: LazyEffect[] = [{ hook: '[data-scene="meter"]', load: () => import("./effects/meter") }];
