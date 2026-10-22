# Stato del progetto

_Aggiornato il 22 ottobre 2026. Si aggiorna a fine sessione (skill
`handoff`). È scritto in italiano perché è anche la lista che il
proprietario rilegge e corregge._

Il lavoro è un **diamante grezzo**: molte scelte qui sotto le ha fatte
Claude in autonomia ("vedi tu") e vanno confermate. Prima di costruire
sopra a qualcosa della sezione «Ipotesi da validare», chiedi.

## Cosa c'è

| Area | Dove | Stato |
| --- | --- | --- |
| «Segnala un amico» (cashback fino a 100 €) | `/voucher/`, `/voucher/nuova-attivita/`, `POST /api/referral` — `docs/voucher.md` | Migrato dal repo `alpacode-voucher`, che è superato. Ledger JSONL su volume Docker. |
| Hero della home con video «blueprint» | `src/data/home.ts` (`heroVideo`), `tools/media/` | Fatto. |
| Kit delle landing | `src/styles/landing.css`, `src/components/landing/`, `src/lib/landing/` | Fatto: lavagne blueprint e carta, la penna dello studio, scene GSAP fissate. |
| Per chi fa siti (sviluppatori e web designer) | `/per-chi-fa-siti/` (hub), `/hosting/`, `/ai/` — dati in `src/data/landing/` | Fatto, IT + EN. |
| Campagne «sito a N €/anno» | `/offerta/*` (5 pubblici) — `src/data/campaigns.ts` | Rifatte sul kit. |
| Social media manager, Partner | `/social-media-manager/`, `/partner/` | Rifatte sul kit. |
| Frasi «cheap» | tutto il sito | Tolte; elenco vietato in `docs/landing-factory.md`. |
| Registro dei pubblici | `src/data/audiences.ts` | Fatto: attività, professionisti, segnalatori, chi fa siti. |
| Alpacode FAST v1 | `fast/` → fast.alpacode.it: `/`, `/sito/`, `/ai/`, `/code/`, `/bio/`, `/amico/` | Costruito, **non ancora online** (manca il DNS). |
| La mappa | `docs/marketing-map.md` | I due siti, i pubblici, le parole chiave DM, la scala. |

Il resto di alpacode.it (home, servizi, lavori, learning, blog…) ha
ancora il linguaggio visivo precedente al kit.

## Decisioni del proprietario

- Il voucher vive dentro alpacode.it, sotto `/voucher`, con una porta in
  più per chi ha appena aperto un'attività.
- Il video come sfondo dell'hero della home.
- Basta frasi tipo «prezzo deciso prima», «nessun costo sorpresa»:
  suonano cheap.
- Le landing devono avere la «riforma GSAP»: animazioni forti, non il
  design generico.
