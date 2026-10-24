/* ============================================================
   The studio's motion, until the site moves to the alpacode-motion
   engine (docs/status.md). The hero's turn is CSS (above the fold, no
   wait on this script); below it, GSAP:
     [data-rise]       blocks rise as they come in
     .fx-cards         the doors land from alternate sides
     [data-band]       the volt band leans with the scroll's speed
     [data-scene=meter] pinned: the needle swings from PAURA to LEVA,
                       the word scrambles, the beats hand over
   Under reduced motion none of it runs and everything sits in its
   end state (styles/studio.css). Things are hidden here, at init, and
   only below the fold.
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const below = (el: Element): boolean => el.getBoundingClientRect().top > window.innerHeight * 0.92;

function rise(): void {
  const els = gsap.utils.toArray<HTMLElement>("[data-rise]").filter(below);
  if (!els.length) return;
  gsap.set(els, { autoAlpha: 0, y: 34 });
  ScrollTrigger.batch(els, {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, clearProps: "transform,opacity,visibility" }),
  });
}

function cards(): void {
  const items = gsap.utils.toArray<HTMLElement>(".fx-cards > li");
  items.forEach((li, i) => {
    if (!below(li)) return;
    gsap.set(li, { autoAlpha: 0, y: 70, rotate: i % 2 ? 5 : -5, x: i % 2 ? 30 : -30 });
  });
  ScrollTrigger.batch(items, {
    start: "top 92%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        rotate: 0,
        duration: 0.9,
        ease: "back.out(1.5)",
        stagger: 0.09,
        clearProps: "transform,opacity,visibility",
      }),
  });
}

function band(): void {
  document.querySelectorAll<HTMLElement>("[data-band]").forEach((track) => {
    const lean = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power3.out" });
    ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (st) => lean(gsap.utils.clamp(-12, 12, st.getVelocity() / -250)),
      onLeave: () => lean(0),
      onLeaveBack: () => lean(0),
    });
  });
}

function meter(): void {
  const root = document.querySelector<HTMLElement>('[data-scene="meter"]');
  const needle = root?.querySelector<SVGGElement>(".fx-needle");
  const word = root?.querySelector<HTMLElement>("[data-word]");
  if (!root || !needle || !word) return;
  const beats = gsap.utils.toArray<HTMLElement>(".fx-beat", root);
  const words = beats.map((b) => b.querySelector(".fx-beat-k")?.textContent ?? "");
  const angles = [-80, 0, 80];
  word.textContent = words[0];
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
  });
  // The timeline owns the start: the needle on PAURA, the first beat in.
  tl.fromTo(needle, { rotation: angles[0], svgOrigin: "200 200" }, { rotation: angles[0], duration: 0.01 }, 0);
  beats.forEach((b, i) => {
    if (i === 0) return;
    const at = i / beats.length;
    tl.fromTo(beats[i - 1], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -30, duration: 0.05, immediateRender: false }, at - 0.05)
      .fromTo(b, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.06, ease: "power2.out" }, at)
      .fromTo(
        needle,
        { rotation: angles[i - 1], svgOrigin: "200 200" },
        { rotation: angles[i], duration: 0.12, ease: "back.out(2.4)", immediateRender: false },
        at - 0.06,
      )
      .to(word, { scrambleText: { text: words[i], chars: "upperCase", speed: 0.7 }, duration: 0.08 }, at - 0.03);
  });
  tl.to({}, { duration: 0.1 }, 0.9);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("has-motion");
  rise();
  cards();
  band();
  meter();
  ScrollTrigger.refresh();
}

export {};
