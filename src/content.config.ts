import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localized = z.object({ it: z.string(), en: z.string() });

/** Site target audiences (+ a cross-cutting "insights" section) for the Blog page tabs. */
export const AUDIENCES = ["clients", "developers", "insights"] as const;
export type Audience = (typeof AUDIENCES)[number];

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      /** Lower = newer; controls list order. */
      order: z.number(),
      /** Display date as shown in the design, e.g. "05 — 2026". */
      date: localized,
      category: localized,
      title: localized,
      descriptor: localized,
      /** Which target audience this post is written for — drives the Blog tabs. */
      audience: z.enum(AUDIENCES).default("clients"),
      /** Optional cover image (drop file in src/assets/blog/, reference it from frontmatter). */
      cover: image().optional(),
      /** Alt text for the cover image. */
      coverAlt: localized.optional(),
      /** Author display name (defaults to "Alpacode" when omitted). */
      author: z.string().optional(),
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
    /** Client quote shown on the card. Keep it short and attributed. */
    quote: localized.optional(),
    quoteAttr: z.string().optional(),
  }),
});

export const collections = { blog, work };
