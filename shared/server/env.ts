/** Runtime env first (Docker / systemd), then build-time (Vite). An empty
 *  value counts as unset, so `KEY=` in .env falls back to the default. */
export function readEnv(key: string): string | undefined {
  const fromProcess = typeof process !== "undefined" ? process.env?.[key] : undefined;
  const value = fromProcess ?? (import.meta.env as Record<string, string | undefined>)[key];
  return value === "" ? undefined : value;
}
