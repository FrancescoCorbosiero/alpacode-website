/* ============================================================
   The contact form: what the reader can ask about. A link can
   choose for them: /contatti/?pacchetto=<id> or ?prodotto=<id>
   (components/Buy.astro) picks the topic and names the offer.
   ============================================================ */
import { PACKAGES } from "./packages";
import { GUIDE_OFFERS, COURSE, PRODUCTS } from "./products";

export const TOPICS = [
  { id: "social", label: "Social e contenuti" },
  { id: "brand", label: "Brand e identità" },
  { id: "ux", label: "UX e pagine" },
  { id: "campagne", label: "Campagne" },
  { id: "seo", label: "SEO e Google" },
  { id: "pacchetto", label: "Un pacchetto" },
  { id: "prodotto", label: "Un prodotto" },
  { id: "altro", label: "Altro" },
] as const;

/** Every offer a link can name, by id: what the form shows and sends. */
export const OFFERS: Record<string, { name: string; topic: "pacchetto" | "prodotto" }> = Object.fromEntries([
  ...PACKAGES.map((p) => [p.id, { name: p.name, topic: "pacchetto" as const }]),
  ...GUIDE_OFFERS.map((o) => [o.id, { name: o.id === "guida" ? "Guida Sito Vetrina" : "Guida Sito Vetrina + Modulo Marketing", topic: "prodotto" as const }]),
  ["corso", { name: `Crash course «${COURSE.name}»`, topic: "prodotto" as const }],
  ...PRODUCTS.map((p) => [p.slug, { name: p.name, topic: "prodotto" as const }]),
]);
