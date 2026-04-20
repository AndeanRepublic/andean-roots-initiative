import gsap from 'gsap';

export function setupTeamControlsHover(root: HTMLElement) {
  const buttons = Array.from(root.querySelectorAll<HTMLElement>('[data-team-control-hover]'));
  const cleanups: Array<() => void> = [];

  buttons.forEach((button) => {
    const onEnter = () => {
      gsap.to(button, {
        scale: 1.08,
        y: -1,
        duration: 0.22,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const onLeave = () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    button.addEventListener('mouseenter', onEnter);
    button.addEventListener('mouseleave', onLeave);

    cleanups.push(() => {
      button.removeEventListener('mouseenter', onEnter);
      button.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(button);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
