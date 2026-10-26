/* ============================================================
   The service pages' machines (/servizi/<slug>), and the pen's
   corrections of "Quando serve": an effect in the engine's contract,
   fetched only by pages that have a .lnd [data-machine] or
   [data-fixes] (registry.ts, lazy), built inside the page's
   gsap.context() and reverted with it. Under reduced motion it never
   runs: the markup is laid out in its end state by landing.css.

   A machine is the hero's object, one per service
   (components/landing/machines/): painted complete, it is moved from
   there on a loop that comes back to the same composition, so the
   first paint never waits on it and nothing is hidden before it runs.
   It plays only while it's on screen and the tab is shown.
     roadmap    consulenza: the tasks scatter, then sort into now,
                next and later; the route is drawn, the note written
     wireframe  siti: back to the drawing, built block by block, live;
                the cursor asks for a quote, the request comes in
     checkout   e-commerce: into the cart, cart → payment → shipping,
                the label prints numbered on, stamped
     pipeline   software: each row of the sheet goes through the
                process, step by step, and is ticked off
     answer     AI: the question, the lookup in the business's own
                systems, the draft word by word, approved, sent
     heartbeat  manutenzione: the pulse runs, the backups fill day by
                day, the log is written, a request comes in, done
     lesson     formazione: the teacher places the first block, you
                the second (the wrong slot, then the right one), the
                third on your own; the stamp says so
   The corrections ([data-fixes]): below the fold, as each item
   enters, the pen strikes the problem out, then the fix is written
   above it and its arrow drawn.
   Positions are measured from layout (centre(), offsets), never from
   transformed boxes. A loop that comes back to its start: when a
   timeline repeats, every property returns to where the first tween
   that moves it found it, so the first move of each property starts
   from the painted state (a to(), or a set() that records it).
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { inFirstView } from "../../engine/core/guards";
import type { Kit } from "../../engine/core/kit";
import { centre } from "../../engine/effects/stage";
import { rng } from "../../engine/effects/_seed";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

export const hook = ".lnd [data-machine], .lnd [data-fixes]";

type Machine = (root: HTMLElement, kit: Kit) => gsap.core.Animation[];

const MACHINES: Record<string, Machine> = { roadmap, wireframe, checkout, pipeline, answer, heartbeat, lesson };

/* ---------- Settings: the site's voice ---------- */
const FIRST = 0.9; // s the painted machine holds before its first move
const FIX_START = "top 80%"; // where a correction counts as entering
const HIDDEN = "inset(-30% 100% -30% -8%)"; // a note not yet written
const WRITTEN = "inset(-30% -8% -30% -8%)";

export function init(kit: Kit): void {
  kit.query<HTMLElement>(".lnd [data-fixes]").forEach((list) => fixes(list));
  kit.query<HTMLElement>(".lnd [data-machine]").forEach((root) => {
    const build = MACHINES[root.dataset.machine ?? ""];
    if (!build) return;
    root.setAttribute("data-machine-live", "");
    kit.cleanup(() => root.removeAttribute("data-machine-live"));
    whileShown(root, build(root, kit), kit);
  });
}

/* ---------- Helpers ---------- */

const one = <T extends Element = HTMLElement>(sel: string, root: Element): T | null => root.querySelector<T>(sel);
const all = <T extends Element = HTMLElement>(sel: string, root: Element): T[] => gsap.utils.toArray<T>(root.querySelectorAll(sel));

/** Play a machine's loops while it's on screen and the tab is shown. */
function whileShown(root: HTMLElement, loops: gsap.core.Animation[], kit: Kit): void {
  if (!loops.length) return;
  let onScreen = false;
  const run = () => loops.forEach((a) => (onScreen && !document.hidden ? a.play() : a.pause()));
  ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    onToggle: (st) => {
      onScreen = st.isActive;
      run();
    },
  });
  document.addEventListener("visibilitychange", run);
  kit.cleanup(() => document.removeEventListener("visibilitychange", run));
}

/** A loop that starts where the page was painted. */
const loop = (): gsap.core.Timeline => gsap.timeline({ repeat: -1, paused: true, delay: FIRST });

