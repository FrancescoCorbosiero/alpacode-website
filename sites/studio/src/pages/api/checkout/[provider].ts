import type { APIRoute } from "astro";
import { createHmac, timingSafeEqual } from "node:crypto";
import { readEnv } from "@shared/server/env";
import { appendLine, jsonlPath } from "@shared/server/jsonl";
import { sendMail } from "@shared/server/mail";
import { json } from "@shared/server/guard";

/* ============================================================
   The payment providers' notifications (webhooks), one route each:
     POST /api/checkout/lemonsqueezy  X-Signature: HMAC-SHA256 (hex)
                                      of the body, with
                                      LEMONSQUEEZY_WEBHOOK_SECRET
     POST /api/checkout/stripe        Stripe-Signature (t=…,v1=…),
                                      with STRIPE_WEBHOOK_SECRET
     POST /api/checkout/gumroad?key=… Gumroad's Ping has no signature:
                                      the key in the URL must match
                                      GUMROAD_WEBHOOK_KEY (and the
                                      seller GUMROAD_SELLER_ID, if set)
   A verified sale is appended to ORDERS_LEDGER (one JSON per line,
   default ./data/orders.jsonl; in Docker the studio-data volume) and
   emailed to the studio. The providers deliver the files and the
   receipt themselves: this is the studio's own record. A provider
   without its secret answers 503, so the provider retries once it's
   configured instead of losing the event.
   ============================================================ */
export const prerender = false;

const MAX_BODY = 1_000_000;

interface Order {
  t: string;
  provider: string;
  event: string;
  id: string;
  email: string;
  name: string;
  product: string;
  amount: string;
  test: boolean;
}

const hmacHex = (secret: string, payload: string): string => createHmac("sha256", secret).update(payload, "utf8").digest("hex");

/** Constant-time comparison of two hex strings. */
function same(a: string, b: string): boolean {
  const x = Buffer.from(a, "utf8");
  const y = Buffer.from(b, "utf8");
  return x.length === y.length && timingSafeEqual(x, y);
}

const s = (v: unknown): string => (typeof v === "string" ? v : typeof v === "number" ? String(v) : "");

type Parsed = { order: Order | null } | Response;

function lemonsqueezy(request: Request, raw: string): Parsed {
  const secret = readEnv("LEMONSQUEEZY_WEBHOOK_SECRET");
  if (!secret) return json({ ok: false, error: "not_configured" }, 503);
  const sig = request.headers.get("x-signature") ?? "";
  if (!sig || !same(hmacHex(secret, raw), sig)) return json({ ok: false, error: "bad_signature" }, 401);
  const body = JSON.parse(raw) as {
    meta?: { event_name?: string; test_mode?: boolean };
    data?: { id?: string; attributes?: Record<string, unknown> };
  };
  const event = s(body.meta?.event_name);
  if (event !== "order_created") return { order: null };
  const a = body.data?.attributes ?? {};
  const item = (a.first_order_item ?? {}) as Record<string, unknown>;
  return {
    order: {
      t: new Date().toISOString(),
      provider: "lemonsqueezy",
      event,
      id: s(a.identifier) || s(body.data?.id),
      email: s(a.user_email),
      name: s(a.user_name),
      product: [s(item.product_name), s(item.variant_name)].filter(Boolean).join(" · "),
      amount: s(a.total_formatted),
      test: Boolean(body.meta?.test_mode),
    },
  };
}

