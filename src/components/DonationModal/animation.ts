import gsap from 'gsap';

export type Direction = 'forward' | 'back';

/** Slide current step content out, then call `onComplete` to update state. */
export function animateStepOut(
  el: HTMLElement,
  direction: Direction,
  onComplete: () => void,
): void {
  gsap.to(el, {
    x: direction === 'forward' ? -48 : 48,
    opacity: 0,
    duration: 0.22,
    ease: 'power2.in',
    onComplete,
  });
}

/** Slide new step content in after React has mounted it. */
export function animateStepIn(el: HTMLElement, direction: Direction): void {
  gsap.fromTo(
    el,
    { x: direction === 'forward' ? 48 : -48, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.28, ease: 'power2.out' },
  );
}

/** Entrance animation for the modal card on mount. */
export function animateModalIn(el: HTMLElement): void {
  gsap.fromTo(
    el,
    { y: 28, opacity: 0, scale: 0.97 },
    { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' },
  );
}

/** Exit animation for the modal card, then calls `onComplete` to unmount. */
export function animateModalOut(el: HTMLElement, onComplete: () => void): void {
  gsap.to(el, {
    y: 20,
    opacity: 0,
    scale: 0.97,
    duration: 0.25,
    ease: 'power2.in',
    onComplete,
  });
}