- Il marketing aggressivo (paura dell'AI → leva, «scrivi FAST in DM»)
  va su un sito o sottodominio separato.
- Prezzi indicati: guida sito vetrina **22 €**, marketing **+48 €**.
- Il deploy è **solo** `docker compose up -d --build`: niente profili o
  passaggi in più.

## Ipotesi da validare

Decise da Claude, non confermate.

**Per chi fa siti**
- Una pagina hub + due pagine (hosting, AI), invece di quattro pagine
  per sviluppatori e designer: le differenze le fa il selettore
  «Sviluppatore / Web designer» (ricordato, `?per=designer` dagli
  annunci).
- La formula a scala: Codebase → Corso + codebase → Formazione 1:1, ogni
  gradino include il precedente, il livello consigliato per profilo è
  segnato a mano. Prezzi su richiesta.
- Cosa c'è nelle codebase (`src/data/landing/hosting.ts`, `ai.ts`): è
  una bozza, va allineata al prodotto vero.
- Proposte mai confermate: scalare il prezzo del gradino già comprato;
  un pacchetto hosting + AI.

**Landing dello studio**
- Countdown tolto; scadenza del giro portata al 31/12/2026; i posti
  liberi si vedono solo quando sono meno di quelli offerti (`seatsLeft`
  si aggiorna a mano).
- Tolti i box «trust» con loghi e prove segnaposto: tornano quando sono
  veri.
- La «Corsia veloce» della pagina SMM è solo una richiesta di contatto,
  non un pagamento online.
- Partner: tre modelli (segnala, rivendi, scambia), nessuna cifra sulle
  provvigioni («condizioni definite per iscritto»); il modulo resta
  sull'ancora `#candidatura`.

**Alpacode FAST**
- Nome «Alpacode FAST», dominio fast.alpacode.it, parole chiave `FAST`,
  `SITO`, `AI`, `CODE`, `BIO`, `AMICO`.
- «+ marketing + 48 eur» letto come pacchetto guida + modulo a **70 €**;
  22 € e 48 € trattati come prezzi finali IVA inclusa.
- «Paghi a partire dal secondo anno» letto così: il sito che costruisci
  nel crash course lo ospita Alpacode, gratis il primo anno, poi un
  canone annuale (cifra da decidere).
- Il crash course «AI al lavoro», i suoi moduli, i capitoli della guida
  e del modulo Marketing, le risposte delle FAQ: bozze.
- Tolto «perché pagare un web designer?»: FAST vende anche ai web
  designer (`/code`).
- `/code`, `/bio`, `/amico` rimandano alle pagine dello studio invece di
  vendere un prodotto FAST.
- Solo italiano; nessuna raccolta email; i DM passano da WhatsApp con la
  parola già scritta.
- Le risposte nella chat dell'hero sono la bozza delle risposte
  automatiche dei DM.
- Umami su FAST si carica senza banner (è senza cookie); sullo studio
  resta dietro consenso.
- Su alpacode.it, in tono professionale: l'obiezione «l'AI mi toglierà
  il lavoro?» su `/per-chi-fa-siti/ai` e `/partner`, una scheda FAST su
  `/learning`.

## Decisioni aperte

- Prezzo del crash course; canone dal secondo anno; cosa include il
  primo anno gratis (hosting? dominio? email?).
- Piattaforma di pagamento per FAST: consigliato un merchant of record
  (Lemon Squeezy, Gumroad, Paddle) che gestisce l'IVA UE sui prodotti
  digitali. I link vanno in `fast/src/data/products.ts`.
- Account Instagram (handle) → `fast/src/data/site.ts`.
- Contenuti veri di guida, modulo e corso.
- Strumento per le risposte automatiche dei DM (ManyChat, le risposte
  automatiche di Meta o di WhatsApp Business…).
- DNS di fast.alpacode.it (poi basta il solito deploy).
- Portare il linguaggio del kit sul resto di alpacode.it?
- FAST anche in inglese?
- Archiviare il repo `alpacode-voucher` e far puntare voucher.alpacode.it
  (se è ancora online) su alpacode.it/voucher/.

## Da sapere

- L'immagine Docker di FAST non è mai stata costruita in una sessione
  (nessun demone Docker disponibile): il primo deploy è anche il primo
  test del container. La build del sito invece è verificata.
- Non ci sono test automatici oltre a check e build (anche in CI).
- Pagine prodotto in pre-lancio, `noindex` e fuori dalla sitemap:
  `/hive-commerce`, `/alpacode-pro-kit`, `/paco`.
- L'email del sito è `info@alpacode.it` (il vecchio prompt diceva
  `ciao@`).

## Sessioni

- PR #47 — un solo motore di animazioni e un solo invio email; il
  voucher dentro il sito; il video della home.
- PR #48 — via le frasi cheap; per chi fa siti (hosting, AI, hub); le
  landing `/offerta/*`, SMM e partner rifatte sul kit.
- Dopo la #48 — Alpacode FAST v1, la mappa, il contesto per Claude Code
  (`CLAUDE.md`, questo file, la skill `handoff`).
