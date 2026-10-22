/* ============================================================
   Campaign landings — who's reading: developer or web designer.
   The root (.lnd[data-profile]) shows the copy written for that
   reader ([data-for="dev"], [data-for="designer"] — styles/
   landing.css), the formula marks the tier that suits them, and
   the lead form's own question follows. Every switch on the page
   (and the form's radios) moves all of them.

   Where the choice comes from, first match wins: ?per=designer
   (or dev) in the link — so an ad aimed at designers lands on the
   designers' page —, the reader's last choice on these pages
   (localStorage), the page's default.
   ============================================================ */
import type { ProfileId } from "../../data/landing/shared";

const KEY = "alpacode_profile";
const isProfile = (v: unknown): v is ProfileId => v === "dev" || v === "designer";

function remembered(): ProfileId | null {
  try {
    const v = localStorage.getItem(KEY);
    return isProfile(v) ? v : null;
  } catch {
    return null;
  }
}
function remember(p: ProfileId): void {
  try {
    localStorage.setItem(KEY, p);
  } catch {
    /* private mode: the page still works, it just forgets */
  }
}

function apply(root: HTMLElement, p: ProfileId): void {
  root.dataset.profile = p;
  root.querySelectorAll<HTMLInputElement>("[data-profile-switch] input, form[data-lead] input[name='profile']").forEach((i) => {
    i.checked = i.value === p;
  });
  root.querySelectorAll<HTMLElement>("[data-formula]").forEach((f) => {
    const rec = p === "dev" ? f.dataset.recommendDev : f.dataset.recommendDesigner;
    f.querySelectorAll<HTMLElement>(".lnd-tier").forEach((t) => t.classList.toggle("is-recommended", t.dataset.tier === rec));
  });
}

function init(): void {
  const root = document.querySelector<HTMLElement>(".lnd[data-profile]");
  if (!root || root.dataset.profileReady) return;
  root.dataset.profileReady = "1";
  const asked = new URLSearchParams(location.search).get("per");
  const start = isProfile(asked) ? asked : (remembered() ?? (isProfile(root.dataset.profile) ? root.dataset.profile : "dev"));
  apply(root, start);
  root.addEventListener("change", (e) => {
    const t = e.target as HTMLInputElement;
    const fromSwitch = t.closest("[data-profile-switch]");
    const fromForm = t.name === "profile" && t.closest("form[data-lead]");
    if (!(fromSwitch || fromForm) || !isProfile(t.value)) return;
    apply(root, t.value);
    remember(t.value);
  });
}

document.addEventListener("astro:page-load", init);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
