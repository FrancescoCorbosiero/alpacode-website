/* ============================================================
   /faq: the search and the index (components/pages/Faq.astro).
   Typing filters the answers (question and answer, accents and case
   ignored), hides the topics left empty, opens what matches and
   says how many were found; the index follows the topic on screen.
   Without this script the page is complete: every answer is a
   native <details>.
   ============================================================ */
const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

function init(): void {
  const root = document.querySelector<HTMLElement>("[data-faq]");
  if (!root || root.dataset.ready) return;
  root.dataset.ready = "1";
  const input = root.querySelector<HTMLInputElement>("[data-faq-search]");
  const count = root.querySelector<HTMLElement>("[data-faq-count]");
  const empty = root.querySelector<HTMLElement>("[data-faq-empty]");
  const topics = Array.from(root.querySelectorAll<HTMLElement>("[data-faq-topic]"));
  const items = topics.flatMap((tp) =>
    Array.from(tp.querySelectorAll<HTMLDetailsElement>("[data-faq-item]")).map((el) => ({
      el,
      topic: tp.dataset.faqTopic ?? "",
      text: fold(el.textContent ?? ""),
    })),
  );

  const filter = () => {
    const q = fold(input?.value.trim() ?? "");
    const words = q.split(/\s+/).filter(Boolean);
    let shown = 0;
    const perTopic = new Map<string, number>();
    items.forEach(({ el, topic, text }) => {
      const hit = words.every((w) => text.includes(w));
      el.hidden = !hit;
      // A search opens what it found; clearing it closes them again.
      if (words.length) el.open = hit && words.join("").length >= 3;
      else el.open = false;
      if (hit) {
        shown++;
        perTopic.set(topic, (perTopic.get(topic) ?? 0) + 1);
      }
    });
    topics.forEach((tp) => (tp.hidden = !perTopic.get(tp.dataset.faqTopic ?? "")));
    root.querySelectorAll<HTMLElement>("[data-faq-n]").forEach((b) => {
      const n = perTopic.get(b.dataset.faqN ?? "") ?? 0;
      b.textContent = String(n);
      b.closest("li")?.toggleAttribute("data-faq-off", n === 0);
    });
    if (count) count.textContent = (count.dataset.template ?? "{n}").replace("{n}", String(shown));
    if (empty) empty.hidden = shown > 0;
  };
  input?.addEventListener("input", filter);

  // The index follows the topic on screen.
  const links = new Map(
    Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-faq-link]")).map((a) => [a.dataset.faqLink ?? "", a]),
  );
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a, id) => a.toggleAttribute("aria-current", id === (e.target as HTMLElement).dataset.faqTopic));
      });
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );
  topics.forEach((tp) => io.observe(tp));
  document.addEventListener("astro:before-swap", () => io.disconnect(), { once: true });
}

document.addEventListener("astro:page-load", init);
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();

export {};
