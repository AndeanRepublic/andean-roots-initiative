import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import {
  addRandomWordFlipReveal,
  resetTextRevealTargets,
  splitTextRevealWords,
} from '../../../../components/TextReveal/text-reveal';
import {
  consumePathBeforeHomeNavigation,
  isHomePathname,
} from '../../../../utils/home-hero-nav-context';
import { BREAKPOINT_QUERIES } from '../../../../utils/breakpoints';
import {
  RESTORE_SCROLL_ON_RELOAD,
  isElementAboveViewport,
} from '../../../../utils/scroll-restoration';

gsap.registerPlugin(CustomEase);
CustomEase.create('hop', '.8, 0, .3, 1');

const PRE = '[data-anim="hero-preloader"]';
const SPLIT = '[data-anim="hero-split-overlay"]';
const CONT = '[data-anim="hero-container"]';
const INTRO = '#home-hero-intro-root';

let heroIntroTl: gsap.core.Timeline | null = null;
let releaseHeroScrollLock: (() => void) | null = null;

function lockHeroScroll() {
  releaseHeroScrollLock?.();

  const { body } = document;
  const scrollY = window.scrollY;
  const previousBodyOverflow = body.style.overflow;
  const previousBodyPosition = body.style.position;
  const previousBodyTop = body.style.top;
  const previousBodyWidth = body.style.width;

  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.width = '100%';

  releaseHeroScrollLock = () => {
    body.style.overflow = previousBodyOverflow;
    body.style.position = previousBodyPosition;
    body.style.top = previousBodyTop;
    body.style.width = previousBodyWidth;
    window.scrollTo({ top: scrollY, behavior: 'auto' });
    releaseHeroScrollLock = null;
  };
}

/** Same DOM as `SplitText` (words,chars) + inner span for the char tween targets. */
function splitIntroHeadings() {
  document.querySelectorAll<HTMLElement>(`${PRE} h2, ${SPLIT} h2`).forEach((h2) => {
    h2.style.visibility = 'visible';
    const text = h2.textContent ?? '';
    h2.textContent = '';
    for (const char of text) {
      const charEl = document.createElement('span');
      charEl.className = 'char';
      const inner = document.createElement('span');
      inner.textContent = char;
      charEl.appendChild(inner);
      h2.appendChild(charEl);
    }
  });
}

/** Desktop and compact trees both live in the DOM; only the visible one should be tweened. */
function getActiveHeroLayout(container: HTMLElement): HTMLElement | null {
  const isDk = window.matchMedia(BREAKPOINT_QUERIES.dk).matches;
  return container.querySelector<HTMLElement>(
    isDk ? '[data-hero-layout="desktop"]' : '[data-hero-layout="compact"]',
  );
}

function resetIntroSplit() {
  document.querySelectorAll<HTMLElement>(`${PRE} h2, ${SPLIT} h2`).forEach((h2) => {
    h2.style.visibility = 'hidden';
    if (!h2.querySelector('.char')) return;
    const rebuilt = Array.from(h2.querySelectorAll<HTMLElement>('.char'))
      .map((c) => c.querySelector('span')?.textContent ?? '')
      .join('');
    h2.textContent = rebuilt;
  });
}

/**
 * Hero intro (hero-reveal-2) + revelado: título por carácter; resto en bloque (sub → CTA → scroll → header).
 * Init solo desde `astro:page-load`.
 */
