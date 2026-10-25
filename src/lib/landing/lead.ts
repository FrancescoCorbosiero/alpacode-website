/* ============================================================
   Campaign landings — the lead form (components/landing/LeadForm).
   Checks the three things the API needs (a name, a valid email,
   the consent), then posts JSON to /api/contact with the page's
   attribution: campaign, audience, topic, the chosen path as the
   offer, and the other answers as labelled details. A sent form
   gives way to its thank-you panel, with a little burst.

   Runs once as a module; forms are wired on every astro:page-load
   (data-ready keeps it to once per form).
   ============================================================ */
import { celebrate } from "../../engine/effects/celebrate";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function field(form: HTMLFormElement, name: string): HTMLInputElement | HTMLTextAreaElement | null {
  return form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);
}
function value(form: HTMLFormElement, name: string): string {
  return (field(form, name)?.value ?? "").trim();
}
function checked(form: HTMLFormElement, name: string): HTMLInputElement | null {
  return form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
}

function wire(form: HTMLFormElement): void {
  const box = form.parentElement;
  const done = box?.querySelector<HTMLElement>("[data-lead-done]") ?? null;
  const error = form.querySelector<HTMLElement>(".lnd-form-error");
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const label = form.querySelector<HTMLElement>("[data-send-label]");
  const d = form.dataset;

  const flag = (el: Element | null | undefined, bad: boolean) => el?.classList.toggle("is-invalid", bad);
  const say = (html: string | null) => {
    if (!error) return;
    error.hidden = !html;
    error.innerHTML = html ?? "";
  };

  form.addEventListener("input", (e) => {
    const t = e.target as HTMLElement;
    flag(t.closest(".lnd-field, .lnd-consent"), false);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = value(form, "name");
    const email = value(form, "email");
    const consent = (field(form, "consent") as HTMLInputElement | null)?.checked ?? false;
    const bad = {
      name: !name,
      email: !EMAIL.test(email),
      consent: !consent,
    };
    flag(field(form, "name")?.closest(".lnd-field"), bad.name);
    flag(field(form, "email")?.closest(".lnd-field"), bad.email);
    flag(field(form, "consent")?.closest(".lnd-consent"), bad.consent);
    if (bad.name || bad.email || bad.consent) {
      say(d.errorInvalid ?? "");
      (form.querySelector<HTMLElement>(".is-invalid input, .is-invalid textarea") ?? null)?.focus();
      return;
    }

    const details: string[] = [];
    const profile = checked(form, "profile");
    const legend = profile?.closest("fieldset")?.querySelector("legend")?.textContent?.trim();
    if (profile && legend) details.push(`${legend}: ${profile.dataset.label}`);
    const extra = field(form, "extra");
    if (extra && extra.value.trim()) details.push(`${extra.dataset.detail}: ${extra.value.trim()}`);
    details.push(`Pagina: ${location.pathname}`);
    const tier = checked(form, "tier");

    say(null);
    if (button) button.disabled = true;
    if (label) label.textContent = d.labelSending ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: value(form, "company"),
          phone: value(form, "phone"),
          message: value(form, "message"),
          consent: true,
          website: value(form, "website"),
          lang: d.lang,
          campaign: d.campaign,
          audience: d.audience,
          topic: d.topic,
          offer: tier?.value ? tier.dataset.label : undefined,
          price: d.price,
          details,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.hidden = true;
      if (done) {
        done.hidden = false;
        done.focus({ preventScroll: true });
        celebrate(done.querySelector(".lnd-title") ?? done, { count: 26 });
      }
    } catch {
      say(d.errorSend ?? "");
    } finally {
      if (button) button.disabled = false;
      if (label) label.textContent = d.labelSend ?? "";
    }
  });

  done?.querySelector("[data-lead-again]")?.addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    done.hidden = true;
    field(form, "name")?.focus();
  });
}

function init(): void {
  document.querySelectorAll<HTMLFormElement>("form[data-lead]").forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = "1";
    wire(form);
  });
}

document.addEventListener("astro:page-load", init);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
