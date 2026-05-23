import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "../../i18n/types";
import { persistLang } from "../../lib/lang-store";

export interface MobileNavItem {
  num: string;
  key: string;
  label: string;
  href: string;
  mega?: {
    columns: {
      title: string;
      items: { n: string; t: string; d: string }[];
    }[];
  };
}

export interface MobileNavLabels {
  title: string;
  close: string;
  expand: string;
  collapse: string;
  langLabel: string;
  searchOpen: string;
  ctaLabel: string;
}

interface Props {
  lang: Lang;
  active?: string;
  items: MobileNavItem[];
  itHref: string;
  enHref: string;
  contattiHref: string;
  cal: {
    configured: boolean;
    link: string;
    namespace: string;
    config: string;
  };
  labels: MobileNavLabels;
}

function MobileNav({ lang, active, items, itHref, enHref, contattiHref, cal, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const initialExpanded = useMemo(
    () => items.find((it) => it.key === active && it.mega)?.key ?? null,
    [items, active],
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-mobile-nav-open]")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    setExpanded(initialExpanded);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, initialExpanded]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onSwap = () => setOpen(false);
    document.addEventListener("astro:before-swap", onSwap);
    return () => document.removeEventListener("astro:before-swap", onSwap);
  }, []);

  if (!open) return null;

  const onCalClick = () => setOpen(false);

  return (
    <div className="mnav-backdrop" onClick={() => setOpen(false)}>
      <div
        ref={panelRef}
        className="mnav"
        role="dialog"
        aria-modal="true"
        aria-label={labels.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mnav-strut" aria-hidden="true" />
        <div className="mnav-head">
          <span className="mnav-title">{labels.title}</span>
          <button
            type="button"
            className="mnav-close"
            aria-label={labels.close}
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="mnav-list" aria-label={labels.title}>
          {items.map((p) => {
            const isActive = p.key === active;
            const isOpen = expanded === p.key;
            const baseCls = "mnav-item" + (isActive ? " is-active" : "");
            if (!p.mega) {
              return (
                <a
                  key={p.key}
                  className={baseCls}
                  href={p.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="num">{p.num}</span>
                  <span className="ttl">{p.label}</span>
                </a>
              );
            }
            return (
              <div key={p.key} className={"mnav-group" + (isOpen ? " is-open" : "")}>
                <div className="mnav-row">
                  <a
                    className={baseCls}
                    href={p.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="num">{p.num}</span>
                    <span className="ttl">{p.label}</span>
                  </a>
                  <button
                    type="button"
                    className="mnav-toggle"
                    aria-expanded={isOpen}
                    aria-label={isOpen ? labels.collapse : labels.expand}
                    onClick={() => setExpanded(isOpen ? null : p.key)}
                  >
                    <span className="caret" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                </div>
                {isOpen && (
                  <div className="mnav-sub">
                    {p.mega.columns.map((col) => (
                      <div key={col.title} className="mnav-sub-col">
                        <h5>{col.title}</h5>
                        <ul>
                          {col.items.map((it) => (
                            <li key={it.n}>
                              <a href={p.href} onClick={() => setOpen(false)}>
                                <span className="num">{it.n}</span>
                                <span>
                                  <span className="ttl">{it.t}</span>
                                  <span className="desc">{it.d}</span>
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mnav-foot">
          <div className="mnav-foot-row">
            <button
              type="button"
              className="kbd mnav-search"
              data-cmdk-open
              aria-label={labels.searchOpen}
              onClick={() => setOpen(false)}
            >
              <span data-cmd-mod>⌘</span>
              <span>K</span>
              <span className="mnav-search-label">{labels.searchOpen}</span>
            </button>
            <div className="lang-toggle" role="group" aria-label={labels.langLabel}>
              <a
                href={itHref}
                className={lang === "it" ? "is-on" : ""}
                aria-current={lang === "it" ? "true" : undefined}
                onClick={() => persistLang("it")}
              >
                IT
              </a>
              <a
                href={enHref}
                className={lang === "en" ? "is-on" : ""}
                aria-current={lang === "en" ? "true" : undefined}
                onClick={() => persistLang("en")}
              >
                EN
              </a>
            </div>
          </div>
          {cal.configured ? (
            <button
              type="button"
              className="btn btn-blue mnav-cta"
              data-cal-link={cal.link}
              data-cal-namespace={cal.namespace}
              data-cal-config={cal.config}
              data-journey="mobile-nav"
              onClick={onCalClick}
            >
              {labels.ctaLabel}
              <span className="arrow">→</span>
            </button>
          ) : (
            <a
              className="btn btn-blue mnav-cta"
              href={contattiHref}
              data-journey="mobile-nav"
              onClick={() => setOpen(false)}
            >
              {labels.ctaLabel}
              <span className="arrow">→</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(MobileNav);
