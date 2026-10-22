#!/usr/bin/env node
/* ============================================================
   OG card renderer — tools/og/*.svg  ->  public/*.png (or .jpg)

   Link-preview scrapers (WhatsApp, Facebook, LinkedIn, X…) do
   not render SVG og:images, so the SVG sources in this folder
   are design masters only. This script rasterises them to the
   1200×630 images the site actually serves, using headless
   Chrome with the real brand fonts (@fontsource packages)
   inlined — no extra npm dependencies.

   Cards that carry a photo ({{PHOTO}} in the SVG: the referral
   program's flyer photo, public/media/amici-laptop-800.jpg) come
   out as JPEG — WhatsApp drops preview images much above ~300 kB,
   and a photo in PNG is well over that. Everything else is PNG.

   Run after adding or editing a card:   npm run og
   Only some cards (no blog covers):     npm run og -- og-hosting og-ai
   Chrome is auto-detected; override with OG_CHROME=/path/to/chrome.

   Chrome's new headless mode reserves ~87px of --window-size for
   a phantom toolbar, so we shoot an oversized window and crop to
   exactly 1200×630 with sharp (already here as an Astro dep).
   ============================================================ */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { COVERS, coverSvg } from "./covers.mjs";

const WIDTH = 1200;
const HEIGHT = 630;

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");
const outDir = join(root, "public");

/* The brand families, at the weights the SVGs use (Manrope 500–800 and
   the flyer's hand are the referral program's cards). The latin subset
   covers Italian diacritics, "·", "—" and "€". */
const FONTS = [
  ["Archivo Black", 400, "@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff2"],
  ["Manrope", 400, "@fontsource/manrope/files/manrope-latin-400-normal.woff2"],
  ["Manrope", 500, "@fontsource/manrope/files/manrope-latin-500-normal.woff2"],
  ["Manrope", 700, "@fontsource/manrope/files/manrope-latin-700-normal.woff2"],
  ["Manrope", 800, "@fontsource/manrope/files/manrope-latin-800-normal.woff2"],
  ["JetBrains Mono", 400, "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2"],
  ["Caveat", 600, "@fontsource/caveat/files/caveat-latin-600-normal.woff2"],
];

const fontCss = FONTS.map(([family, weight, rel]) => {
  const woff2 = readFileSync(join(root, "node_modules", rel)).toString("base64");
  return `@font-face{font-family:"${family}";font-style:normal;font-weight:${weight};src:url(data:font/woff2;base64,${woff2}) format("woff2")}`;
}).join("\n");

const PHOTO = `data:image/jpeg;base64,${readFileSync(join(root, "public", "media", "amici-laptop-800.jpg")).toString("base64")}`;

function findChrome() {
  const candidates = [
    process.env.OG_CHROME,
    "/opt/pw-browsers/chromium", // Claude Code remote env
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return c;
  for (const c of ["google-chrome", "chromium", "chromium-browser"]) {
    try {
      execFileSync("which", [c], { stdio: "pipe" });
      return c;
    } catch {
      /* keep looking */
    }
  }
  throw new Error("No Chrome/Chromium found. Set OG_CHROME=/path/to/chrome and re-run.");
}

const chrome = findChrome();
const work = mkdtempSync(join(tmpdir(), "og-"));
let shots = 0;

async function renderSvgTo(svgText, outFile, label) {
  const html = `<!doctype html><meta charset="utf-8"><style>${fontCss}\nhtml,body{margin:0;padding:0}svg{display:block}</style>${svgText}`;
  const page = join(work, `page-${shots}.html`);
  const shot = join(work, `shot-${shots}.png`);
  shots += 1;
  writeFileSync(page, html);

  execFileSync(
    chrome,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      // Oversized on purpose — see the toolbar note up top.
      `--window-size=${WIDTH + 200},${HEIGHT + 200}`,
      // Let inlined fonts settle before the shot.
      "--virtual-time-budget=4000",
      `--screenshot=${shot}`,
      `file://${page}`,
    ],
    { stdio: "pipe" },
  );

  const cropped = sharp(shot).extract({ left: 0, top: 0, width: WIDTH, height: HEIGHT });
  await (outFile.endsWith(".jpg") ? cropped.jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" }) : cropped.png()).toFile(outFile);

  const meta = await sharp(outFile).metadata();
  if (meta.width !== WIDTH || meta.height !== HEIGHT) {
    throw new Error(`${label}: rendered ${meta.width}×${meta.height}, expected ${WIDTH}×${HEIGHT}`);
  }
  const kb = Math.round(readFileSync(outFile).length / 1024);
  if (kb > 300) console.warn(`! ${label}: ${kb} kB — WhatsApp may skip previews above ~300 kB`);
  console.log(`✓ ${label} (${meta.width}×${meta.height}, ${kb} kB)`);
}

/* Names on the command line narrow the run to those cards (and skip the
   blog covers): re-rendering untouched PNGs only churns the repo. */
const only = process.argv.slice(2).map((a) => a.replace(/\.svg$/, ""));
const sources = readdirSync(here)
  .filter((f) => f.endsWith(".svg") && (only.length === 0 || only.includes(f.replace(/\.svg$/, ""))))
  .sort();
if (sources.length === 0) {
  console.error("No .svg sources in tools/og/ — nothing to render.");
  process.exit(1);
}

try {
  // 1) Static cards: tools/og/*.svg -> public/*.png|jpg (og:image assets).
  for (const svgFile of sources) {
    const raw = readFileSync(join(here, svgFile), "utf8");
    const ext = raw.includes("{{PHOTO}}") ? ".jpg" : ".png";
    const out = svgFile.replace(/\.svg$/, ext);
    await renderSvgTo(raw.replaceAll("{{PHOTO}}", PHOTO), join(outDir, out), `${svgFile} -> public/${out}`);
  }

  // 2) Blog covers: generated from specs -> src/assets/blog/<slug>.png,
  //    referenced by each post's `cover` frontmatter (page + og:image).
  const coversDir = join(root, "src", "assets", "blog");
  mkdirSync(coversDir, { recursive: true });
  for (const spec of only.length ? [] : COVERS) {
    const png = join(coversDir, `${spec.slug}.png`);
    await renderSvgTo(coverSvg(spec), png, `cover:${spec.slug} -> src/assets/blog/${spec.slug}.png`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
