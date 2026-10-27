# Spigoli vivi, luce che si muove — brainstorm sul movimento della casa

_Scritto il 26 ottobre 2026 per la prossima sessione. È un brainstorm
(la domanda del proprietario: «voglio mantenere il look sharp, quasi
architetturale, ma voglio anche animazioni "lit": non vorrei che i due
concetti entrino in contrasto»): niente di questo è costruito, tranne
dove è scritto «fatto». In italiano perché è una proposta da leggere e
decidere, come `docs/status.md`._

## La risposta breve

Non sono in contrasto, se si decide **cosa** si muove. L'architettura lo
fa da sempre: gli spigoli restano fermi e precisi, a muoversi è la luce
— il sole che scorre su una facciata di vetro, i riflessi, le ombre che
si allungano, un ascensore che sale dritto nel suo vano. La regola che
propongo per tutto il sito:

> **Corpi rigidi, luce fluida.** Le forme si muovono come macchine
> (su binari, su cerniere, dal loro bordo), non come gelatina. Fluidi
> sono la luce, la trasparenza, il colore, la sfocatura, il tratto.

E perché le pagine di marketing sembrano «di un altro stile»: lì c'è la
**mano** — le note in Caveat, i cerchi a penna, le correzioni — sopra il
**disegno** — il blueprint, le griglie, i fili. Non sono due stili: è una
tavola d'architetto, il disegno preciso e le note a mano in margine. La
casa può tenere lo stesso registro, con meno mano.

## Perché a volte stride

Dove oggi le due cose litigano, è perché un corpo rigido si comporta da
corpo morbido:

- **Rimbalzi sui pannelli.** `elastic.out` sulle piastrelle del binario
  (`effects/rail.ts`), `back.out` sui punti della mappa e su qualche
  elemento delle scene: una lastra quadrata che rimbalza sembra di gomma.
  Il rimbalzo va bene solo per un **timbro** (un colpo, un tonfo
  deliberato) o una **pressione** (un bottone che cede).
- **Rotazioni libere.** Card e telefoni che si inclinano a caso (il
  `tilt`): bene sullo Studio (arrotondato, giocoso), meno sulla casa,
  dove una cosa ruota solo attorno a una cerniera (un'anta, un foglio
  appoggiato).
- **Tutto che appare da sotto.** Il «sale e appare» ovunque è il
  movimento del template: va bene come base, ma non è un'idea.
- **Ritmo senza griglia.** Gli stagger in ordine casuale (`knoll`) sono
  belli sugli oggetti sparsi, non sul testo.

## Il vocabolario proposto (la grammatica della casa)

1. **Binari.** Le cose entrano e escono lungo gli assi della griglia: i
   montanti della facciata (le sei campate di `base.css`) sono le guide.
   Una maschera che scorre lungo una campata, una riga che si allunga
   da un bordo, un elemento che arriva orizzontale e si ferma sul filo.
2. **Cerniere.** Se una cosa ruota, ruota attorno a uno spigolo
   (`transform-origin` su un bordo): un'anta, un foglio che si solleva,
   un pannello che si apre di 12°. Mai attorno al centro, mai oltre.
3. **Luce.** Il movimento fluido è della luce: una banda che attraversa
   il vetro (fatto: `effects/pane.ts`, «Chi siamo» e «Contatti»), il
   chiarore che segue il puntatore sulle lastre (fatto, stesso effetto),
   il campo che deriva con lo scroll (fatto: `base.css`), il colore che
   si scalda o si raffredda tra le sezioni (da fare).
4. **Costruzione.** Le cose «si costruiscono» davanti a chi guarda: il
   contorno prima, il riempimento dopo (fatto sulle iniziali di «Chi
   siamo»); il disegno a filo prima, il sito dopo (fatto: la macchina di
   «Siti & web app»).
