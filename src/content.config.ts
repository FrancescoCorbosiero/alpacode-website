import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localized = z.object({ it: z.string(), en: z.string() });

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    /** Lower = newer; controls list order. */
    order: z.number(),
    /** Display date as shown in the design, e.g. "05 — 2026". */
    date: localized,
    category: localized,
    title: localized,
    descriptor: localized,
  }),
});

const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: z.object({
    order: z.number(),
    year: z.string(),
    sector: localized,
    title: localized,
    descriptor: localized,
    tags: z.array(z.string()),
  }),
});

export const collections = { blog, work };
