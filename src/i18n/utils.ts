import { DEFAULT_LANG, type Lang } from "./types";

const trim = (slug: string) => slug.replace(/^\/+|\/+$/g, "");

/**
 * Build a localized, root-relative URL for a content slug.
 * Slugs are shared across locales; the English tree lives under `/en/`.
 *   localizePath("",             "it") -> "/"
 *   localizePath("servizi",      "it") -> "/servizi/"
 *   localizePath("",             "en") -> "/en/"
 *   localizePath("servizi",      "en") -> "/en/servizi/"
 *   localizePath("blog/rss.xml", "it") -> "/blog/rss.xml"
 *
 * Pages get a trailing slash: the build emits directories (`/servizi/`),
 * so this keeps internal links and hreflang identical to the canonical
 * URLs and to what @astrojs/sitemap publishes — previously they disagreed
 * on every page ("/servizi" vs "/servizi/"), which reads as conflicting
 * signals in Search Console. Paths with an extension (feeds) stay bare.
 */
export function localizePath(slug: string, lang: Lang): string {
  const clean = trim(slug);
  const suffix = clean && !clean.includes(".") ? "/" : "";
  if (lang === DEFAULT_LANG) {
    return clean ? `/${clean}${suffix}` : "/";
  }
  return clean ? `/en/${clean}${suffix}` : "/en/";
}

/** The opposite locale of the one given. */
export function otherLang(lang: Lang): Lang {
  return lang === "it" ? "en" : "it";
}

/** Pick the localized variant of a `{ it, en }` record. */
export function pick<T>(value: Record<Lang, T>, lang: Lang): T {
  return value[lang];
}
