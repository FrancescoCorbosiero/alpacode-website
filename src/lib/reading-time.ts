import type { Lang } from "../i18n/types";

const WPM: Record<Lang, number> = { it: 200, en: 220 };

const STRIP = [
  /^---[\s\S]*?---/m,                  // frontmatter
  /```[\s\S]*?```/g,                   // fenced code blocks
  /`[^`]*`/g,                          // inline code
  /!\[[^\]]*\]\([^)]*\)/g,             // images
  /\[([^\]]*)\]\([^)]*\)/g,            // links — keep text via second pass
  /[#>*_~\-]/g,                        // common md punctuation
];

function plain(body: string): string {
  let out = body;
  out = out.replace(STRIP[0], "");
  out = out.replace(STRIP[1], "");
  out = out.replace(STRIP[2], "");
  out = out.replace(STRIP[3], "");
  out = out.replace(STRIP[4], "$1");
  out = out.replace(STRIP[5], " ");
  return out;
}

export interface ReadingTime {
  words: number;
  minutes: number;
  label: string;
}

export function readingTime(body: string, lang: Lang): ReadingTime {
  const words = plain(body)
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
  const minutes = Math.max(1, Math.round(words / WPM[lang]));
  const label = lang === "it" ? `${minutes} min di lettura` : `${minutes} min read`;
  return { words, minutes, label };
}
