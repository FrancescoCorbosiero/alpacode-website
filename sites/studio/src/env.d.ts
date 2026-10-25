/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Umami (cookieless): the same instance as the house, the studio's own id. */
  readonly PUBLIC_UMAMI_SRC?: string;
  readonly PUBLIC_UMAMI_STUDIO_ID?: string;
  /** Where the compartments live (shared/data/compartments.ts). */
  readonly PUBLIC_HOUSE_ORIGIN?: string;
  readonly PUBLIC_STUDIO_ORIGIN?: string;
  /** The booking link (cal.com). */
  readonly PUBLIC_CALCOM_LINK?: string;
  /** Ad tags: shipped only when set, loaded only after consent (lib/consent.ts). */
  readonly PUBLIC_META_PIXEL_ID?: string;
  readonly PUBLIC_GADS_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
