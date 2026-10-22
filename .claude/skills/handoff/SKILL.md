---
name: handoff
description: Close a working session so the next chat can pick it up. Use when the owner says "prepara il passaggio", "aggiorna lo stato", "chiudiamo qui", "passo a un'altra chat", or at the end of any session that changed the sites, the strategy or a decision.
---

# Handoff

The next chat starts from `CLAUDE.md` and `docs/status.md`. Leave them
true.

1. **`docs/status.md`** (Italian — the owner reads and corrects it):
   - «Cosa c'è»: add or update what this session built, with paths.
   - «Decisioni del proprietario»: only what the owner actually said or
     confirmed in this chat — quote them when it matters.
   - «Ipotesi da validare»: every choice you made on your own that a
     later chat could mistake for a decision (names, prices read from an
     ambiguous brief, copy written as a draft, things you left out). Move
     an item to «Decisioni» when the owner confirms it; delete it when
     they reject it.
   - «Decisioni aperte»: what blocks or waits on the owner.
   - «Da sapere»: limits found (what couldn't be tested, manual steps).
   - «Sessioni»: one line for this session (the PR, if there is one).
   - Update the date at the top.
2. **`CLAUDE.md`** (and `fast/CLAUDE.md`): only if the map, the
   commands, a house rule or the owner's working preferences changed.
   Keep it short: it's loaded into every session.
3. Docs the session touched (`docs/marketing-map.md`,
   `docs/landing-factory.md`, `fast/README.md`, `docs/voucher.md`) agree
   with the code.
4. Commit ("Handoff: …") and push to the session's branch.
5. Reply to the owner, in Italian, with the two or three things the
   next chat most needs from them (the open decisions that block work).
