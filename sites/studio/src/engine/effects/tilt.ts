/* ============================================================
   tilt — leans toward the pointer in 3D, and lifts a little.
   Markup: data-tilt on the element (the studio maps its cards, the
   products and the phones, config.ts).
   With a mouse only: as the pointer moves over it, it leans toward it
   (a few degrees at its edges) and rises, and springs back when it
   leaves, its transform the stylesheet's again (a phone keeps its
   tilt). A transition on its transform is held while it plays
   (_pointer.ts). Nothing happens on touch, nor under reduced motion.
   The studio leans further than the house: its cards are things to
   pick up.
   Sources: alpacode.it src/engine/effects/tilt.ts (A src/lib/motion.ts:1097;
   C src/scripts/motion.ts:1177), the studio's settings.
   ============================================================ */
import type { Kit } from "../core/kit";
import { play } from "./_pointer";

export const hook = "[data-tilt]";

/* ---------- Settings: the site's voice, tuned when copying ---------- */
const LEAN = 9; // degrees it leans at its edges, rotationY 1.2 times (C's cards 10)
const LIFT = 6; // px it rises while the pointer is on it (C 8)
const SCALE = 1.02; // how much it swells meanwhile (C 1.015)
const PERSPECTIVE = 900; // px (C)
const FOLLOW = 0.45; // s the lean takes to catch up with the pointer
const SPRING = "elastic.out(1, 0.45)"; // back when the pointer leaves: a wobble
const BACK = 1; // s the spring takes

export function init(kit: Kit): void {
  if (!kit.fine) return;
  kit.query(hook).forEach((el) => {
    if (el.closest("astro-island")) return;
    play(kit, el, {
      lean: LEAN,
      perspective: PERSPECTIVE,
      pull: 0,
      follow: FOLLOW,
      lift: { y: LIFT, scale: SCALE },
      back: { duration: BACK, ease: SPRING },
    });
  });
}
