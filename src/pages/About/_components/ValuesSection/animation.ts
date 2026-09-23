import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { setupValuesCardHover } from './card-hover';

gsap.registerPlugin(ScrollTrigger);

const T_LABEL = 0.1;
const T_CARDS = 0.34;

const SCROLL_NODES = ['[data-anim="label"]', '[data-anim="card"]', '[data-anim="card-icon"]'].join(
  ', ',
);

function clearValuesSectionStyles(root: HTMLElement) {
  const scrollNodes = root.querySelectorAll(SCROLL_NODES);
  scrollNodes.forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(scrollNodes));
}

function setupDesktopValuesReveal(root: HTMLElement) {
  const label = root.querySelector<HTMLElement>('[data-anim="label"]');
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card"]'));

  if (label) gsap.set(label, { opacity: 0, y: 18 });
  if (cards.length) {
    gsap.set(cards, {
      opacity: 0,
      y: 48,
      rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
      scale: 0.95,
    });
  }

  let labelIn = false;
  let cardsIn = false;

  const handleThresholds = (p: number, immediate = false) => {
    const d = immediate ? 0 : 0.55;

    if (label) {
      if (p >= T_LABEL && !labelIn) {
        gsap.to(label, { opacity: 1, y: 0, duration: d, ease: 'power2.out', overwrite: true });
        labelIn = true;
      } else if (p < T_LABEL && labelIn) {
        gsap.to(label, { opacity: 0, y: 18, duration: d, ease: 'power2.in', overwrite: true });
        labelIn = false;
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
          overwrite: true,
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
          overwrite: true,
        });
        cardsIn = false;
      }
    }
  };

  const st = ScrollTrigger.create({
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
}

function setupMobileValuesReveal(root: HTMLElement) {
  const label = root.querySelector<HTMLElement>('[data-anim="label"]');
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card"]'));
  const cardIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card-icon"]'));

  if (label) gsap.set(label, { opacity: 0, y: 18 });
  if (cards.length) {
    gsap.set(cards, {
      opacity: 0,
      y: 48,
      rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
      scale: 0.95,
    });
  }
  if (cardIcons.length) gsap.set(cardIcons, { scale: 0.9, rotate: -8 });

  const timelines: gsap.core.Timeline[] = [];
  const tweens: gsap.core.Tween[] = [];

  if (label) {
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 74%',
        toggleActions: 'play none none reverse',
      },
    });

    headerTl.to(label, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    });

    timelines.push(headerTl);
  }

  const cardTweens = cards.flatMap((card, index) => {
    const icon = cardIcons[index];
    const group: gsap.core.Tween[] = [];

    group.push(
      gsap.to(card, {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: true,
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      }),
    );

    if (icon) {
      group.push(
        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'back.out(1.4)',
          overwrite: true,
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }),
      );
    }

    return group;
  });

  tweens.push(...cardTweens);

  return () => {
    timelines.forEach((timeline) => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    });
    tweens.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });

    clearValuesSectionStyles(root);
  };
}

export const initValuesSectionAnimation = createScrollSectionController({
  rootId: 'about-values',
  setup: ({ root, mm }) => {
    mm.add('(max-width: 1199px)', () => setupMobileValuesReveal(root));
    mm.add('(min-width: 1200px)', () => setupDesktopValuesReveal(root));
  },
});
