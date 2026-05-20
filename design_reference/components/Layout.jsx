/* global React */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ============================================================
   useLang — persistent IT/EN
   ============================================================ */
const LANG_KEY = "alpacode_v2_lang";
function useLang() {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem(LANG_KEY) || "it"; } catch (e) { return "it"; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch(e) {}
    window.dispatchEvent(new CustomEvent("alpa-lang", { detail: l }));
  };
  useEffect(() => {
    const h = (e) => setLangState(e.detail);
    window.addEventListener("alpa-lang", h);
    return () => window.removeEventListener("alpa-lang", h);
  }, []);
  return [lang, setLang];
}

/* ============================================================
   i18n dictionary
   ============================================================ */
const T = {
  nav: {
    home:     { it: "Home",     en: "Home" },
    servizi:  { it: "Servizi",  en: "Services" },
    lavori:   { it: "Lavori",   en: "Work" },
    scuola:   { it: "Scuola",   en: "School" },
    blog:     { it: "Blog",     en: "Blog" },
    faq:      { it: "FAQ",      en: "FAQ" },
    contatti: { it: "Contatti", en: "Contact" },
  },
  cta: { it: "Prenota una call", en: "Book a call" },
  ctaShort: { it: "Prenota call", en: "Book call" },
  search: { it: "Cerca pagine, corsi, azioni…", en: "Search pages, courses, actions…" },
  langLabel: { it: "Lingua", en: "Language" },
};
const tr = (path, lang) => {
  const seg = path.split(".");
  let n = T;
  for (const s of seg) n = n[s];
  return (n && n[lang]) || (n && n.it) || "";
};

/* ============================================================
   Header
   ============================================================ */
const PAGES = [
  { num: "01", key: "home",     it: "Home",     en: "Home",     href: "index.html" },
  { num: "02", key: "servizi",  it: "Servizi",  en: "Services", href: "servizi.html", mega: "servizi" },
  { num: "03", key: "lavori",   it: "Lavori",   en: "Work",     href: "lavori.html" },
  { num: "04", key: "scuola",   it: "Scuola",   en: "School",   href: "scuola.html", mega: "scuola" },
  { num: "05", key: "blog",     it: "Blog",     en: "Blog",     href: "blog.html" },
  { num: "06", key: "faq",      it: "FAQ",      en: "FAQ",      href: "faq.html" },
  { num: "07", key: "contatti", it: "Contatti", en: "Contact",  href: "contatti.html" },
];

