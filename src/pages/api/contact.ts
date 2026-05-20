import type { APIRoute } from "astro";
import { business } from "../../data/business";

// This route runs on demand (form POST), the rest of the site is static.
export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function readEnv(key: string): string | undefined {
  const fromProcess =
    typeof process !== "undefined" ? process.env?.[key] : undefined;
  return fromProcess ?? (import.meta.env as Record<string, string | undefined>)[key];
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = (await request.json()) as Record<string, string>;
  } catch {
    return json({ ok: false, error: "invalid_body" }, 400);
  }

  // Honeypot — silently accept and drop bot submissions.
  if (body.website && body.website.trim() !== "") {
    return json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message || !isEmail(email)) {
    return json({ ok: false, error: "validation" }, 422);
  }

  const subject = `Nuovo contatto · ${name}`;
  const lines = [
    `Nome: ${name}`,
    body.company ? `Azienda: ${body.company}` : null,
    `Email: ${email}`,
    body.topic ? `Argomento: ${body.topic}` : null,
    body.budget ? `Budget: ${body.budget}` : null,
    body.lang ? `Lingua: ${body.lang}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = readEnv("RESEND_API_KEY");
  const to = readEnv("CONTACT_TO_EMAIL") ?? business.email;
  const from = readEnv("CONTACT_FROM_EMAIL") ?? "Alpacode <onboarding@resend.dev>";

  // No API key configured (e.g. local dev) — log and succeed so the
  // form is testable end to end without secrets.
  if (!apiKey) {
    console.info("[contact] (no RESEND_API_KEY — not sent)\n" + lines);
    return json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ from, to, reply_to: email, subject, text: lines }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return json({ ok: false, error: "send_failed" }, 502);
    }
    return json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Resend exception", err);
    return json({ ok: false, error: "send_failed" }, 502);
  }
};
