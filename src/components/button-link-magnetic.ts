import gsap from 'gsap';

const SEL_ROOT = '[data-button-link-root]';
const STRENGTH = 0.32;
const MAX_SHIFT_PX = 16;
/** Seguimiento suave: evita “teletransporte” al entrar o al cruzar el botón. */
const FOLLOW_SMOOTH = 0.16;

function clamp(n: number, max: number) {
  return Math.max(-max, Math.min(max, n));
}

function bindMagneticLayer(anchor: HTMLAnchorElement, target: HTMLElement) {
  let hoverRaf = 0;
  let hovering = false;
  /** Objetivo desde el cursor (ideal). */
  let targetX = 0;
  let targetY = 0;
  /** Posición mostrada (interpola hacia el objetivo). */
  let displayX = 0;
  let displayY = 0;

  const stopHoverLoop = () => {
    if (hoverRaf) {
      cancelAnimationFrame(hoverRaf);
      hoverRaf = 0;
    }
  };

  const tick = () => {
    if (!hovering) {
      hoverRaf = 0;
      return;
    }

    displayX += (targetX - displayX) * FOLLOW_SMOOTH;
    displayY += (targetY - displayY) * FOLLOW_SMOOTH;
    gsap.set(target, { x: displayX, y: displayY, overwrite: 'auto' });

    const err = Math.hypot(targetX - displayX, targetY - displayY);
    hoverRaf = err > 0.01 ? requestAnimationFrame(tick) : 0;
  };

  const scheduleTick = () => {
    if (!hovering || hoverRaf) return;
    hoverRaf = requestAnimationFrame(tick);
  };

  const onEnter = () => {
    gsap.killTweensOf(target);
    hovering = true;
    targetX = 0;
    targetY = 0;
    displayX = 0;
    displayY = 0;
    gsap.set(target, { x: 0, y: 0, overwrite: true });
    stopHoverLoop();
  };

  const onMove = (e: MouseEvent) => {
    if (!hovering) return;
    const rect = anchor.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    targetX = clamp((e.clientX - cx) * STRENGTH, MAX_SHIFT_PX);
    targetY = clamp((e.clientY - cy) * STRENGTH, MAX_SHIFT_PX);
    scheduleTick();
  };

  const onLeave = () => {
    hovering = false;
    stopHoverLoop();

    const fromX = displayX;
    const fromY = displayY;
    targetX = 0;
    targetY = 0;
    displayX = 0;
    displayY = 0;

    gsap.killTweensOf(target);
    gsap.set(target, { x: fromX, y: fromY, overwrite: true });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // elastic.out: oscila alrededor del reposo (efecto yo-yo / muelle).
    gsap.to(target, {
      x: 0,
      y: 0,
      duration: reduced ? 0.22 : 1.05,
      ease: reduced ? 'power2.out' : 'elastic.out(1, 0.26)',
      overwrite: true,
      onComplete: () => {
        gsap.set(target, { clearProps: 'transform' });
      },
    });
  };

  anchor.addEventListener('mouseenter', onEnter);
  anchor.addEventListener('mousemove', onMove);
  anchor.addEventListener('mouseleave', onLeave);
}

/** Inicializa enlaces con `data-button-link-root` (ver ButtonLink.astro). Idempotente por ancla. */
export function initButtonLinkMagnetic() {
  if (typeof document === 'undefined') return;

  document.querySelectorAll<HTMLAnchorElement>(SEL_ROOT).forEach((anchor) => {
    if (anchor.dataset.buttonLinkMagneticBound === '1') return;
    const t = anchor.querySelector<HTMLElement>('[data-button-link]');
    if (!t) return;
    anchor.dataset.buttonLinkMagneticBound = '1';
    bindMagneticLayer(anchor, t);
  });
}
