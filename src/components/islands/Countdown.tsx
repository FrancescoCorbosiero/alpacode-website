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
  // NaN-safe: a malformed deadline reads as closed, never as "NaN giorni".
  if (!(ms > 0)) return { d: 0, h: 0, m: 0, s: 0, done: true };
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
  // The site is prerendered, so SSR runs at *build* time: any real value
  // computed here would be days stale by the time a visitor loads the page
  // (and flipping to "closed" would even change the DOM shape → React 18
  // hydration failure on above-the-fold content). Render a neutral
  // placeholder on the server and fill in after mount.
  const [r, setR] = useState<Remaining | null>(null);

  useEffect(() => {
    setR(diff(deadline));
    const id = window.setInterval(() => {
      const next = diff(deadline);
      setR(next);
      // Once closed the value never changes again — stop ticking.
      if (next.done) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  if (r?.done) {
    return <div className="countdown countdown--closed">● {closedLabel}</div>;
  }

  const cells: { v: string; l: string }[] = [
    { v: r ? String(r.d) : "—", l: labels.days },
    { v: r ? pad(r.h) : "—", l: labels.hours },
    { v: r ? pad(r.m) : "—", l: labels.minutes },
    { v: r ? pad(r.s) : "—", l: labels.seconds },
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
