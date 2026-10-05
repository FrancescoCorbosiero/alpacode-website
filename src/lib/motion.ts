/* ============================================================
   Alpacode — motion engine.
   GSAP (ScrollTrigger + SplitText) with Lenis smooth scrolling.

   The CSS half lives in styles/motion.css: the above-the-fold intro
   (pure keyframes, no waiting on this script) and the Lenis rules. This
   file owns everything that follows the scroll:

   - Lenis smooth scrolling for wheel/trackpad (touch keeps native
     scrolling), synced with ScrollTrigger and driven by GSAP's ticker.
   - Section titles split into lines that rise out of their masks.
   - Content blocks fade up in staggered batches as they enter.
   - Kicker and section struts draw themselves in.
   - Photos open from a clip and settle from a slight zoom.
   - Header: .scrolled past 8px, .is-hidden while reading downwards.
   - Home hero: video sources attached only when welcome; the claim and
     the lockup drift apart as the page scrolls away.

   Attribute API for new markup:
     data-split             heading — line-by-line mask reveal
     data-reveal            any block — fade-up when it enters
     data-scrub             paragraph — words light up with scroll
     data-speed="0.15"      parallax drift, as a fraction of own height
     data-progress          list with a rail: [data-progress-fill] is
                            scrubbed (--p, 0→1) and [data-progress-step]
                            children get .is-reached as it passes
     data-strut             bar — draws in from the left
     .ticker--xl            marquee that follows scroll speed/direction

   Rules of the house:
   - Nothing is hidden by CSS. Blocks are hidden here, at init, and only
     if they are below the fold — so no flash of content, and a page
     whose script fails is just a static page.
   - Reveals hand control back to the stylesheet when done (clearProps),
     so hover transforms keep working.
   - Astro's ClientRouter swaps pages without reloading: everything is
     created per page inside a gsap.context() and reverted on
     astro:before-swap; Lenis is recreated after each swap (the swap
     wipes the classes it sets on <html>).
   - prefers-reduced-motion: no Lenis, no scroll animation. The header
     still reports .scrolled, but never slides away.
   ============================================================ */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const reduced = (): boolean => reducedQuery.matches;

const EASE = "power4.out";

/* ---------- Selectors ---------- */

const HEADINGS = [
  ".section-head h2",
  ".pitch-lead",
  ".cta-final .display",
  ".sus-limits-title",
  ".rep-boundary-title",
  ".clb-pact-head h2",
  "[data-split]",
].join(",");

const BLOCKS = [
  ".section-head .lede",
  ".band-cta",
  ".pitch-intro",
  ".pitch-turn",
  ".pitch-foot",
  ".pitch-cta",
  ".verbs .verb",
  ".value-group",
  ".scale-foot",
  ".product",
  ".products-teaser-foot",
  ".step",
  ".svc-group-head",
  ".svc-cross",
  ".svc-row",
  ".pillars .pillar",
  ".manifesto-sig",
  ".map-figure",
  ".coverage-info",
  ".cta-final .sub",
  ".cta-grid",
  ".cta-final-actions",
  ".work",
  ".course",
  ".cmp-faq-item",
  ".sus-saving",
  ".sus-how-row",
  ".sus-limits-list li",
  ".sus-pledge",
  ".sus-cross",
  ".rep-kpi",
  ".rep-plot",
  ".rep-q",
  ".rep-pledge",
  ".rep-formula",
  ".rep-boundary-list li",
  ".soc-pillar",
  ".soc-meter",
  ".soc-facet",
  ".soc-def",
  ".clb-col",
  ".clb-craft",
  ".clb-form-card",
  ".clb-pact-list li",
  ".clb-cross",
  ".clb-form",
  ".foot-col",
  ".foot-index",
  "[data-reveal]",
].join(",");

const STRUTS = [
  ".strut-short",
  ".v-strut",
  ".p-strut",
  ".step-strut",
  ".value-strut",
  ".manifesto-sig-bar",
  "[data-strut]",
].join(",");

const KICKERS = ".section-head .sec-num, .pitch .sec-num, .clb-pact-head .sec-num";

/* ---------- Helpers ---------- */

/** True when the element starts inside (or above) the first screen. Those
 *  are left alone: hiding them now would flash already-painted content. */
const inFirstView = (el: Element): boolean =>
  el.getBoundingClientRect().top < window.innerHeight * 0.92;

