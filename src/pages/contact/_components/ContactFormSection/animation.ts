import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'contact-form-reveal';
const T_ASIDE = 0.1;
const T_PANEL = 0.26;

function clearContactFormSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
}

export const initContactFormSectionAnimation = createScrollSectionController({
  rootId: 'contacto-form',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const aside = root.querySelector<HTMLElement>('[data-anim="form-aside"]');
      const panel = root.querySelector<HTMLElement>('[data-anim="form-panel"]');

      if (aside) gsap.set(aside, { opacity: 0, y: 32, filter: 'blur(2px)' });
      if (panel) gsap.set(panel, { opacity: 0, y: 28 });

      let asideIn = false;
      let panelIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.52;

        if (aside) {
          if (p >= T_ASIDE && !asideIn) {
            gsap.to(aside, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: d,
              ease: 'power3.out',
              overwrite: true,
            });
            asideIn = true;
          } else if (p < T_ASIDE && asideIn) {
            gsap.to(aside, {
              opacity: 0,
              y: 32,
              filter: 'blur(2px)',
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            asideIn = false;
          }
        }

        if (panel) {
          if (p >= T_PANEL && !panelIn) {
            gsap.to(panel, {
              opacity: 1,
              y: 0,
              duration: d,
              ease: 'power2.out',
              overwrite: true,
            });
            panelIn = true;
          } else if (p < T_PANEL && panelIn) {
            gsap.to(panel, {
              opacity: 0,
              y: 28,
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            panelIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 78%',
        end: 'bottom top',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      return () => {
        st.kill();

        clearContactFormSectionStyles(root);
      };
    });
  },
});
