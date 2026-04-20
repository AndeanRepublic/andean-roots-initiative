import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars, splitWords } from '../../../../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'strategic-programs-reveal';
const T_LABEL = 0.1;
const T_TITLE = 0.15;
const T_CTA = 0.18;

/** Genera nodos partidos para título y descripciones de cards. */
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
    const labelDesktop = root.querySelector<HTMLElement>('[data-anim="label-desktop"]');
    const labelMobile = root.querySelector<HTMLElement>('[data-anim="label-mobile"]');
    const cta = root.querySelector<HTMLElement>('[data-anim="cta"]');
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="program-card"]'));
    const images = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="program-image"]'));
    const metricRows = Array.from(
      root.querySelectorAll<HTMLElement>('[data-anim="program-metric-row"]'),
    );
    const { titleChars, bodyWords } = buildTextNodes(root);
    const labelTargets = [labelDesktop, labelMobile].filter(Boolean) as HTMLElement[];

    const setInitialState = () => {
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
    };

    const revealProgramCard = (card: HTMLElement, immediate = false) => {
      const d = immediate ? 0 : 0.48;
      const body = card.querySelector<HTMLElement>('[data-programs-text-words]');
      const bodyWordSpans = body
        ? Array.from(body.querySelectorAll<HTMLElement>('.programs-body-word'))
        : [];
      const rows = Array.from(
        card.querySelectorAll<HTMLElement>('[data-anim="program-metric-row"]'),
      );
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
      if (bodyWordSpans.length) {
        gsap.to(bodyWordSpans, {
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
      if (rows.length) {
        gsap.to(rows, {
          opacity: 1,
          x: 0,
          duration: immediate ? 0 : 0.35,
          stagger: immediate ? 0 : 0.04,
          ease: 'power2.out',
          overwrite: true,
        });
      }
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
    };

    const hideProgramCard = (card: HTMLElement, immediate = false) => {
      const d = immediate ? 0 : 0.34;
      const body = card.querySelector<HTMLElement>('[data-programs-text-words]');
      const bodyWordSpans = body
        ? Array.from(body.querySelectorAll<HTMLElement>('.programs-body-word'))
        : [];
      const rows = Array.from(
        card.querySelectorAll<HTMLElement>('[data-anim="program-metric-row"]'),
      );
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
      if (bodyWordSpans.length) {
        gsap.to(bodyWordSpans, {
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
      if (rows.length) {
        gsap.to(rows, {
          opacity: 0.2,
          x: -10,
          duration: immediate ? 0 : 0.2,
          stagger: immediate ? 0 : -0.03,
          ease: 'power2.in',
          overwrite: true,
        });
      }
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
    };

    /** Misma revelación por card en todos los breakpoints (scroll por elemento). */
    const createProgramCardScrollTriggers = () =>
      cards.map((card) =>
        ScrollTrigger.create({
          trigger: card,
          start: 'top 70%',
          end: 'bottom 20%',
          onEnter: () => revealProgramCard(card),
          onEnterBack: () => revealProgramCard(card),
          onLeaveBack: () => hideProgramCard(card),
        }),
      );

    mm.add('(min-width: 1200px)', () => {
      setInitialState();

      let labelIn = false;
      let titleIn = false;
      let ctaIn = false;

      /** Desktop: intro con scrub (label -> title -> cta); cards vía triggers como mobile. */
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
              overwrite: true,
            });
            labelIn = true;
          } else if (p < T_LABEL && labelIn) {
            gsap.to(labelTargets, {
              opacity: 0,
              y: 18,
              duration: d,
              stagger: immediate ? 0 : -0.03,
              ease: 'power2.in',
              overwrite: true,
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

        if (cta) {
          if (p >= T_CTA && !ctaIn) {
            gsap.to(cta, { opacity: 1, x: 0, duration: d, ease: 'power2.out', overwrite: true });
            ctaIn = true;
          } else if (p < T_CTA && ctaIn) {
            gsap.to(cta, { opacity: 0, x: 20, duration: d, ease: 'power2.in', overwrite: true });
            ctaIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 80%',
        end: 'bottom 18%',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);
      const cardTriggers = createProgramCardScrollTriggers();

      return () => {
        st.kill();
        cardTriggers.forEach((trigger) => trigger.kill());
        clearStrategicProgramsStyles(root);
      };
    });

    mm.add('(max-width: 1199px)', () => {
      setInitialState();

      const sectionTrigger = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 78%',
        end: 'bottom top',
        onEnter: () => {
          if (labelTargets.length) {
            gsap.to(labelTargets, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.03,
              ease: 'power2.out',
              overwrite: true,
            });
          }
          if (titleChars.length) {
            gsap.to(titleChars, {
              opacity: 1,
              yPercent: 0,
              duration: 0.45,
              stagger: 0.01,
              ease: 'power2.out',
              overwrite: true,
            });
          }
          if (cta) gsap.to(cta, { opacity: 1, x: 0, duration: 0.42, ease: 'power2.out', overwrite: true });
        },
        onEnterBack: () => {
          if (labelTargets.length) {
            gsap.to(labelTargets, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.02,
              ease: 'power2.out',
              overwrite: true,
            });
          }
          if (titleChars.length) {
            gsap.to(titleChars, {
              opacity: 1,
              yPercent: 0,
              duration: 0.35,
              stagger: 0.008,
              ease: 'power2.out',
              overwrite: true,
            });
          }
          if (cta) gsap.to(cta, { opacity: 1, x: 0, duration: 0.32, ease: 'power2.out', overwrite: true });
        },
        onLeaveBack: () => {
          if (labelTargets.length) {
            gsap.to(labelTargets, { opacity: 0, y: 18, duration: 0.28, ease: 'power2.in', overwrite: true });
          }
          if (titleChars.length) {
            gsap.to(titleChars, {
              opacity: 0,
              yPercent: 42,
              duration: 0.28,
              stagger: -0.006,
              ease: 'power2.in',
              overwrite: true,
            });
          }
          if (cta) gsap.to(cta, { opacity: 0, x: 20, duration: 0.25, ease: 'power2.in', overwrite: true });
        },
      });

      const cardTriggers = createProgramCardScrollTriggers();

      return () => {
        sectionTrigger.kill();
        cardTriggers.forEach((trigger) => trigger.kill());
        clearStrategicProgramsStyles(root);
      };
    });
  },
});
