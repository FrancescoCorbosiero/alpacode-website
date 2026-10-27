/* ============================================================
   The service pages' share cards — rendered by render.mjs into
   public/og-servizio-<slug>.png and og-servizio-<slug>-en.png
   (1200×630), one per service and language: on the blueprint, the
   page's promise (its hero: kicker, lines, the accent underlined),
   the service's facts, and a drawing of its machine.
   Copy kept in step with src/data/service-pages/<slug>.ts (the hero
   and the facts).
   ============================================================ */

/** @typedef {{ kicker: string, lines: string[], accent: string, mark: string, foot: string }} Copy */
/** @typedef {{ slug: string, motif: string, it: Copy, en: Copy }} Service */

/** @type {Service[]} */
const SERVICES = [
  {
    slug: "consulenza-digitale",
    motif: "roadmap",
    it: {
      kicker: "consulenza & digitalizzazione",
      lines: ["Digitalizzare non è", "comprare software."],
      accent: "È mettere in ordine.",
      mark: "mettere in ordine",
      foot: "Remoto · in studio · da 2 a 8 settimane · si parte da una call di 30 minuti",
    },
    en: {
      kicker: "consulting & digitalization",
      lines: ["Going digital isn't", "buying software."],
      accent: "It's putting things in order.",
      mark: "putting things in order",
      foot: "Remote · in the studio · 2 to 8 weeks · it starts with a 30-minute call",
    },
  },
  {
    slug: "siti-web",
    motif: "site",
    it: {
      kicker: "siti & web app",
      lines: ["Un sito bello", "non basta."],
      accent: "Deve portarti clienti.",
      mark: "portarti clienti",
      foot: "Siti vetrina, portali e aree riservate · da 3 a 12 settimane",
    },
    en: {
      kicker: "websites & web apps",
      lines: ["A good-looking site", "isn't enough."],
      accent: "It has to bring you clients.",
      mark: "bring you clients",
      foot: "Showcase sites, portals and private areas · 3 to 12 weeks",
    },
  },
  {
    slug: "e-commerce",
    motif: "shop",
    it: {
      kicker: "e-commerce",
      lines: ["Un negozio aperto", "anche di notte."],
      accent: "Che vende davvero.",
      mark: "vende davvero",
      foot: "WooCommerce · Shopify · catalogo, pagamenti, spedizioni e ordini",
    },
    en: {
      kicker: "e-commerce",
      lines: ["A shop that's open", "at night too."],
      accent: "And actually sells.",
      mark: "actually sells",
      foot: "WooCommerce · Shopify · catalogue, payments, shipping and orders",
    },
  },
  {
    slug: "software-su-misura",
    motif: "flow",
    it: {
      kicker: "software & automazioni",
      lines: ["Dal foglio Excel", "a un processo"],
      accent: "che si tiene in piedi.",
      mark: "si tiene in piedi",
      foot: "Gestionali, portali, integrazioni e automazioni · su misura",
    },
    en: {
      kicker: "software & automation",
      lines: ["From a spreadsheet", "to a process"],
      accent: "that holds up.",
      mark: "holds up",
      foot: "Management systems, portals, integrations and automations · custom",
    },
  },
  {
    slug: "integrazioni-ai",
    motif: "chat",
    it: {
      kicker: "integrazioni AI (LLM)",
      lines: ["L'AI dentro", "il tuo lavoro."],
      accent: "Non per fare scena.",
      mark: "per fare scena",
      foot: "Assistenti · documenti · contenuti · nei sistemi che usi già",
    },
    en: {
      kicker: "AI integrations (LLM)",
      lines: ["AI inside", "your work."],
      accent: "Not for show.",
      mark: "for show",
      foot: "Assistants · documents · content · in the systems you already use",
    },
  },
  {
    slug: "manutenzione",
    motif: "pulse",
    it: {
      kicker: "manutenzione & supporto",
      lines: ["Dopo il lancio", "non spariamo."],
      accent: "Il sito resta in forma.",
      mark: "resta in forma",
      foot: "Aggiornamenti, sicurezza, backup e modifiche · risposta entro mezza giornata",
    },
    en: {
      kicker: "maintenance & support",
      lines: ["After launch", "we don't disappear."],
      accent: "The site stays in shape.",
      mark: "stays in shape",
      foot: "Updates, security, backups and changes · a reply within half a day",
    },
  },
  {
    slug: "formazione",
    motif: "blocks",
    it: {
      kicker: "formazione",
      lines: ["Quello che impariamo,", "te lo lasciamo."],
      accent: "Così diventi autonomo.",
      mark: "autonomo",
      foot: "In aula · da remoto · da una giornata a 32 ore · sui tuoi strumenti",
    },
    en: {
      kicker: "training",
      lines: ["What we learn,", "we hand over."],
      accent: "So you can do it yourself.",
      mark: "do it yourself",
      foot: "Classroom · remote · from one day to 32 hours · on your tools",
    },
  },
];

