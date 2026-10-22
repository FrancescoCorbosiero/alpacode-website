/* ============================================================
   Hosting landing — "Fai i conti". Four sliders (sites, what you
   pay per site today, what you charge, what your server costs),
   three results, recomputed as they move:
     today  (charge − pay) × sites × 12
     own    (charge × sites − server) × 12
     diff   own − today
   The page renders the example's results at build time, so the
   numbers are there before (and without) this script.
   ============================================================ */
const reduced = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function wire(root: HTMLElement): void {
  const lang = root.dataset.lang === "en" ? "en-IE" : "it-IT";
  const money = new Intl.NumberFormat(lang, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const input = (k: string) => root.querySelector<HTMLInputElement>(`[data-calc-input="${k}"]`);
  const read = (k: string) => Number(input(k)?.value ?? 0);
  const shown: Record<string, number> = {};
  const raf: Record<string, number> = {};

  const paint = (k: string, v: number) => {
    const el = root.querySelector<HTMLElement>(`[data-result="${k}"]`);
    if (el) el.textContent = money.format(Math.round(v));
  };
  const tween = (k: string, to: number) => {
    const from = shown[k] ?? to;
    shown[k] = to;
    cancelAnimationFrame(raf[k] ?? 0);
    if (reduced() || from === to) return paint(k, to);
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 420);
      paint(k, from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf[k] = requestAnimationFrame(step);
    };
    raf[k] = requestAnimationFrame(step);
  };

  const render = () => {
    root.querySelectorAll<HTMLInputElement>("[data-calc-input]").forEach((el) => {
      const min = Number(el.min);
      const max = Number(el.max);
      el.style.setProperty("--fill", `${((Number(el.value) - min) / (max - min)) * 100}%`);
      const out = root.querySelector<HTMLElement>(`[data-out="${el.dataset.calcInput}"]`);
      if (out) out.textContent = `${el.value} ${el.dataset.unit ?? ""}`.trim();
    });
    const sites = read("sites");
    const pay = read("pay");
    const charge = read("charge");
    const server = read("server");
    const today = (charge - pay) * sites * 12;
    const own = (charge * sites - server) * 12;
    const diff = own - today;
    tween("today", today);
    tween("own", own);
    tween("diff", diff);
    const top = Math.max(Math.abs(today), Math.abs(own), 1);
    root.querySelector<HTMLElement>('[data-bar="today"]')?.style.setProperty("--w", String(Math.max(0, today) / top));
    root.querySelector<HTMLElement>('[data-bar="own"]')?.style.setProperty("--w", String(Math.max(0, own) / top));
    root.classList.toggle("is-negative", diff < 0);
  };

  root.addEventListener("input", render);
  render();
}

function init(): void {
  document.querySelectorAll<HTMLElement>("[data-calc]").forEach((root) => {
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
