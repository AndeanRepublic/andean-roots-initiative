import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const T_CARDS = 0.18;

function clearContactChannelsStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
}

export const initContactChannelsSectionAnimation = createScrollSectionController({
  rootId: 'canales',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="channel-card"]'));

      if (cards.length) {
        gsap.set(cards, {
          opacity: 0,
          y: 28,
          scale: 0.97,
          rotateZ: (i: number) => (i % 2 === 0 ? -1.2 : 1.2),
        });
      }

      let cardsIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.48;

        if (cards.length) {
          if (p >= T_CARDS && !cardsIn) {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: d,
              stagger: immediate ? 0 : 0.1,
              ease: 'power3.out',
              overwrite: true,
            });
            cardsIn = true;
          } else if (p < T_CARDS && cardsIn) {
            gsap.to(cards, {
              opacity: 0,
              y: 28,
              scale: 0.97,
              rotateZ: (i: number) => (i % 2 === 0 ? -1.2 : 1.2),
              duration: d,
              stagger: immediate ? 0 : -0.06,
              ease: 'power2.in',
              overwrite: true,
            });
            cardsIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        end: 'bottom top',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      return () => {
        st.kill();

        clearContactChannelsStyles(root);
      };
    });
  },
});
