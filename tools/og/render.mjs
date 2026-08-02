#!/usr/bin/env node
/* ============================================================
   OG card renderer — tools/og/*.svg  ->  public/*.png

   Link-preview scrapers (WhatsApp, Facebook, LinkedIn, X…) do
   not render SVG og:images, so the SVG sources in this folder
   are design masters only. This script rasterises them to the
   1200×630 PNGs the site actually serves, using headless
   Chrome with the real brand fonts (@fontsource packages)
   inlined — no extra npm dependencies.

   Run after adding or editing a card:   npm run og
   Chrome is auto-detected; override with OG_CHROME=/path/to/chrome.

   Chrome's new headless mode reserves ~87px of --window-size for
   a phantom toolbar, so we shoot an oversized window and crop to
   exactly 1200×630 with sharp (already here as an Astro dep).
   ============================================================ */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");
const outDir = join(root, "public");

/* The three brand families. The SVGs only use regular weight; the
   latin subset covers Italian diacritics, "·", "—" and "€". */
const FONTS = [
  ["Archivo Black", "@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff2"],
  ["Manrope", "@fontsource/manrope/files/manrope-latin-400-normal.woff2"],
  ["JetBrains Mono", "@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2"],
];

const fontCss = FONTS.map(([family, rel]) => {
  const woff2 = readFileSync(join(root, "node_modules", rel)).toString("base64");
  return `@font-face{font-family:"${family}";font-style:normal;font-weight:400;src:url(data:font/woff2;base64,${woff2}) format("woff2")}`;
}).join("\n");

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
const sources = readdirSync(here).filter((f) => f.endsWith(".svg")).sort();
if (sources.length === 0) {
  console.error("No .svg sources in tools/og/ — nothing to render.");
  process.exit(1);
}

try {
  for (const svgFile of sources) {
    const svg = readFileSync(join(here, svgFile), "utf8");
    const html = `<!doctype html><meta charset="utf-8"><style>${fontCss}\nhtml,body{margin:0;padding:0}svg{display:block}</style>${svg}`;
    const page = join(work, svgFile.replace(/\.svg$/, ".html"));
    writeFileSync(page, html);

    const shot = join(work, svgFile.replace(/\.svg$/, ".shot.png"));
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

    const png = join(outDir, svgFile.replace(/\.svg$/, ".png"));
    await sharp(shot)
      .extract({ left: 0, top: 0, width: WIDTH, height: HEIGHT })
      .png()
      .toFile(png);

    const meta = await sharp(png).metadata();
    if (meta.width !== WIDTH || meta.height !== HEIGHT) {
      throw new Error(`${svgFile}: rendered ${meta.width}×${meta.height}, expected ${WIDTH}×${HEIGHT}`);
    }
    const kb = Math.round(readFileSync(png).length / 1024);
    console.log(`✓ ${svgFile} -> public/${svgFile.replace(/\.svg$/, ".png")} (${meta.width}×${meta.height}, ${kb} kB)`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
