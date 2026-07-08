import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'contact-impact-reveal';
const T_HEADLINE = 0.12;
const T_BODY = 0.28;

function clearContactImpactStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
}

export const initContactImpactSectionAnimation = createScrollSectionController({
  rootId: 'contact-impact',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const headline = root.querySelector<HTMLElement>('[data-anim="headline"]');
      const paragraphs = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="impact-p"]'));

      if (headline) gsap.set(headline, { opacity: 0, y: 36, filter: 'blur(2px)' });
      if (paragraphs.length) gsap.set(paragraphs, { opacity: 0, y: 22 });

      let headlineIn = false;
      let bodyIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.5;

        if (headline) {
          if (p >= T_HEADLINE && !headlineIn) {
            gsap.to(headline, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: d,
              ease: 'power3.out',
              overwrite: true,
            });
            headlineIn = true;
          } else if (p < T_HEADLINE && headlineIn) {
            gsap.to(headline, {
              opacity: 0,
              y: 36,
              filter: 'blur(2px)',
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            headlineIn = false;
          }
        }

        if (paragraphs.length) {
          if (p >= T_BODY && !bodyIn) {
            gsap.to(paragraphs, {
              opacity: 1,
              y: 0,
              duration: d,
              stagger: immediate ? 0 : 0.08,
              ease: 'power2.out',
              overwrite: true,
            });
            bodyIn = true;
          } else if (p < T_BODY && bodyIn) {
            gsap.to(paragraphs, {
              opacity: 0,
              y: 22,
              duration: d,
              stagger: immediate ? 0 : -0.05,
              ease: 'power2.in',
              overwrite: true,
            });
            bodyIn = false;
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

        clearContactImpactStyles(root);
      };
    });
  },
});
