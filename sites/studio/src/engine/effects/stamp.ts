/* ============================================================
   stamp — a price comes down on its card like a stamp: big and tilted,
   it lands on its place with a thud, and the card gives under it.
   Markup: data-stamp on the price (the studio maps its products'
   price, .fx-product-from, config.ts); the card that gives is its
   closest link. Below the fold only, once, as it enters, a beat after
   the card itself (the reveal). It waits unseen, by the script; when
   it has landed the stylesheet has it back (clearProps).
   Sources: C src/scripts/motion.ts (data-stamp, comunicazionecinofila:
   the stamp on the sheet), rewritten for the studio.
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { inFirstView, skipIntro } from "../core/guards";
import type { Kit } from "../core/kit";

gsap.registerPlugin(ScrollTrigger);

export const hook = "[data-stamp]";

/* ---------- Settings: the site's voice, tuned when copying ---------- */
const FROM = 2.3; // times its size it comes down from
const TILT = -14; // degrees it comes down tilted
const AFTER = 0.35; // s after it enters: the card first
const DURATION = 0.42; // s it takes to land
const GIVE = 4; // px the card gives under it
const START = "top 88%"; // where the price counts as entering

export function init(kit: Kit): void {
  kit.query(hook).forEach((el) => {
    if (skipIntro(el) || inFirstView(el)) return;
    const card = el.closest<HTMLElement>("a") ?? el.parentElement;
    gsap.set(el, { opacity: 0, scale: FROM, rotation: TILT, transformOrigin: "30% 60%" });
    const tl = gsap.timeline({ paused: true, delay: AFTER });
    tl.to(el, { opacity: 1, scale: 1, rotation: 0, duration: DURATION, ease: "back.out(1.8)", clearProps: "opacity,transform" });
    if (card) tl.fromTo(card, { y: 0 }, { y: GIVE, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.out", clearProps: "transform" }, DURATION * 0.55);
    ScrollTrigger.create({ trigger: el, start: START, once: true, onEnter: () => void tl.play() });
  });
}
