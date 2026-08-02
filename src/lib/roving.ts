import type { KeyboardEvent } from "react";

/* Roving-tabindex keyboard handler for horizontal tablists
   (BlogList tabs, home Cases, home Scale). Tabs with tabIndex -1 are
   unreachable without this: arrow keys are the only way to move. */
export function rovingTabKey(
  e: KeyboardEvent,
  current: number,
  count: number,
  activate: (next: number) => void,
): void {
  let next = current;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (current + 1) % count;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (current - 1 + count) % count;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = count - 1;
  else return;
  e.preventDefault();
  activate(next);
}
