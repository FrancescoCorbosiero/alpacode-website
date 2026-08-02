/* Ref-counted body scroll lock, shared by every overlay (⌘K palette,
   mobile nav). Each overlay used to save/restore body.style.overflow on
   its own; with two open at once, closing them in the wrong order could
   write a stale "hidden" back and leave the page unscrollable. */

let locks = 0;

/** Acquire the lock; call the returned function to release it. */
export function lockScroll(): () => void {
  locks += 1;
  if (locks === 1) document.body.style.overflow = "hidden";
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) document.body.style.overflow = "";
  };
}