/** Put a text back when the page is reverted. */
function keepText(el: Element | null, kit: Kit): void {
  if (!el) return;
  const text = el.textContent;
  kit.cleanup(() => {
    el.textContent = text;
  });
}

/** Classes a machine toggles, cleared when the page is reverted. */
function keepClasses(els: Element[], names: string[], kit: Kit): void {
  kit.cleanup(() => els.forEach((el) => el.classList.remove(...names)));
}

/* ---------- The corrections ---------- */

function fixes(list: HTMLElement): void {
  if (inFirstView(list)) return;
  all(".svp-when-item", list).forEach((item) => {
    const mark = one(".lnd-mark", item);
    const note = one("[data-fix-write]", item);
    const arrow = note ? one<SVGPathElement>("path", note) : null;
    if (!mark || !note) return;
    gsap.set(mark, { "--mark-sweep": "0%" });
    gsap.set(note, { clipPath: HIDDEN });
    if (arrow) gsap.set(arrow, { drawSVG: "0%" });
    const tl = gsap.timeline({ paused: true });
    tl.to(mark, { "--mark-sweep": "100%", duration: 0.6, ease: "power2.out" }, 0.1).to(
      note,
      { clipPath: WRITTEN, duration: 0.75, ease: "power2.out", clearProps: "clipPath" },
      ">0.05",
    );
    if (arrow) tl.to(arrow, { drawSVG: "100%", duration: 0.4, ease: "power2.out" }, "-=0.3");
    ScrollTrigger.create({ trigger: item, start: FIX_START, once: true, onEnter: () => void tl.play() });
  });
}

/* ---------- The machines ---------- */

/** Consulenza: scattered tasks, sorted into a roadmap. */
function roadmap(root: HTMLElement): gsap.core.Animation[] {
  const board = one(".svm-road", root);
  const chips = all("[data-chip]", root);
  if (!board || !chips.length) return [];
  const heads = all("[data-road-head]", root);
  const route = all<SVGPathElement>("[data-road-route], [data-road-tip]", root);
  const note = one("[data-machine-note]", root);
  const r = rng("roadmap");
  const spots = chips.map(() => ({ x: r() - 0.5, y: r() - 0.5, turn: (r() - 0.5) * 30 }));

  const tl = loop();
  tl.to({}, { duration: 1.4 })
    .to(chips, {
      x: (i: number) => spots[i]!.x * board.offsetWidth * 0.62,
      y: (i: number) => spots[i]!.y * board.offsetHeight * 0.5,
      rotation: (i: number) => spots[i]!.turn,
      duration: 0.8,
      ease: "power3.inOut",
      stagger: { each: 0.04, from: "random" },
    })
    .to(heads, { opacity: 0.3, duration: 0.4 }, "<")
    .to(route, { drawSVG: "0%", duration: 0.4 }, "<");
  if (note) tl.to(note, { clipPath: HIDDEN, duration: 0.3 }, "<");
  tl.to(chips, { rotation: "+=5", duration: 0.22, yoyo: true, repeat: 3, ease: "sine.inOut", stagger: 0.03 })
    .to(chips, { x: 0, y: 0, rotation: 0, duration: 0.9, ease: "expo.out", stagger: 0.12 })
    .to(heads, { opacity: 1, duration: 0.3, stagger: 0.24 }, "<")
    .fromTo(route[0] ?? {}, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.8, ease: "power2.inOut" }, ">-0.35")
    .fromTo(route[1] ?? {}, { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.25 }, ">-0.05");
  if (note) tl.to(note, { clipPath: WRITTEN, duration: 0.7, ease: "power2.out" }, ">-0.1");
  tl.to({}, { duration: 2.6 });
  return [tl];
}

