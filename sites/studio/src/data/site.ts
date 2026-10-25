/* ============================================================
   Alpacode Studio — the facts, the navigation, the links.
   The company facts are the house's (shared/data/business.ts); the
   studio adds its own name and where it leads. Links into the house
   go through `house()`, so its analytics know the studio sent them.
   ============================================================ */
import { business } from "@shared/data/business";
import { COMPARTMENTS, doorTo } from "@shared/data/compartments";

export { business };

export const STUDIO = COMPARTMENTS.studio;
export const HOUSE = COMPARTMENTS.house;

export const NAV = [
  { href: "/servizi/", label: "Servizi" },
  { href: "/pacchetti/", label: "Pacchetti" },
  { href: "/prodotti/", label: "Prodotti" },
  { href: "/contatti/", label: "Contatti" },
] as const;

/** A page of the house (alpacode.it), tagged with where the door is. */
export const house = (path: string, where: string): string => doorTo("house", path, { site: "studio", where });

/** WhatsApp, a way to write among the others (never the main button). */
export const wa = (text = "Ciao Alpacode Studio!"): string =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`;

/** The booking link (cal.com), inlined at build. */
export const CAL = (import.meta.env.PUBLIC_CALCOM_LINK as string | undefined) || "https://cal.eu/alpacode/30min";

export const euro = (n: number): string => `${n} €`;
