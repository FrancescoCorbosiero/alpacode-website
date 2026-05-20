import { useState } from "react";
import type { CaseStudy } from "../../data/home";

interface Props {
  cases: CaseStudy[];
  labels: {
    problem: string;
    before: string;
    after: string;
    placeholder: string;
  };
}

export default function Cases({ cases, labels }: Props) {
  const [i, setI] = useState(0);
  const cur = cases[i]!;

  return (
    <div className="cases">
      <div className="case-tabs" role="tablist" aria-label="Case studies">
        {cases.map((c, idx) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            id={`case-tab-${idx}`}
            aria-selected={idx === i}
            aria-controls="case-panel"
            tabIndex={idx === i ? 0 : -1}
            className={"case-tab " + (idx === i ? "is-on" : "")}
            onClick={() => setI(idx)}
          >
            <span className="num">— 0{idx + 1}</span>
            <span className="nm">{c.nm}</span>
            <span className="ind">{c.ind}</span>
          </button>
        ))}
      </div>

      <div className="case-body" id="case-panel" role="tabpanel" aria-labelledby={`case-tab-${i}`}>
        <div className="case-media" key={`m-${i}`}>
          <span className="tag">{cur.tag}</span>
          <div className="img-slot">{labels.placeholder}</div>
        </div>
        <div className="case-info" key={`i-${i}`}>
          <span className="problem-label">{labels.problem}</span>
          <h3>{cur.problem}</h3>
          <p className="ptext">{cur.ptext}</p>

          <div className="case-metrics">
            <div className="col">
              <span className="lab">{labels.before}</span>
              <span className="val">{cur.mBefore.v}</span>
              <span className="det">{cur.mBefore.d}</span>
            </div>
            <div className="ar">→</div>
            <div className="col">
              <span className="lab">{labels.after}</span>
              <span className="val after">{cur.mAfter.v}</span>
              <span className="det">{cur.mAfter.d}</span>
            </div>
          </div>

          <div>
            <div className="case-quote">{cur.quote}</div>
            <div className="case-quote-attr">{cur.attr}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
