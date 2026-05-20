/* global React, Layout, useLang */
const { useState: useStateH, useEffect: useEffectH } = React;

/* ============================================================
   Hero — Monumental wordmark composition
   The blue strut from the logo becomes a structural element.
   ============================================================ */
function Hero({ lang }) {
  const t = lang === "it" ? {
    eyebrow: "MZ · MI — IT · EST. 2018",
    claim: <>Software, <em>consulenza</em> e formazione<br/>per chi <em>costruisce</em> in digitale.</>,
    sub: "Soluzioni Digitali",
    callout: "Sviluppo, consulenza e corsi per PMI, professionisti e studenti — costruiti con calma, metodo e attenzione al dettaglio.",
    cta1: "Prenota una call",
    cta2: "Esplora i lavori",
    meta: [
      { k: "Sede", v: "Monza · Milano", d: "IT" },
      { k: "Operatività", v: "Lun — Ven", d: "09:00 — 18:00 CET" },
      { k: "Progetti", v: "120+", d: "consegnati dal 2018" },
      { k: "Ambiti", v: "03", d: "costruire · consigliare · insegnare" },
    ],
    statusLabel: "DISPONIBILE",
    statusVal: "Nuovi progetti Q3 2026",
  } : {
    eyebrow: "MZ · MI — IT · EST. 2018",
    claim: <>Software, <em>consulting</em> and training<br/>for those who <em>build</em> in digital.</>,
    sub: "Digital Solutions",
    callout: "Development, consulting and courses for SMBs, professionals and students — crafted calmly, with method and care for detail.",
    cta1: "Book a call",
    cta2: "See the work",
    meta: [
      { k: "Studio", v: "Monza · Milan", d: "IT" },
      { k: "Hours", v: "Mon — Fri", d: "09:00 — 18:00 CET" },
      { k: "Projects", v: "120+", d: "delivered since 2018" },
      { k: "Practice", v: "03", d: "build · advise · teach" },
    ],
    statusLabel: "AVAILABLE",
    statusVal: "New projects Q3 2026",
  };

  return (
    <section className="hero">
      <div className="wrap-wide">
        <div className="hero-meta">
          <div className="left">
            <span className="eyebrow">{t.eyebrow}</span>
          </div>
          <div className="right">
            <span className="label">{t.statusLabel}</span>
            <span className="val">{t.statusVal}</span>
          </div>
        </div>

        <div className="hero-monogram" style={{marginTop: 56}}>
          <h1 className="hero-wordmark">
            <div className="row"><span>ALPACODE</span></div>
            <div className="hero-bar" aria-hidden="true" />
            <div className="row" style={{fontSize:"0.42em", letterSpacing:"-0.01em"}}>
              <span>SOLUZIONI</span><span>DIGITALI</span>
            </div>
          </h1>
        </div>

        <div className="hero-sub-row" style={{marginTop: 72}}>
          <p className="hero-claim">{t.claim}</p>
          <div className="hero-ctas">
            <a className="btn" href="contatti.html">{t.cta1} <span className="arrow">→</span></a>
            <a className="btn btn-ghost" href="lavori.html">{t.cta2}</a>
          </div>
        </div>

        <div className="hero-meta-row">
          {t.meta.map(m => (
            <div className="cell" key={m.k}>
              <span className="k">{m.k}</span>
              <span className="v">{m.v}</span>
              <span className="d">{m.d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   §01 — The three verbs
   ============================================================ */
function Verbs({ lang }) {
  const t = lang === "it" ? {
    num: "§01 · SERVIZI",
    h: "Tre verbi.\nNiente di più.",
    lede: "Da otto anni facciamo solo tre cose, ma le facciamo con cura. Niente bundle confusi, niente upsell, niente jargon.",
    list: [
      {
        num: "01", w: "Costruire", accent: "ire",
        d: "Siti, web app, software su misura, integrazioni. Codice scritto a mano, manutenibile, documentato.",
        items: ["Sviluppo siti & web app", "Software su misura", "Integrazioni & automazioni", "Performance & SEO"],
      },
      {
        num: "02", w: "Consigliare", accent: "are",
        d: "Audit, roadmap, scelte tecnologiche. Lavoriamo a fianco del cliente, in italiano e senza fumo.",
        items: ["Audit tecnico & UX", "Roadmap di prodotto", "Trasformazione digitale", "Selezione fornitori"],
      },
      {
        num: "03", w: "Insegnare", accent: "are",
        d: "Corsi e kit professionali su WordPress, front-end e back-end. Materiali che restano, esercizi reali.",
        items: ["Corso WordPress Gutenberg", "Front-end moderno", "Back-end & API", "Kit per professionisti"],
      },
    ],
  } : {
    num: "§01 · SERVICES",
    h: "Three verbs.\nNothing more.",
    lede: "For eight years we have done only three things, and we do them with care. No confusing bundles, no upsell, no jargon.",
    list: [
      { num: "01", w: "Build",   accent: "d",  d: "Websites, web apps, custom software, integrations. Hand-written, maintainable, documented code.", items: ["Websites & web apps","Custom software","Integrations & automations","Performance & SEO"] },
      { num: "02", w: "Advise",  accent: "e",  d: "Audits, roadmaps, technology choices. We work next to the client, plainly, no smoke.",                  items: ["Tech & UX audits","Product roadmap","Digital transformation","Vendor selection"] },
      { num: "03", w: "Teach",   accent: "h",  d: "Courses and pro kits on WordPress, front-end and back-end. Materials that last, real exercises.",      items: ["WordPress Gutenberg","Modern front-end","Back-end & APIs","Pro kits"] },
    ],
  };
  return (
    <section className="section">
      <div className="wrap-wide">
        <div className="section-head">
          <div>
            <div className="sec-num">{t.num}</div>
            <h2 style={{whiteSpace:"pre-line"}}>{t.h}</h2>
          </div>
          <p className="lede">{t.lede}</p>
        </div>
        <div className="verbs">
          {t.list.map(v => (
            <div className="verb" key={v.num}>
              <div className="v-num">— {v.num}</div>
              <div className="v-word">
                {v.w.slice(0, v.w.length - v.accent.length)}
                <span className="accent">{v.accent}</span>
              </div>
              <div className="v-strut" />
              <div className="v-desc">{v.d}</div>
              <ul>
                {v.items.map(i => <li key={i}><span>{i}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   §02 — Cases picker
   ============================================================ */
function Cases({ lang }) {
  const t = lang === "it" ? {
    num: "§02 · CASI DI STUDIO",
    h: "Quello che\nabbiamo costruito.",
    lede: "Tre progetti recenti, raccontati con i numeri prima e dopo. Le foto le carichi tu — sono spazi pronti per le tue immagini.",
  } : {
    num: "§02 · CASE STUDIES",
    h: "What we have built.",
    lede: "Three recent projects, told in numbers before and after. Drop your own images into the slots.",
  };

  const cases = lang === "it" ? [
    {
      key: "studio-legale",
      ind: "Studio professionale · Milano",
      nm: "Sito istituzionale & area clienti",
      problem: "Sito statico del 2014, niente lead, processi via email.",
      ptext: "Abbiamo riprogettato l'identità digitale e costruito un'area clienti riservata: documenti, fatture e prenotazioni in un unico posto. Il sito principale ora carica in meno di un secondo.",
      mBefore: { v: "5.8s", d: "LCP medio" },
      mAfter:  { v: "0.7s", d: "LCP medio" },
      quote: "«È la prima volta in dieci anni che i clienti ci scrivono per dire che il sito è chiaro.»",
      attr: "— Avv. M., partner",
      tag: "2025 · WEB + SOFTWARE",
    },
    {
      key: "manifatturiero",
      ind: "PMI manifatturiera · Brianza",
      nm: "Configuratore prodotto B2B",
      problem: "Cataloghi PDF, listini Excel, quotazioni che richiedevano due giorni.",
      ptext: "Un configuratore web collegato all'ERP: il commerciale costruisce l'offerta in 6 minuti, il cliente la riceve in PDF firmato. Onboarding fatto in 2 mezze giornate.",
      mBefore: { v: "2 gg", d: "tempo medio offerta" },
      mAfter:  { v: "6 min", d: "tempo medio offerta" },
      quote: "«Abbiamo ridotto del 40% le richieste di chiarimento dei clienti.»",
      attr: "— S., responsabile commerciale",
      tag: "2024 · SOFTWARE",
    },
    {
      key: "scuola",
      ind: "Istituto di formazione · Milano",
      nm: "Piattaforma corsi & community",
      problem: "Tre piattaforme scollegate, studenti che si perdevano tra Moodle, Zoom e WhatsApp.",
      ptext: "Una piattaforma unica con corsi on-demand, live, esercizi corretti automaticamente e una community. Costruita in WordPress + headless. Sostiene 2.000 studenti attivi.",
      mBefore: { v: "31%", d: "tasso di completamento" },
      mAfter:  { v: "78%", d: "tasso di completamento" },
      quote: "«Gli studenti tornano per la community, restano per i corsi.»",
      attr: "— G., direzione didattica",
      tag: "2025 · WEB + FORMAZIONE",
    },
  ] : [
    {
      key: "law-firm",
      ind: "Professional firm · Milan",
      nm: "Institutional site & client portal",
      problem: "Static 2014 website, no leads, processes via email.",
      ptext: "We redesigned the digital identity and built a private client area: documents, invoices and bookings in one place. The main site now loads under one second.",
      mBefore: { v: "5.8s", d: "median LCP" },
      mAfter:  { v: "0.7s", d: "median LCP" },
      quote: "“For the first time in ten years, clients write to say the site is clear.”",
      attr: "— M., partner",
      tag: "2025 · WEB + SOFTWARE",
    },
    {
      key: "manufacturer",
      ind: "Manufacturing SMB · Brianza",
      nm: "B2B product configurator",
      problem: "PDF catalogs, Excel price lists, quotes that took two days.",
      ptext: "A web configurator connected to the ERP: sales builds a quote in 6 minutes, the client receives a signed PDF. Onboarding done in two half-days.",
      mBefore: { v: "2 d", d: "avg quote time" },
      mAfter:  { v: "6 min", d: "avg quote time" },
      quote: "“We cut customer follow-up questions by 40%.”",
      attr: "— S., head of sales",
      tag: "2024 · SOFTWARE",
    },
    {
      key: "school",
      ind: "Training institute · Milan",
      nm: "Courses & community platform",
      problem: "Three disconnected platforms — Moodle, Zoom, WhatsApp.",
      ptext: "A single platform with on-demand and live courses, auto-graded exercises and a community. WordPress + headless. Supports 2,000 active students.",
      mBefore: { v: "31%", d: "completion rate" },
      mAfter:  { v: "78%", d: "completion rate" },
      quote: "“Students come back for the community, stay for the courses.”",
      attr: "— G., academic director",
      tag: "2025 · WEB + TRAINING",
    },
  ];

  const [i, setI] = useStateH(0);
  const cur = cases[i];

  return (
    <section className="section" style={{paddingTop: 0}}>
      <div className="wrap-wide">
        <div className="section-head">
          <div>
            <div className="sec-num">{t.num}</div>
            <h2 style={{whiteSpace:"pre-line"}}>{t.h}</h2>
          </div>
          <p className="lede">{t.lede}</p>
        </div>

        <div className="cases">
          <div className="case-tabs" role="tablist">
            {cases.map((c, idx) => (
              <button
                key={c.key}
                role="tab"
                aria-selected={idx === i}
                className={"case-tab " + (idx === i ? "is-on" : "")}
                onClick={() => setI(idx)}
              >
                <span className="num">— 0{idx+1}</span>
                <span className="nm">{c.nm}</span>
                <span className="ind">{c.ind}</span>
              </button>
            ))}
          </div>

          <div className="case-body">
            <div className="case-media" key={"m-" + i}>
              <span className="tag">{cur.tag}</span>
              <image-slot
                id={"case-" + cur.key}
                shape="rect"
                placeholder={lang === "it" ? "Trascina la foto del progetto qui" : "Drop project photo here"}
              ></image-slot>
            </div>
            <div className="case-info" key={"i-" + i}>
              <span className="problem-label">{lang === "it" ? "Il problema" : "The problem"}</span>
              <h3>{cur.problem}</h3>
              <p className="ptext">{cur.ptext}</p>

              <div className="case-metrics">
                <div className="col">
                  <span className="lab">{lang === "it" ? "Prima" : "Before"}</span>
                  <span className="val">{cur.mBefore.v}</span>
                  <span className="det">{cur.mBefore.d}</span>
                </div>
                <div className="ar">→</div>
                <div className="col">
                  <span className="lab">{lang === "it" ? "Dopo" : "After"}</span>
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
      </div>
    </section>
  );
}

/* ============================================================
   §03 — Manifesto (4 pillars)
   ============================================================ */
function Manifesto({ lang }) {
  const t = lang === "it" ? {
    num: "§03 · MANIFESTO",
    h: "Come\nlavoriamo.",
    lede: "Quattro principi che applichiamo a ogni progetto, anche quando nessuno ci guarda.",
    pillars: [
      { n: "I",   t: "Il codice è materia.",  d: "Lo scriviamo a mano, lo trattiamo come si tratta il legno o il metallo: con attenzione, senza scorciatoie, sapendo che qualcun altro lo leggerà." },
      { n: "II",  t: "La calma è un metodo.", d: "Non rispondiamo in cinque minuti, ma in cinque ore lavorate. Ti diamo il tempo per pensare, lo prendiamo per fare." },
      { n: "III", t: "Diciamo di no.",        d: "Se non è la cosa giusta per te, lo diciamo. Indicare la porta giusta è parte del lavoro, anche quando non porta a noi." },
      { n: "IV",  t: "Insegniamo quello che sappiamo.", d: "Quello che impariamo lo restituiamo in corsi, kit e articoli. La conoscenza serve poco se resta chiusa in uno studio." },
    ],
  } : {
    num: "§03 · MANIFESTO",
    h: "How we work.",
    lede: "Four principles we apply to every project, even when nobody is watching.",
    pillars: [
      { n: "I",   t: "Code is material.",     d: "We write it by hand, treating it like wood or metal: with care, no shortcuts, knowing someone else will read it." },
      { n: "II",  t: "Calm is a method.",     d: "We don't answer in five minutes; we answer in five worked hours. You get time to think, we take time to act." },
      { n: "III", t: "We say no.",            d: "If it's not the right thing for you, we say so. Pointing to the right door is part of the job, even when it doesn't lead to us." },
      { n: "IV",  t: "We teach what we know.", d: "What we learn we give back as courses, kits and articles. Knowledge serves little if it stays locked in a studio." },
    ],
  };
  return (
    <section className="manifesto">
      <div className="wrap-wide">
        <div className="section-head">
          <div>
            <div className="sec-num">{t.num}</div>
            <h2 style={{whiteSpace:"pre-line"}}>{t.h}</h2>
          </div>
          <p className="lede">{t.lede}</p>
        </div>
        <div className="pillars">
          {t.pillars.map(p => (
            <div className="pillar" key={p.n}>
              <div className="p-num">PILASTRO {p.n}</div>
              <div className="p-strut" />
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   §04 — Final CTA
   ============================================================ */
function CTAFinal({ lang }) {
  const t = lang === "it" ? {
    num: "§04 · CONTATTI",
    h: <>Hai un progetto?<br/><span className="underline">Parliamone.</span></>,
    sub: "Una call di trenta minuti per capirci. Niente vendite, niente pressioni. Ti diciamo subito se possiamo aiutarti e in che modo.",
    grid: [
      { k: "Scrivici", v: "ciao@alpacode.it", href: "mailto:ciao@alpacode.it" },
      { k: "Prenota una call", v: "30 min · gratis", href: "contatti.html" },
      { k: "Sede", v: "Monza · Milano · IT" },
    ],
    cta: "Apri il modulo di contatto",
  } : {
    num: "§04 · CONTACT",
    h: <>Have a project?<br/><span className="underline">Let's talk.</span></>,
    sub: "A thirty-minute call to understand. No sales, no pressure. We'll tell you right away if we can help, and how.",
    grid: [
      { k: "Write us", v: "ciao@alpacode.it", href: "mailto:ciao@alpacode.it" },
      { k: "Book a call", v: "30 min · free", href: "contatti.html" },
      { k: "Studio", v: "Monza · Milan · IT" },
    ],
    cta: "Open the contact form",
  };
  return (
    <section className="cta-final">
      <div className="wrap-wide">
        <div className="sec-num" style={{fontFamily:"var(--t-mono)",fontSize:11,color:"var(--blue)",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>{t.num}</div>
        <div className="display">{t.h}</div>
        <div className="sub">{t.sub}</div>
        <div className="cta-grid">
          {t.grid.map(g => (
            <div className="cell" key={g.k}>
              <span className="k">{g.k}</span>
              {g.href ? <a href={g.href}><span className="v">{g.v} →</span></a> : <span className="v">{g.v}</span>}
            </div>
          ))}
        </div>
        <div style={{marginTop:36}}>
          <a className="btn btn-blue" href="contatti.html">{t.cta} <span className="arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Home page
   ============================================================ */
function HomePage() {
  return (
    <Layout active="home">
      {(lang) => (
        <React.Fragment>
          <Hero lang={lang} />
          <Verbs lang={lang} />
          <Cases lang={lang} />
          <Manifesto lang={lang} />
          <CTAFinal lang={lang} />
        </React.Fragment>
      )}
    </Layout>
  );
}

Object.assign(window, { HomePage, Hero, Verbs, Cases, Manifesto, CTAFinal });
