/* ============================================================
   AI landing — "Questa pagina è uscita dalla stessa catena".
   The button turns the card over: this page's hero on one side,
   the data it's made from on the other (rendered at build time
   from data/landing/ai.ts, so it can't drift from the page).
   ============================================================ */
function init(): void {
  document.querySelectorAll<HTMLElement>("[data-makeof]").forEach((root) => {
    if (root.dataset.ready) return;
    root.dataset.ready = "1";
    const button = root.querySelector<HTMLButtonElement>("[data-makeof-toggle]");
    const flip = root.querySelector<HTMLElement>("[data-flip]");
    if (!button || !flip) return;
    const page = flip.querySelector<HTMLElement>('[data-face="page"]');
    const data = flip.querySelector<HTMLElement>('[data-face="data"]');
    button.addEventListener("click", () => {
      const on = !flip.classList.contains("is-flipped");
      flip.classList.toggle("is-flipped", on);
      button.setAttribute("aria-pressed", String(on));
      button.textContent = (on ? button.dataset.labelHide : button.dataset.labelShow) ?? "";
      page?.setAttribute("aria-hidden", String(on));
      data?.setAttribute("aria-hidden", String(!on));
    });
  });
}

document.addEventListener("astro:page-load", init);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export {};
