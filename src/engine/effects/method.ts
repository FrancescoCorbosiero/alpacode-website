/* ============================================================
   method — Metodo, «Come si parte.»: a departures board on a pinned
   stage. The board's top row is the step on stage (its number and its
   destination in big split flaps, its note in the board's blue), the
   rows under it the steps still to come. As the visitor scrolls, a step
   departs: the next rolls up to the top row, every flap that changes
   turns through the letters to its new one, as on a station board, and
   the step's text hands over beside the board. Scrolling back rolls it
   back. The board's first entrance turns it in from blank flaps (only
   when it starts below the fold).
   Markup: data-scene="method" on a tall wrapper (--len, in screens), on
   the stage (stage.ts: its [data-scene-stage] sticks once the scene is
   live); the board [data-board], its rows [data-board-row] (the top one
   first), each with its number (.board-no) and its destination
   (.board-to) in flaps [data-fl] (two halves, .fl-up and .fl-dn, each
   with its letter in a <b>) and its note [data-board-note]; the steps'
   texts [data-method-text], one per step, each with its line on the
   board (data-no, data-to, data-note); the progress [data-method-rail]
   (hidden, an i inside); [data-board-dot] blinks as the board turns.
   Laid out (no script, reduced motion, a screen too short to pin it)
   it's the whole board, every step on it, beside the four texts.
   Sources: A src/components/home/Process.astro (the home and /servizi,
   Metodo).
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { inFirstView } from "../core/guards";
import type { Kit } from "../core/kit";
import { scramble } from "./scramble";
import { scrubbed } from "./stage";

gsap.registerPlugin(ScrollTrigger);

export const hook = '[data-scene="method"]';

/* ---------- Settings: the site's voice, tuned when copying ---------- */
const TALL = "(min-height: 600px)"; // a screen tall enough to pin the board; shorter, it stays laid out
const LETTERS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&"; // the order a flap turns through
const TURNS = 5; // at most, the letters a flap shows on its way to the new one
const HALF = 0.05; // s half a flap takes to fall, and the next half to land
const RIPPLE = 0.028; // s between one flap and the next starting, along a row
const ROW = 0.07; // s between one row and the next starting
const DECODE = 0.6; // s the top row's note takes to write itself
const SHIFT = 18; // px a step's text travels as it hands over
const BOOT = "top 78%"; // where the board, blank, turns in

interface Flap {
  up: HTMLElement;
  dn: HTMLElement;
  fall: HTMLElement;
  rise: HTMLElement;
  /** The letter it shows whole, and the markup's, put back at the end. */
  cur: string;
  first: string;
  tl?: gsap.core.Timeline;
}

interface Row {
  no: Flap[];
  to: Flap[];
  note: HTMLElement | null;
  noteFirst: string;
}

const put = (el: HTMLElement, ch: string): void => {
  const b = el.firstElementChild as HTMLElement | null;
  if (b) b.textContent = ch === " " ? "" : ch;
};

/** The letters a flap shows on its way from one to the other, in the
 *  board's order, the last one its own. */
function route(from: string, to: string): string[] {
  if (from === to) return [];
  const a = LETTERS.indexOf(from);
  const b = LETTERS.indexOf(to);
  if (a < 0 || b < 0) return [to];
  const span = (b - a + LETTERS.length) % LETTERS.length;
  const k = Math.min(span, TURNS);
  return Array.from({ length: k }, (_, i) => LETTERS.charAt((a + Math.round((span * (i + 1)) / k)) % LETTERS.length));
}

function half(cls: string): HTMLElement {
  const el = document.createElement("span");
  el.className = cls;
  el.appendChild(document.createElement("b"));
  return el;
}

function flapOf(cell: HTMLElement): Flap | null {
  const up = cell.querySelector<HTMLElement>(".fl-up");
  const dn = cell.querySelector<HTMLElement>(".fl-dn");
  if (!up || !dn) return null;
  const fall = half("fl-fall");
  const rise = half("fl-rise");
  cell.append(fall, rise);
  const ch = (up.textContent ?? "").trim().toUpperCase() || " ";
  return { up, dn, fall, rise, cur: ch, first: ch };
}

