import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'challenge-section-cards-flip';
const ST_TEXT_ID = 'challenge-section-intro-text-reveal';

function buildIntroChars(root: HTMLElement) {
  const intro = root.querySelector<HTMLElement>('[data-challenge-intro-reveal]');
  if (!intro) return [];

  const segments = intro.querySelectorAll<HTMLElement>('[data-intro-segment]');
  segments.forEach((segment) => {
    const originalText = segment.dataset.originalText ?? segment.textContent ?? '';
    segment.dataset.originalText = originalText;
    segment.textContent = '';

    const fragment = document.createDocumentFragment();
    for (const char of originalText) {
      const letter = document.createElement('span');
      letter.className = 'challenge-intro-char';
      letter.textContent = char;
      fragment.appendChild(letter);
    }
    segment.appendChild(fragment);
  });

  return Array.from(intro.querySelectorAll<HTMLElement>('.challenge-intro-char'));
}

function setupIntroTextReveal(root: HTMLElement) {
  const chars = buildIntroChars(root);
  if (!chars.length) return () => {};

  gsap.set(chars, { opacity: 0.2 });

  const tween = gsap.to(chars, {
    opacity: 1,
    stagger: 0.02,
    ease: 'none',
    scrollTrigger: {
      id: ST_TEXT_ID,
      trigger: root,
      start: 'top 50%',
      end: 'top 15%',
      scrub: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    chars.forEach((char) => char.removeAttribute('style'));
  };
}

function clearVisionCardStyles(root: HTMLElement) {
  root
    .querySelectorAll(
      '.challenge-flip-stage .card, .challenge-flip-stage .card-container, .sticky-section',
    )
    .forEach((el) => {
      (el as HTMLElement).removeAttribute('style');
    });
  gsap.killTweensOf(
    gsap.utils.toArray(
      root.querySelectorAll(
        '.challenge-flip-stage .card, .challenge-flip-stage .card-container, .sticky-section',
      ),
    ),
  );
}

export const initChallengeSectionCards = createScrollSectionController({
  rootId: 'challenge',
  triggerIds: [ST_ID, ST_TEXT_ID],
  clearStyles: clearVisionCardStyles,
  setup: ({ root, mm }) => {
    mm.add('(max-width: 1199px)', () => {
      const clearTextAnimation = setupIntroTextReveal(root);
      clearVisionCardStyles(root);
      return () => {
        clearTextAnimation();
      };
    });

    mm.add('(min-width: 1200px)', () => {
      const clearTextAnimation = setupIntroTextReveal(root);
      const challengeSection = root;
      const cardContainer = root.querySelector<HTMLElement>(
        '.challenge-flip-stage .card-container',
      );
      const card1 = root.querySelector('#card-1');
      const card2 = root.querySelector('#card-2');
      const card3 = root.querySelector('#card-3');
      const cards = root.querySelectorAll<HTMLElement>('.challenge-flip-stage .card');

      let isGapAnimationCompleted = false;
      let isFlipAnimationCompleted = false;

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: challengeSection,
        start: 'top top',
        end: () => `+=${window.innerHeight * 4}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress <= 0.25) {
            const widthPercentage = gsap.utils.mapRange(0, 0.25, 75, 68, progress);
            gsap.set(cardContainer, { width: `${widthPercentage}%` });
          } else {
            gsap.set(cardContainer, { width: '68%' });
          }

          if (progress >= 0.35 && !isGapAnimationCompleted) {
            gsap.to(cardContainer, { gap: '20px', duration: 0.5, ease: 'power3.out' });
            gsap.to([card1, card2, card3], {
              borderRadius: '20px',
              duration: 0.5,
              ease: 'power3.out',
            });
            isGapAnimationCompleted = true;
          } else if (progress < 0.35 && isGapAnimationCompleted) {
            gsap.to(cardContainer, { gap: '0px', duration: 0.5, ease: 'power3.out' });
            gsap.to(card1, {
              borderRadius: '20px 0 0 20px',
              duration: 0.5,
              ease: 'power3.out',
            });
            gsap.to(card2, { borderRadius: '0px', duration: 0.5, ease: 'power3.out' });
            gsap.to(card3, {
              borderRadius: '0 20px 20px 0',
              duration: 0.5,
              ease: 'power3.out',
            });
            isGapAnimationCompleted = false;
          }

          if (progress >= 0.7 && !isFlipAnimationCompleted) {
            gsap.to(cards, {
              rotationY: 180,
              duration: 0.75,
              ease: 'power3.inOut',
              stagger: 0.1,
            });

            isFlipAnimationCompleted = true;
          } else if (progress < 0.7 && isFlipAnimationCompleted) {
            gsap.to(cards, {
              rotationY: 0,
              duration: 0.75,
              ease: 'power3.inOut',
              stagger: -0.1,
            });

            isFlipAnimationCompleted = false;
          }
        },
      });

      return () => {
        st.kill();
        isGapAnimationCompleted = false;
        isFlipAnimationCompleted = false;
        clearTextAnimation();
        clearVisionCardStyles(root);
      };
    });
  },
});
