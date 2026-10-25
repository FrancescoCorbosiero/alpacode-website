#!/usr/bin/env node
/* ============================================================
   The works from their addresses — npm run work-pull [-- id … | --no-net | --shots]

   Reads tools/work/lavori.txt (one line per project, in order of
   importance: its address or addresses -> its keywords) and, line by
   line:
   - finds the project's entry in src/content/work/ (by its `url` or
     `also`, else by the address's name: resellpiacenza.shop →
     resellpiacenza.md; a line may name the entry instead of an
     address), and creates it as a draft when there's none;
   - sets the entry's `order` to the line's;
   - reads each address (its home and a few pages its menu links) into a
     digest, tools/work/digests/<id>.md: titles, descriptions, menu,
     headings, paragraphs, buttons, the footer (where the address and
     the VAT number are), structured data;
   - takes its screenshots: src/assets/work/<id>.png, the first screen
     at 1440×900 (kept when it's there; --shots takes it again), and
     <id>-full.jpg, the whole page (the case page scrolls it).
   It never writes copy: the entry is written afterwards from the
   keywords and the digest (.claude/skills/work-from-url). Ids on the
   command line narrow the run; --no-net only orders and scaffolds.

   Needs Playwright with a Chromium (`npx playwright install chromium`
   on a new machine; pre-installed in Claude Code cloud sessions, whose
   network policy must allow the clients' hosts).
   ============================================================ */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTH = 1440;
const HEIGHT = 900;
const MAX_HEIGHT = 9000; // px: a longer page is cut at its first 9000
const PAGES = 5; // at most, the menu's pages read after the home
const TIMEOUT = 45000; // ms a page has to load

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = join(root, "src", "content", "work");
const assets = join(root, "src", "assets", "work");
const digests = join(root, "tools", "work", "digests");
const args = process.argv.slice(2);
const offline = args.includes("--no-net");
const retake = args.includes("--shots");
const only = args.filter((a) => !a.startsWith("--"));

const hostOf = (u) => new URL(u).host.replace(/^www\./, "");
const flat = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const q = (s) => JSON.stringify(s);

