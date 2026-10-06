import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const T_CARDS = 0.23;

function clearHistorySectionStyles(root: HTMLElement) {
  const scrollNodes = root.querySelectorAll(
    '[data-anim="card"], [data-anim="card-image"], [data-anim="card-media"]',
  );
  scrollNodes.forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(scrollNodes));
}

function setupDesktopHistoryReveal(root: HTMLElement) {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card"]'));
  const images = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card-image"]'));

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

  let cardsIn = false;

  /** Desktop conserva la orquestación de cards e imágenes. */
  const handleThresholds = (p: number, immediate = false) => {
    const d = immediate ? 0 : 0.56;

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
    trigger: root,
    start: 'top 78%',
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

  cards.forEach((card) => {
    const cardImage = card.querySelector<HTMLElement>('[data-anim="card-image"]');

    if (cardImage) {
      gsap.set(cardImage, {
        scale: 1.2,
        opacity: 0,
        filter: 'saturate(0.9)',
      });
    }
  });

  /** Mobile/tablet: tween individual por imagen. */
  const cardTweens = cards.flatMap((card) => {
    const cardImage = card.querySelector<HTMLElement>('[data-anim="card-image"]');
    const tweens: gsap.core.Tween[] = [];

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
    cardTweens.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });

    clearHistorySectionStyles(root);
  };
}

export const initHistorySectionAnimation = createScrollSectionController({
  rootId: 'about-history',
  setup: ({ root, mm }) => {
    mm.add('(max-width: 1199px)', () => setupMobileHistoryPerCardReveal(root));
    mm.add('(min-width: 1200px)', () => setupDesktopHistoryReveal(root));
  },
});
