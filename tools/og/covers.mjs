/* ============================================================
   Blog cover specs — rendered by render.mjs into
   src/assets/blog/<slug>.png (1200×630), referenced from each
   post's `cover` frontmatter and reused as its og:image.

   Title lines are broken BY HAND: display type at this size is
   a typographic decision, not a text-wrapping problem. Keep
   every line under ~17 characters. Copy is Italian — the brand
   is IT-first and the covers are shared across locales.
   ============================================================ */

/** @typedef {{ slug: string, category: string, date: string,
 *              lines: string[], accent: string, lede: string }} CoverSpec */

/** @type {CoverSpec[]} */
export const COVERS = [
  {
    slug: "trovare-clienti-attivita",
    category: "CRESCITA",
    date: "05 — 2026",
    lines: ["COME TROVARE", "I PRIMI CLIENTI"],
    accent: "ONLINE, NEL 2026.",
    lede: "Una guida pratica per farsi trovare e scegliere — senza budget da multinazionale.",
  },
  {
    slug: "trovare-clienti-web-master",
    category: "PROFESSIONE",
    date: "05 — 2026",
    lines: ["TROVARE CLIENTI", "COME WEB MASTER"],
    accent: "NEL 2026.",
    lede: "Saper costruire siti è metà del lavoro. L'altra metà è farsi trovare.",
  },
  {
    slug: "wordpress-re-del-web",
    category: "WEB",
    date: "05 — 2026",
    lines: ["PERCHÉ WORDPRESS", "È ANCORA"],
    accent: "UNA GARANZIA.",
    lede: "Vent'anni dopo, WordPress fa girare più web di chiunque altro.",
  },
];

const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** Same visual DNA as the tools/og cards: ink field, blue dots,
 *  mono kickers, Archivo Black headline with a blue accent line. */
export function coverSvg({ category, date, lines, accent, lede, slug }) {
  const headline = lines
    .map((l, i) => `<text x="80" y="${292 + i * 76}">${esc(l)}</text>`)
    .join("\n    ");
  const accentY = 292 + lines.length * 76;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <pattern id="dots" patternUnits="userSpaceOnUse" width="26" height="26">
      <circle cx="2" cy="2" r="1.6" fill="#3B72E9" fill-opacity="0.22"/>
    </pattern>
    <radialGradient id="spot" cx="85%" cy="15%" r="55%">
      <stop offset="0%" stop-color="#3B72E9" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#3B72E9" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vignette" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0A0A0A" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0A0A0A" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0A0A0A"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#spot)"/>
  <rect width="1200" height="630" fill="url(#vignette)" opacity="0.55"/>
  <rect x="0" y="0" width="1200" height="8" fill="#3B72E9"/>
  <g font-family="JetBrains Mono, ui-monospace, monospace" fill="#8A857A" font-size="14" letter-spacing="2.8">
    <text x="80" y="80">ALPACODE · BLOG</text>
  </g>
  <g font-family="JetBrains Mono, ui-monospace, monospace" font-size="16" letter-spacing="3.2">
    <rect x="80" y="160" width="14" height="14" fill="#3B72E9"/>
    <text x="106" y="172" fill="#3B72E9">${esc(category)} · ${esc(date)}</text>
  </g>
  <rect x="80" y="220" width="120" height="8" fill="#3B72E9"/>
  <g font-family="Archivo Black, Helvetica, Arial, sans-serif" font-size="72" fill="#F4F1E8">
    ${headline}
  </g>
  <g font-family="Archivo Black, Helvetica, Arial, sans-serif" font-size="72" fill="#3B72E9">
    <text x="80" y="${accentY}">${esc(accent)}</text>
  </g>
  <g font-family="Manrope, Helvetica, Arial, sans-serif" font-size="22" fill="#B3B0A8">
    <text x="80" y="506">${esc(lede)}</text>
  </g>
  <g font-family="JetBrains Mono, ui-monospace, monospace" font-size="14" letter-spacing="2.4" fill="#8A857A">
    <text x="80" y="582">BLOG · ${esc(slug.toUpperCase())}</text>
    <text x="1120" y="582" text-anchor="end" fill="#3B72E9">ALPACODE.IT</text>
  </g>
</svg>`;
}
