import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScrollSectionController } from '../../../../utils/create-scroll-section-controller';

gsap.registerPlugin(ScrollTrigger);

/** Same start as the intro Copy blocks. */
const COPY_START = 'top 80%';

/** Fallbacks matching the intro Copy props if `data-copy-options` is missing. */
const TITLE_TIMING = { delay: 0, duration: 0.9, stagger: 0.2 };
const DESCRIPTION_TIMING = { delay: 2.3, duration: 0.9, stagger: 0.1 };

/** Breath after the last text unit so the count-up does not overlap the copy. */
const AFTER_TEXT = 0.12;

type CopyTiming = {
  delay: number;
  duration: number;
  stagger: number;
};

type CounterParts = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
};

function parseCounterValue(raw: string): CounterParts | null {
  const match = raw.match(/-?\d[\d.,\s]*/);
  if (!match || match.index === undefined) return null;

  const numericToken = match[0].trim();
  const normalized = numericToken.replace(/\s/g, '').replace(/,/g, '');
  const target = Number.parseFloat(normalized);
  if (!Number.isFinite(target)) return null;

  const dotIndex = numericToken.lastIndexOf('.');
  const decimals = dotIndex >= 0 ? numericToken.slice(dotIndex + 1).replace(/\s/g, '').length : 0;

  return {
    prefix: raw.slice(0, match.index),
    suffix: raw.slice(match.index + match[0].length),
    target,
    decimals,
  };
}

function formatCounterValue(parts: CounterParts, value: number) {
  const rounded = parts.decimals > 0 ? value : Math.round(value);
  const numberText = rounded.toLocaleString('en-US', {
    minimumFractionDigits: parts.decimals,
    maximumFractionDigits: parts.decimals,
  });
  return `${parts.prefix}${numberText}${parts.suffix}`;
}

function copyTrigger(el: HTMLElement | null, fallback: HTMLElement) {
  return el?.parentElement ?? el ?? fallback;
}

/** Reads the live Copy delay/duration/stagger so the count-up stays behind the text. */
function readCopyTiming(el: HTMLElement | null, fallback: CopyTiming): CopyTiming {
  const raw = el?.parentElement?.getAttribute('data-copy-options');
  if (!raw) return fallback;

  try {
    const options = JSON.parse(raw) as {
      delay?: number;
      delayMobile?: number | null;
      delayTablet?: number | null;
      duration?: number | null;
      stagger?: number | null;
    };
    const width = window.innerWidth;
    let delay = typeof options.delay === 'number' ? options.delay : fallback.delay;
    if (width < 440 && typeof options.delayMobile === 'number') delay = options.delayMobile;
    else if (width >= 440 && width < 1025) {
      if (typeof options.delayTablet === 'number') delay = options.delayTablet;
      else if (typeof options.delayMobile === 'number') delay = options.delayMobile;
    }

    return {
      delay,
      duration: typeof options.duration === 'number' ? options.duration : fallback.duration,
      stagger: typeof options.stagger === 'number' ? options.stagger : fallback.stagger,
    };
  } catch {
    return fallback;
  }
}

function unitCount(el: HTMLElement, selector: string, fallback: number) {
  const split = el.querySelectorAll(selector).length;
  return split > 0 ? split : fallback;
}

function wordFallback(el: HTMLElement) {
  return el.textContent?.trim().split(/\s+/).filter(Boolean).length ?? 1;
}

function lineFallback(el: HTMLElement) {
  const lineHeight = Number.parseFloat(getComputedStyle(el).lineHeight);
  const height = el.getBoundingClientRect().height;
  if (!Number.isFinite(lineHeight) || lineHeight <= 0 || height <= 0) return 1;
  return Math.max(1, Math.round(height / lineHeight));
}

/** End time from Copy's onEnter: its delay, plus duration, plus stagger across units. */
function revealEnd(count: number, delay: number, duration: number, stagger: number) {
  return delay + duration + Math.max(0, count - 1) * stagger + AFTER_TEXT;
}

function clearProgramsIntroStyles(root: HTMLElement) {
  root.querySelectorAll('[data-anim], [data-anim] *').forEach((el) => {
    (el as HTMLElement).removeAttribute('style');
  });

  root.querySelectorAll<HTMLElement>('[data-programs-counter]').forEach((counter) => {
    const original = counter.dataset.programsCounter;
    if (original !== undefined) counter.textContent = original;
  });

  gsap.killTweensOf(gsap.utils.toArray(root.querySelectorAll('[data-anim], [data-anim] *')));
}

