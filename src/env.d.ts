/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CALCOM_LINK?: string;
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
