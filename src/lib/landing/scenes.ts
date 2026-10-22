/* ============================================================
   Campaign landings — the scenes.
   A chunk of its own: lib/motion.ts imports it only on pages with
   .lnd, and runs it inside that page's gsap.context() and
   gsap.matchMedia(), so everything made here is reverted with the
   page. Under reduced motion it never runs: every scene's markup is
   laid out in its end state by styles/landing.css.

   What lives here:
   - The pen: marks ([data-mark] — highlight, underline, strike are
     drawn across; circle and box are redrawn at the word's real
     size, a little different each time, then drawn round it) and
     margin notes ([data-hand] — written in, their arrow drawn after).
   - Scenes, by [data-scene] — a tall .lnd-scene whose sticky stage
     is scrubbed by the scroll, or a machine that plays on its own:
       receipt  hero: the hosting bill prints itself, line by line
       pack     twenty bills fly into one server, its lights come on
       stack    the codebase's layers come apart, one at a time
       press    hero: the press stamps out a site per client, on a loop
       shift    the repetitive jobs move to the agents' lane
       line     a site travels the six stations of the assembly line
       knoll    the kit's tools fall into place, laid out side by side
   - Kinetic bands ([data-kinetic]): their lines slide across in
     opposite directions as the band crosses the screen.
   Rules: things are hidden here, at init, and only below the fold
   (or inside a scene's own timeline); positions are measured from
   layout (offsets), not from transformed boxes, so a refresh in the
   middle of a scene stays right.
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

type On = <K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  type: K,
  fn: (e: HTMLElementEventMap[K]) => void,
  opts?: AddEventListenerOptions,
) => void;
export interface Kit {
  on: On;
  fine: boolean;
  cleanup: (fn: () => void) => void;
}
type Scene = (root: HTMLElement, media: gsap.MatchMedia, kit: Kit) => void;

const SCENES: Record<string, Scene> = { receipt, pack, stack, press, shift, line, knoll };

export function runScenes(media: gsap.MatchMedia, kit: Kit): void {
  marks(kit);
  hands();
  kinetic();
  document.querySelectorAll<HTMLElement>(".lnd [data-scene]").forEach((root) => {
    SCENES[root.dataset.scene ?? ""]?.(root, media, kit);
  });
}

/* ---------- Helpers ---------- */

const below = (el: Element): boolean => el.getBoundingClientRect().top > window.innerHeight * 0.92;

/** Seeded randomness: a mark looks hand-drawn, and the same on every visit. */
function rng(seedText: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seedText.length; i++) h = Math.imul(h ^ seedText.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A smooth path through points (Catmull-Rom as cubic Béziers). */
function smooth(pts: [number, number][]): string {
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/** A loop round a w×h box: a little more than one turn, never closed. */
function loopPath(w: number, h: number, r: () => number): string {
  const cx = w / 2;
  const cy = h / 2;
  const rx = w / 2 - 2;
  const ry = h / 2 - 2;
  const start = -Math.PI * (0.62 + r() * 0.16);
  const turn = Math.PI * 2 * (1.08 + r() * 0.08);
  const pts: [number, number][] = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const t = start + (i / n) * turn;
    const wob = 1 + (r() - 0.5) * 0.07;
    const drift = 1 + (i / n) * 0.06;
    pts.push([cx + Math.cos(t) * rx * wob * drift, cy + Math.sin(t) * ry * wob]);
  }
  return smooth(pts);
}

/** A box drawn in one stroke, corners overshooting. */
function boxPath(w: number, h: number, r: () => number): string {
  const j = () => (r() - 0.5) * 5;
  const pts: [number, number][] = [
    [4 + j(), 5 + j()],
    [w - 3 + j(), 3 + j()],
    [w - 4 + j(), h - 3 + j()],
    [3 + j(), h - 4 + j()],
    [6 + j(), 1 + j()],
  ];
  return pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
}

/** Redraw an SVG mark at its element's real size (no stretched strokes). */
function redraw(mark: HTMLElement): SVGPathElement | null {
  const svg = mark.querySelector<SVGSVGElement>(".lnd-mark-svg");
  const path = svg?.querySelector<SVGPathElement>("path");
  if (!svg || !path) return null;
  const w = svg.clientWidth;
  const h = svg.clientHeight;
  if (!w || !h) return path;
  const r = rng(mark.textContent ?? "");
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  path.setAttribute("d", mark.dataset.mark === "box" ? boxPath(w, h, r) : loopPath(w, h, r));
  path.style.vectorEffect = "none";
  return path;
}

/** Draw a mark in: backgrounds sweep across, SVGs are drawn round. */
function drawMark(mark: HTMLElement, at = 0, duration = 0.85): gsap.core.Tween | null {
  if (mark.dataset.mark === "circle" || mark.dataset.mark === "box") {
    const path = redraw(mark);
    if (!path) return null;
    gsap.set(path, { opacity: 1 });
    return gsap.fromTo(
      path,
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration,
        delay: at,
        ease: "power2.inOut",
        onComplete: () => gsap.set(path, { clearProps: "strokeDasharray,strokeDashoffset" }),
      },
    );
  }
  return gsap.fromTo(
    mark,
    { backgroundSize: "0% 100%" },
    { backgroundSize: "100% 100%", duration, delay: at, ease: "power2.out", clearProps: "backgroundSize" },
  );
}

