import gsap from 'gsap';
import { BREAKPOINT_QUERIES } from '../../utils/breakpoints';

const SCROLL_THRESHOLD = 96;
const NAV_HIDDEN_Y = '-160%';
const TOGGLE_HIDDEN_Y = '-140%';
const CLOSE_WIDTH = '2.3125rem';

function setupDesktopMenu() {
  const nav = document.querySelector<HTMLElement>('[data-site-header-nav]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-desktop-menu-toggle]');
  const close = document.querySelector<HTMLButtonElement>('[data-desktop-menu-close]');
  const closeShell = document.querySelector<HTMLElement>('[data-desktop-menu-close-shell]');

  if (!nav || !toggle || !close || !closeShell) return () => {};

  let mode: 'full' | 'compact' = window.scrollY > SCROLL_THRESHOLD ? 'compact' : 'full';
  let manuallyOpened = false;
  let timeline: gsap.core.Timeline | null = null;

  const killMotion = () => {
    timeline?.kill();
    timeline = null;
    gsap.killTweensOf([nav, toggle, closeShell]);
  };

  const syncAccessibility = (full: boolean, closeVisible: boolean) => {
    toggle.setAttribute('aria-expanded', String(full));
    toggle.tabIndex = full ? -1 : 0;
    close.tabIndex = closeVisible ? 0 : -1;
  };

  const setImmediateState = (nextMode: 'full' | 'compact', showClose: boolean) => {
    killMotion();
    const full = nextMode === 'full';

    gsap.set(nav, {
      y: full ? '0%' : NAV_HIDDEN_Y,
      autoAlpha: full ? 1 : 0,
      pointerEvents: full ? 'auto' : 'none',
    });
    gsap.set(toggle, {
      y: full ? TOGGLE_HIDDEN_Y : '0%',
      autoAlpha: full ? 0 : 1,
      pointerEvents: full ? 'none' : 'auto',
    });
    gsap.set(closeShell, {
      width: showClose ? CLOSE_WIDTH : 0,
      autoAlpha: showClose ? 1 : 0,
      pointerEvents: showClose ? 'auto' : 'none',
    });

    mode = nextMode;
    syncAccessibility(full, showClose);
  };

  const transitionTo = (nextMode: 'full' | 'compact', showClose: boolean) => {
    if (mode === nextMode && (nextMode === 'compact' || close.tabIndex === (showClose ? 0 : -1))) {
      return;
    }

    killMotion();
    const full = nextMode === 'full';
    mode = nextMode;
    syncAccessibility(full, showClose);

    if (full) {
      gsap.set(nav, { pointerEvents: 'auto' });
      gsap.set(toggle, { pointerEvents: 'none' });
    } else {
      gsap.set(nav, { pointerEvents: 'none' });
      gsap.set(toggle, { pointerEvents: 'auto' });
    }

    timeline = gsap.timeline({
      defaults: { duration: 0.7, ease: 'power3.inOut', overwrite: 'auto' },
    });

    timeline.to(
      toggle,
      { y: full ? TOGGLE_HIDDEN_Y : '0%', autoAlpha: full ? 0 : 1 },
      0,
    );
    timeline.to(nav, { y: full ? '0%' : NAV_HIDDEN_Y, autoAlpha: full ? 1 : 0 }, 0.08);
    timeline.to(
      closeShell,
      {
        width: showClose ? CLOSE_WIDTH : 0,
        autoAlpha: showClose ? 1 : 0,
        pointerEvents: showClose ? 'auto' : 'none',
        duration: 0.45,
      },
      full ? 0.35 : 0,
    );
  };

  setImmediateState(mode, false);

  const controller = new AbortController();
  const { signal } = controller;

  const handleScroll = () => {
    if (window.scrollY <= SCROLL_THRESHOLD) {
      manuallyOpened = false;
      transitionTo('full', false);
      return;
    }

    if (!manuallyOpened) transitionTo('compact', false);
  };

  window.addEventListener('scroll', handleScroll, { passive: true, signal });

  toggle.addEventListener(
    'click',
    () => {
      manuallyOpened = true;
      transitionTo('full', true);
    },
    { signal },
  );

  close.addEventListener(
    'click',
    () => {
      manuallyOpened = false;
      transitionTo(window.scrollY > SCROLL_THRESHOLD ? 'compact' : 'full', false);
    },
    { signal },
  );

  return () => {
    controller.abort();
    killMotion();
    gsap.set([nav, toggle, closeShell], { clearProps: 'all' });
    toggle.setAttribute('aria-expanded', 'false');
    toggle.removeAttribute('tabindex');
    close.setAttribute('tabindex', '-1');
  };
}

export function setupDesktopMenuAnimation() {
  const mm = gsap.matchMedia();
  mm.add(BREAKPOINT_QUERIES.dk, setupDesktopMenu);
  return () => mm.revert();
}
