import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

/** Same cut as Copy: desktop trigger starts at 1025. */
const DK_MIN = 1025;
/** Matches `--breakpoint-dk-lg`. */
const DK_LG_MIN = 1700;
const PIN_CENTER = 'center center';
/** Tall viewports: pin above the middle so the card sits higher. */
const PIN_HIGH = 'center 42%';
/** After the title Copy (`duration` 0.9). */
const BUTTON_DELAY_DK = 1;
function clearStrategicProgramsStyles(root: HTMLElement) {
  const scrollNodes = root.querySelectorAll(
    '[data-anim="section-head"], [data-anim="label-desktop"], [data-anim="label-mobile"], [data-anim="cta"], [data-anim="program-card"]',
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

    const createCardTrigger = (card: HTMLElement) =>
      ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => revealProgramCard(card),
        onEnterBack: () => revealProgramCard(card),
        onLeaveBack: () => hideProgramCard(card),
      });

    const revealLabel = () => {
      if (!labelTargets.length) return;
      gsap.to(labelTargets, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const hideLabel = () => {
      if (!labelTargets.length) return;
      gsap.to(labelTargets, {
        opacity: 0,
        y: 18,
        duration: 0.28,
        ease: 'power2.in',
        overwrite: true,
      });
    };

    const revealCta = () => {
      if (!cta) return;
      gsap.to(cta, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', overwrite: true });
    };

    const hideCta = () => {
      if (!cta) return;
      gsap.to(cta, { opacity: 0, x: 20, duration: 0.28, ease: 'power2.in', overwrite: true });
    };

    /**
     * Cards stick at `pinAt` (viewport center on desktop, higher on dk-lg).
     * Each one shrinks, tilts, and darkens as the next card covers it.
     * The last card is not pinned.
     */
    const createStickyPins = (items: HTMLElement[], pinAt: string) => {
      const triggers: ScrollTrigger[] = [];
      const last = items[items.length - 1];
      if (!last) return triggers;

      items.forEach((card, index) => {
        card.style.zIndex = String(index + 1);
        if (index >= items.length - 1) return;

        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: pinAt,
            endTrigger: last,
            end: pinAt,
            pin: true,
            pinSpacing: false,
            // Scale and rotation own the transform. A transform pin would lose its y and the card would jump.
            pinType: 'fixed',
            invalidateOnRefresh: true,
          }),
        );

        const next = items[index + 1];
        triggers.push(
          ScrollTrigger.create({
            trigger: next,
            start: 'top bottom',
            end: pinAt,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(card, {
                scale: 1 - progress * 0.25,
                rotation: (index % 2 === 0 ? 5 : -5) * progress,
                transformOrigin: 'center center',
                '--after-opacity': progress,
              });
            },
          }),
        );
      });

      return triggers;
    };

    mm.add(`(min-width: ${DK_MIN}px)`, () => {
      if (labelTargets.length) gsap.set(labelTargets, { opacity: 0, y: 18 });
      if (cta) gsap.set(cta, { opacity: 0, x: 20 });
      let buttonCall: gsap.core.Tween | null = null;

      const playSequence = () => {
        revealLabel();
        buttonCall?.kill();
        buttonCall = gsap.delayedCall(BUTTON_DELAY_DK, revealCta);
      };

      const resetSequence = () => {
        buttonCall?.kill();
        buttonCall = null;
        hideLabel();
        hideCta();
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        onEnter: playSequence,
        onEnterBack: playSequence,
        onLeaveBack: resetSequence,
      });

      return () => {
        buttonCall?.kill();
        st.kill();
        clearStrategicProgramsStyles(root);
      };
    });

    const releasePins = (triggers: ScrollTrigger[]) => {
      triggers.forEach((trigger) => trigger.kill());
      cards.forEach((card) => {
        card.style.zIndex = '';
        card.style.removeProperty('--after-opacity');
        gsap.set(card, { clearProps: 'scale,rotation,transformOrigin' });
      });
    };

    mm.add(`(min-width: ${DK_MIN}px) and (max-width: ${DK_LG_MIN - 1}px)`, () => {
      const cardTriggers = createStickyPins(cards, PIN_CENTER);
      return () => releasePins(cardTriggers);
    });

    mm.add(`(min-width: ${DK_LG_MIN}px)`, () => {
      const cardTriggers = createStickyPins(cards, PIN_HIGH);
      return () => releasePins(cardTriggers);
    });

    mm.add(`(max-width: ${DK_MIN - 1}px)`, () => {
      setInitialState();

      const labelTriggers = labelTargets.map((label) =>
        ScrollTrigger.create({
          trigger: label,
          start: 'top 80%',
          onEnter: () =>
            gsap.to(label, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: true,
            }),
          onEnterBack: () =>
            gsap.to(label, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: true,
            }),
          onLeaveBack: () =>
            gsap.to(label, {
              opacity: 0,
              y: 18,
              duration: 0.28,
              ease: 'power2.in',
              overwrite: true,
            }),
        }),
      );

      const ctaTrigger = cta
        ? ScrollTrigger.create({
            trigger: cta,
            start: 'top 80%',
            onEnter: revealCta,
            onEnterBack: revealCta,
            onLeaveBack: hideCta,
          })
        : null;

      const cardTriggers = cards.map(createCardTrigger);

      return () => {
        labelTriggers.forEach((trigger) => trigger.kill());
        ctaTrigger?.kill();
        cardTriggers.forEach((trigger) => trigger.kill());

        clearStrategicProgramsStyles(root);
      };
    });
  },
});
