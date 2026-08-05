/* ============================================================
   Alpacode v2 — Motion
   Pairs with [data-reveal] in motion.css. No dependencies.
   Honors prefers-reduced-motion.
   ============================================================ */

interface Rule {
  sel: string;
  kind: "up" | "rise" | "bar" | "mask" | "fade";
  delay?: number;
  stagger?: number;
}

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const rules: Rule[] = [
  { sel: ".section-head .sec-num", kind: "up", delay: 0 },
  { sel: ".section-head h2", kind: "rise", delay: 100 },
  { sel: ".section-head .lede", kind: "up", delay: 250 },
  { sel: ".pitch .sec-num", kind: "up", delay: 0 },
  { sel: ".pitch-kicker", kind: "up", delay: 80 },
  { sel: ".pitch-lead", kind: "rise", delay: 120 },
  { sel: ".pitch-turn", kind: "up", delay: 150 },
  { sel: ".pitch-foot", kind: "up", delay: 250 },
  { sel: ".pitch-cta", kind: "up", delay: 320 },
  { sel: ".verbs .verb", kind: "up", delay: 0, stagger: 110 },
  { sel: ".value-group", kind: "up", delay: 0, stagger: 120 },
  { sel: ".scale", kind: "rise", delay: 0 },
  { sel: ".scale-foot", kind: "up", delay: 150 },
  { sel: ".cases", kind: "rise", delay: 0 },
  { sel: ".band-cta", kind: "up", delay: 120 },
  { sel: ".product", kind: "up", delay: 0, stagger: 80 },
  { sel: ".products-teaser-foot", kind: "up", delay: 200 },
  { sel: ".step", kind: "up", delay: 0, stagger: 90 },
  { sel: ".svc-group-head", kind: "up", delay: 0 },
  { sel: ".svc-cross", kind: "up", delay: 0 },
  { sel: ".pillars .pillar", kind: "up", delay: 0, stagger: 100 },
  { sel: ".map-figure", kind: "fade", delay: 0 },
  { sel: ".coverage-info", kind: "up", delay: 150 },
  { sel: ".cta-final .display", kind: "rise", delay: 0 },
  { sel: ".cta-final .sub", kind: "up", delay: 200 },
  { sel: ".cta-grid", kind: "up", delay: 300 },
  { sel: ".svc-row", kind: "up", delay: 0, stagger: 80 },
  { sel: ".work", kind: "up", delay: 0, stagger: 80 },
  { sel: ".course", kind: "up", delay: 0, stagger: 90 },
  { sel: ".blog-row", kind: "up", delay: 0, stagger: 50 },
  { sel: ".faq-item", kind: "up", delay: 0, stagger: 50 },
  { sel: ".lcn-benefit", kind: "up", delay: 0, stagger: 90 },
  { sel: ".lcn-quote-title", kind: "rise", delay: 0 },
  { sel: ".lcn-quote-point", kind: "up", delay: 150, stagger: 110 },
  { sel: ".lcn-pos", kind: "up", delay: 0, stagger: 70 },
  { sel: ".lcn-positions-foot", kind: "up", delay: 200 },
  { sel: ".lcn-path", kind: "up", delay: 0, stagger: 120 },
  { sel: ".lcn-rule", kind: "rise", delay: 0 },
  { sel: ".lcn-cross", kind: "up", delay: 0 },
  { sel: ".foot-brand", kind: "up", delay: 0 },
  { sel: ".foot-col", kind: "up", delay: 0, stagger: 90 },
  { sel: ".foot-brand .big-bar", kind: "bar", delay: 200 },
  { sel: ".strut-short", kind: "bar", delay: 0 },
];

let io: IntersectionObserver | null = null;

// The observer would otherwise keep references to every below-the-fold
// element of every page visited in the session. Drop it before each
// view-transition swap; the next run() recreates it for the new page.
document.addEventListener("astro:before-swap", () => {
  io?.disconnect();
  io = null;
});

function tagAndObserve(): void {
  if (reduced) return;

  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io!.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
  }

  rules.forEach((r) => {
    document.querySelectorAll<HTMLElement>(r.sel).forEach((el, i) => {
      if (el.hasAttribute("data-reveal")) return;
      el.setAttribute("data-reveal", r.kind);
      const d = (r.delay || 0) + (r.stagger || 0) * i;
      if (d) el.style.setProperty("--d", `${d}ms`);
      io!.observe(el);
    });
  });
}

function loadHero(initial: boolean): void {
  const hero = document.querySelector<HTMLElement>(".hero");
  if (hero) {
    hero.setAttribute("data-hero", "");
    // Play the on-load wipe only on first paint; on view-transition navs the
    // transition itself carries the motion, so reveal immediately.
    if (reduced || !initial) hero.setAttribute("data-loaded", "");
    else window.setTimeout(() => hero.setAttribute("data-loaded", ""), 40);
  }
  const ph = document.querySelector<HTMLElement>(".page-hero");
  if (ph) {
    if (reduced || !initial) ph.setAttribute("data-loaded", "");
    else window.setTimeout(() => ph.setAttribute("data-loaded", ""), 40);
  }
}

function updateHeader(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (header) header.classList.toggle("scrolled", window.scrollY > 6);
  const top = document.querySelector<HTMLElement>("[data-scroll-top]");
  if (top) top.classList.toggle("is-visible", window.scrollY > 600);
}

function cmdMod(): void {
  if (/mac/i.test(navigator.userAgent)) return;
  document
    .querySelectorAll<HTMLElement>("[data-cmd-mod]")
    .forEach((el) => (el.textContent = "Ctrl"));
}

let scrollBound = false;
let firstRun = true;

// Runs on first paint and after every View Transitions navigation. Idempotent.
function run(): void {
  if (!scrollBound) {
    scrollBound = true;
    window.addEventListener("scroll", updateHeader, { passive: true });
    document.addEventListener("click", (e) => {
      const el = (e.target as Element | null)?.closest?.("[data-scroll-top]");
      if (el) window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
  }
  cmdMod();
  updateHeader();
  loadHero(firstRun);
  tagAndObserve();
  firstRun = false;
}

document.addEventListener("astro:page-load", run);
// Fallback if the router isn't active or the event already fired (run is safe
// to call more than once).
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}
