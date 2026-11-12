# L'albero di Alpacode — analisi e brainstorm sui domini

_Scritto il 10 novembre 2026. La domanda del proprietario: «abbiamo
sviluppato molto in fretta tutta l'organizzazione in domini… esamina se
l'organizzazione attuale è solida e coerente», con la visione:
alpacode.it il biglietto da visita (mondo IT, consulenze), lo Studio
l'hub dei servizi da digital studio / creative agency (marketing e
campagne, per professionisti e per chi vive di social), sotto altri
sottodomini sempre più specifici, «un albero dove più su scende e più il
copy diventa specifico». È un brainstorm: niente di questo è costruito,
tranne dove è scritto «fatto». In italiano perché è da leggere e
decidere, come `docs/status.md`._

## La risposta breve

- **FAST: sì, è diventato lo Studio.** fast.alpacode.it non è mai andato
  online (nessun DNS). Il 24 ottobre la cartella `fast/` è diventata
  `sites/studio/` (commit `1a9a406`): i prodotti (la guida, il crash
  course), il volt e il registro giovane sono passati allo Studio, le
  parole chiave DM sono sparite. Del suo codice non resta niente: solo
  note di provenienza in alcuni effetti del motore («Sources: FAST …») e
  due rimandi a `fast/` nella skill di passaggio, ora corretti.
- **Le fondamenta reggono**: un registro dei compartimenti, porte
  misurate (UTM), `shared/` per i dati dell'impresa, le email e le
  lingue, un solo comando di deploy, la CI su tutti e due i siti.
- **Ma sono costruite per due nodi, non per un albero.** Il registro è
  una lista piatta, il motore delle animazioni è copiato in ogni sito,
  ogni nodo costa un sito intero. E i ruoli sono ancora quelli di prima:
  le pagine più specifiche di tutte (le campagne per coach, educatori
  cinofili, yoga…) stanno sulla casa. Le foglie sono sulla radice.
- **La proposta in una riga**: l'albero si divide per **lettore** (più si
  scende, più il lettore è preciso); la profondità sta nel **registro**,
  non nel DNS (ogni nodo è `<nome>.alpacode.it` e sa chi è suo padre);
  **un sottodominio si guadagna** (un nodo nasce come percorso del padre
  e diventa sottodominio quando ha un pubblico, un registro e un modo di
  comprare suoi).

## La mappa di oggi

| Nodo | Dove | Cosa c'è | Stato |
| --- | --- | --- | --- |
| alpacode.it — la casa | `src/` | consulenza, digitalizzazione, siti ed e-commerce, software, AI, manutenzione, formazione (sette pagine servizio); lavori, chi siamo, blog, FAQ, contatti, learning. **E le pagine marketing**: cinque campagne `/offerta/*`, `/social-media-manager`, `/per-chi-fa-siti/*` (tre), `/partner`, `/collabora-con-noi`, `/voucher/*`; i pacchetti di `/prodotti`; i prodotti in pre-lancio (`/hive-commerce`, `/alpacode-pro-kit`, `/paco`, noindex); sostenibilità e impatto | online, IT + EN |
| studio.alpacode.it — Alpacode Studio | `sites/studio/` | social e contenuti, brand, UX, campagne, SEO; quattro pacchetti (senza prezzo); due prodotti fai-da-te (la guida, 22 €; il crash course); «In chi ti identifichi?» | costruito; al 27 ottobre **non online** (manca il DNS); solo IT |
| analytics.alpacode.it | `deploy/umami.docker-compose.yml` | Umami, le statistiche | infrastruttura, non un compartimento |
| voucher.alpacode.it | repo `alpacode-voucher` | il vecchio programma «Segnala un amico» | da far puntare su `alpacode.it/voucher/` (decisione aperta) |
| cms.alpacode.it | `docs/headless-cms.md` | un CMS | solo un piano |
| fast.alpacode.it | — | ritirato, diventato lo Studio | mai online |

## Cosa regge

- **Un registro**, `shared/data/compartments.ts`: nome, indirizzo, riga,
  colore, lingue. Ogni link tra i siti passa da `doorTo()` e porta le UTM
  (`utm_source`, `utm_medium=door`, `utm_campaign=<dove>`): si sa da
  quale porta è arrivato ogni visitatore.
