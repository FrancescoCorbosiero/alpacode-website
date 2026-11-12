/*!
 * <alpacode-badge> — the credit badge for the sites Alpacode builds.
 * https://alpacode.it · self-contained, no dependencies, ~9 KB (~3 KB gzipped).
 *
 * Served by alpacode.it (public/badge.js); a client site's footer gets:
 *   <script src="https://alpacode.it/badge.js" defer></script>
 *   <alpacode-badge lang="it" theme="light">
 *     <a href="https://alpacode.it/">Realizzato da Alpacode</a>
 *   </alpacode-badge>
 * Change it here and every site that loads it changes with it: keep the
 * tag name and the attributes stable, and never break the fallback.
 *
 * Attributes
 *   lang     "it" (default) | "en"
 *   theme    "light" | "dark" | "auto" (default: follows prefers-color-scheme)
 *   compact  present: the window with the alpaca only (label for screen readers)
 *   rel      the link's rel (default "noopener"; e.g. "noopener nofollow")
 *
 * The light-DOM <a> is the backlink: it sits in the page's HTML, so
 * crawlers read it whether or not they run JS, and it is what shows if
 * the script can't load. With JS the shadow badge takes its place.
 *
 * The move, born from the brand: a glass pane with the house's blue
 * strut, and the alpaca behind a little window. At rest only its head
 * peeks over the sill; on hover it rises, nods at the wordmark and
 * flicks an ear, the strut runs the wordmark's width, a band of light
 * crosses the glass and the name rolls to the address. Now and then,
 * idle, the ear flicks on its own. Under prefers-reduced-motion it
 * simply stands there.
 */
