import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars } from '../../../../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

const T_TITLE = 0.14;
const T_DESCRIPTION = 0.25;
const T_STATS = 0.35;

function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-programs-intro-text-line]');
  const titleParts = Array.from(
    root.querySelectorAll<HTMLElement>('[data-programs-intro-text-line]'),
  );
  return titleParts.flatMap((item) => splitChars(item, 'programs-intro-title-char'));
}

function clearProgramsIntroStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-programs-intro-text-line]');
}

export const initProgramsIntroSectionAnimation = createScrollSectionController({
  rootId: 'programs-intro',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const titleChars = buildTextNodes(root);
      const description = root.querySelector<HTMLElement>('[data-anim="description"]');
      const statItems = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="stat-item"]'));

      if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 45 });
      if (description) gsap.set(description, { opacity: 0, y: 24, filter: 'blur(2px)' });
      if (statItems.length) {
        gsap.set(statItems, {
          opacity: 0,
          y: 28,
          scale: 0.96,
        });
      }

      let titleIn = false;
      let descriptionIn = false;
      let statsIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.52;

        if (titleChars.length) {
          if (p >= T_TITLE && !titleIn) {
            gsap.to(titleChars, {
              opacity: 1,
              yPercent: 0,
              duration: d,
              stagger: immediate ? 0 : 0.012,
              ease: 'power3.out',
              overwrite: true,
            });
            titleIn = true;
          } else if (p < T_TITLE && titleIn) {
            gsap.to(titleChars, {
              opacity: 0,
              yPercent: 45,
              duration: d,
              stagger: immediate ? 0 : -0.01,
              ease: 'power2.in',
              overwrite: true,
            });
            titleIn = false;
          }
        }

        if (description) {
          if (p >= T_DESCRIPTION && !descriptionIn) {
            gsap.to(description, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: d,
              ease: 'power2.out',
              overwrite: true,
            });
            descriptionIn = true;
          } else if (p < T_DESCRIPTION && descriptionIn) {
            gsap.to(description, {
              opacity: 0,
              y: 24,
              filter: 'blur(2px)',
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            descriptionIn = false;
          }
        }

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
