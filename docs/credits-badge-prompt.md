# Add the «Made by Alpacode» credit badge

This site was built by Alpacode (https://alpacode.it). Add its credit badge to
the site footer. The badge is a self-contained Web Component
(`<alpacode-badge>`): one vanilla JS file, no dependencies, Shadow DOM, so
the site's CSS can't break it and it can't touch the site's CSS.

## Do this

1. **Find the stack and the footer.** Identify the framework (plain HTML,
   Astro, Next.js, Nuxt/Vue, SvelteKit, React/Vite, WordPress theme, Shopify
   theme, …) and the component/template that renders the footer on every page.

2. **Self-host the file.** Create it in the project's static folder
   (`public/`, `static/`, the theme's `assets/`, …) as
   `alpacode-badge.js`, with **exactly** the content at the end of this
   prompt. Don't edit it, don't reformat it, don't hotlink it from
   alpacode.it, don't npm-install anything.

3. **Load it once, deferred**, on every page:
   - plain HTML / Astro / SvelteKit / Nuxt: `<script src="/alpacode-badge.js" defer></script>` in the shared layout's head (Nuxt: `app.head.script`; Astro: `is:inline`).
   - Next.js: `<Script src="/alpacode-badge.js" strategy="lazyOnload" />` in the root layout.
   - WordPress: `wp_enqueue_script('alpacode-badge', get_theme_file_uri('assets/alpacode-badge.js'), [], null, ['strategy' => 'defer', 'in_footer' => true])`.
   - Shopify: `<script src="{{ 'alpacode-badge.js' | asset_url }}" defer></script>` in `theme.liquid`.

4. **Place the element** in the footer's bottom row (next to the copyright,
   or right-aligned), keeping the inner link — it's the fallback without JS
   and what crawlers read:

   ```html
   <alpacode-badge lang="it" theme="light">
     <a href="https://alpacode.it">Realizzato da Alpacode</a>
   </alpacode-badge>
   ```

   - `lang`: `it` or `en` — the page's language (on a bilingual site, bind it
     to the current locale; English fallback text: "Made by Alpacode").
   - `theme`: `light` on a light footer, `dark` on a dark one, `auto` only if
     the site itself follows the OS colour scheme. Look at the real
     footer background, don't guess.
   - `compact`: add it only if the footer has no room (it shows the alpaca
     window alone, 48×48; the label stays for screen readers).
   - Leave `rel` alone unless asked (the default is `noopener`).

5. **Framework notes.** React 18/19, Vue, Svelte render custom elements as-is:
   pass the attributes as plain strings. In TSX, if the type checker complains,
   declare it: `declare namespace JSX { interface IntrinsicElements { "alpacode-badge": any } }`
   (React 19: `declare module "react" { namespace JSX { interface IntrinsicElements { "alpacode-badge": any } } }`).
   Vue/Vite: `compilerOptions.isCustomElement = (t) => t === "alpacode-badge"`.
   If the site sends a Content-Security-Policy, `script-src 'self'` already
   covers a self-hosted file; nothing else is needed (no inline script, no
   external requests, no fonts loaded).

6. **Don't** restyle its insides, wrap it in a card, change its colours,
   or add hover effects of your own: the motion is part of it. You may set
   only its placement (margin, alignment) from outside. To align it, the
   host element is `display: inline-block` and 48px tall.

7. **Verify**: build/run the site and look at the footer at desktop width
   and at 390px: the badge reads, sits on the footer's line, doesn't overflow;
   hover it (the alpaca rises from its window and the name rolls to
   "alpacode.it ↗"); the link opens alpacode.it in a new tab. Report the
   file you added and where you placed the element.

## `alpacode-badge.js` (copy verbatim)

```js
/*!
 * <alpacode-badge> — the credit badge for the sites Alpacode builds.
 * https://alpacode.it · self-contained, no dependencies, ~9 KB (~3 KB gzipped).
 *
 * Usage (self-host this file; never hotlink it):
 *   <script src="/alpacode-badge.js" defer></script>
 *   <alpacode-badge lang="it" theme="auto">
 *     <a href="https://alpacode.it">Realizzato da Alpacode</a>
 *   </alpacode-badge>
 *
 * Attributes
 *   lang     "it" (default) | "en"
 *   theme    "light" | "dark" | "auto" (default: follows prefers-color-scheme)
 *   compact  present: the window with the alpaca only (label for screen readers)
 *   rel      the link's rel (default "noopener"; e.g. "noopener nofollow")
 *
 * The light-DOM <a> is the fallback: without JS, and for crawlers, the
 * credit is a plain link. With JS the shadow badge takes its place.
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

  class AlpacodeBadge extends HTMLElement {
    static get observedAttributes() { return ["lang", "rel", "compact"]; }

    connectedCallback() {
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
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

      this.shadowRoot.innerHTML = `<style>${CSS}</style>
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
```
