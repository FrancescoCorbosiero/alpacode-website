/* ============================================================
   Alpacode Studio's effects, with config.ts the site's settings for its
   engine.
   `effects` are in the main bundle and built on every page;
   `lazy` ones are fetched only by pages that have their hook.
   The same engine as the house's, on the contract of alpacode-motion,
   the motion catalog (FrancescoCorbosiero/alpacode-motion): reference
   only, never edited from here. The studio's core.css leaves the intro
   section out (its hero has its own); meter stands on stage.
   ============================================================ */
import type { Effect, LazyEffect } from "./core/kit";
import * as deal from "./effects/deal";
import * as reveal from "./effects/reveal";
import * as skew from "./effects/skew";

export const effects: Effect[] = [reveal, deal, skew];

export const lazy: LazyEffect[] = [{ hook: '[data-scene="meter"]', load: () => import("./effects/meter") }];