- **`shared/`**: i dati dell'impresa (footer e pagine legali uguali
  ovunque), l'invio delle email e la risposta automatica, le lingue.
- **Il deploy**: `docker compose up -d --build`, un container per sito
  dietro Caddy, il certificato arriva da solo; un DNS jolly
  (`*.alpacode.it`) copre ogni sottodominio futuro.
- **La CI** controlla e costruisce tutti e due i siti.
- **Le due voci sono scritte** (`docs/marketing-map.md`, i due
  `CLAUDE.md`), e lo Studio non parla di sé (via «porte» e «la casa»).

## Cosa non torna

### Con quello che vuoi adesso

1. **Le foglie stanno sulla radice.** Le pagine più specifiche del
   sistema — `/offerta/coach-consulenti`, `/offerta/liberi-professionisti`,
   `/offerta/educatori-cinofili`, `/offerta/olistica-yoga`,
   `/social-media-manager` — sono su alpacode.it, che vuoi biglietto da
   visita. Sono le landing degli annunci, cioè il lavoro «in uscita»
   (NOI contattiamo LORO) che la mappa dà allo Studio; e i loro lettori
   sono quelli che descrivi per lo Studio: professionisti e chi vive di
   social.
2. **I prezzi tolti alla casa aspettano un posto.** Le campagne hanno
   perso le cifre (300, 350, 450 € l'anno) perché sulla casa i prezzi non
   ci vanno, e lo stato lo dice già: «se quelle offerte devono vivere
   sullo Studio con il prezzo, è da decidere (lo Studio oggi non vende
   siti)». Nell'albero la risposta viene da sé.
3. **«Studio» vuol dire due cose.** La home della casa si presenta come
   «Studio digitale a Monza e Milano… tutto il digitale della tua
   attività, da un solo studio», e il compartimento si chiama Alpacode
   Studio. Se lo Studio è la creative agency, la riga in cima alla radice
   descrive il ramo, non la radice.
4. **La casa vende pacchetti.** `/prodotti` ha «Pacchetti pronti»: Sito
   Pronto ed E-commerce Starter (della casa, con i tempi) accanto a Brand
   Kit e Landing & ADV (che aprono lo Studio). «Pacchetti» è la parola e
   la pagina dello Studio (`/pacchetti/`). Nel mega menu, poi, «Landing &
   ADV» porta a `/prodotti`, non allo Studio come fa la sua card.
5. **La crescita è raccontata due volte, una senza porta.** Il verbo «Far
   crescere» della home (branding, design, campagne, SEO) descrive il
   lavoro dello Studio, e il blocco porta solo a `/servizi`; lì le righe
   07–10 hanno la porta.
6. **I prodotti non hanno un posto.** Hive Commerce, Pro Kit e Paco sono
   pagine in pre-lancio sulla radice. Hanno un nome, un pubblico e un
   modo di comprare loro: nell'albero sono foglie, e al lancio i
   candidati più naturali a un sottodominio (paco.alpacode.it).

### Nella struttura (per un albero di molti nodi)

1. **Il registro è piatto.** `CompartmentId = "house" | "studio"` e
   `DOORS` è una lista: niente padre, niente profondità. Il footer della
   casa mette le porte sotto «Marketing» perché l'unica porta è lo
   Studio: una seconda porta finirebbe sotto il titolo sbagliato.
2. **Il motore delle animazioni è copiato.** Il nucleo
   (`src/engine/core/` e `sites/studio/src/engine/core/`): 11 file su 12
   identici (il CSS differisce apposta), e così gli effetti in comune
   (`reveal`, `stage` e `_batch` identici, `tilt` con le sue impostazioni).
   Oggi una correzione si fa due volte; con dieci nodi, dieci volte. E
   non si sposta e basta: il nucleo legge `../config`, la configurazione
   del suo sito. (Risolti il 12 novembre: vedi «Le fondamenta».)
3. **Ogni nodo costa un sito intero**: un progetto Astro, un Dockerfile,
   un servizio nel compose, due passi in CI, e di nuovo layout, header,
   footer, pagine legali, modulo contatti, robots, card social. Lo Studio
   li vale; una pagina per gli educatori cinofili no.
4. **Il compose ripete la posta per ogni servizio** (lo stesso blocco
   SMTP/SES due volte): con più nodi, più copie da tenere allineate.
5. **La casa ha il dominio scritto a mano** (`site:
   'https://alpacode.it'`, `public/robots.txt`), lo Studio lo legge
   dall'ambiente (`STUDIO_SITE`): una build di prova della casa
   dichiarerebbe gli indirizzi di produzione. Piccola cosa, ma ogni nodo
   dovrebbe fare come lo Studio.

### Piccole, sistemate (fatto, 10 novembre)

- La skill di passaggio citava `fast/CLAUDE.md` e `fast/README.md`: ora
  `sites/studio/`.
- Il README dello Studio e la mappa citavano `House.astro`, tolto insieme
  a «porte» e «la casa»: ora dicono come lo Studio firma (la riga legale
  del footer, i lavori in `Proof.astro`).
- La mappa descriveva la casa come «editorial blueprint… paper and ink»:
  ora la facciata di vetro. Il footer «Le porte» (la colonna si chiama
  «Marketing») e i `DOORS` dello Studio (sono `READERS`) nella mappa,
  nella factory delle landing e nella skill dei compartimenti.
- Il README generale: la facciata di vetro, il Metodo fuori dalla home.
- Il ⌘K della casa conosceva solo lo Studio, scritto a mano: ora legge
  `DOORS` dal registro come il footer e «Chi siamo», così un nuovo
  compartimento compare da solo.
- Un commento nel CSS delle landing parlava ancora della «corsia veloce»
  tolta dalla pagina SMM.

## La proposta: l'albero

Disegnato, con «Oggi» e «La proposta» a confronto: la pagina
https://claude.ai/artifact/YS85BmSCoPM2JCSEnxNnQd (privata, del
proprietario).

