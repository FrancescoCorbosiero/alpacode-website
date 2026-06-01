import { memo, useEffect, useState, type FormEvent } from "react";
import type { Lang } from "../../i18n/types";
import type { VariantId } from "../../data/campaigns";

export interface CampaignFormLabels {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  business: string;
  businessPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  chosenOffer: string;
  send: string;
  consent: string;
  confirm: string;
  error: string;
  /** Maps a variant id to its human label, for the read-only "chosen offer" line. */
  variants: Record<VariantId, string>;
}

interface Props {
  lang: Lang;
  /** Campaign slug — tags the lead so you know which page it came from. */
  campaign: string;
  /** Audience name — included in the lead for quick reading. */
  audience: string;
  /** Yearly price for this campaign. */
  price: number;
  labels: CampaignFormLabels;
}

type Status = "idle" | "sending" | "sent" | "error";

// memo: lets @astrojs/react's renderer probe short-circuit (see CmdK.tsx).
function CampaignForm({ lang, campaign, audience, price, labels }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [variant, setVariant] = useState<VariantId>("all-inclusive");

  // The offer toggle elsewhere on the page broadcasts the active variant so the
  // form's "chosen offer" stays in sync. See Offerta.astro.
  useEffect(() => {
    const onPick = (e: Event) => {
      const detail = (e as CustomEvent<VariantId>).detail;
      if (detail === "all-inclusive" || detail === "premium-extras") setVariant(detail);
    };
    window.addEventListener("offer-variant", onPick as EventListener);
    if (new URLSearchParams(window.location.search).get("sent") === "1") setStatus("sent");
    return () => window.removeEventListener("offer-variant", onPick as EventListener);
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
        body: JSON.stringify({
          ...data,
          lang,
          // Lead routing / attribution — surfaced in the notification email.
          campaign,
          audience,
          offer: labels.variants[variant],
          price: `${price} €/anno`,
          topic: `Offerta · ${audience}`,
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

      <div className="cf-chosen" aria-live="polite">
        <span className="cf-chosen-k">— {labels.chosenOffer}</span>
        <span className="cf-chosen-v">{labels.variants[variant]} · {price} €/anno</span>
      </div>

      <div className="field">
        <label htmlFor="cf-name">— {labels.name}</label>
        <input id="cf-name" name="name" required placeholder={labels.namePlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-email">— {labels.email}</label>
        <input id="cf-email" name="email" type="email" required placeholder={labels.emailPlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-phone">— {labels.phone}</label>
        <input id="cf-phone" name="phone" type="tel" placeholder={labels.phonePlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-business">— {labels.business}</label>
        <input id="cf-business" name="company" placeholder={labels.businessPlaceholder} />
      </div>
      <div className="field">
        <label htmlFor="cf-message">— {labels.message}</label>
        <textarea id="cf-message" name="message" rows={3} placeholder={labels.messagePlaceholder} />
      </div>

      <div className="contact-consent">
        <input type="checkbox" required id="cf-consent" name="consent" />
        <label htmlFor="cf-consent">{labels.consent}</label>
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

export default memo(CampaignForm);
