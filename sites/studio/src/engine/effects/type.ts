/* ============================================================
   type — a phrase types itself, letter after letter, behind a caret:
   the sentence someone would say, being written.
   Markup: data-type on the phrase (the studio maps its reader cards'
   phrase, .fx-card-who, config.ts: "la frase che diresti tu"). Below
   the fold only, once, as it enters: SplitText cuts it into words and
   letters (screen readers keep the phrase: the split's aria), the
   letters wait unseen (opacity: the card stays a link you can reach),
   then come in turn, a beat after the card has landed (the deal), the
   phrases entering together one after the other. Whether it has
   entered is the browser's to say (an IntersectionObserver): the card
   is still landing, moved, when a ScrollTrigger would measure it. The caret
   ([data-type-caret], type.css) follows the last letter, measured from
   layout, and goes when the phrase is done; then the split is undone.
   Focus in the card shows the phrase at once.
   Sources: H sites/studio (new: the studio's readers).
   ============================================================ */
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { inFirstView, skipIntro } from "../core/guards";
import type { Kit } from "../core/kit";

gsap.registerPlugin(SplitText);

export const hook = "[data-type]";

/* ---------- Settings: the site's voice, tuned when copying ---------- */
const PACE = 0.03; // s between one letter and the next
const AFTER = 0.4; // s after it enters: the card lands first
const NEXT = 0.25; // s more for each phrase entering with it
const ENTER = "0px 0px -12% 0px"; // a phrase counts as entering past 88% of the screen

/** Where a letter ends, inside the phrase, from layout (the card may
 *  still be landing, tilted: transforms don't count). */
function endOf(ch: HTMLElement, within: HTMLElement): { x: number; y: number; h: number } {
  let x = ch.offsetWidth;
  let y = 0;
  let n: HTMLElement | null = ch;
  while (n && n !== within) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y, h: ch.offsetHeight };
}

export function init(kit: Kit): void {
  let last = 0;
  let wave = 0;
  const plays = new Map<Element, () => void>();
  const seen = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        seen.unobserve(e.target);
        plays.get(e.target)?.();
      }),
    { rootMargin: ENTER },
  );
  kit.cleanup(() => seen.disconnect());
  kit.query(hook).forEach((el) => {
    if (skipIntro(el) || inFirstView(el)) return;
    const split = SplitText.create(el, { type: "words,chars", aria: "auto" });
    const chars = split.chars as HTMLElement[];
    if (!chars.length) return;
    const caret = document.createElement("i");
    caret.setAttribute("data-type-caret", "");
    caret.setAttribute("aria-hidden", "true");
    el.setAttribute("data-typing", "");
    el.appendChild(caret);
    const place = (ch: HTMLElement): void => {
      const p = endOf(ch, el);
      gsap.set(caret, { x: p.x, y: p.y, height: p.h });
    };
    gsap.set(chars, { opacity: 0 });
    place(chars[0]!);
    gsap.set(caret, { x: 0, opacity: 0 });

    const finish = (): void => {
      caret.remove();
      el.removeAttribute("data-typing");
      if (split.isSplit) split.revert();
    };
    const tl = gsap.timeline({ paused: true, onComplete: finish });
    tl.set(caret, { opacity: 1 }).to(chars, { opacity: 1, duration: 0.001, ease: "none", stagger: { each: PACE, onComplete: function (this: gsap.core.Tween) { place(this.targets()[0] as HTMLElement); } } });
    tl.to(caret, { opacity: 0, duration: 0.2 }, "+=0.5");

    let wait: gsap.core.Tween | null = null;
    plays.set(el, () => {
      const now = performance.now();
      wave = now - last < 250 ? wave + 1 : 0;
      last = now;
      wait = gsap.delayedCall(AFTER + wave * NEXT, () => void tl.play());
    });
    seen.observe(el);
    const card = el.closest<HTMLElement>("a, button") ?? el;
    kit.on(card, "focusin", () => {
      wait?.kill();
      tl.progress(1);
    });
    kit.cleanup(() => {
      wait?.kill();
      tl.kill();
      finish();
    });
  });
}
