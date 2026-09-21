import { navPathMatchesLink } from '../../i18n/nav-active';
import { setupDesktopMenuAnimation } from './desktop-menu-animation';

const getActiveLinkFromLocation = (links: HTMLAnchorElement[]) => {
  const pathname = window.location.pathname;
  const matching = links.filter((link) =>
    navPathMatchesLink(pathname, link.getAttribute('href') ?? ''),
  );
  return (
    matching.find((link) => !(link.getAttribute('href') ?? '').includes('#')) ??
    matching[0] ??
    links[0] ??
    null
  );
};

const initDesktopNavIndicator = () => {
  const navLists = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-list]'));
  const cleanups: Array<() => void> = [];

  navLists.forEach((list) => {
    const indicator = list.querySelector<HTMLElement>('[data-nav-indicator]');
    const links = Array.from(list.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
    if (!indicator || links.length === 0) return;

    const placeIndicator = (target: HTMLAnchorElement | null, instant = false) => {
      if (!target) {
        indicator.style.opacity = '0';
        links.forEach((link) => {
          link.classList.remove('text-main');
          link.classList.add('text-white');
        });
        return;
      }

      const listRect = list.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const x = targetRect.left - listRect.left;
      const y = targetRect.top - listRect.top;

      if (instant) indicator.style.transitionDuration = '0ms';
      indicator.style.transform = `translate(${x}px, ${y}px)`;
      indicator.style.width = `${targetRect.width}px`;
      indicator.style.height = `${targetRect.height}px`;
      indicator.style.opacity = '1';
      links.forEach((link) => {
        const isCurrent = link === target;
        link.classList.toggle('text-main', isCurrent);
        link.classList.toggle('text-white', !isCurrent);
      });
      if (instant) requestAnimationFrame(() => (indicator.style.transitionDuration = '300ms'));
    };

    const getActiveLink = () => getActiveLinkFromLocation(links);
    placeIndicator(getActiveLink(), true);

    const ac = new AbortController();
    const { signal } = ac;

    links.forEach((link) => {
      link.addEventListener('mouseenter', () => placeIndicator(link), { signal });
      link.addEventListener('focus', () => placeIndicator(link), { signal });
    });

    list.addEventListener('mouseleave', () => placeIndicator(getActiveLink()), { signal });
    list.addEventListener(
      'focusout',
      (event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !list.contains(nextTarget)) {
          placeIndicator(getActiveLink());
        }
      },
      { signal },
    );

    window.addEventListener('resize', () => placeIndicator(getActiveLink(), true), { signal });
    cleanups.push(() => ac.abort());
  });

  return () => cleanups.forEach((cleanup) => cleanup());
};

let cleanupDesktopNavIndicator: (() => void) | undefined;
let cleanupDesktopMenu: (() => void) | undefined;

export const initHeaderAnimation = () => {
  cleanupDesktopNavIndicator?.();
  cleanupDesktopMenu?.();
  cleanupDesktopNavIndicator = initDesktopNavIndicator();
  cleanupDesktopMenu = setupDesktopMenuAnimation();
};

