import type { Lang } from "../i18n/types";

/** localStorage key (kept identical to the design prototype). */
export const LANG_KEY = "alpacode_v2_lang";
/** Cookie name used to remember the language across visits. */
export const LANG_COOKIE = "alpacode_lang";

export function persistLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* storage may be unavailable (private mode) — ignore */
  }
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
}

export function currentLangFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";
}

/** Map the current path to the same page in the opposite locale. */
export function toggleLangPath(pathname: string): string {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.replace(/^\/en/, "");
    return rest === "" ? "/" : rest;
  }
  return pathname === "/" ? "/en/" : `/en${pathname}`;
}
