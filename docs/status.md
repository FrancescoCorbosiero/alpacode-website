# Stato del progetto

_Aggiornato il 25 ottobre 2026. Si aggiorna a fine sessione (skill
`handoff`). È scritto in italiano perché è anche la lista che il
proprietario rilegge e corregge._

Il lavoro è un **diamante grezzo**: molte scelte qui sotto le ha fatte
Claude in autonomia ("vedi tu", «procedi in autonomia») e vanno
confermate. Prima di costruire sopra a qualcosa della sezione «Ipotesi da
validare», chiedi.

## Cosa c'è

| Area | Dove | Stato |
| --- | --- | --- |
| La casa e i compartimenti | `shared/data/compartments.ts`, `shared/` | Fatto. alpacode.it è la casa; studio.alpacode.it il primo compartimento. Le porte tra i due passano da `doorTo()` (UTM `utm_source`, `utm_medium=door`, `utm_campaign`). Skill `new-compartment` per il prossimo. |
| Alpacode Studio | `sites/studio/` → studio.alpacode.it: `/`, `/servizi/`, `/pacchetti/`, `/prodotti/` (guida sito vetrina, *AI al lavoro*), `/contatti/`, `/grazie/`, privacy, cookie, condizioni di vendita | Costruito, **non ancora online** (DNS). Servizio già in `docker-compose.yml`. Acquisti predisposti: Lemon Squeezy, Gumroad o Stripe, webhook firmati e verificati, ordini in un ledger JSONL e per email. Niente parole chiave DM. |
| Le pagine marketing della casa | `/offerta/*`, `/social-media-manager/`, `/partner/`, `/per-chi-fa-siti/*`, `/voucher/*`, `/prodotti/` | Rimesse nel tono della casa: header e footer completi, il blu della casa, niente giri, posti, scadenze, timbri né pillola sticky. |
| Mega menu e porte | `src/data/mega.ts`, footer «Le porte», ⌘K, `/servizi/`, `/prodotti/`, `/learning/` | La colonna «Far crescere» del mega menu porta allo Studio. |
| FAQ | `/faq/` — `src/data/faq.ts` | Rifatta: per argomento, con ricerca, legge le FAQ delle landing. |
| Chi siamo | `/chi-siamo/` — `src/data/chi-siamo.ts` | Nuova: lo studio, Francesco (testo dal suo LinkedIn), Irene Bellapianta, Riccardo Grassi, la rete. |
| Titoli delle pagine | `PageHero` | Più piccoli, meno vuoto. |
| La vetrina | `/lavori/` e `/lavori/<id>/` (IT + EN) — `src/content/work/*.md`, `src/data/work.ts` | Fatta: righe tipografiche, filtri per tipo (Flip), la cornice del sito che segue il mouse, una pagina per progetto con la sua card di condivisione (`npm run og -- work`), la transizione dalla riga alla pagina. |
| Casi di studio, Metodo, Dove operiamo (home) | `src/components/home/` | Rifatti: i casi su un palco fermo (il «prima» barrato, entra il «dopo»); un disegno tecnico che diventa ogni passo del metodo; l'Italia a punti con un arco verso ogni cliente e la lista dei clienti per luogo. |
| Il motore delle animazioni | `src/engine/` e `sites/studio/src/engine/` | **Fatto.** Casa e Studio girano sullo stesso motore, scritto sul contratto di alpacode-motion (che resta solo un riferimento): il nucleo, un modulo per mossa, le selezioni della casa in `config.ts`. Il vecchio `lib/motion.ts` non c'è più. Le scene delle landing stanno sul palco del motore (`stage`), gli script del voucher e dei moduli chiamano le sue funzioni (coriandoli, scossa dei campi, link che si decodifica, QR che si stampa). Verificato pagina per pagina contro il motore di prima: stessa resa, a 1440, 390 e 390×664 e a movimento ridotto. |
| Hero della home con video «blueprint» | `src/data/home.ts` (`heroVideo`), `tools/media/` | Fatto, invariato. |
| «Segnala un amico» | `/voucher/`, `/voucher/nuova-attivita/`, `POST /api/referral` — `docs/voucher.md` | Invariato. |
| Alpacode FAST | — | **Ritirato** («FAST per ora sparisce»): i prodotti sono passati allo Studio, il codice è nella storia di git. |

## Decisioni del proprietario

Da questa chat:

