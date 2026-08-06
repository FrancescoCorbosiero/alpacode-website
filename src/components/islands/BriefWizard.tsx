import { memo, useState, type FormEvent } from "react";
import type { Lang } from "../../i18n/types";
import type { WizardData } from "../../data/wizard";

interface Props {
  lang: Lang;
  labels: WizardData;
  /** Localized booking-page href for the success CTA. */
  prenotaHref: string;
}

type Status = "idle" | "sending" | "sent" | "error";

/* Three tap-steps + one contact step. Answers travel to /api/contact as a
   structured message — no automatic pricing, by design (see data/wizard.ts). */
// memo: lets @astrojs/react's renderer probe short-circuit (see CmdK.tsx).
function BriefWizard({ lang, labels, prenotaHref }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const total = labels.steps.length + 1; // + contact step
  const atContact = step === labels.steps.length;

  const pick = (option: string) => {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
    setStep(step + 1);
  };

  const back = () => setStep(Math.max(0, step - 1));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const message = labels.steps
      .map((s, i) => `${s.q} ${answers[i] ?? "—"}`)
      .join("\n");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          consent: data.consent,
          website: data.website,
          message,
          lang,
          campaign: "wizard-60s",
          audience: answers[0] ?? "",
          topic: lang === "it" ? "Progetto in 60 secondi" : "Project in 60 seconds",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div className="bw bw--done" role="status" aria-live="polite">
        <span className="bw-done-dot">●</span>
        <h3 className="bw-done-title">{labels.successTitle}</h3>
        <p className="bw-done-body">{labels.successBody}</p>
        <div className="bw-done-ctas">
          <a className="btn btn-blue" href={prenotaHref}>
            {labels.successCta} <span className="arrow">→</span>
          </a>
          <button type="button" className="bw-back" onClick={restart}>
            {labels.restart}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bw">
      <div className="bw-head">
        <span className="bw-step">
          {labels.stepLabel} {String(step + 1).padStart(2, "0")} {labels.ofLabel}{" "}
          {String(total).padStart(2, "0")}
        </span>
        <div className="bw-progress" aria-hidden="true">
          <div className="bw-progress-fill" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
      </div>

      {!atContact ? (
        <div className="bw-body" key={step}>
          <h3 className="bw-q" id={`bw-q-${step}`}>{labels.steps[step]!.q}</h3>
          <div className="bw-options" role="group" aria-labelledby={`bw-q-${step}`}>
            {labels.steps[step]!.options.map((o) => (
              <button
                key={o}
                type="button"
                className={"bw-option" + (answers[step] === o ? " is-on" : "")}
                onClick={() => pick(o)}
              >
                {o} <span className="arrow">→</span>
              </button>
            ))}
          </div>
          {step > 0 && (
            <button type="button" className="bw-back" onClick={back}>
              {labels.back}
            </button>
          )}
        </div>
      ) : (
        <form className="bw-body bw-contact" onSubmit={onSubmit}>
          <h3 className="bw-q">{labels.contactQ}</h3>
          <div className="bw-recap" aria-hidden="true">
            {answers.map((a, i) => (
              <span key={i} className="bw-chip">{a}</span>
            ))}
          </div>

          {/* Honeypot — must stay empty for humans. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="visually-hidden"
            aria-hidden="true"
          />

          <div className="bw-fields">
            <div className="field">
              <label htmlFor="bw-name">— {labels.name}</label>
              <input id="bw-name" name="name" required placeholder={labels.namePlaceholder} />
            </div>
            <div className="field">
              <label htmlFor="bw-email">— {labels.email}</label>
              <input
                id="bw-email"
                name="email"
                type="email"
                required
                placeholder={labels.emailPlaceholder}
              />
            </div>
          </div>

          <div className="contact-consent">
            <input type="checkbox" required id="bw-consent" name="consent" />
            <label htmlFor="bw-consent">{labels.consent}</label>
          </div>

          <div className="contact-submit">
            <button className="btn btn-blue" type="submit" disabled={status === "sending"}>
              {status === "sending" ? labels.sending : labels.send} <span className="arrow">→</span>
            </button>
            <button type="button" className="bw-back" onClick={back}>
              {labels.back}
            </button>
            <span role="status" aria-live="polite">
              {status === "error" && <span className="contact-error">● {labels.error}</span>}
            </span>
          </div>
          <p className="bw-note">{labels.note}</p>
        </form>
      )}
    </div>
  );
}

export default memo(BriefWizard);
