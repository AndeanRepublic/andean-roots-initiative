import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

/** Umbrales de progreso del ScrollTrigger (0–1): al cruzarlos se disparan tweens, no un mapeo continuo. */
const T_LABEL = 0.06;

/** Same cut as Copy: desktop trigger starts at 1025. */
const DK_MIN = 1025;
/** Desktop: after the paragraph Copy (`delay` 1 + `duration` 0.9). */
const CARDS_DELAY_DK = 2;

function clearActionSectionStyles(root: HTMLElement) {
  const scrollNodes = root.querySelectorAll(
    '[data-anim="label"], [data-anim="programs"], [data-anim="program-card"]',
  );
  scrollNodes.forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(scrollNodes));
}

export const initActionSectionAnimation = createScrollSectionController({
  rootId: 'actions',
  setup: ({ root, mm }) => {
    const label = root.querySelector<HTMLElement>('[data-anim="label"]');
    const programs = root.querySelector<HTMLElement>('[data-anim="programs"]');
    const programCards = programs
      ? Array.from(programs.querySelectorAll<HTMLElement>('[data-anim="program-card"]'))
      : [];

    /** Estado visual base para que cada reinicio del controller sea determinista. */
    const setInitialState = () => {
      if (label) gsap.set(label, { opacity: 0, y: 20, rotateZ: -2 });
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
        overwrite: true,
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
        overwrite: true,
      });
    };

    /** El label sigue el progreso de la sección. Las cards tienen su propio disparador. */
    const createSectionThresholdTrigger = () => {
      let labelIn = false;

      const tweenDur = (immediate: boolean) => (immediate ? 0 : 0.55);

      const handleThresholds = (p: number, immediate = false) => {
        const d = tweenDur(immediate);

        if (label) {
          if (p >= T_LABEL && !labelIn) {
            gsap.to(label, {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              duration: d,
              ease: 'power2.out',
              overwrite: true,
            });
            labelIn = true;
          } else if (p < T_LABEL && labelIn) {
            gsap.to(label, {
              opacity: 0,
              y: 20,
              rotateZ: -2,
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            labelIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 60%',
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
          start: 'top 80%',
          end: 'bottom 15%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: true,
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
              overwrite: true,
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
              overwrite: true,
            });
          },
        }),
      );
    };

    mm.add(`(min-width: ${DK_MIN}px)`, () => {
      setInitialState();
      const sectionTrigger = createSectionThresholdTrigger();
      let pending: gsap.core.Tween | null = null;
      let programsIn = false;

      const cardsTrigger = ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        onEnter: () => {
          pending?.kill();
          pending = gsap.delayedCall(CARDS_DELAY_DK, () => {
            revealPrograms(false);
            programsIn = true;
          });
        },
        onLeaveBack: () => {
          pending?.kill();
          pending = null;
          if (!programsIn) return;
          hidePrograms(false);
          programsIn = false;
        },
      });

      return () => {
        pending?.kill();
        cardsTrigger.kill();
        sectionTrigger.kill();

        clearActionSectionStyles(root);
      };
    });

    mm.add(`(max-width: ${DK_MIN - 1}px)`, () => {
      setInitialState();
      const sectionTrigger = createSectionThresholdTrigger();
      const cardTriggers = createProgramCardTriggers();

      return () => {
        sectionTrigger.kill();
        cardTriggers.forEach((trigger) => trigger.kill());

        clearActionSectionStyles(root);
      };
    });
  },
});