export function initHomeHeroRevealAnimation() {
  const pathLeft = consumePathBeforeHomeNavigation();
  const skipIntro =
    pathLeft != null && !isHomePathname(pathLeft) && isHomePathname(window.location.pathname);

  const container = document.querySelector<HTMLElement>(CONT);
  const preloader = document.querySelector<HTMLElement>(PRE);
  const splitOverlay = document.querySelector<HTMLElement>(SPLIT);
  const introRoot = document.querySelector<HTMLElement>(INTRO);
  if (!container || !preloader || !splitOverlay || !introRoot) return;

  const heroImg = container.querySelector<HTMLElement>('.hero-img');
  const layout = getActiveHeroLayout(container);
  if (!heroImg || !layout) return;

  const siteHeader = document.querySelector<HTMLElement>('[data-hero-header]');
  const subEl = layout.querySelector<HTMLElement>('[data-hero-sub]');
  const ctaEl = layout.querySelector<HTMLElement>('[data-hero-cta]');
  const scrollEl = container.querySelector<HTMLElement>('[data-hero-scroll]');
  const titleLineEls = Array.from(layout.querySelectorAll<HTMLElement>('[data-hero-text-line]'));
  const heroTitleRevealRoot = layout.querySelector<HTMLElement>(
    '[data-text-reveal-root="hero-title"]',
  );

  heroIntroTl?.kill();
  heroIntroTl = null;
  releaseHeroScrollLock?.();
  const isMobile = window.innerWidth <= 1000;
  const heroIsAboveViewport = isElementAboveViewport(container);

  gsap.killTweensOf([
    preloader,
    splitOverlay,
    container,
    heroImg,
    siteHeader,
    subEl,
    ctaEl,
    scrollEl,
    ...titleLineEls,
    ...gsap.utils.toArray<HTMLElement>(`${INTRO} .andean`),
    ...gsap.utils.toArray<HTMLElement>(`${INTRO} .roots`),
    ...gsap.utils.toArray<HTMLElement>(`${INTRO} .initiative`),
    ...gsap.utils.toArray<HTMLElement>(`${PRE} .char span, ${SPLIT} .char span`),
  ]);

  // Only when reload-at-position is on. Otherwise Home always starts at the Hero.
  if (RESTORE_SCROLL_ON_RELOAD && heroIsAboveViewport) {
    resetIntroSplit();
    if (heroTitleRevealRoot) {
      resetTextRevealTargets(heroTitleRevealRoot, '[data-hero-text-line]');
    }

    introRoot.style.visibility = 'hidden';
    introRoot.style.pointerEvents = 'none';
    gsap.set([preloader, splitOverlay], { autoAlpha: 0, pointerEvents: 'none' });
    gsap.set(container, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    });
    gsap.set(heroImg, { scale: 1 });
    gsap.set(titleLineEls, { opacity: 1, y: 0 });
    if (subEl) gsap.set(subEl, { opacity: 1, y: 0 });
    if (ctaEl) gsap.set(ctaEl, { opacity: 1, y: 0 });
    if (scrollEl) gsap.set(scrollEl, { opacity: 1, y: 0 });
    if (siteHeader) gsap.set(siteHeader, { opacity: 1, y: 0 });
    return;
  }

  if (skipIntro) {
    resetIntroSplit();
    introRoot.style.visibility = 'hidden';
    introRoot.style.pointerEvents = 'none';
    gsap.set([preloader, splitOverlay], { opacity: 0, pointerEvents: 'none' });
    const clipStart = isMobile
      ? 'polygon(0% 49.5%, 0% 49.5%, 0% 50.5%, 0% 50.5%)'
      : 'polygon(0% 49%, 0% 49%, 0% 51%, 0% 51%)';
    gsap.set(container, { clipPath: clipStart });
    gsap.set(heroImg, { scale: 1.12 });

    if (heroTitleRevealRoot) {
      resetTextRevealTargets(heroTitleRevealRoot, '[data-hero-text-line]');
    }
    const titleRevealSkip = heroTitleRevealRoot
      ? splitTextRevealWords(heroTitleRevealRoot, {
          targetSelector: '[data-hero-text-line]',
          charClassName: 'hero-title-char',
          trim: true,
        })
      : { chars: [], words: [] };

    if (titleRevealSkip.chars.length > 0) {
      gsap.set(titleRevealSkip.chars, { opacity: 0 });
    } else if (titleLineEls.length > 0) {
      gsap.set(titleLineEls, { opacity: 0, y: 14 });
    }
    if (subEl) gsap.set(subEl, { opacity: 0, y: 18 });
    if (ctaEl) gsap.set(ctaEl, { opacity: 0, y: 18 });
    if (scrollEl) gsap.set(scrollEl, { opacity: 0, y: 18 });
    if (siteHeader) gsap.set(siteHeader, { opacity: 0, y: -20 });

    const entranceTl = gsap.timeline({ defaults: { ease: 'hop' } });
    entranceTl.to(
      container,
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.8 },
      0,
    );
    entranceTl.to(heroImg, { scale: 1, duration: 0.9 }, 0);

    const postStart = 0.35;
    if (titleRevealSkip.words.length > 0) {
      addRandomWordFlipReveal(entranceTl, titleRevealSkip.words, titleLineEls, {
        position: postStart,
      });
    } else if (titleLineEls.length > 0) {
      entranceTl.to(
        titleLineEls,
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
        postStart,
      );
    }
    const afterTitle =
      titleRevealSkip.words.length > 0 || titleLineEls.length > 0 ? '>' : postStart;
    const restGroup = [subEl, ctaEl, scrollEl, siteHeader].filter(Boolean) as HTMLElement[];
    if (restGroup.length > 0) {
      entranceTl.to(
        restGroup,
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        afterTitle,
      );
    }
    return;
  }

  introRoot.style.visibility = 'visible';
  introRoot.style.pointerEvents = 'auto';

  gsap.set([preloader, splitOverlay], { clearProps: 'all' });
  gsap.set(container, { clearProps: 'clipPath' });
  gsap.set(heroImg, { clearProps: 'transform' });
  gsap.set(`${INTRO} .andean, ${INTRO} .roots, ${INTRO} .initiative`, { clearProps: 'all' });
  // Keep CSS translate(-50%, -50%) in GSAP's cache so later x/y do not drop the words.
  gsap.set(`${INTRO} .andean, ${INTRO} .roots, ${INTRO} .initiative`, {
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
  });
  if (siteHeader) gsap.set(siteHeader, { clearProps: 'opacity,transform' });
  if (subEl) gsap.set(subEl, { clearProps: 'all' });
  if (ctaEl) gsap.set(ctaEl, { clearProps: 'all' });
  if (scrollEl) gsap.set(scrollEl, { clearProps: 'all' });
  titleLineEls.forEach((el) => gsap.set(el, { clearProps: 'opacity,transform' }));

  resetIntroSplit();

  splitIntroHeadings();
  const titleReveal = heroTitleRevealRoot
    ? splitTextRevealWords(heroTitleRevealRoot, {
        targetSelector: '[data-hero-text-line]',
        charClassName: 'hero-title-char',
        trim: true,
      })
    : { chars: [], words: [] };

  const splitInnerSpans = gsap.utils.toArray<HTMLElement>(
    `${SPLIT} .andean .char span, ${SPLIT} .roots .char span, ${SPLIT} .initiative .char span`,
  );
  gsap.set(splitInnerSpans, { y: '0%' });

  gsap.set(heroImg, { scale: 1.2 });
  if (titleReveal.chars.length > 0) {
    gsap.set(titleReveal.chars, { opacity: 0 });
  } else {
    gsap.set(titleLineEls, { opacity: 0, y: 14 });
  }
  if (subEl) gsap.set(subEl, { opacity: 0, y: 18 });
  if (ctaEl) gsap.set(ctaEl, { opacity: 0, y: 18 });
  if (scrollEl) gsap.set(scrollEl, { opacity: 0, y: 18 });
  if (siteHeader) gsap.set(siteHeader, { opacity: 0, y: -20 });

  if (isMobile) {
    gsap.set(`${INTRO} .andean`, { y: '-3.5rem' });
    gsap.set(`${INTRO} .initiative`, { y: '3.5rem' });
    gsap.set(container, {
      clipPath: 'polygon(0% 49.5%, 0% 49.5%, 0% 50.5%, 0% 50.5%)',
    });
  } else {
    gsap.set(container, {
      clipPath: 'polygon(0% 49%, 0% 49%, 0% 51%, 0% 51%)',
    });
  }

  lockHeroScroll();

  const tl = gsap.timeline({
    defaults: { ease: 'hop' },
    onComplete: () => {
      releaseHeroScrollLock?.();
      introRoot.style.visibility = 'hidden';
      introRoot.style.pointerEvents = 'none';
    },
    onInterrupt: () => {
      releaseHeroScrollLock?.();
      introRoot.style.visibility = 'hidden';
      introRoot.style.pointerEvents = 'none';
    },
  });

  const arcProxy = { t: 0 };

  const bezier = (t: number, p0: number, p1: number, p2: number, p3: number) => {
    const mt = 1 - t;
    return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
  };

  const preCharSpans = gsap.utils.toArray<HTMLElement>(
    `${PRE} .andean .char span, ${PRE} .roots .char span, ${PRE} .initiative .char span`,
  );

  tl.to(preCharSpans, { y: '0%', duration: 0.75, stagger: 0.05 }, 0.5);
  tl.to(
    `${SPLIT} .andean .char span, ${SPLIT} .roots .char span, ${SPLIT} .initiative .char span`,
    { y: '0%', duration: 0.75, stagger: 0.05 },
    0.5,
  );

  if (isMobile) {
    tl.to(`${INTRO} .andean`, { y: '-2.5rem', duration: 0.75 }, 2);
    tl.to(`${INTRO} .initiative`, { y: '2.5rem', duration: 0.75 }, 2);
  }

  if (!isMobile) {
    tl.to(
      arcProxy,
      {
        t: 1,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const t = arcProxy.t;
          gsap.set(`${INTRO} .andean`, {
            xPercent: -50,
            yPercent: -50,
            x: bezier(t, 0, 1, 12, 19) + 'rem',
            y: bezier(t, 0, -5, -4, -3.7) + 'rem',
          });
          gsap.set(`${INTRO} .initiative`, {
            xPercent: -50,
            yPercent: -50,
            x: bezier(t, 0, -1, -13, -21) + 'rem',
            y: bezier(t, 0, 5, 4, 3.7) + 'rem',
          });
        },
      },
      2,
    );
  }

  tl.to(`${INTRO} .roots`, { scale: 1.25, duration: 0.75 }, isMobile ? 2 : '<');
  tl.to(
    `${INTRO} .initiative`,
    {
      scale: 0.8,
      duration: 0.75,
      onComplete: () => {
        gsap.set(preloader, {
          clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
        });
        gsap.set(splitOverlay, {
          clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
        });
      },
    },
    '<',
  );
  const clipMidBand = isMobile
    ? 'polygon(0% 49.5%, 100% 49.5%, 100% 50.5%, 0% 50.5%)'
    : 'polygon(0% 49%, 100% 49%, 100% 51%, 0% 51%)';
  const clipStart = isMobile
    ? 'polygon(0% 49.5%, 0% 49.5%, 0% 50.5%, 0% 50.5%)'
    : 'polygon(0% 49%, 0% 49%, 0% 51%, 0% 51%)';

  tl.fromTo(
    container,
    { clipPath: clipStart },
    { clipPath: clipMidBand, duration: 1, ease: 'hop' },
    3.5,
  );
  tl.to([preloader, splitOverlay], { y: (i) => (i === 0 ? '-50%' : '50%'), duration: 1 }, 4.5);
  tl.to(container, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1 }, 4.5);
  tl.fromTo(heroImg, { scale: 1.2 }, { scale: 1, duration: 1, ease: 'hop' }, 4.5);

  const postStart = 5.5;
  if (titleReveal.words.length > 0) {
    addRandomWordFlipReveal(tl, titleReveal.words, titleLineEls, { position: postStart });
  } else if (titleLineEls.length > 0) {
    tl.to(
      titleLineEls,
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
      postStart,
    );
  }
  const afterTitle = titleReveal.words.length > 0 || titleLineEls.length > 0 ? '>' : postStart;
  const restGroup = [subEl, ctaEl, scrollEl, siteHeader].filter(Boolean) as HTMLElement[];
  if (restGroup.length > 0) {
    tl.to(restGroup, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, afterTitle);
  }

  heroIntroTl = tl;
}
