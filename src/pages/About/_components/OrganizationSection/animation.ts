import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_NODES = [
  '[data-anim="label"]',
  '[data-anim="cover-wrap"]',
  '[data-anim="cover-image"]',
  '[data-anim="point-card"]',
  '[data-anim="point-icon"]',
].join(', ');

function clearOrganizationSectionStyles(root: HTMLElement) {
  const scrollNodes = root.querySelectorAll(SCROLL_NODES);
  scrollNodes.forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(scrollNodes));
}

export const initOrganizationSectionAnimation = createScrollSectionController({
  rootId: 'about-organization',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const label = root.querySelector<HTMLElement>('[data-anim="label"]');
      const coverWrap = root.querySelector<HTMLElement>('[data-anim="cover-wrap"]');
      const coverImage = root.querySelector<HTMLElement>('[data-anim="cover-image"]');
      const pointCards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="point-card"]'));
      const pointIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="point-icon"]'));

      if (label) gsap.set(label, { opacity: 0, x: -22 });
      if (coverWrap) {
        gsap.set(coverWrap, {
          opacity: 0,
          clipPath: 'polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)',
        });
      }
      if (coverImage) {
        gsap.set(coverImage, { scale: 1.4, yPercent: 21 });
      }
      if (pointCards.length) gsap.set(pointCards, { opacity: 0, y: 42, rotateZ: 1.5 });
      if (pointIcons.length) gsap.set(pointIcons, { rotate: -10, scale: 0.86 });

      const tweens: gsap.core.Tween[] = [];
      const timelines: gsap.core.Timeline[] = [];
      const triggers: ScrollTrigger[] = [];

      if (label) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        });

        headerTl.to(label, {
          opacity: 1,
          x: 0,
          duration: 0.56,
          ease: 'power2.out',
          overwrite: true,
        });

        timelines.push(headerTl);
      }

      if (coverWrap && coverImage) {
        const coverRevealTl = gsap.timeline({
          scrollTrigger: {
            trigger: coverWrap,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });

        coverRevealTl.to(coverWrap, {
          opacity: 1,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 0.2,
          ease: 'power1.out',
          overwrite: true,
        });
        coverRevealTl.to(
          coverImage,
          {
            scale: 1.2,
            duration: 0.2,
            ease: 'power1.out',
            overwrite: true,
          },
          '<',
        );
        timelines.push(coverRevealTl);

        const coverParallaxTrigger = ScrollTrigger.create({
          trigger: coverWrap,
          start: 'top 85%',
          end: 'bottom 15%',
          onUpdate: (self) => {
            gsap.to(coverImage, {
              yPercent: -21 + self.progress * 30,
              duration: 0.35,
              overwrite: 'auto',
            });
          },
        });
        triggers.push(coverParallaxTrigger);
      }

      const pointTweens = pointCards.flatMap((card, index) => {
        const cardIcon = pointIcons[index];
        const cardTweenGroup: gsap.core.Tween[] = [];

        cardTweenGroup.push(
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            duration: 0.56,
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
          cardTweenGroup.push(
            gsap.to(cardIcon, {
              rotate: 0,
              scale: 1,
              duration: 0.56,
              delay: 0.5,
              ease: 'back.out(4)',
              overwrite: true,
              scrollTrigger: {
                trigger: card,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }),
          );
        }

        return cardTweenGroup;
      });

      tweens.push(...pointTweens);

      return () => {
        timelines.forEach((timeline) => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        });
        triggers.forEach((trigger) => trigger.kill());
        tweens.forEach((tween) => {
          tween.scrollTrigger?.kill();
          tween.kill();
        });

        clearOrganizationSectionStyles(root);
      };
    });
  },
});
