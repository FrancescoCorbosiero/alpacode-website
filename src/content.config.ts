import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { PLACE_IDS } from "./data/places";
import { WORK_KINDS } from "./data/work-kinds";

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
    /** What kind of work it is: the filters of /lavori. */
    kind: z.enum(WORK_KINDS),
    /** Where the client is (src/data/places.ts): the map of "Dove operiamo". */
    place: z.enum(PLACE_IDS),
    /** The live site. Only once the client is happy to have it linked. */
    url: z.string().url().optional(),
    /** Told as a case on the home, in this order. Needs `case`. */
    featured: z.number().optional(),
    /** The case in short: the home's scene and the head of the case page.
     *  The long story is the entry's body (Markdown), written later. */
    case: z
      .object({
        problem: localized,
        solution: localized,
        before: z.object({ v: localized, d: localized }),
        after: z.object({ v: localized, d: localized }),
      })
      .optional(),
    /** A client quote. Kept here while it waits for the client's word:
     *  it shows only with quoteConfirmed: true. */
    quote: localized.optional(),
    quoteAttr: z.string().optional(),
    quoteConfirmed: z.boolean().default(false),
  }),
});

export const collections = { blog, work };