export const initProgramsIntroSectionAnimation = createScrollSectionController({
  rootId: 'programs-intro',
  setup: ({ root, mm }) => {
    mm.add('(min-width: 0px)', () => {
      const title = root.querySelector<HTMLElement>('#programs-intro-heading');
      const description = root.querySelector<HTMLElement>('[data-programs-intro="description"]');
      const statItems = Array.from(root.querySelectorAll<HTMLElement>('[data-anim="stat-item"]'));
      const counters = Array.from(root.querySelectorAll<HTMLElement>('[data-programs-counter]'));
      const counterTweens = new Map<HTMLElement, gsap.core.Tween>();
      const counterDelays: gsap.core.Tween[] = [];

      if (statItems.length) {
        gsap.set(statItems, { opacity: 0, y: 28, scale: 0.96 });
      }

      let titleDone = !title;
      let descriptionDone = !description;
      let titleClock: gsap.core.Tween | null = null;
      let descriptionClock: gsap.core.Tween | null = null;
      let statsIn = false;

      const clearCounterDelays = () => {
        counterDelays.forEach((tween) => tween.kill());
        counterDelays.length = 0;
      };

      const stopCounters = () => {
        clearCounterDelays();
        counterTweens.forEach((tween) => tween.kill());
        counterTweens.clear();
      };

      const animateCounter = (counter: HTMLElement) => {
        counterTweens.get(counter)?.kill();
        counterTweens.delete(counter);

        const raw = counter.dataset.programsCounter;
        if (!raw) return;

        const parsed = parseCounterValue(raw);
        if (!parsed) {
          counter.textContent = raw;
          return;
        }

        counter.textContent = formatCounterValue(parsed, 0);
        const state = { value: 0 };
        const duration = parsed.target >= 100 ? 1.35 : 0.8;
        const tween = gsap.to(state, {
          value: parsed.target,
          duration,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: () => {
            counter.textContent = formatCounterValue(parsed, state.value);
          },
          onComplete: () => {
            counter.textContent = formatCounterValue(parsed, parsed.target);
            counterTweens.delete(counter);
          },
        });
        counterTweens.set(counter, tween);
      };

      const hideStats = () => {
        if (!statsIn) return;
        statsIn = false;
        stopCounters();
        counters.forEach((counter) => {
          const raw = counter.dataset.programsCounter;
          if (raw !== undefined) counter.textContent = raw;
        });
        if (statItems.length) {
          gsap.to(statItems, {
            opacity: 0,
            y: 28,
            scale: 0.96,
            duration: 0.35,
            stagger: -0.04,
            ease: 'power2.in',
            overwrite: true,
          });
        }
      };

      const revealStats = () => {
        if (statsIn || !titleDone || !descriptionDone) return;
        statsIn = true;
        clearCounterDelays();

        if (statItems.length) {
          gsap.to(statItems, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.52,
            stagger: 0.08,
            ease: 'power2.out',
            overwrite: true,
          });
        }

        counters.forEach((counter, index) => {
          const delay = gsap.delayedCall(index * 0.08, () => {
            if (statsIn) animateCounter(counter);
          });
          counterDelays.push(delay);
        });
      };

      const startTitleClock = () => {
        if (!title || titleDone || titleClock) return;
        const words = unitCount(title, '.word', wordFallback(title));
        const timing = readCopyTiming(title, TITLE_TIMING);
        titleClock = gsap.delayedCall(
          revealEnd(words, timing.delay, timing.duration, timing.stagger),
          () => {
            titleClock = null;
            titleDone = true;
            revealStats();
          },
        );
      };

      const startDescriptionClock = () => {
        if (!description || descriptionDone || descriptionClock) return;
        const lines = unitCount(description, '.line', lineFallback(description));
        const timing = readCopyTiming(description, DESCRIPTION_TIMING);
        descriptionClock = gsap.delayedCall(
          revealEnd(lines, timing.delay, timing.duration, timing.stagger),
          () => {
            descriptionClock = null;
            descriptionDone = true;
            revealStats();
          },
        );
      };

      const cancelTitleClock = () => {
        titleClock?.kill();
        titleClock = null;
        if (title) titleDone = false;
      };

      const cancelDescriptionClock = () => {
        descriptionClock?.kill();
        descriptionClock = null;
        if (description) descriptionDone = false;
      };

      const titleTrigger = ScrollTrigger.create({
        trigger: copyTrigger(title, root),
        start: COPY_START,
        onEnter: startTitleClock,
        onEnterBack: startTitleClock,
        onLeaveBack: () => {
          cancelTitleClock();
          hideStats();
        },
      });

      const descriptionTrigger = ScrollTrigger.create({
        trigger: copyTrigger(description, root),
        start: COPY_START,
        onEnter: startDescriptionClock,
        onEnterBack: startDescriptionClock,
        onLeaveBack: () => {
          cancelDescriptionClock();
          hideStats();
        },
      });

      if (titleTrigger.isActive) startTitleClock();
      if (descriptionTrigger.isActive) startDescriptionClock();

      return () => {
        cancelTitleClock();
        cancelDescriptionClock();
        stopCounters();
        titleTrigger.kill();
        descriptionTrigger.kill();
        clearProgramsIntroStyles(root);
      };
    });
  },
});
