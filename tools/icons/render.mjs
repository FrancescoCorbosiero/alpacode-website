#!/usr/bin/env node
/* ============================================================
   Favicon / app-icon set  ->  public/

   The logo is a wide wordmark — resized to 16px it's an
   unreadable smudge, so tab/app icons use a monogram instead:
   Archivo Black "A" over the blue strut, the same letter+bar
   DNA as the wordmark. Rendered once at 1024² via headless
   Chrome (real brand font, like tools/og), then downscaled
   with sharp. favicon.ico is written by hand as a multi-entry
   PNG-in-ICO container (valid everywhere that matters).

   Run after changing the mark:   npm run icons
   ============================================================ */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");
const outDir = join(root, "public");

const SIZE = 1024;
const INK = "#0A0A0A";
const PAPER = "#F4F1E8";
const BLUE = "#3B72E9";

const woff2 = readFileSync(
  join(root, "node_modules", "@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff2"),
).toString("base64");

/* The mark: ink field, paper "A", blue strut underneath. */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${INK}"/>
  <g font-family="Archivo Black" font-size="720" fill="${PAPER}" text-anchor="middle">
    <text x="512" y="700">A</text>
  </g>
  <rect x="252" y="768" width="520" height="72" fill="${BLUE}"/>
</svg>`;

function findChrome() {
  const candidates = [
    process.env.OG_CHROME,
    "/opt/pw-browsers/chromium",
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

/** Multi-entry ICO wrapping PNG blobs (16/32/48). */
function writeIco(file, pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  const blobs = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    blobs.push(buf);
    offset += buf.length;
  }
  writeFileSync(file, Buffer.concat([header, ...entries, ...blobs]));
}

const work = mkdtempSync(join(tmpdir(), "icons-"));
try {
  const page = join(work, "mark.html");
  writeFileSync(
    page,
    `<!doctype html><meta charset="utf-8"><style>@font-face{font-family:"Archivo Black";font-style:normal;font-weight:400;src:url(data:font/woff2;base64,${woff2}) format("woff2")}html,body{margin:0;padding:0}svg{display:block}</style>${svg}`,
  );
  const shot = join(work, "mark.png");
  execFileSync(
    findChrome(),
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${SIZE + 200},${SIZE + 200}`,
      "--virtual-time-budget=4000",
      `--screenshot=${shot}`,
      `file://${page}`,
    ],
    { stdio: "pipe" },
  );
  const master = await sharp(shot)
    .extract({ left: 0, top: 0, width: SIZE, height: SIZE })
    .png()
    .toBuffer();

  const at = (px) => sharp(master).resize(px, px).png().toBuffer();

  const [i16, i32, i48, i180, i192, i512] = await Promise.all(
    [16, 32, 48, 180, 192, 512].map(at),
  );

  writeFileSync(join(outDir, "favicon-16.png"), i16);
  writeFileSync(join(outDir, "favicon-32.png"), i32);
  writeFileSync(join(outDir, "apple-touch-icon.png"), i180);
  writeFileSync(join(outDir, "icon-192.png"), i192);
  writeFileSync(join(outDir, "icon-512.png"), i512);
  writeIco(join(outDir, "favicon.ico"), [
    { size: 16, buf: i16 },
    { size: 32, buf: i32 },
    { size: 48, buf: i48 },
  ]);

  writeFileSync(
    join(outDir, "site.webmanifest"),
    JSON.stringify(
      {
        name: "Alpacode · Soluzioni Digitali",
        short_name: "Alpacode",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        theme_color: INK,
        background_color: PAPER,
        display: "browser",
      },
      null,
      2,
    ) + "\n",
  );

  for (const f of ["favicon.ico", "favicon-16.png", "favicon-32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "site.webmanifest"]) {
    const kb = (readFileSync(join(outDir, f)).length / 1024).toFixed(1);
    console.log(`✓ public/${f} (${kb} kB)`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
