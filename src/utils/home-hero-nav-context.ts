import { isHomePathForNav } from '../i18n/nav-active';

/**
 * Tracks the pathname we are leaving right before Astro swaps the document,
 * so the Home hero can skip the full intro when arriving from another in-site page.
 */
let pathBeforeSwap: string | null = null;
let registered = false;

export function registerHomeHeroNavContext() {
  if (registered || typeof document === 'undefined') return;
  registered = true;
  document.addEventListener('astro:before-swap', () => {
    pathBeforeSwap = window.location.pathname;
  });
}

/** Consume once (call from Home hero init). */
export function consumePathBeforeHomeNavigation(): string | null {
  const p = pathBeforeSwap;
  pathBeforeSwap = null;
  return p;
}

export function isHomePathname(pathname: string): boolean {
  return isHomePathForNav(pathname);
}
