import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

const ST_ID = 'numbers-section-reveal';

type CounterParts = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
};

function parseCounterValue(raw: string): CounterParts | null {
  const match = raw.match(/-?\d[\d.,\s]*/);
  if (!match) return null;

  const numericToken = match[0].trim();
  const normalized = numericToken.replace(/\s/g, '').replace(/,/g, '');
  const target = Number.parseFloat(normalized);
  if (!Number.isFinite(target)) return null;

  const dotIndex = numericToken.lastIndexOf('.');
  const decimals = dotIndex >= 0 ? numericToken.slice(dotIndex + 1).length : 0;

  return {
    prefix: raw.slice(0, match.index ?? 0),
    suffix: raw.slice((match.index ?? 0) + match[0].length),
    target,
    decimals,
  };
}

function formatCounterValue(parts: CounterParts, value: number) {
  const numberText = value.toLocaleString('en-US', {
    minimumFractionDigits: parts.decimals,
    maximumFractionDigits: parts.decimals,
  });
  return `${parts.prefix}${numberText}${parts.suffix}`;
}

function clearNumbersSectionStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });

  const counters = root.querySelectorAll<HTMLElement>('[data-numbers-counter]');
  counters.forEach((counter) => {
    const original = counter.dataset.numbersCounter;
    if (original !== undefined) counter.textContent = original;
  });

  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
}

export const initNumbersSectionAnimation = createScrollSectionController({
  rootId: 'impact',
  triggerIds: [ST_ID],
  clearStyles: clearNumbersSectionStyles,
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const meta = root.querySelector<HTMLElement>('[data-anim="meta"]');
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="stat-card"]'));
      const counters = Array.from(root.querySelectorAll<HTMLElement>('[data-numbers-counter]'));
      const counterTweens: gsap.core.Tween[] = [];

      if (meta) gsap.set(meta, { opacity: 0, x: -24 });
      if (cards.length) gsap.set(cards, { opacity: 0, y: 30, filter: 'blur(4px)' });

      const resetCounters = () => {
        counters.forEach((counter) => {
          const raw = counter.dataset.numbersCounter;
          if (!raw) return;
          counter.textContent = raw;
        });
      };

      const runCounters = () => {
        counterTweens.forEach((tween) => tween.kill());
        counterTweens.length = 0;

        counters.forEach((counter) => {
          const raw = counter.dataset.numbersCounter;
          if (!raw) return;

          const parsed = parseCounterValue(raw);
          if (!parsed) {
            counter.textContent = raw;
            return;
          }

          const state = { value: 0 };
          const tween = gsap.to(state, {
            value: parsed.target,
            duration: 1.9,
            ease: 'power3.out',
            onUpdate: () => {
              counter.textContent = formatCounterValue(parsed, state.value);
            },
            onComplete: () => {
              counter.textContent = formatCounterValue(parsed, parsed.target);
            },
          });
          counterTweens.push(tween);
        });
      };

      const revealSection = () => {
        if (meta) {
          gsap.to(meta, { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' });
        }
        if (cards.length) {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
          });
        }
        runCounters();
      };

      const hideSection = () => {
        counterTweens.forEach((tween) => tween.kill());
        counterTweens.length = 0;

        if (meta) {
          gsap.to(meta, { opacity: 0, x: -24, duration: 0.35, ease: 'power2.in' });
        }
        if (cards.length) {
          gsap.to(cards, {
            opacity: 0,
            y: 30,
            filter: 'blur(4px)',
            duration: 0.35,
            stagger: -0.08,
            ease: 'power2.in',
          });
        }
        resetCounters();
      };

      const st = ScrollTrigger.create({
        id: ST_ID,
        trigger: root,
        start: 'top 72%',
        end: 'bottom top',
        onEnter: () => {
          revealSection();
        },
        onEnterBack: () => revealSection(),
        onLeaveBack: () => hideSection(),
      });

      return () => {
        counterTweens.forEach((tween) => tween.kill());
        st.kill();
        clearNumbersSectionStyles(root);
      };
    });
  },
});
