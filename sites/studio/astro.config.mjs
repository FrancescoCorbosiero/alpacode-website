// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";

/* Alpacode Studio — studio.alpacode.it, the first compartment of the
   house (shared/data/compartments.ts): the marketing, in its own
   register. Prerendered pages, plus the Node standalone adapter for
   the on-demand routes (the contact form, the payment providers'
   webhooks). Italian only. Its own container (sites/studio/Dockerfile),
   up with the house on the same `docker compose up -d --build`. */
export default defineConfig({
  site: process.env.STUDIO_SITE ?? "https://studio.alpacode.it",
  output: "static",
  adapter: node({ mode: "standalone" }),
  integrations: [
    sitemap({
      // The thank-you page is for buyers, not for search.
      filter: (page) => !/\/grazie\/?$/.test(page),
    }),
  ],
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  // Astro's origin check refuses form-encoded POSTs without a matching
  // Origin: Gumroad's webhook (server to server, form-encoded) would never
  // reach /api/checkout/gumroad. The routes guard themselves: the contact
  // form accepts JSON only (a cross-site form can't send it), the
  // webhooks verify the provider's signature or key.
  security: { checkOrigin: false },
  vite: {
    resolve: {
      alias: { "@shared": fileURLToPath(new URL("../../shared", import.meta.url)) },
    },
  },
});
