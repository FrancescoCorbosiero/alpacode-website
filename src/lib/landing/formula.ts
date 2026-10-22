/* ============================================================
   Campaign landings — the formula's buttons. "Scelgo il corso"
   is a link to the lead form; on the way it ticks that path in
   the form, so the request says which one was picked.
   ============================================================ */
function init(): void {
  document.querySelectorAll<HTMLAnchorElement>("[data-pick-tier]").forEach((a) => {
    if (a.dataset.ready) return;
    a.dataset.ready = "1";
    a.addEventListener("click", () => {
      const radio = document.querySelector<HTMLInputElement>(
        `form[data-lead] input[name="tier"][value="${a.dataset.pickTier}"]`,
      );
      if (radio) radio.checked = true;
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
