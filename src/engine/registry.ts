/* ============================================================
   alpacode.it's effects (alpacode-motion's contract), written per site
   with config.ts. `effects` are in the main bundle and built on every
   page, in this order; a module with nothing to do runs one query and
   returns. `lazy` ones are fetched only by pages that have their hook
   and built in the page's context: the pen's loops and notes (DrawSVG),
   the filter (Flip), and the house's own scenes (tier 3: the home's
   cases, method and map, the alpacas, the landings' scenes). Their CSS
   is in the site's stylesheet (styles/engine.css): their end state must
   not wait for the chunk.
   Copied from alpacode-motion (FrancescoCorbosiero/alpacode-motion,
   src/engine/) at commit c19c357: core/ and every effects/ module but
   alpaca.ts (the house's own, tier 3, on lib/alpaca.ts) are the
   catalog's files as they are; lib/landing/scenes.ts is the landings'
   tier 3, on the catalog's stage.
   ============================================================ */
import type { Effect, LazyEffect } from "./core/kit";
import * as accordion from "./effects/accordion";
import * as alternate from "./effects/alternate";
import * as bars from "./effects/bars";
import * as chat from "./effects/chat";
import * as clip from "./effects/clip";
import * as coin from "./effects/coin";
import * as cursorThumb from "./effects/cursor-thumb";
import * as draw from "./effects/draw";
import * as frameScroll from "./effects/frame-scroll";
import * as heroAway from "./effects/hero-away";
import * as heroSettle from "./effects/hero-settle";
import * as heroVideo from "./effects/hero-video";
import * as kicker from "./effects/kicker";
import * as kinetic from "./effects/kinetic";
import * as knoll from "./effects/knoll";
import * as magnetic from "./effects/magnetic";
import * as markHighlight from "./effects/mark-highlight";
import * as markStrike from "./effects/mark-strike";
import * as markUnderline from "./effects/mark-underline";
import * as marquee from "./effects/marquee";
import * as pop from "./effects/pop";
import * as print from "./effects/print";
import * as rail from "./effects/rail";
import * as reveal from "./effects/reveal";
import * as scrub from "./effects/scrub";
import * as splitBlur from "./effects/split-blur";
import * as splitChars from "./effects/split-chars";
import * as splitCycle from "./effects/split-cycle";
import * as splitLines from "./effects/split-lines";
import * as splitPop from "./effects/split-pop";
import * as splitWipe from "./effects/split-wipe";
import * as splitWords from "./effects/split-words";
import * as strut from "./effects/strut";
import * as tilt from "./effects/tilt";
import * as wordmark from "./effects/wordmark";

export const effects: Effect[] = [
  heroAway,
  heroSettle,
  heroVideo,
  splitLines,
  splitWipe,
  splitWords,
  splitBlur,
  splitChars,
  splitPop,
  splitCycle,
  reveal,
  clip,
  strut,
  kicker,
  pop,
  print,
  wordmark,
  chat,
  draw,
  knoll,
  alternate,
  bars,
  markHighlight,
  markUnderline,
  markStrike,
  scrub,
  kinetic,
  marquee,
  rail,
  frameScroll,
  cursorThumb,
  tilt,
  magnetic,
  coin,
  accordion,
];

export const lazy: LazyEffect[] = [
  { hook: '[data-mark="circle"]', load: () => import("./effects/mark-circle") },
  { hook: '[data-mark="box"]', load: () => import("./effects/mark-box") },
  { hook: "[data-hand]", load: () => import("./effects/hand") },
  { hook: "[data-flip-filter]", load: () => import("./effects/flip-filter") },
  { hook: '[data-scene="cases"]', load: () => import("./effects/cases") },
  { hook: '[data-scene="method"]', load: () => import("./effects/method") },
  { hook: '[data-scene="map"]', load: () => import("./effects/map") },
  { hook: "[data-alpaca], [data-alpaca-walker], [data-steps-runner]", load: () => import("./effects/alpaca") },
  { hook: ".lnd [data-scene]", load: () => import("../lib/landing/scenes") },
];
