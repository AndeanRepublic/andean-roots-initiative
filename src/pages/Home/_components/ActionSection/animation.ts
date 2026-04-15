import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars, splitWords } from '../../../../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'action-section-reveal';

/** Umbrales de progreso del ScrollTrigger (0–1): al cruzarlos se disparan tweens, no un mapeo continuo. */
const T_LABEL = 0.06;
const T_TITLE = 0.18;
const T_SUB = 0.32;
const T_PROGRAMS = 0.48;

/** Prepara los nodos de texto partidos para stagger y devuelve referencias animables. */
function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-action-text-line], [data-action-text-words]');

  const titleLines = Array.from(root.querySelectorAll<HTMLElement>('[data-action-text-line]'));
  const subheading = root.querySelector<HTMLElement>('[data-action-text-words]');

  const titleChars = titleLines.flatMap((line) => splitChars(line, 'action-title-char'));
  const subheadingWords = subheading ? splitWords(subheading, 'action-subheading-word') : [];

  return { titleChars, subheadingWords };
}

function clearActionSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-action-text-line], [data-action-text-words]');
}

export const initActionSectionAnimation = createScrollSectionController({
  rootId: 'actions',
  triggerIds: [ST_ID],
  clearStyles: clearActionSectionStyles,
  setup: ({ root, mm }) => {
    const label = root.querySelector<HTMLElement>('[data-anim="label"]');
    const title = root.querySelector<HTMLElement>('[data-anim="title"]');
    const subheading = root.querySelector<HTMLElement>('[data-anim="subheading"]');
    const programs = root.querySelector<HTMLElement>('[data-anim="programs"]');
    const programCards = programs
      ? Array.from(programs.querySelectorAll<HTMLElement>('[data-anim="program-card"]'))
      : [];
    const { titleChars, subheadingWords } = buildTextNodes(root);
    const titleTargets =
      titleChars.length > 0 ? titleChars : title ? Array.from(title.children) : [];

    /** Estado visual base para que cada reinicio del controller sea determinista. */
    const setInitialState = () => {
      if (label) gsap.set(label, { opacity: 0, y: 20, rotateZ: -2 });
      if (titleTargets.length) gsap.set(titleTargets, { opacity: 0, yPercent: 45 });
      if (subheadingWords.length > 0) {
        gsap.set(subheadingWords, { opacity: 0.15, y: 18, filter: 'blur(2px)' });
      } else if (subheading) {
        gsap.set(subheading, { opacity: 0.15, y: 18, filter: 'blur(2px)' });
      }
      if (programCards.length) {
        gsap.set(programCards, { opacity: 0, y: 36, scale: 0.94, rotateZ: -2 });
      }
    };

    /** Reveal global usado por desktop cuando el timeline cruza el umbral de programas. */
    const revealPrograms = (immediate: boolean) => {
      if (!programCards.length) return;
      gsap.to(programCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateZ: 0,
        duration: immediate ? 0 : 0.55,
        stagger: immediate ? 0 : 0.1,
        ease: 'power2.out',
      });
    };

    /** Estado de salida global para desktop al retroceder el scroll por debajo del umbral. */
    const hidePrograms = (immediate: boolean) => {
      if (!programCards.length) return;
      gsap.to(programCards, {
        opacity: 0,
        y: 36,
        scale: 0.94,
        rotateZ: -2,
        duration: immediate ? 0 : 0.55,
        stagger: immediate ? 0 : -0.08,
        ease: 'power2.in',
      });
    };

    /**
     * Trigger principal de sección:
     * - siempre controla label/title/subheading
     * - opcionalmente controla programs (desktop)
     */
    const createSectionThresholdTrigger = (includeProgramThreshold: boolean) => {
      let labelIn = false;
      let titleIn = false;
      let subIn = false;
      let programsIn = false;

      const tweenDur = (immediate: boolean) => (immediate ? 0 : 0.55);

      const handleThresholds = (p: number, immediate = false) => {
        const d = tweenDur(immediate);

        if (label) {
          if (p >= T_LABEL && !labelIn) {
            gsap.to(label, { opacity: 1, y: 0, rotateZ: 0, duration: d, ease: 'power2.out' });
            labelIn = true;
          } else if (p < T_LABEL && labelIn) {
            gsap.to(label, {
              opacity: 0,
              y: 20,
              rotateZ: -2,
              duration: d,
              ease: 'power2.in',
            });
            labelIn = false;
          }
        }

        if (titleTargets.length) {
          if (p >= T_TITLE && !titleIn) {
            gsap.to(titleTargets, {
              opacity: 1,
              yPercent: 0,
              duration: d,
              stagger: immediate ? 0 : 0.015,
              ease: 'power2.out',
            });
            titleIn = true;
          } else if (p < T_TITLE && titleIn) {
            gsap.to(titleTargets, {
              opacity: 0,
              yPercent: 45,
              duration: d,
              stagger: immediate ? 0 : -0.012,
              ease: 'power2.in',
            });
            titleIn = false;
          }
        }

        if (subheadingWords.length > 0) {
          if (p >= T_SUB && !subIn) {
            gsap.to(subheadingWords, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.5,
              stagger: immediate ? 0 : 0.02,
              ease: 'power2.out',
            });
            subIn = true;
          } else if (p < T_SUB && subIn) {
            gsap.to(subheadingWords, {
              opacity: 0.15,
              y: 18,
              filter: 'blur(2px)',
              duration: 0.1,
              stagger: immediate ? 0 : -0.015,
              ease: 'power2.in',
            });
            subIn = false;
          }
        } else if (subheading) {
          if (p >= T_SUB && !subIn) {
            gsap.to(subheading, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: d,
              ease: 'power2.out',
            });
            subIn = true;
          } else if (p < T_SUB && subIn) {
            gsap.to(subheading, {
              opacity: 0.15,
              y: 18,
              filter: 'blur(2px)',
              duration: d,
              ease: 'power2.in',
            });
            subIn = false;
          }
        }

        if (includeProgramThreshold && programCards.length) {
          if (p >= T_PROGRAMS && !programsIn) {
            revealPrograms(immediate);
            programsIn = true;
          } else if (p < T_PROGRAMS && programsIn) {
            hidePrograms(immediate);
            programsIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 40%',
        end: 'top top',
        onUpdate: (self) => {
          handleThresholds(self.progress, false);
        },
      });

      handleThresholds(st.progress, false);
      return st;
    };

    /**
     * En mobile/tablet cada card se revela con su propio trigger de viewport.
     * Evita que todas entren juntas en listas largas.
     */
    const createProgramCardTriggers = () => {
      return programCards.map((card) =>
        ScrollTrigger.create({
          trigger: card,
          start: 'top 60%',
          end: 'bottom 15%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: 0.45,
              ease: 'power2.out',
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: 0.45,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              y: 36,
              scale: 0.94,
              rotateZ: -2,
              duration: 0.35,
              ease: 'power2.in',
            });
          },
        }),
      );
    };

    mm.add('(min-width: 1200px)', () => {
      setInitialState();
      const sectionTrigger = createSectionThresholdTrigger(true);

      return () => {
        sectionTrigger.kill();
        clearActionSectionStyles(root);
      };
    });

    mm.add('(max-width: 1199px)', () => {
      setInitialState();
      const sectionTrigger = createSectionThresholdTrigger(false);
      const cardTriggers = createProgramCardTriggers();

      return () => {
        sectionTrigger.kill();
        cardTriggers.forEach((trigger) => trigger.kill());
        clearActionSectionStyles(root);
      };
    });
  },
});
