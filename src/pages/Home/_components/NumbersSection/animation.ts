import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

/** Same cut as Copy: desktop trigger starts at 1025. */
const DK_MIN = 1025;
/** Desktop: after the paragraph Copy (`delay` 1 + `duration` 0.9). */
const NUMBERS_DELAY_DK = 1;

type CounterParts = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
};

/** Extrae prefijo/sufijo/valor numérico para animar counters con formatos como 100%, 5+, S/.50 000+. */
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
  setup: ({ root, mm }) => {
    const meta = root.querySelector<HTMLElement>('[data-anim="meta"]');
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="stat-card"]'));
    const counters = Array.from(root.querySelectorAll<HTMLElement>('[data-numbers-counter]'));
    const counterTweens = new Map<HTMLElement, gsap.core.Tween>();

    const setInitialState = () => {
      if (meta) gsap.set(meta, { opacity: 0, x: -24 });
      if (cards.length) gsap.set(cards, { opacity: 0, y: 30, filter: 'blur(4px)' });
    };

    /** Restablece texto base para replay limpio cuando la sección sale por arriba. */
    const resetCounter = (counter: HTMLElement) => {
      const raw = counter.dataset.numbersCounter;
      if (!raw) return;
      counter.textContent = raw;
    };

    /** Recorre cada stat y anima el número desde 0 hasta su target formateado. */
    const animateCounter = (counter: HTMLElement, duration = 1.9) => {
      counterTweens.get(counter)?.kill();
      counterTweens.delete(counter);

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
        duration,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: () => {
          counter.textContent = formatCounterValue(parsed, state.value);
        },
        onComplete: () => {
          counter.textContent = formatCounterValue(parsed, parsed.target);
        },
      });
      counterTweens.set(counter, tween);
    };

    const stopAllCounters = () => {
      counterTweens.forEach((tween) => tween.kill());
      counterTweens.clear();
    };

    mm.add(`(min-width: ${DK_MIN}px)`, () => {
      setInitialState();
      let pending: gsap.core.Tween | null = null;
      let numbersIn = false;

      const revealIcon = () => {
        if (!meta) return;
        gsap.to(meta, { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out', overwrite: true });
      };

      const revealNumbers = () => {
        if (cards.length) {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.65,
            stagger: 0.12,
            ease: 'power2.out',
            overwrite: true,
          });
        }
        counters.forEach((counter) => animateCounter(counter, 1.9));
        numbersIn = true;
      };

      /** Salida al hacer scroll hacia atrás para permitir replay del count-up. */
      const hideSection = () => {
        pending?.kill();
        pending = null;
        stopAllCounters();
        if (meta) {
          gsap.to(meta, { opacity: 0, x: -24, duration: 0.35, ease: 'power2.in', overwrite: true });
        }
        if (numbersIn && cards.length) {
          gsap.to(cards, {
            opacity: 0,
            y: 30,
            filter: 'blur(4px)',
            duration: 0.35,
            stagger: -0.08,
            ease: 'power2.in',
            overwrite: true,
          });
        }
        numbersIn = false;
        counters.forEach((counter) => resetCounter(counter));
      };

      const st = ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        onEnter: () => {
          revealIcon();
          pending?.kill();
          pending = gsap.delayedCall(NUMBERS_DELAY_DK, revealNumbers);
        },
        onEnterBack: () => {
          revealIcon();
          pending?.kill();
          pending = gsap.delayedCall(NUMBERS_DELAY_DK, revealNumbers);
        },
        onLeaveBack: hideSection,
      });

      return () => {
        pending?.kill();
        stopAllCounters();
        st.kill();
        clearNumbersSectionStyles(root);
      };
    });

    mm.add(`(max-width: ${DK_MIN - 1}px)`, () => {
      setInitialState();

      const metaTrigger = ScrollTrigger.create({
        trigger: meta ?? root,
        start: 'top 80%',
        onEnter: () => {
          if (meta)
            gsap.to(meta, {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: true,
            });
        },
        onEnterBack: () => {
          if (meta)
            gsap.to(meta, {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: 'power2.out',
              overwrite: true,
            });
        },
        onLeaveBack: () => {
          if (meta)
            gsap.to(meta, {
              opacity: 0,
              x: -24,
              duration: 0.3,
              ease: 'power2.in',
              overwrite: true,
            });
        },
      });

      /** En mobile/tablet cada stat card entra con su propio trigger de viewport. */
      const cardTriggers = cards.map((card) => {
        const counter = card.querySelector<HTMLElement>('[data-numbers-counter]');

        return ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          end: 'bottom 18%',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.45,
              ease: 'power2.out',
              overwrite: true,
            });
            if (counter) animateCounter(counter, 1.35);
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.4,
              ease: 'power2.out',
              overwrite: true,
            });
            if (counter) animateCounter(counter, 1.2);
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              y: 30,
              filter: 'blur(4px)',
              duration: 0.28,
              ease: 'power2.in',
              overwrite: true,
            });
            if (counter) {
              counterTweens.get(counter)?.kill();
              counterTweens.delete(counter);
              resetCounter(counter);
            }
          },
        });
      });

      return () => {
        stopAllCounters();
        metaTrigger.kill();
        cardTriggers.forEach((trigger) => trigger.kill());
        clearNumbersSectionStyles(root);
      };
    });
  },
});
