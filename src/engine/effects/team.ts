/* ============================================================
   team — /chi-siamo: three panes of glass, a person each, come in
   from apart and overlap; where all three do, the core lights up
   (your project).
   Markup: data-scene="team" on the scene, its panes [data-team-pane]
   (first from the top left, second from the top right, third from
   below), the core [data-team-core]: the stylesheet lays them out
   overlapping, the core on their common square.
   Below the fold only: from the scene's top at the foot of the screen
   to its middle at the screen's middle, the panes travel in from
   apart, turned a little and faint, to their places (scrubbed with
   the scroll, so scrolling back takes them apart again); the core
   comes in over the last stretch. Not pinned: it plays as it passes.
   Reduced motion, no script: the panes overlap, the core is lit.
   Sources: new (C's venn, src/scripts/motion.ts:790, in the house's
   squares and glass).
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { inFirstView, skipIntro } from "../core/guards";
import type { Kit } from "../core/kit";

gsap.registerPlugin(ScrollTrigger);

export const hook = '[data-scene="team"]';

/* ---------- Settings: the site's voice ---------- */
const START = "top 92%"; // the scene's top here: the panes start to move
const END = "center 52%"; // its middle here: they've met
const SMOOTH = 0.7; // s the scrub takes to catch up with the scroll
/** Where each pane comes from: % of its own size, and its turn. */
const FROM = [
  { x: -32, y: -8, r: -6 },
  { x: 32, y: -8, r: 6 },
  { x: 0, y: 32, r: 3 },
];

export function init(kit: Kit): void {
  kit.query(hook).forEach((root) => {
    if (skipIntro(root) || inFirstView(root)) return;
    const panes = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-team-pane]"));
    const core = root.querySelector<HTMLElement>("[data-team-core]");
    if (!panes.length) return;
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: root, start: START, end: END, scrub: SMOOTH },
    });
    panes.forEach((pane, i) => {
      const f = FROM[i] ?? FROM[0]!;
      tl.fromTo(
        pane,
        { xPercent: f.x, yPercent: f.y, rotation: f.r, autoAlpha: 0.35 },
        { xPercent: 0, yPercent: 0, rotation: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
        i * 0.06,
      );
    });
    if (core) tl.fromTo(core, { scale: 0.4, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.25, ease: "back.out(2)" }, 0.78);
  });
}