- «alpacode deve rimanere un obelisco di autoritevolezza e
  professionalità, dove VENIAMO contattati NOI»: consulenza IT,
  digitalizzazione, automazioni, formazione professionale.
  studio.alpacode è «il sito più friendly e giovane che si occupa in pieno
  di marketing»: «NOI contattiamo LORO».
- «Alpacode "ingloba" studio.alpacode», e parla comunque alle stesse
  persone.
- La testata della home resta. «Non rendiamo alpacode troppo
  corporativa. È comunque una semplice piccola ditta individuale.»
- «La copy di Alpacode è già molto buona. Considera di non trasformarla
  troppo.»
- `/lavori`: «una UX stravolgente» e una pagina per ogni lavoro con il
  caso studio approfondito: la copy dei casi la scrive il proprietario
  («non farlo adesso»). «Ci penseremo dopo ad arricchire la sezione dei
  lavori.»
- Una pagina «chi siamo», non centrata su una persona, con Irene
  Bellapianta (SMM) e Riccardo Grassi (partner tecnologico per i progetti
  enterprise).
- Contatti: struttura e form restano; le FAQ cambiano «decisamente»
  (struttura, UI, copy).
- Il blog resta su alpacode, con lo stesso concept.
- Le pagine marketing restano tutte su alpacode, nel tono formale della
  casa.
- Il mega menu resta («troppo figo»); i riferimenti agli alpaca restano.
- Lo Studio: niente ossessione per i DM («siamo su un sito, non su
  instagram»); acquisti direttamente dal sito (Stripe, Lemon Squeezy,
  Gumroad).
- Le porte: «in futuro ogni compartimento di alpacode avrà il suo
  sottodominio».
- IT/EN confermati; «FAST per ora sparisce».
- alpacode-motion è la fondamenta della UX e delle animazioni del sito e
  dei suoi sottodomini, ovunque.
- Ma alpacode-motion è **solo un riferimento**: «lo avevo allegato solo
  come riferimento e contesto per la generazione». Non si modifica da una
  sessione su questo repo; le mosse nascono qui, in `src/engine/effects/`.
  In questa sessione ci avevo scritto per errore, su un ramo che va
  cancellato (vedi «Decisioni aperte»).
- «Usa placeholder dove non hai le info. Procedi in autonomia.»

Da prima, ancora valide:

- Il deploy è **solo** `docker compose up -d --build`: niente profili o
  passaggi in più.
- Niente frasi tipo «prezzo deciso prima», «nessun costo sorpresa».
- Il video come sfondo dell'hero della home.
- Il voucher vive dentro alpacode.it.
- Prezzi della guida: **22 €**, marketing **+48 €**.

## Ipotesi da validare

Decise da Claude, non confermate.

**La casa e lo Studio**
- Il nome «Alpacode Studio», il dominio studio.alpacode.it, solo
  italiano, il volt di FAST come colore dello Studio, un colore per porta.
- Sul mega menu la colonna «Far crescere» (social, brand, campagne) porta
  allo Studio; su `/servizi` il gruppo della crescita ha la porta; su
  `/prodotti` Brand Kit e Landing & ADV sono «Su Alpacode Studio».
- `/servizi`: aggiunto «Integrazioni AI (LLM)» come 05 (era nel testo del
  LinkedIn).
- `/partner`: il profilo è «Agenzie web e di comunicazione».

**Le landing**
- Tolti giri, posti rimasti, scadenze, timbri e la pillola sticky; tutte
  nel blu della casa, con header e footer completi.

**Il voucher e il motore**
- Il messaggio da condividere del voucher diceva «il prezzo lo sai
  prima di iniziare» (il tic vietato): ora «ti dicono subito se e come
  possono aiutarti», la stessa promessa della sezione contatti (IT ed
  EN, tutte e due le porte).
- Il contatore dell'adesivo del voucher resta uno script della pagina:
  gira nell'hero, sopra la piega, dove gli effetti del motore non
  toccano nulla.
- I passi di «Collabora con noi» e del voucher si accendono con la linea
  solo dove lo script la anima; senza script, o se la linea è già nella
  prima schermata, sono tutti accesi.

**Chi siamo**
- Le bio di Irene e Riccardo sono scritte dal ruolo (segnaposto,
  `draft: true`); i ritratti sono monogrammi (basta una foto in
  `src/assets/people/<id>.jpg`); nessun link LinkedIn (`linkedin: null`).

**La vetrina**
- Tipi di lavoro per i filtri: Siti, E-commerce, Software (Logistica
  Sanchez è «Software»).
