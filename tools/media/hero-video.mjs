#!/usr/bin/env node
/* ============================================================
   Home hero video — tools/media/hero-source.mp4 -> public/media/
   (hero.webm, hero.mp4, hero-poster.webp; data/home.ts heroVideo).

   1. A seamless loop: the last second crossfades into the first, and
      the loop starts one second in (the first frame of the source is
      blank milk) — so there is no jump when it wraps.
   2. The "blueprint" grade: the footage (blue ink in milk) turned
      into a duotone of the brand blue — desaturated, then multiplied
      by BLUE. Milk becomes BLUE, ink goes to near-black blue. Its
      brightest pixel is BLUE itself, so the paper type on top holds
      WCAG AA (4.8:1) on every frame with no scrim (components.css,
      .hero--video). Change BLUE and the CSS together.
   3. Encodes that keep the page fast: VP9 WebM (~0.5 MB — a duotone
      compresses well) first, H.264 MP4 (~1.4 MB) for Safari & co., no
      audio, 2 s keyframes, faststart; the poster (~10 kB) is the
      loop's first frame.

   Needs ffmpeg (with libvpx-vp9, libx264, libwebp) on the PATH.
   Run after replacing the source:   npm run hero-video
   ============================================================ */
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BLUE = "#2f63d6";
const FADE = 1; // seconds of crossfade at the seam

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "hero-source.mp4");
const out = resolve(here, "..", "..", "public", "media");
const work = mkdtempSync(join(tmpdir(), "hero-"));

const ff = (args) => execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
const duration = Number(
  execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src]).toString().trim(),
);
const [r, g, b] = [1, 3, 5].map((i) => (parseInt(BLUE.slice(i, i + 2), 16) / 255).toFixed(4));
const grade = `scale=in_color_matrix=bt709:in_range=tv,format=gbrp,hue=s=0,colorchannelmixer=rr=${r}:gg=${g}:bb=${b}`;
const toYuv = "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p";
const tags = ["-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv"];

try {
  // 1 + 2: loop and grade into a near-lossless master.
  const end = duration - FADE;
  const master = join(work, "master.mp4");
  ff([
    "-i", src,
    "-filter_complex",
    `[0:v]split=3[a][b][c];` +
      `[a]trim=start=${FADE}:end=${end},setpts=PTS-STARTPTS[body];` +
      `[b]trim=start=${end}:end=${duration},setpts=PTS-STARTPTS[tail];` +
      `[c]trim=start=0:end=${FADE},setpts=PTS-STARTPTS[head];` +
      `[tail][head]xfade=transition=fade:duration=${FADE}:offset=0[seam];` +
      `[body][seam]concat=n=2:v=1:a=0,${grade},${toYuv}[out]`,
    "-map", "[out]", "-an", "-c:v", "libx264", "-preset", "veryslow", "-crf", "16", ...tags, master,
  ]);

  // 3: the web encodes and the poster.
  const webm = join(out, "hero.webm");
  const mp4 = join(out, "hero.mp4");
  const poster = join(out, "hero-poster.webp");
  ff(["-i", master, "-an", "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "1", "-g", "48", ...tags, webm]);
  ff([
    "-i", master, "-an", "-c:v", "libx264", "-preset", "veryslow", "-crf", "25", "-profile:v", "high", "-level", "4.0",
    "-g", "48", "-keyint_min", "48", "-sc_threshold", "0", "-movflags", "+faststart", "-tag:v", "avc1", ...tags, mp4,
  ]);
  ff(["-i", master, "-frames:v", "1", "-vf", "scale=in_color_matrix=bt709:in_range=tv,format=rgb24", "-c:v", "libwebp", "-quality", "74", poster]);
  for (const f of [webm, mp4, poster]) console.log(`✓ public/media/${f.split("/").pop()} (${Math.round(statSync(f).size / 1024)} kB)`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
