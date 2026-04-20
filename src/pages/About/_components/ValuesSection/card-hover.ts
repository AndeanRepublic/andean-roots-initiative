import gsap from 'gsap';

export function setupValuesCardHover(root: HTMLElement) {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-values-card-tilt]'));
  const cleanups: Array<() => void> = [];

  cards.forEach((card) => {
    const onMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 16,
        rotateX: -y * 12,
        y: -4,
        transformPerspective: 850,
        transformOrigin: 'center center',
        duration: 0.24,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);

    cleanups.push(() => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(card);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
