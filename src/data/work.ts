/* ============================================================
   The work: what the collection (src/content/work/*.md) doesn't hold.
   The kinds the /lavori filters sort by, the showcase's labels, and
   the helpers the pages share: the order, the screenshots, the next
   project.

   Screenshots, keyed by the entry's file name:
   - src/assets/work/<id>.(png|jpg|webp) — the first screen, as a
     visitor lands. The index, the home and the case page use it.
   - src/assets/work/<id>-full.(…) — the whole page, top to bottom
     (`npm run work-shots` takes it from the entry's url). When it's
     there, the case page scrolls it inside its frame.
   ============================================================ */
import type { ImageMetadata } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/types";
import { localizePath } from "../i18n/utils";

export { WORK_KINDS, KIND_LABELS, type WorkKind } from "./work-kinds";

export type Work = CollectionEntry<"work">;

/** Every project, in the order of the collection. */
export async function works(): Promise<Work[]> {
  return (await getCollection("work")).sort((a, b) => a.data.order - b.data.order);
}

/** The projects the home tells as cases, in their `featured` order. */
export async function featuredWorks(): Promise<Work[]> {
  return (await works())
    .filter((w) => w.data.featured != null && w.data.case)
    .sort((a, b) => (a.data.featured ?? 0) - (b.data.featured ?? 0));
}

export const workHref = (id: string, lang: Lang): string => localizePath(`lavori/${id}`, lang);

const shots = import.meta.glob<{ default: ImageMetadata }>("../assets/work/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
});
const shot = (name: string): ImageMetadata | undefined =>
  Object.entries(shots).find(([p]) => p.split("/").pop()?.replace(/\.[^.]+$/, "") === name)?.[1].default;

/** The first screen of the project's site. */
export const shotFor = (id: string): ImageMetadata | undefined => shot(id);
/** The whole page, when there is one. */
export const fullShotFor = (id: string): ImageMetadata | undefined => shot(`${id}-full`);

/** The host of the live site, for the frame's address bar. */
export const hostOf = (url: string | undefined): string | null => {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
};

/** Two-digit index, as the rows and the case pages number them. */
export const no = (i: number): string => String(i + 1).padStart(2, "0");

export const workLabels = {
  it: {
    all: "Tutti",
    filterBy: "Filtra per tipo di lavoro",
    view: "Vedi il caso",
    open: "Visita il sito",
    back: "Tutti i lavori",
    next: "Prossimo progetto",
    problem: "Il problema",
    solution: "Cosa abbiamo fatto",
    before: "Prima",
    after: "Dopo",
    sector: "Settore",
    place: "Dove",
    year: "Anno",
    kind: "Lavoro",
    services: "Cosa comprende",
    count: (n: number) => (n === 1 ? "1 progetto" : `${n} progetti`),
  },
  en: {
    all: "All",
    filterBy: "Filter by kind of work",
    view: "See the case",
    open: "Visit the site",
    back: "All the work",
    next: "Next project",
    problem: "The problem",
    solution: "What we did",
    before: "Before",
    after: "After",
    sector: "Sector",
    place: "Where",
    year: "Year",
    kind: "Work",
    services: "What it covers",
    count: (n: number) => (n === 1 ? "1 project" : `${n} projects`),
  },
} satisfies Record<Lang, Record<string, unknown>>;
