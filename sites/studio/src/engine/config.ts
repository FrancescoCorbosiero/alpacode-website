/* ============================================================
   Alpacode Studio's half of the core: its own selectors. core/ and
   effects/ are the engine (the house's, on alpacode-motion's contract);
   this file and registry.ts are the studio's settings. The site's
   classes live here, never in an effect: the house maps its section
   titles and blocks onto [data-split] and [data-reveal] this way.
   ============================================================ */

export const config = {
  /** The page header: `.scrolled` past 8px, `.is-hidden` while reading
   *  downwards (core-header). alpacode and C: ".site-header". */
  header: "[data-header]", // the studio's header doesn't step aside
  /** While this matches, the header stays shown (an open mobile nav).
   *  C: "[data-nav].open". */
  navOpen: "[data-nav][data-open]",
  /** Panes that keep native scrolling under the pointer: Lenis stands
   *  down over them (modals, the mobile menu, a cookie panel). */
  scrollPanes: "[aria-modal='true']",
  /** What the CSS intro moves on first paint: effects leave everything
   *  inside alone (core-guards). alpacode adds "[data-hero]". */
  intro: ".intro-lines, [data-intro]",
  /** The site's own selectors for a hook, keyed by the hook exactly as
   *  the entry exports it (its page shows it): kit.query(hook) finds them
   *  too, e.g. { "[data-reveal]": [".section-head .lede", ".step"] }. */
  selectors: {
    "[data-scribble]": [".fx-hand"],
    "[data-type]": [".fx-card-who"],
    "[data-stamp]": [".fx-product-from"],
    "[data-tilt]": [".fx-card", ".fx-product", ".fx-feed-phone", ".fx-jn-phone"],
  } as Record<string, string[]>,
};
