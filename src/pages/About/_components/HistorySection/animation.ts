import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars, splitWords } from '../../../../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'about-history-reveal';
const T_TITLE = 0.14;
const T_CARDS = 0.33;
const T_BODY = 0.44;

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

export const initHistorySectionAnimation = createScrollSectionController({
  rootId: 'about-history',
  triggerIds: [ST_ID],
  clearStyles: clearHistorySectionStyles,
  setup: ({ root, mm }) => {
    mm.add('all', () => {
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
          scale: 1.08,
          yPercent: 6,
          filter: 'saturate(0.86)',
        });
      }

      let titleIn = false;
      let cardsIn = false;
      let bodyIn = false;

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
            });
            titleIn = true;
          } else if (p < T_TITLE && titleIn) {
            gsap.to(titleChars, {
              opacity: 0,
              yPercent: 42,
              duration: d,
              stagger: immediate ? 0 : -0.01,
              ease: 'power2.in',
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
              stagger: immediate ? 0 : 0.11,
              ease: 'power3.out',
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
              duration: 0.45,
              stagger: immediate ? 0 : 0.004,
              ease: 'power2.out',
            });
            bodyIn = true;
          } else if (p < T_BODY && bodyIn) {
            gsap.to(paragraphWords, {
              opacity: 0.1,
              y: 14,
              filter: 'blur(2px)',
              duration: 0.2,
              stagger: immediate ? 0 : -0.003,
              ease: 'power2.in',
            });
            bodyIn = false;
          }
        }

        if (images.length) {
          gsap.to(images, {
            scale: 1.08 - p * 0.08,
            yPercent: 6 - p * 6,
            duration: immediate ? 0 : 0.35,
            overwrite: 'auto',
          });
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
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
    });
  },
});
