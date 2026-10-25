/* ============================================================
   grow — a word grows: its letters rise from the line one after the
   other, like the bars of a chart going up.
   Markup: data-grow on the word (the studio's last call, «Hai qualcosa
   da far crescere?», Cta.astro). Below the fold only, once, as it
   enters: SplitText cuts it into letters (screen readers keep the word:
   the split's aria), each starts flat on the baseline and springs up
   to its height, left to right. When it's done the split is undone.
   Sources: H sites/studio (new: the studio's call to action).
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { inFirstView, skipIntro } from "../core/guards";
import type { Kit } from "../core/kit";

gsap.registerPlugin(ScrollTrigger, SplitText);

export const hook = "[data-grow]";

/* ---------- Settings: the site's voice, tuned when copying ---------- */
const FLAT = 0.06; // the share of its height a letter starts from
const EACH = 0.07; // s between one letter and the next
const DURATION = 0.75; // s a letter takes to grow
const EASE = "back.out(3)"; // it springs past its height, and settles
const START = "top 85%"; // where the word counts as entering

export function init(kit: Kit): void {
  kit.query(hook).forEach((el) => {
    if (skipIntro(el) || inFirstView(el)) return;
    const split = SplitText.create(el, { type: "chars", aria: "auto" });
    gsap.set(split.chars, { scaleY: FLAT, transformOrigin: "50% 90%" });
    gsap.to(split.chars, {
      scaleY: 1,
      duration: DURATION,
      stagger: EACH,
      ease: EASE,
      scrollTrigger: { trigger: el, start: START, once: true },
      onComplete: () => split.revert(),
    });
  });
}
