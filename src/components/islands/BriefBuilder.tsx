import { memo, useEffect, useRef, useState, type FormEvent } from "react";
import type { Lang } from "../../i18n/types";
import type { WizardData } from "../../data/wizard";
import FormError from "./FormError";

interface Props {
  lang: Lang;
  labels: WizardData;
  /** Which first answer a ?servizio=<slug> link presets (data/wizard.ts). */
  presets: Record<string, string>;
  /** The booking: the Cal.com trigger's attributes, or the booking page. */
  cal: { link: string; namespace: string; config: string } | null;
  prenotaHref: string;
  waHref: string;
}

type Status = "idle" | "sending" | "sent" | "error" | "busy";
interface Fields {
  name: string;
  email: string;
  phone: string;
  message: string;
}
interface Draft {
  step: number;
  answers: string[];
  fields: Fields;
}

const KEY = "alpacode_brief";
const EMPTY: Fields = { name: "", email: "", phone: "", message: "" };

/** The provider-agnostic tracking the Cal embed uses too (CalEmbed.astro). */
function track(name: string, detail: Record<string, string> = {}): void {
  try {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: name, ...detail });
  } catch {
    /* no analytics: nothing to do */
  }
  document.dispatchEvent(new CustomEvent(`alpa:${name}`, { detail }));
}

/** The studio's hours, in Rome: Monday to Friday, 9 to 18. */
function studioNow(lang: Lang): { open: boolean; time: string } {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", { weekday: "short", hour: "numeric", hour12: false, timeZone: "Europe/Rome" }).formatToParts(now);
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "";
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const time = new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome" }).format(now);
  return { open: !["Sat", "Sun"].includes(wd) && h >= 9 && h < 18, time };
}

/* Three tap-steps + one contact step; beside them the brief, written as
   the answers come. Answers travel to /api/contact as labelled details
   — no automatic pricing, by design (see data/wizard.ts). The draft
   stays on this device (localStorage) until it's sent. */
