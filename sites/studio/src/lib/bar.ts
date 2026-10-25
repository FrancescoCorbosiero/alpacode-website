/* The bar that follows: in once the hero ([data-hero]) is gone, out
   while anything marked [data-bar-hide] is on screen (the footer, a
   pinned scene). */
const bar = document.querySelector<HTMLElement>("[data-bar]");
const hero = document.querySelector<HTMLElement>("[data-hero]");
if (bar && hero) {
  let past = false;
  const hiding = new Set<Element>();
  const apply = () => bar.classList.toggle("is-visible", past && hiding.size === 0);
  new IntersectionObserver(
    ([entry]) => {
      past = !entry.isIntersecting;
      apply();
    },
    { rootMargin: "-60px 0px 0px 0px" },
  ).observe(hero);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? hiding.add(e.target) : hiding.delete(e.target)));
    apply();
  });
  document.querySelectorAll("[data-bar-hide], .fx-foot").forEach((el) => io.observe(el));
}

export {};
