/* ============================================================
   Abuse guards and helpers shared by the public form endpoints
   (/api/contact, /api/referral). Every accepted submission sends
   an SES email, so each endpoint caps payload size, field lengths
   and submissions per IP. The limiter is in-memory, which is
   exactly right for the single-process standalone node server
   this deploys as.
   ============================================================ */

export const MAX_BODY_BYTES = 20_000;
export const MAX_FIELD = 200; // per short field (name, company, …)

/** A per-IP sliding window: `limit` submissions per `windowMs`. */
export function rateLimiter(limit: number, windowMs: number): (ip: string) => boolean {
  const hits = new Map<string, number[]>();
  return (ip: string): boolean => {
    const now = Date.now();
    const cutoff = now - windowMs;
    const recent = (hits.get(ip) ?? []).filter((t) => t > cutoff);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 1000) {
      for (const [k, v] of hits) {
        if (!v.some((t) => t > cutoff)) hits.delete(k);
      }
    }
    return recent.length > limit;
  };
}

/** Client IP. Behind Cloudflare, Caddy's X-Forwarded-For entry is a
 *  Cloudflare edge address shared by many visitors — rate-limiting on it
 *  locks everyone out after five forms — so prefer CF-Connecting-IP. That
 *  header is only trustworthy because the origin firewall accepts
 *  Cloudflare traffic alone. Without Cloudflare: Caddy appends the real
 *  client to X-Forwarded-For, so the last entry is the one our own proxy
 *  wrote (earlier ones are forgeable). */
export function clientIp(request: Request, fallback: () => string): string {
  const cf = request.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf;
  const xff = request.headers.get("x-forwarded-for");
  const last = xff?.split(",").pop()?.trim();
  if (last) return last;
  try {
    return fallback();
  } catch {
    /* clientAddress can throw on prerendered/misconfigured setups */
    return "unknown";
  }
}

export const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export const isEmail = (v: string): boolean => v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** JSON fields are attacker-controlled: coerce to string and cap length. */
export const str = (v: unknown, max = MAX_FIELD): string => (typeof v === "string" ? v : "").trim().slice(0, max);

/** The forms send JSON; anything else (e.g. a no-preflight text/plain
 *  cross-site POST) has no business here: a ready 415, or null. */
export function notJson(request: Request): Response | null {
  return request.headers.get("content-type")?.includes("application/json")
    ? null
    : json({ ok: false, error: "unsupported_media_type" }, 415);
}

/** The JSON body as an object, or a ready error response (too big, not JSON). */
export async function readJson(request: Request): Promise<Record<string, unknown> | Response> {
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: "payload_too_large" }, 413);
    const body = JSON.parse(raw) as unknown;
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not an object");
    return body as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }
}