5. **La mano, poca.** Sulla casa la penna corregge (fatto: «Quando
   serve» sulle pagine servizio, il problema barrato e la correzione
   scritta sopra) e firma; non decora.
6. **Un'idea per sezione, presa dal suo contenuto.** È il «guizzo» di
   comunicazionecinofila: lì le zampe, la ciotola, il sentiero sono
   mosse nate dal tema. Qui sono nate così le macchine dei servizi (la
   roadmap che si riordina, l'ordine che parte, il foglio Excel che passa
   le righe al processo, l'AI che risponde con una persona che approva,
   il monitor, la lezione), le tre lastre di «Chi siamo», il brief che si
   scrive da solo. Ogni sezione nuova si chiede: qual è la sua mossa?

## Le curve e i tempi (da mettere nei token)

| Nome | Curva | Per |
| --- | --- | --- |
| `--ease-settle` | expo-out (`power4.out`) | un corpo che arriva e si posa: lungo, morbido alla fine |
| `--ease-rigid` | `power2.inOut` | le macchine: partono e frenano come un carrello |
| `--ease-light` | `sine.inOut` | la luce: senza accelerazioni visibili |
| `--ease-stamp` | `back.out(3)` | solo timbri e pressioni |

Durate: la luce lenta (1,2–1,6 s), i corpi medi (0,6–0,9 s), le
pressioni brevi (0,1–0,15 s). Distanze: i corpi viaggiano poco (16–36
px), la luce attraversa tutto.

## Le mosse da costruire (proposte, in ordine di impatto)

1. **La facciata si accende.** Sulla home, mentre scendi, le campate
   della facciata dietro alle sezioni si illuminano una dopo l'altra,
   come un palazzo al tramonto, piano per piano: una luce tenue nella
   campata dove sta la sezione in vista. È la firma del nuovo sfondo,
   costa poco (un livello fisso, un'opacità per campata).
2. **Le tende tra le pagine.** Il cambio pagina (ClientRouter) come
   lamelle verticali sulle sei campate che si chiudono e si riaprono, con
   la luce che passa tra le fessure. Netta, architettonica, riconoscibile;
   a movimento ridotto un semplice dissolvenza.
3. **I titoli costruiti.** I titoli di sezione entrano a filo (contorno
   blu, come le iniziali di «Chi siamo») e si riempiono di inchiostro: al
   posto di una parte delle varianti di `split-cycle`, sulla casa.
4. **Le quote.** Attorno a un numero o a un risultato (i «prima → dopo»
   dei casi) compaiono le linee di quota di un disegno tecnico — i
   trattini, la misura — poi si ritirano. Il linguaggio del blueprint,
   senza decorare.
5. **Il mirino.** Sul desktop, nell'hero della home, il cursore diventa
   un mirino da CAD con le coordinate che scorrono (solo lì, solo con il
   mouse): eccentrico ma sobrio, e dice «qui si progetta».
6. **La temperatura.** Il campo di luce cambia temperatura tra le sezioni
   (più freddo sui servizi, più caldo verso i contatti), sempre nei blu.

## Cosa non fare

Niente blob liquidi, niente morph arrotondati, niente particelle, niente
gradienti fuori palette (viola, rosa), niente parallasse per decorare,
niente rimbalzi su ciò che non è un timbro. Niente movimento che non
dica qualcosa della sezione.

## Da rivedere alla prossima sessione

- Gli `elastic.out` e `back.out` che non sono timbri: `rail.ts` (le
  piastrelle), `map.ts` (i punti), `pop.ts`, parte di `scenes.ts`.
- Il `tilt` sulla casa: tenerlo solo dove c'è un oggetto appoggiato (un
  telefono, un foglio), toglierlo dalle card.
- Mettere le curve della tabella nei token e nei «Settings» di ogni
  effetto, così il carattere è uno solo.
- Lo Studio ha il suo registro (arrotondato, volt, giocoso): queste
  regole sono della casa; lo Studio ne discute nella sua sessione.
