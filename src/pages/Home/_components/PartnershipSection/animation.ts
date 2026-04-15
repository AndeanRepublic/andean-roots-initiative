import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitWords } from '../../../../utils/split-text';
import { setupPartnerLogosHover } from './logo-hover';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'partnership-section-reveal';
const T_LABEL = 0.14;
const T_DESCRIPTION = 0.3;
const T_LOGOS = 0.48;

function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-partners-text-words]');
  const description = root.querySelector<HTMLElement>('[data-partners-text-words]');
  return description ? splitWords(description, 'partners-description-word') : [];
}

function clearPartnershipStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-partners-text-words]');
}

export const initPartnershipSectionAnimation = createScrollSectionController({
  rootId: 'partners',
  triggerIds: [ST_ID],
  clearStyles: clearPartnershipStyles,
  setup: ({ root, mm }) => {
    mm.add('all', () => {
      const labelDesktop = root.querySelector<HTMLElement>('[data-anim="label-desktop"]');
      const labelMobile = root.querySelector<HTMLElement>('[data-anim="label-mobile"]');
      const logos = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="logo-item"]'));
      const logoImages = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="logo-image"]'));
      const labelTargets = [labelDesktop, labelMobile].filter(Boolean) as HTMLElement[];
      const descriptionWords = buildTextNodes(root);

      if (labelTargets.length) gsap.set(labelTargets, { opacity: 0, y: 16 });
      if (descriptionWords.length) gsap.set(descriptionWords, { opacity: 0.12, y: 12, filter: 'blur(2px)' });
      if (logos.length) gsap.set(logos, { opacity: 0, y: 20, scale: 0.92, rotateZ: (i: number) => (i % 2 ? -1.4 : 1.4) });
      if (logoImages.length) gsap.set(logoImages, { filter: 'grayscale(100%) brightness(0.88)' });

      let labelIn = false;
      let descriptionIn = false;
      let logosIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.52;

        if (labelTargets.length) {
          if (p >= T_LABEL && !labelIn) {
            gsap.to(labelTargets, {
              opacity: 1,
              y: 0,
              duration: d,
              stagger: immediate ? 0 : 0.04,
              ease: 'power2.out',
            });
            labelIn = true;
          } else if (p < T_LABEL && labelIn) {
            gsap.to(labelTargets, {
              opacity: 0,
              y: 16,
              duration: d,
              stagger: immediate ? 0 : -0.03,
              ease: 'power2.in',
            });
            labelIn = false;
          }
        }

        if (descriptionWords.length) {
          if (p >= T_DESCRIPTION && !descriptionIn) {
            gsap.to(descriptionWords, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.4,
              stagger: immediate ? 0 : 0.01,
              ease: 'power2.out',
            });
            descriptionIn = true;
          } else if (p < T_DESCRIPTION && descriptionIn) {
            gsap.to(descriptionWords, {
              opacity: 0.12,
              y: 12,
              filter: 'blur(2px)',
              duration: 0.2,
              stagger: immediate ? 0 : -0.008,
              ease: 'power2.in',
            });
            descriptionIn = false;
          }
        }

        if (logos.length) {
          if (p >= T_LOGOS && !logosIn) {
            gsap.to(logos, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: d,
              stagger: immediate ? 0 : 0.06,
              ease: 'power2.out',
            });
            gsap.to(logoImages, {
              filter: 'grayscale(0%) brightness(1)',
              duration: d,
              stagger: immediate ? 0 : 0.05,
              ease: 'power2.out',
            });
            logosIn = true;
          } else if (p < T_LOGOS && logosIn) {
            gsap.to(logos, {
              opacity: 0,
              y: 20,
              scale: 0.92,
              rotateZ: (i: number) => (i % 2 ? -1.4 : 1.4),
              duration: d,
              stagger: immediate ? 0 : -0.05,
              ease: 'power2.in',
            });
            gsap.to(logoImages, {
              filter: 'grayscale(100%) brightness(0.88)',
              duration: d,
              stagger: immediate ? 0 : -0.04,
              ease: 'power2.in',
            });
            logosIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 70%',
        end: 'bottom 18%',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      const cleanupLogoHover = setupPartnerLogosHover(root);

      return () => {
        st.kill();
        cleanupLogoHover();
        clearPartnershipStyles(root);
      };
    });
  },
});
