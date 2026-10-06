import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_CARD_SELECTOR = '[data-anim="mobile-card"]';
const INTRO_TITLE_SELECTOR = '[data-anim="intro-title"]';
const DESKTOP_CARD_CONTAINER_SELECTOR = '.challenge-flip-stage .card-container';
const CENTERED_TITLE_CARD_GAP_REM = 1.5;

/** Divide el intro en caracteres preservando segmentos para animación progresiva por scroll. */
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
    overwrite: true,
    scrollTrigger: {
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

/** Groups inline character spans by their rendered row, from top to bottom. */
function groupCharsByVisualLine(chars: HTMLElement[]) {
  const lines = new Map<number, HTMLElement[]>();

  chars.forEach((char) => {
    const top = Math.round(char.getBoundingClientRect().top);
    const line = lines.get(top) ?? [];
    line.push(char);
    lines.set(top, line);
  });

  return Array.from(lines.entries())
    .sort(([topA], [topB]) => topA - topB)
    .map(([, line]) => line);
}

/** Returns absolute GSAP y values that center the title + unsplit card image as one group. */
function getCenteredIntroOffsets(
  root: HTMLElement,
  title: HTMLElement,
  cardContainer: HTMLElement,
) {
  const rootTop = root.getBoundingClientRect().top;
  const titleY = Number.parseFloat(String(gsap.getProperty(title, 'y'))) || 0;
  const cardY = Number.parseFloat(String(gsap.getProperty(cardContainer, 'y'))) || 0;
  const stage = cardContainer.parentElement;
  const stageShift = stage ? Number.parseFloat(String(gsap.getProperty(stage, 'marginTop'))) || 0 : 0;
  const titleRect = title.getBoundingClientRect();
  const cardRect = cardContainer.getBoundingClientRect();
  const naturalTitleTop = titleRect.top - rootTop - titleY;
  const naturalCardTop = cardRect.top - rootTop - cardY - stageShift;
  const gap = CENTERED_TITLE_CARD_GAP_REM * 16;
  const groupHeight = titleRect.height + gap + cardRect.height;
  const targetTitleTop = Math.max(0, (window.innerHeight - groupHeight) / 2);
  const targetCardTop = targetTitleTop + titleRect.height + gap;

  return {
    titleY: targetTitleTop - naturalTitleTop,
    cardY: targetCardTop - naturalCardTop,
  };
}

function clearVisionCardStyles(root: HTMLElement) {
  const animatedSelectors = [
    '.challenge-flip-stage',
    '.challenge-flip-stage .card',
    DESKTOP_CARD_CONTAINER_SELECTOR,
    INTRO_TITLE_SELECTOR,
    MOBILE_CARD_SELECTOR,
    '.sticky-section',
  ];

  root.querySelectorAll(animatedSelectors.join(', ')).forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll(animatedSelectors.join(', '))));
}

export const initChallengeSectionCards = createScrollSectionController({
  rootId: 'challenge',
  setup: ({ root, mm }) => {
    mm.add('(max-width: 1199px)', () => {
      const clearTextAnimation = setupIntroTextReveal(root);
      const mobileCards = Array.from(root.querySelectorAll<HTMLElement>(MOBILE_CARD_SELECTOR));

      if (mobileCards.length) {
        gsap.set(mobileCards, {
          opacity: 0,
          y: 34,
          scale: 0.96,
          rotateZ: (index: number) => (index % 2 === 0 ? -1.4 : 1.4),
        });
      }

      /** En mobile/tablet cada card entra al llegar al viewport para mantener lectura progresiva. */
      const cardTriggers = mobileCards.map((card, index) => {
        const initialRotate = index % 2 === 0 ? -1.4 : 1.4;

        return ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 20%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: 0.5,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              y: 34,
              scale: 0.96,
              rotateZ: initialRotate,
              duration: 0.3,
              ease: 'power2.in',
              overwrite: 'auto',
            });
          },
        });
      });

      return () => {
        cardTriggers.forEach((trigger) => trigger.kill());
        clearTextAnimation();

        clearVisionCardStyles(root);
      };
    });

    mm.add('(min-width: 1200px)', () => {
      const clearTextAnimation = setupIntroTextReveal(root);
      const title = root.querySelector<HTMLElement>(INTRO_TITLE_SELECTOR);
      const introChars = Array.from(root.querySelectorAll<HTMLElement>('.challenge-intro-char'));
      const introLines = groupCharsByVisualLine(introChars);
      const cardContainer = root.querySelector<HTMLElement>(DESKTOP_CARD_CONTAINER_SELECTOR);
      const stage = cardContainer?.parentElement ?? null;
      const cards = Array.from(root.querySelectorAll<HTMLElement>('.challenge-flip-stage .card'));

      if (!title || !cardContainer || !stage || !cards.length) {
        return clearTextAnimation;
      }

      const hold = { progress: 0 };
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${window.innerHeight * 4.5}px`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Once the reading reveal is complete, remove the copy in reading order
       * while the title and still-joined image settle as one centered lockup.
       */
      timeline.addLabel('compose');
      introLines.forEach((line, index) => {
        timeline.to(
          line,
          { opacity: 0, duration: 0.3, ease: 'power1.in' },
          `compose+=${index * 0.16}`,
        );
      });
      timeline.to(
        title,
        {
          y: () => getCenteredIntroOffsets(root, title, cardContainer).titleY,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        'compose',
      );
      const centeredShift = () =>
        Math.min(0, getCenteredIntroOffsets(root, title, cardContainer).cardY);
      // Move the stage in layout, not with translate, so the box rises with the cards.
      timeline.to(
        stage,
        {
          marginTop: centeredShift,
          duration: 1.1,
          ease: 'power2.inOut',
        },
        'compose',
      );
      const spacer = timeline.scrollTrigger?.spacer;
      if (spacer) {
        let phase: 'tall' | 'short' = 'tall';
        // Pins below were measured against the tall spacer. Remeasure when the shrink finishes,
        // while this section is still pinned, so the program cards don't overshoot and snap.
        const realignPinsBelow = () => {
          ScrollTrigger.getAll().forEach((trigger) => {
            const node = trigger.trigger;
            if (!(node instanceof Element) || node === root || root.contains(node)) return;
            if (trigger.animation) return;
            trigger.refresh();
          });
        };

        timeline.to(
          spacer,
          {
            height: () => spacer.offsetHeight + centeredShift(),
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate(this: gsap.core.Tween) {
              const progress = this.progress();
              if (phase !== 'short' && progress > 0.98) {
                phase = 'short';
                requestAnimationFrame(realignPinsBelow);
              } else if (phase !== 'tall' && progress < 0.02) {
                phase = 'tall';
                requestAnimationFrame(realignPinsBelow);
              }
            },
          },
          'compose',
        );
      }

      // Briefly hold the centered composition before the image starts separating.
      timeline.to(hold, { progress: 1, duration: 0.35, ease: 'none' });
      timeline.addLabel('split');
      timeline.to(cardContainer, { width: '68%', duration: 0.8, ease: 'power2.inOut' });
      timeline.addLabel('separate');
      timeline.to(
        cardContainer,
        { gap: '1.25rem', duration: 0.55, ease: 'power3.out' },
        'separate',
      );
      timeline.to(
        cards,
        { borderRadius: '1.25rem', duration: 0.55, ease: 'power3.out' },
        'separate',
      );
      timeline.addLabel('flip');
      timeline.to(cards, {
        rotationY: 180,
        duration: 0.9,
        ease: 'power3.inOut',
        stagger: 0.1,
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        clearTextAnimation();

        clearVisionCardStyles(root);
      };
    });
  },
});
