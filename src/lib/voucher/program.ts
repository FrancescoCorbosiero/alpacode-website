/* ============================================================
   «Segnala un amico» — one program, two doors. Same rules, same
   codes, same ledger; each door speaks to whoever is referred:
     sito            /voucher/                — the printed flyer:
                     "Conosci qualcuno a cui potrebbe servire un sito web?"
     nuova-attivita  /voucher/nuova-attivita/ — the root of it:
                     "Conosci qualcuno che ha appena aperto un'attività?"
   A referral code belongs to a person, not to a door: the invite
   link carries the door (/voucher/<CODE>, /voucher/nuova-attivita/<CODE>)
   so the friend lands on the page that matches the message.
   ============================================================ */
import type { Lang } from "../../i18n/types";
import { localizePath } from "../../i18n/utils";

export type ProgramId = "sito" | "nuova-attivita";
export const PROGRAMS: readonly ProgramId[] = ["sito", "nuova-attivita"];
export const isProgram = (v: unknown): v is ProgramId => PROGRAMS.includes(v as ProgramId);

const SLUG: Record<ProgramId, string> = {
  sito: "voucher",
  "nuova-attivita": "voucher/nuova-attivita",
};

/** Slug of a door's landing, without the language prefix ("voucher/nuova-attivita"). */
export const programSlug = (p: ProgramId): string => SLUG[p];

/** Root-relative URL of a door's landing: "/voucher/", "/en/voucher/nuova-attivita/". */
export const programPath = (p: ProgramId, lang: Lang): string => localizePath(SLUG[p], lang);

/** Root-relative path of a referrer's invite page on a door — no trailing
 *  slash, it's the link people paste: "/voucher/MARIO-7K2QX". */
export const invitePath = (code: string, lang: Lang, p: ProgramId = "sito"): string =>
  `${lang === "en" ? "/en" : ""}/${SLUG[p]}/${code}`;

/** The program's privacy notice. */
export const PRIVACY_SLUG = "voucher/privacy";

/** Labels for the studio's emails. */
export const PROGRAM_LABEL: Record<ProgramId, string> = {
  sito: "Sito web",
  "nuova-attivita": "Nuova attività",
};
