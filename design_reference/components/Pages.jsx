/* global React, Layout, CTAFinal */
const { useState: useStateP } = React;

/* ============================================================
   Generic page hero
   ============================================================ */
function PageHero({ crumb, h1Bar, h1, lede }) {
  return (
    <section className="page-hero">
      <div className="wrap-wide">
        <div className="crumb">{crumb}</div>
        <h1>
          {h1Bar && <span className="bar" aria-hidden="true" />}
          {h1}
        </h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </section>
  );
}

/* ============================================================
   SERVIZI page
   ============================================================ */
function ServiziPage() {
  return (
    <Layout active="servizi">
      {(lang) => {
        const t = lang === "it" ? {
          crumb: "§02 · SERVIZI",
          h1: <>Costruire. Consigliare.<br/>Insegnare.</>,
          lede: "Tre aree, otto anni di pratica. Niente bundle gonfi, niente upsell. Ti diciamo prima cosa serve e quanto costa.",
          rows: [
            { n: "01", t: "Sviluppo siti & web app", d: "Costruiamo siti istituzionali, e-commerce, portali e prodotti SaaS su misura. WordPress quando ha senso, headless o Next.js quando serve di più. Il codice è scritto a mano, leggibile, documentato.",
              meta: [["Stack","WordPress · Next.js · Node"], ["Tempi","da 4 a 12 settimane"], ["Da","€ 8.000"]] },
            { n: "02", t: "Software & integrazioni", d: "Back-end, automazioni, integrazioni con ERP e CRM, configuratori, dashboard interne. Trasformiamo file Excel in flussi che si tengono in piedi da soli.",
              meta: [["Stack","Node · PHP · PostgreSQL"], ["Tempi","da 6 a 20 settimane"], ["Da","€ 15.000"]] },
            { n: "03", t: "Consulenza digitale", d: "Audit, scelta tecnologica, roadmap, selezione fornitori. Lavoriamo a fianco del cliente in italiano, senza fumo. A volte la consulenza si chiude in tre incontri.",
              meta: [["Formato","Remoto · in studio"], ["Tempi","da 2 a 8 settimane"], ["Da","€ 2.500"]] },
            { n: "04", t: "Performance & SEO", d: "Misuriamo, miglioriamo Core Web Vitals, sistemiamo l'indicizzazione, scriviamo schema. Senza promesse magiche: solo cose che funzionano e si verificano.",
              meta: [["Strumenti","CrUX · GSC · Looker"], ["Tempi","4 settimane"], ["Da","€ 3.500"]] },
            { n: "05", t: "Manutenzione & supporto", d: "Aggiornamenti, monitoraggio, sicurezza, backup, modifiche piccole e grandi. Un canale dedicato, risposte in mezza giornata lavorata.",
              meta: [["Formato","Mensile / annuale"], ["SLA","8h lavorate"], ["Da","€ 350/mese"]] },
            { n: "06", t: "Corsi & kit professionali", d: "Formiamo team interni, professionisti e studenti. Materiali che restano dopo il corso, esercizi reali, supporto post-aula.",
              meta: [["Formato","In aula · Remoto"], ["Durata","8 — 32 ore"], ["Da","€ 600/persona"]] },
          ],
        } : {
          crumb: "§02 · SERVICES",
          h1: <>Build. Advise.<br/>Teach.</>,
          lede: "Three areas, eight years of practice. No inflated bundles, no upsell. We tell you up front what's needed and what it costs.",
          rows: [
            { n: "01", t: "Websites & web apps", d: "We build institutional sites, e-commerce, portals and custom SaaS products. WordPress when it fits, headless or Next.js when more is needed. Code written by hand, readable, documented.",
              meta: [["Stack","WordPress · Next.js · Node"], ["Lead time","4 to 12 weeks"], ["From","€ 8,000"]] },
            { n: "02", t: "Software & integrations", d: "Back-end, automations, ERP/CRM integrations, configurators, internal dashboards. We turn Excel files into flows that stand on their own.",
              meta: [["Stack","Node · PHP · PostgreSQL"], ["Lead time","6 to 20 weeks"], ["From","€ 15,000"]] },
            { n: "03", t: "Digital consulting", d: "Audits, tech choices, roadmaps, vendor selection. Plain language, no smoke. Sometimes a consulting engagement closes in three meetings.",
              meta: [["Format","Remote · in studio"], ["Lead time","2 to 8 weeks"], ["From","€ 2,500"]] },
            { n: "04", t: "Performance & SEO", d: "We measure, improve Core Web Vitals, fix indexing, write schema. No magic promises: only things that work and can be verified.",
              meta: [["Tools","CrUX · GSC · Looker"], ["Lead time","4 weeks"], ["From","€ 3,500"]] },
            { n: "05", t: "Maintenance & support", d: "Updates, monitoring, security, backups, small and large changes. A dedicated channel, replies in half a worked day.",
              meta: [["Format","Monthly / yearly"], ["SLA","8 worked hours"], ["From","€ 350/month"]] },
            { n: "06", t: "Courses & pro kits", d: "We train internal teams, professionals and students. Materials that last beyond the course, real exercises, post-class support.",
              meta: [["Format","In person · Remote"], ["Duration","8 — 32 hours"], ["From","€ 600/person"]] },
          ],
        };
        return (
          <React.Fragment>
            <PageHero
              crumb={t.crumb}
              h1Bar={true}
              h1={t.h1}
              lede={t.lede}
            />
            <section className="section" style={{paddingTop:0}}>
              <div className="wrap-wide">
                {t.rows.map(r => (
                  <div className="svc-row" key={r.n}>
                    <div className="svc-no">{r.n}<span className="dot">.</span></div>
                    <div>
                      <h3>{r.t}</h3>
                      <p>{r.d}</p>
                      <div className="meta">
                        {r.meta.map(([k,v]) => (
                          <div key={k}>
                            <span className="k">{k}</span>
                            <span className="v">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <CTAFinal lang={lang} />
          </React.Fragment>
        );
      }}
    </Layout>
  );
}

/* ============================================================
   LAVORI page
   ============================================================ */
function LavoriPage() {
  return (
    <Layout active="lavori">
      {(lang) => {
        const t = lang === "it" ? {
          crumb: "§03 · LAVORI",
          h1: <>Sei progetti<br/>raccontati bene.</>,
          lede: "Un campione di quello che abbiamo costruito negli ultimi due anni. Le immagini sono spazi pronti per le foto reali — drag & drop dalla cartella.",
          works: [
            { y: "2025", c: "PROFESSIONISTI", t: "Studio legale · area clienti", d: "Sito istituzionale + portale documenti, fatture, agenda. LCP sotto al secondo.", tags: ["WordPress","Headless","SSO"] },
            { y: "2024", c: "MANIFATTURIERO", t: "Configuratore B2B", d: "Quotazioni da due giorni a sei minuti. Integrazione ERP, PDF firmati.", tags: ["Node","ERP","PDF"] },
            { y: "2025", c: "EDUCAZIONE",     t: "Piattaforma corsi & community", d: "On-demand, live, esercizi auto-corretti, community. 2.000 studenti attivi.", tags: ["WordPress","Next.js","LMS"] },
            { y: "2024", c: "FOOD",           t: "E-commerce per torrefazione", d: "Catalogo, abbonamento, magazzino. Tempo medio in pagina × 3.", tags: ["WooCommerce","ABO","ERP"] },
            { y: "2023", c: "CULTURA",        t: "Sito museo civico", d: "Calendario eventi, biglietteria, mostre. Trilingue, accessibile WCAG AA.", tags: ["WordPress","WCAG","i18n"] },
            { y: "2026", c: "SAAS",           t: "Dashboard analytics interna", d: "Sostituisce 4 fogli Excel. Aggiorna 30 reparti, ogni mattina alle 7.", tags: ["Next.js","ETL","BI"] },
          ],
        } : {
          crumb: "§03 · WORK",
          h1: <>Six projects,<br/>told well.</>,
          lede: "A sample of what we've built in the last two years. Images are slots — drag your own photos in.",
          works: [
            { y: "2025", c: "PROFESSIONAL",  t: "Law firm · client portal",      d: "Institutional site + document, invoices and calendar portal. LCP under one second.", tags: ["WordPress","Headless","SSO"] },
            { y: "2024", c: "MANUFACTURING", t: "B2B configurator",              d: "Quotes from two days to six minutes. ERP integration, signed PDFs.", tags: ["Node","ERP","PDF"] },
            { y: "2025", c: "EDUCATION",     t: "Courses & community platform",  d: "On-demand, live, auto-graded exercises, community. 2,000 active students.", tags: ["WordPress","Next.js","LMS"] },
            { y: "2024", c: "FOOD",          t: "Coffee roaster e-commerce",     d: "Catalog, subscription, warehouse. Time on page × 3.", tags: ["WooCommerce","Subs","ERP"] },
            { y: "2023", c: "CULTURE",       t: "Civic museum website",          d: "Event calendar, ticketing, exhibitions. Trilingual, WCAG AA accessible.", tags: ["WordPress","WCAG","i18n"] },
            { y: "2026", c: "SAAS",          t: "Internal analytics dashboard",  d: "Replaces 4 Excel sheets. Updates 30 departments every morning at 7.", tags: ["Next.js","ETL","BI"] },
          ],
        };
        return (
          <React.Fragment>
            <PageHero crumb={t.crumb} h1Bar={true} h1={t.h1} lede={t.lede} />
            <section className="section" style={{paddingTop: 56}}>
              <div className="wrap-wide">
                <div className="work-grid">
                  {t.works.map((w, i) => (
                    <article className="work" key={i}>
                      <image-slot
                        id={"work-" + i}
                        shape="rect"
                        placeholder={lang === "it" ? "Trascina la foto del progetto" : "Drop project photo"}
                      ></image-slot>
                      <div className="meta"><span>— {String(i+1).padStart(2,"0")}</span><span>{w.y} · {w.c}</span></div>
                      <h3>{w.t}</h3>
                      <p>{w.d}</p>
                      <div className="tags">
                        {w.tags.map(tg => <span className="tag" key={tg}>{tg}</span>)}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <CTAFinal lang={lang} />
          </React.Fragment>
        );
      }}
    </Layout>
  );
}

/* ============================================================
   SCUOLA page
   ============================================================ */
function ScuolaPage() {
  return (
    <Layout active="scuola">
      {(lang) => {
        const t = lang === "it" ? {
          crumb: "§04 · SCUOLA",
          h1: <>Insegnare<br/>quello che sappiamo.</>,
          lede: "Corsi e kit professionali per chi lavora con il web ogni giorno e per chi vuole imparare bene, dalla prima riga di codice.",
          courses: [
            { lvl: "FONDAMENTA", t: "WordPress Gutenberg", price: "€ 600", h: "24 ore · 6 settimane", items: ["Blocchi nativi & custom","theme.json a fondo","Full-site editing","Performance & accessibilità","Progetto finale guidato"] },
            { lvl: "INTERMEDIO", t: "Front-end moderno", price: "€ 850", h: "32 ore · 8 settimane", items: ["HTML semantico, CSS moderno","JavaScript senza framework","Accessibilità (WCAG)","Design systems & token","Build & deploy"] },
            { lvl: "AVANZATO",   t: "Back-end & API",     price: "€ 950", h: "28 ore · 7 settimane", items: ["Node ed Express","PHP moderno","REST e GraphQL","Database relazionali","Sicurezza & autenticazione"] },
            { lvl: "KIT PRO",    t: "Snippet WordPress",  price: "€ 49",  h: "Pacchetto digitale", items: ["80+ snippet pronti","Documentazione in italiano","Aggiornamenti a vita","Licenza commerciale"] },
            { lvl: "KIT PRO",    t: "Starter Next.js",    price: "€ 79",  h: "Repository + corso", items: ["Setup completo","CMS headless","Componenti base","Autenticazione","2 ore di video"] },
            { lvl: "AZIENDE",    t: "Formazione su misura", price: "Su richiesta", h: "Da 1 giornata", items: ["Calibrata sui team","Materiali brand-coerenti","In aula o remoto","Esercizi su casi reali","Supporto post-aula"] },
          ],
          target: "Per professionisti, team aziendali, studenti.",
        } : {
          crumb: "§04 · SCHOOL",
          h1: <>Teach<br/>what we know.</>,
          lede: "Courses and pro kits for people who work on the web every day, and for those who want to learn well from the first line of code.",
          courses: [
            { lvl: "FOUNDATION",  t: "WordPress Gutenberg", price: "€ 600", h: "24 hours · 6 weeks", items: ["Native & custom blocks","theme.json in depth","Full-site editing","Performance & accessibility","Guided final project"] },
            { lvl: "INTERMEDIATE", t: "Modern front-end",   price: "€ 850", h: "32 hours · 8 weeks", items: ["Semantic HTML, modern CSS","JavaScript without frameworks","Accessibility (WCAG)","Design systems & tokens","Build & deploy"] },
            { lvl: "ADVANCED",    t: "Back-end & APIs",     price: "€ 950", h: "28 hours · 7 weeks", items: ["Node and Express","Modern PHP","REST and GraphQL","Relational databases","Security & auth"] },
            { lvl: "PRO KIT",     t: "WordPress snippets",  price: "€ 49",  h: "Digital pack",       items: ["80+ ready snippets","Italian documentation","Lifetime updates","Commercial license"] },
            { lvl: "PRO KIT",     t: "Next.js starter",     price: "€ 79",  h: "Repo + course",       items: ["Full setup","Headless CMS","Base components","Authentication","2 hours of video"] },
            { lvl: "COMPANIES",   t: "Bespoke training",    price: "On request", h: "From 1 day",      items: ["Calibrated for teams","Brand-coherent materials","On-site or remote","Real-case exercises","Post-class support"] },
          ],
          target: "For professionals, internal teams, students.",
        };
        return (
          <React.Fragment>
            <PageHero crumb={t.crumb} h1Bar={true} h1={t.h1} lede={t.lede} />
            <section className="section" style={{paddingTop: 24}}>
              <div className="wrap-wide">
                <div className="eyebrow" style={{marginBottom:32}}>● {t.target}</div>
                <div className="courses">
                  {t.courses.map((c, i) => (
                    <div className="course" key={i}>
                      <span className="lvl">— {c.lvl}</span>
                      <h3>{c.t}</h3>
                      <div className="price">{c.price}</div>
                      <div className="eyebrow">{c.h}</div>
                      <ul>{c.items.map(it => <li key={it}><span>{it}</span></li>)}</ul>
                      <a className="btn btn-sm" href="contatti.html" style={{marginTop:12,alignSelf:"flex-start"}}>
                        {lang === "it" ? "Iscriviti" : "Sign up"} <span className="arrow">→</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <CTAFinal lang={lang} />
          </React.Fragment>
        );
      }}
    </Layout>
  );
}

/* ============================================================
   BLOG page
   ============================================================ */
function BlogPage() {
  return (
    <Layout active="blog">
      {(lang) => {
        const t = lang === "it" ? {
          crumb: "§05 · BLOG",
          h1: <>Note,<br/>guide e pensieri.</>,
          lede: "Quello che impariamo lo scriviamo. Articoli tecnici, ragionamenti lunghi, raramente news.",
          rows: [
            { date: "05 — 2026", cat: "TECNICA",     t: "Core Web Vitals 2026: cosa cambia davvero",                d: "Le nuove metriche e perché alcune vecchie ottimizzazioni sono diventate dannose." },
            { date: "04 — 2026", cat: "METODO",      t: "Dire di no, con eleganza",                                  d: "Come comunichiamo a un cliente che non siamo lo studio giusto per il loro progetto." },
            { date: "03 — 2026", cat: "WORDPRESS",   t: "Theme.json oltre i colori",                                 d: "Pattern, layout, spacing scale. Un theme.json scritto bene riduce il CSS del 60%." },
            { date: "02 — 2026", cat: "FRONT-END",   t: "CSS Grid sub-grid in produzione",                            d: "Sei mesi di utilizzo, gli errori che abbiamo fatto e i pattern che teniamo." },
            { date: "01 — 2026", cat: "STUDIO",      t: "Bilancio 2025 (anche di quello che non ha funzionato)",      d: "Numeri, errori, scelte non ovvie. Le cose che rifaremmo e quelle che non rifaremmo." },
            { date: "12 — 2025", cat: "CONSULENZA",  t: "Audit in tre incontri",                                     d: "Il nostro formato standard di audit tecnico: cosa guardiamo, in che ordine, perché." },
            { date: "11 — 2025", cat: "FORMAZIONE",  t: "Insegnare senza diapositive",                                d: "Da quando abbiamo smesso di usare le slide, i corsi vanno meglio. Ecco perché." },
            { date: "10 — 2025", cat: "BACK-END",    t: "PHP moderno, davvero",                                       d: "Strict types, enum, readonly. PHP 8.4 è un altro linguaggio rispetto al 5.6." },
          ],
        } : {
          crumb: "§05 · BLOG",
          h1: <>Notes,<br/>guides and thoughts.</>,
          lede: "What we learn we write. Technical articles, long-form reasoning, rarely news.",
          rows: [
            { date: "05 — 2026", cat: "TECHNIQUE",   t: "Core Web Vitals 2026: what really changes",       d: "The new metrics and why some old optimizations have become harmful." },
            { date: "04 — 2026", cat: "METHOD",      t: "Saying no, elegantly",                            d: "How we tell a client we're not the right studio for their project." },
            { date: "03 — 2026", cat: "WORDPRESS",   t: "Theme.json beyond colors",                        d: "Patterns, layouts, spacing scale. A well-written theme.json cuts CSS by 60%." },
            { date: "02 — 2026", cat: "FRONT-END",   t: "CSS Grid sub-grid in production",                  d: "Six months of use, mistakes we made and patterns we keep." },
            { date: "01 — 2026", cat: "STUDIO",      t: "2025 review (including what didn't work)",         d: "Numbers, mistakes, non-obvious choices. What we'd redo and what we wouldn't." },
            { date: "12 — 2025", cat: "CONSULTING",  t: "Audits in three meetings",                        d: "Our standard tech audit format: what we look at, in what order, why." },
            { date: "11 — 2025", cat: "TRAINING",    t: "Teaching without slides",                          d: "Since we stopped using slides, courses go better. Here's why." },
            { date: "10 — 2025", cat: "BACK-END",    t: "Modern PHP, really",                              d: "Strict types, enums, readonly. PHP 8.4 is a different language from 5.6." },
          ],
        };
        return (
          <React.Fragment>
            <PageHero crumb={t.crumb} h1Bar={true} h1={t.h1} lede={t.lede} />
            <section className="section" style={{paddingTop: 24}}>
              <div className="wrap-wide">
                <div className="blog-list">
                  {t.rows.map((r, i) => (
                    <a className="blog-row" href="#" key={i}>
                      <span className="date">{r.date}</span>
                      <h3>{r.t}<small>{r.d}</small></h3>
                      <span className="cat">{r.cat}</span>
                      <span className="arr">→</span>
                    </a>
                  ))}
                </div>
              </div>
            </section>
            <CTAFinal lang={lang} />
          </React.Fragment>
        );
      }}
    </Layout>
  );
}

/* ============================================================
   FAQ page
   ============================================================ */
function FaqPage() {
  return (
    <Layout active="faq">
      {(lang) => {
        const t = lang === "it" ? {
          crumb: "§06 · FAQ",
          h1: <>Domande<br/>frequenti.</>,
          lede: "Quelle che ci fanno davvero, raccolte qui per chi vuole capire prima di chiamare.",
          faqs: [
            { q: "Quanto costa un sito?", a: "Dipende dal sito. Un sito istituzionale curato parte da € 8.000; un e-commerce ben fatto da € 15.000; un software su misura si valuta progetto per progetto. Vi diamo una stima orientativa già nella prima call." },
            { q: "Lavorate solo a Milano?", a: "No. Abbiamo sede a Monza e Milano ma lavoriamo con clienti in tutta Italia (e qualche progetto in Svizzera e Germania). Per progetti grandi veniamo volentieri in studio del cliente per i kickoff." },
            { q: "Usate WordPress o React?", a: "Tutti e due, quando hanno senso. WordPress è ottimo per siti editoriali ed e-commerce di taglia media. React/Next.js per prodotti più complessi. Non abbiamo una preferenza dogmatica." },
            { q: "Fate manutenzione dopo la consegna?", a: "Sì, è uno dei nostri servizi. Contratti mensili da € 350 con monitoraggio, aggiornamenti, sicurezza e supporto. Si può chiudere quando si vuole." },
            { q: "I vostri corsi rilasciano un attestato?", a: "Sì, un attestato di frequenza Alpacode. Non siamo un ente accreditato MIUR ma i nostri attestati sono riconosciuti da aziende del settore e validi per la formazione professionale continua dei professionisti iscritti agli ordini." },
            { q: "Posso pagare a rate?", a: "Sì, per corsi e progetti sopra i € 5.000 offriamo rateizzazioni senza interessi su 3, 6 o 12 mesi, anche tramite Klarna o bonifici programmati." },
            { q: "Cosa succede dopo la prima call?", a: "Entro 5 giorni lavorati ricevi una proposta scritta con scope, tempi, costo e team. Niente ingaggio fino alla firma del preventivo. La prima call è gratuita e non vincolante." },
            { q: "Possiamo vedere il codice prima di firmare?", a: "Sì, su richiesta condividiamo esempi di codice di progetti precedenti (compatibilmente con gli NDA). Per progetti grandi facciamo volentieri una sessione di pair-programming dimostrativa." },
          ],
        } : {
          crumb: "§06 · FAQ",
          h1: <>Frequently<br/>asked.</>,
          lede: "The questions people actually ask, gathered here for anyone who wants to understand before calling.",
          faqs: [
            { q: "How much does a website cost?", a: "It depends on the site. A polished institutional site starts at € 8,000; a well-built e-commerce from € 15,000; custom software is evaluated project by project. We give an indicative estimate during the first call." },
            { q: "Do you only work in Milan?", a: "No. We're based in Monza and Milan but work with clients across Italy (and a few in Switzerland and Germany). For large projects we happily visit the client's office for kickoffs." },
            { q: "Do you use WordPress or React?", a: "Both, when they fit. WordPress is great for editorial sites and mid-size e-commerce. React/Next.js for more complex products. We have no dogmatic preference." },
            { q: "Do you handle maintenance after delivery?", a: "Yes, it's one of our services. Monthly contracts from € 350 with monitoring, updates, security and support. Cancel anytime." },
            { q: "Do your courses issue a certificate?", a: "Yes, an Alpacode attendance certificate. We are not a MIUR-accredited institution but our certificates are recognized by industry companies and valid for continuing professional training." },
            { q: "Can I pay in installments?", a: "Yes, for courses and projects above € 5,000 we offer interest-free installments over 3, 6 or 12 months, also via Klarna or scheduled transfers." },
            { q: "What happens after the first call?", a: "Within 5 worked days you receive a written proposal with scope, timing, cost and team. No engagement until the quote is signed. The first call is free and non-binding." },
            { q: "Can we see the code before signing?", a: "Yes, on request we share code samples from past projects (subject to NDAs). For large projects we happily do a demonstrative pair-programming session." },
          ],
        };
        const [open, setOpen] = useStateP(0);
        return (
          <React.Fragment>
            <PageHero crumb={t.crumb} h1Bar={true} h1={t.h1} lede={t.lede} />
            <section className="section" style={{paddingTop: 24}}>
              <div className="wrap-wide">
                <div className="faq-list">
                  {t.faqs.map((f, i) => (
                    <div className={"faq-item " + (open === i ? "is-open" : "")} key={i}>
                      <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                        <span className="num">— {String(i+1).padStart(2,"0")}</span>
                        <span className="q">{f.q}</span>
                        <span className="ic">{open === i ? "—" : "+"}</span>
                      </button>
                      <div className="faq-a">{f.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <CTAFinal lang={lang} />
          </React.Fragment>
        );
      }}
    </Layout>
  );
}

/* ============================================================
   CONTATTI page
   ============================================================ */
function ContattiPage() {
  return (
    <Layout active="contatti">
      {(lang) => {
        const t = lang === "it" ? {
          crumb: "§07 · CONTATTI",
          h1: <>Parliamone,<br/>con calma.</>,
          lede: "Compila il modulo o scrivici direttamente. Ti rispondiamo entro mezza giornata lavorata, in italiano, da una persona vera.",
          labels: { name: "Nome e cognome", company: "Azienda (opzionale)", email: "Email", topic: "Di cosa parliamo?", topics: ["Un nuovo progetto","Consulenza","Manutenzione","Corsi & formazione","Altro"], budget: "Budget orientativo", budgets: ["< € 5.000","€ 5.000 — 15.000","€ 15.000 — 50.000","> € 50.000","Non lo so ancora"], msg: "Raccontaci", send: "Invia il messaggio",
            consent: "Ho letto la privacy policy e acconsento al trattamento dei dati per essere ricontattato/a."
          },
          info: { h: "Diretto.", base: "Sede operativa", baseV: "Monza · Milano · IT", email: "Email", emailV: "ciao@alpacode.it", civ: "P. IVA", civV: "14463350968", hours: "Orari", hoursV: "Lun — Ven · 09:00 — 18:00 CET", reply: "Tempo di risposta", replyV: "< mezza giornata lavorata" },
        } : {
          crumb: "§07 · CONTACT",
          h1: <>Let's talk,<br/>calmly.</>,
          lede: "Fill the form or write directly. We reply within half a worked day, in English or Italian, from a real person.",
          labels: { name: "Name", company: "Company (optional)", email: "Email", topic: "What about?", topics: ["A new project","Consulting","Maintenance","Courses & training","Other"], budget: "Indicative budget", budgets: ["< € 5,000","€ 5,000 — 15,000","€ 15,000 — 50,000","> € 50,000","Not sure yet"], msg: "Tell us", send: "Send message",
            consent: "I have read the privacy policy and consent to data processing to be contacted back."
          },
          info: { h: "Direct.", base: "Studio", baseV: "Monza · Milan · IT", email: "Email", emailV: "ciao@alpacode.it", civ: "VAT", civV: "14463350968", hours: "Hours", hoursV: "Mon — Fri · 09:00 — 18:00 CET", reply: "Response time", replyV: "< half a worked day" },
        };
        const [submitted, setSubmitted] = useStateP(false);
        const onSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
        return (
          <React.Fragment>
            <PageHero crumb={t.crumb} h1Bar={true} h1={t.h1} lede={t.lede} />
            <section style={{borderTop:"1px solid var(--rule)"}}>
              <div className="wrap-wide">
                <div className="contact-grid">
                  <form className="contact-form" onSubmit={onSubmit}>
                    <div className="field">
                      <label>— {t.labels.name}</label>
                      <input required placeholder={lang === "it" ? "Mario Rossi" : "Jane Doe"} />
                    </div>
                    <div className="field">
                      <label>— {t.labels.company}</label>
                      <input placeholder={lang === "it" ? "Studio Rossi srl" : "Acme Inc."} />
                    </div>
                    <div className="field">
                      <label>— {t.labels.email}</label>
                      <input type="email" required placeholder="nome@dominio.it" />
                    </div>
                    <div className="field">
                      <label>— {t.labels.topic}</label>
                      <select defaultValue="">
                        <option value="" disabled>{lang === "it" ? "Scegli un argomento" : "Choose a topic"}</option>
                        {t.labels.topics.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>— {t.labels.budget}</label>
                      <select defaultValue="">
                        <option value="" disabled>{lang === "it" ? "Scegli una fascia" : "Choose a range"}</option>
                        {t.labels.budgets.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>— {t.labels.msg}</label>
                      <textarea rows={4} required placeholder={lang === "it" ? "Una riga sul progetto, il problema, l'obiettivo." : "A line about the project, the problem, the goal."} />
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10,padding:"18px 0"}}>
                      <input type="checkbox" required id="consent" />
                      <label htmlFor="consent" style={{fontSize:12,color:"var(--mute-2)",lineHeight:1.4}}>{t.labels.consent}</label>
                    </div>
                    <div style={{display:"flex",gap:12,alignItems:"center",paddingTop:18}}>
                      <button className="btn btn-blue" type="submit">{t.labels.send} <span className="arrow">→</span></button>
                      {submitted && <span style={{fontFamily:"var(--t-mono)",fontSize:11,letterSpacing:"0.16em",color:"var(--blue)"}}>● {lang==="it"?"GRAZIE — TI RISPONDIAMO PRESTO":"THANKS — WE'LL REPLY SOON"}</span>}
                    </div>
                  </form>

                  <aside className="contact-info">
                    <h3>{t.info.h}</h3>
                    <div className="block"><span className="k">— {t.info.email}</span><a href="mailto:ciao@alpacode.it" className="v">{t.info.emailV}</a></div>
                    <div className="block"><span className="k">— {t.info.base}</span><span className="v">{t.info.baseV}</span></div>
                    <div className="block"><span className="k">— {t.info.civ}</span><span className="v">{t.info.civV}</span></div>
                    <div className="block"><span className="k">— {t.info.hours}</span><span className="v">{t.info.hoursV}</span></div>
                    <div className="block"><span className="k">— {t.info.reply}</span><span className="v">{t.info.replyV}</span></div>
                    <div style={{marginTop:32,padding:"24px",background:"var(--ink)",color:"var(--paper)"}}>
                      <div className="eyebrow" style={{color:"var(--blue)"}}>● {lang==="it"?"DISPONIBILE":"AVAILABLE"}</div>
                      <div style={{fontFamily:"var(--display)",fontSize:24,lineHeight:1.05,marginTop:10,letterSpacing:"-0.01em"}}>{lang==="it"?"Stiamo prendendo nuovi progetti per Q3 2026.":"We're taking new projects for Q3 2026."}</div>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
          </React.Fragment>
        );
      }}
    </Layout>
  );
}

Object.assign(window, { ServiziPage, LavoriPage, ScuolaPage, BlogPage, FaqPage, ContattiPage, PageHero });
