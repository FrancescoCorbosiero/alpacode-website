import { DEFAULT_LANG, type Lang } from "./types";

const trim = (slug: string) => slug.replace(/^\/+|\/+$/g, "");

/**
 * Build a localized, root-relative URL for a content slug.
 * Slugs are shared across locales; the English tree lives under `/en/`.
 *   localizePath("",         "it") -> "/"
 *   localizePath("servizi",  "it") -> "/servizi"
 *   localizePath("",         "en") -> "/en/"
 *   localizePath("servizi",  "en") -> "/en/servizi"
 */
export function localizePath(slug: string, lang: Lang): string {
  const clean = trim(slug);
  if (lang === DEFAULT_LANG) {
    return clean ? `/${clean}` : "/";
  }
  return clean ? `/en/${clean}` : "/en/";
}

/** The opposite locale of the one given. */
export function otherLang(lang: Lang): Lang {
  return lang === "it" ? "en" : "it";
}

/** Pick the localized variant of a `{ it, en }` record. */
export function pick<T>(value: Record<Lang, T>, lang: Lang): T {
  return value[lang];
}
