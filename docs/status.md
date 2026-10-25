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
| La casa e i compartimenti | `shared/data/compartments.ts`, `shared/` | Fatto. alpacode.it è la casa; studio.alpacode.it il primo compartimento. I link tra i due passano da `doorTo()` (UTM `utm_source`, `utm_medium=door`, `utm_campaign`). Skill `new-compartment` per il prossimo. |
| Alpacode Studio | `sites/studio/` → studio.alpacode.it: `/`, `/servizi/`, `/pacchetti/`, `/prodotti/` (guida sito vetrina, *AI al lavoro*), `/contatti/`, `/grazie/`, privacy, cookie, condizioni di vendita | Costruito, **non ancora online** (DNS). Servizio già in `docker-compose.yml`. Acquisti predisposti: Lemon Squeezy, Gumroad o Stripe, webhook firmati e verificati, ordini in un ledger JSONL e per email. Niente parole chiave DM. |
| Le pagine marketing della casa | `/offerta/*`, `/social-media-manager/`, `/partner/`, `/per-chi-fa-siti/*`, `/voucher/*`, `/prodotti/` | Rimesse nel tono della casa: header e footer completi, il blu della casa, niente giri, posti, scadenze, timbri né pillola sticky. **Niente prezzi sulla casa** (nessuna cifra, niente «prezzo fisso», niente «€/anno», niente checkout): i prezzi stanno sui prodotti dello Studio. |
| Mega menu e link allo Studio | `src/data/mega.ts`, footer «Marketing», ⌘K, `/servizi/`, `/prodotti/`, `/learning/` | La colonna «Far crescere» del mega menu porta allo Studio. |
| FAQ | `/faq/` — `src/data/faq.ts` | Rifatta: per argomento, con ricerca, legge le FAQ delle landing. |
| Chi siamo | `/chi-siamo/` — `src/data/chi-siamo.ts` | Nuova: lo studio, Francesco (testo dal suo LinkedIn), Irene Bellapianta, Riccardo Grassi, la rete. |
| Titoli delle pagine | `PageHero` | Più piccoli, meno vuoto. |
| La vetrina | `/lavori/` e `/lavori/<id>/` (IT + EN) — `src/content/work/*.md`, `src/data/work.ts` | Fatta: righe tipografiche, filtri per tipo (Flip), la cornice del sito che segue il mouse, una pagina per progetto con la sua card di condivisione (`npm run og -- work`), la transizione dalla riga alla pagina. **I lavori da «URL -> parole chiave»**: `tools/work/lavori.txt` (una riga per lavoro, in ordine di importanza), `npm run work-pull` (ordina le schede, crea in bozza le mancanti, legge i siti in `tools/work/digests/`, scatta le schermate), la skill `work-from-url` (come si scrive la scheda). |
| Casi di studio, Metodo, Dove operiamo (home) | `src/components/home/` | Rifatti: i casi su un palco fermo (il «prima» barrato, entra il «dopo»); il Metodo è un **tabellone delle partenze** («Come si parte.»: palette che girano lettera per lettera, passo dopo passo; `effects/method.ts`); l'Italia a punti con un arco verso ogni cliente e la lista dei clienti per luogo. |
| Il motore delle animazioni | `src/engine/` e `sites/studio/src/engine/` | **Fatto.** Casa e Studio girano sullo stesso motore, scritto sul contratto di alpacode-motion (che resta solo un riferimento): il nucleo, un modulo per mossa, le selezioni della casa in `config.ts`. Il vecchio `lib/motion.ts` non c'è più. Le scene delle landing stanno sul palco del motore (`stage`), gli script del voucher e dei moduli chiamano le sue funzioni (coriandoli, scossa dei campi, link che si decodifica, QR che si stampa). Verificato pagina per pagina contro il motore di prima: stessa resa, a 1440, 390 e 390×664 e a movimento ridotto. |
| Hero della home con video «blueprint» | `src/data/home.ts` (`heroVideo`), `tools/media/` | Fatto, invariato. |
| «Segnala un amico» | `/voucher/`, `/voucher/nuova-attivita/`, `POST /api/referral` — `docs/voucher.md` | Invariato. |
| Alpacode FAST | — | **Ritirato** («FAST per ora sparisce»): i prodotti sono passati allo Studio, il codice è nella storia di git. |
| Email dei moduli | `shared/server/mail.ts`, `shared/server/reply.ts` | Due trasporti: SMTP (`SMTP_HOST`…, la casella di info@) o AWS SES (in produzione: SES, e funziona); senza nessuno dei due il server **non invia** e lo scrive nel log («NOT SENT»). Chi scrive riceve una **risposta automatica** nel tono del sito (casa o Studio), al massimo due al giorno per indirizzo (`CONTACT_AUTOREPLY=0` la spegne). Provato con un server SMTP finto: il lead arriva a info@, la risposta a chi scrive. |
| Moduli delle pagine marketing | `src/components/landing/LeadForm.astro`, `src/lib/landing/lead.ts`, `sites/studio/src/components/ContactForm.astro` | Non arrivavano solo loro. La causa più probabile: il campo trappola per i bot (`website`) era nascosto **fuori schermo**, non tolto dalla pagina, e il riempimento automatico del browser (o un gestore di password) poteva compilarlo con il tuo sito; il server allora lo prende per un bot, risponde «ok» e non invia nulla. Negli altri moduli la trappola era nascosta in un altro modo, ed è per questo che arrivavano. Ora la trappola non è mai disegnata (`hidden`, `display: none`), sia nella casa sia nello Studio. Quando scatta, il log lo scrive con nome ed email (`honeypot filled`): un lead vero preso per un bot non si perde più senza traccia. L'altra causa possibile: il limite di 5 invii in 10 minuti dalla stessa connessione, condiviso da tutti i moduli della casa. Chi prova le pagine una dopo l'altra lo supera. Ora la pagina lo dice («Troppe richieste…») e il log scrive `rate limited`. |
| Testate dello Studio | `sites/studio/src/styles/studio.css` (`.fx-to`, `.fx-hook`) | L'evidenziatore volt è una **banda fissa** (0,84em) centrata sulle lettere. Prima lo sfondo copriva l'intera riga del font: su Windows Archivo Black usa metriche più alte (circa 1,35em contro un'interlinea di 0,9) e il volt finiva sulla riga sopra («RICORDARE.» copriva «SI FA»). Da 901px il titolo si misura sulla sua colonna (`cqi`), così non finisce sotto il telefono. Provato con le metriche di Mac e di Windows, da 1024 a 1600px e a 390. |
| Footer | `src/components/Footer.astro`, `sites/studio/src/components/Foot.astro`, `shared/data/business.ts` | Completi su tutti e due i siti: navigazione, servizi, i dati dell'impresa (`companyLine()`: ditta individuale, sede operativa, P.IVA; sede legale, REA e PEC quando ci sono), le pagine legali. |
| Le mosse dello Studio | `sites/studio/src/engine/effects/` | Fatte su misura per le sue pagine: **feed** (i tre verbi su un telefono, su un palco fermo: il feed corre e si inchioda sul tuo post, il tuo marchio su avatar, biglietto, storia e busta, la tua pagina, il tap su «Prenota», la richiesta che arriva), **type** (le frasi «che diresti tu» si scrivono da sole), **scribble** (le note a mano si scrivono), **grow** («crescere» cresce), **stamp** (il prezzo atterra come un timbro), **tilt** (carte e telefoni si inclinano verso il mouse). La casa resta sobria: la sua mossa nuova è il tabellone del Metodo. |

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
- I sottodomini: «in futuro ogni compartimento di alpacode avrà il suo
  sottodominio».
- IT/EN confermati; «FAST per ora sparisce».
- alpacode-motion è la fondamenta della UX e delle animazioni del sito e
  dei suoi sottodomini, ovunque.
- Ma alpacode-motion è **solo un riferimento**: «lo avevo allegato solo
  come riferimento e contesto per la generazione». Non si modifica da una
  sessione su questo repo; le mosse nascono qui, in `src/engine/effects/`.
  In questa sessione ci avevo scritto per errore, sul ramo
  `claude/busy-noether-amfgzf`: «lascio alpacode-motion così com'era».
  Quel ramo non si unisce e non si tocca; il riferimento è il suo `main`.
- «Usa placeholder dove non hai le info. Procedi in autonomia.»
- Su alpacode «rimuovi ogni riferimento "poco professional" tipo prezzi e
  quan'altro. Queste cose vanno in studio.alpacode»; e «non usare termini
  come "crash course" in alpacode».
- Il Metodo: «fantastico come idea ma gli SVG sono abbastanza fuori
  luogo».
- Footer con informazioni, navigazione e «cavilli giuridico-legali» su
  tutti e due i siti.
- Lo Studio: niente «porte» né «la casa»; «Scegli la tua porta» diventa
  «In chi ti identifichi?»; via frasi come «lo studio è il suo
  compartimento marketing… un'altra voce» («cringiate»).
- Una risposta automatica alle email, «in tema con il sito».
- Animazioni su misura come in comunicazionecinofila: «sfogati su
  studio.alpacode e rimani un po' più sobrio in alpacode».
- (25 ottobre, sera) AWS SES funzionava: non arrivavano solo i moduli
  delle pagine marketing. Transfer Luxury Driver è il nuovo nome (non più
  «SM Chauffeur»); Shoes Clothing Store è in Puglia, a Barletta; Edizioni
  Rosi esce dalla vetrina. Le testate dello Studio avevano ancora
  problemi (allegato a 1356px).
- I lavori, in ordine di importanza: ResellPiacenza, transferluxurydriverncc.it
  (sito e prenotazioni online: «il cliente non aveva uno spazio online,
  ora riceve clienti e collaborazioni ed è visibile su Google»), Cesana,
  Shoes Clothing Store (e-commerce, catalogo B2B e gestionale su misura),
  Logistica Sanchez (con il gestionale rivisitato), Eternal Fishing Shop
  (con il piano di digital marketing), poi GT Cars, Stiven PT, EdilCalmi.

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
- Senza prezzi: via le cifre annuali delle campagne (300, 350, 450 €) da
  titoli, testi, foglio della proposta e moduli; il lead non porta più il
  prezzo. Se quelle offerte devono vivere sullo Studio con il prezzo, è da
  decidere (lo Studio oggi non vende siti).
- «Paghi solo se ti convince» è diventato «lo approvi finito»: il sito va
  online quando lo approvi. Via anche «ti regaliamo i mesi fino a fine
  anno» (il rinnovo: «si rinnova di anno in anno, con gli stessi
  servizi») e «senza interessi su 3, 6 o 12 mesi» (le rate: «che fissiamo
  nella proposta»).
- La landing SMM non ha più la «corsia veloce» con i loghi delle carte e
  «pagamento sicuro»: un acquisto finto, sul sito non c'era.
- Rimasti, perché non sono prezzi della casa: i «fino a 100 €» del
  voucher, le fasce di budget del modulo contatti, il calcolatore
  dell'hosting (i costi di chi legge), l'indicatore «a prezzo fisso» del
  report d'impatto, i prezzi dei clienti sui loro siti finti («Percorsi e
  prezzi»).
