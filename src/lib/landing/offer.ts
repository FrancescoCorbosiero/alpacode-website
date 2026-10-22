/* ============================================================
   Offer landings (/offerta/*) — the proposal's tabs and the round.
   - The tabs swap the proposal sheet and its blurb, and tick the
     same version in the lead form, so the request says which one.
   - The round's line is rendered at build time; once its deadline
     has passed, it says so here, without waiting for a rebuild.
   ============================================================ */
function tabs(root: HTMLElement): void {
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>(".lnd-tab"));
  const pick = (id: string) => {
    buttons.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.variant === id)));
    root.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => (p.hidden = p.dataset.panel !== id));
    root.querySelectorAll<HTMLElement>("[data-blurb]").forEach((p) => (p.hidden = p.dataset.blurb !== id));
    const radio = document.querySelector<HTMLInputElement>(`form[data-lead] input[name="tier"][value="${id}"]`);
    if (radio) radio.checked = true;
  };
  buttons.forEach((b) => b.addEventListener("click", () => pick(b.dataset.variant ?? "")));
  // Arrow keys move along the tabs (WAI-ARIA tabs pattern).
  root.querySelector(".lnd-tabs")?.addEventListener("keydown", (e) => {
    const ev = e as KeyboardEvent;
    if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
    const i = buttons.findIndex((b) => b.getAttribute("aria-selected") === "true");
    const next = buttons[(i + (ev.key === "ArrowRight" ? 1 : buttons.length - 1)) % buttons.length];
    next?.focus();
    next?.click();
  });
}

function init(): void {
  document.querySelectorAll<HTMLElement>("[data-offer]").forEach((root) => {
    if (root.dataset.ready) return;
    root.dataset.ready = "1";
    tabs(root);
  });
  document.querySelectorAll<HTMLElement>("[data-round]").forEach((el) => {
    const end = Date.parse(el.dataset.deadline ?? "");
    if (end && Date.now() > end && el.dataset.closed) el.textContent = el.dataset.closed;
  });
}

document.addEventListener("astro:page-load", init);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export {};
