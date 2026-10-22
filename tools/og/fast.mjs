/* ============================================================
   Alpacode FAST share cards — rendered by render.mjs into
   fast/public/og-fast*.png (1200×630), one per door.

   The card says what the page says: the hook with its correction
   (the fear struck through, the turn in a volt sticker), the chat
   that answers the keyword, the keyword itself. Copy kept in step
   with fast/src/data/doors.ts. Laid out as HTML inside the SVG
   (foreignObject): the stickers size themselves to their words.
   ============================================================ */

/** @typedef {(string | { from: string, to: string })[]} Hook */
/** @typedef {{ name: string, sticker: string, hook: Hook, keyword: string,
 *              reply: string, size?: number }} FastCard */

/** @type {FastCard[]} */
export const FAST_CARDS = [
  {
    name: "og-fast",
    sticker: "Alpacode FAST",
    hook: ["L'AI ti ", { from: "ruba il", to: "porta" }, " lavoro."],
    keyword: "FAST",
    reply: "Ciao! Da dove parti? Il tuo sito da solo, l'AI sul tuo lavoro, i siti per i clienti: ti mando il link giusto.",
  },
  {
    name: "og-fast-sito",
    sticker: "Guida FAST · 22 €",
    hook: ["Un sito vetrina costa ", { from: "migliaia di euro?", to: "zero." }],
    keyword: "SITO",
    reply: "Ecco la guida Sito Vetrina: 22 €. Con il modulo Marketing, 70 €. Quale ti mando?",
    size: 74,
  },
  {
    name: "og-fast-ai",
    sticker: "Crash course",
    hook: [{ from: "Temi", to: "Cavalca" }, " l'AI."],
    keyword: "AI",
    reply: "Ecco il programma di «AI al lavoro». E il sito che costruisci nel corso, il primo anno lo ospitiamo noi.",
    size: 100,
  },
  {
    name: "og-fast-code",
    sticker: "Per sviluppatori e web designer",
    hook: ["L'AI fa i siti ", { from: "al posto tuo?", to: "per te." }],
    keyword: "CODE",
    reply: "Ecco il metodo dello studio: codebase, corso + codebase o formazione 1:1. Sviluppatore o web designer?",
  },
  {
    name: "og-fast-bio",
    sticker: "Per social media manager e creator",
    hook: ["Il tuo brand ", { from: "è un link in bio?", to: "ha un dominio." }],
    keyword: "BIO",
    reply: "Ecco il sito per creator: portfolio, media kit e contatti sul tuo dominio, 300 € l'anno.",
    size: 74,
  },
  {
    name: "og-fast-amico",
    sticker: "Segnala un amico",
    hook: ["Segnalarlo ", { from: "non costa niente.", to: "vale fino a 100 €." }],
    keyword: "AMICO",
    reply: "Ecco come funziona: crei il tuo link, lo passi, e se diventa cliente fino a 100 € sono tuoi.",
    size: 74,
  },
];

const esc = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

/** @param {FastCard} card */
export function fastSvg({ sticker, hook, keyword, reply, size = 84 }) {
  const h = hook
    .map((seg) =>
      typeof seg === "string" ? esc(seg) : `<s>${esc(seg.from)}</s><b>${esc(seg.to)}</b>`,
    )
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
        .copy{position:absolute;left:72px;top:150px;width:690px}
        .copy .pill{margin-bottom:26px}
        h1{margin:0;font:400 ${size}px/0.92 "Archivo Black";letter-spacing:-0.02em;text-transform:uppercase}
        h1 s{text-decoration:none;white-space:nowrap;color:#A3ABBB;font-size:.42em;vertical-align:.62em;margin-right:.2em;background:linear-gradient(#FF5A3C,#FF5A3C) no-repeat 0 55%/100% .11em}
        h1 b{font-weight:400;display:inline-block;padding:.02em .14em 0;border-radius:.14em;background:#D4FF3A;color:#0B0E14;transform:rotate(-1.5deg)}
        .dm{position:absolute;left:72px;bottom:56px;display:flex;align-items:center;gap:16px;font:800 24px/1 Manrope}
        .kw{display:inline-block;padding:6px 12px 5px;border-radius:9px;box-shadow:inset 0 0 0 3px #D4FF3A;color:#D4FF3A;font:400 24px/1 "Archivo Black";letter-spacing:.04em}
        .url{margin-left:14px;color:#A3ABBB;font-weight:700;font-size:20px}
        .chat{position:absolute;right:64px;top:160px;width:330px;padding:16px 16px 22px;border-radius:28px;background:#131823;box-shadow:inset 0 0 0 2px rgba(240,243,249,.14),0 40px 80px -40px #000;transform:rotate(3deg);display:grid;gap:12px}
        .head{display:flex;align-items:center;gap:10px;padding-bottom:12px;border-bottom:1px solid rgba(240,243,249,.14)}
        .av{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:#F0F3F9;color:#0B0E14;font:400 16px/1 "Archivo Black"}
        .head b{display:block;font:800 16px/1.2 Manrope}.head small{font:500 13px/1.2 Manrope;color:#A3ABBB}
        .me{justify-self:end;padding:12px 16px;border-radius:20px 20px 6px 20px;background:#D4FF3A;color:#0B0E14;font:400 18px/1 "Archivo Black";letter-spacing:.04em}
        .them{justify-self:start;max-width:88%;padding:12px 16px;border-radius:20px 20px 20px 6px;background:#1D2331;font:500 17px/1.4 Manrope}
      </style>
      <div class="ghost">${esc(keyword)}</div>
      <div class="brand">ALPACODE <span class="pill">FAST</span></div>
      <div class="copy">
        <span class="pill">${esc(sticker)}</span>
        <h1>${h}</h1>
      </div>
      <div class="chat">
        <div class="head"><span class="av">A</span><span><b>alpacode</b><small>Alpacode FAST</small></span></div>
        <div class="me">${esc(keyword)}</div>
        <div class="them">${esc(reply)}</div>
      </div>
      <div class="dm">Scrivi <span class="kw">${esc(keyword)}</span> in DM <span class="url">fast.alpacode.it</span></div>
    </div>
  </foreignObject>
</svg>`;
}