### Il principio

- **Si divide per lettore.** La radice parla a chi vuole sapere chi è
  Alpacode e alle aziende che cercano consulenza IT e software. Il ramo
  parla a un tipo di lettore: professionisti, piccole attività, chi vive
  di social. La foglia parla a un lettore solo: l'educatore cinofilo,
  l'insegnante di yoga, il social media manager — o a chi vuole un
  prodotto (Paco).
- **Il copy scende, la fiducia sale.** Ogni nodo eredita dal padre il
  marchio, i dati legali, le persone, i lavori, il metodo, e aggiunge
  solo ciò che è suo: il copy, l'offerta, il colore, il modo di
  comprare. Le prove (i lavori, chi siamo) restano sulla radice e tutti
  ci rimandano: un nodo in basso non ripete, linka in alto.
- **Lo stesso servizio può stare su due rami, con due copy.** Un sito,
  sulla radice, è un progetto («portali e aree riservate su misura»);
  sullo Studio è un pacchetto con il suo prezzo; sulla foglia dei cinofili
  è «il sito del tuo centro cinofilo». Non è una ripetizione: è lo stesso
  lavoro detto a tre lettori. (Lo Studio racconta già il sito come la
  fine del percorso: nel feed della home la richiesta arriva «dal tuo
  sito».)
- **La voce segue il lettore.** Radice formale (IT + EN); Studio giovane
  e diretto (IT). Una foglia parte dalla voce del suo ramo e si accorda
  al suo lettore: quella dei liberi professionisti resta sobria anche
  sotto lo Studio, quella dei social media manager può spingere più del
  ramo.

### L'albero, con le pagine di oggi

```
alpacode.it — la radice: chi siamo, consulenza IT, software, AI, formazione · IT + EN
│   lavori · chi siamo · blog · FAQ · contatti · servizi (consulenza, siti ed
│   e-commerce su misura, software, AI, manutenzione, formazione) · learning ·
│   per chi fa siti · partner · collabora · voucher · sostenibilità
│
├── studio.alpacode.it — il ramo: marketing, social, brand, campagne · IT
│   │   servizi · pacchetti (Social, Brand Kit, Landing & ADV; Sito Pronto ed
│   │   E-commerce Starter?) · prodotti fai-da-te (la guida, il crash course)
│   │
│   ├── /per/<chi>/ — le foglie per lettore (oggi /offerta/* e /social-media-manager):
│   │     coach e consulenti · liberi professionisti · educatori cinofili ·
│   │     yoga e benessere · social media manager e creator
│   │
│   └── <nome>.alpacode.it — una foglia che cresce diventa sottodominio
│
└── paco.alpacode.it, hive.alpacode.it … — le foglie di prodotto, al lancio
```

