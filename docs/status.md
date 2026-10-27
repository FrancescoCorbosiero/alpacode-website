# Stato del progetto

_Aggiornato il 27 ottobre 2026. Si aggiorna a fine sessione (skill
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
| Mega menu e link allo Studio | `src/data/mega.ts`, footer «Marketing», ⌘K, `/servizi/`, `/prodotti/`, `/learning/` | La colonna «Far crescere» del mega menu porta allo Studio. La colonna «Costruire» ha quattro voci (siti, e-commerce, software, AI), ognuna alla sua pagina servizio. |
| FAQ | `/faq/` — `src/data/faq.ts` | Rifatta: per argomento, con ricerca, legge le FAQ delle landing. |
| Chi siamo | `/chi-siamo/` — `src/data/chi-siamo.ts`, `src/components/pages/ChiSiamo.astro`, `src/styles/chi-siamo.css` | **Rifatta** (26 ottobre): la lastra dello studio con i suoi dati; le tre persone alla pari, tre lastre di vetro che scorrendo si sovrappongono dove sta «Il tuo progetto» (`effects/team.ts`); poi una finestra per persona, con le iniziali che si disegnano a filo sul vetro finché non c'è la foto (`src/assets/people/<id>.jpg`); «Cosa facciamo» con un link a ogni pagina servizio; con chi lavoriamo meglio, la rete, le porte. |
| Titoli delle pagine | `PageHero`, `components.css`, `landing.css`, `collabora.css`, `product-pages.css`, `voucher.css` | Più piccoli **solo sul desktop**: sul telefono hanno di nuovo le proporzioni di prima della riduzione (testate, titoli di sezione, landing, adesivo del voucher). Verificato contro la versione di prima: telefono identico a prima della riduzione, desktop identico a dopo. |
| Lo sfondo: la facciata di vetro | `src/styles/tokens.css` (`--field*`, `--glass*`, `--mullion`), `src/styles/base.css` | Via la carta color crema. Sotto tutto c'è un campo di luce blu fisso (tre aloni su un gradiente) con i montanti di una facciata sulle sei colonne della griglia (tre sul tablet, due sul telefono); il campo deriva piano con lo scroll (dove il browser lo sa fare; fermo altrove e a movimento ridotto). Header, sezioni «tinta», card, mega menu, ⌘K e menu mobile sono lastre di vetro (trasparenza e sfocatura). Il tema scuro ha la sua facciata; le landing restano nel campo chiaro anche in tema scuro, come prima la carta. |
| Le pagine dei servizi | `/servizi/<slug>/` e `/en/servizi/<slug>/` — `src/data/service-pages/`, `src/components/landing/ServiceLanding.astro`, `src/lib/landing/machines.ts` | **Nuove**, sul kit delle landing, nel blu della casa: consulenza-digitale, siti-web, e-commerce, software-su-misura, integrazioni-ai, manutenzione, formazione. Ognuna: la testata con la sua **macchina** (una scena in loop presa dal servizio: la roadmap che si riordina, il disegno a filo che diventa sito, l'ordine che passa carrello, pagamento e spedizione, il foglio Excel che passa le righe al processo, l'AI che risponde e una persona che approva, il monitor del sito, la lezione), i fatti della riga di `/servizi`, «Quando serve» (il problema barrato e la correzione scritta a penna), cosa comprende, come lavoriamo, i lavori che lo provano (solo dove ci sono), le domande, il modulo (`campaign: servizio-<slug>`). Registrate in `audiences.ts` («servizi»), nel footer (colonna «Servizi»), nel mega menu, su `/servizi` (ogni riga porta alla sua pagina), con lo schema `Service` e la loro card di condivisione (`npm run og -- services`). |
| La vetrina | `/lavori/` e `/lavori/<id>/` (IT + EN) — `src/content/work/*.md`, `src/data/work.ts` | Fatta: righe tipografiche, filtri per tipo (Flip), la cornice del sito che segue il mouse, una pagina per progetto con la sua card di condivisione (`npm run og -- work`), la transizione dalla riga alla pagina. **I lavori da «URL -> parole chiave»**: `tools/work/lavori.txt` (una riga per lavoro, in ordine di importanza), `npm run work-pull` (ordina le schede, crea in bozza le mancanti, legge i siti in `tools/work/digests/`, scatta le schermate), la skill `work-from-url` (come si scrive la scheda). |
| Casi di studio, Metodo, Dove operiamo (home) | `src/components/home/` | Rifatti: i casi su un palco fermo (il «prima» barrato, entra il «dopo»); l'Italia a punti con un arco verso ogni cliente e la lista dei clienti per luogo. Il Metodo, il **tabellone delle partenze** («Come si parte.»: palette che girano lettera per lettera; `effects/method.ts`), **non è più sulla home** (26 ottobre, per snellirla): resta su `/servizi`. |
| La mappa | `src/data/places.ts`, `src/components/home/Coverage.astro`, `src/engine/effects/map.ts` | Una città per regione (tutte e venti: dove c'è un cliente vale il cliente). Torino, Roma e Napoli sono collegate alla base con un arco più chiaro di quello dei clienti; la legenda sotto la mappa distingue «Clienti» da «Da remoto, in tutta Italia». |
| Contatti | `/contatti/` — `src/components/pages/Contatti.astro`, `src/data/contatti.ts`, `src/data/wizard.ts`, `src/components/islands/BriefBuilder.tsx`, `src/styles/contatti.css` | **Rifatta** (26 ottobre) per convertire: in cima «Quattro modi per cominciare» (il brief, la call, WhatsApp, l'email con «Copia l'indirizzo»), lastre di vetro che si accendono, con l'orologio dello studio (aperto o chiuso, ora di Milano) e il tempo di risposta. Poi **il brief che si scrive da solo**: tre tap e un contatto, e accanto il foglio indirizzato a chi lo legge si compila a ogni risposta; la bozza resta sul dispositivo finché non la invii; un link può impostare la prima risposta con il servizio (`/contatti/?servizio=e-commerce`, per una campagna o una mail: oggi nessuna pagina lo usa); dopo l'invio propone subito la call (Cal.com) o WhatsApp. Poi «Cosa succede quando scrivi» (quattro passi, dalla copy delle FAQ), quattro domande dalla FAQ, il modulo lungo (che c'era) con la persona a cui scrivi e i dati diretti, la mappa. Ogni via d'ingresso si misura: `contact_channel`, `brief_start`, `lead_sent` (nel `dataLayer` e come eventi `alpa:*`). Il vecchio `BriefWizard.tsx` non c'è più (i link a `#wizard` arrivano al brief). |
| Il motore delle animazioni | `src/engine/` e `sites/studio/src/engine/` | **Fatto.** Casa e Studio girano sullo stesso motore, scritto sul contratto di alpacode-motion (che resta solo un riferimento): il nucleo, un modulo per mossa, le selezioni della casa in `config.ts`. Il vecchio `lib/motion.ts` non c'è più. Le scene delle landing stanno sul palco del motore (`stage`), gli script del voucher e dei moduli chiamano le sue funzioni (coriandoli, scossa dei campi, link che si decodifica, QR che si stampa). Verificato pagina per pagina contro il motore di prima: stessa resa, a 1440, 390 e 390×664 e a movimento ridotto. |
| Hero della home con video «blueprint» | `src/data/home.ts` (`heroVideo`), `tools/media/` | Fatto, invariato. |
| «Segnala un amico» | `/voucher/`, `/voucher/nuova-attivita/`, `POST /api/referral` — `docs/voucher.md`, `src/components/voucher/ReferralStudio.astro`, `Invite.astro` | **Riparato** (27 ottobre). A chi compila con il riempimento automatico di Chrome, «Genera il mio link» rispondeva «Qualcosa è andato storto». La trappola per i bot (`website`) era solo nascosta alla vista: Chrome prendeva la frase sopra («Ti basta un'email…») per la sua etichetta e ci scriveva l'email. Il server allora prendeva la richiesta per un bot e rispondeva «ok» senza link. Lo stesso succedeva in «Mandaci tu i contatti» (ci finiva la provincia), nella richiesta dalla pagina invito e nel modulo di `/collabora-con-noi/` (`PartnerForm.tsx`). In questi ultimi due la pagina diceva «inviato», ma non partiva niente. Ora la trappola non è disegnata (`display: none`) in nessun modulo. Provato con l'autofill di Chromium su ogni modulo della casa: trappola vuota, link generato, richieste inviate. `REFERRAL_SECRET` non c'entrava: senza, i codici usano una chiave di sviluppo. |
| Alpacode FAST | — | **Ritirato** («FAST per ora sparisce»): i prodotti sono passati allo Studio, il codice è nella storia di git. |
| Email dei moduli | `shared/server/mail.ts`, `shared/server/reply.ts` | Due trasporti: SMTP (`SMTP_HOST`…, la casella di info@) o AWS SES (in produzione: SES, e funziona); senza nessuno dei due il server **non invia** e lo scrive nel log («NOT SENT»). Chi scrive riceve una **risposta automatica** nel tono del sito (casa o Studio), al massimo due al giorno per indirizzo (`CONTACT_AUTOREPLY=0` la spegne). Provato con un server SMTP finto: il lead arriva a info@, la risposta a chi scrive. |
| Moduli delle pagine marketing | `src/components/landing/LeadForm.astro`, `src/lib/landing/lead.ts`, `sites/studio/src/components/ContactForm.astro` | Non arrivavano solo loro. La causa più probabile: il campo trappola per i bot (`website`) era nascosto **fuori schermo**, non tolto dalla pagina, e il riempimento automatico del browser (o un gestore di password) poteva compilarlo con il tuo sito; il server allora lo prende per un bot, risponde «ok» e non invia nulla. Ora la trappola non è mai disegnata (`hidden`, `display: none`), sia nella casa sia nello Studio (dal 27 ottobre anche nel voucher e in «Collabora con noi», che erano rimasti fuori: vedi «Segnala un amico»). Quando scatta, il log lo scrive con nome ed email (`honeypot filled`): un lead vero preso per un bot non si perde più senza traccia. L'altra causa possibile: il limite di 5 invii in 10 minuti dalla stessa connessione, condiviso da tutti i moduli della casa. Chi prova le pagine una dopo l'altra lo supera. Ora la pagina lo dice («Troppe richieste…») e il log scrive `rate limited`. |
| Testate dello Studio | `sites/studio/src/styles/studio.css` (`.fx-to`, `.fx-hook`) | L'evidenziatore volt è una **banda fissa** (0,84em) centrata sulle lettere. Prima lo sfondo copriva l'intera riga del font: su Windows Archivo Black usa metriche più alte (circa 1,35em contro un'interlinea di 0,9) e il volt finiva sulla riga sopra («RICORDARE.» copriva «SI FA»). Da 901px il titolo si misura sulla sua colonna (`cqi`), così non finisce sotto il telefono. Provato con le metriche di Mac e di Windows, da 1024 a 1600px e a 390. |
| Footer | `src/components/Footer.astro`, `sites/studio/src/components/Foot.astro`, `shared/data/business.ts` | Completi su tutti e due i siti: navigazione, servizi, i dati dell'impresa (`companyLine()`: ditta individuale, sede operativa, P.IVA; sede legale, REA e PEC quando ci sono), le pagine legali. |
| Le mosse dello Studio | `sites/studio/src/engine/effects/` | Fatte su misura per le sue pagine: **feed** (i tre verbi su un telefono, su un palco fermo: il feed corre e si inchioda sul tuo post, il tuo marchio su avatar, biglietto, storia e busta, la tua pagina, il tap su «Prenota», la richiesta che arriva), **type** (le frasi «che diresti tu» si scrivono da sole), **scribble** (le note a mano si scrivono), **grow** («crescere» cresce), **stamp** (il prezzo atterra come un timbro), **tilt** (carte e telefoni si inclinano verso il mouse). La casa resta sobria: le sue mosse su misura sono il tabellone del Metodo, le macchine dei servizi, le lastre di «Chi siamo». |
| Le mosse nuove della casa | `src/engine/effects/pane.ts` (+ `pane.css`), `effects/team.ts`, `src/lib/landing/machines.ts` | **pane**: una banda di luce attraversa il vetro quando entra in vista, il chiarore segue il puntatore, i contorni SVG si disegnano a filo (`data-pane`, `data-pane-glint`); **team**: le tre lastre di «Chi siamo», legate allo scroll; **machines**: le sette macchine delle pagine servizio (in loop solo mentre sono in vista) e le correzioni a penna di «Quando serve» (`data-machine`, `data-fixes`). Tutte con lo stato finale a movimento ridotto. |
| La direzione del movimento | `docs/motion-direction.md` | **Un brainstorm, non costruito** (tua domanda: spigoli vivi e animazioni «lit»). La proposta: «corpi rigidi, luce fluida», il vocabolario della casa (binari, cerniere, luce, costruzione, la mano poca, un'idea per sezione), le curve da mettere nei token, sei mosse da costruire in ordine di impatto, cosa rivedere. È il lavoro della prossima sessione sulla casa. |

## Decisioni del proprietario

Da questa chat (26 ottobre):

- Le testate: la riduzione chiesta prima era «solo per la versione
  desktop»; le proporzioni da telefono «erano già ottime» e tornano
  com'erano.
- Via «questo maledetto color crema / editoriale» che c'è «in ogni
  singolo prodotto generato dell'AI»: «qualche background eccentrico, un
  po' glassy ma sempre elegante e sobrio».
- Il Metodo esce dalla home, «per snellire un po'»: riprendeva
  l'animazione dei lavori subito prima.
- La mappa: «collega anche Torino, Roma e Napoli, aggiungi almeno una
  città importante per ogni regione… altrimenti discrimini».
- Una pagina per ogni servizio, «come per le pagine di marketing».
- «Non mi piace il layout di chi siamo.»
- Contatti, «una delle pagine più importanti»: i moduli sono «già molto
  cool, ma si potrebbe osare un po' di più», nella UI, nella UX e nelle
  funzioni: «come potremmo convertire al massimo tramite questo sito?»
- Il movimento: «mantenere il look sharp (quasi architetturale) dei
  design token del sito, ma voglio anche animazioni "lit"», senza che i
  due concetti entrino in contrasto. È un brainstorm («l'unico punto in
  cui puoi fare brainstorming e operare alla prossima sessione»):
  `docs/motion-direction.md`.
- Al sito manca ancora «quel guizzo» di comunicazionecinofila, che
  viene dalle animazioni fatte su misura per il suo contesto.
- Lo Studio: «ne parliamo nella prossima sessione».

Dalla chat precedente:

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
  (struttura, UI, copy). (Superata il 26 ottobre per la pagina dei
  contatti, «si potrebbe osare un po' di più»: il modulo lungo resta.)
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

**Le pagine dei servizi** (26 ottobre)
- Sono sette, i servizi della casa: consulenza-digitale (la riga 01 di
  `/servizi`), siti-web (02), e-commerce (03), software-su-misura (04),
  integrazioni-ai (05), manutenzione (06), formazione (11 e 13). Gli
  indirizzi li ho scelti io; in inglese sono gli stessi, sotto `/en/`.
- I servizi della crescita (07–10: brand, UI/UX, campagne, SEO) non hanno
  una pagina sulla casa: sono il lavoro dello Studio e aprono la sua
  porta. «Kit & risorse pro» (12) resta su `/prodotti`.
- **La copy delle sette pagine è mia** (quando serve, cosa comprende,
  come lavoriamo, le domande, il modulo), presa da `/servizi`, dalle FAQ
  e dal Metodo: da rileggere. I tempi nei fatti e nelle risposte sono
  quelli di `/servizi` («da 3 a 12 settimane»…); la formazione «da 1
  giornata a 32 ore» viene da «8 — 32 ore».
- I lavori per servizio: siti → i lavori «Siti»; e-commerce → gli
  «E-commerce»; software → i «Software» e Shoes Clothing Store (il
  gestionale); consulenza → Logistica Sanchez e Shoes Clothing Store. AI,
  manutenzione e formazione non mostrano lavori (nessuna prova finta).
- Le scritte dentro le macchine sono una dimostrazione, non dati veri:
  «Il tuo prodotto», il numero d'ordine che sale da 1041 a ogni giro, le
  righe del foglio, la domanda all'AI, i log del monitor, la lezione.
- Il problema barrato e la correzione a penna di «Quando serve»: la mano
  sulla casa, poca (vedi `docs/motion-direction.md`).
- Nel mega menu «Costruire» ha ora quattro voci (siti, e-commerce,
  software, AI); consulenza, manutenzione e formazione si trovano da
  `/servizi`, dal footer e da «Chi siamo».

**Lo sfondo, le testate, la mappa** (26 ottobre)
- La facciata di vetro: i colori del campo, le sei campate dei montanti,
  la deriva con lo scroll e quanto è trasparente il vetro sono scelte
  mie. Le landing restano nel campo chiaro anche in tema scuro.
- Le testate: sul telefono i minimi di prima della riduzione (per esempio
  il titolo della testata 38px, i titoli di sezione 30px, il titolo delle
  landing 46px); sul desktop (provato a 1024 e 1440) è tutto come dopo
  la riduzione.
- La mappa: una città per regione, il capoluogo, tranne Bolzano per il
  Trentino-Alto Adige (Trento si sovrapponeva) e Barletta per la Puglia
  (c'è il cliente; Bari si sovrapponeva). Torino, Roma e Napoli hanno un
  arco più chiaro, non quello dei clienti, perché lì non ci sono lavori:
  la legenda dice «Da remoto, in tutta Italia».

**Chi siamo e Contatti** (26 ottobre)
- «Chi siamo»: i fatti della lastra («Dal 2025», «Monza · Milano»,
  «Ditta individuale», «In tutta Italia, anche da remoto»), «Il tuo
  progetto» al centro delle tre lastre, le competenze brevi di ognuno
  («Software · AI · siti», «Social · contenuti», «Enterprise ·
  architetture»).
- Contatti: il brief è indirizzato a «Francesco Corbosiero · Alpacode»;
  ha quattro opzioni in più nella prima domanda (Integrazioni AI,
  Consulenza, Manutenzione, Formazione) e «Pubblicità & SEO» è diventato
  «Social, pubblicità & SEO».
- «Stiamo prendendo nuovi progetti per Q3 2026» (una data già passata) è
  diventato «Stiamo prendendo nuovi progetti».
- I quattro passi di «Cosa succede quando scrivi» e le quattro domande
  scelte dalla FAQ («Come funziona il preventivo?», «Quanto costa un
  sito?», «Con chi parlo durante il progetto?», «Lavorate solo a Monza e
  Milano?»).
- La bozza del brief resta nel browser di chi scrive (si cancella
  all'invio): nessun dato lascia il dispositivo prima dell'invio.

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
  `draft: true`); al posto dei ritratti ci sono le iniziali disegnate sul
  vetro (basta una foto in `src/assets/people/<id>.jpg`); nessun link
  LinkedIn (`linkedin: null`).

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
- Sulla mappa ci sono anche le città di riferimento, anche dove non ci
  sono lavori (tua richiesta): ora una per regione (vedi sopra). Sono
  tenui e fuori dall'elenco dei clienti (`REFERENCES` in
  `src/data/places.ts`).

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

- **Le pagine dei servizi**: rileggere la copy (la prima stesura è mia),
  confermare i sette servizi e i loro indirizzi, e se la crescita resta
  solo sullo Studio.
- **Il movimento della casa** (`docs/motion-direction.md`): se la regola
  «corpi rigidi, luce fluida» ti torna e quali delle sei mosse proposte
  costruire. È il lavoro della prossima sessione sulla casa.
- **Lo Studio**: la sessione che hai annunciato («ne parliamo nella
  prossima sessione»).
- **Da provare dopo il deploy: i moduli delle pagine marketing.** Manda
  una richiesta da una pagina `/offerta/…` (al massimo cinque invii in
  dieci minuti dalla stessa connessione). Se non arriva a info@,
  `docker compose logs alpacode-website | grep -E "honeypot|rate limited"`
  dice se è stata la trappola o il limite. (La mia prima diagnosi, «in
  produzione manca il trasporto», era sbagliata: SES funziona.)
- **Prima del prossimo deploy: le richieste prese per bot.**
  `docker compose logs alpacode-website | grep "honeypot filled"` elenca
  nome ed email di chi è stato preso per un bot (link del voucher,
  segnalazioni, richieste dalle pagine invito, proposte di
  collaborazione). `up --build` ricrea il container e quei log si
  perdono: salvali prima. Dopo il deploy, prova a generare un link da
  `/voucher/` con il riempimento automatico.
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
- Bio, foto e LinkedIn di Irene e Riccardo (e il LinkedIn e la foto di
  Francesco, che compare anche nei contatti: `src/assets/people/`).
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
- La prenotazione di Cal.com non si carica da questo ambiente (la rete):
  della call nei contatti è provato solo il bottone; senza Cal
  configurato porta a `/prenota`.
- La deriva dello sfondo con lo scroll usa le animazioni CSS legate allo
  scroll (`animation-timeline`, nessuno script): dove il browser non le
  supporta il campo resta fermo, ed è voluto.
- I moduli e il riempimento automatico: un campo solo nascosto alla vista
  (`.visually-hidden`, fuori schermo) Chrome lo riempie, se dal testo
  vicino lo prende per email, nome o indirizzo; uno in `display: none`
  no. Si prova con il Chromium di Playwright: `--show-autofill-type-predictions`
  scrive su ogni campo il tipo che Chrome gli dà (`autofill-prediction`),
  e `Autofill.trigger` (CDP) compila il modulo con un indirizzo finto.
- In produzione `REFERRAL_SECRET` è impostata (lo ha detto il
  proprietario il 27 ottobre): non va più cambiata, o cambiano i codici
  di tutti.
- Gli screenshot a pagina intera di Playwright disegnano male i livelli
  fissi dello sfondo: per giudicare la facciata servono le schermate
  della finestra.

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
- Stesso branch, dopo la PR #52 — le città di riferimento sulla mappa
  (PR #53).
- Branch `claude/main-site-refinements-wag4r4` — le testate di nuovo
  proporzionate sul telefono, lo sfondo a facciata di vetro, il Metodo
  fuori dalla home, una città per regione e tre archi in più sulla mappa,
  una pagina per servizio con la sua macchina, «Chi siamo» e «Contatti»
  rifatti, il brainstorm sul movimento (`docs/motion-direction.md`)
  (PR #54).
- Branch `claude/wonderful-pasteur-sk0co6` — i moduli del voucher e di
  «Collabora con noi»: la trappola per i bot che l'autofill di Chrome
  riempiva (PR #55).
