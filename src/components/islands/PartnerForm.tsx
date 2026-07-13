import { memo, useEffect, useState, type FormEvent } from "react";
import type { Lang } from "../../i18n/types";

export interface PartnerFormLabels {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  profession: string;
  /** Options for the profession select; the first is the default. */
  professions: string[];
  zone: string;
  zonePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  consent: string;
  confirm: string;
  error: string;
}

interface Props {
  lang: Lang;
  labels: PartnerFormLabels;
}

type Status = "idle" | "sending" | "sent" | "error";

// memo: lets @astrojs/react's renderer probe short-circuit (see CmdK.tsx).
function PartnerForm({ lang, labels }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("sent") === "1") setStatus("sent");
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    // The contact API has no zone field — fold it into the message body.
    const zone = (data.zone ?? "").trim();
    const message = [zone ? `${labels.zone}: ${zone}` : null, (data.message ?? "").trim() || null]
      .filter(Boolean)
      .join("\n\n");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          website: data.website,
          message,
          lang,
          // Lead routing / attribution — surfaced in the notification email.
          campaign: "partner-landing",
          audience: data.profession,
          topic: "Partnership",
        }),
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
    <form className="contact-form campaign-form" onSubmit={onSubmit} noValidate>
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
        <label htmlFor="pf-name">— {labels.name}</label>
        <input id="pf-name" name="name" required placeholder={labels.namePlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="pf-email">— {labels.email}</label>
        <input id="pf-email" name="email" type="email" required placeholder={labels.emailPlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="pf-profession">— {labels.profession}</label>
        <select id="pf-profession" name="profession" required defaultValue={labels.professions[0]}>
          {labels.professions.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="pf-zone">— {labels.zone}</label>
        <input id="pf-zone" name="zone" placeholder={labels.zonePlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="pf-phone">— {labels.phone}</label>
        <input id="pf-phone" name="phone" type="tel" placeholder={labels.phonePlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="pf-message">— {labels.message}</label>
        <textarea id="pf-message" name="message" rows={3} placeholder={labels.messagePlaceholder} />
      </div>

      <div className="contact-consent">
        <input type="checkbox" required id="pf-consent" name="consent" />
        <label htmlFor="pf-consent">{labels.consent}</label>
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

export default memo(PartnerForm);
