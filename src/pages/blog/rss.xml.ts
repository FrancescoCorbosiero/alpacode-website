import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { localizePath } from "../../i18n/utils";
import { isoFromDisplayDate } from "../../lib/schema";

const lang = "it" as const;

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog")).sort((a, b) => a.data.order - b.data.order);
  return rss({
    title: "Alpacode · Blog",
    description: "Note, guide e pensieri. Quello che impariamo lo scriviamo.",
    site: context.site ?? "https://alpacode.it",
    items: posts.map((p) => {
      const iso = isoFromDisplayDate(p.data.date[lang]);
      return {
        title: p.data.title[lang],
        description: p.data.descriptor[lang],
        link: localizePath(`blog/${p.id}`, lang),
        ...(iso ? { pubDate: new Date(iso) } : {}),
      };
    }),
    customData: "<language>it-IT</language>",
  });
}