/* ---------- The pen ---------- */

function marks(kit: Kit): void {
  const svgMarks: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>(".lnd .lnd-mark").forEach((mark) => {
    const svg = mark.dataset.mark === "circle" || mark.dataset.mark === "box";
    if (svg) svgMarks.push(mark);
    // Heroes draw their marks in CSS (above the fold, no waiting on this
    // chunk); scenes draw theirs on their own timeline.
    if (mark.closest("[data-hero], [data-scene], [data-mark-manual]")) return;
    if (!below(mark)) {
      drawMark(mark, Number(mark.dataset.delay ?? 0.2));
      return;
    }
    if (svg) gsap.set(mark.querySelector(".lnd-mark-svg path"), { opacity: 0 });
    else gsap.set(mark, { backgroundSize: "0% 100%" });
    ScrollTrigger.create({
      trigger: mark,
      start: "top 82%",
      once: true,
      onEnter: () => drawMark(mark, Number(mark.dataset.delay ?? 0.15)),
    });
  });
  // A resize changes the words' boxes: redraw the loops that are on screen.
  const onResize = () => svgMarks.forEach((m) => {
    const path = m.querySelector<SVGPathElement>(".lnd-mark-svg path");
    if (path && !gsap.isTweening(path) && getComputedStyle(path).opacity !== "0") redraw(m);
  });
  ScrollTrigger.addEventListener("refresh", onResize);
  kit.cleanup(() => ScrollTrigger.removeEventListener("refresh", onResize));
}

/** Write a margin note in, then draw its arrow. */
function writeHand(el: HTMLElement, at = 0): gsap.core.Timeline {
  const arrow = el.querySelector<SVGPathElement>(".lnd-arrow path");
  const tl = gsap.timeline({ delay: at });
  tl.fromTo(
    el,
    { clipPath: "inset(-30% 100% -30% -8%)" },
    { clipPath: "inset(-30% -8% -30% -8%)", duration: 0.8, ease: "power2.out", clearProps: "clipPath" },
  );
  if (arrow) tl.fromTo(arrow, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.45, ease: "power2.out" }, "-=0.35");
  return tl;
}

function hands(): void {
  document.querySelectorAll<HTMLElement>(".lnd [data-hand]").forEach((el) => {
    if (el.closest("[data-hero], [data-scene]") || !below(el)) return;
    gsap.set(el, { clipPath: "inset(-30% 100% -30% -8%)" });
    ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => writeHand(el) });
  });
}

/* ---------- Scenes ---------- */

/** Offset of an element's centre within an ancestor, from layout alone
 *  (transforms don't count), so it holds whatever the scrub has done. */
function centre(el: HTMLElement, within: HTMLElement): { x: number; y: number } {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== within) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

/** The scene's scrubbed timeline over its tall section. */
function scrubbed(root: HTMLElement, extra: ScrollTrigger.Vars = {}): gsap.core.Timeline {
  const bar = root.querySelector<HTMLElement>(".lnd-progress");
  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (st) => bar?.style.setProperty("--p", st.progress.toFixed(3)),
      ...extra,
    },
  });
}

/** Beats: the scene's text, one at a time, handed over at `at[i]`. */
function beats(tl: gsap.core.Timeline, root: HTMLElement, at: number[]): void {
  const list = gsap.utils.toArray<HTMLElement>(".lnd-beat", root);
  list.forEach((b, i) => {
    if (i === 0) return;
    const t = at[i - 1] ?? i / list.length;
    tl.fromTo(list[i - 1], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -36, duration: 0.05, ease: "power1.in", immediateRender: false }, t - 0.05).fromTo(
      b,
      { autoAlpha: 0, y: 36 },
      { autoAlpha: 1, y: 0, duration: 0.06, ease: "power2.out" },
      t,
    );
  });
}

