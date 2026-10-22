/* What the invite pages (the [code].astro routes under pages/voucher and
   pages/en/voucher) do before rendering: anything that isn't shaped like
   a code is a 404, and a personal page is never indexed and only briefly
   cached. */
import type { AstroGlobal } from "astro";
import { looksLikeCode } from "./referral-code";

/** A 404 response for a non-code segment, or null to go on rendering. */
export function inviteGuard(Astro: AstroGlobal): Promise<Response> | null {
  const raw = Astro.params.code;
  if (!looksLikeCode(raw)) return Astro.rewrite("/404");
  Astro.response.headers.set("Cache-Control", "public, max-age=300");
  Astro.response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return null;
}
