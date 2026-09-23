import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { setupPartnerLogosHover } from './logo-hover';

gsap.registerPlugin(ScrollTrigger);

const T_LABEL = 0.14;
const T_LOGOS = 0.3;

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
  setup: ({ root }) => {
    const labelDesktop = root.querySelector<HTMLElement>('[data-anim="label-desktop"]');
    const labelMobile = root.querySelector<HTMLElement>('[data-anim="label-mobile"]');
    const logos = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="logo-item"]'));
    const logoImages = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="logo-image"]'));
    const labelTargets = [labelDesktop, labelMobile].filter(Boolean) as HTMLElement[];

    if (labelTargets.length) gsap.set(labelTargets, { opacity: 0, y: 16 });
    if (logos.length)
      gsap.set(logos, {
        opacity: 0,
        y: 20,
        scale: 0.92,
        rotateZ: (i: number) => (i % 2 ? -1.4 : 1.4),
      });
    if (logoImages.length) gsap.set(logoImages, { filter: 'grayscale(100%) brightness(0.88)' });

    let labelIn = false;
    let logosIn = false;

    /** Secuencia de entrada por umbrales de progreso: labels -> logos. */
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
            overwrite: true,
          });
          labelIn = true;
        } else if (p < T_LABEL && labelIn) {
          gsap.to(labelTargets, {
            opacity: 0,
            y: 16,
            duration: d,
            stagger: immediate ? 0 : -0.03,
            ease: 'power2.in',
            overwrite: true,
          });
          labelIn = false;
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
            overwrite: true,
          });
          gsap.to(logoImages, {
            filter: 'grayscale(0%) brightness(1)',
            duration: d,
            stagger: immediate ? 0 : 0.05,
            ease: 'power2.out',
            overwrite: true,
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
            overwrite: true,
          });
          gsap.to(logoImages, {
            filter: 'grayscale(100%) brightness(0.88)',
            duration: d,
            stagger: immediate ? 0 : -0.04,
            ease: 'power2.in',
            overwrite: true,
          });
          logosIn = false;
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

    const cleanupLogoHover = setupPartnerLogosHover(root);

    return () => {
      st.kill();
      cleanupLogoHover();
      clearPartnershipStyles(root);
    };
  },
});
