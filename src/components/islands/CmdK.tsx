import { memo, useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { navigate } from "astro:transitions/client";
import type { Lang } from "../../i18n/types";
import { persistLang, toggleLangPath } from "../../lib/lang-store";
import { lockScroll } from "../../lib/scroll-lock";

export interface CmdItem {
  kind: "recent" | "page" | "course" | "action";
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

const KIND_ORDER: CmdItem["kind"][] = ["recent", "page", "course", "action"];

const RECENTS_KEY = "alpacode_recents";
interface Recent {
  ttl: string;
  sub: string;
  href: string;
}
function readRecents(): Recent[] {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENTS_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}
function recordRecent(r: Recent): void {
  try {
    const list = readRecents().filter((x) => x.href !== r.href);
    list.unshift(r);
    localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, 8)));
  } catch {
    /* storage unavailable — ignore */
  }
}

// Wrapped in memo so @astrojs/react's renderer-detection probe short-circuits
// on the memo $$typeof instead of calling the component directly (which would
// run these hooks outside a render pass and log a dev-only "Invalid hook call").
function CmdK({ lang, items, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["ttl", "sub", "kind"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [items],
  );

  // Record this page so it can show up as "recent" on later visits.
  useEffect(() => {
    const ttl = (document.title.split("·")[0] || document.title).trim();
    recordRecent({ ttl, sub: window.location.pathname, href: window.location.pathname });
  }, []);

  const recents = useMemo<CmdItem[]>(() => {
    if (!open) return [];
    const cur = window.location.pathname;
    return readRecents()
      .filter((r) => r.href !== cur)
      .slice(0, 3)
      .map((r) => ({ kind: "recent" as const, num: "↩", ttl: r.ttl, sub: r.sub, href: r.href }));
  }, [open]);

  const filtered = useMemo(() => {
    if (!q.trim()) return [...recents, ...items];
    return fuse.search(q).map((r) => r.item);
  }, [q, items, fuse, recents]);

  // The list renders grouped by kind, which reorders Fuse's relevance-sorted
  // results — so keyboard nav and Enter must index into the *rendered* order
  // (`ordered`), never into `filtered` directly, or they'd act on a different
  // item than the highlighted one.
  const grouped = useMemo(
    () =>
      KIND_ORDER.map((kind) => ({
        kind,
        list: filtered.filter((it) => it.kind === kind),
      })).filter((g) => g.list.length > 0),
    [filtered],
  );
  const ordered = useMemo(() => grouped.flatMap((g) => g.list), [grouped]);

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
      // Return focus to whatever opened the palette when it closes.
      const opener = document.activeElement as HTMLElement | null;
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => {
        window.clearTimeout(id);
        if (opener?.isConnected) opener.focus();
      };
    }
  }, [open]);

  const run = (item: CmdItem | undefined) => {
    if (!item) return;
    setOpen(false);
    if (item.action === "lang") {
      const next = lang === "it" ? "en" : "it";
      persistLang(next);
      navigate(toggleLangPath(window.location.pathname));
      return;
    }
    if (!item.href) return;
    // Soft-navigate internal links so prefetch/view transitions keep paying
    // off; external protocols (mailto:) need a real navigation.
    if (item.href.startsWith("/")) navigate(item.href);
    else window.location.href = item.href;
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(ordered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(ordered[idx]);
      } else if (e.key === "Tab") {
        // aria-modal promises containment — cycle focus inside the dialog.
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = Array.from(
          panel.querySelectorAll<HTMLElement>("input, button"),
        );
        if (focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, idx, ordered]);

  // Lock body scroll while open (ref-counted — shared with the mobile nav).
  useEffect(() => {
    if (!open) return;
    return lockScroll();
  }, [open]);

  if (!open) return null;

  let running = -1;

  return (
    <div className="cmdk-backdrop" onClick={() => setOpen(false)}>
      <div
        ref={panelRef}
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

export default memo(CmdK);