/** Siti: from the drawing to the page, live, and the first request. */
function wireframe(root: HTMLElement): gsap.core.Animation[] {
  const browser = one("[data-browser]", root);
  const blocks = all("[data-b]", root);
  if (!browser || !blocks.length) return [];
  const live = one("[data-live]", root);
  const toast = one("[data-toast]", root);
  const cursor = one<SVGSVGElement>("[data-cursor]", root);
  const cta = one("[data-cta]", root);
  const head = one(".svm-h", root);
  const checks = all("[data-check]", root);

  // The cursor rests on the button it presses.
  if (cursor && cta) {
    const c = centre(cta, browser);
    gsap.set(cursor, { left: c.x + cta.offsetWidth * 0.18, top: c.y - 4 });
  }
  gsap.set(blocks, { "--w": 0 });

  const tl = loop();
  tl.to({}, { duration: 1.2 })
    .to([toast, cursor], { autoAlpha: 0, duration: 0.3 })
    .set(toast, { y: 14 })
    .set(cursor, { x: 90, y: 80 })
    .to(checks, { autoAlpha: 0.25, duration: 0.3, stagger: 0.05 }, "<")
    .to(live, { autoAlpha: 0, scale: 0.6, duration: 0.25 }, "<")
    .to(blocks, { "--w": 1, duration: 0.45, stagger: 0.06, ease: "power2.inOut" }, "<0.1")
    .set(head, { clipPath: "inset(0% 100% 0% 0%)" })
    .to({}, { duration: 0.6 })
    .to(blocks, { "--w": 0, duration: 0.5, stagger: 0.2, ease: "power2.out" });
  if (head) tl.to(head, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "steps(16)" }, "<0.2");
  tl.to(live, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(3)" }, ">0.2").to(
    checks,
    { autoAlpha: 1, duration: 0.3, stagger: 0.15 },
    "<",
  );
  if (cursor) tl.to(cursor, { autoAlpha: 1, x: 0, y: 0, duration: 0.8, ease: "power2.inOut" }, ">0.1");
  if (cta) tl.to(cta, { scale: 0.93, duration: 0.1, yoyo: true, repeat: 1 }, ">");
  if (toast) tl.to(toast, { autoAlpha: 1, y: 0, duration: 0.45, ease: "back.out(2)" }, ">0.1");
  tl.to({}, { duration: 2.4 });
  return [tl];
}

/** E-commerce: one order after another. */
function checkout(root: HTMLElement, kit: Kit): gsap.core.Animation[] {
  const add = one("[data-add]", root);
  const ghost = one("[data-ghost]", root);
  const cart = one("[data-cart]", root);
  const label = one("[data-label]", root);
  if (!add || !ghost || !cart || !label) return [];
  const count = one("[data-count]", root);
  const order = one("[data-order]", root);
  const steps = all("[data-flow-step]", root);
  const fill = one("[data-flow-fill]", root);
  const stamp = one("[data-stamp]", label);
  keepText(count, kit);
  keepText(order, kit);
  let items = Number(count?.textContent) || 1;
  let n = Number(order?.textContent) || Number(root.dataset.first) || 1;

  // The ghost leaves from the button and lands in the cart, on an arc.
  const from = centre(add, root);
  const to = centre(cart, root);
  gsap.set(ghost, { left: from.x - 10, top: from.y - 10 });
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (fill) gsap.set(fill, { "--f": 1 });

  const tl = loop();
  tl.to({}, { duration: 1.0 })
    .to(label, { x: 70, autoAlpha: 0, duration: 0.45, ease: "power2.in" })
    .set(label, { clipPath: "inset(0% 0% 100% 0%)" })
    .set(ghost, { autoAlpha: 0 })
    .to(fill, { "--f": 0, duration: 0.3 }, "<")
    .to(steps, { opacity: 0.4, duration: 0.3 }, "<")
    .set(stamp, { autoAlpha: 0, scale: 1.6 })
    .to(add, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }, ">0.2")
    .fromTo(
      ghost,
      { autoAlpha: 1, x: 0, y: 0, scale: 1 },
      {
        motionPath: { path: [{ x: 0, y: 0 }, { x: dx * 0.55, y: dy - 70 }, { x: dx, y: dy }], curviness: 1.2 },
        scale: 0.45,
        duration: 0.75,
        ease: "power2.inOut",
      },
      ">",
    )
    .set(ghost, { autoAlpha: 0 })
    .call(() => {
      items = items >= 9 ? 1 : items + 1;
      if (count) count.textContent = String(items);
    })
    .fromTo(cart, { scale: 1 }, { scale: 1.12, duration: 0.12, yoyo: true, repeat: 1 }, "<");
  steps.forEach((step, i) => {
    tl.to(fill, { "--f": (i + 1) / steps.length, duration: 0.35, ease: "power1.inOut" }, i ? ">0.15" : ">0.1").to(
      step,
      { opacity: 1, duration: 0.2 },
      "<",
    );
  });
  tl.call(() => {
    n += 1;
    if (order) order.textContent = String(n);
  })
    .set(label, { x: 0, autoAlpha: 1 })
    .to(label, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power2.out" })
    .to(stamp, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, ">0.1")
    .to({}, { duration: 1.7 });
  return [tl];
}

