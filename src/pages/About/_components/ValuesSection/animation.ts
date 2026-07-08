import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars, splitWords } from '../../../../utils/split-text';
import { setupValuesCardHover } from './card-hover';

gsap.registerPlugin(ScrollTrigger);

const ST_DESKTOP_ID = 'about-values-reveal';
const ST_MOBILE_HEADER_ID = 'about-values-header-reveal';
const T_HEADER = 0.1;
const T_DESCRIPTION = 0.24;
const T_CARDS = 0.34;

/** Prepara título y descripciones de valores para animación escalonada. */
function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-values-text-line], [data-values-text-words]');
  const title = root.querySelector<HTMLElement>('[data-values-text-line]');
  const descriptions = Array.from(root.querySelectorAll<HTMLElement>('[data-values-text-words]'));
  return {
    titleChars: title ? splitChars(title, 'about-values-title-char') : [],
    descriptionWords: descriptions.flatMap((line) => splitWords(line, 'about-values-word')),
  };
}

function clearValuesSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-values-text-line], [data-values-text-words]');
}

function setupDesktopValuesReveal(root: HTMLElement) {
  const label = root.querySelector<HTMLElement>('[data-anim="label"]');
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card"]'));
  const { titleChars, descriptionWords } = buildTextNodes(root);

  if (label) gsap.set(label, { opacity: 0, y: 18 });
  if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 42 });
  if (descriptionWords.length)
    gsap.set(descriptionWords, { opacity: 0.18, y: 16, filter: 'blur(2px)' });
  if (cards.length) {
    gsap.set(cards, {
      opacity: 0,
      y: 48,
      rotateZ: (index: number) => (index % 2 === 0 ? -2 : 2),
      scale: 0.95,
    });
  }

  let headerIn = false;
  let descriptionIn = false;
  let cardsIn = false;

  const handleThresholds = (p: number, immediate = false) => {
    const d = immediate ? 0 : 0.55;

    if (p >= T_HEADER && !headerIn) {
      if (label)
        gsap.to(label, { opacity: 1, y: 0, duration: d, ease: 'power2.out', overwrite: true });
      if (titleChars.length) {
        gsap.to(titleChars, {
          opacity: 1,
          yPercent: 0,
          duration: d,
          stagger: immediate ? 0 : 0.014,
          ease: 'power2.out',
          overwrite: true,
        });
      }
      headerIn = true;
    } else if (p < T_HEADER && headerIn) {
      if (label)
        gsap.to(label, { opacity: 0, y: 18, duration: d, ease: 'power2.in', overwrite: true });
      if (titleChars.length) {
        gsap.to(titleChars, {
          opacity: 0,
          yPercent: 42,
          duration: d,
          stagger: immediate ? 0 : -0.01,
          ease: 'power2.in',
          overwrite: true,
        });
      }
      headerIn = false;
    }

    if (descriptionWords.length) {
      if (p >= T_DESCRIPTION && !descriptionIn) {
        gsap.to(descriptionWords, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.45,
          stagger: immediate ? 0 : 0.004,
          ease: 'power2.out',
          overwrite: true,
        });
        descriptionIn = true;
      } else if (p < T_DESCRIPTION && descriptionIn) {
        gsap.to(descriptionWords, {
          opacity: 0.18,
          y: 16,
          filter: 'blur(2px)',
          duration: 0.2,
          stagger: immediate ? 0 : -0.003,
          ease: 'power2.in',
          overwrite: true,
        });
        descriptionIn = false;
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
    id: ST_DESKTOP_ID,
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
  const headerDescription = root.querySelector<HTMLElement>(
    '[data-anim="description"][data-values-text-words]',
  );
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card"]'));
  const cardIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="card-icon"]'));
  const { titleChars, descriptionWords } = buildTextNodes(root);
  const headerWords = headerDescription
    ? Array.from(headerDescription.querySelectorAll<HTMLElement>('.about-values-word'))
    : [];

  if (label) gsap.set(label, { opacity: 0, y: 18 });
  if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 42 });
  if (descriptionWords.length)
    gsap.set(descriptionWords, { opacity: 0.18, y: 16, filter: 'blur(2px)' });
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

  if (label || titleChars.length || headerWords.length) {
    const headerTl = gsap.timeline({
      scrollTrigger: {
        id: ST_MOBILE_HEADER_ID,
        trigger: root,
        start: 'top 74%',
        toggleActions: 'play none none reverse',
      },
    });

    if (label) {
      headerTl.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    }

    if (titleChars.length) {
      headerTl.to(
        titleChars,
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.5,
          stagger: 0.014,
          ease: 'power2.out',
          overwrite: true,
        },
        label ? '<' : 0,
      );
    }

    if (headerWords.length) {
      headerTl.to(
        headerWords,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.4,
          stagger: 0.004,
          ease: 'power2.out',
          overwrite: true,
        },
        '-=0.2',
      );
    }

    timelines.push(headerTl);
  }

  const cardTweens = cards.flatMap((card, index) => {
    const icon = cardIcons[index];
    const cardWords = Array.from(card.querySelectorAll<HTMLElement>('.about-values-word'));
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

    if (cardWords.length) {
      group.push(
        gsap.to(cardWords, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.35,
          stagger: 0.003,
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
