import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const T_CONTENT = 0.14;
const T_CARDS = 0.36;

const SCROLL_NODES = [
  '[data-anim="label"]',
  '[data-anim="focus-card"]',
  '[data-anim="focus-card-icon"]',
].join(', ');

function clearFocusSectionStyles(root: HTMLElement) {
  const scrollNodes = root.querySelectorAll(SCROLL_NODES);
  scrollNodes.forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(scrollNodes));
}

function setupDesktopFocusReveal(root: HTMLElement) {
  const label = root.querySelector<HTMLElement>('[data-anim="label"]');
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card"]'));
  const cardIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card-icon"]'));

  if (label) gsap.set(label, { opacity: 0, y: 20 });
  if (cards.length) {
    gsap.set(cards, {
      opacity: 0,
      y: 50,
      rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
      scale: 0.95,
    });
  }
  if (cardIcons.length) gsap.set(cardIcons, { scale: 0.85, rotate: -8 });

  let contentIn = false;
  let cardsIn = false;

  const handleThresholds = (p: number, immediate = false) => {
    const d = immediate ? 0 : 0.56;

    if (label) {
      if (p >= T_CONTENT && !contentIn) {
        gsap.to(label, { opacity: 1, y: 0, duration: d, ease: 'power2.out', overwrite: true });
        contentIn = true;
      } else if (p < T_CONTENT && contentIn) {
        gsap.to(label, { opacity: 0, y: 20, duration: d, ease: 'power2.in', overwrite: true });
        contentIn = false;
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
          stagger: immediate ? 0 : 0.08,
          ease: 'power3.out',
          overwrite: true,
        });
        gsap.to(cardIcons, {
          scale: 1,
          rotate: 0,
          duration: d,
          stagger: immediate ? 0 : 0.06,
          ease: 'back.out(1.4)',
          overwrite: true,
        });
        cardsIn = true;
      } else if (p < T_CARDS && cardsIn) {
        gsap.to(cards, {
          opacity: 0,
          y: 50,
          rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
          scale: 0.95,
          duration: d,
          stagger: immediate ? 0 : -0.07,
          ease: 'power2.in',
          overwrite: true,
        });
        gsap.to(cardIcons, {
          scale: 0.85,
          rotate: -8,
          duration: d,
          stagger: immediate ? 0 : -0.05,
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

  return () => {
    st.kill();

    clearFocusSectionStyles(root);
  };
}

function setupMobileFocusReveal(root: HTMLElement) {
  const label = root.querySelector<HTMLElement>('[data-anim="label"]');
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card"]'));
  const cardIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card-icon"]'));

  if (label) gsap.set(label, { opacity: 0, y: 20 });
  if (cards.length) {
    gsap.set(cards, {
      opacity: 0,
      y: 50,
      rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
      scale: 0.95,
    });
  }
  if (cardIcons.length) gsap.set(cardIcons, { scale: 0.85, rotate: -8 });

  const timelines: gsap.core.Timeline[] = [];
  const tweens: gsap.core.Tween[] = [];

  if (label) {
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 74%',
        toggleActions: 'play none none reverse',
      },
    });

    contentTl.to(label, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    });

    timelines.push(contentTl);
  }

  const cardTweens = cards.flatMap((card, index) => {
    const cardIcon = cardIcons[index];
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
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }),
    );

    if (cardIcon) {
      group.push(
        gsap.to(cardIcon, {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'back.out(1.4)',
          overwrite: true,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
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

    clearFocusSectionStyles(root);
  };
}

export const initFocusSectionAnimation = createScrollSectionController({
  rootId: 'about-focus',
  setup: ({ root, mm }) => {
    mm.add('(max-width: 1199px)', () => setupMobileFocusReveal(root));
    mm.add('(min-width: 1200px)', () => setupDesktopFocusReveal(root));
  },
});
