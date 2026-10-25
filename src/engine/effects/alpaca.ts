/* ============================================================
   alpaca — the house's animal, alive wherever it stands (the house's
   own scene: the rig and its moves are src/lib/alpaca.ts, the
   silhouette src/components/Alpaca.astro).
   Markup:
   - svg[data-alpaca]: little signs of life while it's on screen,
     leans in when hovered, skips when tapped; ="walk-in" walks into
     place from the dark first (the manifesto band, the referral
     finale), ="lost" looks around first (the 404);
   - [data-alpaca-walker] inside a [data-marquee] band: it walks with
     the band (marquee's ride()), turning round when the band does;
   - [data-steps-runner] inside a [data-rail]: on a desktop it drops onto
     the first tile and leaps from tile to tile as the rail lights its
     steps (.is-reached, the rail effect); with data-here="<i>" on the
     rail it stays on that step and skips when it lights up.
   The footer's mascot rises with the wordmark (wordmark,
   [data-wordmark-mascot]) and is a data-alpaca like the others.
   Sources: A src/lib/motion.ts:1142 (data-alpaca), :791 (the runner),
   :855 (the walkers).
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hop, idle, leapTo, lookAround, marchers, playful, rigOf, walkIn } from "../../lib/alpaca";
import { inFirstView } from "../core/guards";
import type { Kit } from "../core/kit";
import { ride } from "./marquee";

gsap.registerPlugin(ScrollTrigger);

export const hook = "[data-alpaca], [data-alpaca-walker], [data-steps-runner]";

/* ---------- Settings: the site's voice, tuned when copying ---------- */
const WALK_IN = 2.1; // s the walk into place takes
const LOOK_AFTER = 1.6; // s the lost one waits before looking around
const RUNNER_WHERE = "(min-width: 1025px)"; // where the steps stand in a row for the runner to leap along

export function init(kit: Kit): void {
  const page = document.body;

  /* The living ones. */
  gsap.utils.toArray<SVGSVGElement>("svg[data-alpaca]").forEach((svg) => {
    const rig = rigOf(svg);
    if (!rig) return;
    const awake = (): boolean => !document.hidden && ScrollTrigger.isInViewport(svg, 0.05);
    const live = (): void => {
      if (document.body !== page) return; // a walk that ended after the page changed
      kit.cleanup(idle(rig, awake));
      kit.cleanup(playful(rig));
    };
    const mode = svg.dataset.alpaca;
    if (mode === "walk-in" && !inFirstView(svg)) {
      // From the dark, a few strides from the left, once it is well into
      // view — up to the opacity its stylesheet sets.
      const opacity = Number(getComputedStyle(svg).opacity) || 1;
      gsap.set(svg, { opacity: 0 });
      ScrollTrigger.create({
        trigger: svg,
        start: "center 75%",
        once: true,
        onEnter: () => {
          walkIn(rig, svg.getBoundingClientRect().width * 0.42, { fade: true, opacity, duration: WALK_IN }).eventCallback("onComplete", live);
        },
      });
      return;
    }
    if (mode === "lost") {
      gsap.delayedCall(LOOK_AFTER, () => {
        lookAround(rig).eventCallback("onComplete", live);
      });
      return;
    }
    live();
  });

  /* The walkers: they ride their band. */
  gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((band) => {
    const walkers = band.querySelectorAll<SVGSVGElement>("[data-alpaca-walker]");
    if (!walkers.length) return;
    const crew = marchers(walkers);
    kit.cleanup(ride(band, (dx, dt) => crew.move(dx, dt)));
  });

  /* The runner: it leaps along the rail as its steps light up. */
  gsap.utils.toArray<HTMLElement>("[data-rail]").forEach((rail) => {
    const runner = rail.querySelector<SVGSVGElement>("[data-steps-runner]");
    const rig = runner ? rigOf(runner) : null;
    if (!runner || !rig) return;
    const steps = gsap.utils.toArray<HTMLElement>("[data-rail-step]", rail);
    const here = rail.dataset.here !== undefined ? Number(rail.dataset.here) : null;
    kit.media.add(RUNNER_WHERE, () => {
      const tiles = steps.map((s) => s.querySelector<HTMLElement>("[data-rail-tile]") ?? s);
      let xs: number[] = [];
      let at = here ?? 0;
      // Leap targets, measured against where the CSS stands the runner
      // (on step `here`, or the first), so x = 0 is that tile.
      const measure = (): void => {
        const home = tiles[here ?? 0]?.getBoundingClientRect();
        if (!home) return;
        xs = tiles.map((t) => t.getBoundingClientRect().left - home.left);
        gsap.set(runner, { x: xs[at] ?? 0 });
      };
      measure();
      ScrollTrigger.addEventListener("refreshInit", measure);
      // It drops onto its tile as the steps come in, not a moment before.
      if (!inFirstView(rail)) {
        gsap.from(runner, {
          y: -90,
          opacity: 0,
          duration: 0.9,
          ease: "bounce.out",
          delay: 0.35,
          scrollTrigger: { trigger: rail, start: "top 88%", once: true },
        });
      }
      const stopIdle = idle(rig, () => ScrollTrigger.isInViewport(rail, 0.1));
      const reach = (i: number): void => {
        if (here !== null) {
          // The invite page: it stays on "Sei qui" and skips when it lights up.
          if (i === here) hop(rig, 16);
          return;
        }
        if (i === at || xs[i] === undefined) return;
        const far = Math.abs(i - at) > 1;
        at = i;
        leapTo(rig, xs[i] ?? 0, { height: far ? 74 : 52, duration: far ? 0.95 : 0.72 });
      };
      // The rail lights the steps; the runner follows the last one lit.
      let last = -1;
      const watch = new MutationObserver(() => {
        const lit = steps.reduce((n, s, i) => (s.classList.contains("is-reached") ? i : n), -1);
        if (lit !== last) {
          last = lit;
          if (lit >= 0) reach(lit);
        }
      });
      steps.forEach((s) => watch.observe(s, { attributes: true, attributeFilter: ["class"] }));
      return () => {
        watch.disconnect();
        ScrollTrigger.removeEventListener("refreshInit", measure);
        stopIdle();
        gsap.killTweensOf([runner, rig.root, ...runner.querySelectorAll("g")]);
        gsap.set(runner, { clearProps: "transform,opacity" });
      };
    });
  });
}