/** Hero, hosting: the bill prints itself, the total gets circled. */
function receipt(root: HTMLElement): void {
  const paper = root.querySelector<HTMLElement>(".lnd-receipt");
  if (!paper) return;
  const rows = gsap.utils.toArray<HTMLElement>(".lnd-receipt-rows li", root);
  const total = root.querySelector<HTMLElement>(".lnd-receipt-total");
  const mark = total?.querySelector<HTMLElement>(".lnd-mark");
  const note = root.querySelector<HTMLElement>("[data-hand]");
  const circle = mark?.querySelector(".lnd-mark-svg path");
  if (circle) gsap.set(circle, { opacity: 0 });
  if (note) gsap.set(note, { clipPath: "inset(-30% 100% -30% -8%)" });
  gsap.set(rows, { autoAlpha: 0, x: -6 });
  if (total) gsap.set(total, { autoAlpha: 0 });

  const tl = gsap.timeline({ delay: 0.55 });
  tl.fromTo(paper, { clipPath: "inset(0% 0% 82% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power1.inOut" })
    .to(rows, { autoAlpha: 1, x: 0, duration: 0.28, stagger: 0.14, ease: "power2.out" }, 0.15)
    .to(total ?? {}, { autoAlpha: 1, duration: 0.3 }, ">-0.1");
  if (mark) tl.add(() => void drawMark(mark, 0, 0.7), ">0.05");
  if (note) tl.add(() => void writeHand(note), ">0.5");
  // Then it breathes, while the hero is on screen.
  const idle = gsap.to(paper, { y: -10, rotation: 1.2, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true });
  tl.add(() => void idle.play());
  ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    onToggle: (st) => (st.isActive && tl.progress() === 1 ? idle.play() : idle.pause()),
  });
}

/** Hosting: twenty bills fly into one server, a light per site. */
function pack(root: HTMLElement): void {
  const board = root.querySelector<HTMLElement>(".lnd-pack-board");
  if (!board) return;
  const bills = gsap.utils.toArray<HTMLElement>(".lnd-bill", root);
  const leds = gsap.utils.toArray<HTMLElement>(".lnd-led", root);
  const server = root.querySelector<HTMLElement>(".lnd-server-unit");
  const strike = root.querySelector<HTMLElement>(".lnd-pack-before .lnd-mark");
  const after = root.querySelector<HTMLElement>(".lnd-pack-after");
  const note = root.querySelector<HTMLElement>(".lnd-server-note");
  const arrow = note?.querySelector(".lnd-arrow path");

  const tl = scrubbed(root);
  beats(tl, root, [0.36, 0.7]);
  tl.fromTo(server, { scale: 0.9, autoAlpha: 0.55 }, { scale: 1, autoAlpha: 1, duration: 0.14 }, 0.08);
  bills.forEach((bill, i) => {
    const led = leds[i];
    if (!led) return;
    const at = 0.14 + (i / bills.length) * 0.4;
    tl.to(
      bill,
      {
        x: () => centre(led, board).x - centre(bill, board).x,
        y: () => centre(led, board).y - centre(bill, board).y,
        scale: 0.08,
        rotation: (i % 2 ? 1 : -1) * 14,
        autoAlpha: 0,
        duration: 0.1,
        ease: "power2.in",
      },
      at,
    ).fromTo(led, { "--on": 0 }, { "--on": 1, duration: 0.02 }, at + 0.095);
  });
  // The scrubbed timeline owns every start state (fromTo): a refresh in
  // the middle of the scene puts them back exactly.
  if (strike) tl.fromTo(strike, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: 0.07 }, 0.62);
  if (after)
    tl.fromTo(
      after,
      { autoAlpha: 0, y: 16, rotation: -8 },
      { autoAlpha: 1, y: 0, rotation: -3, duration: 0.06, ease: "back.out(2)" },
      0.68,
    );
  if (note)
    tl.fromTo(note, { clipPath: "inset(-30% 100% -30% -8%)" }, { clipPath: "inset(-30% -8% -30% -8%)", duration: 0.08 }, 0.74);
  if (arrow) tl.fromTo(arrow, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.05 }, 0.8);
  tl.to({}, { duration: 0.1 }, 0.9);
}

