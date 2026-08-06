# Immagini — il registro dei nomi

Ogni slot immagine del sito ha un **nome file preciso**: rinomina la foto
vera esattamente come indicato, trascinala nella cartella giusta, e il
placeholder sparisce da solo alla build successiva. Formati accettati:
`.jpg .jpeg .png .webp .avif` (l'estensione è libera, conta il nome).

Tutto quello che sta qui sotto `src/assets/` viene **ottimizzato da Astro**
(WebP/AVIF + srcset responsive). Non servono ridimensionamenti a mano:
esporta a ~1600px di larghezza e ci pensa la build.

## `work/` — progetti (griglia Lavori + case della home)

Un file per progetto, col nome del file Markdown in `src/content/work/`.
Le stesse immagini alimentano anche il case picker della home (§02).
Gli screenshot attuali sono già presenti — sostituiscili pure con
versioni migliori mantenendo il nome.

| File                    | Progetto |
|-------------------------|----------|
| `work/cesana.<ext>`     | Cesana Assicuratori & Brokers |
| `work/edilcalmi.<ext>`  | EdilCalmi |
| `work/efs.<ext>`        | Eternal Fishing Shop |
| `work/ls.<ext>`         | Logistica Sanchez |
| `work/resellpiacenza.<ext>` | ResellPiacenza |
| `work/rosi.<ext>`       | Edizioni Rosi |
| `work/sm.<ext>`         | SM Luxury Chauffeur |
| `work/stiven.<ext>`     | Stiven PT |

## `people/` — le facce dello studio

| File                     | Dove appare |
|--------------------------|-------------|
| `people/francesco.<ext>` | Blocco «C'è una persona, non un ticket» sui Contatti |

Foto quadrata (o quasi), viso ben visibile: viene ritagliata 64×64.
Futuri collaboratori: `people/<nome>.<ext>` — lo slot va poi collegato
nel codice.

## `trust/` — badge e prove (landing SMM & Partner)

| File                        | Slot |
|-----------------------------|------|
| `trust/badge-google.<ext>`  | Badge Google |
| `trust/badge-aws.<ext>`     | Badge AWS · CloudFront |
| `trust/badge-ads.<ext>`     | Badge Google Ads |
| `trust/badge-lighthouse.<ext>` | Badge Lighthouse 100 |
| `trust/proof-ads.<ext>`     | Screenshot risultati campagne |
| `trust/proof-work.<ext>`    | Screenshot risultati progetti |

## `campaigns/` — hero delle landing `/offerta/*`

Un file per campagna, col nome dello slug: sostituisce l'immagine
Unsplash hotlinkata.

| File | Landing |
|------|---------|
| `campaigns/social-media-manager.<ext>` | /offerta/social-media-manager |
| `campaigns/coach-consulenti.<ext>`     | /offerta/coach-consulenti |
| `campaigns/liberi-professionisti.<ext>`| /offerta/liberi-professionisti |
| `campaigns/educatori-cinofili.<ext>`   | /offerta/educatori-cinofili |
| `campaigns/olistica-yoga.<ext>`        | /offerta/olistica-yoga |
| `campaigns/ai.<ext>`                   | Sezione AI (condivisa da tutte) |

## `blog/` — copertine articoli

Le copertine sono **generate** dalla pipeline (`npm run og`, specifiche in
`tools/og/covers.mjs`) — non caricare file a mano qui, a meno di voler
sostituire una copertina con una foto reale: in quel caso aggiorna il
frontmatter del post (`cover: ../../assets/blog/<file>`).

## Nota sulle citazioni clienti

Le quote nei progetti (`src/content/work/*.md`, campo `quote`) sono
**placeholder verosimili**, marcate con un commento nel file: prima di
considerarle definitive, falle confermare al cliente (basta un sì per
iscritto). Sostituisci testo e attribuzione direttamente nel frontmatter.

## File brand / utility → `public/`

Favicon e icone (`npm run icons`), card OG (`npm run og`), PDF e simili
vivono in `public/` e sono serviti as-is alla radice del sito.
