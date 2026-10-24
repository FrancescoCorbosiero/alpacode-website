/* ============================================================
   Alpacode Studio share cards — rendered by render.mjs into
   sites/studio/public/og-studio*.png (1200×630), one per page.

   The card says what the page says: the hook with its correction
   (the worry struck through, the turn in a volt sticker), the page's
   word huge and hollow behind it, and where it lives. Copy kept in
   step with sites/studio/src/data/pages.ts. Laid out as HTML inside
   the SVG (foreignObject): the stickers size themselves to their
   words.
   ============================================================ */

/** @typedef {(string | { from: string, to: string })[]} Hook */
/** @typedef {{ name: string, sticker: string, hook: Hook, ghost: string,
 *              line: string, size?: number }} StudioCard */

/** @type {StudioCard[]} */
export const STUDIO_CARDS = [
  {
    name: "og-studio",
    sticker: "Alpacode Studio",
    hook: ["Il tuo brand ", { from: "si perde nel feed?", to: "si fa ricordare." }],
    ghost: "STUDIO",
    line: "Social · Brand · UX · Campagne · SEO",
    size: 76,
  },
  {
    name: "og-studio-servizi",
    sticker: "Servizi",
    hook: ["Marketing ", { from: "a caso?", to: "con un metodo." }],
    ghost: "METODO",
    line: "Farsi vedere · farsi ricordare · farsi scegliere",
    size: 84,
  },
  {
    name: "og-studio-pacchetti",
    sticker: "Pacchetti",
    hook: [{ from: "Non sai da dove partire?", to: "Parti da qui." }],
    ghost: "PRONTI",
    line: "Social Start · Social ogni mese · Brand Kit · Landing & ADV",
    size: 90,
  },
  {
    name: "og-studio-prodotti",
    sticker: "Fai da te",
    hook: ["Fallo ", { from: "fare a qualcuno?", to: "da te." }],
    ghost: "DA TE",
    line: "Guide e crash course firmati Alpacode",
    size: 96,
  },
  {
    name: "og-studio-guida",
    sticker: "Guida · 22 €",
    hook: ["Un sito vetrina costa ", { from: "migliaia di euro?", to: "zero." }],
    ghost: "SITO",
    line: "La guida 22 € · con il modulo Marketing 70 €",
    size: 74,
  },
  {
    name: "og-studio-corso",
    sticker: "Crash course",
    hook: [{ from: "Temi", to: "Cavalca" }, " l'AI."],
    ghost: "AI",
    line: "«AI al lavoro», per partite IVA",
    size: 100,
  },
];

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** @param {StudioCard} card */
export function studioSvg({ sticker, hook, ghost, line, size = 84 }) {
  const h = hook
    .map((seg) => (typeof seg === "string" ? esc(seg) : `<s>${esc(seg.from)}</s><b>${esc(seg.to)}</b>`))
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <foreignObject x="0" y="0" width="1200" height="630">
    <div xmlns="http://www.w3.org/1999/xhtml" class="c">
      <style>
        .c{position:relative;width:1200px;height:630px;overflow:hidden;background:#0B0E14;color:#F0F3F9;font-family:Manrope,sans-serif}
        .ghost{position:absolute;right:-40px;bottom:-110px;font:400 400px/0.8 "Archivo Black";letter-spacing:-0.04em;color:transparent;-webkit-text-stroke:2px rgba(240,243,249,.09);transform:rotate(-8deg);white-space:nowrap}
        .brand{position:absolute;left:72px;top:58px;display:flex;align-items:center;gap:12px;font:400 26px/1 "Archivo Black"}
        .pill{display:inline-block;padding:9px 15px 8px;border-radius:999px;background:#D4FF3A;color:#0B0E14;font:400 17px/1 "Archivo Black";letter-spacing:.02em;text-transform:uppercase;transform:rotate(-3deg)}
        .brand .pill{font-size:15px;padding:7px 12px 6px}
        .copy{position:absolute;left:72px;top:150px;width:860px}
        .copy .pill{margin-bottom:26px}
        h1{margin:0;font:400 ${size}px/0.92 "Archivo Black";letter-spacing:-0.02em;text-transform:uppercase}
        h1 s{text-decoration:none;white-space:nowrap;color:#A3ABBB;font-size:.42em;vertical-align:.62em;margin-right:.2em;background:linear-gradient(#FF5A3C,#FF5A3C) no-repeat 0 55%/100% .11em}
        h1 b{font-weight:400;display:inline-block;padding:.02em .14em 0;border-radius:.14em;background:#D4FF3A;color:#0B0E14;transform:rotate(-1.5deg)}
        .foot{position:absolute;left:72px;right:72px;bottom:52px;display:flex;justify-content:space-between;align-items:baseline;gap:24px;font:800 22px/1.2 Manrope}
        .foot span{color:#A3ABBB;font-weight:700;font-size:20px}
        .dots{position:absolute;right:72px;top:62px;display:flex;gap:10px}
        .dots i{width:18px;height:18px;border-radius:50%}
      </style>
      <div class="ghost">${esc(ghost)}</div>
      <div class="brand">ALPACODE <span class="pill">Studio</span></div>
      <div class="dots"><i style="background:#FF2E88"></i><i style="background:#FF6B1A"></i><i style="background:#2EE6C5"></i><i style="background:#D4FF3A"></i></div>
      <div class="copy">
        <span class="pill">${esc(sticker)}</span>
        <h1>${h}</h1>
      </div>
      <div class="foot">${esc(line)} <span>studio.alpacode.it</span></div>
    </div>
  </foreignObject>
</svg>`;
}
