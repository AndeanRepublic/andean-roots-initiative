import gsap from 'gsap';

export function setupPartnerLogosHover(root: HTMLElement) {
  const logos = Array.from(root.querySelectorAll<HTMLElement>('[data-partner-logo-hover]'));
  const cleanups: Array<() => void> = [];

  logos.forEach((logo) => {
    const onEnter = () => {
      gsap.to(logo, {
        y: -3,
        scale: 1.03,
        duration: 0.22,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(logo, {
        y: 0,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    logo.addEventListener('mouseenter', onEnter);
    logo.addEventListener('mouseleave', onLeave);

    cleanups.push(() => {
      logo.removeEventListener('mouseenter', onEnter);
      logo.removeEventListener('mouseleave', onLeave);
      gsap.killTweensOf(logo);
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}
