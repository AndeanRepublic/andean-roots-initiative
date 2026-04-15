import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);
CustomEase.create('hop', '0.9, 0, 0.1, 1');

/** Hero intro reveal with safe re-init for astro:page-load navigation. */
export const initHomeHeroIntroAnimation = () => {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;

  const heroBg = hero.querySelector<HTMLElement>('[data-anim="bg"]');
  const heroImg = hero.querySelector<HTMLElement>('[data-anim="bg-image"]');
  const titleLines = Array.from(hero.querySelectorAll<HTMLElement>('[data-anim="title-line"]'));
  const subtitle = hero.querySelector<HTMLElement>('[data-anim="subtitle"]');
  const cta = hero.querySelector<HTMLElement>('[data-anim="cta"]');
  const scrollHint = hero.querySelector<HTMLElement>('[data-anim="scroll"]');

  const targets = [titleLines, subtitle, cta, scrollHint].flatMap((target) =>
    target ? Array.from(target instanceof Array ? target : [target]) : [],
  );

  if (!heroBg || !heroImg || targets.length === 0) return;

  const siteHeader = document.querySelector<HTMLElement>('[data-hero-header]');
  const revealTargets = [heroBg, heroImg, ...(siteHeader ? [siteHeader] : [])];

  gsap.killTweensOf([...revealTargets, ...targets]);
  gsap.set(targets, { clearProps: 'all' });
  gsap.set(heroBg, { clearProps: 'clipPath' });
  gsap.set(heroImg, { clearProps: 'transform' });
  if (siteHeader) gsap.set(siteHeader, { clearProps: 'opacity,transform' });

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

  // Hero background reveal phase 1.
  tl.to(heroBg, {
    clipPath: 'polygon(35% 35%, 65% 35%, 65% 65%, 35% 65%)',
    duration: 1.5,
    ease: 'hop',
  });
  tl.to(
    heroImg,
    {
      scale: 0.4,
      duration: 1.5,
      ease: 'hop',
    },
    '<',
  );

  // Hero background reveal phase 2.
  tl.to(
    heroBg,
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 2,
      ease: 'hop',
    },
    '>',
  );
  tl.to(
    heroImg,
    {
      scale: 1,
      duration: 2,
      ease: 'hop',
    },
    '<',
  );

  if (siteHeader) {
    tl.to(siteHeader, { opacity: 1, y: 0, duration: 1 });
  }

  tl.fromTo(targets, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.05 }, '<');

  if (scrollHint) {
    tl.fromTo(scrollHint, { opacity: 0 }, { opacity: 1, duration: 0.45 }, '-=0.25');
  }
};
