// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/* Alpacode FAST — the social-first sibling of alpacode.it, on its own
   subdomain: small digital products (guides, crash courses) sold through
   DM keywords, and doors back to the studio. A static site, built and
   served apart from the studio (fast/Dockerfile); it shares the repo's
   node_modules. Strategy: docs/marketing-map.md. */
export default defineConfig({
  site: process.env.FAST_SITE ?? "https://fast.alpacode.it",
  output: "static",
  integrations: [sitemap()],
});
