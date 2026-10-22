/* ============================================================
   Email via AWS SES — one sender for every form on the site.
   Credentials come from the standard provider chain
   (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY env vars or an IAM
   role); AWS_REGION is the toggle for "SES is configured": without
   it the message is logged and the call succeeds, so every form is
   testable end to end without AWS credentials.
   ============================================================ */
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { business } from "../../data/business";
import { readEnv } from "./env";

let client: SESv2Client | null = null;
const ses = (region: string) => (client ??= new SESv2Client({ region }));

/* What to fix for the SES failures a deploy typically hits. AWS's own
   messages say what failed, not always why — least of all the classic
   trap of pasting SES *SMTP* credentials where API keys belong. */
const SES_HINTS: Record<string, string> = {
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
};

function describe(err: unknown): string {
  const e = (err ?? {}) as { name?: string; message?: string; $metadata?: { httpStatusCode?: number } };
  const name = e.name ?? "Error";
  const status = e.$metadata?.httpStatusCode;
  const hint = SES_HINTS[name];
  return `${name}${status ? ` (HTTP ${status})` : ""}: ${e.message ?? String(err)}${hint ? ` → ${hint}` : ""}`;
}

export interface Mail {
  /** Log prefix ("contact", "referral"): `docker compose logs | grep "\[contact\]"`. */
  tag: string;
  subject: string;
  text: string;
  /** Defaults to CONTACT_TO_EMAIL (the studio inbox). */
  to?: string;
  replyTo?: string;
}

/** "sent" | "logged" (no AWS_REGION, dev) | "failed" (logged with the fix
 *  and the full message: a mail misconfiguration must not cost the lead). */
export async function sendMail(mail: Mail): Promise<"sent" | "logged" | "failed"> {
  const region = readEnv("AWS_REGION") ?? readEnv("AWS_DEFAULT_REGION");
  const to = mail.to ?? readEnv("CONTACT_TO_EMAIL") ?? business.email;
  const from = readEnv("CONTACT_FROM_EMAIL") ?? business.email;

  if (!region) {
    console.info(`[${mail.tag}] (no AWS_REGION — not sent via SES) to ${to}\n${mail.subject}\n${mail.text}`);
    return "logged";
  }
  try {
    await ses(region).send(
      new SendEmailCommand({
        FromEmailAddress: from,
        Destination: { ToAddresses: [to] },
        ReplyToAddresses: mail.replyTo ? [mail.replyTo] : undefined,
        Content: {
          Simple: {
            Subject: { Data: mail.subject, Charset: "UTF-8" },
            Body: { Text: { Data: mail.text, Charset: "UTF-8" } },
          },
        },
      }),
    );
    return "sent";
  } catch (err) {
    // One greppable line that names the fix, then the message itself.
    console.error(`[${mail.tag}] SES send failed (region ${region}, from ${from}, to ${to}): ${describe(err)}`);
    console.error(`[${mail.tag}] undelivered message:\n${mail.subject}\n${mail.text}`);
    return "failed";
  }
}