/** Software: each row of the sheet through the process, ticked off. */
function pipeline(root: HTMLElement, kit: Kit): gsap.core.Animation[] {
  const chain = one(".svm-chain", root);
  const packet = one("[data-packet]", root);
  const nodes = all("[data-node]", root);
  const rows = all("[data-row]", root);
  if (!chain || !packet || !nodes.length || !rows.length) return [];
  const oks = all("[data-ok]", root);
  keepClasses([...nodes, ...rows], ["is-on", "is-off", "is-hot"], kit);
  const xs = nodes.map((node) => centre(one(".svm-node-box", node) ?? node, chain).x);
  const at = (j: number) => (xs[j] ?? 0) - (xs[0] ?? 0);

  const tl = loop();
  tl.to({}, { duration: 1.0 })
    .set(packet, { autoAlpha: 0, x: 0, scale: 1 })
    .to(oks, { autoAlpha: 0, duration: 0.25 })
    .call(() => nodes.forEach((node) => node.classList.add("is-off")));
  rows.forEach((row, i) => {
    tl.call(() => row.classList.add("is-hot"), undefined, ">0.2").fromTo(
      packet,
      { autoAlpha: 1, x: 0, scale: 0.3 },
      { scale: 1, duration: 0.2 },
    );
    nodes.forEach((node, j) => {
      if (j) tl.to(packet, { x: at(j), duration: 0.34, ease: "power1.inOut" });
      tl.call(() => node.classList.remove("is-off")).call(() => node.classList.add("is-on")).call(
        () => node.classList.remove("is-on"),
        undefined,
        "+=0.2",
      );
    });
    tl.to(packet, { autoAlpha: 0, duration: 0.15 })
      .call(() => row.classList.remove("is-hot"))
      .to(oks[i] ?? {}, { autoAlpha: 1, duration: 0.2 }, "<");
  });
  tl.to({}, { duration: 1.8 });
  return [tl];
}