// memo: lets @astrojs/react's renderer probe short-circuit (see CmdK.tsx).
function BriefBuilder({ lang, labels, presets, cal, prenotaHref, waHref }: Props) {
  const steps = labels.steps;
  const s = labels.sheet;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [fresh, setFresh] = useState(-1);
  const [clock, setClock] = useState<{ open: boolean; time: string } | null>(null);
  // The date is the visitor's, not the build's: set once mounted.
  const [today, setToday] = useState("");
  const [saved, setSaved] = useState(false);
  const started = useRef(false);
  const total = steps.length + 1; // + the contact step
  const atContact = step >= steps.length;
  const labelOf = (i: number, id?: string) => steps[i]?.options.find((o) => o.id === id)?.label;

  // On arrival: the draft left on this device, or the link's preset.
  useEffect(() => {
    let draft: Draft | null = null;
    try {
      const raw = localStorage.getItem(KEY);
      draft = raw ? (JSON.parse(raw) as Draft) : null;
    } catch {
      draft = null;
    }
    const q = new URLSearchParams(window.location.search);
    const preset = presets[q.get("servizio") ?? ""] ?? q.get("per") ?? "";
    const valid = !!preset && !!steps[0]?.options.some((o) => o.id === preset);
    // A draft picks up where it was (the link's preset as its first
    // answer); without one, the preset answers the first question.
    if (draft && Array.isArray(draft.answers) && draft.answers.length) {
      setAnswers(valid ? [preset, ...draft.answers.slice(1)] : draft.answers);
      setFields({ ...EMPTY, ...draft.fields });
      setStep(Math.min(Math.max(Number(draft.step) || 0, valid ? 1 : 0), steps.length));
      setSaved(true);
      return;
    }
    if (valid) {
      setAnswers([preset]);
      setStep(1);
    }
  }, []);

  // The studio's clock, on the sheet.
  useEffect(() => {
    setToday(new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date()));
    const tick = () => setClock(studioNow(lang));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [lang]);

  // Keep the draft (not the consent) until it's sent.
  useEffect(() => {
    if (status === "sent" || (!answers.length && !fields.name && !fields.email)) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ step, answers, fields } satisfies Draft));
    } catch {
      /* private window, storage off: the brief just isn't kept */
    }
  }, [step, answers, fields, status]);

  const pick = (id: string) => {
    const next = [...answers];
    next[step] = id;
    setAnswers(next);
    setFresh(step);
    if (!started.current) {
      started.current = true;
      track("brief_start", { first: id });
    }
    setStep(step + 1);
  };

  const back = () => setStep(Math.max(0, step - 1));
  const set = (k: keyof Fields) => (e: { currentTarget: { value: string } }) => {
    const v = e.currentTarget.value;
    setFields((f) => ({ ...f, [k]: v }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const details = steps.map((st, i) => `${st.line}: ${labelOf(i, answers[i]) ?? "—"}`);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          message: fields.message,
          consent: data.consent,
          website: data.website,
          details,
          lang,
          campaign: "wizard-60s",
          audience: labelOf(0, answers[0]) ?? "",
          topic: lang === "it" ? "Progetto in 60 secondi" : "Project in 60 seconds",
        }),
      });
      if (res.status === 429) {
        setStatus("busy");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      track("lead_sent", { form: "brief", need: answers[0] ?? "" });
      try {
        localStorage.removeItem(KEY);
      } catch {
        /* nothing kept, nothing to clear */
      }
    } catch {
      setStatus("error");
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setFields(EMPTY);
    setStatus("idle");
    setSaved(false);
    started.current = false;
  };

  const left = steps.filter((_, i) => !answers[i]).length;
  const sent = status === "sent";

  return (
    <div className={"brief" + (sent ? " is-sent" : "")}>
      {/* ---------- The builder ---------- */}
      <div className="brief-builder">
        {sent ? (
          <div className="brief-done" role="status" aria-live="polite">
            <span className="brief-done-mark" aria-hidden="true" />
            <h3 className="brief-q">{labels.successTitle}</h3>
            <p className="brief-done-body">{labels.successBody}</p>
            <div className="brief-done-ctas">
              {cal ? (
                <button
                  type="button"
                  className="btn btn-blue"
                  data-cal-link={cal.link}
                  data-cal-namespace={cal.namespace}
                  data-cal-config={cal.config}
                  data-journey="brief-sent"
                >
                  {labels.successCta} <span className="arrow">→</span>
                </button>
              ) : (
                <a className="btn btn-blue" href={prenotaHref} data-journey="brief-sent">
                  {labels.successCta} <span className="arrow">→</span>
                </a>
              )}
              <a className="brief-link" href={waHref} target="_blank" rel="noopener" data-journey="brief-sent-whatsapp">
                {labels.successAlt} ↗
              </a>
            </div>
            <button type="button" className="brief-back" onClick={restart}>
              {labels.restart}
            </button>
          </div>
        ) : (
          <>
            <div className="brief-head">
              <span className="brief-step">
                {labels.stepLabel} {String(Math.min(step, total - 1) + 1).padStart(2, "0")} {labels.ofLabel} {String(total).padStart(2, "0")}
              </span>
              <span className="brief-progress" aria-hidden="true">
                {Array.from({ length: total }, (_, i) => (
                  <i key={i} className={i <= step ? "is-on" : undefined} />
                ))}
              </span>
            </div>

            {!atContact ? (
              <div className="brief-body" key={step}>
                <h3 className="brief-q" id={`brief-q-${step}`}>
                  {steps[step]!.q}
                </h3>
                <div className={"brief-options" + (steps[step]!.options.length > 4 ? " brief-options--many" : "")} role="group" aria-labelledby={`brief-q-${step}`}>
                  {steps[step]!.options.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={"brief-option" + (answers[step] === o.id ? " is-on" : "")}
                      aria-pressed={answers[step] === o.id}
                      onClick={() => pick(o.id)}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button type="button" className="brief-back" onClick={back}>
                    {labels.back}
                  </button>
                )}
              </div>
            ) : (
              <form className="brief-body brief-contact" onSubmit={onSubmit}>
                <h3 className="brief-q">{labels.contactQ}</h3>
                {/* The honeypot: bots fill it, people never see it. Not
                    rendered at all, so no autofill writes in it. */}
                <div hidden style={{ display: "none" }} aria-hidden="true">
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" data-bwignore />
                </div>
                <div className="brief-fields">
                  <div className="field">
                    <label htmlFor="brief-name">{labels.name}</label>
                    <input id="brief-name" name="name" required autoComplete="name" placeholder={labels.namePlaceholder} value={fields.name} onChange={set("name")} />
                  </div>
                  <div className="field">
                    <label htmlFor="brief-email">{labels.email}</label>
                    <input id="brief-email" name="email" type="email" required autoComplete="email" placeholder={labels.emailPlaceholder} value={fields.email} onChange={set("email")} />
                  </div>
                  <div className="field">
                    <label htmlFor="brief-phone">{labels.phone}</label>
                    <input id="brief-phone" name="phone" type="tel" autoComplete="tel" placeholder={labels.phonePlaceholder} value={fields.phone} onChange={set("phone")} />
                  </div>
                  <div className="field field--wide">
                    <label htmlFor="brief-message">{labels.message}</label>
                    <textarea id="brief-message" name="message" rows={3} placeholder={labels.messagePlaceholder} value={fields.message} onChange={set("message")} />
                  </div>
                </div>
                <div className="contact-consent">
                  <input type="checkbox" required id="brief-consent" name="consent" />
                  <label htmlFor="brief-consent">{labels.consent}</label>
                </div>
                <div className="contact-submit">
                  <button className="btn btn-blue btn-lg" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? labels.sending : labels.send} <span className="arrow">→</span>
                  </button>
                  <button type="button" className="brief-back" onClick={back}>
                    {labels.back}
                  </button>
                </div>
                <p role="status" aria-live="polite" className="brief-status">
                  {status === "error" && <FormError text={labels.error} />}
                  {status === "busy" && <FormError text={labels.busy} />}
                </p>
                <p className="brief-note">{labels.note}</p>
              </form>
            )}
          </>
        )}
      </div>

      {/* ---------- The sheet: the brief, as it's written ---------- */}
      <div className="brief-sheet" aria-label={s.title}>
        <div className="brief-sheet-top">
          <b className="brief-sheet-title">{s.title}</b>
          <span className="brief-sheet-date">{today}</span>
        </div>
        <dl className="brief-lines">
          <div className="brief-line brief-line--to">
            <dt>{s.to}</dt>
            <dd>
              {s.toName}
              {clock && (
                <span className={"brief-clock" + (clock.open ? " is-open" : "")}>
                  <i aria-hidden="true" /> {clock.time} CET
                </span>
              )}
            </dd>
          </div>
          {steps.map((st, i) => (
            <div key={st.line} className={"brief-line" + (answers[i] ? " is-filled" : "") + (fresh === i ? " is-fresh" : "")}>
              <dt>{st.line}</dt>
              <dd key={answers[i] ?? "empty"}>{labelOf(i, answers[i]) ?? <span className="brief-empty">{s.empty}</span>}</dd>
            </div>
          ))}
          <div className={"brief-line" + (fields.name ? " is-filled" : "")}>
            <dt>{s.from}</dt>
            <dd>{fields.name || <span className="brief-empty">{s.empty}</span>}</dd>
          </div>
          <div className={"brief-line" + (fields.email ? " is-filled" : "")}>
            <dt>{s.email}</dt>
            <dd>{fields.email || <span className="brief-empty">{s.empty}</span>}</dd>
          </div>
          {fields.phone && (
            <div className="brief-line is-filled">
              <dt>{s.phone}</dt>
              <dd>{fields.phone}</dd>
            </div>
          )}
          {fields.message && (
            <div className="brief-line brief-line--note is-filled">
              <dt>{s.message}</dt>
              <dd>{fields.message}</dd>
            </div>
          )}
        </dl>
        <p className="brief-sheet-foot" aria-live="polite">
          {sent ? "" : left > 0 ? s.left.replace("{n}", String(left)) : s.ready}
          {saved && !sent && <span className="brief-saved"> · {s.draft}</span>}
        </p>
        <span className="brief-stamp" aria-hidden={!sent}>
          {s.stamp}
        </span>
      </div>
    </div>
  );
}

export default memo(BriefBuilder);
