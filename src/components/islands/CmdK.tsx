import { useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import type { Lang } from "../../i18n/types";
import { persistLang, toggleLangPath } from "../../lib/lang-store";

export interface CmdItem {
  kind: "page" | "course" | "action";
  num: string;
  ttl: string;
  sub: string;
  href?: string;
  action?: "lang";
}

export interface CmdLabels {
  searchLabel: string;
  placeholder: string;
  esc: string;
  sections: Record<CmdItem["kind"], string>;
  navigate: string;
  open: string;
  close: string;
  empty: string;
}

interface Props {
  lang: Lang;
  items: CmdItem[];
  labels: CmdLabels;
}

const KIND_ORDER: CmdItem["kind"][] = ["page", "course", "action"];

export default function CmdK({ lang, items, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["ttl", "sub", "kind"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [items],
  );

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    return fuse.search(q).map((r) => r.item);
  }, [q, items, fuse]);

  // Open via Cmd/Ctrl+K and via any [data-cmdk-open] trigger in the header.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cmdk-open]")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const run = (item: CmdItem | undefined) => {
    if (!item) return;
    if (item.action === "lang") {
      const next = lang === "it" ? "en" : "it";
      persistLang(next);
      window.location.href = toggleLangPath(window.location.pathname);
      return;
    }
    if (item.href) window.location.href = item.href;
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(filtered[idx]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idx, filtered]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const grouped = KIND_ORDER.map((kind) => ({
    kind,
    list: filtered.filter((it) => it.kind === kind),
  })).filter((g) => g.list.length > 0);

  let running = -1;

  return (
    <div className="cmdk-backdrop" onClick={() => setOpen(false)}>
      <div
        className="cmdk"
        role="dialog"
        aria-modal="true"
        aria-label={labels.placeholder}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmdk-input">
          <span className="cmdk-search-label">{labels.searchLabel}</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setIdx(0);
            }}
            placeholder={labels.placeholder}
            aria-label={labels.placeholder}
          />
          <span className="kbd">
            <span>{labels.esc}</span>
          </span>
        </div>

        <div className="cmdk-list">
          {grouped.map(({ kind, list }) => (
            <div key={kind}>
              <div className="cmdk-section">
                {labels.sections[kind]} · {list.length}
              </div>
              {list.map((item) => {
                running += 1;
                const my = running;
                return (
                  <button
                    type="button"
                    key={`${item.kind}-${item.num}-${item.ttl}`}
                    className={"cmdk-item " + (my === idx ? "is-on" : "")}
                    onMouseEnter={() => setIdx(my)}
                    onClick={() => run(item)}
                  >
                    <span className="cmdk-num">{item.num}</span>
                    <span>
                      <span className="cmdk-ttl">{item.ttl}</span>
                      <span className="cmdk-sub">{item.sub}</span>
                    </span>
                    <span className="cmdk-kind">{item.kind}</span>
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && <div className="cmdk-empty">{labels.empty}</div>}
        </div>

        <div className="cmdk-foot">
          <span>{labels.navigate}</span>
          <span>{labels.open}</span>
          <span>{labels.close}</span>
        </div>
      </div>
    </div>
  );
}