/** AI: each thread in turn, from the question to the answer sent. */
function answer(root: HTMLElement, kit: Kit): gsap.core.Animation[] {
  const box = one("[data-threads-box]", root);
  const first = one("[data-thread]", root);
  if (!box || !first) return [];
  let data: { q: string; source: string; a: string }[] = [];
  try {
    data = JSON.parse(root.dataset.threads ?? "[]");
  } catch {
    data = [];
  }
  // The painted thread is the first; the others are copies of it.
  const threads = [first];
  data.slice(1).forEach((d) => {
    const copy = first.cloneNode(true) as HTMLElement;
    const set = (sel: string, text: string) => {
      const el = one(sel, copy);
      if (el) el.textContent = text;
    };
    set("[data-q]", d.q);
    set("[data-src-t]", d.source);
    set("[data-a-t]", d.a);
    gsap.set(copy, { autoAlpha: 0 });
    box.append(copy);
    threads.push(copy);
  });
  kit.cleanup(() => threads.slice(1).forEach((t) => t.remove()));
  // The draft, word by word.
  threads.forEach((t) => {
    const a = one("[data-a-t]", t);
    if (!a) return;
    if (t === first) keepText(a, kit);
    const words = (a.textContent ?? "").trim().split(/\s+/);
    a.textContent = "";
    words.forEach((w, i) => {
      const s = document.createElement("span");
      s.className = "svm-w";
      s.textContent = (i ? " " : "") + w;
      a.append(s);
    });
  });
  keepClasses(all("[data-approve]", box), ["is-pressed"], kit);

  const tl = loop();
  tl.to({}, { duration: 1.2 }).to(first, { autoAlpha: 0, y: -10, duration: 0.35 }).set(first, { y: 0 });
  threads.forEach((t) => {
    const q = one("[data-q]", t);
    const src = one("[data-src]", t);
    const scan = one("[data-scan]", t);
    const a = one("[data-a]", t);
    const words = all(".svm-w", t);
    const btn = one("[data-approve]", t);
    const sent = one("[data-sent]", t);
    tl.set(t, { autoAlpha: 1 })
      .set([q, src, a, sent], { autoAlpha: 0, x: 0, y: 0 })
      .set(scan, { autoAlpha: 0, xPercent: 0 })
      .set(words, { opacity: 0 })
      .fromTo(q, { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out" })
      .fromTo(src, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3 }, ">0.45")
      .fromTo(scan, { xPercent: -110, autoAlpha: 1 }, { xPercent: 320, duration: 0.75, ease: "power1.inOut" }, "<")
      .set(scan, { autoAlpha: 0 })
      .fromTo(a, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3 }, ">0.1")
      .to(words, { opacity: 1, duration: 0.05, stagger: 0.075, ease: "none" }, ">")
      .call(() => btn?.classList.add("is-pressed"), undefined, ">0.4")
      .fromTo(sent, { autoAlpha: 0, x: 10 }, { autoAlpha: 1, x: 0, duration: 0.3 }, ">0.15")
      .call(() => btn?.classList.remove("is-pressed"), undefined, ">0.35")
      .to({}, { duration: 1.6 })
      .to(t, { autoAlpha: 0, y: -10, duration: 0.35 })
      .set(t, { y: 0 });
  });
  return [tl];
}

/** Manutenzione: the pulse, the backups, the log, a request done. */
function heartbeat(root: HTMLElement, kit: Kit): gsap.core.Animation[] {
  const pulse = one<SVGSVGElement>(".svm-pulse svg", root);
  const days = all("[data-day]", root);
  const logs = all("[data-log]", root);
  const ticket = one("[data-ticket]", root);
  const stamp = ticket ? one("[data-stamp]", ticket) : null;
  keepClasses(days, ["is-empty"], kit);
  const loops: gsap.core.Animation[] = [];
  if (pulse) loops.push(gsap.to(pulse, { xPercent: -50, duration: 3.4, ease: "none", repeat: -1, paused: true }));
  if (!days.length) return loops;

  const tl = loop();
  tl.to({}, { duration: 1.2 })
    .to(logs, { autoAlpha: 0, x: 0, duration: 0.25 })
    .to(ticket, { autoAlpha: 0, y: 16, duration: 0.3 }, "<")
    .set(stamp, { autoAlpha: 0, scale: 1.6 })
    .call(() => days.forEach((d) => d.classList.add("is-empty")));
  const per = Math.max(1, Math.round(days.length / (logs.length + 1)));
  days.forEach((d, i) => {
    tl.call(() => d.classList.remove("is-empty"), undefined, i ? ">0.13" : ">0.3");
    const log = logs[Math.floor((i + 1) / per) - 1];
    if ((i + 1) % per === 0 && log) tl.fromTo(log, { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, duration: 0.3 }, ">");
  });
  tl.to(logs, { autoAlpha: 1, duration: 0.2 }, ">")
    .fromTo(ticket, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "back.out(2)" }, ">0.3")
    .to(stamp, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, ">1.1")
    .to({}, { duration: 2.2 });
  loops.push(tl);
  return loops;
}

