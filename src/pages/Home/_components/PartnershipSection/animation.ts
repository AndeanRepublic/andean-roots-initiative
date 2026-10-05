import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { setupPartnerLogosHover } from './logo-hover';

gsap.registerPlugin(ScrollTrigger);

/** Same cut as Copy: desktop trigger starts at 1025. */
const DK_MIN = 1025;
/** Desktop: after the paragraph Copy (`delay` 1 + `duration` 0.9). */
const LOGOS_DELAY_DK = 1.2;

/** Devuelve la sección a su estado base: estilos inline y tweens. */
function clearPartnershipStyles(root: HTMLElement) {
  const scrollNodes = root.querySelectorAll(
    '[data-anim="label-desktop"], [data-anim="label-mobile"], [data-anim="logo-item"], [data-anim="logo-image"]',
  );
  scrollNodes.forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(scrollNodes));
}

export const initPartnershipSectionAnimation = createScrollSectionController({
  rootId: 'partners',
  setup: ({ root, mm }) => {
    const labelDesktop = root.querySelector<HTMLElement>('[data-anim="label-desktop"]');
    const labelMobile = root.querySelector<HTMLElement>('[data-anim="label-mobile"]');
    const logos = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="logo-item"]'));
    const logoImages = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="logo-image"]'));
    const labelTargets = [labelDesktop, labelMobile].filter(Boolean) as HTMLElement[];

    const setInitialState = () => {
      if (labelTargets.length) gsap.set(labelTargets, { opacity: 0, y: 16 });
      if (logos.length) {
        gsap.set(logos, {
          opacity: 0,
          y: 20,
          scale: 0.92,
          rotateZ: (i: number) => (i % 2 ? -1.4 : 1.4),
        });
      }
      if (logoImages.length) gsap.set(logoImages, { filter: 'grayscale(100%) brightness(0.88)' });
    };

    const revealLabels = (targets: HTMLElement[], duration = 0.52) => {
      if (!targets.length) return;
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger: 0.04,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const hideLabels = (targets: HTMLElement[]) => {
      if (!targets.length) return;
      gsap.to(targets, {
        opacity: 0,
        y: 16,
        duration: 0.35,
        stagger: -0.03,
        ease: 'power2.in',
        overwrite: true,
      });
    };

    const revealLogos = (items: HTMLElement[], images: HTMLElement[], duration = 0.52) => {
      if (items.length) {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration,
          stagger: 0.06,
          ease: 'power2.out',
          overwrite: true,
        });
      }
      if (images.length) {
        gsap.to(images, {
          filter: 'grayscale(0%) brightness(1)',
          duration,
          stagger: 0.05,
          ease: 'power2.out',
          overwrite: true,
        });
      }
    };

    const hideLogos = (items: HTMLElement[], images: HTMLElement[]) => {
      if (items.length) {
        gsap.to(items, {
          opacity: 0,
          y: 20,
          scale: 0.92,
          rotateZ: (i: number) => (i % 2 ? -1.4 : 1.4),
          duration: 0.35,
          stagger: -0.05,
          ease: 'power2.in',
          overwrite: true,
        });
      }
      if (images.length) {
        gsap.to(images, {
          filter: 'grayscale(100%) brightness(0.88)',
          duration: 0.35,
          stagger: -0.04,
          ease: 'power2.in',
          overwrite: true,
        });
      }
    };

    mm.add(`(min-width: ${DK_MIN}px)`, () => {
      setInitialState();
      let pending: gsap.core.Tween | null = null;
      let logosIn = false;

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        onEnter: () => {
          revealLabels(labelTargets);
          pending?.kill();
          pending = gsap.delayedCall(LOGOS_DELAY_DK, () => {
            revealLogos(logos, logoImages);
            logosIn = true;
          });
        },
        onEnterBack: () => {
          revealLabels(labelTargets);
          pending?.kill();
          pending = gsap.delayedCall(LOGOS_DELAY_DK, () => {
            revealLogos(logos, logoImages);
            logosIn = true;
          });
        },
        onLeaveBack: () => {
          pending?.kill();
          pending = null;
          hideLabels(labelTargets);
          if (!logosIn) return;
          hideLogos(logos, logoImages);
          logosIn = false;
        },
      });

      const cleanupLogoHover = setupPartnerLogosHover(root);

      return () => {
        pending?.kill();
        st.kill();
        cleanupLogoHover();
        clearPartnershipStyles(root);
      };
    });

    mm.add(`(max-width: ${DK_MIN - 1}px)`, () => {
      setInitialState();

      const labelTriggers = labelTargets.map((label) =>
        ScrollTrigger.create({
          trigger: label,
          start: 'top 80%',
          onEnter: () => revealLabels([label], 0.45),
          onEnterBack: () => revealLabels([label], 0.45),
          onLeaveBack: () => hideLabels([label]),
        }),
      );

      const logoTriggers = logos.map((logo, index) => {
        const image = logoImages[index];
        return ScrollTrigger.create({
          trigger: logo,
          start: 'top 80%',
          onEnter: () => revealLogos([logo], image ? [image] : [], 0.45),
          onEnterBack: () => revealLogos([logo], image ? [image] : [], 0.45),
          onLeaveBack: () => hideLogos([logo], image ? [image] : []),
        });
      });

      const cleanupLogoHover = setupPartnerLogosHover(root);

      return () => {
        labelTriggers.forEach((trigger) => trigger.kill());
        logoTriggers.forEach((trigger) => trigger.kill());
        cleanupLogoHover();
        clearPartnershipStyles(root);
      };
    });
  },
});
