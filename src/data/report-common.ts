import type { Localized } from "../i18n/types";

/* ============================================================
   Shared vocabulary of the public reports.

   Alpacode publishes more than one annual report (environmental
   sustainability, social impact). They are different in what
   they measure and identical in how they are structured: four
   quarters, closed as they end, with the commitments' status
   alongside. These are the types both share, so the two can't
   quietly drift apart.
   ============================================================ */

export type QuarterId = "Q1" | "Q2" | "Q3" | "Q4";

/** Closed = counted. Open = running, no figures yet. Upcoming = not started. */
export type QuarterState = "closed" | "open" | "upcoming";

/** A commitment and where it stands in a given year. */
export interface PledgeStatus {
  t: Localized;
  state: "done" | "doing" | "planned";
  note: Localized;
}