/** Intro-animated (CSS) and island-rendered elements are off limits: the
 *  first already moved, and React would see our inline styles as
 *  hydration mismatches — wrap an island in [data-reveal] instead. */
const skipIntro = (el: Element): boolean =>
  !!el.closest(".intro-lines, [data-intro], [data-hero], astro-island");

/* ---------- Lenis ---------- */

let lenis: Lenis | null = null;

function createLenis(): void {
  if (lenis || reduced()) return;
  lenis = new Lenis({
    lerp: 0.1,
    // Let scrollable panes (⌘K list, mobile menu, cookie preferences,
    // the blog TOC) scroll natively under the pointer.
    allowNestedScroll: true,
    prevent: (node) =>
      node.matches(".cmdk-backdrop, .mnav, .mnav-backdrop, #cc-main, [aria-modal='true']"),
  });
  lenis.on("scroll", ScrollTrigger.update);
}

function destroyLenis(): void {
  lenis?.destroy();
  lenis = null;
}

gsap.ticker.add((time) => lenis?.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

/* Overlays (lib/scroll-lock.ts) pause the page scroll. */
document.addEventListener("alpa:scroll-lock", (e) => {
  if ((e as CustomEvent<boolean>).detail) lenis?.stop();
  else lenis?.start();
});

/** Scroll to an element or a position, smooth when Lenis is running. */
function scrollToTarget(target: HTMLElement | number): void {
  if (lenis) {
    let offset = -16;
    if (typeof target !== "number" && target.getBoundingClientRect().top < 0) {
      // Scrolling up brings the header back: leave room for it.
      offset -= document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
    }
    lenis.scrollTo(target, { offset, duration: 1.3 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: reduced() ? "auto" : "smooth" });
  } else {
    target.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
  }
}

/* Same-page anchors (#proposta, back-to-top…) glide instead of jumping.
   Capture phase, so Astro's router sees defaultPrevented and stands down. */
document.addEventListener(
  "click",
  (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const el = e.target instanceof Element ? e.target : null;
    if (el?.closest("[data-scroll-top]")) {
      e.preventDefault();
      scrollToTarget(0);
      return;
    }
    const a = el?.closest<HTMLAnchorElement>("a[href*='#']");
    if (!a || !lenis) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const id = decodeURIComponent(url.hash.slice(1));
    const target = id === "top" ? 0 : document.getElementById(id);
    if (target === null) return;
    e.preventDefault();
    scrollToTarget(target);
    history.replaceState(history.state, "", url.hash);
  },
  true,
);

/* ---------- Header ---------- */

let lastY = 0;
function onScroll(): void {
  const y = window.scrollY;
  const header = document.querySelector<HTMLElement>(".site-header");
  if (header) {
    header.classList.toggle("scrolled", y > 8);
    if (!reduced()) {
      if (y > 240 && y > lastY + 4) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y <= 240) header.classList.remove("is-hidden");
    }
  }
  document
    .querySelector<HTMLElement>("[data-scroll-top]")
    ?.classList.toggle("is-visible", y > 600);
  lastY = y;
}
window.addEventListener("scroll", onScroll, { passive: true });

/* ⌘ on Macs, Ctrl elsewhere — the mobile menu's search hint. */
function cmdMod(): void {
  if (/mac/i.test(navigator.userAgent)) return;
  document.querySelectorAll<HTMLElement>("[data-cmd-mod]").forEach((el) => (el.textContent = "Ctrl"));
}

/* ---------- Per-page effects ---------- */

let ctx: gsap.Context | null = null;
let pageBody: HTMLElement | null = null;
let cleanups: (() => void)[] = [];

function splitHeadings(): void {
  gsap.utils.toArray<HTMLElement>(HEADINGS).forEach((el) => {
    if (skipIntro(el) || inFirstView(el)) return;
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 115,
          duration: 1.15,
          ease: EASE,
          stagger: 0.085,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
    });
  });
}

