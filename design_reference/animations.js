/* ============================================================
   Alpacode v2 — Motion
   Vanilla JS. No deps. Pairs with [data-reveal] in styles.css.
   ============================================================ */
(function () {
  if (window.__alpaMotion) return;
  window.__alpaMotion = true;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Selectors that automatically receive a data-reveal treatment. */
  var rules = [
    // Section heads slide up
    { sel: ".section-head .sec-num",  kind: "up",   delay: 0   },
    { sel: ".section-head h2",        kind: "rise", delay: 100 },
    { sel: ".section-head .lede",     kind: "up",   delay: 250 },

    // Verbs cards stagger
    { sel: ".verbs .verb",            kind: "up",   delay: 0, stagger: 110 },

    // Case picker shell
    { sel: ".cases",                  kind: "rise", delay: 0   },

    // Manifesto pillars
    { sel: ".pillars .pillar",        kind: "up",   delay: 0, stagger: 100 },

    // CTA final
    { sel: ".cta-final .display",     kind: "rise", delay: 0   },
    { sel: ".cta-final .sub",         kind: "up",   delay: 200 },
    { sel: ".cta-grid",               kind: "up",   delay: 300 },

    // Services page rows
    { sel: ".svc-row",                kind: "up",   delay: 0, stagger: 80 },

    // Work grid
    { sel: ".work",                   kind: "up",   delay: 0, stagger: 80 },

    // Courses
    { sel: ".course",                 kind: "up",   delay: 0, stagger: 90 },

    // Blog rows
    { sel: ".blog-row",               kind: "up",   delay: 0, stagger: 50 },

    // FAQ items
    { sel: ".faq-item",               kind: "up",   delay: 0, stagger: 50 },

    // Footer
    { sel: ".foot-brand",             kind: "up",   delay: 0   },
    { sel: ".foot-col",               kind: "up",   delay: 0, stagger: 90 },
    { sel: ".foot-brand .big-bar",    kind: "bar",  delay: 200 },

    // Generic struts and rules visible in viewport wipe in
    { sel: ".strut-short",            kind: "bar",  delay: 0   },
  ];

  function tagAndObserve() {
    if (reduced) return; // honor reduced motion

    rules.forEach(function (r) {
      var els = document.querySelectorAll(r.sel);
      els.forEach(function (el, i) {
        if (el.hasAttribute("data-reveal")) return;
        el.setAttribute("data-reveal", r.kind);
        var d = (r.delay || 0) + ((r.stagger || 0) * i);
        if (d) el.style.setProperty("--d", d + "ms");
      });
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.setAttribute("data-shown", "");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      // If already in viewport at boot, mark immediately (no wait)
      var r2 = el.getBoundingClientRect();
      if (r2.top < window.innerHeight && r2.bottom > 0) {
        // Still observe for the transition to start on next frame.
        io.observe(el);
      } else {
        io.observe(el);
      }
    });
  }

  /* Hero on-load: tag the wordmark rows, then flip .is-loaded */
  function loadHero() {
    var hero = document.querySelector(".hero");
    if (hero) {
      hero.setAttribute("data-hero", "");
      var wm = hero.querySelector(".hero-wordmark");
      if (wm) {
        var rows = wm.querySelectorAll(".row");
        if (rows[0]) rows[0].classList.add("row-1");
        if (rows[1]) rows[1].classList.add("row-2");
      }
      // Index meta cells for staggered tail
      hero.querySelectorAll(".hero-meta-row .cell").forEach(function (c, i) {
        c.style.setProperty("--cell-i", i);
      });
      if (reduced) {
        hero.setAttribute("data-loaded", "");
      } else {
        setTimeout(function () { hero.setAttribute("data-loaded", ""); }, 40);
      }
    }
    var ph = document.querySelector(".page-hero");
    if (ph) {
      if (reduced) ph.setAttribute("data-loaded", "");
      else setTimeout(function () { ph.setAttribute("data-loaded", ""); }, 40);
    }
  }

  /* React renders late: wait until #app has actual content. */
  function whenMounted(cb) {
    var app = document.getElementById("app");
    if (!app) { cb(); return; }
    if (app.children.length > 0) { cb(); return; }
    var mo = new MutationObserver(function () {
      if (app.children.length > 0) {
        mo.disconnect();
        // Give React one extra tick to finish committing subtree
        setTimeout(cb, 30);
      }
    });
    mo.observe(app, { childList: true, subtree: false });
  }

  function boot() {
    whenMounted(function () {
      loadHero();
      tagAndObserve();
      /* Re-scan after any subsequent dom changes (case-picker swap,
         lang toggle, etc.). Cheap throttle. */
      var rescanT = null;
      var rescan = function () {
        clearTimeout(rescanT);
        rescanT = setTimeout(tagAndObserve, 80);
      };
      var mo = new MutationObserver(rescan);
      mo.observe(document.getElementById("app"), {
        childList: true,
        subtree: true,
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