function stripe(request: Request, raw: string): Parsed {
  const secret = readEnv("STRIPE_WEBHOOK_SECRET");
  if (!secret) return json({ ok: false, error: "not_configured" }, 503);
  const header = request.headers.get("stripe-signature") ?? "";
  const parts = Object.fromEntries(
    header.split(",").map((kv) => {
      const i = kv.indexOf("=");
      return [kv.slice(0, i).trim(), kv.slice(i + 1).trim()];
    }),
  ) as Record<string, string>;
  const v1 = header
    .split(",")
    .filter((kv) => kv.trim().startsWith("v1="))
    .map((kv) => kv.trim().slice(3));
  const t = Number(parts.t);
  if (!t || !v1.length) return json({ ok: false, error: "bad_signature" }, 401);
  if (Math.abs(Date.now() / 1000 - t) > 300) return json({ ok: false, error: "stale" }, 401);
  const expected = hmacHex(secret, `${t}.${raw}`);
  if (!v1.some((sig) => same(expected, sig))) return json({ ok: false, error: "bad_signature" }, 401);
  const evt = JSON.parse(raw) as { id?: string; type?: string; livemode?: boolean; data?: { object?: Record<string, unknown> } };
  if (evt.type !== "checkout.session.completed") return { order: null };
  const o = evt.data?.object ?? {};
  const customer = (o.customer_details ?? {}) as Record<string, unknown>;
  const total = typeof o.amount_total === "number" ? (o.amount_total / 100).toFixed(2) : "";
  return {
    order: {
      t: new Date().toISOString(),
      provider: "stripe",
      event: evt.type,
      id: s(o.id) || s(evt.id),
      email: s(customer.email),
      name: s(customer.name),
      product: s((o.metadata as Record<string, unknown> | undefined)?.product) || s(o.payment_link),
      amount: total ? `${total} ${s(o.currency).toUpperCase()}` : "",
      test: evt.livemode === false,
    },
  };
}

function gumroad(request: Request, raw: string): Parsed {
  const key = readEnv("GUMROAD_WEBHOOK_KEY");
  if (!key) return json({ ok: false, error: "not_configured" }, 503);
  const given = new URL(request.url).searchParams.get("key") ?? "";
  if (!same(hmacHex(key, "gumroad"), hmacHex(given, "gumroad"))) return json({ ok: false, error: "bad_key" }, 401);
  const f = new URLSearchParams(raw);
  const seller = readEnv("GUMROAD_SELLER_ID");
  if (seller && f.get("seller_id") !== seller) return json({ ok: false, error: "bad_seller" }, 401);
  const cents = Number(f.get("price") ?? "");
  return {
    order: {
      t: new Date().toISOString(),
      provider: "gumroad",
      event: f.get("refunded") === "true" ? "refund" : "sale",
      id: f.get("sale_id") ?? "",
      email: f.get("email") ?? "",
      name: f.get("full_name") ?? "",
      product: f.get("product_name") ?? f.get("permalink") ?? "",
      amount: Number.isFinite(cents) && f.get("price") ? `${(cents / 100).toFixed(2)} ${(f.get("currency") ?? "").toUpperCase()}` : "",
      test: f.get("test") === "true",
    },
  };
}

const PROVIDERS: Record<string, (request: Request, raw: string) => Parsed> = { lemonsqueezy, stripe, gumroad };

export const POST: APIRoute = async ({ params, request }) => {
  const handle = PROVIDERS[params.provider ?? ""];
  if (!handle) return json({ ok: false, error: "unknown_provider" }, 404);
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ ok: false, error: "payload_too_large" }, 413);
  let parsed: Parsed;
  try {
    parsed = handle(request, raw);
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }
  if (parsed instanceof Response) return parsed;
  const { order } = parsed;
  if (!order) return json({ ok: true, ignored: true }); // an event the studio doesn't record

  const saved = await appendLine(jsonlPath("ORDERS_LEDGER", "./data/orders.jsonl"), order, "order");
  const sent = await sendMail({
    tag: "order",
    subject: `${order.test ? "[TEST] " : ""}Ordine · ${order.product || "prodotto"} · ${order.email || order.id}`,
    text: [
      `Fornitore: ${order.provider}`,
      `Evento: ${order.event}`,
      `Ordine: ${order.id}`,
      `Prodotto: ${order.product}`,
      `Importo: ${order.amount}`,
      `Cliente: ${order.name} <${order.email}>`,
      `Registrato: ${saved ? "sì" : "no (vedi i log)"}`,
    ].join("\n"),
  });
  // The order is the provider's to keep: never make it retry for a mail problem.
  if (!saved && sent === "failed") console.error(`[order] not recorded anywhere: ${JSON.stringify(order)}`);
  return json({ ok: true });
};
