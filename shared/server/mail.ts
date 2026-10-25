/* ============================================================
   Email — one sender for every form of both sites.
   The transport, the first that is configured:
   - SMTP, when SMTP_HOST is set: the mailbox's own server (the
     provider of info@alpacode.it). SMTP_PORT 465 (TLS) or 587
     (STARTTLS), SMTP_USER (default: the sender address), SMTP_PASS
     (the mailbox's password, or an app password). The simplest to set
     up, and the visitors' auto-replies leave like any mail from that
     box.
   - AWS SES, when AWS_REGION is set: credentials from the standard
     provider chain (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY env vars
     or an IAM role). Auto-replies reach the visitors only once the
     account is out of the SES sandbox (in it, only verified addresses
     receive).
   - Neither: the message is logged and the call succeeds, so every
     form is testable end to end without credentials. In production
     that means nothing reaches the inbox, and the log says so on every
     message: `docker compose logs alpacode-website | grep "NOT SENT"`.
   ============================================================ */
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import type { Transporter } from "nodemailer";
import { business } from "../data/business";
import { readEnv } from "./env";

export interface Mail {
  /** Log prefix ("contact", "referral"): `docker compose logs | grep "\[contact\]"`. */
  tag: string;
  subject: string;
  text: string;
  /** The same message as HTML, for a mail a person reads (an auto-reply). */
  html?: string;
  /** Defaults to CONTACT_TO_EMAIL (the studio inbox). */
  to?: string;
  replyTo?: string;
  /** The name the recipient sees next to the sender address. */
  fromName?: string;
}

type Transport =
  | { kind: "smtp"; host: string; port: number; user: string; pass: string }
  | { kind: "ses"; region: string }
  | { kind: "none" };

function transport(): Transport {
  const host = readEnv("SMTP_HOST");
  if (host) {
    const port = Number(readEnv("SMTP_PORT") ?? "465") || 465;
    return { kind: "smtp", host, port, user: readEnv("SMTP_USER") ?? fromAddress(), pass: readEnv("SMTP_PASS") ?? "" };
  }
  const region = readEnv("AWS_REGION") ?? readEnv("AWS_DEFAULT_REGION");
  if (region) return { kind: "ses", region };
  return { kind: "none" };
}

const fromAddress = (): string => readEnv("CONTACT_FROM_EMAIL") ?? business.email;
const production = (): boolean => readEnv("NODE_ENV") === "production";

/* Once per process, the first time a form sends: which way the mail
   goes, so `docker compose logs` shows it without hunting. */
let announced = false;
function announce(t: Transport): void {
  if (announced) return;
  announced = true;
  if (t.kind === "smtp") console.info(`[mail] sending through SMTP ${t.host}:${t.port} as ${t.user}`);
  else if (t.kind === "ses") console.info(`[mail] sending through AWS SES (${t.region})`);
  else if (production())
    console.warn(
      "[mail] NOT SENT: no mail transport is configured (SMTP_HOST or AWS_REGION in .env). The forms answer ok, but nothing reaches the inbox: set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (or the AWS keys), then `docker compose up -d --build`.",
    );
}

/* ---------- SES ---------- */
let sesClient: SESv2Client | null = null;
const ses = (region: string) => (sesClient ??= new SESv2Client({ region }));

/* What to fix for the failures a deploy typically hits. The services'
   own messages say what failed, not always why — least of all the
   classic trap of pasting SES *SMTP* credentials where API keys belong. */
const HINTS: Record<string, string> = {
  CredentialsProviderError:
    "no AWS credentials reached the container: set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY, then `docker compose up -d`",
  UnrecognizedClientException: "AWS_ACCESS_KEY_ID is not an active IAM access key",
  InvalidClientTokenId: "AWS_ACCESS_KEY_ID is not an active IAM access key",
  InvalidSignatureException:
    "AWS_SECRET_ACCESS_KEY doesn't match the key id (an SES SMTP password is not a secret access key)",
  SignatureDoesNotMatch:
    "AWS_SECRET_ACCESS_KEY doesn't match the key id (an SES SMTP password is not a secret access key)",
  AccessDeniedException: "the IAM user's policy must allow ses:SendEmail",
  MessageRejected:
    "the identity isn't verified in this region: check AWS_REGION, and that the domain's three DKIM CNAMEs are still in DNS (in the SES sandbox the recipient must be verified too)",
  EAUTH: "SMTP_USER / SMTP_PASS rejected: use the mailbox's password, or an app password if the provider asks for one",
  ECONNECTION: "SMTP_HOST:SMTP_PORT can't be reached: check the host, and the port (465 TLS, 587 STARTTLS)",
  ETIMEDOUT: "SMTP_HOST:SMTP_PORT timed out: check the host and the port, and that the server allows outgoing SMTP",
  ESOCKET: "the TLS handshake with SMTP_HOST failed: 465 is TLS from the start, 587 upgrades (STARTTLS)",
  EENVELOPE: "the server refused the sender or the recipient: CONTACT_FROM_EMAIL must be the mailbox (or an alias) SMTP_USER may send as",
};

