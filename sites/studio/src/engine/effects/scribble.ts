/* ============================================================
   scribble — a note in the hand writes itself, left to right, as it
   enters.
   Markup: data-scribble on a short handwritten line (the studio maps
   its .fx-hand notes, config.ts). Below the fold only, once: the note
   is uncovered from its first letter to its last at a pen's pace (its
   length sets the time, within MIN and MAX). It waits clipped by the
   script, never by the CSS; once written the stylesheet has it back
   (clearProps). A note inside a scene is the scene's.
   Sources: H sites/studio (new: the studio's notes).
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { inFirstView, skipIntro } from "../core/guards";
import type { Kit } from "../core/kit";

gsap.registerPlugin(ScrollTrigger);

export const hook = "[data-scribble]";

/* ---------- Settings: the site's voice, tuned when copying ---------- */
const PACE = 0.05; // s a letter takes to write
const MIN = 0.45; // s, the shortest note
const MAX = 1.3; // s, the longest
const START = "top 88%"; // where a note counts as entering
// The flourishes reach past the box: the clip leaves them room.
const HIDDEN = "inset(-40% 100% -40% -8%)";
const SHOWN = "inset(-40% -8% -40% -8%)";

export function init(kit: Kit): void {
  kit.query(hook).forEach((el) => {
    if (skipIntro(el) || inFirstView(el) || el.closest("[data-scene]")) return;
    const duration = gsap.utils.clamp(MIN, MAX, (el.textContent ?? "").trim().length * PACE);
    gsap.set(el, { clipPath: HIDDEN });
    gsap.to(el, {
      clipPath: SHOWN,
      duration,
      ease: "power1.inOut",
      clearProps: "clipPath",
      scrollTrigger: { trigger: el, start: START, once: true },
    });
  });
}
