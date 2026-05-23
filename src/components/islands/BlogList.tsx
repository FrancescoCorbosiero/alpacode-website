import { memo, useEffect, useRef, useState } from "react";

export interface BlogPost {
  id: string;
  href: string;
  title: string;
  descriptor: string;
  date: string;
  category: string;
  topic: string;
}
export interface TopicTab {
  key: string;
  label: string;
}
export interface BlogLabels {
  featured: string;
  read: string;
  empty: string;
  filter: string;
}
interface Props {
  posts: BlogPost[];
  tabs: TopicTab[];
  labels: BlogLabels;
}

// memo: lets @astrojs/react's renderer probe short-circuit (see CmdK.tsx).
function BlogList({ posts, tabs, labels }: Props) {
  const [active, setActive] = useState<string>("all");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // URL-hash sync (read on mount + when the user hits back/forward).
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "");
      setActive(tabs.some((t) => t.key === h) ? h : "all");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [tabs]);

  const setTab = (k: string) => {
    setActive(k);
    const url =
      k === "all"
        ? window.location.pathname + window.location.search
        : window.location.pathname + window.location.search + "#" + k;
    history.replaceState(null, "", url);
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    setTab(tabs[next]!.key);
    tabRefs.current[next]?.focus();
  };

  const counts: Record<string, number> = { all: posts.length };
  for (const p of posts) counts[p.topic] = (counts[p.topic] ?? 0) + 1;

  const filtered = active === "all" ? posts : posts.filter((p) => p.topic === active);
  const [featured, ...rest] = filtered;

  return (
    <div className="blog-shell">
      <div className="blog-tabs" role="tablist" aria-label={labels.filter}>
        {tabs.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`blog-tab-${t.key}`}
            aria-selected={t.key === active}
            aria-controls="blog-stream"
            tabIndex={t.key === active ? 0 : -1}
            className={"blog-tab" + (t.key === active ? " is-on" : "")}
            onClick={() => setTab(t.key)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            <span className="blog-tab-label">{t.label}</span>
            <span className="blog-tab-count">{counts[t.key] ?? 0}</span>
          </button>
        ))}
      </div>

      <div
        className="blog-stream"
        id="blog-stream"
        role="tabpanel"
        aria-labelledby={`blog-tab-${active}`}
        key={active}
      >
        {filtered.length === 0 ? (
          <div className="blog-empty">{labels.empty}</div>
        ) : (
          <>
            {featured && (
              <a className="blog-featured" href={featured.href}>
                <div className="blog-featured-meta">
                  <span className="kicker">{labels.featured}</span>
                  <span className="dot">·</span>
                  <span className="cat">{featured.category}</span>
                  <span className="dot">·</span>
                  <span className="date">{featured.date}</span>
                </div>
                <h3>{featured.title}</h3>
                <p>{featured.descriptor}</p>
                <span className="cta">{labels.read} <span className="arr">→</span></span>
              </a>
            )}
            {rest.length > 0 && (
              <div className="blog-list">
                {rest.map((p) => (
                  <a key={p.id} className="blog-row" href={p.href}>
                    <span className="date">{p.date}</span>
                    <h3>
                      {p.title}
                      <small>{p.descriptor}</small>
                    </h3>
                    <span className="cat">{p.category}</span>
                    <span className="arr">→</span>
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(BlogList);