Nel DNS tutti i nodi sono fratelli (`<nome>.alpacode.it`, un livello
solo: `cinofili.studio.alpacode.it` vorrebbe un secondo DNS jolly ed è
lungo da dire). La profondità la porta il registro: ogni nodo sa chi è
suo padre, e da lì nascono la briciola tra i siti e le porte in su e in
giù.

### Dove va ogni pagina di oggi

| Pagina | Oggi | Proposta | Perché |
| --- | --- | --- | --- |
| Home, lavori, chi siamo, blog, FAQ, contatti | radice | radice | la prova e il biglietto da visita: tutti i rami ci rimandano |
| `/servizi` e le sette pagine servizio | radice | radice; le righe 07–10 (brand, UI/UX, campagne, SEO) diventano una porta sola verso lo Studio | consulenza, siti su misura, software, AI, manutenzione, formazione sono «mondo IT» |
| `/prodotti` | radice | si svuota: i pacchetti allo Studio, i prodotti alle loro foglie; resta una pagina che le indica, o sparisce dal menu | una vetrina di pacchetti non è un biglietto da visita |
| `/offerta/*` (cinque), `/social-media-manager` | radice | foglie dello Studio, con il loro prezzo; redirect 301 dagli indirizzi di oggi (gli annunci attivi non si rompono); la colonna «Per professione» del footer diventa una porta | il copy più specifico, gli annunci, i lettori dello Studio |
| `/per-chi-fa-siti/*` | radice | radice | sviluppatori e web designer: mondo IT |
| `/partner`, `/collabora-con-noi`, `/voucher/*` | radice | radice | i programmi (agenzie, professionisti indipendenti, chi segnala); il voucher nella casa è deciso |
| `/learning` | radice | radice (o un ramo «formazione», se cresce) | corsi tecnici |
| `/hive-commerce`, `/alpacode-pro-kit`, `/paco` | radice, noindex | foglie, al lancio | hanno un nome loro |
| Sostenibilità, impatto | radice | radice | biglietto da visita |

### Sottodominio o percorso: la soglia

- **A favore del sottodominio**: dice «questo è fatto per te» già
  dall'indirizzo; separa statistiche e pixel; si può spegnere o rifare
  senza toccare il resto.
- **Contro**: su Google di solito parte più indietro (un percorso eredita
  di più dalla reputazione del padre); un sito in più nelle statistiche,
  un banner dei cookie in più se ha pixel (com'è configurato oggi, il
  consenso vale solo sul sottodominio dove è stato dato); chi sale e
  scende per l'albero cambia sito; e oggi ogni sottodominio è un sito
  intero da mantenere.
- **La soglia che propongo**: un nodo prende un sottodominio quando ha
  almeno tre di queste cose — un lettore che il padre non serve; un
  registro o un aspetto suoi; un modo di comprare suo (un checkout,
  un'app, una prenotazione); un canale suo (annunci con il loro pixel,
  un marchio di prodotto); un nome che vale la pena ricordare. Sotto la
  soglia è un percorso del padre: `studio.alpacode.it/per/cinofili/`.
- **Promuovere una foglia costa poco** se il registro lo prevede: il nodo
  passa da percorso a sottodominio, si aggiunge un'etichetta di Caddy, il
  vecchio percorso fa redirect 301. Il deploy resta lo stesso comando.

Lo Studio passa la soglia (lettore, registro, acquisti, annunci). Paco,
al lancio, anche. Le campagne per mestiere oggi no: stesso registro e
stessa offerta del ramo, cambia solo il lettore.

### Le fondamenta (prima del terzo nodo)

Nessuna cambia l'aspetto dei siti; si verifica che le pagine restino
identiche.

