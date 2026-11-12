/* ============================================================
   The compartments of Alpacode: the house and its doors.

   alpacode.it is the house. It speaks for everything Alpacode does,
   in its own voice, to everyone — the people a compartment goes
   after included. A compartment is a line of work that runs on its
   own subdomain, with its own register and its own way of finding
   clients; the house opens its door wherever it talks about that
   work (the mega menu, the services, the footer), and every
   compartment's header leads back to the house.

   studio.alpacode.it is the first: the marketing.

   The compartments make a tree (docs/domain-tree.md): the house is
   the root, every other node names its parent. In DNS they're all
   siblings (<name>.alpacode.it); the depth is here. A node's doors
   are its children (`children()`); a leaf's way up is its parent.

   A new compartment: an entry here, a site in sites/<id>/ (the
   new-compartment skill), a service in docker-compose.yml. Origins
   are build-time (PUBLIC_*_ORIGIN), so a staging build links to its
   own hosts.
   ============================================================ */
import type { Lang, Localized } from "../i18n";

export type CompartmentId = "house" | "studio";

/** Where a node stands in the tree: the root (the house), a branch
 *  (a line of work with its own readers, voice and way to buy: the
 *  studio), a leaf (one reader or one product). */
export type CompartmentKind = "root" | "branch" | "leaf";

export interface Compartment {
  id: CompartmentId;
  kind: CompartmentKind;
  /** The node it hangs from (none for the root). */
  parent?: CompartmentId;
  /** As a header writes it. */
  name: string;
  /** The word after ALPACODE in a compartment's lockup (none for the house). */
  tag?: string;
  /** Where it lives. */
  origin: string;
  /** What it does, in one line, in the house's voice. */
  line: Localized;
  /** Its colour: a door that leads there takes it. */
  accent: string;
  /** Text on the accent. */
  accentOn: string;
  langs: Lang[];
}

const env = import.meta.env as Record<string, string | undefined>;
const origin = (key: string, fallback: string): string => (env[key] || fallback).replace(/\/+$/, "");

export const COMPARTMENTS: Record<CompartmentId, Compartment> = {
  house: {
    id: "house",
    kind: "root",
    name: "Alpacode",
    origin: origin("PUBLIC_HOUSE_ORIGIN", "https://alpacode.it"),
    line: {
      it: "Siti, e-commerce, software su misura, integrazioni AI e formazione.",
      en: "Websites, e-commerce, custom software, AI integrations and training.",
    },
    accent: "#3b72e9",
    accentOn: "#f0f3f9",
    langs: ["it", "en"],
  },
  studio: {
    id: "studio",
    kind: "branch",
    parent: "house",
    name: "Alpacode Studio",
    tag: "Studio",
    origin: origin("PUBLIC_STUDIO_ORIGIN", "https://studio.alpacode.it"),
    line: {
      it: "Il marketing di Alpacode: brand, social e contenuti, UX, campagne e SEO.",
      en: "Alpacode's marketing: brand, social and content, UX, campaigns and SEO.",
    },
    accent: "#d4ff3a",
    accentOn: "#0b0e14",
    langs: ["it"],
  },
};

/** The nodes that hang from `id`, in the registry's order. */
export function children(id: CompartmentId): CompartmentId[] {
  return (Object.keys(COMPARTMENTS) as CompartmentId[]).filter((c) => COMPARTMENTS[c].parent === id);
}

/** The way from a node up to the root, the node first
 *  (["studio", "house"]): a page's trail across the sites. */
export function trail(id: CompartmentId): CompartmentId[] {
  const out: CompartmentId[] = [];
  for (let c: CompartmentId | undefined = id; c; c = COMPARTMENTS[c].parent) out.push(c);
  return out;
}

/** The doors the house shows, in order: its children. */
export const DOORS: CompartmentId[] = children("house");

/** A link into a compartment. `from` names where the door is (the
 *  page or the block): the analytics of the compartment read it as
 *  utm_campaign, with the compartment it came from as utm_source. */
export function doorTo(id: CompartmentId, path = "/", from?: { site: CompartmentId; where: string }): string {
  const url = new URL(path, COMPARTMENTS[id].origin + "/");
  if (from) {
    url.searchParams.set("utm_source", from.site === "house" ? "alpacode" : from.site);
    url.searchParams.set("utm_medium", "door");
    url.searchParams.set("utm_campaign", from.where);
  }
  return url.href;
}
