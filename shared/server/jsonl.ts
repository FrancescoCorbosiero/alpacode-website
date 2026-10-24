/* ============================================================
   An append-only JSONL file: one JSON object per line, the memory of
   an endpoint that must not depend on email alone (the studio's
   orders). Grep-able, trivially backed up, and it never blocks a
   request: if the file can't be written, the caller logs and goes on.
   The referral program keeps its own ledger with its lookups
   (src/lib/server/ledger.ts).
   ============================================================ */
import { appendFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { readEnv } from "./env";

/** The path in `key`, or `fallback`; null when it is set to "off". */
export function jsonlPath(key: string, fallback: string): string | null {
  const p = readEnv(key) ?? fallback;
  return p === "off" ? null : resolve(p);
}

const warned = new Set<string>();

/** True when the line is safely on disk. */
export async function appendLine(path: string | null, entry: unknown, tag: string): Promise<boolean> {
  if (!path) return false;
  try {
    await mkdir(dirname(path), { recursive: true });
    await appendFile(path, JSON.stringify(entry) + "\n", "utf8");
    return true;
  } catch (err) {
    if (!warned.has(path)) {
      warned.add(path);
      console.warn(`[${tag}] ${path} unavailable (${(err as Error)?.message ?? err}): entries are still logged.`);
    }
    return false;
  }
}
