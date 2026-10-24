/* ============================================================
   hover-preview — over a list, a large frame follows the pointer and
   shows the picture of the row under it.
   Markup: data-hover-preview on the list; its rows [data-preview], each
   with its picture in [data-preview-thumb] (an <img>) and, optionally,
   data-preview-label (the text for the frame's bar) and
   data-preview-vt (the view-transition name its thumb carries). The
   frame is the site's: [data-preview-frame], hidden, with an empty
   [data-preview-slot] and, optionally, [data-preview-addr].
   A mouse only, and only where the list is laid out as rows (the media
   query, a setting): elsewhere the thumbs are the list's pictures. The
   effect unhides the frame and fills it with copies of the thumbs (at
   the frame's size, so the srcset gives a sharper file; fetched once
   the pointer first comes in), and sets data-preview-on on the list.
   The frame trails the pointer (quickTo), on its right, or on its left
   near the right edge; it leans with the pointer's speed; each row's
   picture wipes in from the side the pointer came from. A click hands
   the row's view-transition name from its thumb to the frame: what the
   visitor was looking at is what grows into the next page.
   Sources: new — alpacode.it, /lavori.
   ============================================================ */
import { gsap } from "gsap";
import type { Kit } from "../core/kit";

export const hook = "[data-hover-preview]";

/* ---------- Settings: the site's voice, tuned when copying ---------- */
const WHERE = "(min-width: 1025px)"; // where the list is rows (below it, cards with their own pictures)
const GAP = 36; // px between the pointer and the frame
const FOLLOW = 0.55; // s the frame takes to catch the pointer
const LEAN = 0.12; // degrees of lean per px/frame of pointer speed
const MAX_LEAN = 7; // degrees: the most it leans
const WIPE = 0.6; // s a row's picture takes to wipe in
const SHOW = 0.35; // s the frame takes to appear or go

export function init(kit: Kit): void {
  if (!kit.fine) return;
  kit.query(hook).forEach((list) => {
    const host = list.parentElement;
    const frame = host?.querySelector<HTMLElement>("[data-preview-frame]");
    const slot = frame?.querySelector<HTMLElement>("[data-preview-slot]");
    const rows = gsap.utils.toArray<HTMLElement>("[data-preview]", list);
    if (!host || !frame || !slot || !rows.length) return;
    const addr = frame.querySelector<HTMLElement>("[data-preview-addr]");

    kit.media.add(WHERE, () => {
      frame.hidden = false;
      list.setAttribute("data-preview-on", "");
      const pics = rows.map((row) => {
        const src = row.querySelector<HTMLImageElement>("[data-preview-thumb] img");
        const pic = document.createElement("img");
        if (src) {
          pic.alt = "";
          pic.decoding = "async";
          pic.sizes = `${Math.round(frame.offsetWidth)}px`;
          pic.dataset.srcset = src.srcset;
          pic.dataset.src = src.currentSrc || src.src;
        }
        slot.appendChild(pic);
        return pic;
      });
      gsap.set(frame, { autoAlpha: 0, scale: 0.92, xPercent: 0, yPercent: -50 });
      gsap.set(pics, { clipPath: "inset(0% 0% 100% 0%)" });

      const toX = gsap.quickTo(frame, "x", { duration: FOLLOW, ease: "power3.out" });
      const toY = gsap.quickTo(frame, "y", { duration: FOLLOW, ease: "power3.out" });
      const toLean = gsap.quickTo(frame, "rotation", { duration: FOLLOW * 1.4, ease: "power3.out" });
      let current = -1;
      let lastX = 0;
      let lastY = 0;
      let loaded = false;
      let z = 1;

      const place = (e: PointerEvent, jump = false): void => {
        const box = host.getBoundingClientRect();
        const px = e.clientX - box.left;
        const py = e.clientY - box.top;
        const w = frame.offsetWidth;
        const x = px + GAP + w > box.width ? px - GAP - w : px + GAP;
        if (jump) {
          gsap.set(frame, { x, y: py });
        } else {
          toX(x);
          toY(py);
        }
        const speed = e.clientX - lastX;
        toLean(gsap.utils.clamp(-MAX_LEAN, MAX_LEAN, speed * LEAN));
        lastX = e.clientX;
      };

      const show = (i: number, e: PointerEvent): void => {
        if (i === current) return;
        const down = e.clientY >= lastY;
        current = i;
        const pic = pics[i];
        if (!pic) return;
        if (addr) addr.textContent = rows[i]?.dataset.previewLabel ?? "";
        gsap.set(pic, { zIndex: ++z });
        gsap.fromTo(
          pic,
          { clipPath: down ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", scale: 1.12 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: WIPE, ease: "expo.out", overwrite: true },
        );
      };

      const load = (): void => {
        if (loaded) return;
        loaded = true;
        pics.forEach((pic) => {
          if (pic.dataset.srcset) pic.srcset = pic.dataset.srcset;
          if (pic.dataset.src) pic.src = pic.dataset.src;
        });
      };

      kit.on(list, "pointerenter", (e) => {
        load();
        place(e, true);
        gsap.to(frame, { autoAlpha: 1, scale: 1, duration: SHOW, ease: "power3.out", overwrite: "auto" });
      });
      kit.on(list, "pointerleave", () => {
        current = -1;
        toLean(0);
        gsap.to(frame, { autoAlpha: 0, scale: 0.92, duration: SHOW, ease: "power2.in", overwrite: "auto" });
      });
      kit.on(list, "pointermove", (e) => {
        place(e);
        const row = (e.target as Element).closest<HTMLElement>("[data-preview]");
        const i = row ? rows.indexOf(row) : -1;
        if (i >= 0) show(i, e);
        lastY = e.clientY;
      });
      // The row's view-transition name goes with what the visitor sees.
      rows.forEach((row) => {
        const name = row.dataset.previewVt;
        if (!name) return;
        kit.on(row, "click", () => {
          row.querySelectorAll<HTMLElement>("[data-preview-thumb] *").forEach((el) => {
            if (el.style.viewTransitionName === name) el.style.viewTransitionName = "none";
          });
          frame.style.viewTransitionName = name;
        });
      });

      return () => {
        pics.forEach((pic) => pic.remove());
        frame.hidden = true;
        frame.style.removeProperty("view-transition-name");
        list.removeAttribute("data-preview-on");
        rows.forEach((row) => {
          const name = row.dataset.previewVt;
          row.querySelectorAll<HTMLElement>("[data-preview-thumb] *").forEach((el) => {
            if (name && el.style.viewTransitionName === "none") el.style.viewTransitionName = name;
          });
        });
      };
    });
  });
}
