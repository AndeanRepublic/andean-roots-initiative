import gsap from 'gsap';

/** Hover 3D de la card “El origen del cambio” (`[data-anim="origin-card-inner"]`). */
export function setupAboutOriginCardHover(root: HTMLElement): () => void {
  const hasHover = window.matchMedia('(hover: hover)').matches;
  const originCardInner = root.querySelector<HTMLElement>('[data-anim="origin-card-inner"]');
  if (!originCardInner || !hasHover) return () => {};

  gsap.set(originCardInner, {
    transformPerspective: 900,
    transformOrigin: 'center center',
    willChange: 'transform',
  });

  const onMove = (event: PointerEvent) => {
    const rect = originCardInner.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    gsap.to(originCardInner, {
      duration: 0.2,
      rotationY: dx * 6,
      rotationX: dy * -6,
      x: dx * 6,
      y: dy * 3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const onLeave = () => {
    gsap.to(originCardInner, {
      duration: 0.45,
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  originCardInner.addEventListener('pointermove', onMove);
  originCardInner.addEventListener('pointerleave', onLeave);

  return () => {
    originCardInner.removeEventListener('pointermove', onMove);
    originCardInner.removeEventListener('pointerleave', onLeave);
  };
}
