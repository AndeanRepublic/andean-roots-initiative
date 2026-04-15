import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'about-hero-reveal';

const T_TITLE = 0.2;
const T_BREADCRUMB = 0.42;

function resetSplitText(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-hero-text-line]').forEach((el) => {
    const originalText = el.dataset.originalText;
    if (originalText !== undefined) {
      el.textContent = originalText;
    }
  });
}

function splitChars(element: HTMLElement, className: string) {
  const text = element.textContent ?? '';
  element.dataset.originalText = text;
  element.textContent = '';
  const fragment = document.createDocumentFragment();
  const nodes: HTMLElement[] = [];

  for (const char of text) {
    const span = document.createElement('span');
    span.className = className;
    span.textContent = char;
    fragment.appendChild(span);
    nodes.push(span);
  }

  element.appendChild(fragment);
  return nodes;
}

function buildTextNodes(root: HTMLElement) {
  resetSplitText(root);
  const title = root.querySelector<HTMLElement>('[data-hero-text-line]');
  return title ? splitChars(title, 'about-hero-title-char') : [];
}

function clearHeroSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });
  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
  resetSplitText(root);
}

export const initHeroSectionAnimation = createScrollSectionController({
  rootId: 'about-hero',
  triggerIds: [ST_ID],
  clearStyles: clearHeroSectionStyles,
  setup: ({ root, mm }) => {
    mm.add('all', () => {
      const media = root.querySelector<HTMLElement>('[data-anim="media"]');
      const overlay = root.querySelector<HTMLElement>('[data-anim="overlay"]');
      const breadcrumb = root.querySelector<HTMLElement>('[data-anim="breadcrumb"]');
      const crumbItems = breadcrumb
        ? Array.from(breadcrumb.querySelectorAll<HTMLElement>('[data-anim="crumb-item"], [data-anim="crumb-dot"]'))
        : [];
      const titleChars = buildTextNodes(root);

      if (media) gsap.set(media, { scale: 1.16, yPercent: 8, filter: 'saturate(0.78) contrast(0.9)' });
      if (overlay) gsap.set(overlay, { opacity: 0.72 });
      if (titleChars.length) gsap.set(titleChars, { opacity: 0, yPercent: 70, rotateZ: -2 });
      if (crumbItems.length) gsap.set(crumbItems, { opacity: 0, y: 20, filter: 'blur(2px)' });

      let titleIn = false;
      let breadcrumbIn = false;

      const handleThresholds = (p: number, immediate = false) => {
        const d = immediate ? 0 : 0.58;
        if (titleChars.length) {
          if (p >= T_TITLE && !titleIn) {
            gsap.to(titleChars, {
              opacity: 1,
              yPercent: 0,
              rotateZ: 0,
              duration: d,
              stagger: immediate ? 0 : 0.02,
              ease: 'power3.out',
            });
            titleIn = true;
          } else if (p < T_TITLE && titleIn) {
            gsap.to(titleChars, {
              opacity: 0,
              yPercent: 70,
              rotateZ: -2,
              duration: d,
              stagger: immediate ? 0 : -0.015,
              ease: 'power2.in',
            });
            titleIn = false;
          }
        }

        if (crumbItems.length) {
          if (p >= T_BREADCRUMB && !breadcrumbIn) {
            gsap.to(crumbItems, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: d,
              stagger: immediate ? 0 : 0.04,
              ease: 'power2.out',
            });
            breadcrumbIn = true;
          } else if (p < T_BREADCRUMB && breadcrumbIn) {
            gsap.to(crumbItems, {
              opacity: 0,
              y: 20,
              filter: 'blur(2px)',
              duration: d,
              stagger: immediate ? 0 : -0.03,
              ease: 'power2.in',
            });
            breadcrumbIn = false;
          }
        }

        if (media) {
          gsap.to(media, {
            scale: 1.16 - p * 0.16,
            yPercent: 8 - p * 8,
            filter: `saturate(${0.78 + p * 0.22}) contrast(${0.9 + p * 0.1})`,
            duration: immediate ? 0 : 0.35,
            overwrite: 'auto',
          });
        }

        if (overlay) {
          gsap.to(overlay, {
            opacity: 0.72 - p * 0.18,
            duration: immediate ? 0 : 0.35,
            overwrite: 'auto',
          });
        }
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 72%',
        end: 'top top',
        onUpdate: (self) => handleThresholds(self.progress),
      });

      handleThresholds(st.progress, true);

      return () => {
        st.kill();
        clearHeroSectionStyles(root);
      };
    });
  },
});
