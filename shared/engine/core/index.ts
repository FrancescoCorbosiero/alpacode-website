/* ============================================================
   The core: the skeleton every effect stands on, one for every site
   (shared/engine, from alpacode-motion's contract, catalog.md, Core).
   It reads the site's settings through the build's alias
   @site/engine-config (each site's src/engine/config.ts): the same
   code, each site's selectors. Online nothing is shared: Vite copies
   it into each site's build. Rules for changing it (it reaches every
   site at its next build): docs/domain-tree.md, «I siti restano
   indipendenti». What page scripts and effects import from it.
   Overlays import scroll-lock.ts directly, not this: it keeps them
   free of the engine.
   ============================================================ */
export { start, restart } from "./lifecycle";
export { scrollToTarget } from "./scroll";
export { fxLayer } from "./fx-layer";
export { reduced, fine, inFirstView, below, skipIntro } from "./guards";
export type { Kit, Effect, LazyEffect, On } from "./kit";
