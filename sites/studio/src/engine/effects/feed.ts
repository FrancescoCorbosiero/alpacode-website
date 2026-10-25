/* ============================================================
   feed — the three verbs on a phone, on a pinned stage.
   Farsi vedere: the feed races up the screen and brakes on the brand's
   post (a little past, and back), the others dim, the post lights up
   and takes a heart. Farsi ricordare: the feed falls away and the
   brand's mark lands on everything that's its own (an avatar, a card,
   a story, a bag), stamped one after the other. Farsi scegliere: the
   brand's page slides up, a tap on «Prenota», the request drops in
   from the top. The verbs are the scene's beats, handed over beside
   the phone.
   Markup: data-scene="feed" on a tall wrapper (--len, in screens), on
   the stage (stage.ts: its [data-scene-stage] sticks once the scene is
   live); in the phone's screen (.fx-jn-screen), the feed
   [data-jn-feed] (its track [data-jn-track], the brand's post
   [data-jn-you] with its heart [data-jn-heart]), the mark
   [data-jn-mark] (its tiles [data-jn-tile], each a <b> mark), the page
   [data-jn-page] (its button [data-jn-btn], the tap [data-jn-tap],
   the request [data-jn-note]); the beats [data-scene-beat] in
   [data-scene-beats]; the rule [data-scene-progress].
   One timeline scrubbed over the wrapper owns every start (fromTo);
   the stop is measured from layout (the post's offsetTop), so a
   refresh mid-scene stays right. On a screen too short to pin it, the
   scene stays laid out.
   Laid out (no script, reduced motion) the phone shows its last screen,
   the request in, beside the three verbs.
   Sources: H sites/studio/src/components/Journey.astro (new: the
   studio's home).
   ============================================================ */
import { gsap } from "gsap";
import { inFirstView, skipIntro } from "../core/guards";
import type { Kit } from "../core/kit";
import { beats, scrubbed } from "./stage";

export const hook = '[data-scene="feed"]';

/* ---------- Settings: the site's voice, tuned when copying ---------- */
const TALL = "(min-height: 560px)"; // a screen tall enough to pin the phone
const AT = [0.36, 0.68]; // where the verbs hand over (shares of the scene)
const BRAKE = "back.out(1.3)"; // the feed stopping on the post: a little past, and back
const POP = "back.out(2.2)"; // what lands: the heart, the tiles, the request
const TILT = [-9, 7, -6, 8]; // degrees the tiles land from, in turn

export function init(kit: Kit): void {
  kit.query(hook).forEach((root) => {
    if (skipIntro(root) || inFirstView(root)) return;
    const q = (sel: string) => root.querySelector<HTMLElement>(sel);
    const screen = q(".fx-jn-screen");
    const feed = q("[data-jn-feed]");
    const track = q("[data-jn-track]");
    const you = q("[data-jn-you]");
    const heart = q("[data-jn-heart]");
    const mark = q("[data-jn-mark]");
    const page = q("[data-jn-page]");
    const btn = q("[data-jn-btn]");
    const tap = q("[data-jn-tap]");
    const note = q("[data-jn-note]");
    const label = q("[data-jn-label]");
    if (!screen || !feed || !track || !you || !mark || !page) return;
    const others = gsap.utils.toArray<HTMLElement>(track.children).filter((p) => p !== you);
    const tiles = gsap.utils.toArray<HTMLElement>("[data-jn-tile]", mark);
    const stamps = tiles.map((t) => t.querySelector("b")).filter((b): b is HTMLElement => !!b);
    const rest = tiles.map((t) => Number(gsap.getProperty(t, "rotation")) || 0);

    kit.media.add(TALL, () => {
      const tl = scrubbed(kit, root);
      beats(tl, root, AT);

      // The phone's bar reads the feed until the brand's page opens.
      let feedLabel: HTMLElement | null = null;
      let siteLabel: HTMLElement | null = null;
      if (label?.dataset.feed) {
        const site = label.textContent ?? "";
        label.textContent = "";
        siteLabel = document.createElement("span");
        siteLabel.textContent = site;
        feedLabel = document.createElement("span");
        feedLabel.textContent = label.dataset.feed;
        label.append(feedLabel, siteLabel);
      }

      // Farsi vedere: where the feed stops, the post in the middle of the screen.
      const stop = (): number => -(you.offsetTop + you.offsetHeight / 2 - screen.clientHeight / 2);
      tl.fromTo(track, { y: 0 }, { y: stop, duration: 0.3, ease: BRAKE }, 0)
        .fromTo(others, { opacity: 1 }, { opacity: 0.3, duration: 0.08 }, 0.2)
        .fromTo(you, { scale: 1, rotation: 0 }, { scale: 1.06, rotation: -2, duration: 0.06, ease: POP }, 0.26);
      if (heart) tl.fromTo(heart, { scale: 0, rotation: -30 }, { scale: 1, rotation: 0, duration: 0.05, ease: POP }, 0.3);

      // Farsi ricordare: the mark on everything that's the brand's.
      tl.fromTo(feed, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.9, duration: 0.06 }, AT[0])
        .fromTo(mark, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, AT[0] + 0.02)
        .fromTo(
          tiles,
          { autoAlpha: 0, scale: 0.4, rotation: (i: number) => TILT[i % TILT.length] ?? 0 },
          // Each lands on its own tilt, the stylesheet's (a card, a bag).
          { autoAlpha: 1, scale: 1, rotation: (i: number) => rest[i] ?? 0, duration: 0.07, stagger: 0.04, ease: POP },
          AT[0] + 0.03,
        )
        .fromTo(stamps, { scale: 1.9 }, { scale: 1, duration: 0.05, stagger: 0.04, ease: "power4.out" }, AT[0] + 0.06);

      // Farsi scegliere: the page, the tap, the request.
      tl.fromTo(mark, { yPercent: 0 }, { yPercent: -30, autoAlpha: 0, duration: 0.07, immediateRender: false }, AT[1])
        .fromTo(page, { yPercent: 100 }, { yPercent: 0, duration: 0.08, ease: "power3.out" }, AT[1]);
      if (feedLabel && siteLabel)
        tl.fromTo(feedLabel, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.03 }, AT[1]).fromTo(
          siteLabel,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.03 },
          AT[1] + 0.03,
        );
      if (tap)
        tl.fromTo(tap, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.03 }, 0.8).fromTo(
          tap,
          { scale: 1, opacity: 1 },
          { scale: 2.4, opacity: 0, duration: 0.06, immediateRender: false },
          0.84,
        );
      if (btn) tl.fromTo(btn, { scale: 1 }, { scale: 0.9, duration: 0.025, yoyo: true, repeat: 1 }, 0.82);
      if (note) tl.fromTo(note, { yPercent: -170, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.07, ease: POP }, 0.88);
      tl.set({}, {}, 1); // the timeline spans the scene: its times are shares of it

      return () => {
        if (label && siteLabel) label.textContent = siteLabel.textContent;
        root.removeAttribute("data-scene-live");
        root.classList.remove("is-pinned");
      };
    });
  });
}
