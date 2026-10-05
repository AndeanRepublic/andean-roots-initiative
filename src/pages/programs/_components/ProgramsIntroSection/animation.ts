import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const T_STATS = 0.35;

function clearProgramsIntroStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
}

export const initProgramsIntroSectionAnimation = createScrollSectionController({
  rootId: 'programs-intro',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const statItems = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="stat-item"]'));

      if (statItems.length) {
        gsap.set(statItems, {
          opacity: 0,
          y: 28,
          scale: 0.96,
        });
      }

      let statsIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.52;

        if (statItems.length) {
          if (p >= T_STATS && !statsIn) {
            gsap.to(statItems, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: d,
              stagger: immediate ? 0 : 0.06,
              ease: 'power2.out',
              overwrite: true,
            });
            statsIn = true;
          } else if (p < T_STATS && statsIn) {
            gsap.to(statItems, {
              opacity: 0,
              y: 28,
              scale: 0.96,
              duration: d,
              stagger: immediate ? 0 : -0.04,
              ease: 'power2.in',
              overwrite: true,
            });
            statsIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 76%',
        end: 'bottom top',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      return () => {
        st.kill();

        clearProgramsIntroStyles(root);
      };
    });
  },
});
