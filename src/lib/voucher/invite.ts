/* ============================================================
   Referral invite behaviour (/voucher/<CODE>, /voucher/nuova-attivita/<CODE>)
   — the friend's request form. The referral code (from the URL,
   validated server-side when the page was rendered) travels with
   the request so the referrer is credited. On the new-business
   invite the kit board and the form's "what did you open" are one
   question asked twice: answering one answers the other.

   Runs once as a module; set up again on every astro:page-load,
   once per page.
   ============================================================ */
import { firstName } from "./referral-code";
import { scrollToTarget } from "../../engine/core/scroll";
import { celebrate } from "../../engine/effects/celebrate";
import { nudge } from "../../engine/effects/nudge";
import { revealPanel } from "../../engine/effects/reveal-panel";
import { checked, errorText, postReferral, setBusy, setStatus, validate, value, values, wireLiveClear, type FormErrors } from "./forms";

interface InviteI18n {
  lang: "it" | "en";
  program: "sito" | "nuova-attivita";
  ref: string;
  sending: string;
  errors: FormErrors;
  successBody: string;
}

/** The kit board and the form: ticking a business in one ticks it in the other. */
function pairBusiness(root: HTMLElement): void {
  root.addEventListener("change", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement) || !t.checked || (t.name !== "kit-type" && t.name !== "business")) return;
    root.querySelectorAll<HTMLInputElement>('input[name="kit-type"], input[name="business"]').forEach((r) => {
      if (r !== t) r.checked = r.value === t.value;
    });
    root.querySelector("[data-kit]")?.setAttribute("data-kit-active", t.value);
  });
}

function init(): void {
  const root = document.querySelector<HTMLElement>(".rf[data-page='invite']");
  if (!root || root.dataset.ready) return; // not this page, or already set up
  root.dataset.ready = "1";
  pairBusiness(root);

  const i18nEl = root.querySelector("[data-invite-i18n]");
  const form = root.querySelector<HTMLFormElement>("form[data-form='friend']");
  if (!i18nEl || !form) return;
  const i18n = JSON.parse(i18nEl.textContent ?? "{}") as InviteI18n;
  const forms = root.querySelector<HTMLElement>("[data-forms]");
  const result = root.querySelector<HTMLElement>("[data-result]");
  const body = root.querySelector<HTMLElement>("[data-result-body]");
  const title = root.querySelector<HTMLElement>("[data-result-title]");

  wireLiveClear(form);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus(form, "");
    const bad = validate(form);
    if (bad) {
      setStatus(form, i18n.errors[bad.key]);
      nudge(form.querySelectorAll(".is-invalid"));
      bad.el.focus();
      return;
    }
    setBusy(form, true, i18n.sending);
    const name = value(form, "name");
    const { status, data } = await postReferral({
      kind: "friend",
      program: i18n.program,
      lang: i18n.lang,
      ref: i18n.ref,
      name,
      email: value(form, "email"),
      phone: value(form, "phone"),
      need: value(form, "need") || undefined,
      needs: values(form, "needs"),
      business: value(form, "business") || undefined,
      message: value(form, "message"),
      consent: checked(form, "consent"),
      website: value(form, "website"),
    });
    setBusy(form, false, i18n.sending);
    if (status !== 200 || !data.ok) {
      setStatus(form, errorText(i18n.errors, status, data.error, "info@alpacode.it"));
      return;
    }
    form.reset();
    if (body) body.textContent = i18n.successBody.replace("{name}", firstName(name));
    if (forms) forms.hidden = true;
    if (result) {
      result.hidden = false;
      revealPanel(result);
      scrollToTarget(result, () => celebrate(title ?? result, { count: 24, spread: 0.85 }));
      title?.focus({ preventScroll: true });
    }
    root.querySelector("[data-sticky]")?.remove();
  });
}

document.addEventListener("astro:page-load", init);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