- Luoghi: EdilCalmi «Brianza» (sulla mappa al centro della Brianza),
  Stiven PT Monza, Cesana e SM Luxury Chauffeur Milano, Logistica Sanchez
  Seregno, Eternal Fishing Shop Cesano Maderno, ResellPiacenza Piacenza,
  Edizioni Rosi Roma.
- Settori riscritti in minuscolo; Eternal Fishing Shop è «Pesca» (era
  «E-commerce»), SM «NCC di lusso».
- **Le citazioni dei clienti sono segnaposto**: restano nei file ma non
  si vedono finché `quoteConfirmed: true`.
- I casi della home restano EdilCalmi, ResellPiacenza e Cesana, con la
  loro copy di prima (problema, cosa abbiamo fatto, prima e dopo).
- Le note sui disegni del Metodo («30 minuti», «cosa · tempi · costo»,
  «un aggiornamento a ogni passo», «online, e restiamo») sono nuove,
  prese dalla copy dei passi.
- «Dove operiamo» elenca i clienti per luogo (sono gli stessi nomi di
  `/lavori`).

**Lo Studio**
- Pacchetti «Su richiesta» (nessun prezzo); il crash course senza prezzo.
- I bottoni d'acquisto dicono «Chiedi» finché un prodotto non ha il suo
  link di checkout.
- Privacy, cookie e condizioni di vendita dello Studio: bozze.
- Il banner dei cookie compare solo se ci sono pixel pubblicitari (Meta,
  Google Ads); Umami è senza cookie e si carica senza banner.

## Decisioni aperte

- **Gli indirizzi dei siti dei clienti** (e il permesso di linkarli: il
  campo `url` di ogni lavoro) e gli **screenshot a pagina intera**
  (`src/assets/work/<id>-full.png`, scorrono nella cornice della pagina
  del caso). Da qui non si raggiungono: la rete dell'ambiente nega gli
  host esterni. Da una macchina in rete: `npm run work-shots` li scatta
  dall'`url` di ogni lavoro.
- La conferma delle citazioni dei clienti.
- La copy dei casi studio: il corpo di `src/content/work/<id>.md`.
- Bio, foto e LinkedIn di Irene e Riccardo (e il LinkedIn di Francesco).
- Prezzi dei pacchetti e del crash course; il provider di pagamento e i
  link dei prodotti; i contenuti veri di guida, modulo e corso.
- DNS di studio.alpacode.it (poi basta il solito deploy).
- I testi legali dello Studio.
- Lo Studio anche in inglese?
- Archiviare il repo `alpacode-voucher` e far puntare voucher.alpacode.it
  (se è ancora online) su alpacode.it/voucher/.
- **Cancellare il ramo `claude/busy-noether-amfgzf` di alpacode-motion**:
  l'ha creato per errore questa sessione (18 commit, nessuna PR; `main` è
  intatto). Da GitHub, la pagina dei rami del repo; da qui la
  cancellazione è bloccata dai permessi della sessione.

## Da sapere

- La rete di questo ambiente non raggiunge internet (nemmeno
  alpacode.it): niente screenshot dei siti dei clienti da qui.
- L'immagine Docker dello Studio non è mai stata costruita in una
  sessione (nessun demone Docker): il primo deploy è anche il primo test
  del container. Le build dei due siti invece sono verificate.
- Non ci sono test automatici oltre a check e build (anche in CI).
- Il motore è codice del sito, scritto sul contratto di alpacode-motion:
  un modulo per mossa (un aggancio, `init(kit)`, il suo CSS con lo stato
  finale a movimento ridotto) e il suo posto in `registry.ts`. Una mossa
  nuova si scrive qui, in `src/engine/effects/`; alpacode-motion non si
  tocca.
- Pagine prodotto in pre-lancio, `noindex` e fuori dalla sitemap:
  `/hive-commerce`, `/alpacode-pro-kit`, `/paco`.
- L'email del sito è `info@alpacode.it`.

## Sessioni

- PR #47 — un solo motore di animazioni e un solo invio email; il
  voucher dentro il sito; il video della home.
- PR #48 — via le frasi cheap; per chi fa siti (hosting, AI, hub); le
  landing `/offerta/*`, SMM e partner rifatte sul kit.
- PR #49 — Alpacode FAST v1, la mappa, il contesto per Claude Code.
- Branch `claude/busy-noether-amfgzf` — la casa e i compartimenti, lo
  Studio, le pagine marketing nel tono della casa, la FAQ, Chi siamo, la
  vetrina e i blocchi della home, tutti e due i siti sul nuovo motore
  delle animazioni (PR #50).
