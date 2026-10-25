/* ============================================================
   Alpacode Studio's effects (alpacode-motion, the catalog's contract):
   the entries this site copies, written per site with config.ts.
   `effects` are in the main bundle and built on every page;
   `lazy` ones are fetched only by pages that have their hook.
   Copied from alpacode-motion (FrancescoCorbosiero/alpacode-motion,
   src/engine/) at commit c19c357, as they are, but core.css: its intro
   section is left out (the studio's hero has its own). meter stands on
   stage, copied with it.
   ============================================================ */
import type { Effect, LazyEffect } from "./core/kit";
import * as deal from "./effects/deal";
import * as reveal from "./effects/reveal";
import * as skew from "./effects/skew";

export const effects: Effect[] = [reveal, deal, skew];

export const lazy: LazyEffect[] = [{ hook: '[data-scene="meter"]', load: () => import("./effects/meter") }];
