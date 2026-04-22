import gsap from 'gsap';
import { resetSplitText, splitChars } from '../../utils/split-text';

const TITLE_LINE_SELECTOR = '[data-site-hero-title-line]';

function buildPageTitleChars(root: HTMLElement) {
  resetSplitText(root, TITLE_LINE_SELECTOR);
  const title = root.querySelector<HTMLElement>(TITLE_LINE_SELECTOR);
  return title ? splitChars(title, 'site-hero-title-char') : [];
}

function clearPageHeroStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, TITLE_LINE_SELECTOR);
}

let disposeActive: (() => void) | null = null;

function buildEntranceTimeline(root: HTMLElement) {
  const media = root.querySelector<HTMLElement>('[data-anim="media"]');
  const mediaOverlay = root.querySelector<HTMLElement>('[data-anim="media-overlay"]');
  const overlay = root.querySelector<HTMLElement>('[data-anim="overlay"]');
  const breadcrumb = root.querySelector<HTMLElement>('[data-anim="breadcrumb"]');
  const crumbItems = breadcrumb
    ? Array.from(
        breadcrumb.querySelectorAll<HTMLElement>(
          '[data-anim="crumb-item"], [data-anim="crumb-dot"]',
        ),
      )
    : [];
  const titleChars = buildPageTitleChars(root);

  if (media) {
    gsap.set(media, { scale: 1.14, yPercent: 6, filter: 'saturate(0.78) contrast(0.9)' });
  }
  if (mediaOverlay) gsap.set(mediaOverlay, { opacity: 0.58 });
  if (overlay) gsap.set(overlay, { opacity: 0.72 });
  if (titleChars.length) {
    gsap.set(titleChars, { opacity: 0, yPercent: 58, rotateZ: -2 });
  }
  if (crumbItems.length) {
    gsap.set(crumbItems, { opacity: 0, y: 18, filter: 'blur(2px)' });
  }

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  });

  const t0 = 0;
  const mediaDur = 1.05;

  if (media) {
    tl.to(media, { scale: 1, yPercent: 0, duration: mediaDur }, t0);
    const mediaFilter = { s: 0.78, c: 0.9 };
    tl.to(
      mediaFilter,
      {
        s: 1,
        c: 1,
        duration: mediaDur,
        ease: 'power2.out',
        onUpdate: () => {
          gsap.set(media, {
            filter: `saturate(${mediaFilter.s}) contrast(${mediaFilter.c})`,
          });
        },
      },
      t0,
    );
  }

  if (mediaOverlay) {
    tl.to(mediaOverlay, { opacity: 0.38, duration: 0.9, ease: 'power2.out' }, t0);
  }

  if (overlay) {
    tl.to(overlay, { opacity: 0.54, duration: 0.95, ease: 'power2.out' }, t0);
  }

  if (titleChars.length) {
    tl.fromTo(
      titleChars,
      { opacity: 0, yPercent: 58, rotateZ: -2 },
      {
        opacity: 1,
        yPercent: 0,
        rotateZ: 0,
        duration: 0.62,
        stagger: 0.03,
      },
      t0 + 0.22,
    );
  }

  if (crumbItems.length) {
    tl.fromTo(
      crumbItems,
      { opacity: 0, y: 18, filter: 'blur(2px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.48,
        stagger: 0.045,
        ease: 'power2.out',
      },
      t0 + 0.42,
    );
  }

  return tl;
}

/**
 * Hero tipo página: timeline de entrada al quedar la sección visible (sin ScrollTrigger).
 * Limpia la ejecución anterior en cada `astro:page-load`.
 */
export const initPageSiteHero = () => {
  disposeActive?.();
  disposeActive = null;

  const root = document.querySelector<HTMLElement>('[data-site-hero-variant="page"]');
  if (!root) return;

  clearPageHeroStyles(root);

  const tl = buildEntranceTimeline(root);

  let played = false;
  let io: IntersectionObserver | null = null;

  const playOnce = () => {
    if (played) return;
    played = true;
    io?.disconnect();
    io = null;
    tl.play(0);
  };

  io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) playOnce();
    },
    { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
  );

  io.observe(root);

  // Si el hero ya está en pantalla (fold superior), el IO puede tardar; evitamos quedarnos sin animación.
  requestAnimationFrame(() => {
    const r = root.getBoundingClientRect();
    if (r.bottom > 0 && r.top < window.innerHeight) playOnce();
  });

  disposeActive = () => {
    io?.disconnect();
    io = null;
    tl.kill();
    clearPageHeroStyles(root);
  };
};