/* ---------- The list ---------- */
const lines = readFileSync(join(root, "tools", "work", "lavori.txt"), "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith("#"))
  .map((l, i) => {
    const [head = "", ...rest] = l.split("->");
    const tokens = head.trim().split(/\s+/).filter(Boolean);
    return {
      order: i + 1,
      urls: tokens.filter((t) => /^https?:\/\//.test(t)),
      name: tokens.find((t) => !/^https?:\/\//.test(t)),
      keywords: rest.join("->").trim(),
    };
  });

/* ---------- The entries ---------- */
const read = () =>
  readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const md = readFileSync(join(dir, f), "utf8");
      const urls = [...md.matchAll(/^\s*(?:-\s+)?url: "?([^"\n]+)"?/gm)].map((m) => m[1]);
      return { id: f.replace(/\.md$/, ""), file: join(dir, f), md, urls };
    });
const entries = read();

function entryFor(line) {
  if (line.name) return entries.find((e) => e.id === line.name) ?? { id: line.name, missing: true };
  const hosts = line.urls.map(hostOf);
  const byUrl = entries.find((e) => e.urls.some((u) => hosts.includes(hostOf(u))));
  if (byUrl) return byUrl;
  const name = hosts[0].split(".")[0];
  return entries.find((e) => flat(e.id) === flat(name)) ?? { id: name.toLowerCase(), missing: true };
}

const kindOf = (keywords) =>
  /e-?commerce|shop|negozio/i.test(keywords) ? "ecommerce" : /gestionale|software|portale|\bapp\b/i.test(keywords) ? "software" : "sito";

/** A draft entry: the line's facts, nothing written for it. */
function scaffold(id, line, name) {
  const title = name || (line.urls[0] ? hostOf(line.urls[0]) : id);
  const [url, ...also] = line.urls;
  return [
    "---",
    `order: ${line.order}`,
    "# BOZZA (npm run work-pull): la scheda si scrive dalle parole chiave di",
    `# tools/work/lavori.txt e da tools/work/digests/${id}.md; poi via \`draft\`.`,
    'sector: { it: "—", en: "—" }',
    `title: { it: ${q(title)}, en: ${q(title)} }`,
    "descriptor:",
    `  it: ${q(line.keywords || title)}`,
    `  en: ${q(line.keywords || title)}`,
    "tags: []",
    `kind: ${kindOf(line.keywords)}`,
    ...(url ? [`url: ${q(url)}`] : []),
    ...(also.length ? ["also:", ...also.flatMap((u) => [`  - label: { it: ${q(hostOf(u))}, en: ${q(hostOf(u))} }`, `    url: ${q(u)}`])] : []),
    "draft: true",
    "---",
    "",
  ].join("\n");
}

/* ---------- Reading a site ---------- */
async function readPage(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: TIMEOUT });
  return page.evaluate(() => {
    const text = (el) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();
    const meta = (n) => document.querySelector(`meta[name="${n}"], meta[property="${n}"]`)?.getAttribute("content") ?? "";
    const uniq = (xs) => [...new Set(xs.filter(Boolean))];
    const links = [...document.querySelectorAll("header a[href], nav a[href]")];
    return {
      title: document.title,
      lang: document.documentElement.lang,
      description: meta("description"),
      ogTitle: meta("og:title"),
      ogDescription: meta("og:description"),
      siteName: meta("og:site_name"),
      menu: uniq(links.map(text)).slice(0, 30),
      menuLinks: uniq(links.map((a) => a.href)).slice(0, 40),
      headings: uniq([...document.querySelectorAll("h1, h2, h3")].map((h) => `${h.tagName.toLowerCase()} ${text(h)}`)).slice(0, 60),
      paragraphs: uniq([...document.querySelectorAll("p, li")].map(text).filter((t) => t.length > 50)).slice(0, 40),
      buttons: uniq([...document.querySelectorAll("button, a.button, a.btn, [class*='btn']")].map(text).filter((t) => t.length < 60)).slice(0, 30),
      footer: text(document.querySelector("footer")).slice(0, 1500),
      data: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent?.trim() ?? "").slice(0, 4),
    };
  });
}

function digestOf(id, line, sites) {
  const out = [
    `# ${id}`,
    "",
    `Keywords: ${line.keywords || "—"}`,
    `Addresses: ${line.urls.join(" ")}`,
    `Read on ${new Date().toISOString().slice(0, 10)} by \`npm run work-pull\`. The client's own words, to write the entry from: never copied onto the site as they are.`,
  ];
  const list = (title, xs) => (xs.length ? ["", `### ${title}`, "", ...xs.map((x) => `- ${x}`)] : []);
  for (const s of sites) {
    out.push("", `## ${s.url}`, "");
    if (s.error) {
      out.push(`Not read: ${s.error}`);
      continue;
    }
    const p = s.home;
    out.push(
      `- Title: ${p.title}`,
      `- Description: ${p.description || "—"}`,
      `- Open Graph: ${[p.siteName, p.ogTitle, p.ogDescription].filter(Boolean).join(" · ") || "—"}`,
      `- Language: ${p.lang || "—"}`,
      ...list("Menu", p.menu),
      ...list("Headings", p.headings),
      ...list("Text", p.paragraphs),
      ...list("Buttons", p.buttons),
      ...(p.footer ? ["", "### Footer", "", p.footer] : []),
      ...(p.data.length ? ["", "### Structured data", "", ...p.data.map((d) => "```json\n" + d.slice(0, 3000) + "\n```")] : []),
    );
    for (const sub of s.pages) {
      out.push("", `### Page: ${sub.url}`, "", `- Title: ${sub.title}`, ...sub.headings.map((h) => `- ${h}`), ...sub.paragraphs.slice(0, 12).map((t) => `  ${t}`));
    }
  }
  return out.join("\n") + "\n";
}