/** Formazione: watch, try, do it yourself. */
function lesson(root: HTMLElement): gsap.core.Animation[] {
  const blocks = all("[data-block]", root);
  const spots = all("[data-spot]", root);
  const slots = all("[data-slot]", root);
  const teacher = one('[data-cur="teacher"]', root);
  const you = one('[data-cur="you"]', root);
  const badge = one("[data-badge]", root);
  if (blocks.length < 3 || spots.length < 3 || slots.length < 3 || !teacher || !you) return [];

  // Where each block waits (its spot in the palette), from its slot.
  const home = blocks.map((b, i) => {
    const from = centre(b, root);
    const to = centre(spots[i]!, root);
    return { x: to.x - from.x, y: to.y - from.y };
  });
  // A cursor's offset that puts its tip on a point.
  const tip = (cur: HTMLElement, p: { x: number; y: number }) => ({ x: p.x - cur.offsetLeft - 2, y: p.y - cur.offsetTop - 2 });
  const onSpot = (cur: HTMLElement, i: number) => tip(cur, centre(spots[i]!, root));
  const onSlot = (cur: HTMLElement, i: number) => tip(cur, centre(slots[i]!, root));
  const gap = { x: centre(slots[2]!, root).x - centre(slots[1]!, root).x, y: centre(slots[2]!, root).y - centre(slots[1]!, root).y };

  const tl = loop();
  tl.to({}, { duration: 1.2 })
    .to(badge, { autoAlpha: 0, scale: 1, rotation: -5, duration: 0.3 })
    .to(blocks, { x: (i: number) => home[i]!.x, y: (i: number) => home[i]!.y, scale: 0.6, duration: 0.6, ease: "power3.inOut", stagger: 0.08 }, "<")
    // Watch: the teacher places the first block.
    .to(teacher, { ...onSpot(teacher, 0), duration: 0.7, ease: "power2.inOut" }, ">0.2")
    .to(teacher, { scale: 0.88, duration: 0.1 })
    .to(teacher, { ...onSlot(teacher, 0), duration: 0.7, ease: "power2.inOut" })
    .to(blocks[0]!, { x: 0, y: 0, scale: 1, duration: 0.7, ease: "power2.inOut" }, "<")
    .to(teacher, { scale: 1, duration: 0.1 })
    .to(teacher, { x: 0, y: 0, duration: 0.6, ease: "power2.inOut" }, ">0.15")
    // Try: you take the second, to the wrong slot first.
    .to(you, { ...onSpot(you, 1), duration: 0.6, ease: "power2.inOut" }, "<")
    .to(you, { scale: 0.88, duration: 0.1 })
    .to(you, { ...onSlot(you, 2), duration: 0.6, ease: "power2.inOut" })
    .to(blocks[1]!, { x: gap.x, y: gap.y, scale: 1, duration: 0.6, ease: "power2.inOut" }, "<")
    .to(blocks[1]!, { x: gap.x + 6, duration: 0.06, yoyo: true, repeat: 5, ease: "none" })
    .to(you, { ...onSlot(you, 1), duration: 0.5, ease: "power2.inOut" }, ">0.1")
    .to(blocks[1]!, { x: 0, y: 0, duration: 0.5, ease: "power2.inOut" }, "<")
    .to(you, { scale: 1, duration: 0.1 })
    // Do: the third, on your own, quicker.
    .to(you, { ...onSpot(you, 2), duration: 0.45, ease: "power2.inOut" }, ">0.1")
    .to(you, { scale: 0.88, duration: 0.08 })
    .to(you, { ...onSlot(you, 2), duration: 0.45, ease: "power2.inOut" })
    .to(blocks[2]!, { x: 0, y: 0, scale: 1, duration: 0.45, ease: "power2.inOut" }, "<")
    .to(you, { scale: 1, duration: 0.08 })
    .to(you, { x: 0, y: 0, duration: 0.5, ease: "power2.inOut" }, ">0.1")
    .fromTo(badge, { autoAlpha: 0, scale: 1.6, rotation: -12 }, { autoAlpha: 1, scale: 1, rotation: -5, duration: 0.4, ease: "back.out(3)" }, "<")
    .to({}, { duration: 2.2 });
  return [tl];
}