/** Hosting: the codebase comes apart, one layer at a time. */
function stack(root: HTMLElement): void {
  const iso = root.querySelector<HTMLElement>(".lnd-iso-stack");
  const slabs = gsap.utils.toArray<HTMLElement>(".lnd-slab", root);
  const items = gsap.utils.toArray<HTMLElement>(".lnd-layer-item", root);
  if (!iso || !slabs.length) return;
  let active = -1;
  const show = (i: number) => {
    if (i === active) return;
    active = i;
    slabs.forEach((s, j) => s.classList.toggle("is-active", j === i));
    items.forEach((it) => it.classList.toggle("is-active", Number(it.dataset.layer) === i));
  };
  show(0);
  const n = slabs.length;
  const tl = scrubbed(root, {
    onUpdate: (st) => {
      root.querySelector<HTMLElement>(".lnd-progress")?.style.setProperty("--p", st.progress.toFixed(3));
      show(Math.min(n - 1, Math.floor(st.progress * n)));
    },
  });
  const small = () => window.innerWidth < 721;
  tl.fromTo(
    iso,
    { "--gap": () => (small() ? "6px" : "12px"), "--rz": "-45deg" },
    { "--gap": () => (small() ? "26px" : "58px"), "--rz": "-32deg", duration: 1, ease: "power1.inOut" },
    0,
  );
  slabs.forEach((s, i) => {
    tl.fromTo(s, { "--lift": "0px" }, { "--lift": "26px", duration: 0.08, ease: "power2.out" }, i / n).to(
      s,
      { "--lift": "0px", duration: 0.08, ease: "power2.in" },
      (i + 1) / n - 0.04,
    );
  });
}

/** Hero, AI: the press comes down, a blank card comes out a site. */
function press(root: HTMLElement): void {
  const ram = root.querySelector<HTMLElement>(".lnd-press-ram");
  const belt = root.querySelector<HTMLElement>(".lnd-belt");
  const stamp = root.querySelector<HTMLElement>(".lnd-press-stamp");
  const cards = gsap.utils.toArray<HTMLElement>(".lnd-press-card", root);
  if (!ram || !cards.length) return;
  root.classList.add("is-running");
  gsap.set(cards, { xPercent: -170, autoAlpha: 0, "--fill": 0 });
  if (stamp) gsap.set(stamp, { autoAlpha: 0 });
  const tl = gsap.timeline({ repeat: -1, paused: true });
  cards.forEach((card) => {
    tl.set(card, { xPercent: 0, autoAlpha: 1, "--fill": 0 })
      .to(ram, { y: 40, duration: 0.3, ease: "power4.in" }, "+=0.25")
      .set(card, { "--fill": 1 })
      .fromTo(card, { scaleY: 1 }, { scaleY: 0.93, duration: 0.07, yoyo: true, repeat: 1, ease: "power1.inOut" })
      .fromTo(
        stamp ?? {},
        { autoAlpha: 0, scale: 1.5, rotation: -16 },
        { autoAlpha: 1, scale: 1, rotation: -8, duration: 0.3, ease: "back.out(3)" },
        "<",
      )
      .to(ram, { y: 0, duration: 0.5, ease: "power2.out" }, "<0.05")
      .to(stamp ?? {}, { autoAlpha: 0, duration: 0.2 }, "+=0.35")
      .to(card, { xPercent: 175, autoAlpha: 0, duration: 0.75, ease: "power2.in" }, "<")
      .to(belt ?? {}, { backgroundPositionX: "+=96", duration: 0.75, ease: "power2.in" }, "<")
      .set(card, { xPercent: -170 });
  });
  const go = gsap.delayedCall(0.9, () => tl.play());
  ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    onToggle: (st) => {
      if (go.isActive()) return;
      st.isActive ? tl.play() : tl.pause();
    },
  });
}

