/* ============================================================
   The case pages' share cards — rendered by render.mjs into
   public/og-work-<id>.jpg and og-work-<id>-en.jpg (1200×630), one per
   project and language: what the page is (its name, sector, place
   and year) and the site in its frame, as the page shows it.
   Read from the work entries (src/content/work/<id>.md) and their
   first-screen screenshots (src/assets/work/<id>.png). JPEG: the
   screenshot is a photo for the scrapers' size limits.
   ============================================================ */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

/** The place names the cards print (src/data/places.ts). */
const PLACES = {
  monza: { it: "Monza", en: "Monza" },
  milano: { it: "Milano", en: "Milan" },
  brianza: { it: "Brianza", en: "Brianza" },
  seregno: { it: "Seregno", en: "Seregno" },
  "cesano-maderno": { it: "Cesano Maderno", en: "Cesano Maderno" },
  piacenza: { it: "Piacenza", en: "Piacenza" },
  roma: { it: "Roma", en: "Rome" },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The fields a card needs, from an entry's frontmatter. */
function fieldsOf(md) {
  const pair = (key) => {
    const m = new RegExp(`^${key}: \\{ it: "([^"]*)", en: "([^"]*)" \\}`, "m").exec(md);
    return m ? { it: m[1], en: m[2] } : null;
  };
  return {
    title: pair("title"),
    sector: pair("sector"),
    year: /^year: "([^"]*)"/m.exec(md)?.[1] ?? "",
    place: /^place: ([\w-]+)/m.exec(md)?.[1] ?? "",
    url: /^url: "?([^"\n]+)"?/m.exec(md)?.[1] ?? "",
  };
}

/** One card per project and language. */
export async function workCards(root) {
  const dir = join(root, "src", "content", "work");
  const shots = join(root, "src", "assets", "work");
  const cards = [];
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
    const id = file.replace(/\.md$/, "");
    const md = readFileSync(join(dir, file), "utf8");
    if (/^draft: true/m.test(md)) continue; // not on show, no page to share
    const f = fieldsOf(md);
    const shot = readdirSync(shots).find((s) => s.replace(/\.[^.]+$/, "") === id);
    const photo = shot
      ? `data:image/jpeg;base64,${(await sharp(join(shots, shot)).resize({ width: 980 }).jpeg({ quality: 82 }).toBuffer()).toString("base64")}`
      : "";
    for (const lang of ["it", "en"]) {
      cards.push({ name: `og-work-${id}${lang === "en" ? "-en" : ""}`, lang, id, photo, ...f });
    }
  }
  return cards;
}

/** The card's SVG: the name and the facts on the left, the site in its
 *  frame on the right. */
export function workSvg(card) {
  const lang = card.lang;
  const title = card.title?.[lang] ?? card.id;
  const facts = [card.sector?.[lang], PLACES[card.place]?.[lang], card.year].filter(Boolean).join(" · ");
  const kicker = lang === "it" ? "Lavori · Alpacode" : "Work · Alpacode";
  const bar = card.url ? card.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : title;
  const size = title.length > 22 ? 52 : title.length > 14 ? 64 : 80;
  const grid = [];
  for (let x = 0; x <= 1200; x += 40) grid.push(`<path d="M${x} 0V630" stroke="#e4e9f3" stroke-width="1"/>`);
  for (let y = 0; y <= 630; y += 40) grid.push(`<path d="M0 ${y}H1200" stroke="#e4e9f3" stroke-width="1"/>`);
  const fx = 612;
  const fy = 118;
  const fw = 540;
  const vh = Math.round((fw * 10) / 16);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f0f3f9"/>
  ${grid.join("")}
  <rect x="0" y="0" width="1200" height="6" fill="#3b72e9"/>
  <rect x="64" y="96" width="28" height="4" fill="#3b72e9"/>
  <text x="104" y="104" font-family="Manrope" font-weight="700" font-size="22" fill="#0b0e14">${esc(kicker)}</text>
  <foreignObject x="64" y="150" width="500" height="300">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Archivo Black';font-size:${size}px;line-height:0.95;letter-spacing:-0.03em;color:#0b0e14;">${esc(title)}</div>
  </foreignObject>
  <text x="64" y="500" font-family="Manrope" font-weight="700" font-size="24" fill="#465065">${esc(facts)}</text>
  <text x="64" y="566" font-family="Manrope" font-weight="700" font-size="20" fill="#3b72e9">alpacode.it/${lang === "en" ? "en/" : ""}lavori</text>
  <g>
    <rect x="${fx}" y="${fy}" width="${fw}" height="${vh + 30}" fill="#f0f3f9" stroke="#0b0e14" stroke-width="2"/>
    <rect x="${fx + 1}" y="${fy + 1}" width="${fw - 2}" height="29" fill="#e4e9f3"/>
    <path d="M${fx} ${fy + 30}H${fx + fw}" stroke="#0b0e14" stroke-width="2"/>
    <circle cx="${fx + 18}" cy="${fy + 15}" r="5" fill="#3b72e9"/>
    <circle cx="${fx + 34}" cy="${fy + 15}" r="5" fill="none" stroke="#0b0e14" stroke-width="1.5"/>
    <circle cx="${fx + 50}" cy="${fy + 15}" r="5" fill="none" stroke="#0b0e14" stroke-width="1.5"/>
    <text x="${fx + fw / 2}" y="${fy + 20}" text-anchor="middle" font-family="Manrope" font-weight="700" font-size="14" fill="#465065">${esc(bar)}</text>
    ${
      card.photo
        ? `<clipPath id="v"><rect x="${fx + 1}" y="${fy + 31}" width="${fw - 2}" height="${vh - 2}"/></clipPath><image href="${card.photo}" x="${fx + 1}" y="${fy + 31}" width="${fw - 2}" height="${vh - 2}" preserveAspectRatio="xMidYMin slice" clip-path="url(#v)"/>`
        : // No screenshot yet: the window shows the site's name, as the page's frame does.
          `<rect x="${fx + 1}" y="${fy + 31}" width="${fw - 2}" height="${vh - 2}" fill="#e4e9f3"/><text x="${fx + fw / 2}" y="${fy + 30 + vh / 2}" text-anchor="middle" font-family="Archivo Black" font-size="${bar.length > 20 ? 26 : 34}" fill="#0b0e14">${esc(bar)}</text><rect x="${fx + fw / 2 - 40}" y="${fy + 30 + vh / 2 + 18}" width="80" height="6" fill="#3b72e9"/>`
    }
  </g>
</svg>`;
}
