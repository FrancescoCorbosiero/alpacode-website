import { useState } from "react";
import type { FaqEntry } from "../../data/faq";

interface Props {
  faqs: FaqEntry[];
}

export default function FaqList({ faqs }: Props) {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={"faq-item " + (isOpen ? "is-open" : "")} key={i}>
            <button
              type="button"
              className="faq-q"
              aria-expanded={isOpen}
              aria-controls={`faq-a-${i}`}
              id={`faq-q-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="num">— {String(i + 1).padStart(2, "0")}</span>
              <span className="q">{f.q}</span>
              <span className="ic" aria-hidden="true">
                {isOpen ? "—" : "+"}
              </span>
            </button>
            <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
