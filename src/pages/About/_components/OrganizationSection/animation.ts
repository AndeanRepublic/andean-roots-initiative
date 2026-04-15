import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';
import { resetSplitText, splitChars, splitWords } from '../../../../utils/split-text';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'about-organization-reveal';
const T_HEADER = 0.12;
const T_COVER = 0.28;
const T_POINTS = 0.48;

function buildTextNodes(root: HTMLElement) {
  resetSplitText(root, '[data-organization-text-line], [data-organization-text-words]');
  const title = root.querySelector<HTMLElement>('[data-organization-text-line]');
  const descriptions = Array.from(root.querySelectorAll<HTMLElement>('[data-organization-text-words]'));
  return {
    titleChars: title ? splitChars(title, 'about-organization-title-char') : [],
    descriptionWords: descriptions.flatMap((line) => splitWords(line, 'about-organization-word')),
  };
}

function clearOrganizationSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root, '[data-organization-text-line], [data-organization-text-words]');
}

export const initOrganizationSectionAnimation = createScrollSectionController({
  rootId: 'about-organization',
  triggerIds: [ST_ID],
  clearStyles: clearOrganizationSectionStyles,
  setup: ({ root, mm }) => {
    mm.add('all', () => {
      const label = root.querySelector<HTMLElement>('[data-anim="label"]');
      const coverImage = root.querySelector<HTMLElement>('[data-anim="cover-image"]');
      const pointCards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="point-card"]'));
      const pointIcons = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="point-icon"]'));
      const { titleChars, descriptionWords } = buildTextNodes(root);

      if (label) gsap.set(label, { opacity: 0, x: -22 });
      if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 40 });
      if (coverImage) {
        gsap.set(coverImage, {
          opacity: 0,
          scale: 1.1,
          clipPath: 'inset(10% 10% 10% 10% round 1rem)',
        });
      }
      if (pointCards.length) gsap.set(pointCards, { opacity: 0, y: 42, rotateZ: 1.5 });
      if (pointIcons.length) gsap.set(pointIcons, { rotate: -10, scale: 0.86 });
      if (descriptionWords.length) gsap.set(descriptionWords, { opacity: 0.2, y: 10 });

      let headerIn = false;
      let coverIn = false;
      let pointsIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.56;

        if (p >= T_HEADER && !headerIn) {
          if (label) gsap.to(label, { opacity: 1, x: 0, duration: d, ease: 'power2.out' });
          if (titleChars.length) {
            gsap.to(titleChars, {
              opacity: 1,
              yPercent: 0,
              duration: d,
              stagger: immediate ? 0 : 0.014,
              ease: 'power2.out',
            });
          }
          headerIn = true;
        } else if (p < T_HEADER && headerIn) {
          if (label) gsap.to(label, { opacity: 0, x: -22, duration: d, ease: 'power2.in' });
          if (titleChars.length) {
            gsap.to(titleChars, {
              opacity: 0,
              yPercent: 40,
              duration: d,
              stagger: immediate ? 0 : -0.01,
              ease: 'power2.in',
            });
          }
          headerIn = false;
        }

        if (coverImage) {
          if (p >= T_COVER && !coverIn) {
            gsap.to(coverImage, {
              opacity: 1,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 1rem)',
              duration: d,
              ease: 'power3.out',
            });
            coverIn = true;
          } else if (p < T_COVER && coverIn) {
            gsap.to(coverImage, {
              opacity: 0,
              scale: 1.1,
              clipPath: 'inset(10% 10% 10% 10% round 1rem)',
              duration: d,
              ease: 'power2.in',
            });
            coverIn = false;
          }
        }

        if (pointCards.length) {
          if (p >= T_POINTS && !pointsIn) {
            gsap.to(pointCards, {
              opacity: 1,
              y: 0,
              rotateZ: 0,
              duration: d,
              stagger: immediate ? 0 : 0.1,
              ease: 'power3.out',
            });
            gsap.to(pointIcons, {
              rotate: 0,
              scale: 1,
              duration: d,
              stagger: immediate ? 0 : 0.08,
              ease: 'back.out(1.4)',
            });
            if (descriptionWords.length) {
              gsap.to(descriptionWords, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: immediate ? 0 : 0.003,
                ease: 'power2.out',
              });
            }
            pointsIn = true;
          } else if (p < T_POINTS && pointsIn) {
            gsap.to(pointCards, {
              opacity: 0,
              y: 42,
              rotateZ: 1.5,
              duration: d,
              stagger: immediate ? 0 : -0.08,
              ease: 'power2.in',
            });
            gsap.to(pointIcons, {
              rotate: -10,
              scale: 0.86,
              duration: d,
              stagger: immediate ? 0 : -0.06,
              ease: 'power2.in',
            });
            if (descriptionWords.length) {
              gsap.to(descriptionWords, {
                opacity: 0.2,
                y: 10,
                duration: 0.2,
                stagger: immediate ? 0 : -0.002,
                ease: 'power2.in',
              });
            }
            pointsIn = false;
          }
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 66%',
        end: 'bottom 20%',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      return () => {
        st.kill();
        clearOrganizationSectionStyles(root);
      };
    });
  },
});
