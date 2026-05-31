import { memo, useEffect, useState } from "react";

interface Labels {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface Props {
  /** ISO datetime with timezone, e.g. "2026-06-30T23:59:59+02:00". */
  deadlineISO: string;
  labels: Labels;
  /** Shown when the deadline has passed. */
  closedLabel: string;
}

interface Remaining {
  d: number;
  h: number;
  m: number;
  s: number;
  done: boolean;
}

function diff(deadline: number): Remaining {
  const ms = deadline - Date.now();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: false,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

// memo: lets @astrojs/react's renderer probe short-circuit (see CmdK.tsx).
function Countdown({ deadlineISO, labels, closedLabel }: Props) {
  const deadline = new Date(deadlineISO).getTime();
  // Start with a deterministic value so SSR and first client paint match,
  // then tick once mounted.
  const [r, setR] = useState<Remaining>(() => diff(deadline));

  useEffect(() => {
    setR(diff(deadline));
    const id = window.setInterval(() => setR(diff(deadline)), 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  if (r.done) {
    return <div className="countdown countdown--closed">● {closedLabel}</div>;
  }

  const cells: { v: string; l: string }[] = [
    { v: String(r.d), l: labels.days },
    { v: pad(r.h), l: labels.hours },
    { v: pad(r.m), l: labels.minutes },
    { v: pad(r.s), l: labels.seconds },
  ];

  return (
    <div className="countdown" role="timer" aria-live="off">
      {cells.map((c, i) => (
        <div className="cd-cell" key={i}>
          <span className="cd-num">{c.v}</span>
          <span className="cd-lab">{c.l}</span>
        </div>
      ))}
    </div>
  );
}

export default memo(Countdown);
