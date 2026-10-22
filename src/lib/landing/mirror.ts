/* ============================================================
   SMM landing — the mirror. Typing a name repaints both previews:
   the link-in-bio page (initials, @handle) and the site (name,
   domain, mailbox). The page renders the placeholder's version at
   build time; this keeps them in step with the input.
   ============================================================ */
const slugify = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);
const initialsOf = (s: string): string =>
  s
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => (w[0] ?? "").toUpperCase())
    .join("");

function wire(root: HTMLElement): void {
  const input = root.querySelector<HTMLInputElement>("[data-mirror-name]");
  const tld = root.dataset.tld ?? ".it";
  const fallback = root.dataset.fallback ?? "Maria Rossi";
  const set = (sel: string, text: string) => root.querySelectorAll(sel).forEach((el) => (el.textContent = text));
  const update = () => {
    const name = input?.value.trim() || fallback;
    const slug = slugify(name) || slugify(fallback);
    set("[data-m-name]", name);
    set("[data-m-name-short]", name.split(/\s+/)[0] ?? name);
    set("[data-m-initials]", initialsOf(name));
    set("[data-m-handle]", `@${slug}`);
    set("[data-m-domain]", `${slug}${tld}`);
  };
  input?.addEventListener("input", update);
}

function init(): void {
  document.querySelectorAll<HTMLElement>("[data-mirror]").forEach((root) => {
    if (root.dataset.ready) return;
    root.dataset.ready = "1";
    wire(root);
  });
}

document.addEventListener("astro:page-load", init);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export {};
