/* ============================================================
   Referral pages — the sticky CTA pill. It appears once the hero
   is gone and steps aside while anything marked [data-sticky-hide]
   is on screen: the form (and after the form has done its job),
   the finale that repeats the same call, the terms' fine print.

   Runs once as a module; set up again on every astro:page-load,
   and its observers go with the page they watched.
   ============================================================ */
let observers: IntersectionObserver[] = [];

function init(): void {
  const sticky = document.querySelector<HTMLElement>("[data-sticky]");
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!sticky || !hero || sticky.dataset.ready) return;
  sticky.dataset.ready = "1";
  let pastHero = false;
  const onScreen = new Set<Element>();
  const apply = () => sticky.classList.toggle("is-visible", pastHero && onScreen.size === 0);
  const heroIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (pastHero = !e.isIntersecting));
      apply();
    },
    { rootMargin: "-80px 0px 0px 0px" },
  );
  heroIo.observe(hero);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
      apply();
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll<HTMLElement>("[data-sticky-hide]").forEach((t) => io.observe(t));
  observers.push(heroIo, io);
}

document.addEventListener("astro:before-swap", () => {
  observers.forEach((o) => o.disconnect());
  observers = [];
});
document.addEventListener("astro:page-load", init);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
