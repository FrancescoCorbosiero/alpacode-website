import { useEffect, useState, type FormEvent } from "react";
import type { Lang } from "../../i18n/types";
import type { ContattiData } from "../../data/contatti";

interface Props {
  lang: Lang;
  labels: ContattiData["labels"];
}

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ lang, labels }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("sent") === "1") {
      setStatus("sent");
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
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      form.reset();
      const url = new URL(window.location.href);
      url.searchParams.set("sent", "1");
      window.history.replaceState({}, "", url);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      {/* Honeypot — must stay empty for humans. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="visually-hidden"
        aria-hidden="true"
      />

      <div className="field">
        <label htmlFor="cf-name">— {labels.name}</label>
        <input id="cf-name" name="name" required placeholder={labels.namePlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-company">— {labels.company}</label>
        <input id="cf-company" name="company" placeholder={labels.companyPlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-email">— {labels.email}</label>
        <input id="cf-email" name="email" type="email" required placeholder={labels.emailPlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-topic">— {labels.topic}</label>
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
        <label htmlFor="cf-budget">— {labels.budget}</label>
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
        <label htmlFor="cf-message">— {labels.msg}</label>
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
        {status === "sent" && <span className="contact-confirm">● {labels.confirm}</span>}
        {status === "error" && <span className="contact-error">● {labels.error}</span>}
      </div>
    </form>
  );
}
