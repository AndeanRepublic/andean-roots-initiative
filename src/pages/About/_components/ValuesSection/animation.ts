import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { setupValuesCardHover } from './card-hover';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'about-values-reveal';
const T_HEADER = 0.1;
const T_DESCRIPTION = 0.24;
const T_CARDS = 0.44;

function resetSplitText(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-values-text-line], [data-values-text-words]').forEach((el) => {
    const originalText = el.dataset.originalText;
    if (originalText !== undefined) {
      el.textContent = originalText;
    }
  });
}

function splitChars(element: HTMLElement, className: string) {
  const text = element.textContent ?? '';
  element.dataset.originalText = text;
  element.textContent = '';
  const fragment = document.createDocumentFragment();
  const nodes: HTMLElement[] = [];

  for (const char of text) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = char;
    fragment.appendChild(span);
    nodes.push(span);
  }

  element.appendChild(fragment);
  return nodes;
}

function splitWords(element: HTMLElement, className: string) {
  const text = element.textContent ?? '';
  element.dataset.originalText = text;
  element.textContent = '';
  const fragment = document.createDocumentFragment();
  const nodes: HTMLElement[] = [];
  const parts = text.match(/\S+\s*/g) ?? [];

  parts.forEach((part) => {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = part;
    fragment.appendChild(span);
    nodes.push(span);
  });

  element.appendChild(fragment);
  return nodes;
}

function buildTextNodes(root: HTMLElement) {
  resetSplitText(root);
  const title = root.querySelector<HTMLElement>('[data-values-text-line]');
  const descriptions = Array.from(root.querySelectorAll<HTMLElement>('[data-values-text-words]'));
  return {
    titleChars: title ? splitChars(title, 'about-values-title-char') : [],
    descriptionWords: descriptions.flatMap((line) => splitWords(line, 'about-values-word')),
  };
}

function clearValuesSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root);
}

export const initValuesSectionAnimation = createScrollSectionController({
  rootId: 'about-values',
  triggerIds: [ST_ID],
  clearStyles: clearValuesSectionStyles,
  setup: ({ root, mm }) => {
    mm.add('all', () => {
      const label = root.querySelector<HTMLElement>('[data-anim="label"]');
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card"]'));
      const { titleChars, descriptionWords } = buildTextNodes(root);

      if (label) gsap.set(label, { opacity: 0, y: 18 });
      if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 42 });
      if (descriptionWords.length) gsap.set(descriptionWords, { opacity: 0.18, y: 16, filter: 'blur(2px)' });
      if (cards.length) {
        gsap.set(cards, {
          opacity: 0,
          y: 48,
          rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
          scale: 0.95,
        });
      }

      let headerIn = false;
      let descriptionIn = false;
      let cardsIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.55;

        if (p >= T_HEADER && !headerIn) {
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
          headerIn = true;
        } else if (p < T_HEADER && headerIn) {
          if (label) gsap.to(label, { opacity: 0, y: 18, duration: d, ease: 'power2.in' });
          if (titleChars.length) {
            gsap.to(titleChars, {
              opacity: 0,
              yPercent: 42,
              duration: d,
              stagger: immediate ? 0 : -0.01,
              ease: 'power2.in',
            });
          }
          headerIn = false;
        }

        if (descriptionWords.length) {
          if (p >= T_DESCRIPTION && !descriptionIn) {
            gsap.to(descriptionWords, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.45,
              stagger: immediate ? 0 : 0.004,
              ease: 'power2.out',
            });
            descriptionIn = true;
          } else if (p < T_DESCRIPTION && descriptionIn) {
            gsap.to(descriptionWords, {
              opacity: 0.18,
              y: 16,
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
              stagger: immediate ? 0 : 0.1,
              ease: 'power3.out',
            });
            cardsIn = true;
          } else if (p < T_CARDS && cardsIn) {
            gsap.to(cards, {
              opacity: 0,
              y: 48,
              rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
              scale: 0.95,
              duration: d,
              stagger: immediate ? 0 : -0.08,
              ease: 'power2.in',
            });
            cardsIn = false;
          }
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

      const cleanupCardHover = setupValuesCardHover(root);

      return () => {
        st.kill();
        cleanupCardHover();
        clearValuesSectionStyles(root);
      };
    });
  },
});
