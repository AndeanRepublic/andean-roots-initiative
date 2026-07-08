import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'contact-faq-reveal';
const T_INTRO = 0.1;
const T_VISUAL = 0.22;
const T_CTA = 0.32;
const T_ITEMS = 0.4;

function clearContactFaqStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
}

export const initContactFaqSectionAnimation = createScrollSectionController({
  rootId: 'contact-faq',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const intro = root.querySelector<HTMLElement>('[data-anim="faq-intro"]');
      const visual = root.querySelector<HTMLElement>('[data-anim="faq-visual"]');
      const cta = root.querySelector<HTMLElement>('[data-anim="faq-cta"]');
      const items = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="faq-item"]'));

      if (intro) gsap.set(intro, { opacity: 0, y: 26, filter: 'blur(2px)' });
      if (visual) gsap.set(visual, { opacity: 0, y: 20, scale: 0.98 });
      if (cta) gsap.set(cta, { opacity: 0, y: 16 });
      if (items.length) gsap.set(items, { opacity: 0, y: 18 });

      let introIn = false;
      let visualIn = false;
      let ctaIn = false;
      let itemsIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.48;

        if (intro) {
          if (p >= T_INTRO && !introIn) {
            gsap.to(intro, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: d,
              ease: 'power3.out',
              overwrite: true,
            });
            introIn = true;
          } else if (p < T_INTRO && introIn) {
            gsap.to(intro, {
              opacity: 0,
              y: 26,
              filter: 'blur(2px)',
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            introIn = false;
          }
        }

        if (visual) {
          if (p >= T_VISUAL && !visualIn) {
            gsap.to(visual, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: d,
              ease: 'power2.out',
              overwrite: true,
            });
            visualIn = true;
          } else if (p < T_VISUAL && visualIn) {
            gsap.to(visual, {
              opacity: 0,
              y: 20,
              scale: 0.98,
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            visualIn = false;
          }
        }

        if (cta) {
          if (p >= T_CTA && !ctaIn) {
            gsap.to(cta, { opacity: 1, y: 0, duration: d, ease: 'power2.out', overwrite: true });
            ctaIn = true;
          } else if (p < T_CTA && ctaIn) {
            gsap.to(cta, { opacity: 0, y: 16, duration: d, ease: 'power2.in', overwrite: true });
            ctaIn = false;
          }
        }

        if (items.length) {
          if (p >= T_ITEMS && !itemsIn) {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: d,
              stagger: immediate ? 0 : 0.06,
              ease: 'power2.out',
              overwrite: true,
            });
            itemsIn = true;
          } else if (p < T_ITEMS && itemsIn) {
            gsap.to(items, {
              opacity: 0,
              y: 18,
              duration: d,
              stagger: immediate ? 0 : -0.04,
              ease: 'power2.in',
              overwrite: true,
            });
            itemsIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 76%',
        end: 'bottom top',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      return () => {
        st.kill();

        clearContactFaqStyles(root);
      };
    });
  },
});