function MegaServizi({ lang }) {
  const items = lang === "it" ? [
    { n: "01", t: "Sviluppo siti & web app", d: "WordPress, headless, e-commerce su misura, prodotti SaaS" },
    { n: "02", t: "Software & integrazioni", d: "Back-end, automazioni, API, sistemi gestionali" },
    { n: "03", t: "Consulenza digitale",     d: "Audit, roadmap tecnologica, trasformazione di processi" },
    { n: "04", t: "Performance & SEO",        d: "Misurazione, ottimizzazioni Core Web Vitals, search" },
  ] : [
    { n: "01", t: "Websites & web apps",   d: "WordPress, headless, e-commerce, custom SaaS products" },
    { n: "02", t: "Software & integrations", d: "Back-end, automations, APIs, ERP-like systems" },
    { n: "03", t: "Digital consulting",     d: "Audits, tech roadmap, process transformation" },
    { n: "04", t: "Performance & SEO",       d: "Measurement, Core Web Vitals, search optimization" },
  ];
  return (
    <div className="mega">
      <div className="mega-feature">
        <small>{lang === "it" ? "Servizio in evidenza" : "Featured service"}</small>
        <div className="display">{lang === "it" ? "Costruiamo prodotti digitali che durano." : "We build digital products that last."}</div>
        <a className="btn btn-blue btn-sm" href="servizi.html">{lang === "it" ? "Vedi tutti i servizi" : "All services"} <span className="arrow">→</span></a>
      </div>
      <div>
        <h5>{lang === "it" ? "Aree" : "Practice"}</h5>
        <ul>
          {items.slice(0,2).map(i => (
            <li key={i.n}><a href="servizi.html"><span className="num">{i.n}</span><span><span className="ttl">{i.t}</span><span className="desc">{i.d}</span></span></a></li>
          ))}
        </ul>
      </div>
      <div>
        <h5>{lang === "it" ? "Estensioni" : "Extensions"}</h5>
        <ul>
          {items.slice(2).map(i => (
            <li key={i.n}><a href="servizi.html"><span className="num">{i.n}</span><span><span className="ttl">{i.t}</span><span className="desc">{i.d}</span></span></a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MegaScuola({ lang }) {
  const courses = lang === "it" ? [
    { n: "01", t: "WordPress Gutenberg",  d: "Blocchi, full-site editing, theme.json, performance" },
    { n: "02", t: "Front-end moderno",    d: "HTML, CSS, JavaScript, accessibilità, design systems" },
    { n: "03", t: "Back-end & API",       d: "PHP, Node, database, REST, sicurezza" },
    { n: "04", t: "Kit per professionisti", d: "Template, starter, snippet pronti all'uso" },
  ] : [
    { n: "01", t: "WordPress Gutenberg",  d: "Blocks, full-site editing, theme.json, performance" },
    { n: "02", t: "Modern front-end",     d: "HTML, CSS, JavaScript, accessibility, design systems" },
    { n: "03", t: "Back-end & APIs",      d: "PHP, Node, databases, REST, security" },
    { n: "04", t: "Pro kits",             d: "Templates, starters, ready-made snippets" },
  ];
  return (
    <div className="mega">
      <div className="mega-feature">
        <small>{lang === "it" ? "Corso in partenza" : "Upcoming course"}</small>
        <div className="display">{lang === "it" ? "Impara facendo, da chi costruisce ogni giorno." : "Learn by doing, from people who ship every day."}</div>
        <a className="btn btn-blue btn-sm" href="scuola.html">{lang === "it" ? "Vai alla scuola" : "Visit the school"} <span className="arrow">→</span></a>
      </div>
      <div>
        <h5>{lang === "it" ? "Percorsi" : "Tracks"}</h5>
        <ul>
          {courses.slice(0,2).map(i => (
            <li key={i.n}><a href="scuola.html"><span className="num">{i.n}</span><span><span className="ttl">{i.t}</span><span className="desc">{i.d}</span></span></a></li>
          ))}
        </ul>
      </div>
      <div>
        <h5>{lang === "it" ? "Risorse" : "Resources"}</h5>
        <ul>
          {courses.slice(2).map(i => (
            <li key={i.n}><a href="scuola.html"><span className="num">{i.n}</span><span><span className="ttl">{i.t}</span><span className="desc">{i.d}</span></span></a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Header({ active, lang, setLang, onOpenCmdK }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const closeT = useRef(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 6);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const enterMega = (key) => { clearTimeout(closeT.current); setOpenMega(key); };
  const leaveMega = () => { closeT.current = setTimeout(() => setOpenMega(null), 120); };

  const isMac = useMemo(() => typeof navigator !== "undefined" && /mac/i.test(navigator.platform), []);

  return (
    <header className={"site-header " + (scrolled ? "scrolled" : "")}>
      <div className="header-strut" />
      <div className="header-row">
        <a className="brand" href="index.html" aria-label="Alpacode home">
          <div className="brand-mark"><img src="assets/logo.png" alt="" /></div>
          <div className="brand-text">
            ALPACODE
            <small>{lang === "it" ? "Soluzioni Digitali" : "Digital Solutions"}</small>
          </div>
        </a>

        <nav className="nav" aria-label="primary">
          {PAGES.map(p => {
            const label = lang === "it" ? p.it : p.en;
            const isActive = p.key === active;
            const cls = "nav-item " + (isActive ? "is-active" : "");
            if (p.mega) {
              return (
                <div
                  className="mega-wrap"
                  key={p.key}
                  onMouseEnter={() => enterMega(p.key)}
                  onMouseLeave={leaveMega}
                >
                  <a className={cls} href={p.href}>
                    <span className="num">{p.num}</span>{label} <span style={{fontSize:9,opacity:0.6}}>▾</span>
                  </a>
                  {openMega === p.key && (p.mega === "servizi"
                    ? <MegaServizi lang={lang} />
                    : <MegaScuola lang={lang} />
                  )}
                </div>
              );
            }
            return (
              <a key={p.key} className={cls} href={p.href}>
                <span className="num">{p.num}</span>{label}
              </a>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button className="kbd" onClick={onOpenCmdK} aria-label="Open command palette">
            <span>{isMac ? "⌘" : "Ctrl"}</span><span>K</span>
          </button>
          <div className="lang-toggle" role="group" aria-label={tr("langLabel", lang)}>
            <button className={lang === "it" ? "is-on" : ""} onClick={() => setLang("it")} aria-pressed={lang==="it"}>IT</button>
            <button className={lang === "en" ? "is-on" : ""} onClick={() => setLang("en")} aria-pressed={lang==="en"}>EN</button>
          </div>
          <a className="btn btn-sm" href="contatti.html">{tr("ctaShort", lang)} <span className="arrow">→</span></a>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   Command palette
   ============================================================ */
function CmdK({ open, onClose, lang }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const base = [
      ...PAGES.map((p,i) => ({ kind: "page", num: p.num, ttl: lang==="it"?p.it:p.en, sub: lang==="it"?`Pagina · ${p.href}`:`Page · ${p.href}`, href: p.href })),
      { kind: "course", num: "C1", ttl: "WordPress Gutenberg", sub: lang==="it"?"Corso completo · 24h":"Full course · 24h", href: "scuola.html" },
      { kind: "course", num: "C2", ttl: lang==="it"?"Front-end moderno":"Modern front-end", sub: lang==="it"?"Corso · 32h":"Course · 32h", href: "scuola.html" },
      { kind: "course", num: "C3", ttl: lang==="it"?"Back-end & API":"Back-end & APIs", sub: lang==="it"?"Corso · 28h":"Course · 28h", href: "scuola.html" },
      { kind: "action", num: "→",  ttl: lang==="it"?"Prenota una call":"Book a call", sub: lang==="it"?"Apri contatti":"Open contact", href: "contatti.html" },
      { kind: "action", num: "✉",  ttl: "ciao@alpacode.it", sub: lang==="it"?"Scrivi un'email":"Write an email", href: "mailto:ciao@alpacode.it" },
      { kind: "action", num: "⌘",  ttl: lang==="it"?"Cambia lingua a EN":"Switch language to IT", sub: lang==="it"?"Persistente":"Persistent", action: "lang" },
    ];
    if (!q.trim()) return base;
    const needle = q.toLowerCase();
    return base.filter(i => (i.ttl + " " + i.sub + " " + i.kind).toLowerCase().includes(needle));
  }, [q, lang]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setIdx(i => Math.min(items.length-1, i+1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setIdx(i => Math.max(0, i-1)); }
      if (e.key === "Enter") {
        const it = items[idx];
        if (!it) return;
        if (it.action === "lang") {
          const cur = (localStorage.getItem(LANG_KEY) || "it");
          const next = cur === "it" ? "en" : "it";
          localStorage.setItem(LANG_KEY, next);
          window.dispatchEvent(new CustomEvent("alpa-lang", { detail: next }));
          onClose();
        } else if (it.href) {
          if (it.href.startsWith("mailto:")) { window.location.href = it.href; }
          else { window.location.href = it.href; }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, idx, items, onClose]);

  if (!open) return null;

  const grouped = items.reduce((acc, it) => {
    (acc[it.kind] = acc[it.kind] || []).push(it);
    return acc;
  }, {});
  const kindLabel = (k) => ({ page: lang==="it"?"Pagine":"Pages", course: lang==="it"?"Corsi":"Courses", action: lang==="it"?"Azioni":"Actions" }[k] || k);

  let runningIdx = -1;
  return (
    <div className="cmdk-backdrop" onClick={onClose}>
      <div className="cmdk" onClick={e => e.stopPropagation()}>
        <div className="cmdk-input">
          <span style={{fontFamily:"var(--t-mono)",fontSize:12,color:"var(--mute)",letterSpacing:"0.18em"}}>SEARCH</span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => { setQ(e.target.value); setIdx(0); }}
            placeholder={tr("search", lang)}
          />
          <span className="kbd"><span>ESC</span></span>
        </div>
        <div className="cmdk-list">
          {Object.entries(grouped).map(([kind, list]) => (
            <div key={kind}>
              <div className="cmdk-section">{kindLabel(kind)} · {list.length}</div>
              {list.map(it => {
                runningIdx++;
                const isOn = runningIdx === idx;
                const myIdx = runningIdx;
                return (
                  <div
                    key={myIdx}
                    className={"cmdk-item " + (isOn ? "is-on" : "")}
                    onMouseEnter={() => setIdx(myIdx)}
                    onClick={() => { setIdx(myIdx); window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" })); }}
                  >
                    <span className="cmdk-num">{it.num}</span>
                    <span>
                      <span className="cmdk-ttl">{it.ttl}</span>
                      <span className="cmdk-sub">{it.sub}</span>
                    </span>
                    <span className="cmdk-kind">{kind}</span>
                  </div>
                );
              })}
            </div>
          ))}
          {items.length === 0 && (
            <div style={{padding:"24px 18px",color:"var(--mute)"}}>{lang==="it"?"Nessun risultato.":"No results."}</div>
          )}
        </div>
        <div className="cmdk-foot">
          <span>↑ ↓ NAVIGATE</span>
          <span>↵ OPEN</span>
          <span>ESC CLOSE</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer({ lang }) {
  const t = lang === "it" ? {
    tag: "Costruiamo software che dura, consigliamo con calma, insegniamo con metodo.",
    cInfo: "Informazioni", cNav: "Naviga", cContact: "Scrivici", cLegal: "Legale",
    rights: "© 2026 ALPACODE · Tutti i diritti riservati",
    base: "Sede operativa · Monza · Milano · IT",
    civ: "P.IVA 14463350968",
    iso: "Disponibile lun–ven · 09:00–18:00 CET",
    privacy: "Privacy", cookies: "Cookie", terms: "Termini", legal: "Note legali",
  } : {
    tag: "We build software that lasts, advise calmly, teach with method.",
    cInfo: "Information", cNav: "Navigate", cContact: "Write us", cLegal: "Legal",
    rights: "© 2026 ALPACODE · All rights reserved",
    base: "Studio · Monza · Milan · IT",
    civ: "VAT 14463350968",
    iso: "Available Mon–Fri · 09:00–18:00 CET",
    privacy: "Privacy", cookies: "Cookies", terms: "Terms", legal: "Legal notes",
  };
  return (
    <footer className="site-footer">
      <div className="wrap-wide">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="big">ALPACODE</div>
            <div className="big-bar" />
            <div className="big" style={{fontSize:24, opacity:0.85}}>SOLUZIONI DIGITALI</div>
            <p style={{marginTop:24}}>{t.tag}</p>
          </div>
          <div className="foot-col">
            <h4>{t.cInfo}</h4>
            <ul>
              <li>{t.base}</li>
              <li>{t.civ}</li>
              <li>{t.iso}</li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>{t.cNav}</h4>
            <ul>
              {PAGES.map(p => <li key={p.key}><a href={p.href}>{lang==="it"?p.it:p.en}</a></li>)}
            </ul>
          </div>
          <div className="foot-col">
            <h4>{t.cContact}</h4>
            <ul>
              <li><a href="mailto:ciao@alpacode.it">ciao@alpacode.it</a></li>
              <li><a href="contatti.html">{lang==="it"?"Prenota una call":"Book a call"}</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
            <h4 style={{marginTop:24}}>{t.cLegal}</h4>
            <ul>
              <li><a href="#">{t.privacy}</a></li>
              <li><a href="#">{t.cookies}</a></li>
              <li><a href="#">{t.terms}</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{t.rights}</span>
          <span>ALPACODE · MZ — MI · IT</span>
          <span>v2.0 · 05.2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Layout shell
   ============================================================ */
function Layout({ active, children }) {
  const [lang, setLang] = useLang();
  const [cmdkOpen, setCmdkOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setCmdkOpen(o => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <React.Fragment>
      <Header active={active} lang={lang} setLang={setLang} onOpenCmdK={() => setCmdkOpen(true)} />
      <main>{typeof children === "function" ? children(lang) : children}</main>
      <Footer lang={lang} />
      <CmdK open={cmdkOpen} onClose={() => setCmdkOpen(false)} lang={lang} />
    </React.Fragment>
  );
}

/* Expose */
Object.assign(window, { Layout, useLang, tr, T, PAGES });