async function shoot(page, id, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: TIMEOUT });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  const first = join(assets, `${id}.png`);
  const has = readdirSync(assets).some((f) => f.replace(/\.[^.]+$/, "") === id);
  if (retake || !has) {
    await page.screenshot({ path: first, type: "png" });
    console.log(`  ✓ first screen → src/assets/work/${id}.png`);
  }
  const png = await page.screenshot({ fullPage: true, type: "png" });
  const meta = await sharp(png).metadata();
  const h = Math.min(meta.height ?? MAX_HEIGHT, MAX_HEIGHT);
  await sharp(png)
    .extract({ left: 0, top: 0, width: meta.width ?? WIDTH, height: h })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(join(assets, `${id}-full.jpg`));
  console.log(`  ✓ whole page → src/assets/work/${id}-full.jpg (${meta.width}×${h})`);
}

/* ---------- The run ---------- */
let chromium = null;
if (!offline) {
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    try {
      ({ chromium } = createRequire(import.meta.url)("playwright"));
    } catch {
      console.error("Playwright isn't installed (npm i -D playwright && npx playwright install chromium): ordering and scaffolding only.");
    }
  }
}
const browser = chromium ? await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined }) : null;
mkdirSync(digests, { recursive: true });
const seen = new Set();

try {
  for (const line of lines) {
    const entry = entryFor(line);
    if (only.length && !only.includes(entry.id)) continue;
    if (seen.has(entry.id)) console.warn(`  ! ${entry.id} is on two lines: the later one wins`);
    seen.add(entry.id);
    console.log(`${line.order}. ${entry.id}${entry.missing ? " (new, a draft)" : ""}`);

    // Read the sites first: a new entry takes its name from them.
    const sites = [];
    if (browser && line.urls.length) {
      for (const url of line.urls) {
        const page = await (await browser.newContext({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 })).newPage();
        try {
          const home = await readPage(page, url);
          const host = hostOf(url);
          const subs = home.menuLinks.filter((u) => {
            try {
              const v = new URL(u);
              return hostOf(u) === host && v.pathname !== new URL(url).pathname && !v.hash && !/\.(pdf|jpe?g|png|zip)$/i.test(v.pathname);
            } catch {
              return false;
            }
          });
          const pages = [];
          for (const u of subs.slice(0, PAGES)) {
            try {
              const p = await readPage(page, u);
              pages.push({ url: u, title: p.title, headings: p.headings, paragraphs: p.paragraphs });
            } catch (err) {
              pages.push({ url: u, title: `not read: ${err.message.split("\n")[0]}`, headings: [], paragraphs: [] });
            }
          }
          sites.push({ url, home, pages });
          console.log(`  ✓ read ${url} (+${pages.length} pages)`);
          if (url === line.urls[0]) await shoot(page, entry.id, url);
        } catch (err) {
          const why = err.message.split("\n")[0];
          sites.push({ url, error: why });
          console.error(`  ✗ ${url}: ${why}`);
          if (/TUNNEL|ENOTFOUND|NAME_NOT_RESOLVED|ERR_CONNECTION|ERR_PROXY/.test(why))
            console.error("    the network doesn't reach it: in a Claude Code cloud session, allow the host in the environment's Network access.");
        } finally {
          await page.context().close();
        }
      }
      if (sites.some((s) => !s.error)) {
        writeFileSync(join(digests, `${entry.id}.md`), digestOf(entry.id, line, sites));
        console.log(`  ✓ digest → tools/work/digests/${entry.id}.md`);
      }
    }

    if (entry.missing) {
      const name = sites.find((s) => !s.error)?.home;
      const md = scaffold(entry.id, line, name?.siteName || name?.ogTitle || "");
      const file = join(dir, `${entry.id}.md`);
      writeFileSync(file, md);
      entries.push({ id: entry.id, file, md, urls: line.urls }); // the lines after this one see it
      console.log(`  ✓ scaffold → src/content/work/${entry.id}.md (draft: true)`);
    } else {
      const md = readFileSync(entry.file, "utf8");
      const next = md.replace(/^order: \d+/m, `order: ${line.order}`);
      if (next !== md) {
        writeFileSync(entry.file, next);
        console.log(`  ✓ order ${line.order}`);
      }
    }
  }
} finally {
  await browser?.close();
}

const listed = new Set(lines.map((l) => entryFor(l).id));
const left = read().filter((e) => !listed.has(e.id));
if (left.length) console.log(`Not in lavori.txt (their order stays): ${left.map((e) => e.id).join(", ")}`);