1. **Il registro diventa un albero.** Ogni nodo ha un `parent`, un tipo
   (radice, ramo, foglia) e il modo in cui è servito: `own` (un sito
   suo), `path` (un percorso del padre), `host` (il sito del padre, sul
   suo sottodominio). Da lì: `children(id)` al posto di `DOORS`; la
   briciola tra i siti e le porte in su e in giù, generate.
   _Fatto in parte (12 novembre): ogni nodo ha `kind` e `parent`;
   `children()` e `trail()` (la strada fino alla radice); `DOORS` è
   `children("house")`, così footer, ⌘K e «Chi siamo» seguono l'albero.
   Il modo in cui è servito (`own`, `path`, `host`) e la briciola
   arrivano con il primo nodo che ne ha bisogno._
2. **Il kit del compartimento in `shared/`.** Il nucleo del motore e gli
   effetti comuni (`shared/engine/`: il nucleo riceve la configurazione
   del suo sito, con un alias per sito o da `start()`), la testa delle
   pagine (font, statistiche, consenso), il gestore del modulo contatti,
   la riga legale, robots e sitemap. Un nodo nuovo diventa dati e
   pagine, non un sito da rifare.
   _Fatto per il motore (12 novembre): il nucleo è in
   `shared/engine/core/` e legge le impostazioni del sito dall'alias
   `@site/engine-config` (il `src/engine/config.ts` di ogni sito); gli
   effetti identici (`reveal`, `stage`, `_batch`) in
   `shared/engine/effects/`. Ogni sito tiene la sua configurazione, il
   CSS del nucleo e le sue mosse (anche `tilt`, diverso per scelta).
   Verificato: le 102 pagine della casa e le 12 dello Studio identiche a
   prima, CSS uguale al byte, stesso peso del JavaScript. Il resto del
   kit (testa, modulo contatti, robots) quando arriva il terzo nodo._
3. **Una foglia vive nel suo ramo.** La costruisce il padre, come una
   sua pagina: su un percorso (zero infrastruttura) o sul suo
   sottodominio, con un'etichetta di Caddy sul container del padre che
   porta l'indirizzo nella cartella della foglia (i file `/_astro/`
   esclusi). Un ramo e un prodotto hanno invece la loro build e il loro
   container. Sempre `docker compose up -d --build`.
