import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars, splitWords } from '../../../../utils/split-text';
import { setupProgramCardsHover } from './card-hover';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'strategic-programs-reveal';
const T_LABEL = 0.1;
const T_TITLE = 0.2;
const T_CTA = 0.34;
const T_CARDS = 0.46;

function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-programs-text-line], [data-programs-text-words]');
  const title = root.querySelector<HTMLElement>('[data-programs-text-line]');
  const descriptions = Array.from(root.querySelectorAll<HTMLElement>('[data-programs-text-words]'));
  return {
    titleChars: title ? splitChars(title, 'programs-title-char') : [],
    bodyWords: descriptions.flatMap((el) => splitWords(el, 'programs-body-word')),
  };
}

function clearStrategicProgramsStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-programs-text-line], [data-programs-text-words]');
}

export const initStrategicProgramsSectionAnimation = createScrollSectionController({
  rootId: 'programs',
  triggerIds: [ST_ID],
  clearStyles: clearStrategicProgramsStyles,
  setup: ({ root, mm }) => {
    mm.add('all', () => {
      const labelDesktop = root.querySelector<HTMLElement>('[data-anim="label-desktop"]');
      const labelMobile = root.querySelector<HTMLElement>('[data-anim="label-mobile"]');
      const cta = root.querySelector<HTMLElement>('[data-anim="cta"]');
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="program-card"]'));
      const images = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="program-image"]'));
      const metricRows = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="program-metric-row"]'));
      const { titleChars, bodyWords } = buildTextNodes(root);

      const labelTargets = [labelDesktop, labelMobile].filter(Boolean) as HTMLElement[];

      if (labelTargets.length) gsap.set(labelTargets, { opacity: 0, y: 18 });
      if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 42 });
      if (cta) gsap.set(cta, { opacity: 0, x: 20 });
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
      if (metricRows.length) gsap.set(metricRows, { opacity: 0.2, x: -10 });

      let labelIn = false;
      let titleIn = false;
      let ctaIn = false;
      let cardsIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.56;

        if (labelTargets.length) {
          if (p >= T_LABEL && !labelIn) {
            gsap.to(labelTargets, {
              opacity: 1,
              y: 0,
              duration: d,
              stagger: immediate ? 0 : 0.04,
              ease: 'power2.out',
            });
            labelIn = true;
          } else if (p < T_LABEL && labelIn) {
            gsap.to(labelTargets, {
              opacity: 0,
              y: 18,
              duration: d,
              stagger: immediate ? 0 : -0.03,
              ease: 'power2.in',
            });
            labelIn = false;
          }
        }

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

        if (cta) {
          if (p >= T_CTA && !ctaIn) {
            gsap.to(cta, { opacity: 1, x: 0, duration: d, ease: 'power2.out' });
            ctaIn = true;
          } else if (p < T_CTA && ctaIn) {
            gsap.to(cta, { opacity: 0, x: 20, duration: d, ease: 'power2.in' });
            ctaIn = false;
          }
        }

        if (cards.length) {
          if (p >= T_CARDS && !cardsIn) {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: d,
              stagger: immediate ? 0 : 0.09,
              ease: 'power3.out',
            });
            if (bodyWords.length) {
              gsap.to(bodyWords, {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.44,
                stagger: immediate ? 0 : 0.004,
                ease: 'power2.out',
              });
            }
            if (metricRows.length) {
              gsap.to(metricRows, {
                opacity: 1,
                x: 0,
                duration: 0.42,
                stagger: immediate ? 0 : 0.008,
                ease: 'power2.out',
              });
            }
            cardsIn = true;
          } else if (p < T_CARDS && cardsIn) {
            gsap.to(cards, {
              opacity: 0,
              y: 46,
              scale: 0.95,
              rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
              duration: d,
              stagger: immediate ? 0 : -0.07,
              ease: 'power2.in',
            });
            if (bodyWords.length) {
              gsap.to(bodyWords, {
                opacity: 0.15,
                y: 12,
                filter: 'blur(2px)',
                duration: 0.2,
                stagger: immediate ? 0 : -0.003,
                ease: 'power2.in',
              });
            }
            if (metricRows.length) {
              gsap.to(metricRows, {
                opacity: 0.2,
                x: -10,
                duration: 0.2,
                stagger: immediate ? 0 : -0.006,
                ease: 'power2.in',
              });
            }
            cardsIn = false;
          }
        }

        if (images.length) {
          gsap.to(images, {
            scale: 1.08 - p * 0.08,
            yPercent: 8 - p * 8,
            filter: `saturate(${0.84 + p * 0.16})`,
            duration: immediate ? 0 : 0.35,
            overwrite: 'auto',
          });
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 65%',
        end: 'bottom 18%',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      const cleanupCardsHover = setupProgramCardsHover(root);

      return () => {
        st.kill();
        cleanupCardsHover();
        clearStrategicProgramsStyles(root);
      };
    });
  },
});
