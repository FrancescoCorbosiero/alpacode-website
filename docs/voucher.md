# «Segnala un amico» — the referral program (`/voucher`)

The cashback program: whoever refers someone who becomes a client gets
**up to €100** by bank transfer, PayPal or voucher. It started as the
printed flyer «Conosci qualcuno a cui potrebbe servire un sito web?» and as
its own site (alpacode-voucher, `voucher.alpacode.it`); it now lives here,
on the same stack, tokens, motion engine and alpaca as the rest of
alpacode.it.

One program, **two doors** — same rules, same codes, same ledger, each
speaking to whoever is being referred:

| Door | For whoever knows… | Page |
| --- | --- | --- |
| `sito` | someone who could use a website or an online store (the flyer) | `/voucher/` |
| `nuova-attivita` | someone who **just opened a business** and needs all of the digital side: logo, site, Google, advertising, management tools | `/voucher/nuova-attivita/` |

## Pages

| URL | What | Render |
| --- | --- | --- |
| `/voucher/` · `/en/voucher/` | The flyer's landing, for referrers | static |
| `/voucher/nuova-attivita/` · `/en/…` | The new-business landing, for referrers | static |
| `/voucher/<CODE>` · `/en/voucher/<CODE>` | Where the friend lands: «Mario ti ha consigliato Alpacode», free first call, a short form | on demand |
| `/voucher/nuova-attivita/<CODE>` · `/en/…` | The same for someone who just opened | on demand |
| `/voucher/privacy/` · `/en/voucher/privacy/` | The program's privacy notice (**draft**) | static |
| `POST /api/referral` | The program's endpoint | on demand |

SEO: the landings and the notice are in the sitemap with hreflang and
self-canonicals, FAQPage + BreadcrumbList JSON-LD. Invite pages are
personal, so `noindex, nofollow` (meta + `X-Robots-Tag`), never in the
sitemap, cached 5 minutes. A path segment shaped like a code but invalid
(a link cut short in a chat) still opens an anonymous invite; anything
else under `/voucher/` is a 404. The footer's "Collabora" column and the
⌘K palette link both doors.

## How the codes work

`MARIO-7K2QX` = first name (ASCII, max 12 letters) + 5 Crockford base32
characters of an HMAC-SHA256 of the email with `REFERRAL_SECRET`. Same
email → same code, no database, no account. A code belongs to a person,
not to a door: the invite link carries the door (`/voucher/MARIO-7K2QX`,
`/voucher/nuova-attivita/MARIO-7K2QX`), so the friend lands on the page
that matches the message. Every email to the studio carries the code in
the subject: a mailbox search rebuilds a referral's whole story.

## The ledger

Every accepted submission is appended to `REFERRAL_LEDGER` (default
`./data/referrals.jsonl`; in Docker the `referral-data` volume at
`/app/data`), one JSON per line, with the door it came from (`program`).
It powers the "already referred" check (`[GIÀ SEGNALATA]` in the subject)
and the referrer lookup on invite requests. Read it with `grep`, back up
the volume (`docker compose down -v` deletes it). It never blocks a
request: a submission is refused only when the email failed **and** the
ledger couldn't be written.

Implications of keeping it in the site's container: the container now has
state (one volume to back up), a site redeploy restarts the API for a few
seconds (the file survives), and it assumes one replica — two containers
writing the same file would need a shared store instead.

## Environment

| Variable | What |
| --- | --- |
| `REFERRAL_SECRET` | Long random value (`openssl rand -hex 32`), never changed afterwards: a new secret means new codes. If the program ever ran on `voucher.alpacode.it`, reuse its secret. |
| `REFERRAL_LEDGER` | Ledger path, or `off`. |
| `REFERRAL_CONFIRM_EMAILS` | `1` also emails referrers their link (needs SES out of the sandbox). |
| `SITE_URL` | Origin of the links the API hands out; empty = `https://alpacode.it`. |
| `AWS_*`, `CONTACT_*` | The site's SES setup (`lib/server/mail.ts`, shared with `/api/contact`). Without `AWS_REGION` every message is logged (`grep "\[referral\]"`) and the flow works offline. |

## Where to change what

| What | File |
| --- | --- |
| The doors' copy (hero, studio message, FAQ, cross-links, finale) | `src/data/voucher/landing.ts` |
| Invite pages | `src/data/voucher/invite.ts` |
| Copy both doors share (payouts, steps, studio UI, forms, QR band, promises, values) | `src/data/voucher/shared.ts` |
| The new-business kit (business types, the four things per type) | `src/data/voucher/kit.ts` |
| Note e condizioni | `src/data/voucher/terms.ts` |
| Privacy notice (**draft to validate**) | `src/data/voucher/privacy.ts` |
| Doors, paths, invite links | `src/lib/voucher/program.ts` |
| Page pieces | `src/components/voucher/*` (views: `Landing.astro`, `Invite.astro`) |
| Behaviour | `src/lib/voucher/landing.ts`, `invite.ts`, `forms.ts` (the sticky pill: `src/lib/sticky.ts`, shared with the campaign landings) |
| Styles (scoped under `.rf`, shipped with these pages only) | `src/styles/voucher.css` |
| API and server helpers | `src/pages/api/referral.ts`, `src/lib/server/*` |
| Motion (the sticker, the decoding link, the QR that prints, the burst, the steps' alpaca) | `src/lib/motion.ts` — the one engine |

**Photo**: `tools/media/amici-laptop.jpg` is the flyer's photo, upscaled 3×
(EDSR) from the 1024 px file; `npm run media` writes the AVIF/WebP/JPEG
variants to `public/media/`. **Link previews**: `tools/og/og-voucher*.svg` →
`npm run og` (cards with the photo come out as ~100 kB JPEG: WhatsApp skips
preview images above ~300 kB).

## The old domain

If `voucher.alpacode.it` ever went live, keep its links working with a
Caddy block on the proxy (a Caddyfile, or the equivalent labels):

```caddy
voucher.alpacode.it {
	@invite path_regexp inv ^/(en/)?invito/([A-Za-z0-9-]+)
	redir @invite https://alpacode.it/{re.inv.1}voucher/{re.inv.2} permanent
	@en path /en /en/*
	redir @en https://alpacode.it/en/voucher/ permanent
	redir https://alpacode.it/voucher/ permanent
}
```

## Before launch

- The **privacy notice** is a draft written in the style of the site's: have
  it reviewed by whoever handles the legal side.
- Condition n. 1 now covers **every service** (the new-business door refers
  people who need more than a site): confirm it, or narrow it.
- The amounts: the pages say «fino a 100 €», confirmed in writing at
  validation. If there are tiers (e.g. a site vs a full start-up kit), they
  go in the FAQ (`landing.ts`) and in the conditions.
- Two rules in the FAQ to confirm: «if a person comes from more than one
  side, the first valid referral counts» and «anyone can take part, no need
  to be a client».
