/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Umami (cookieless): the same instance as the studio, FAST's own id. */
  readonly PUBLIC_UMAMI_SRC?: string;
  readonly PUBLIC_UMAMI_FAST_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
