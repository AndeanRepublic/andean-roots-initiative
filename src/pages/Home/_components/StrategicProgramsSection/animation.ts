import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const T_LABEL = 0.1;
const T_CTA = 0.18;

function clearStrategicProgramsStyles(root: HTMLElement) {
  const scrollNodes = root.querySelectorAll(
    '[data-anim="label-desktop"], [data-anim="label-mobile"], [data-anim="cta"], [data-anim="program-card"]',
  );
  scrollNodes.forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(scrollNodes));
}

export const initStrategicProgramsSectionAnimation = createScrollSectionController({
  rootId: 'programs',
  setup: ({ root, mm }) => {
    const labelDesktop = root.querySelector<HTMLElement>('[data-anim="label-desktop"]');
    const labelMobile = root.querySelector<HTMLElement>('[data-anim="label-mobile"]');
    const cta = root.querySelector<HTMLElement>('[data-anim="cta"]');
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="program-card"]'));
    const labelTargets = [labelDesktop, labelMobile].filter(Boolean) as HTMLElement[];

    const setInitialState = () => {
      if (labelTargets.length) gsap.set(labelTargets, { opacity: 0, y: 18 });
      if (cta) gsap.set(cta, { opacity: 0, x: 20 });
      if (cards.length) {
        gsap.set(cards, {
          opacity: 0,
          y: 46,
          scale: 0.95,
          rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
        });
      }
    };

    const revealProgramCard = (card: HTMLElement) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateZ: 0,
        duration: 0.48,
        ease: 'power3.out',
        overwrite: true,
      });
    };

    const hideProgramCard = (card: HTMLElement) => {
      gsap.to(card, {
        opacity: 0,
        y: 46,
        scale: 0.95,
        rotateZ: -2,
        duration: 0.34,
        ease: 'power2.in',
        overwrite: true,
      });
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
      let ctaIn = false;

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
          if (cta)
            gsap.to(cta, { opacity: 1, x: 0, duration: 0.42, ease: 'power2.out', overwrite: true });
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
          if (cta)
            gsap.to(cta, { opacity: 1, x: 0, duration: 0.32, ease: 'power2.out', overwrite: true });
        },
        onLeaveBack: () => {
          if (labelTargets.length) {
            gsap.to(labelTargets, {
              opacity: 0,
              y: 18,
              duration: 0.28,
              ease: 'power2.in',
              overwrite: true,
            });
          }
          if (cta)
            gsap.to(cta, { opacity: 0, x: 20, duration: 0.25, ease: 'power2.in', overwrite: true });
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
