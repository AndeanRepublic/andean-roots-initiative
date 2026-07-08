import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitWords } from '../../../../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'programs-catalog-reveal';
const CARD_REVEAL_STAGGER = 0.11;
const CARD_HIDE_STAGGER = 0.06;

function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-programs-card-text-words]');
  const descriptions = Array.from(
    root.querySelectorAll<HTMLElement>('[data-programs-card-text-words]'),
  );
  return descriptions.flatMap((el) => splitWords(el, 'programs-card-word'));
}

function clearProgramsCatalogStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-programs-card-text-words]');
}

function createBatchedCardRunner(
  cards: HTMLElement[],
  run: (card: HTMLElement, immediate: boolean) => void,
  stagger: number,
) {
  const pending = new Set<HTMLElement>();
  let rafId: number | null = null;

  const flush = () => {
    rafId = null;
    if (!pending.size) return;
    const batch = Array.from(pending).sort((a, b) => cards.indexOf(a) - cards.indexOf(b));
    pending.clear();
    const tl = gsap.timeline();
    batch.forEach((card, i) => {
      tl.add(() => run(card, false), i * stagger);
    });
  };

  const queue = (card: HTMLElement) => {
    pending.add(card);
    if (rafId == null) {
      rafId = requestAnimationFrame(flush);
    }
  };

  const cancel = () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    pending.clear();
  };

  return { queue, cancel };
}

export const initProgramsCatalogSectionAnimation = createScrollSectionController({
  rootId: 'programs-catalog',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="program-card"]'));
      const images = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="program-image"]'));
      const bodyWords = buildTextNodes(root);

      if (cards.length) {
        gsap.set(cards, {
          opacity: 0,
          y: 46,
          scale: 0.95,
          rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
        });
      }
      if (images.length) gsap.set(images, { scale: 1.08, yPercent: 8, filter: 'saturate(0.84)' });
      if (bodyWords.length) gsap.set(bodyWords, { opacity: 0.15, y: 12, filter: 'blur(2px)' });

      const revealCard = (card: HTMLElement, immediate = false) => {
        const d = immediate ? 0 : 0.48;
        const body = card.querySelector<HTMLElement>('[data-programs-card-text-words]');
        const words = body
          ? Array.from(body.querySelectorAll<HTMLElement>('.programs-card-word'))
          : [];
        const image = card.querySelector<HTMLElement>('[data-anim="program-image"]');

        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: d,
          ease: 'power3.out',
          overwrite: true,
        });
        if (image) {
          gsap.to(image, {
            scale: 1,
            yPercent: 0,
            filter: 'saturate(1)',
            duration: d,
            ease: 'power2.out',
            overwrite: true,
          });
        }
        if (words.length) {
          gsap.to(words, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: immediate ? 0 : 0.34,
            stagger: immediate ? 0 : 0.02,
            ease: 'power2.out',
            overwrite: true,
          });
        } else if (body) {
          gsap.to(body, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: immediate ? 0 : 0.34,
            ease: 'power2.out',
            overwrite: true,
          });
        }
      };

      const hideCard = (card: HTMLElement, immediate = false) => {
        const d = immediate ? 0 : 0.34;
        const body = card.querySelector<HTMLElement>('[data-programs-card-text-words]');
        const words = body
          ? Array.from(body.querySelectorAll<HTMLElement>('.programs-card-word'))
          : [];
        const image = card.querySelector<HTMLElement>('[data-anim="program-image"]');

        gsap.to(card, {
          opacity: 0,
          y: 46,
          scale: 0.95,
          rotateZ: -2,
          duration: d,
          ease: 'power2.in',
          overwrite: true,
        });
        if (image) {
          gsap.to(image, {
            scale: 1.08,
            yPercent: 8,
            filter: 'saturate(0.84)',
            duration: d,
            ease: 'power2.in',
            overwrite: true,
          });
        }
        if (words.length) {
          gsap.to(words, {
            opacity: 0.15,
            y: 12,
            filter: 'blur(2px)',
            duration: immediate ? 0 : 0.2,
            stagger: immediate ? 0 : -0.015,
            ease: 'power2.in',
            overwrite: true,
          });
        } else if (body) {
          gsap.to(body, {
            opacity: 0.15,
            y: 12,
            filter: 'blur(2px)',
            duration: immediate ? 0 : 0.2,
            ease: 'power2.in',
            overwrite: true,
          });
        }
      };

      const revealBatch = createBatchedCardRunner(cards, revealCard, CARD_REVEAL_STAGGER);
      const hideBatch = createBatchedCardRunner(cards, hideCard, CARD_HIDE_STAGGER);

      const triggers = cards.map((card) =>
        ScrollTrigger.create({
          id: ST_ID,
          trigger: card,
          start: 'top 76%',
          end: 'bottom 18%',
          onEnter: () => revealBatch.queue(card),
          onEnterBack: () => revealBatch.queue(card),
          onLeaveBack: () => hideBatch.queue(card),
        }),
      );

      return () => {
        revealBatch.cancel();
        hideBatch.cancel();
        triggers.forEach((trigger) => trigger.kill());

        clearProgramsCatalogStyles(root);
      };
    });
  },
});
