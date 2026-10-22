/* Issuing referral codes: <FIRST NAME>-<5 Crockford chars of HMAC(email)>.
   Deterministic per email, so "I lost my link" is solved by entering the
   same email again — no database, no account. */
import { createHmac } from "node:crypto";
import { CROCKFORD, codePrefix } from "../voucher/referral-code";
import type { Lang } from "../../i18n/types";
import { readEnv } from "./env";

// The development secret of the program's first home (alpacode-voucher):
// kept, so codes issued in development stay the same.
const DEV_SECRET = "alpacode-voucher-dev-secret";
let warned = false;

function secret(): string {
  const s = readEnv("REFERRAL_SECRET");
  if (s) return s;
  if (!warned) {
    warned = true;
    console.warn(
      "[referral] REFERRAL_SECRET is not set — using the development secret. Set a long random value in production (codes stay stable only while it doesn't change).",
    );
  }
  return DEV_SECRET;
}

export function issueCode(name: string, email: string, lang: Lang): string {
  const digest = createHmac("sha256", secret()).update(email.trim().toLowerCase()).digest();
  const n = digest.readUInt32BE(0);
  let suffix = "";
  for (let i = 0; i < 5; i++) suffix += CROCKFORD[(n >>> (27 - i * 5)) & 31];
  return `${codePrefix(name, lang)}-${suffix}`;
}
