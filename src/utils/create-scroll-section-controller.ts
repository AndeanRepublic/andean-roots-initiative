import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SetupContext = {
  root: HTMLElement;
  mm: gsap.MatchMedia;
  refresh: () => void;
};

type ScrollSectionControllerOptions = {
  rootId: string;
  triggerIds: string[];
  clearStyles?: (root: HTMLElement) => void;
  setup: (context: SetupContext) => void;
  resizeDebounceMs?: number;
  delayedRefreshMs?: number;
};

export function createScrollSectionController({
  rootId,
  triggerIds,
  clearStyles,
  setup,
  resizeDebounceMs = 250,
  delayedRefreshMs = 150,
}: ScrollSectionControllerOptions) {
  let mm: gsap.MatchMedia | null = null;
  let resizeAttached = false;

  const killTrackedTriggers = () => {
    const ids = new Set(triggerIds);
    ScrollTrigger.getAll()
      .filter((t) => ids.has((t.vars as { id?: string } | undefined)?.id ?? ''))
      .forEach((t) => t.kill());
  };

  const scheduleRefresh = () => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
    if (delayedRefreshMs > 0) {
      window.setTimeout(() => ScrollTrigger.refresh(), delayedRefreshMs);
    }
  };

  const init = () => {
    // -- Guards / Validations
    if (typeof window === 'undefined') return;

    const root = document.getElementById(rootId);
    if (!root) return;

    // -- Clean up
    mm?.revert();
    mm = null;

    killTrackedTriggers();
    clearStyles?.(root);

    // -- Setup Animation
    mm = gsap.matchMedia();
    setup({ root, mm, refresh: scheduleRefresh }); // -- Callback to setup the animation
    scheduleRefresh();

    // -- Setup Resize Listener
    // if (!resizeAttached) {
    //   resizeAttached = true;
    //   let timer: ReturnType<typeof setTimeout>;
    //   window.addEventListener('resize', () => {
    //     clearTimeout(timer);
    //     timer = setTimeout(() => init(), resizeDebounceMs);
    //   });
    // }
  };

  return init;
}