4. **Il compose senza copie**: il blocco della posta scritto una volta
   (un'ancora YAML) e richiamato da ogni servizio. Un servizio nuovo solo
   per un ramo vero.
5. **La CI su `sites/*`**, così un sito nuovo è controllato senza toccare
   il file.

### I siti restano indipendenti (la condizione del proprietario)

«Non voglio che i singoli siti siano impattati da ciò. In teoria
essendo tutti siti statici questo non dovrebbe avvenire» (10 novembre).
È così online, e le fondamenta lo devono mantenere anche nella build.

- **Online non si toccano.** Ogni sito è un pacchetto di file suo, nel
  suo container (più il piccolo server dei moduli); nessun sito chiama
  l'altro, tra i siti passano solo link. Il codice in comune non è un
  servizio: entra in un sito quando il sito si costruisce (Vite lo copia
  dentro la build). Se un container si ferma, Caddy continua a servire
  gli altri.
- **Si toccano nella build.** Una modifica al codice in comune arriva a
  tutti i siti alla build successiva, e `docker compose up -d --build`
  li ricostruisce tutti a ogni deploy. È quello che si vuole per una
  correzione (oggi, con le copie, una correzione fatta in un sito non
  arriva all'altro, e con dieci siti le versioni si separano senza che
  nessuno se ne accorga); per un errore servono le regole qui sotto.
- **Le regole:**
  1. in comune solo le parti stabili (il ciclo delle pagine, lo
     scroll, i controlli, il kit); ogni sito tiene la sua
     configurazione, le sue impostazioni e le sue mosse (lo Studio
     inclina le card più della casa, e resta così);
  2. una modifica al comune aggiunge (un'opzione, una mossa nuova), non
     cambia il comportamento che c'è;
  3. la CI costruisce e controlla tutti i siti a ogni modifica (oggi
     casa e Studio; ogni sito nuovo entra nella CI con lui): se il
     comune rompe un sito, la modifica non passa;
  4. quando cambia `shared/` si guardano tutti i siti, non solo quello
     per cui si è fatta la modifica;
  5. un sito può staccarsi: se deve restare fermo, si copia dentro il
     sito la versione che usa, e torna indipendente come oggi.
- **Il legame che c'è già oggi è un altro: un solo `package.json`.**
  Astro, GSAP e Lenis sono gli stessi per tutti i siti: un aggiornamento
  li tocca tutti insieme. Va bene finché si aggiornano insieme; un sito
  che deve restare indietro avrà il suo (un workspace npm).
- **Isolati per ramo.** Ogni ramo e ogni prodotto ha la sua build e il
  suo container; una foglia vive nel suo ramo, come una sua pagina (se
  il ramo è giù lo è anche la foglia: è la stessa offerta, con lo stesso
  modulo).

### Come si vede l'albero (idee)

- **La briciola tra i siti.** In alto, sottile, «Alpacode › Studio ›
  Cinofili»: chi arriva da un annuncio su una foglia sa dov'è e come
  salire. Sulla radice non c'è.
- **Il colore dice il ramo.** La radice è blu, lo Studio volt; una foglia
  prende uno dei colori dei lettori dello Studio (il rosa del social,
  l'arancio del brand, il verde acqua dei clienti…). «Un colore per
  lettore» c'è già: diventa la mappa dell'albero.
- **La radice indica i rami, non li racconta.** Una voce «Studio ↗»
  nell'header (o una fascia nel mega menu, «Gli altri Alpacode»), il
  verbo «Far crescere» della home che apre lo Studio, e basta: il
  marketing raccontato per intero sta sotto.
- **La scala del marketing diventa l'albero.** Annuncio → foglia (il mio
  problema, detto a me) → ramo (i pacchetti, i prodotti, il prezzo) →
  radice (i lavori, le persone: la fiducia).

## Le domande (per decidere)

1. **«Lo Studio, l'hub per tutti i servizi»**: tutti i servizi che compra
   un professionista o una piccola attività — siti compresi, con il
   prezzo — o solo marketing e campagne, con i siti che restano sulla
   radice? _Proposta: tutti quelli per professionisti e piccole attività
   (i siti a canone delle campagne, Sito Pronto, E-commerce Starter);
   sulla radice restano i progetti su misura, la consulenza e il software
   per le aziende. Attenzione a un punto: la guida dello Studio dice «un
   sito vetrina costa zero»; sullo stesso sito, il sito fatto per te deve
   leggersi come l'altro gradino (lo fai tu / lo facciamo noi), non come
   una contraddizione._
2. **Le campagne** `/offerta/*` e `/social-media-manager`: scendono allo
   Studio come foglie (la sua voce, il prezzo di nuovo, solo italiano: le
   versioni inglesi andrebbero via) o restano sulla casa nella voce
   formale, come deciso in una chat precedente? _Proposta: scendono, con
   i redirect 301._
3. **Le foglie**: prima percorso e poi sottodominio quando se lo
   guadagnano, o subito un sottodominio ciascuna? E quali sono i primi
   due o tre sottodomini che hai in mente? Dicono su quale asse si divide
   l'albero: per lettore, per servizio (social, campagne…) o per
   prodotto.
4. **I prodotti** (Paco, Hive Commerce, Pro Kit): un sottodominio ciascuno
   al lancio?
5. **La riga in cima alla home**: «Studio digitale a Monza e Milano»
   resta, o dice cos'è la radice adesso (per esempio «Consulenza IT e
   software a Monza e Milano»)? Il titolo non si tocca.
6. **Learning**: resta sulla radice (corsi tecnici) o diventa un ramo suo?
7. **Lo Studio online**: secondo lo stato manca solo il DNS di
   `studio.alpacode.it`. Se diventa l'hub, va acceso prima di spostarci
   sopra qualcosa.

## In che ordine

1. Le risposte a queste domande.
2. Le fondamenta: il registro ad albero, il motore in `shared/`, il kit
   del compartimento. Niente di visibile: le pagine identiche a prima.
3. Lo Studio online (DNS).
4. Una prova: una campagna sola scende allo Studio come foglia, con il
   redirect; si guarda come va (annunci, richieste, posizionamento).
5. Le altre foglie, poi i prodotti al loro lancio.
