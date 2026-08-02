import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { localizePath } from "../../i18n/utils";
import { isoFromDisplayDate } from "../../lib/schema";

const lang = "it" as const;

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog")).sort((a, b) => a.data.order - b.data.order);
  const site = context.site ?? "https://alpacode.it";
  const selfHref = new URL(localizePath("blog/rss.xml", lang), site).href;
  return rss({
    // "(IT)" — the EN feed shares the brand name; readers subscribed to both
    // need distinguishable channel titles.
    title: "Alpacode · Blog (IT)",
    description: "Note, guide e riflessioni. Quello che impariamo lo scriviamo.",
    site,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    items: posts.map((p) => {
      const iso = isoFromDisplayDate(p.data.date[lang]);
      return {
        title: p.data.title[lang],
        description: p.data.descriptor[lang],
        link: localizePath(`blog/${p.id}`, lang),
        categories: [p.data.category[lang], p.data.audience],
        ...(iso ? { pubDate: new Date(iso) } : {}),
      };
    }),
    customData: `<language>it-IT</language><atom:link href="${selfHref}" rel="self" type="application/rss+xml"/>`,
  });
}