/** What the socket says, when it says more than the code (nodemailer
 *  reports a refused connection as ESOCKET, like a failed handshake). */
const NET: [RegExp, string][] = [
  [/ECONNREFUSED/, "nothing answers at SMTP_HOST:SMTP_PORT: check the host and the port (465 TLS, 587 STARTTLS)"],
  [/ENOTFOUND|EAI_AGAIN/, "SMTP_HOST doesn't resolve: check how it's spelled"],
  [/EHOSTUNREACH|ENETUNREACH/, "SMTP_HOST can't be reached from the container: a firewall, or the host blocks outgoing SMTP"],
];

function describe(err: unknown): string {
  const e = (err ?? {}) as { name?: string; code?: string; message?: string; $metadata?: { httpStatusCode?: number } };
  const name = e.code ?? e.name ?? "Error";
  const status = e.$metadata?.httpStatusCode;
  const hint =
    NET.find(([re]) => re.test(e.message ?? ""))?.[1] ?? HINTS[name] ?? (e.name ? HINTS[e.name] : undefined);
  return `${name}${status ? ` (HTTP ${status})` : ""}: ${e.message ?? String(err)}${hint ? ` → ${hint}` : ""}`;
}

/* ---------- SMTP ---------- */
let smtpClient: Transporter | null = null;
async function smtp(t: Extract<Transport, { kind: "smtp" }>): Promise<Transporter> {
  if (smtpClient) return smtpClient;
  const { createTransport } = await import("nodemailer");
  smtpClient = createTransport({
    host: t.host,
    port: t.port,
    secure: t.port === 465,
    auth: t.pass ? { user: t.user, pass: t.pass } : undefined,
  });
  return smtpClient;
}

/** "sent" | "logged" (no transport: dev, or a production that forgot
 *  it) | "failed" (logged with the fix and the full message: a mail
 *  misconfiguration must not cost the lead). */
export async function sendMail(mail: Mail): Promise<"sent" | "logged" | "failed"> {
  const t = transport();
  announce(t);
  const to = mail.to ?? readEnv("CONTACT_TO_EMAIL") ?? business.email;
  const from = fromAddress();

  if (t.kind === "none") {
    const note = production() ? "NOT SENT: no mail transport configured" : "no SMTP_HOST or AWS_REGION — not sent";
    console.info(`[${mail.tag}] (${note}) to ${to}\n${mail.subject}\n${mail.text}`);
    return "logged";
  }
  try {
    if (t.kind === "smtp") {
      const client = await smtp(t);
      await client.sendMail({
        from: mail.fromName ? { name: mail.fromName, address: from } : from,
        to,
        replyTo: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      });
    } else {
      await ses(t.region).send(
        new SendEmailCommand({
          FromEmailAddress: mail.fromName ? `"${mail.fromName.replace(/"/g, "")}" <${from}>` : from,
          Destination: { ToAddresses: [to] },
          ReplyToAddresses: mail.replyTo ? [mail.replyTo] : undefined,
          Content: {
            Simple: {
              Subject: { Data: mail.subject, Charset: "UTF-8" },
              Body: {
                Text: { Data: mail.text, Charset: "UTF-8" },
                ...(mail.html ? { Html: { Data: mail.html, Charset: "UTF-8" } } : {}),
              },
            },
          },
        }),
      );
    }
    return "sent";
  } catch (err) {
    // One greppable line that names the fix, then the message itself.
    const via = t.kind === "smtp" ? `SMTP ${t.host}:${t.port}` : `SES ${t.region}`;
    console.error(`[${mail.tag}] send failed (${via}, from ${from}, to ${to}): ${describe(err)}`);
    console.error(`[${mail.tag}] undelivered message:\n${mail.subject}\n${mail.text}`);
    return "failed";
  }
}