export function init(kit: Kit): void {
  kit.query(hook).forEach((root) => {
    const board = root.querySelector<HTMLElement>("[data-board]");
    const texts = gsap.utils.toArray<HTMLElement>("[data-method-text]", root);
    const n = texts.length;
    if (!board || n < 2) return;
    const lines = texts.map((t) => ({ no: t.dataset.no ?? "", to: t.dataset.to ?? "", note: t.dataset.note ?? "" }));
    const rail = root.querySelector<HTMLElement>("[data-method-rail]");
    const dot = board.querySelector<HTMLElement>("[data-board-dot]");

    kit.media.add(TALL, () => {
      // What runs after init (turns, notes, handovers) is killed at the end:
      // the page's context only reverts what init made.
      const live = new Set<gsap.core.Animation>();
      const keep = <T extends gsap.core.Animation | null>(a: T): T => {
        live.forEach((x) => x.progress() === 1 && live.delete(x));
        if (a) live.add(a);
        return a;
      };

      const rows: Row[] = gsap.utils.toArray<HTMLElement>("[data-board-row]", board).map((row) => {
        const flaps = (sel: string) =>
          gsap.utils
            .toArray<HTMLElement>(`${sel} [data-fl]`, row)
            .map(flapOf)
            .filter((f): f is Flap => !!f);
        const note = row.querySelector<HTMLElement>("[data-board-note]");
        return { no: flaps(".board-no"), to: flaps(".board-to"), note, noteFirst: note?.textContent ?? "" };
      });
      const all = rows.flatMap((r) => [...r.no, ...r.to]);
      gsap.set(
        all.map((f) => f.fall),
        { transformOrigin: "50% 100%", transformPerspective: 320, autoAlpha: 0 },
      );
      gsap.set(
        all.map((f) => f.rise),
        { transformOrigin: "50% 0%", transformPerspective: 320, autoAlpha: 0 },
      );

      /* A flap turns to its new letter through the ones between; a turn
         cut short lands first on the last letter it showed whole. */
      const flip = (f: Flap, to: string, delay: number): void => {
        f.tl?.kill();
        put(f.up, f.cur);
        put(f.dn, f.cur);
        gsap.set([f.fall, f.rise], { autoAlpha: 0, rotationX: 0 });
        const path = route(f.cur, to);
        if (!path.length) return;
        const tl = gsap.timeline({ delay });
        let from = f.cur;
        path.forEach((ch) => {
          const was = from;
          tl.call(() => {
            put(f.up, ch);
            put(f.fall, was);
            put(f.rise, ch);
          })
            .fromTo(f.fall, { autoAlpha: 1, rotationX: 0 }, { rotationX: -90, duration: HALF, ease: "power1.in", immediateRender: false })
            .fromTo(f.rise, { autoAlpha: 1, rotationX: 90 }, { rotationX: 0, duration: HALF, ease: "power1.out", immediateRender: false })
            .call(() => {
              put(f.dn, ch);
              f.cur = ch;
            });
          from = ch;
        });
        tl.set([f.fall, f.rise], { autoAlpha: 0 });
        f.tl = keep(tl);
      };

      const write = (row: Row, text: string, top: boolean): void => {
        const el = row.note;
        if (!el || el.textContent === text) return;
        if (top) {
          keep(scramble(el, text, DECODE));
          return;
        }
        keep(
          gsap.to(el, {
            autoAlpha: 0,
            duration: 0.15,
            onComplete: () => {
              el.textContent = text;
              keep(gsap.to(el, { autoAlpha: 1, duration: 0.25 }));
            },
          }),
        );
      };

      /* The board with step k on top and the ones after it below. */
      const turn = (k: number): void => {
        rows.forEach((row, r) => {
          const line = lines[k + r];
          const word = [...(line?.no ?? "").padEnd(row.no.length), ...(line?.to ?? "").padEnd(row.to.length)];
          [...row.no, ...row.to].forEach((f, i) => flip(f, (word[i] ?? " ").toUpperCase(), r * ROW + i * RIPPLE));
          write(row, line?.note ?? "", r === 0);
        });
        if (dot) keep(gsap.fromTo(dot, { opacity: 0.2 }, { opacity: 1, duration: 0.16, repeat: 2, yoyo: true, ease: "none" }));
      };

      // Below the fold, the board waits blank and turns in as it arrives.
      let booted = inFirstView(board);
      if (!booted) {
        all.forEach((f) => {
          f.cur = " ";
          put(f.up, " ");
          put(f.dn, " ");
        });
        rows.forEach((row) => row.note && (row.note.textContent = ""));
      }

      let active = 0;
      gsap.set(texts, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) });
      const go = (k: number): void => {
        if (k === active) return;
        const dir = k > active ? 1 : -1;
        const was = texts[active];
        const now = texts[k];
        active = k;
        if (booted) turn(k);
        if (was) keep(gsap.to(was, { autoAlpha: 0, y: -SHIFT * dir, duration: 0.25, ease: "power1.in", overwrite: true }));
        if (now)
          keep(
            gsap.fromTo(now, { autoAlpha: 0, y: SHIFT * dir }, { autoAlpha: 1, y: 0, duration: 0.45, delay: 0.12, ease: "power2.out", overwrite: true }),
          );
      };

      if (!booted)
        ScrollTrigger.create({
          trigger: board,
          start: BOOT,
          once: true,
          onEnter: () => {
            booted = true;
            turn(active);
          },
        });

      const tl = scrubbed(kit, root, { onUpdate: (st) => go(Math.min(n - 1, Math.floor(st.progress * n))) });
      if (rail) rail.hidden = false;
      const bar = rail?.querySelector("i");
      if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1, immediateRender: false }, 0);
      tl.set({}, {}, 1);

      return () => {
        live.forEach((a) => a.kill());
        all.forEach((f) => {
          f.tl?.kill();
          f.fall.remove();
          f.rise.remove();
          put(f.up, f.first);
          put(f.dn, f.first);
        });
        rows.forEach((row) => {
          if (!row.note) return;
          row.note.textContent = row.noteFirst;
          gsap.set(row.note, { clearProps: "opacity,visibility" });
        });
        gsap.set(texts, { clearProps: "opacity,visibility,transform" });
        if (dot) gsap.set(dot, { clearProps: "opacity" });
        if (rail) rail.hidden = true;
        root.removeAttribute("data-scene-live");
        root.classList.remove("is-pinned");
      };
    });
  });
}