(() => {
  if (typeof window === "undefined" || !window.customElements) return;
  if (customElements.get("alpacode-badge")) return;

  const HOME = "https://alpacode.it/";
  const COPY = {
    it: { kicker: "Realizzato da", url: "alpacode.it", label: "Realizzato da Alpacode, alpacode.it" },
    en: { kicker: "Made by", url: "alpacode.it", label: "Made by Alpacode, alpacode.it" },
  };

  // The alpaca, drawn once for the house (src/components/Alpaca.astro):
  // one path, cut by clip paths into body, neck + head, ear.
  const SHAPE =
    "M55 20 Q55 9 57 2 Q60 7 61.5 13.5 L63.5 13 Q65 6 68 1 Q70 7 69.5 13.5 Q76 12 80 17 L87 21.5 Q90.5 23.5 89.5 27 Q88.5 30.5 84 30.5 L76.5 31 Q71 32 70 38 L69.5 57 Q73.5 66 70.5 77 L71 116 Q71 118 69 118 L65 118 L64 89 L62 89 L61.5 117 L56.5 117 L56 85 Q42 90 29.5 85 L29.5 117 L24 117 L23 94 L21 94 L20.5 117 L15 117 L14.5 85 Q8.5 78 9 67 Q9 60 12 57 Q6.5 56.5 7 52.5 Q8 48.5 13.5 50.5 Q31 45.5 49.5 48.5 Q55 49.5 55 43 L55 26 Z";

  const ALPACA = `
<svg class="alpaca" viewBox="0 0 100 120" aria-hidden="true" focusable="false">
  <defs>
    <path id="s" d="${SHAPE}"/>
    <clipPath id="c-body"><polygon points="-1,-1 40,-1 40,41.5 101,41.5 101,121 -1,121"/></clipPath>
    <clipPath id="c-neck"><polygon points="40,42 40,-1 63.2,-1 63.2,13.3 69.9,13.3 69.9,-1 101,-1 101,42"/><circle cx="62.46" cy="42" r="7.46"/></clipPath>
    <clipPath id="c-ear"><polygon points="63.2,-1 69.9,-1 69.9,13.8 63.2,13.8"/><circle cx="66.5" cy="13.3" r="3"/></clipPath>
  </defs>
  <g fill="currentColor">
    <use href="#s" clip-path="url(#c-body)"/>
    <g class="neck">
      <use href="#s" clip-path="url(#c-neck)"/>
      <g class="ear"><use href="#s" clip-path="url(#c-ear)"/></g>
    </g>
  </g>
</svg>`;

  const CSS = `
:host {
  --ab-blue: #3b72e9;
  --ab-ink: #0b0e14;
  --ab-paper: #f0f3f9;
  --ab-fg: var(--ab-ink);
  --ab-mute: #465065;
  --ab-glass: rgba(255, 255, 255, 0.55);
  --ab-edge: rgba(255, 255, 255, 0.95);
  --ab-line: rgba(39, 86, 194, 0.18);
  --ab-win: rgba(59, 114, 233, 0.1);
  --ab-shine: rgba(255, 255, 255, 0.75);
  --ab-ease: cubic-bezier(0.19, 1, 0.22, 1);
  --ab-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  -webkit-tap-highlight-color: transparent;
}
:host([theme="dark"]) {
  --ab-fg: var(--ab-paper);
  --ab-mute: rgba(240, 243, 249, 0.66);
  --ab-glass: rgba(11, 14, 20, 0.55);
  --ab-edge: rgba(240, 243, 249, 0.22);
  --ab-line: rgba(240, 243, 249, 0.16);
  --ab-win: rgba(59, 114, 233, 0.2);
  --ab-shine: rgba(240, 243, 249, 0.18);
}
@media (prefers-color-scheme: dark) {
  :host(:not([theme="light"]):not([theme="dark"])) {
    --ab-fg: var(--ab-paper);
    --ab-mute: rgba(240, 243, 249, 0.66);
    --ab-glass: rgba(11, 14, 20, 0.55);
    --ab-edge: rgba(240, 243, 249, 0.22);
    --ab-line: rgba(240, 243, 249, 0.16);
    --ab-win: rgba(59, 114, 233, 0.2);
    --ab-shine: rgba(240, 243, 249, 0.18);
  }
}
a {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 16px 0 4px;
  box-sizing: border-box;
  color: var(--ab-fg);
  text-decoration: none;
  background: var(--ab-glass);
  -webkit-backdrop-filter: blur(16px) saturate(1.5);
  backdrop-filter: blur(16px) saturate(1.5);
  border: 1px solid var(--ab-line);
  box-shadow: inset 0 1px 0 var(--ab-edge), 0 10px 30px -18px rgba(39, 86, 194, 0.55);
  overflow: hidden;
  font-family: "Manrope", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  transition: transform 0.6s var(--ab-ease), box-shadow 0.6s var(--ab-ease);
}
:host([compact]) a { padding-right: 4px; }
a:focus-visible { outline: 2px solid var(--ab-blue); outline-offset: 3px; }
/* The band of light that crosses the glass. */
a::after {
  content: "";
  position: absolute;
  inset: -1px auto -1px 0;
  width: 60%;
  background: linear-gradient(100deg, transparent 0%, var(--ab-shine) 50%, transparent 100%);
  transform: translateX(-120%) skewX(-18deg);
  pointer-events: none;
}
/* The window: the alpaca lives behind it, sill at the bottom. */
.win {
  position: relative;
  flex: none;
  width: 38px;
  height: 38px;
  overflow: hidden;
  background: var(--ab-win);
  color: var(--ab-blue);
  box-shadow: inset 0 -2px 0 var(--ab-blue);
}
.alpaca {
  position: absolute;
  left: -17px;
  top: 0;
  width: 50px;
  height: 60px;
  overflow: visible;
  transform: translateY(15px);
  transition: transform 0.7s var(--ab-back);
}
.neck { transform-box: view-box; transform-origin: 62.46px 42px; transition: transform 0.6s var(--ab-back) 0.08s; }
.ear { transform-box: view-box; transform-origin: 66.5px 13.3px; animation: ab-idle 9s 3s infinite; }
.txt { display: flex; flex-direction: column; gap: 5px; }
:host([compact]) .txt {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip-path: inset(50%); white-space: nowrap;
}
.k {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--ab-mute);
}
.w {
  position: relative;
  display: block;
  height: 15px;
  overflow: hidden;
}
.roll { display: flex; flex-direction: column; transition: transform 0.6s var(--ab-ease); }
.roll > span {
  display: block;
  height: 15px;
  font-family: "Archivo Black", "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-weight: 900;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.roll > span:last-child { font-size: 13px; letter-spacing: 0; }
.roll i { font-style: normal; color: var(--ab-blue); }
.strut {
  display: block;
  width: 26px;
  height: 3px;
  margin-top: -1px;
  background: var(--ab-blue);
  transition: width 0.5s var(--ab-ease);
}

@media (hover: hover) {
  a:hover { transform: translateY(-2px); box-shadow: inset 0 1px 0 var(--ab-edge), 0 16px 34px -18px rgba(39, 86, 194, 0.7); }
  a:hover::after { transform: translateX(260%) skewX(-18deg); transition: transform 0.9s var(--ab-ease); }
  a:hover .alpaca { transform: translateY(2px); }
  a:hover .neck { transform: rotate(9deg); }
  a:hover .ear { animation: ab-flick 0.5s 0.45s 2; }
  a:hover .roll { transform: translateY(-15px); }
  a:hover .strut { width: 100%; }
}
a:focus-visible .alpaca { transform: translateY(2px); }
a:focus-visible .roll { transform: translateY(-15px); }
a:focus-visible .strut { width: 100%; }
/* A tap: the alpaca hops. */
a:active .alpaca { transform: translateY(-3px); transition-duration: 0.18s; }

@keyframes ab-flick { 0%, 100% { transform: rotate(0); } 40% { transform: rotate(-22deg); } }
@keyframes ab-idle {
  0%, 92%, 100% { transform: rotate(0); }
  95% { transform: rotate(-24deg); }
  97% { transform: rotate(4deg); }
}
@media (prefers-reduced-motion: reduce) {
  *, a::after { transition: none !important; animation: none !important; }
  a::after { display: none; }
  .alpaca, a:hover .alpaca { transform: translateY(10px); }
  a:hover, a:active { transform: none; }
}
`;

  // One stylesheet shared by every badge on the page; null where the
  // browser can't construct one (then the inline <style> fallback is used).
  let SHEET;
  const sharedSheet = () => {
    if (SHEET === undefined) {
      try {
        SHEET = new CSSStyleSheet();
        SHEET.replaceSync(CSS);
      } catch {
        SHEET = null;
      }
    }
    return SHEET;
  };

  class AlpacodeBadge extends HTMLElement {
    static get observedAttributes() { return ["lang", "rel", "compact"]; }

    connectedCallback() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
        // Styles through a constructable stylesheet: a site's
        // Content-Security-Policy (style-src without 'unsafe-inline')
        // doesn't block it, while it blocks an inline <style>.
        const sheet = sharedSheet();
        if (sheet) this.shadowRoot.adoptedStyleSheets = [sheet];
      }
      this.render();
    }

    attributeChangedCallback() {
      if (this.shadowRoot) this.render();
    }

    render() {
      const lang = (this.getAttribute("lang") || document.documentElement.lang || "it").slice(0, 2) === "en" ? "en" : "it";
      const t = COPY[lang];
      const host = location.hostname.replace(/^www\./, "");
      const url = new URL(lang === "en" ? HOME + "en/" : HOME);
      url.searchParams.set("utm_source", host || "badge");
      url.searchParams.set("utm_medium", "credit-badge");
      url.searchParams.set("utm_campaign", "made-by");
      const rel = this.getAttribute("rel") || "noopener";

      this.shadowRoot.innerHTML = `${(this.shadowRoot.adoptedStyleSheets || []).length ? "" : `<style>${CSS}</style>`}
<a part="badge" href="${url}" target="_blank" rel="${rel}" aria-label="${t.label}">
  <span class="win">${ALPACA}</span>
  <span class="txt">
    <span class="k">${t.kicker}</span>
    <span class="w"><span class="roll"><span>ALPACODE</span><span>${t.url} <i>&#8599;</i></span></span></span>
    <span class="strut"></span>
  </span>
</a>`;
    }
  }

  customElements.define("alpacode-badge", AlpacodeBadge);
})();
