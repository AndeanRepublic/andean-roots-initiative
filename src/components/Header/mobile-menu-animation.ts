import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { navPathMatchesLink } from '../../i18n/nav-active';

gsap.registerPlugin(CustomEase);

const EASE_NAME = 'mobile-menu-hop';
const HOP = CustomEase.create(EASE_NAME, '.87,0,.13,1');
const CLIP_CLOSED = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
const CLIP_OPEN = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
const CLOSE_AFTER_NAV_FLAG = 'mobile-menu-close-after-nav';

const getPushTargets = () => {
  const excludedSelectors = [
    '[data-site-header]',
    '[data-mobile-menu-root]',
    'script',
    'style',
    'astro-dev-toolbar',
  ];

  return Array.from(document.body.children).filter((child): child is HTMLElement => {
    if (!(child instanceof HTMLElement)) return false;
    return !excludedSelectors.some((selector) => child.matches(selector));
  });
};

const initMobileMenu = () => {
  const root = document.querySelector<HTMLElement>('[data-mobile-menu-root]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-mobile-menu-toggle]');
  const toggleLabel = document.querySelector<HTMLElement>('[data-mobile-menu-toggle-label]');
  const overlay = document.querySelector<HTMLElement>('[data-mobile-menu-overlay]');
  const content = document.querySelector<HTMLElement>('[data-mobile-menu-content]');
  const headerNav = document.querySelector<HTMLElement>('[data-site-header-nav]');
  const hamburger = document.querySelector<HTMLElement>('[data-mobile-menu-icon]');
  const hamTop = document.querySelector<HTMLElement>('[data-mobile-menu-icon-top]');
  const hamBottom = document.querySelector<HTMLElement>('[data-mobile-menu-icon-bottom]');
  const media = document.querySelector<HTMLElement>('[data-mobile-menu-media]');
  const copyLines = Array.from(
    document.querySelectorAll<HTMLElement>('[data-mobile-menu-line]'),
  );
  const copyContainers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-mobile-menu-col], [data-mobile-menu-footer]'),
  );

  if (!root || !toggle || !overlay || !content) return () => {};

  const pushTargets = getPushTargets();
  const closeAfterNav = sessionStorage.getItem(CLOSE_AFTER_NAV_FLAG) === '1';

  if (!closeAfterNav) {
    document.documentElement.classList.remove('mobile-menu--pending-close');
  }

  let isOpen = false;
  let isAnimating = false;

  const syncActiveMobileLink = () => {
    const currentPath = window.location.pathname;
    copyLines.forEach((line) => {
      if (!(line instanceof HTMLAnchorElement)) return;
      if (line.hasAttribute('data-lang-switch')) return;
      const href = line.getAttribute('href') ?? '';
      if (!href || href.startsWith('#')) return;
      const isActive = navPathMatchesLink(currentPath, href);
      line.classList.toggle('text-white', isActive);
      line.classList.toggle('text-white/40', !isActive);
    });
  };
  syncActiveMobileLink();

  const setHeaderNavTransparent = (transparent: boolean) => {
    if (!headerNav) return;
    headerNav.classList.toggle('bg-transparent', transparent);
    headerNav.classList.toggle('bg-black/20', !transparent);
  };

  const setExpanded = (expanded: boolean) => {
    toggle.setAttribute('aria-expanded', String(expanded));
    overlay.setAttribute('aria-hidden', String(!expanded));
  };

  const setFullyOpenState = () => {
    isOpen = true;
    isAnimating = false;
    setExpanded(true);
    gsap.set(root, { pointerEvents: 'auto' });
    gsap.set(pushTargets, { y: '16svh' });
    gsap.set(overlay, { clipPath: CLIP_OPEN });
    gsap.set(content, { yPercent: 0 });
    gsap.set(toggleLabel, { y: '-110%' });
    gsap.set(copyLines, { y: '0%' });
    gsap.set(copyContainers, { opacity: 1 });
    if (hamTop) gsap.set(hamTop, { y: 0, rotate: 45, scaleX: 1.05 });
    if (hamBottom) gsap.set(hamBottom, { y: 0, rotate: -45, scaleX: 1.05 });
    if (media) gsap.set(media, { opacity: 1 });
    document.body.style.overflow = 'hidden';
    setHeaderNavTransparent(true);
  };

  const openMenu = () => {
    isAnimating = true;
    isOpen = true;
    setExpanded(true);
    document.body.style.overflow = 'hidden';
    gsap.set(root, { pointerEvents: 'auto' });
    setHeaderNavTransparent(true);

    const tl = gsap.timeline({
      defaults: { ease: HOP },
      onComplete: () => {
        isAnimating = false;
      },
    });

    tl.to(toggleLabel, { y: '-110%', duration: 1 }, '<')
      .to(pushTargets, { y: '16svh', duration: 1 }, '<')
      .to(overlay, { clipPath: CLIP_OPEN, duration: 1 }, '<')
      .to(content, { yPercent: 0, duration: 1 }, '<')
      .to(hamTop, { y: 0, rotate: 45, scaleX: 1.05, duration: 0.75 }, '<')
      .to(hamBottom, { y: 0, rotate: -45, scaleX: 1.05, duration: 0.75 }, '<')
      .to(media, { opacity: 1, duration: 0.75, ease: 'power2.out' }, '<0.5');

    copyContainers.forEach((container) => {
      const lines = Array.from(
        container.querySelectorAll<HTMLElement>('[data-mobile-menu-line]'),
      );
      if (lines.length === 0) return;

      tl.to(
        lines,
        {
          y: '0%',
          duration: 1.35,
          stagger: -0.055,
        },
        -0.1,
      );
    });
  };

  const closeMenu = () => {
    isAnimating = true;
    isOpen = false;
    setExpanded(false);

    const tl = gsap.timeline({
      defaults: { ease: HOP },
      onComplete: () => {
        gsap.set(root, { pointerEvents: 'none' });
        gsap.set(copyLines, { y: '-110%' });
        gsap.set(copyContainers, { opacity: 1 });
        if (media) gsap.set(media, { opacity: 0 });
        document.body.style.overflow = '';
        setHeaderNavTransparent(false);
        isAnimating = false;
      },
    });

    tl.to(pushTargets, { y: '0svh', duration: 1 })
      .to(overlay, { clipPath: CLIP_CLOSED, duration: 1 }, '<')
      .to(content, { yPercent: -50, duration: 1 }, '<')
      .to(toggleLabel, { y: '0%', duration: 1 }, '<')
      .to(hamTop, { y: -3, rotate: 0, scaleX: 1, duration: 0.75 }, '<')
      .to(hamBottom, { y: 3, rotate: 0, scaleX: 1, duration: 0.75 }, '<')
      .to(copyContainers, { opacity: 0.25, duration: 1 }, '<');
  };

  const forceClose = () => {
    if (!isOpen && !isAnimating) return;
    gsap.killTweensOf([
      root,
      overlay,
      content,
      toggleLabel,
      hamburger,
      hamTop,
      hamBottom,
      media,
      ...copyLines,
      ...copyContainers,
      ...pushTargets,
    ]);
    gsap.set(root, { pointerEvents: 'none' });
    gsap.set(pushTargets, { y: '0svh' });
    gsap.set(overlay, { clipPath: CLIP_CLOSED });
    gsap.set(content, { yPercent: -50 });
    gsap.set(toggleLabel, { y: '0%' });
    gsap.set(copyLines, { y: '-110%' });
    gsap.set(copyContainers, { opacity: 1 });
    if (hamTop) gsap.set(hamTop, { y: -3, rotate: 0, scaleX: 1 });
    if (hamBottom) gsap.set(hamBottom, { y: 3, rotate: 0, scaleX: 1 });
    if (media) gsap.set(media, { opacity: 0 });
    setExpanded(false);
    document.body.style.overflow = '';
    setHeaderNavTransparent(false);
    isOpen = false;
    isAnimating = false;
  };

  if (!closeAfterNav) {
    gsap.set(root, { pointerEvents: 'none' });
    gsap.set(overlay, { clipPath: CLIP_CLOSED });
    gsap.set(content, { yPercent: -50 });
    gsap.set(copyLines, { y: '-110%' });
    gsap.set(copyContainers, { opacity: 1 });
    if (media) gsap.set(media, { opacity: 0 });
  } else {
    sessionStorage.removeItem(CLOSE_AFTER_NAV_FLAG);
    document.documentElement.classList.remove('mobile-menu--pending-close');
    setFullyOpenState();
    requestAnimationFrame(() => closeMenu());
  }

  const ac = new AbortController();
  const { signal } = ac;

  toggle.addEventListener(
    'click',
    () => {
      if (isAnimating) return;
      isOpen ? closeMenu() : openMenu();
    },
    { signal },
  );

  copyLines.forEach((line) => {
    if (line instanceof HTMLAnchorElement) {
      line.addEventListener(
        'click',
        (event) => {
          if (isAnimating) {
            event.preventDefault();
            return;
          }

          const href = line.getAttribute('href');
          // For real navigations, keep menu open through route change and close it
          // on the next page to preserve the cinematic transition.
          if (href && !href.startsWith('#')) {
            sessionStorage.setItem(CLOSE_AFTER_NAV_FLAG, '1');
            return;
          }

          event.preventDefault();
          closeMenu();
        },
        { signal },
      );
    }
  });

  document.addEventListener(
    'astro:before-swap',
    () => {
      if (sessionStorage.getItem(CLOSE_AFTER_NAV_FLAG) === '1') return;
      forceClose();
    },
    { signal },
  );

  return () => {
    ac.abort();
    forceClose();
  };
};

let cleanupMobileMenu: (() => void) | undefined;

export const initMobileMenuAnimation = () => {
  cleanupMobileMenu?.();
  cleanupMobileMenu = initMobileMenu();
};