/** AI: the repetitive jobs leave the person's lane for the agents'. */
function shift(root: HTMLElement): void {
  const lanes = root.querySelector<HTMLElement>(".lnd-lanes");
  if (!lanes) return;
  const leaving = gsap.utils.toArray<HTMLElement>('[data-lane="you"] .lnd-chip:not([data-keep]) span', root);
  const arriving = gsap.utils.toArray<HTMLElement>('[data-lane="ai"] .lnd-chip span', root);
  const aiLane = root.querySelector<HTMLElement>('[data-lane="ai"]');
  const time = root.querySelector<HTMLElement>(".lnd-time i");
  const tl = scrubbed(root);
  beats(tl, root, [0.52]);
  if (aiLane) tl.fromTo(aiLane, { autoAlpha: 0.2 }, { autoAlpha: 1, duration: 0.1 }, 0.16);
  leaving.forEach((chip, i) => {
    const target = arriving[i];
    if (!target) return;
    const at = 0.22 + i * 0.06;
    tl.fromTo(
      chip,
      { x: 0, y: 0, autoAlpha: 1 },
      {
        x: () => centre(target, lanes).x - centre(chip, lanes).x,
        y: () => centre(target, lanes).y - centre(chip, lanes).y,
        duration: 0.1,
        ease: "power2.inOut",
      },
      at,
    )
      .fromTo(chip, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.01, immediateRender: false }, at + 0.1)
      .fromTo(target, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, at + 0.1);
  });
  if (time) tl.fromTo(time, { scaleX: 1 }, { scaleX: 0.36, duration: 0.5, ease: "power1.inOut" }, 0.22);
  tl.to({}, { duration: 0.12 }, 0.88);
}

/** AI: a site rides the line, one station at a time, and grows up. */
function line(root: HTMLElement): void {
  const floor = root.querySelector<HTMLElement>(".lnd-line-floor");
  const product = root.querySelector<HTMLElement>(".lnd-product");
  const stations = gsap.utils.toArray<HTMLElement>(".lnd-station", root);
  if (!floor || !product || !stations.length) return;
  const n = stations.length;
  const bar = root.querySelector<HTMLElement>(".lnd-progress");
  let state = -1;
  const set = (s: number) => {
    if (s === state) return;
    state = s;
    for (let k = 1; k < n; k++) product.classList.toggle(`is-s${k}`, s >= k);
    stations.forEach((st, i) => {
      st.classList.toggle("is-active", i === s);
      st.classList.toggle("is-done", i < s);
    });
  };
  set(0);
  const small = () => window.innerWidth < 1025;
  const at = (i: number) => {
    if (small()) return 0;
    const x = centre(stations[i], floor).x - product.offsetWidth / 2;
    return Math.max(0, Math.min(floor.offsetWidth - product.offsetWidth, x));
  };
  // Hold at a station, move to the next, hold… The playhead says where we are.
  const tl = scrubbed(root, {
    onUpdate: (st) => {
      bar?.style.setProperty("--p", st.progress.toFixed(3));
      const t = st.progress * (n - 0.5);
      set(Math.min(n - 1, Math.floor(t + 0.25)));
    },
  });
  tl.set(product, { x: () => at(0) }, 0);
  for (let i = 0; i < n - 1; i++) {
    tl.fromTo(product, { x: () => at(i) }, { x: () => at(i + 1), duration: 0.5, ease: "power2.inOut", immediateRender: false }, i + 0.5);
  }
  tl.to({}, { duration: 0.5 }, n - 1);
}

/** AI: the kit's tools tumble in and line up, like a knolled workbench. */
function knoll(root: HTMLElement): void {
  if (!below(root)) return;
  const tools = gsap.utils.toArray<HTMLElement>(".lnd-tool", root);
  const r = rng("knoll");
  tools.forEach((t) =>
    gsap.set(t, { x: (r() - 0.5) * 180, y: 70 + r() * 90, rotation: (r() - 0.5) * 34, autoAlpha: 0 }),
  );
  ScrollTrigger.create({
    trigger: root,
    start: "top 80%",
    once: true,
    onEnter: () =>
      gsap.to(tools, {
        x: 0,
        y: 0,
        rotation: 0,
        autoAlpha: 1,
        duration: 1.1,
        ease: "power3.out",
        stagger: { each: 0.08, from: "random" },
        clearProps: "transform,opacity,visibility",
      }),
  });
}

/** A band's lines slide across, one each way, while it crosses the screen. */
function kinetic(): void {
  document.querySelectorAll<HTMLElement>(".lnd [data-kinetic]").forEach((band) => {
    band.querySelectorAll<HTMLElement>("[data-kinetic-line]").forEach((line) => {
      const dir = Number(line.dataset.kineticLine) || 1;
      gsap.fromTo(
        line,
        { xPercent: dir > 0 ? 0 : -25 },
        {
          xPercent: dir > 0 ? -25 : 0,
          ease: "none",
          scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: 0.4 },
        },
      );
    });
  });
}
