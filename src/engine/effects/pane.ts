/* ============================================================
   pane — a pane of glass catches the light: as it enters, a band of
   light crosses it once and the lettering etched on it is traced,
   then filled; with a mouse, a soft light follows the pointer on it.
   Markup: data-pane on the pane (it clips its light: position
   relative, overflow hidden, in the site's CSS); the band is its
   [data-pane-glint] child (.pane-glint, pane.css); lettering to trace
   is SVG <text data-pane-trace> inside it (stroke and fill in the
   site's CSS).
   Below the fold only, once, as it enters: the band sweeps from the
   left edge to past the right; each lettering's outline is drawn
   (stroke-dash, all its glyphs at once), then its fill comes up. The
   pointer's light (--px, --py, in % of the pane) follows on any pane,
   the first view's too: it moves nothing, it lights.
   Reduced motion, no script: the lettering is drawn and filled, the
   band waits off the pane, no pointer light (pane.css).
   Sources: new (the house's facade: the panes of /chi-siamo and
   /contatti).
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { inFirstView, skipIntro } from "../core/guards";
import type { Kit } from "../core/kit";

gsap.registerPlugin(ScrollTrigger);

export const hook = "[data-pane]";

/* ---------- Settings: the site's voice ---------- */
const START = "top 80%"; // where a pane counts as entering
const SWEEP = 1.3; // s the band of light takes to cross
const TRACE = 1.4; // s the lettering's outline takes
const DASH = 1600; // user units: longer than any glyph's outline
const FILL = 0.6; // s the fill takes once traced
const FOLLOW = 0.5; // s the pointer's light takes to catch up

export function init(kit: Kit): void {
  kit.query(hook).forEach((pane) => {
    // The pointer's light: wherever the pane is.
    if (kit.fine) {
      const toX = gsap.quickTo(pane, "--px", { duration: FOLLOW, ease: "power3" });
      const toY = gsap.quickTo(pane, "--py", { duration: FOLLOW, ease: "power3" });
      gsap.set(pane, { "--px": 50, "--py": 0 });
      kit.on(pane, "pointerenter", () => pane.classList.add("is-lit"));
      kit.on(pane, "pointerleave", () => pane.classList.remove("is-lit"));
      kit.on(pane, "pointermove", (e) => {
        const r = pane.getBoundingClientRect();
        toX(((e.clientX - r.left) / r.width) * 100);
        toY(((e.clientY - r.top) / r.height) * 100);
      });
      kit.cleanup(() => pane.classList.remove("is-lit"));
    }

    if (skipIntro(pane) || inFirstView(pane)) return;
    const glint = pane.querySelector<HTMLElement>("[data-pane-glint]");
    const traces = gsap.utils.toArray<SVGTextElement>(pane.querySelectorAll("[data-pane-trace]"));
    const tl = gsap.timeline({ paused: true });
    if (glint) tl.fromTo(glint, { xPercent: -100 }, { xPercent: 100, duration: SWEEP, ease: "power2.inOut" }, 0.15);
    traces.forEach((text) => {
      const fill = getComputedStyle(text).fillOpacity;
      gsap.set(text, { strokeDasharray: `${DASH} ${DASH}`, strokeDashoffset: DASH, fillOpacity: 0 });
      tl.to(text, { strokeDashoffset: 0, duration: TRACE, ease: "power2.inOut" }, 0).to(
        text,
        { fillOpacity: fill || 1, duration: FILL, ease: "power1.out", clearProps: "strokeDasharray,strokeDashoffset,fillOpacity" },
        TRACE - 0.2,
      );
    });
    ScrollTrigger.create({ trigger: pane, start: START, once: true, onEnter: () => void tl.play() });
  });
}
