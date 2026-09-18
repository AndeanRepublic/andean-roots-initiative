import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const T_MARK = 0.08;
const T_QUOTE = 0.2;
const T_FOOTER = 0.36;

function clearContactQuoteStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
}

export const initContactQuoteSectionAnimation = createScrollSectionController({
  rootId: 'contact-quote',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const mark = root.querySelector<HTMLElement>('[data-anim="quote-mark"]');
      const quote = root.querySelector<HTMLElement>('[data-anim="quote-text"]');
      const footer = root.querySelector<HTMLElement>('[data-anim="quote-footer"]');

      if (mark) gsap.set(mark, { opacity: 0, scale: 0.85, rotateZ: -6 });
      if (quote) gsap.set(quote, { opacity: 0, y: 24, filter: 'blur(2px)' });
      if (footer) gsap.set(footer, { opacity: 0, y: 18 });

      let markIn = false;
      let quoteIn = false;
      let footerIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.5;

        if (mark) {
          if (p >= T_MARK && !markIn) {
            gsap.to(mark, {
              opacity: 0.9,
              scale: 1,
              rotateZ: 0,
              duration: d,
              ease: 'back.out(1.4)',
              overwrite: true,
            });
            markIn = true;
          } else if (p < T_MARK && markIn) {
            gsap.to(mark, {
              opacity: 0,
              scale: 0.85,
              rotateZ: -6,
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            markIn = false;
          }
        }

        if (quote) {
          if (p >= T_QUOTE && !quoteIn) {
            gsap.to(quote, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: d,
              ease: 'power3.out',
              overwrite: true,
            });
            quoteIn = true;
          } else if (p < T_QUOTE && quoteIn) {
            gsap.to(quote, {
              opacity: 0,
              y: 24,
              filter: 'blur(2px)',
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            quoteIn = false;
          }
        }

        if (footer) {
          if (p >= T_FOOTER && !footerIn) {
            gsap.to(footer, {
              opacity: 1,
              y: 0,
              duration: d,
              ease: 'power2.out',
              overwrite: true,
            });
            footerIn = true;
          } else if (p < T_FOOTER && footerIn) {
            gsap.to(footer, {
              opacity: 0,
              y: 18,
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            footerIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 78%',
        end: 'bottom top',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      return () => {
        st.kill();

        clearContactQuoteStyles(root);
      };
    });
  },
});
