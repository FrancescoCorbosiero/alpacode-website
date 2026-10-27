/* ============================================================
   A page per service (/servizi/<slug>/): the shapes of its copy.
   Every service of the house that is the house's own work (build,
   teach) has one, on the landing kit (components/landing/
   ServiceLanding.astro); the growth services are Alpacode Studio's
   and open its door instead (data/services.ts).
   The copy follows the house rules (docs/landing-factory.md): say
   what is delivered and how, no prices, no figures the studio
   hasn't given (the times are the ones of /servizi), no price
   reassurance, no placeholder proof.
   ============================================================ */
import type { Objection } from "../landing/shared";

/** The hero's machine: a scene of its own per service, played on a loop
 *  by lib/landing/machines.ts, laid out in its end state without it. */
export type MachineCopy =
  | {
      kind: "roadmap";
      /** The three columns the tasks are sorted into. */
      cols: [string, string, string];
      /** The tasks, scattered, then each in its column. */
      chips: { t: string; col: 0 | 1 | 2 }[];
      note: string;
    }
  | {
      kind: "wireframe";
      url: string;
      brand: string;
      headline: string;
      cta: string;
      /** The request that comes in when the site is live. */
      ping: string;
      live: string;
      checks: string[];
    }
  | {
      kind: "checkout";
      product: string;
      add: string;
      steps: [string, string, string];
      order: string;
      /** The first order's number: the next ones count up from it. */
      first: number;
      shipped: string;
      note: string;
    }
  | {
      kind: "pipeline";
      sheet: string;
      cols: string[];
      nodes: string[];
      auto: string;
      note: string;
    }
  | {
      kind: "answer";
      inbox: string;
      threads: { q: string; source: string; a: string }[];
      draft: string;
      approve: string;
      sent: string;
    }
  | {
      kind: "heartbeat";
      site: string;
      status: string;
      backups: string;
      log: string[];
      ticket: string;
      done: string;
    }
  | {
      kind: "lesson";
      screen: string;
      teacher: string;
      you: string;
      blocks: [string, string, string];
      done: string;
    };

export interface ServiceCopy {
  meta: { title: string; description: string; ogAlt: string };
  /** The breadcrumb's last step and the portals' "for". */
  name: string;
  /** The line other pages use to point here (portals). */
  portal: string;
  hero: {
    kicker: string;
    lines: string[];
    accent: { before: string; mark: string; after: string };
    lede: string;
    cta: string;
    alt: string;
  };
  machine: MachineCopy;
  /** The facts of the service (the row's on /servizi). */
  facts: { k: string; v: string }[];
  /** When it's needed: the problem struck out by the pen, the fix
   *  written by hand beside it. */
  when: {
    title: string;
    items: { t: string; strike: string; fix: string; d: string }[];
  };
  includes: { title: string; lede: string; items: { t: string; d: string }[] };
  steps: { title: string; items: { t: string; d: string }[] };
  /** The works that prove it, when there are any (index.ts picks them). */
  works?: { title: string; lede: string };
  qa: { title: string; items: Objection[] };
  lead: {
    title: string;
    lede: string;
    topic: string;
    legend: string;
    choices: { id: string; name: string }[];
    message: { label: string; ph: string };
    extra?: { name: string; label: string; ph: string };
  };
  portals: string;
}
