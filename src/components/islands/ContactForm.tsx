import { memo, useEffect, useState, type FormEvent } from "react";
import type { Lang } from "../../i18n/types";
import type { ContattiData } from "../../data/contatti";
import FormError from "./FormError";

interface Props {
  lang: Lang;
  labels: ContattiData["labels"];
}

type Status = "idle" | "sending" | "sent" | "error" | "busy";

// memo: lets @astrojs/react's renderer probe short-circuit (see CmdK.tsx).
function ContactForm({ lang, labels }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  // Earlier versions persisted a ?sent=1 flag in the URL, which made shared
  // or reloaded links show a false "message sent" confirmation. Strip it.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has("sent")) {
      url.searchParams.delete("sent");
      window.history.replaceState({}, "", url);
    }
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (res.status === 429) {
        setStatus("busy");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      form.reset();
      document.dispatchEvent(new CustomEvent("alpa:lead_sent", { detail: { form: "contact" } }));
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {/* The honeypot: bots fill it, people never see it. Not rendered at
          all (display: none), so no autofill or password manager writes in
          it: one that did would make a real lead look like a bot's. */}
      <div hidden style={{ display: "none" }} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" data-bwignore />
      </div>

      <div className="field">
        <label htmlFor="cf-name">{labels.name}</label>
        <input id="cf-name" name="name" required placeholder={labels.namePlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-company">{labels.company}</label>
        <input id="cf-company" name="company" placeholder={labels.companyPlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-email">{labels.email}</label>
        <input id="cf-email" name="email" type="email" required placeholder={labels.emailPlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-topic">{labels.topic}</label>
        <select id="cf-topic" name="topic" defaultValue="">
          <option value="" disabled>
            {labels.topicPlaceholder}
          </option>
          {labels.topics.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-budget">{labels.budget}</label>
        <select id="cf-budget" name="budget" defaultValue="">
          <option value="" disabled>
            {labels.budgetPlaceholder}
          </option>
          {labels.budgets.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-message">{labels.msg}</label>
        <textarea id="cf-message" name="message" rows={4} required placeholder={labels.msgPlaceholder} />
      </div>

      <div className="contact-consent">
        <input type="checkbox" required id="consent" name="consent" />
        <label htmlFor="consent">{labels.consent}</label>
      </div>

      <div className="contact-submit">
        <button className="btn btn-blue" type="submit" disabled={status === "sending"}>
          {labels.send} <span className="arrow">→</span>
        </button>
        <span role="status" aria-live="polite">
          {status === "sent" && <span className="contact-confirm">{labels.confirm}</span>}
          {status === "error" && <FormError text={labels.error} />}
          {status === "busy" && <FormError text={labels.busy} />}
        </span>
      </div>
    </form>
  );
}

export default memo(ContactForm);
