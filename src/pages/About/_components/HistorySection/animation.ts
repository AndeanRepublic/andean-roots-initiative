import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars, splitWords } from '../../../../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

const ST_DESKTOP_ID = 'about-history-reveal';
const ST_MOBILE_TITLE_ID = 'about-history-title-reveal';

const T_TITLE = 0.14;
const T_CARDS = 0.33;
const T_BODY = 0.44;

/** Parte título y párrafos para permitir stagger granular en reveal/reverse. */
function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-history-text-line], [data-history-text-words]');
  const title = root.querySelector<HTMLElement>('[data-history-text-line]');
  const paragraphs = Array.from(root.querySelectorAll<HTMLElement>('[data-history-text-words]'));
  return {
    titleChars: title ? splitChars(title, 'about-history-title-char') : [],
    paragraphWords: paragraphs.flatMap((line) => splitWords(line, 'about-history-word')),
  };
}

function clearHistorySectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-history-text-line], [data-history-text-words]');
}

function setupDesktopHistoryReveal(root: HTMLElement) {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card"]'));
  const images = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card-image"]'));
  const { titleChars, paragraphWords } = buildTextNodes(root);

  if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 42 });
  if (paragraphWords.length) gsap.set(paragraphWords, { opacity: 0.1, y: 14, filter: 'blur(2px)' });
  if (cards.length) {
    gsap.set(cards, {
      opacity: 0,
      y: 40,
      rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
    });
  }
  if (images.length) {
    gsap.set(images, {
      scale: 1.4,
      yPercent: -20,
      filter: 'saturate(0.86)',
    });
  }

  let titleIn = false;
  let cardsIn = false;
  let bodyIn = false;

  /** Desktop conserva la orquestación global original (title -> cards -> body). */
  const handleThresholds = (p: number, immediate = false) => {
    const d = immediate ? 0 : 0.56;

    if (titleChars.length) {
      if (p >= T_TITLE && !titleIn) {
        gsap.to(titleChars, {
          opacity: 1,
          yPercent: 0,
          duration: d,
          stagger: immediate ? 0 : 0.014,
          ease: 'power2.out',
          overwrite: true,
        });
        titleIn = true;
      } else if (p < T_TITLE && titleIn) {
        gsap.to(titleChars, {
          opacity: 0,
          yPercent: 42,
          duration: d,
          stagger: immediate ? 0 : -0.01,
          ease: 'power2.in',
          overwrite: true,
        });
        titleIn = false;
      }
    }

    if (cards.length) {
      if (p >= T_CARDS && !cardsIn) {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: d,
          stagger: immediate ? 0 : 0.2,
          ease: 'power3.out',
          overwrite: true,
        });
        cardsIn = true;
      } else if (p < T_CARDS && cardsIn) {
        gsap.to(cards, {
          opacity: 0,
          y: 40,
          rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
          duration: d,
          stagger: immediate ? 0 : -0.08,
          ease: 'power2.in',
          overwrite: true,
        });
        cardsIn = false;
      }
    }

    if (paragraphWords.length) {
      if (p >= T_BODY && !bodyIn) {
        gsap.to(paragraphWords, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.3,
          stagger: immediate ? 0 : 0.04,
          ease: 'power2.out',
          overwrite: true,
        });
        bodyIn = true;
      } else if (p < T_BODY && bodyIn) {
        gsap.to(paragraphWords, {
          opacity: 0.1,
          y: 14,
          filter: 'blur(2px)',
          duration: 0.2,
          stagger: immediate ? 0 : -0.01,
          ease: 'power2.in',
          overwrite: true,
        });
        bodyIn = false;
      }
    }

    if (images.length) {
      gsap.to(images, {
        scale: 1.4,
        yPercent: -20 + p * 40,
        duration: immediate ? 0 : 0.5,
        overwrite: true,
      });
    }
  };

  const st = ScrollTrigger.create({
    id: ST_DESKTOP_ID,
    trigger: root,
    start: 'top 68%',
    end: 'bottom 15%',
    onUpdate: (self) => handleThresholds(self.progress),
  });

  handleThresholds(st.progress, true);

  return () => {
    st.kill();
    clearHistorySectionStyles(root);
  };
}

function setupMobileHistoryPerCardReveal(root: HTMLElement) {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card"]'));
  const { titleChars } = buildTextNodes(root);

  if (titleChars.length) {
    gsap.set(titleChars, { opacity: 0, yPercent: 28 });
  }

  cards.forEach((card) => {
    const cardWords = Array.from(card.querySelectorAll<HTMLElement>('.about-history-word'));
    const cardImage = card.querySelector<HTMLElement>('[data-anim="card-image"]');
    const cardBody = card.querySelector<HTMLElement>('[data-anim="card-body"]');

    if (cardWords.length) {
      gsap.set(cardWords, {
        opacity: 0.12,
        y: 12,
        filter: 'blur(2px)',
      });
    }
    if (cardBody) {
      gsap.set(cardBody, { opacity: 0, y: 12 });
    }
    if (cardImage) {
      gsap.set(cardImage, {
        scale: 1.2,
        opacity: 0,
        filter: 'saturate(0.9)',
      });
    }
  });

  const titleTween =
    titleChars.length > 0
      ? gsap.to(titleChars, {
          opacity: 1,
          yPercent: 0,
          duration: 0.48,
          stagger: 0.01,
          ease: 'power2.out',
          overwrite: true,
          scrollTrigger: {
            id: ST_MOBILE_TITLE_ID,
            trigger: root,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
      : null;

  /** Mobile/tablet: tween individual por imagen y bloque de texto. */
  const cardTweens = cards.flatMap((card) => {
    const cardWords = Array.from(card.querySelectorAll<HTMLElement>('.about-history-word'));
    const cardImage = card.querySelector<HTMLElement>('[data-anim="card-image"]');
    const cardBody = card.querySelector<HTMLElement>('[data-anim="card-body"]');

    const tweens: gsap.core.Tween[] = [];

    if (cardBody) {
      tweens.push(
        gsap.to(cardBody, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          overwrite: true,
          scrollTrigger: {
            trigger: cardBody,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }),
      );
    }

    if (cardWords.length) {
      tweens.push(
        gsap.to(cardWords, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.2,
          stagger: 0.01,
          ease: 'power2.out',
          overwrite: true,
          scrollTrigger: {
            trigger: cardBody ?? card,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }),
      );
    }

    if (cardImage) {
      tweens.push(
        gsap.to(cardImage, {
          scale: 1,
          opacity: 1,
          yPercent: 0,
          filter: 'saturate(1)',
          duration: 0.8,
          ease: 'power2.out',
          overwrite: true,
          scrollTrigger: {
            trigger: cardImage,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }),
      );
    }

    return tweens;
  });

  return () => {
    titleTween?.scrollTrigger?.kill();
    titleTween?.kill();
    cardTweens.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
    clearHistorySectionStyles(root);
  };
}

export const initHistorySectionAnimation = createScrollSectionController({
  rootId: 'about-history',
  triggerIds: [ST_DESKTOP_ID, ST_MOBILE_TITLE_ID],
  clearStyles: clearHistorySectionStyles,
  setup: ({ root, mm }) => {
    mm.add('(max-width: 1199px)', () => setupMobileHistoryPerCardReveal(root));
    mm.add('(min-width: 1200px)', () => setupDesktopHistoryReveal(root));
  },
});