function revealBlocks(): void {
  const blocks = gsap.utils
    .toArray<HTMLElement>(BLOCKS)
    .filter((el) => !skipIntro(el) && !inFirstView(el));
  if (!blocks.length) return;
  gsap.set(blocks, { opacity: 0, y: 44, transition: "none" });
  blocks.forEach((el) => el.setAttribute("data-motion-pending", ""));
  ScrollTrigger.batch(blocks, {
    start: "top 90%",
    once: true,
    onEnter: (batch) => {
      batch.forEach((el) => el.removeAttribute("data-motion-pending"));
      // A jump (anchor, scrollIntoView, find-in-page) hands over every block
      // it skipped in one batch: show the ones already above the viewport
      // at once, and keep the stagger short for the rest — otherwise the
      // blocks actually on screen would wait seconds for their turn.
      const passed = batch.filter((el) => el.getBoundingClientRect().bottom < 0);
      const entering = batch.filter((el) => !passed.includes(el));
      if (passed.length) gsap.set(passed, { overwrite: true, clearProps: "opacity,transform,transition" });
      if (!entering.length) return;
      gsap.to(entering, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: entering.length > 5 ? { amount: 0.45 } : 0.09,
        overwrite: true,
        clearProps: "opacity,transform,transition",
      });
    },
  });
}

function drawStruts(): void {
  gsap.utils.toArray<HTMLElement>(STRUTS).forEach((el) => {
    if (skipIntro(el) || inFirstView(el)) return;
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: EASE,
      clearProps: "transform",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });
  // Kicker struts are ::before pseudo-elements: drive them through --kick.
  gsap.utils.toArray<HTMLElement>(KICKERS).forEach((el) => {
    if (inFirstView(el)) return;
    gsap.fromTo(
      el,
      { "--kick": 0, opacity: 0 },
      {
        "--kick": 1,
        opacity: 1,
        duration: 1,
        ease: EASE,
        clearProps: "opacity",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    );
  });
}

function revealImages(): void {
  gsap.utils.toArray<HTMLElement>(".img-slot.is-filled, .post-cover").forEach((slot) => {
    if (skipIntro(slot) || inFirstView(slot)) return;
    const trigger = { trigger: slot, start: "top 88%", once: true };
    gsap.fromTo(
      slot,
      { clipPath: "inset(12% 5% 12% 5%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: EASE, clearProps: "clipPath", scrollTrigger: trigger },
    );
    const img = slot.querySelector("img");
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.16, transition: "none" },
        { scale: 1, duration: 1.8, ease: "power3.out", clearProps: "transform,transition", scrollTrigger: trigger },
      );
    }
  });
}

function scrubStatements(): void {
  gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((el) => {
    SplitText.create(el, {
      type: "words",
      wordsClass: "scrub-word",
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(
          self.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: 0.6 },
          },
        ),
    });
  });
}

function parallax(): void {
  gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
    const speed = parseFloat(el.dataset.speed ?? "0.15") || 0.15;
    gsap.fromTo(
      el,
      { yPercent: -speed * 50 },
      {
        yPercent: speed * 50,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}

function progressRails(): void {
  gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((root) => {
    const fill = root.querySelector<HTMLElement>("[data-progress-fill]");
    const steps = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-progress-step]"));
    // Without the script the rail renders full (--p defaults to 1).
    fill?.style.setProperty("--p", "0");
    cleanups.push(() => fill?.style.removeProperty("--p"));
    ScrollTrigger.create({
      trigger: root,
      start: "top 72%",
      end: "bottom 60%",
      scrub: true,
      onUpdate: (self) => {
        fill?.style.setProperty("--p", self.progress.toFixed(4));
        steps.forEach((s, i) => s.classList.toggle("is-reached", self.progress >= i / steps.length - 0.001));
      },
    });
  });
}

/** XL marquee: drifts on its own, speeds up with the scroll and follows
 *  its direction. Driven by the GSAP ticker only while on screen. */
function marquees(): void {
  gsap.utils.toArray<HTMLElement>(".ticker--xl").forEach((root) => {
    const track = root.querySelector<HTMLElement>(".ticker-track");
    if (!track) return;
    track.style.animation = "none";
    let x = 0;
    let dir = -1;
    let boost = 0;
    let half = track.scrollWidth / 2;
    let active = false;
    let hovered = false;
    const BASE = 70; // px/s
    const tick = (_time: number, dt: number): void => {
      if (!active || hovered) return;
      x += dir * (BASE + boost) * (dt / 1000);
      if (x <= -half) x += half;
      else if (x > 0) x -= half;
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      boost *= 0.94;
    };
    gsap.ticker.add(tick);
    const st = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => (active = self.isActive),
      onRefresh: () => (half = track.scrollWidth / 2),
      onUpdate: (self) => {
        boost = Math.min(Math.abs(self.getVelocity()) * 0.35, 900);
        dir = self.direction === -1 ? 1 : -1;
      },
    });
    const enter = (): void => void (hovered = true);
    const leave = (): void => void (hovered = false);
    root.addEventListener("mouseenter", enter);
    root.addEventListener("mouseleave", leave);
    cleanups.push(() => {
      gsap.ticker.remove(tick);
      st.kill();
      root.removeEventListener("mouseenter", enter);
      root.removeEventListener("mouseleave", leave);
      track.style.removeProperty("transform");
      track.style.removeProperty("animation");
    });
  });
}

