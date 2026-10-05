/* Ref-counted body scroll lock, shared by every overlay (⌘K palette,
   mobile nav). Each overlay used to save/restore body.style.overflow on
   its own; with two open at once, closing them in the wrong order could
   write a stale "hidden" back and leave the page unscrollable.

   It also announces itself ("alpa:scroll-lock", detail = locked) so the
   smooth-scroll engine (lib/motion.ts) pauses with it: Lenis scrolls the
   window programmatically, which overflow: hidden alone doesn't stop. */

let locks = 0;

const announce = (locked: boolean): void => {
  document.dispatchEvent(new CustomEvent("alpa:scroll-lock", { detail: locked }));
};

/** Acquire the lock; call the returned function to release it. */
export function lockScroll(): () => void {
  locks += 1;
  if (locks === 1) {
    document.body.style.overflow = "hidden";
    announce(true);
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) {
      document.body.style.overflow = "";
      announce(false);
    }
  };
}
