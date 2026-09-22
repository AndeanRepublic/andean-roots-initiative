/**
 * Interruptor de la recarga en Home.
 * false: el Home abre en el Hero, corre el preloader y el scroll queda bloqueado hasta que termina.
 * true: la recarga vuelve al mismo punto. Si ese punto ya pasó el Hero, el preloader no corre.
 */
export const RESTORE_SCROLL_ON_RELOAD = false;

const HERO = '[data-anim="hero-container"]';

/** Applies the reload policy. On Home with the switch off, also jumps back to the top. */
export function applyScrollRestorationPolicy() {
  if (typeof history === 'undefined' || !('scrollRestoration' in history)) return;

  const homeIsOnScreen = document.querySelector(HERO) != null;
  const pinHomeToHero = homeIsOnScreen && !RESTORE_SCROLL_ON_RELOAD;

  history.scrollRestoration = pinHomeToHero ? 'manual' : 'auto';

  if (pinHomeToHero) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}

/** True when the element has already scrolled completely above the viewport. */
export function isElementAboveViewport(element: HTMLElement) {
  return element.getBoundingClientRect().bottom <= 0;
}

/**
 * Runs after two frames so native scroll restoration has settled.
 * Returns a scheduler; call it on each page load and it cancels a pending run.
 */
export function afterNativeScrollRestoration(callback: () => void) {
  let frame = 0;

  return () => {
    if (typeof requestAnimationFrame === 'undefined') {
      callback();
      return;
    }

    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(callback);
    });
  };
}
