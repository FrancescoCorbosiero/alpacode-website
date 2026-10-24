import type { APIRoute } from "astro";

/* On whatever domain the studio is built for (STUDIO_SITE). */
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\nDisallow: /grazie/\nDisallow: /api/\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
