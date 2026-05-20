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
  { sel: ".verbs .verb", kind: "up", delay: 0, stagger: 110 },
  { sel: ".cases", kind: "rise", delay: 0 },
  { sel: ".pillars .pillar", kind: "up", delay: 0, stagger: 100 },
  { sel: ".cta-final .display", kind: "rise", delay: 0 },
  { sel: ".cta-final .sub", kind: "up", delay: 200 },
  { sel: ".cta-grid", kind: "up", delay: 300 },
  { sel: ".svc-row", kind: "up", delay: 0, stagger: 80 },
  { sel: ".work", kind: "up", delay: 0, stagger: 80 },
  { sel: ".course", kind: "up", delay: 0, stagger: 90 },
  { sel: ".blog-row", kind: "up", delay: 0, stagger: 50 },
  { sel: ".faq-item", kind: "up", delay: 0, stagger: 50 },
  { sel: ".foot-brand", kind: "up", delay: 0 },
  { sel: ".foot-col", kind: "up", delay: 0, stagger: 90 },
  { sel: ".foot-brand .big-bar", kind: "bar", delay: 200 },
  { sel: ".strut-short", kind: "bar", delay: 0 },
];

let io: IntersectionObserver | null = null;

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

function loadHero(): void {
  const hero = document.querySelector<HTMLElement>(".hero");
  if (hero) {
    hero.setAttribute("data-hero", "");
    if (reduced) {
      hero.setAttribute("data-loaded", "");
    } else {
      window.setTimeout(() => hero.setAttribute("data-loaded", ""), 40);
    }
  }
  const ph = document.querySelector<HTMLElement>(".page-hero");
  if (ph) {
    if (reduced) ph.setAttribute("data-loaded", "");
    else window.setTimeout(() => ph.setAttribute("data-loaded", ""), 40);
  }
}

function headerScroll(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 6);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function cmdMod(): void {
  if (/mac/i.test(navigator.userAgent)) return;
  document
    .querySelectorAll<HTMLElement>("[data-cmd-mod]")
    .forEach((el) => (el.textContent = "Ctrl"));
}

function boot(): void {
  loadHero();
  headerScroll();
  cmdMod();
  tagAndObserve();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