- Servizi e prodotti: la riga «Prezzo» è diventata un fatto che c'era già
  («Si parte da: una call di 30 minuti», «Formula», «Pagine: fino a 5»,
  «Dove: Alpacode Studio»…); i corsi senza riga di prezzo, «Guide e corsi
  brevi» al posto di «crash course».
- Le pagine prodotto in pre-lancio: «Prezzo fondatori» è diventato
  «Condizioni da fondatore»; il lancio «nel terzo trimestre 2026», già
  passato, è diventato «in preparazione» (Hive Commerce, Pro Kit). Paco
  resta «quarto trimestre 2026».

**Il voucher e il motore**
- Il messaggio da condividere del voucher diceva «il prezzo lo sai
  prima di iniziare» (il tic vietato): ora «ti dicono subito se e come
  possono aiutarti», la stessa promessa della sezione contatti (IT ed
  EN, tutte e due le pagine).
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
  Stiven PT Monza, Cesana e Transfer Luxury Driver Milano, Logistica
  Sanchez Seregno, Eternal Fishing Shop Cesano Maderno, ResellPiacenza
  Piacenza, Shoes Clothing Store Barletta (la mappa ora arriva in
  Puglia; Roma non c'è più).
- Settori riscritti in minuscolo; Eternal Fishing Shop è «Pesca» (era
  «E-commerce»), Transfer Luxury Driver «NCC di lusso».
- **Le citazioni dei clienti sono segnaposto**: restano nei file ma non
  si vedono finché `quoteConfirmed: true`.
- I casi della home sono i primi tre della tua lista: ResellPiacenza,
  Transfer Luxury Driver e Cesana (EdilCalmi esce dalla home, resta in
  /lavori). Il caso di Transfer Luxury Driver è scritto dalle tue parole
  chiave e dalla schermata che mi hai mandato: Milano e Lago di Como,
  transfer aeroportuali, servizio a ore e tour privati, il modulo
  (transfer o a ore, partenza, destinazione, data, ora, passeggeri).
- La sua pagina ora è `/lavori/transfer-luxury-driver/`: il vecchio
  indirizzo (`/lavori/sm-luxury-chauffeur/`) ci rimanda, e
  `/lavori/edizioni-rosi/` rimanda a `/lavori/` (`astro.config.mjs`).
- Le schermate di Transfer Luxury Driver, Shoes Clothing Store,
  ResellPiacenza e Logistica Sanchez sono le immagini che mi hai mandato
  (i siti di oggi; le vecchie mostravano le versioni precedenti). La
  descrizione di Logistica Sanchez ora parte dalle spedizioni di pallet
  in tutta Italia, come il sito.
- I siti che mi hai dato ora sono linkati («Visita il sito»): se un
  cliente non vuole il link, togli `url` dalla sua scheda.
- Shoes Clothing Store: il settore è «Sneakers e abbigliamento» (dalla
  schermata: «Shoes & Clothing Reselling», le sneakers, i rivenditori);
  l'anno non lo so (la pagina lo salta); il catalogo B2B è il secondo
  link.
- GT Cars è in bozza (non si vede): di lui ho solo l'indirizzo.
- Il Metodo come tabellone delle partenze: «Partenze · Monza · Milano»,
  le destinazioni CALL, PROPOSTA, SVILUPPO, ONLINE e le note «30
  minuti», «cosa · tempi · costo», «lo vedi crescere», «e restiamo»
  (prese dalla copy dei passi).
- «Dove operiamo» elenca i clienti per luogo (sono gli stessi nomi di
  `/lavori`).
- Sulla mappa ci sono anche le grandi città come riferimento, anche dove
  non ci sono lavori (tua richiesta): Torino, Genova, Venezia, Bologna,
  Firenze, Roma, Napoli, Palermo, Cagliari. Sono tenui, senza arco e
  fuori dall'elenco dei clienti (`REFERENCES` in `src/data/places.ts`).
  Bari l'ho lasciata fuori, perché si sovrapponeva a Barletta.

**Lo Studio**
- Pacchetti «Su richiesta» (nessun prezzo); il crash course senza prezzo.
- I lettori della home («In chi ti identifichi?») sono `READERS` in
  `data/pages.ts`; il legame con Alpacode è la riga legale del footer
  («… è un marchio di Soluzioni Digitali Alpacode»), e il blocco dei
  lavori rimanda a alpacode.it.
- Le parole sul telefono dei tre verbi: «questo si ferma», «lo
  riconosci ovunque», «e sceglie te», «Nuova richiesta · dal tuo sito».
- «Crescere» è in volt in tutte le chiamate finali che lo contengono.
- I bottoni d'acquisto dicono «Chiedi» finché un prodotto non ha il suo
  link di checkout.
- Privacy, cookie e condizioni di vendita dello Studio: bozze.
- Il banner dei cookie compare solo se ci sono pixel pubblicitari (Meta,
  Google Ads); Umami è senza cookie e si carica senza banner.

## Decisioni aperte

- **Da provare dopo il deploy: i moduli delle pagine marketing.** Manda
  una richiesta da una pagina `/offerta/…` (al massimo cinque invii in
  dieci minuti dalla stessa connessione). Se non arriva a info@,
  `docker compose logs alpacode-website | grep -E "honeypot|rate limited"`
  dice se è stata la trappola o il limite. (La mia prima diagnosi, «in
  produzione manca il trasporto», era sbagliata: SES funziona.)
- **I dati legali mancanti** per il footer: sede legale, REA, PEC
  (`shared/data/business.ts`, `legal`).
- **La rete per i lavori**: per leggere i siti e scattare le schermate a
  pagina intera (`npm run work-pull`) l'ambiente deve poter raggiungere
  resellpiacenza.shop, transferluxurydriverncc.it, cesanaassicuratori.it,
  shoesclothingstore.com, b2b.shoesclothingstore.com, logisticasanchez.com
  e gtcars.netlify.app (Network access dell'ambiente). Poi le schede si
  rifiniscono dai testi letti.
- GT Cars: cos'è e cosa abbiamo fatto (le sue parole chiave).
- Shoes Clothing Store: l'anno, e come si scrive il marchio («Shoes
  Clothing Store» o «Shoes & Clothing»).
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

## Da sapere

- La rete di questo ambiente non raggiunge internet (nemmeno
  alpacode.it): niente screenshot dei siti dei clienti da qui.
  `npm run work-pull` è provato sui siti locali.
- L'invio vero delle email (SMTP o SES) non è provato da qui: solo con
  un server SMTP finto in locale. In produzione SES funziona (lo dice il
  proprietario).
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
- Stesso branch, dopo la PR #50 — le email (SMTP, risposta automatica),
  i footer con i dati legali, lo Studio senza «porte» e «la casa», le
  testate dello Studio, la casa senza prezzi, il Metodo come tabellone,
  i lavori da «URL -> parole chiave», le mosse su misura dello Studio
  (PR #51).
- Stesso branch, dopo la PR #51 — i moduli delle pagine marketing (la
  trappola per i bot, il limite detto chiaro), le testate dello Studio
  anche su Windows, Transfer Luxury Driver, Shoes Clothing Store a
  Barletta, via Edizioni Rosi, le schermate nuove dei lavori (PR #52).
- Stesso branch, dopo la PR #52 — le città di riferimento sulla mappa.
