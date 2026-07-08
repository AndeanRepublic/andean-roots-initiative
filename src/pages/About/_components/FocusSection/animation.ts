import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars, splitWords } from '../../../../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

const ST_DESKTOP_ID = 'about-focus-reveal';
const ST_MOBILE_CONTENT_ID = 'about-focus-content-reveal';
const T_CONTENT = 0.14;
const T_DESCRIPTION = 0.26;
const T_CARDS = 0.46;

/** Construye targets de título/descripcion para stagger por char/word. */
function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-focus-text-line], [data-focus-text-words]');
  const title = root.querySelector<HTMLElement>('[data-focus-text-line]');
  const words = Array.from(root.querySelectorAll<HTMLElement>('[data-focus-text-words]'));
  return {
    titleChars: title ? splitChars(title, 'about-focus-title-char') : [],
    bodyWords: words.flatMap((line) => splitWords(line, 'about-focus-word')),
  };
}

function clearFocusSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-focus-text-line], [data-focus-text-words]');
}

function setupDesktopFocusReveal(root: HTMLElement) {
  const label = root.querySelector<HTMLElement>('[data-anim="label"]');
  const leftMedia = root.querySelector<HTMLElement>('[data-anim="side-media-left"]');
  const rightMedia = root.querySelector<HTMLElement>('[data-anim="side-media-right"]');
  const leftImage = root.querySelector<HTMLElement>('[data-anim="side-image-left"]');
  const rightImage = root.querySelector<HTMLElement>('[data-anim="side-image-right"]');
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card"]'));
  const cardIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card-icon"]'));
  const { titleChars, bodyWords } = buildTextNodes(root);

  if (label) gsap.set(label, { opacity: 0, y: 20 });
  if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 42 });
  if (bodyWords.length) gsap.set(bodyWords, { opacity: 0.15, y: 12, filter: 'blur(2px)' });
  if (leftMedia) {
    gsap.set(leftMedia, {
      opacity: 0,
      clipPath: 'polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)',
    });
  }
  if (rightMedia) {
    gsap.set(rightMedia, {
      opacity: 0,
      clipPath: 'polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)',
    });
  }
  if (leftImage) gsap.set(leftImage, { scale: 1.1 });
  if (rightImage) gsap.set(rightImage, { scale: 1.1 });
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
  let descriptionIn = false;
  let cardsIn = false;
  let mediaIn = false;

  const handleThresholds = (p: number, immediate = false) => {
    const d = immediate ? 0 : 0.56;

    if (p >= T_CONTENT && !contentIn) {
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
      contentIn = true;
    } else if (p < T_CONTENT && contentIn) {
      if (label)
        gsap.to(label, { opacity: 0, y: 20, duration: d, ease: 'power2.in', overwrite: true });
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
      contentIn = false;
    }

    if (bodyWords.length) {
      if (p >= T_DESCRIPTION && !descriptionIn) {
        gsap.to(bodyWords, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.44,
          stagger: immediate ? 0 : 0.004,
          ease: 'power2.out',
          overwrite: true,
        });
        descriptionIn = true;
      } else if (p < T_DESCRIPTION && descriptionIn) {
        gsap.to(bodyWords, {
          opacity: 0.15,
          y: 12,
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

    if ((leftMedia || rightMedia) && p >= T_CONTENT && !mediaIn) {
      if (leftMedia) {
        gsap.to(leftMedia, {
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: d,
          ease: 'power2.out',
          overwrite: true,
        });
      }
      if (rightMedia) {
        gsap.to(rightMedia, {
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: d,
          ease: 'power2.out',
          overwrite: true,
        });
      }
      if (leftImage)
        gsap.to(leftImage, { scale: 1, duration: d, ease: 'power2.out', overwrite: true });
      if (rightImage)
        gsap.to(rightImage, { scale: 1, duration: d, ease: 'power2.out', overwrite: true });
      mediaIn = true;
    } else if ((leftMedia || rightMedia) && p < T_CONTENT && mediaIn) {
      if (leftMedia) {
        gsap.to(leftMedia, {
          opacity: 0,
          clipPath: 'polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)',
          duration: d,
          ease: 'power2.in',
          overwrite: true,
        });
      }
      if (rightMedia) {
        gsap.to(rightMedia, {
          opacity: 0,
          clipPath: 'polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)',
          duration: d,
          ease: 'power2.in',
          overwrite: true,
        });
      }
      if (leftImage)
        gsap.to(leftImage, { scale: 1.1, duration: d, ease: 'power2.in', overwrite: true });
      if (rightImage)
        gsap.to(rightImage, { scale: 1.1, duration: d, ease: 'power2.in', overwrite: true });
      mediaIn = false;
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

  return () => {
    st.kill();

    clearFocusSectionStyles(root);
  };
}

function setupMobileFocusReveal(root: HTMLElement) {
  const label = root.querySelector<HTMLElement>('[data-anim="label"]');
  const title = root.querySelector<HTMLElement>('[data-focus-text-line]');
  const introDescription = root.querySelector<HTMLElement>(
    '[data-anim="description"][data-focus-text-words]',
  );
  const leftMedia = root.querySelector<HTMLElement>('[data-anim="side-media-left"]');
  const rightMedia = root.querySelector<HTMLElement>('[data-anim="side-media-right"]');
  const leftImage = root.querySelector<HTMLElement>('[data-anim="side-image-left"]');
  const rightImage = root.querySelector<HTMLElement>('[data-anim="side-image-right"]');
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card"]'));
  const cardIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="focus-card-icon"]'));
  const { titleChars, bodyWords } = buildTextNodes(root);
  const introWords = introDescription
    ? Array.from(introDescription.querySelectorAll<HTMLElement>('.about-focus-word'))
    : [];

  if (label) gsap.set(label, { opacity: 0, y: 20 });
  if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 42 });
  if (bodyWords.length) gsap.set(bodyWords, { opacity: 0.15, y: 12, filter: 'blur(2px)' });
  if (leftMedia) {
    gsap.set(leftMedia, {
      opacity: 0,
      clipPath: 'polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)',
    });
  }
  if (rightMedia) {
    gsap.set(rightMedia, {
      opacity: 0,
      clipPath: 'polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)',
    });
  }
  if (leftImage) gsap.set(leftImage, { scale: 1.1 });
  if (rightImage) gsap.set(rightImage, { scale: 1.1 });
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

  if (label || titleChars.length || introWords.length) {
    const contentTl = gsap.timeline({
      scrollTrigger: {
        id: ST_MOBILE_CONTENT_ID,
        trigger: root,
        start: 'top 74%',
        toggleActions: 'play none none reverse',
      },
    });

    if (label) {
      contentTl.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    }

    if (titleChars.length) {
      contentTl.to(
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

    if (introWords.length) {
      contentTl.to(
        introWords,
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

    timelines.push(contentTl);
  }

  if (leftMedia || rightMedia || leftImage || rightImage) {
    const mediaTl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    if (leftMedia) {
      mediaTl.to(leftMedia, {
        opacity: 1,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    }
    if (rightMedia) {
      mediaTl.to(
        rightMedia,
        {
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.5,
          ease: 'power2.out',
          overwrite: true,
        },
        leftMedia ? '<' : 0,
      );
    }
    if (leftImage) {
      mediaTl.to(
        leftImage,
        { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: true },
        leftMedia || rightMedia ? '<' : 0,
      );
    }
    if (rightImage) {
      mediaTl.to(
        rightImage,
        { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: true },
        leftMedia || rightMedia || leftImage ? '<' : 0,
      );
    }

    timelines.push(mediaTl);
  }

  const cardTweens = cards.flatMap((card, index) => {
    const cardIcon = cardIcons[index];
    const cardWords = Array.from(card.querySelectorAll<HTMLElement>('.about-focus-word'));
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
