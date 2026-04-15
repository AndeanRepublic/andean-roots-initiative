import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { setupTeamControlsHover } from './controls-hover';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'about-team-reveal';
const T_INTRO = 0.1;
const T_CARDS = 0.34;
const T_CONTROLS = 0.6;

function resetSplitText(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-team-text-words]').forEach((el) => {
    const originalText = el.dataset.originalText;
    if (originalText !== undefined) {
      el.textContent = originalText;
    }
  });
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
  const description = root.querySelector<HTMLElement>('[data-team-text-words]');
  return description ? splitWords(description, 'about-team-word') : [];
}

function clearTeamSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root);
}

export const initTeamSectionAnimation = createScrollSectionController({
  rootId: 'about-team',
  triggerIds: [ST_ID],
  clearStyles: clearTeamSectionStyles,
  setup: ({ root, mm }) => {
    mm.add('all', () => {
      const label = root.querySelector<HTMLElement>('[data-anim="label"]');
      const bgWord = root.querySelector<HTMLElement>('[data-anim="bg-word"]');
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="member-card"]'));
      const images = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="member-image"]'));
      const captions = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="member-caption"]'));
      const controls = root.querySelector<HTMLElement>('[data-anim="controls"]');
      const counter = root.querySelector<HTMLElement>('[data-anim="counter"]');
      const controlButtons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="control-button"]'));
      const descriptionWords = buildTextNodes(root);

      if (label) gsap.set(label, { opacity: 0, x: -20 });
      if (descriptionWords.length) gsap.set(descriptionWords, { opacity: 0.15, y: 12, filter: 'blur(2px)' });
      if (bgWord) gsap.set(bgWord, { opacity: 0, xPercent: 12, scale: 1.08 });
      if (cards.length) gsap.set(cards, { opacity: 0, y: 46, rotateZ: (i: number) => (i % 2 === 0 ? -2 : 2) });
      if (images.length) gsap.set(images, { scale: 1.08, filter: 'saturate(0.82)' });
      if (captions.length) gsap.set(captions, { opacity: 0, y: 16 });
      if (controls) gsap.set(controls, { opacity: 0, y: 18 });
      if (counter) gsap.set(counter, { opacity: 0.2 });
      if (controlButtons.length) gsap.set(controlButtons, { scale: 0.92 });

      let introIn = false;
      let cardsIn = false;
      let controlsIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.56;

        if (p >= T_INTRO && !introIn) {
          if (label) gsap.to(label, { opacity: 1, x: 0, duration: d, ease: 'power2.out' });
          if (descriptionWords.length) {
            gsap.to(descriptionWords, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.44,
              stagger: immediate ? 0 : 0.008,
              ease: 'power2.out',
            });
          }
          if (bgWord) {
            gsap.to(bgWord, {
              opacity: 1,
              xPercent: 0,
              scale: 1,
              duration: d,
              ease: 'power2.out',
            });
          }
          introIn = true;
        } else if (p < T_INTRO && introIn) {
          if (label) gsap.to(label, { opacity: 0, x: -20, duration: d, ease: 'power2.in' });
          if (descriptionWords.length) {
            gsap.to(descriptionWords, {
              opacity: 0.15,
              y: 12,
              filter: 'blur(2px)',
              duration: 0.2,
              stagger: immediate ? 0 : -0.006,
              ease: 'power2.in',
            });
          }
          if (bgWord) {
            gsap.to(bgWord, {
              opacity: 0,
              xPercent: 12,
              scale: 1.08,
              duration: d,
              ease: 'power2.in',
            });
          }
          introIn = false;
        }

        if (p >= T_CARDS && !cardsIn) {
          if (cards.length) {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              duration: d,
              stagger: immediate ? 0 : 0.09,
              ease: 'power3.out',
            });
          }
          if (captions.length) {
            gsap.to(captions, {
              opacity: 1,
              y: 0,
              duration: d,
              stagger: immediate ? 0 : 0.07,
              ease: 'power2.out',
            });
          }
          cardsIn = true;
        } else if (p < T_CARDS && cardsIn) {
          if (cards.length) {
            gsap.to(cards, {
              opacity: 0,
              y: 46,
              rotateZ: (i: number) => (i % 2 === 0 ? -2 : 2),
              duration: d,
              stagger: immediate ? 0 : -0.07,
              ease: 'power2.in',
            });
          }
          if (captions.length) {
            gsap.to(captions, {
              opacity: 0,
              y: 16,
              duration: d,
              stagger: immediate ? 0 : -0.05,
              ease: 'power2.in',
            });
          }
          cardsIn = false;
        }

        if (p >= T_CONTROLS && !controlsIn) {
          if (controls) gsap.to(controls, { opacity: 1, y: 0, duration: d, ease: 'power2.out' });
          if (counter) gsap.to(counter, { opacity: 1, duration: d, ease: 'power2.out' });
          if (controlButtons.length) {
            gsap.to(controlButtons, {
              scale: 1,
              duration: d,
              stagger: immediate ? 0 : 0.06,
              ease: 'back.out(1.4)',
            });
          }
          controlsIn = true;
        } else if (p < T_CONTROLS && controlsIn) {
          if (controls) gsap.to(controls, { opacity: 0, y: 18, duration: d, ease: 'power2.in' });
          if (counter) gsap.to(counter, { opacity: 0.2, duration: d, ease: 'power2.in' });
          if (controlButtons.length) {
            gsap.to(controlButtons, {
              scale: 0.92,
              duration: d,
              stagger: immediate ? 0 : -0.04,
              ease: 'power2.in',
            });
          }
          controlsIn = false;
        }

        if (images.length) {
          gsap.to(images, {
            scale: 1.08 - p * 0.08,
            filter: `saturate(${0.82 + p * 0.18})`,
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

      const cleanupControlsHover = setupTeamControlsHover(root);

      return () => {
        st.kill();
        cleanupControlsHover();
        clearTeamSectionStyles(root);
      };
    });
  },
});
