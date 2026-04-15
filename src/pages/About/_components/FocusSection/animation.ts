import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars, splitWords } from '../../../../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'about-focus-reveal';
const T_CONTENT = 0.14;
const T_DESCRIPTION = 0.26;
const T_CARDS = 0.46;

/** Construye targets de título/descripcion para stagger por char/word. */
function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-focus-text-line], [data-focus-text-words]');
  const title = root.querySelector<HTMLElement>('[data-focus-text-line]');
  const words = Array.from(root.querySelectorAll<HTMLElement>('[data-focus-text-words]'));
  return {
    titleChars: title ? splitChars(title, 'about-focus-title-char') : [],
    bodyWords: words.flatMap((line) => splitWords(line, 'about-focus-word')),
  };
}

function clearFocusSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-focus-text-line], [data-focus-text-words]');
}

export const initFocusSectionAnimation = createScrollSectionController({
  rootId: 'about-focus',
  triggerIds: [ST_ID],
  clearStyles: clearFocusSectionStyles,
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const label = root.querySelector<HTMLElement>('[data-anim="label"]');
      const leftImage = root.querySelector<HTMLElement>('[data-anim="side-image-left"]');
      const rightImage = root.querySelector<HTMLElement>('[data-anim="side-image-right"]');
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card"]'));
      const cardIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card-icon"]'));
      const { titleChars, bodyWords } = buildTextNodes(root);

      if (label) gsap.set(label, { opacity: 0, y: 20 });
      if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 42 });
      if (bodyWords.length) gsap.set(bodyWords, { opacity: 0.15, y: 12, filter: 'blur(2px)' });
      if (leftImage) gsap.set(leftImage, { scale: 1.1, yPercent: 10, opacity: 0.3 });
      if (rightImage) gsap.set(rightImage, { scale: 1.1, yPercent: -10, opacity: 0.3 });
      if (cards.length) {
        gsap.set(cards, {
          opacity: 0,
          y: 50,
          rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
          scale: 0.95,
        });
      }
      if (cardIcons.length) gsap.set(cardIcons, { scale: 0.85, rotate: -8 });

      let contentIn = false;
      let descriptionIn = false;
      let cardsIn = false;

      /** Secuencia por umbrales: contenido inicial -> texto -> cards -> parallax lateral. */
      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.56;

        if (p >= T_CONTENT && !contentIn) {
          if (label) gsap.to(label, { opacity: 1, y: 0, duration: d, ease: 'power2.out' });
          if (titleChars.length) {
            gsap.to(titleChars, {
              opacity: 1,
              yPercent: 0,
              duration: d,
              stagger: immediate ? 0 : 0.014,
              ease: 'power2.out',
            });
          }
          contentIn = true;
        } else if (p < T_CONTENT && contentIn) {
          if (label) gsap.to(label, { opacity: 0, y: 20, duration: d, ease: 'power2.in' });
          if (titleChars.length) {
            gsap.to(titleChars, {
              opacity: 0,
              yPercent: 42,
              duration: d,
              stagger: immediate ? 0 : -0.01,
              ease: 'power2.in',
            });
          }
          contentIn = false;
        }

        if (bodyWords.length) {
          if (p >= T_DESCRIPTION && !descriptionIn) {
            gsap.to(bodyWords, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.44,
              stagger: immediate ? 0 : 0.004,
              ease: 'power2.out',
            });
            descriptionIn = true;
          } else if (p < T_DESCRIPTION && descriptionIn) {
            gsap.to(bodyWords, {
              opacity: 0.15,
              y: 12,
              filter: 'blur(2px)',
              duration: 0.2,
              stagger: immediate ? 0 : -0.003,
              ease: 'power2.in',
            });
            descriptionIn = false;
          }
        }

        if (cards.length) {
          if (p >= T_CARDS && !cardsIn) {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              scale: 1,
              duration: d,
              stagger: immediate ? 0 : 0.08,
              ease: 'power3.out',
            });
            gsap.to(cardIcons, {
              scale: 1,
              rotate: 0,
              duration: d,
              stagger: immediate ? 0 : 0.06,
              ease: 'back.out(1.4)',
            });
            cardsIn = true;
          } else if (p < T_CARDS && cardsIn) {
            gsap.to(cards, {
              opacity: 0,
              y: 50,
              rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
              scale: 0.95,
              duration: d,
              stagger: immediate ? 0 : -0.07,
              ease: 'power2.in',
            });
            gsap.to(cardIcons, {
              scale: 0.85,
              rotate: -8,
              duration: d,
              stagger: immediate ? 0 : -0.05,
              ease: 'power2.in',
            });
            cardsIn = false;
          }
        }

        if (leftImage) {
          gsap.to(leftImage, {
            opacity: 0.3 + p * 0.7,
            scale: 1.1 - p * 0.1,
            yPercent: 10 - p * 14,
            duration: immediate ? 0 : 0.35,
            overwrite: 'auto',
          });
        }

        if (rightImage) {
          gsap.to(rightImage, {
            opacity: 0.3 + p * 0.7,
            scale: 1.1 - p * 0.1,
            yPercent: -10 + p * 14,
            duration: immediate ? 0 : 0.35,
            overwrite: 'auto',
          });
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 66%',
        end: 'bottom 20%',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      return () => {
        st.kill();
        clearFocusSectionStyles(root);
      };
    });
  },
});
