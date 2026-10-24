#!/usr/bin/env node
/* ============================================================
   The showcase's full-page screenshots — npm run work-shots [-- id …]

   For every work entry with a `url` (src/content/work/<id>.md), opens
   the live site at 1440×900, scrolls it to the foot so lazy images and
   reveals come in, and saves the whole page, top to bottom, as
   src/assets/work/<id>-full.jpg (1440 wide, at most MAX_HEIGHT tall,
   JPEG: a page is a photo). The case page then scrolls it inside its
   frame (frame-scroll). Ids on the command line narrow the run.

   Needs Playwright with a Chromium (`npx playwright install chromium`
   on a new machine; pre-installed in Claude Code cloud sessions, whose
   network policy must allow the clients' hosts).
   ============================================================ */
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTH = 1440;
const HEIGHT = 900;
const MAX_HEIGHT = 9000; // px: a longer page is cut at its first 9000

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = join(root, "src", "content", "work");
const out = join(root, "src", "assets", "work");
const only = process.argv.slice(2);

const entries = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => ({ id: f.replace(/\.md$/, ""), url: /^url: "?([^"\n]+)"?/m.exec(readFileSync(join(dir, f), "utf8"))?.[1] }))
  .filter((e) => e.url && (only.length === 0 || only.includes(e.id)));

if (!entries.length) {
  console.log("No work entry has a url yet: add `url: \"https://…\"` to src/content/work/<id>.md.");
  process.exit(0);
}

// A local install, or a global one (NODE_PATH: require resolves it).
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  try {
    ({ chromium } = createRequire(import.meta.url)("playwright"));
  } catch {
    console.error("Playwright isn't installed: npm i -D playwright && npx playwright install chromium");
    process.exit(1);
  }
}
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
try {
  for (const { id, url } of entries) {
    const page = await (await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 })).newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      // Scroll to the foot and back, so lazy images and reveals come in.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1200);
      const png = await page.screenshot({ fullPage: true, type: "png" });
      const meta = await sharp(png).metadata();
      const h = Math.min(meta.height ?? MAX_HEIGHT, MAX_HEIGHT);
      const file = join(out, `${id}-full.jpg`);
      await sharp(png).extract({ left: 0, top: 0, width: meta.width ?? WIDTH, height: h }).jpeg({ quality: 80, mozjpeg: true }).toFile(file);
      console.log(`✓ ${id}: ${url} → src/assets/work/${id}-full.jpg (${meta.width}×${h})`);
    } catch (err) {
      console.error(`✗ ${id}: ${url} — ${err.message}`);
    } finally {
      await page.context().close();
    }
  }
} finally {
  await browser.close();
}
