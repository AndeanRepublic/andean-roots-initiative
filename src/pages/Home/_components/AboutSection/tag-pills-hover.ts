import gsap from 'gsap';

/**
 * Hover de los tag pills: crossfade texto/icono vía `data-tag-view` (CSS en index.astro) y tilt 3D.
 * Pills pequeños: casi solo rotación (x/y en px se leen como “deslizamiento”).
 */
export function setupAboutTagPillsHover(root: HTMLElement): () => void {
  const hasHover = window.matchMedia('(hover: hover)').matches;
  if (!hasHover) return () => {};

  const tilts = root.querySelectorAll<HTMLElement>('[data-about-tag-tilt]');
  const cleanups: (() => void)[] = [];

  tilts.forEach((el) => {
    gsap.set(el, {
      transformPerspective: 900,
      transformOrigin: 'center center',
      willChange: 'transform',
    });

    const onEnter = () => {
      el.dataset.tagView = 'icon';
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      gsap.to(el, {
        duration: 0.2,
        rotationY: dx * 11,
        rotationX: dy * -11,
        x: 0,
        y: 0,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      el.dataset.tagView = 'text';
      gsap.to(el, {
        duration: 0.45,
        rotationX: 0,
        rotationY: 0,
        x: 0,
        y: 0,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