function homeHero(): void {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;

  const video = hero.querySelector<HTMLVideoElement>("[data-hero-video]");
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;
  if (video && !saveData) {
    video.querySelectorAll<HTMLSourceElement>("source[data-src]").forEach((s) => {
      s.src = s.dataset.src ?? "";
    });
    video.load();
    const play = (): void => void video.play().catch(() => undefined);
    play();
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom top",
      onLeave: () => video.pause(),
      onEnterBack: play,
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
  });
  tl.to("[data-hero-content]", { yPercent: -14, opacity: 0.15, ease: "none" }, 0).to(
    "[data-hero-lockup]",
    { yPercent: 22, ease: "none" },
    0,
  );
  if (video) tl.to(video, { scale: 1.08, ease: "none" }, 0);
}

/** Map routes (Coverage): hidden only now, drawn when the map enters. */
function mapRoutes(): void {
  gsap.utils.toArray<HTMLElement>(".map-figure").forEach((fig) => {
    if (inFirstView(fig)) return;
    fig.setAttribute("data-draw", "");
    ScrollTrigger.create({
      trigger: fig,
      start: "top 75%",
      once: true,
      onEnter: () => fig.setAttribute("data-drawn", ""),
    });
    cleanups.push(() => {
      fig.removeAttribute("data-draw");
      fig.removeAttribute("data-drawn");
    });
  });
}

function footerWordmark(): void {
  gsap.utils.toArray<HTMLElement>(".foot-wordmark").forEach((el) => {
    if (inFirstView(el)) return;
    SplitText.create(el, {
      type: "chars",
      mask: "chars",
      charsClass: "foot-char",
      onSplit: (self) =>
        gsap.from(self.chars, {
          yPercent: 105,
          duration: 1.2,
          ease: EASE,
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 98%", once: true },
        }),
    });
  });
}

/* Anything still waiting to be revealed shows up the moment keyboard
   focus lands inside it. */
document.addEventListener("focusin", (e) => {
  const pending = e.target instanceof Element && e.target.closest<HTMLElement>("[data-motion-pending]");
  if (!pending) return;
  pending.removeAttribute("data-motion-pending");
  gsap.to(pending, { opacity: 1, y: 0, duration: 0.3, overwrite: true, clearProps: "opacity,transform,transition" });
});

function initPage(): void {
  if (pageBody === document.body) return; // already initialised for this page
  teardownPage();
  pageBody = document.body;
  cmdMod();
  lastY = window.scrollY;
  onScroll();
  if (reduced()) return;
  document.documentElement.classList.add("has-motion");
  createLenis();
  ctx = gsap.context(() => {
    homeHero();
    splitHeadings();
    revealBlocks();
    drawStruts();
    revealImages();
    scrubStatements();
    parallax();
    progressRails();
    marquees();
    mapRoutes();
    footerWordmark();
  });
  // Fonts change line breaks and heights: measure again once they're in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

function teardownPage(): void {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  ctx?.revert();
  ctx = null;
}

/* Islands hydrating and lazy images change the page height after init;
   keep trigger positions honest. */
let refreshTimer = 0;
let lastHeight = 0;
new ResizeObserver(() => {
  const h = document.documentElement.scrollHeight;
  if (Math.abs(h - lastHeight) < 2) return;
  lastHeight = h;
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
}).observe(document.documentElement);

document.addEventListener("astro:before-swap", () => {
  teardownPage();
  pageBody = null;
  destroyLenis();
});
document.addEventListener("astro:after-swap", () => {
  if (!reduced()) document.documentElement.classList.add("has-motion");
});
// astro:page-load fires after soft navigations — and, on the first visit,
// only at window "load"; initialise as soon as the DOM is parsed instead.
document.addEventListener("astro:page-load", initPage);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage);
} else {
  initPage();
}
