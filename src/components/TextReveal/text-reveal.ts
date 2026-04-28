import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

interface SplitOptions {
  targetSelector?: string;
  charClassName?: string;
  trim?: boolean;
}

const DEFAULT_TARGET_SELECTOR = ':scope > *';
const DEFAULT_CHAR_CLASS = 'text-reveal-char';

export interface TextRevealSplitResult {
  chars: HTMLElement[];
  words: HTMLElement[][];
}

const splitInstancesByRoot = new WeakMap<HTMLElement, SplitText[]>();

/**
 * Split text by words and chars, preserving spacing.
 * Returns chars grouped by word for randomized word-level timelines.
 */
export function splitTextRevealWords(
  root: HTMLElement,
  options: SplitOptions = {},
): TextRevealSplitResult {
  const {
    targetSelector = DEFAULT_TARGET_SELECTOR,
    charClassName = DEFAULT_CHAR_CLASS,
    trim = true,
  } = options;
  const targets = Array.from(root.querySelectorAll<HTMLElement>(targetSelector));
  const allChars: HTMLElement[] = [];
  const words: HTMLElement[][] = [];
  const splits: SplitText[] = [];

  resetTextRevealTargets(root, targetSelector);

  targets.forEach((target) => {
    const originalText = target.textContent ?? '';
    target.dataset.textRevealOriginal = originalText;

    if (trim) {
      target.textContent = originalText.trim();
    }

    const split = SplitText.create(target, {
      type: 'words,chars',
      wordsClass: `${charClassName}-word`,
      charsClass: charClassName,
    });

    splits.push(split);

    split.words.forEach((word) => {
      const wordChars = Array.from(word.querySelectorAll<HTMLElement>(`.${charClassName}`));
      if (wordChars.length === 0) return;
      words.push(wordChars);
      allChars.push(...wordChars);
    });
  });

  splitInstancesByRoot.set(root, splits);
  return { chars: allChars, words };
}

export function resetTextRevealTargets(
  root: HTMLElement,
  targetSelector = DEFAULT_TARGET_SELECTOR,
) {
  const splits = splitInstancesByRoot.get(root);
  if (splits && splits.length > 0) {
    splits.forEach((split) => split.revert());
    splitInstancesByRoot.delete(root);
  }

  root.querySelectorAll<HTMLElement>(targetSelector).forEach((target) => {
    const original = target.dataset.textRevealOriginal;
    if (original === undefined) return;
    target.textContent = original;
    delete target.dataset.textRevealOriginal;
  });
}

interface RandomWordFlipOptions {
  position?: gsap.Position;
  wordStep?: number;
  wordJitter?: number;
  wordDuration?: number;
}

/**
 * Recreates the BasicCopy style reveal:
 * - word timelines are offset randomly
 * - chars in each word flip from random order
 */
export function addRandomWordFlipReveal(
  timeline: gsap.core.Timeline,
  words: HTMLElement[][],
  targets: HTMLElement[],
  options: RandomWordFlipOptions = {},
) {
  if (words.length === 0) return;
  const { position = '>', wordDuration = 0.4, wordStep = 0.15, wordJitter = 0.12 } = options;

  gsap.set(targets, {
    perspective: 700,
    transformStyle: 'preserve-3d',
  });

  words.forEach((chars, index) => {
    gsap.set(chars, {
      opacity: 0,
      rotationX: -90,
      transformOrigin: '50% 50% -50px',
    });

    const wordTl = gsap.timeline().to(chars, {
      rotationX: 0,
      opacity: 1,
      duration: wordDuration,
      ease: 'power3.out',
      stagger: {
        each: 0.035,
        from: 'random',
      },
    });

    const wordOffset = index * wordStep + Math.random() * wordJitter;

    if (typeof position === 'number') {
      timeline.add(wordTl, position + wordOffset);
    } else if (index === 0) {
      timeline.add(wordTl, position);
    } else {
      timeline.add(wordTl, `+=${wordStep + Math.random() * wordJitter}`);
    }
  });
}
