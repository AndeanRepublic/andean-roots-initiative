import gsap from 'gsap';

export function setupProgramCardsHover(root: HTMLElement) {
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-program-card-hover]'));
  const cleanups: Array<() => void> = [];

  cards.forEach((card) => {
    const onMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 5,
        rotateX: -y * 4,
        y: -2,
        transformPerspective: 900,
        transformOrigin: 'center center',
        duration: 0.24,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        duration: 0.26,
        ease: 'power2.out',
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
