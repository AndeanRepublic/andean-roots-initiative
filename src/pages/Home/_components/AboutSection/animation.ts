import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { setupAboutOriginCardHover } from './origin-card-hover';
import { setupAboutTagPillsHover } from './tag-pills-hover';

gsap.registerPlugin(ScrollTrigger);

/** Umbrales de progreso del ScrollTrigger (0–1): al cruzarlos se disparan tweens, no un mapeo continuo. */
const T_LABEL = 0.06;
const T_TAGS = 0.3;
const T_IMAGE = 0.7;
const T_CARD = 0.9;

function clearAboutSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  root.querySelectorAll<HTMLElement>('[data-about-tag-tilt]').forEach((el) => {
    el.dataset.tagView = 'text';
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
}

export const initAboutSectionAnimation = createScrollSectionController({
  rootId: 'about',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const label = root.querySelector<HTMLElement>('[data-anim="label"]');
      const tagsContainer = root.querySelector<HTMLElement>('[data-anim="tags"]');
      const image = root.querySelector<HTMLElement>('[data-anim="image"]');
      const originCard = root.querySelector<HTMLElement>('[data-anim="origin-card"]');
      const originCardInner = root.querySelector<HTMLElement>('[data-anim="origin-card-inner"]');
      const tags = tagsContainer
        ? Array.from(tagsContainer.querySelectorAll<HTMLElement>('[data-anim="tag-pill"]'))
        : [];
      const cardInnerChildren = originCardInner ? Array.from(originCardInner.children) : [];

      if (label) gsap.set(label, { opacity: 0, y: 20, rotateZ: -2 });
      if (tags.length) gsap.set(tags, { opacity: 0, y: 30, scale: 0.9, rotateZ: -3 });
      if (image) {
        gsap.set(image, {
          opacity: 0,
          scale: 1.12,
          yPercent: 10,
          clipPath: 'inset(14% 0% 16% 0% round 1rem)',
          filter: 'saturate(0.65) contrast(0.88)',
        });
      }
      if (originCardInner) {
        gsap.set(originCardInner, { opacity: 0 });
        if (cardInnerChildren.length) {
          gsap.set(cardInnerChildren, { opacity: 0, y: 22 });
        }
      } else if (originCard) {
        gsap.set(originCard, { opacity: 0, y: 28 });
      }

      let labelIn = false;
      let tagsIn = false;
      let imageIn = false;
      let cardIn = false;

      const tweenDur = (immediate: boolean) => (immediate ? 0 : 0.55);

      /** Máquina de umbrales: activa/desactiva bloques según progreso de la sección. */
      const handleThresholds = (p: number, immediate = false) => {
        const d = tweenDur(immediate);

        if (label) {
          if (p >= T_LABEL && !labelIn) {
            gsap.to(label, {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              duration: d,
              ease: 'power2.out',
              overwrite: true,
            });
            labelIn = true;
          } else if (p < T_LABEL && labelIn) {
            gsap.to(label, {
              opacity: 0,
              y: 20,
              rotateZ: -2,
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            labelIn = false;
          }
        }

        if (tags.length) {
          if (p >= T_TAGS && !tagsIn) {
            gsap.to(tags, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
              duration: d,
              stagger: immediate ? 0 : 0.06,
              ease: 'power2.out',
              overwrite: true,
            });
            tagsIn = true;
          } else if (p < T_TAGS && tagsIn) {
            gsap.to(tags, {
              opacity: 0,
              y: 30,
              scale: 0.9,
              rotateZ: -3,
              duration: d,
              stagger: immediate ? 0 : -0.05,
              ease: 'power2.in',
              overwrite: true,
            });
            tagsIn = false;
          }
        }

        if (image) {
          if (p >= T_IMAGE && !imageIn) {
            gsap.to(image, {
              opacity: 1,
              scale: 1,
              yPercent: 0,
              clipPath: 'inset(0% 0% 0% 0% round 1rem)',
              filter: 'saturate(1) contrast(1)',
              duration: d,
              ease: 'power2.out',
              overwrite: true,
            });
            imageIn = true;
          } else if (p < T_IMAGE && imageIn) {
            gsap.to(image, {
              opacity: 0,
              scale: 1.12,
              yPercent: 10,
              clipPath: 'inset(14% 0% 16% 0% round 1rem)',
              filter: 'saturate(0.65) contrast(0.88)',
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            imageIn = false;
          }
        }

        if (originCardInner && cardInnerChildren.length) {
          if (p >= T_CARD && !cardIn) {
            gsap.to(originCardInner, {
              opacity: 1,
              duration: d,
              ease: 'power2.out',
              overwrite: true,
            });
            gsap.to(cardInnerChildren, {
              opacity: 1,
              y: 0,
              duration: d,
              stagger: immediate ? 0 : 0.08,
              ease: 'power2.out',
              overwrite: true,
            });
            cardIn = true;
          } else if (p < T_CARD && cardIn) {
            gsap.to(originCardInner, {
              opacity: 0,
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            gsap.to(cardInnerChildren, {
              opacity: 0,
              y: 22,
              duration: d,
              stagger: immediate ? 0 : -0.06,
              ease: 'power2.in',
              overwrite: true,
            });
            cardIn = false;
          }
        } else if (originCard) {
          if (p >= T_CARD && !cardIn) {
            gsap.to(originCard, {
              opacity: 1,
              y: 0,
              duration: d,
              ease: 'power2.out',
              overwrite: true,
            });
            cardIn = true;
          } else if (p < T_CARD && cardIn) {
            gsap.to(originCard, {
              opacity: 0,
              y: 28,
              duration: d,
              ease: 'power2.in',
              overwrite: true,
            });
            cardIn = false;
          }
        }
      };

      // -- ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 70%',
        end: 'top top',
        onUpdate: (self) => {
          handleThresholds(self.progress, false);
        },
      });

      handleThresholds(st.progress, false);

      const cleanupTagPillHover = setupAboutTagPillsHover(root);
      const cleanupOriginCardHover = setupAboutOriginCardHover(root);

      return () => {
        st.kill();
        cleanupTagPillHover();
        cleanupOriginCardHover();

        clearAboutSectionStyles(root);
      };
    });
  },
});
