/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CALCOM_LINK?: string;
  readonly PUBLIC_CALCOM_ORIGIN?: string;
  readonly PUBLIC_CALCOM_EMBED_JS?: string;
  readonly PUBLIC_UMAMI_SRC?: string;
  readonly PUBLIC_UMAMI_ID?: string;
  /** Where the compartments live (shared/data/compartments.ts). */
  readonly PUBLIC_HOUSE_ORIGIN?: string;
  readonly PUBLIC_STUDIO_ORIGIN?: string;
  readonly AWS_REGION?: string;
  readonly AWS_DEFAULT_REGION?: string;
  readonly AWS_ACCESS_KEY_ID?: string;
  readonly AWS_SECRET_ACCESS_KEY?: string;
  readonly CONTACT_TO_EMAIL?: string;
  readonly CONTACT_FROM_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
