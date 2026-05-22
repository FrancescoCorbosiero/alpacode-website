import { memo, useState } from "react";
import type { ScaleStage } from "../../data/home";

interface Props {
  stages: ScaleStage[];
  includeLabel: string;
  idealLabel: string;
}

// memo: lets @astrojs/react's renderer probe short-circuit (see CmdK.tsx).
function Scale({ stages, includeLabel, idealLabel }: Props) {
  const [i, setI] = useState(0);
  const cur = stages[i]!;
  const pct = stages.length > 1 ? (i / (stages.length - 1)) * 100 : 0;

  return (
    <div className="scale">
      <div
        className="scale-track"
        role="tablist"
        aria-label="Percorso digitale"
        style={{ "--scale-pct": `${pct}%` } as React.CSSProperties}
      >
        <span className="scale-rail" aria-hidden="true" />
        <span className="scale-rail-fill" aria-hidden="true" />
        {stages.map((s, idx) => (
          <button
            key={idx}
            type="button"
            role="tab"
            id={`scale-tab-${idx}`}
            aria-selected={idx === i}
            aria-controls="scale-panel"
            tabIndex={idx === i ? 0 : -1}
            className={"scale-stop " + (idx === i ? "is-on " : "") + (idx < i ? "is-done" : "")}
            onClick={() => setI(idx)}
          >
            <span className="scale-dot" aria-hidden="true" />
            <span className="scale-n">{s.n}</span>
            <span className="scale-tab">{s.tab}</span>
          </button>
        ))}
      </div>

      <div className="scale-panel" id="scale-panel" role="tabpanel" aria-labelledby={`scale-tab-${i}`} key={i}>
        <div className="scale-panel-main">
          <span className="scale-step-no">{cur.n} / 0{stages.length}</span>
          <h3>{cur.title}</h3>
          <p>{cur.d}</p>
        </div>
        <div className="scale-panel-side">
          <div className="scale-include">
            <span className="lab">{includeLabel}</span>
            <ul>
              {cur.items.map((it, k) => (
                <li key={k}><span>{it}</span></li>
              ))}
            </ul>
          </div>
          <div className="scale-ideal">
            <span className="lab">{idealLabel}</span>
            <p>{cur.ideal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Scale);