/** One card per service and language. */
export const SERVICE_CARDS = SERVICES.flatMap((s) =>
  ["it", "en"].map((lang) => ({ name: `og-servizio-${s.slug}${lang === "en" ? "-en" : ""}`, lang, motif: s.motif, ...s[lang] })),
);

const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const PAPER = "#F0F3F9";
const LIGHT = "#8FB0F5";
const BLUE = "#3B72E9";
const INK = "#0B0E14";

/** The machine, drawn small on the right: x, y its top left. */
function motif(kind) {
  const x = 820;
  const y = 150;
  const sheet = (w, h, extra = "") => `<rect x="0" y="0" width="${w}" height="${h}" fill="${PAPER}" ${extra}/>`;
  switch (kind) {
    case "roadmap":
      return `<g transform="translate(${x} ${y}) rotate(-2)">${sheet(300, 230)}
        ${[0, 1, 2].map((c) => `<rect x="${16 + c * 92}" y="18" width="84" height="3" fill="${INK}"/>
          ${[0, 1].map((r) => `<rect x="${16 + c * 92}" y="${36 + r * 46}" width="84" height="36" fill="#fff" stroke="#D3DBE9"/><rect x="${16 + c * 92}" y="${36 + r * 46}" width="4" height="36" fill="${[BLUE, LIGHT, "#C3CDE0"][c]}"/><rect x="${28 + c * 92}" y="${50 + r * 46}" width="${46 + ((c + r) % 2) * 14}" height="6" fill="#9AA6BB"/>`).join("")}`).join("")}
        <path d="M16 196 H 270 M262 188 L 274 196 L 262 204" fill="none" stroke="${BLUE}" stroke-width="3"/>
      </g>`;
    case "site":
      return `<g transform="translate(${x} ${y})">${sheet(300, 236)}
        <rect x="0" y="0" width="300" height="26" fill="#E8EDF6"/><rect x="12" y="10" width="6" height="6" fill="#C1CADB"/><rect x="22" y="10" width="6" height="6" fill="#C1CADB"/><rect x="40" y="6" width="190" height="14" fill="#fff" stroke="#D3DBE9"/>
        <rect x="244" y="10" width="7" height="7" fill="${BLUE}"/><text x="256" y="17" font-family="Manrope" font-weight="800" font-size="9" fill="${BLUE}">LIVE</text>
        <rect x="16" y="44" width="150" height="16" fill="${INK}"/><rect x="16" y="66" width="110" height="16" fill="${INK}"/>
        <rect x="16" y="94" width="268" height="6" fill="#D3DBE9"/><rect x="16" y="106" width="190" height="6" fill="#D3DBE9"/>
        <rect x="16" y="124" width="110" height="24" fill="${BLUE}"/>
        <rect x="16" y="160" width="268" height="58" fill="${LIGHT}"/><path d="M28 218 L 80 178 L 108 200 L 132 186 L 170 218 Z" fill="${PAPER}" fill-opacity="0.6"/>
      </g>`;
    case "shop":
      return `<g transform="translate(${x} ${y})">
        <g transform="rotate(-2)">${sheet(170, 160)}<rect x="12" y="12" width="146" height="84" fill="${LIGHT}"/><path d="M70 50 H 100 L 108 82 H 62 Z" fill="${INK}"/><path d="M78 50 V 40 H 92 V 50" fill="none" stroke="${INK}" stroke-width="4"/><rect x="12" y="108" width="90" height="12" fill="${INK}"/><rect x="12" y="130" width="96" height="20" fill="${INK}"/></g>
        <g transform="translate(220 8)"><rect width="56" height="56" fill="${PAPER}" stroke="${INK}"/><path d="M12 16 h6 l6 22 h18 l5 -16 h-26" fill="none" stroke="${INK}" stroke-width="3"/><rect x="40" y="-10" width="22" height="22" fill="${BLUE}"/><text x="51" y="6" text-anchor="middle" font-family="Manrope" font-weight="800" font-size="13" fill="#fff">3</text></g>
        <g transform="translate(110 170) rotate(3)">${sheet(196, 74)}<text x="14" y="26" font-family="Manrope" font-weight="800" font-size="10" fill="#687387" letter-spacing="1">ORDINE</text><text x="14" y="50" font-family="Archivo Black" font-size="20" fill="${INK}">#1043</text><rect x="104" y="18" width="80" height="26" fill="none" stroke="${BLUE}" stroke-width="2.5" transform="rotate(-8 144 31)"/><text x="144" y="36" text-anchor="middle" font-family="Archivo Black" font-size="12" fill="${BLUE}" transform="rotate(-8 144 31)">OK</text><g fill="${INK}">${Array.from({ length: 30 }, (_, i) => `<rect x="${14 + i * 6}" y="58" width="${i % 3 ? 2 : 4}" height="10"/>`).join("")}</g></g>
      </g>`;
    case "flow":
      return `<g transform="translate(${x} ${y})">
        <g transform="rotate(-2)">${sheet(250, 120)}<rect width="250" height="22" fill="#E8EDF6"/>${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect x="${12 + c * 62}" y="${34 + r * 20}" width="${40 + ((r + c) % 3) * 6}" height="6" fill="#C9D2E2"/>`).join("") + `<text x="222" y="${41 + r * 20}" font-family="Manrope" font-weight="800" font-size="12" fill="${BLUE}">✓</text>`).join("")}</g>
        <path d="M26 200 H 290" stroke="${PAPER}" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="6 6"/>
        ${[0, 1, 2, 3].map((i) => `<rect x="${4 + i * 88}" y="178" width="44" height="44" fill="${i === 2 ? BLUE : "#183C86"}" stroke="${PAPER}" stroke-opacity="0.6" stroke-width="1.5"/><text x="${26 + i * 88}" y="206" text-anchor="middle" font-family="Manrope" font-weight="800" font-size="16" fill="${i === 2 ? "#fff" : LIGHT}">✓</text>`).join("")}
      </g>`;
    case "chat":
      return `<g transform="translate(${x} ${y})">${sheet(300, 240)}
        <rect width="300" height="28" fill="#E8EDF6"/><rect x="14" y="10" width="8" height="8" fill="${BLUE}"/>
        <rect x="16" y="44" width="170" height="34" fill="#E8EDF6"/><rect x="28" y="58" width="120" height="7" fill="#9AA6BB"/>
        <rect x="16" y="90" width="268" height="26" fill="none" stroke="#95A3BB" stroke-dasharray="4 4"/><rect x="26" y="97" width="12" height="12" fill="none" stroke="${BLUE}" stroke-width="2"/><rect x="46" y="100" width="150" height="6" fill="#9AA6BB"/>
        <rect x="64" y="128" width="220" height="60" fill="${INK}"/><rect x="76" y="140" width="56" height="6" fill="${LIGHT}"/><rect x="76" y="156" width="180" height="6" fill="#C9D2E2"/><rect x="76" y="168" width="130" height="6" fill="#C9D2E2"/>
        <rect x="150" y="202" width="100" height="24" fill="${INK}"/><text x="262" y="219" font-family="Manrope" font-weight="800" font-size="14" fill="${BLUE}">✓</text>
      </g>`;
    case "pulse":
      return `<g transform="translate(${x} ${y})">${sheet(300, 220)}
        <rect width="300" height="28" fill="#E8EDF6"/><rect x="232" y="10" width="8" height="8" fill="${BLUE}"/>
        <rect x="14" y="42" width="272" height="70" fill="${INK}"/>
        <path d="M14 78 h40 l8 -22 l9 40 l8 -32 l7 14 h40 l8 -22 l9 40 l8 -32 l7 14 h40 l8 -22 l9 40 l8 -32 l7 14 h22" fill="none" stroke="${LIGHT}" stroke-width="2.5"/>
        ${Array.from({ length: 14 }, (_, i) => `<rect x="${14 + i * 19.6}" y="128" width="16" height="14" fill="${BLUE}"/>`).join("")}
        ${[0, 1, 2].map((i) => `<text x="14" y="${166 + i * 18}" font-family="Manrope" font-weight="800" font-size="12" fill="${BLUE}">✓</text><rect x="30" y="${158 + i * 18}" width="${150 - i * 24}" height="7" fill="#9AA6BB"/>`).join("")}
      </g>`;
    case "blocks":
      return `<g transform="translate(${x} ${y})">${sheet(300, 230)}
        <rect width="300" height="26" fill="#E8EDF6"/>
        ${[0, 1, 2].map((i) => `<rect x="16" y="${42 + i * 60}" width="176" height="48" fill="none" stroke="#95A3BB" stroke-dasharray="5 4"/><rect x="21" y="${47 + i * 60}" width="166" height="38" fill="${[BLUE, INK, LIGHT][i]}"/><rect x="206" y="${46 + i * 60}" width="78" height="40" fill="#E8EDF6" stroke="#D3DBE9"/>`).join("")}
        <path d="M150 108 l0 22 l6 -5 l4 9 l4 -2 l-4 -9 l7 -1 z" fill="${PAPER}" stroke="${INK}" stroke-width="1.5"/>
      </g>`;
    default:
      return "";
  }
}

export function serviceSvg(card) {
  const longest = Math.max(...card.lines.map((l) => l.length), card.accent.length);
  const size = Math.min(66, Math.floor(720 / (0.6 * longest)));
  const lh = Math.round(size * 1.04);
  const top = 250;
  const lines = card.lines.map((l, i) => `<text x="80" y="${top + i * lh}">${esc(l)}</text>`).join("");
  const ay = top + card.lines.length * lh;
  // The accent's underline runs under its marked words (Archivo Black
  // runs about 0.575em a letter in these lines).
  const before = card.accent.slice(0, card.accent.indexOf(card.mark));
  const ux = 80 + before.length * size * 0.575;
  const uw = card.mark.length * size * 0.575;
  const kicker = card.lang === "it" ? "Servizi · Alpacode" : "Services · Alpacode";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <pattern id="g" patternUnits="userSpaceOnUse" width="24" height="24"><path d="M24 0H0V24" fill="none" stroke="${PAPER}" stroke-opacity="0.05"/></pattern>
    <pattern id="G" patternUnits="userSpaceOnUse" width="120" height="120"><path d="M120 0H0V120" fill="none" stroke="${PAPER}" stroke-opacity="0.11"/></pattern>
  </defs>
  <rect width="1200" height="630" fill="#12306F"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#G)"/>
  <g stroke="${PAPER}" stroke-opacity="0.45" stroke-width="1.5" fill="none">
    <path d="M22 40V22H40"/><path d="M1160 22H1178V40"/><path d="M22 590V608H40"/><path d="M1160 608H1178V590"/>
  </g>
  <text x="80" y="96" font-family="Archivo Black" font-size="24" fill="${PAPER}">ALPACODE</text>
  <rect x="80" y="106" width="46" height="5" fill="${BLUE}"/>
  <text x="1120" y="96" text-anchor="end" font-family="Manrope" font-weight="700" font-size="18" fill="${PAPER}" fill-opacity="0.7">${esc(kicker)}</text>
  ${motif(card.motif)}
  <text x="80" y="174" font-family="Caveat" font-weight="600" font-size="38" fill="${LIGHT}" transform="rotate(-2 80 174)">${esc(card.kicker)}</text>
  <g font-family="Archivo Black" font-size="${size}" fill="${PAPER}">${lines}</g>
  <text x="80" y="${ay}" font-family="Archivo Black" font-size="${size}" fill="${LIGHT}">${esc(card.accent)}</text>
  <rect x="${ux.toFixed(0)}" y="${ay + 12}" width="${uw.toFixed(0)}" height="7" fill="${LIGHT}"/>
  <text x="80" y="566" font-family="Manrope" font-weight="700" font-size="21" fill="${PAPER}" fill-opacity="0.78">${esc(card.foot)}</text>
</svg>`;
}
