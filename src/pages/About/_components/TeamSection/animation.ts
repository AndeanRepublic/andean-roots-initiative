import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText } from '../../../../utils/split-text';
import { setupTeamControlsHover } from './controls-hover';

gsap.registerPlugin(ScrollTrigger);

const T_CARDS = 0.34;
const T_CONTROLS = 0.6;

function clearTeamSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-team-text-words]');
}

function setupDesktopTeamReveal(root: HTMLElement) {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="member-card"]'));
  const images = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="member-image"]'));
  const captions = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="member-caption"]'));
  const controls = root.querySelector<HTMLElement>('[data-anim="controls"]');
  const counter = root.querySelector<HTMLElement>('[data-anim="counter"]');
  const controlButtons = Array.from(
    root.querySelectorAll<HTMLElement>('[data-anim="control-button"]'),
  );

  if (cards.length)
    gsap.set(cards, { opacity: 0, y: 46, rotateZ: (i: number) => (i % 2 === 0 ? -2 : 2) });
  if (images.length) gsap.set(images, { scale: 1.08, filter: 'saturate(0.82)' });
  if (captions.length) gsap.set(captions, { opacity: 0, y: 16 });
  if (controls) gsap.set(controls, { opacity: 0, y: 18 });
  if (counter) gsap.set(counter, { opacity: 0.2 });
  if (controlButtons.length) gsap.set(controlButtons, { scale: 0.92 });

  let cardsIn = false;
  let controlsIn = false;

  /** Desktop conserva umbrales para cards y controles. El título lo anima Copy. */
  const handleThresholds = (p: number, immediate = false) => {
    const d = immediate ? 0 : 0.56;

    if (p >= T_CARDS && !cardsIn) {
      if (cards.length) {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: d,
          stagger: immediate ? 0 : 0.09,
          ease: 'power3.out',
          overwrite: true,
        });
      }
      if (captions.length) {
        gsap.to(captions, {
          opacity: 1,
          y: 0,
          duration: d,
          stagger: immediate ? 0 : 0.07,
          ease: 'power2.out',
          overwrite: true,
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
          overwrite: true,
        });
      }
      if (captions.length) {
        gsap.to(captions, {
          opacity: 0,
          y: 16,
          duration: d,
          stagger: immediate ? 0 : -0.05,
          ease: 'power2.in',
          overwrite: true,
        });
      }
      cardsIn = false;
    }

    if (p >= T_CONTROLS && !controlsIn) {
      if (controls)
        gsap.to(controls, { opacity: 1, y: 0, duration: d, ease: 'power2.out', overwrite: true });
      if (counter)
        gsap.to(counter, { opacity: 1, duration: d, ease: 'power2.out', overwrite: true });
      if (controlButtons.length) {
        gsap.to(controlButtons, {
          scale: 1,
          duration: d,
          stagger: immediate ? 0 : 0.06,
          ease: 'back.out(1.4)',
          overwrite: true,
        });
      }
      controlsIn = true;
    } else if (p < T_CONTROLS && controlsIn) {
      if (controls)
        gsap.to(controls, { opacity: 0, y: 18, duration: d, ease: 'power2.in', overwrite: true });
      if (counter)
        gsap.to(counter, { opacity: 0.2, duration: d, ease: 'power2.in', overwrite: true });
      if (controlButtons.length) {
        gsap.to(controlButtons, {
          scale: 0.92,
          duration: d,
          stagger: immediate ? 0 : -0.04,
          ease: 'power2.in',
          overwrite: true,
        });
      }
      controlsIn = false;
    }

    if (images.length) {
      gsap.to(images, {
        scale: 1.08 - p * 0.08,
        filter: `saturate(${0.82 + p * 0.18})`,
        duration: immediate ? 0 : 0.35,
        overwrite: true,
      });
    }
  };

  const st = ScrollTrigger.create({
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
}

function setupMobileTeamReveal(root: HTMLElement) {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="member-card"]'));
  const images = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="member-image"]'));
  const captions = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="member-caption"]'));
  const controls = root.querySelector<HTMLElement>('[data-anim="controls"]');
  const counter = root.querySelector<HTMLElement>('[data-anim="counter"]');
  const controlButtons = Array.from(
    root.querySelectorAll<HTMLElement>('[data-anim="control-button"]'),
  );

  if (cards.length)
    gsap.set(cards, { opacity: 0, y: 46, rotateZ: (i: number) => (i % 2 === 0 ? -2 : 2) });
  if (images.length) gsap.set(images, { scale: 1.08, filter: 'saturate(0.82)' });
  if (captions.length) gsap.set(captions, { opacity: 0, y: 16 });
  if (controls) gsap.set(controls, { opacity: 0, y: 18 });
  if (counter) gsap.set(counter, { opacity: 0.2 });
  if (controlButtons.length) gsap.set(controlButtons, { scale: 0.92 });

  const timelines: gsap.core.Timeline[] = [];
  const tweens: gsap.core.Tween[] = [];

  const cardTweens = cards.flatMap((card, index) => {
    const image = images[index];
    const caption = captions[index];
    const group: gsap.core.Tween[] = [];

    group.push(
      gsap.to(card, {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        duration: 0.56,
        ease: 'power3.out',
        overwrite: true,
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      }),
    );

    if (image) {
      group.push(
        gsap.to(image, {
          scale: 1,
          filter: 'saturate(1)',
          duration: 0.5,
          ease: 'power2.out',
          overwrite: true,
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }),
      );
    }

    if (caption) {
      group.push(
        gsap.to(caption, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
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

  if (controls || counter || controlButtons.length) {
    const controlsTl = gsap.timeline({
      scrollTrigger: {
        trigger: controls ?? root,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });

    if (controls) {
      controlsTl.to(controls, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    }
    if (counter) {
      controlsTl.to(
        counter,
        { opacity: 1, duration: 0.5, ease: 'power2.out', overwrite: true },
        controls ? '<' : 0,
      );
    }
    if (controlButtons.length) {
      controlsTl.to(
        controlButtons,
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(1.4)',
          overwrite: true,
        },
        controls || counter ? '<' : 0,
      );
    }
    timelines.push(controlsTl);
  }

  return () => {
    timelines.forEach((timeline) => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    });
    tweens.forEach((tween) => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });

    clearTeamSectionStyles(root);
  };
}

export const initTeamSectionAnimation = createScrollSectionController({
  rootId: 'about-team',
  setup: ({ root, mm }) => {
    mm.add('(max-width: 1199px)', () => setupMobileTeamReveal(root));
    mm.add('(min-width: 1200px)', () => setupDesktopTeamReveal(root));
  },
});
