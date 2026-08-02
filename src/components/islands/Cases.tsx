import { memo, useRef, useState } from "react";
import type { CaseStudy } from "../../data/home";
import { rovingTabKey } from "../../lib/roving";

interface Props {
  cases: CaseStudy[];
  labels: {
    problem: string;
    before: string;
    after: string;
    placeholder: string;
  };
}

// memo: lets @astrojs/react's renderer probe short-circuit (see CmdK.tsx).
function Cases({ cases, labels }: Props) {
  const [i, setI] = useState(0);
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const cur = cases[i]!;
  const showImg = cur.img && !broken[cur.key];

  const selectTab = (next: number) => {
    setI(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="cases">
      <div className="case-tabs" role="tablist" aria-label="Case studies">
        {cases.map((c, idx) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            id={`case-tab-${idx}`}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            aria-selected={idx === i}
            aria-controls="case-panel"
            tabIndex={idx === i ? 0 : -1}
            className={"case-tab " + (idx === i ? "is-on" : "")}
            onClick={() => setI(idx)}
            onKeyDown={(e) => rovingTabKey(e, idx, cases.length, selectTab)}
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
          <div className={"img-slot" + (showImg ? " is-filled" : "")}>
            {showImg ? (
              <img
                className="img-fill"
                src={cur.img}
                alt={cur.nm}
                loading="lazy"
                onError={() => setBroken((b) => ({ ...b, [cur.key]: true }))}
              />
            ) : (
              labels.placeholder
            )}
          </div>
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

export default memo(Cases);
