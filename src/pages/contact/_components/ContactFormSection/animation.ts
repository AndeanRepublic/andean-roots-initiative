import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

export const initContactFormSectionAnimation = createScrollSectionController({
  rootId: 'contacto-form',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const section = root.querySelector<HTMLElement>('[data-anim="section"]');
      if (!section) return;

      gsap.set(section, { opacity: 0, y: 40 });

      const tween = gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: true,
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        section.removeAttribute('style');
      };
    });
  },
});
