import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

/** Umbrales de progreso del ScrollTrigger (0–1): al cruzarlos se disparan tweens, no un mapeo continuo. */
const T_LABEL = 0.06;
const T_PROGRAMS = 0.48;

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

    /**
     * Trigger principal de sección:
     * - siempre controla el label
     * - opcionalmente controla programs (desktop)
     */
    const createSectionThresholdTrigger = (includeProgramThreshold: boolean) => {
      let labelIn = false;
      let programsIn = false;

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
        trigger: root,
        start: 'top 70%',
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
          start: 'top 70%',
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
