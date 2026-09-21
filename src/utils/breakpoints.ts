/**
 * Breakpoints aligned with `src/styles/figma_var.css` (`mb`, `tb`, `dk`, `dk-lg`).
 * Use only in the browser (client scripts / islands).
 */

export const BREAKPOINT_QUERIES = {
  /** Viewport width < 744px */
  mb: '(max-width: 743px)',
  /** 744px ≤ width < 1200px */
  tb: '(min-width: 744px) and (max-width: 1199px)',
  /** width ≥ 1200px */
  dk: '(min-width: 1200px)',
  /** width ≥ 1700px */
  dkLg: '(min-width: 1700px)',
} as const;

export type BreakpointFlags = {
  isMb: boolean;
  isTb: boolean;
  isDk: boolean;
  isDkLg: boolean;
  isSmallScreen: boolean;
  isBigScreen: boolean;
};

export function getBreakpointFlags(): BreakpointFlags {
  if (typeof window === 'undefined') {
    return {
      isMb: false,
      isTb: false,
      isDk: false,
      isDkLg: false,
      isSmallScreen: false,
      isBigScreen: false,
    };
  }

  const isMb = window.matchMedia(BREAKPOINT_QUERIES.mb).matches;
  const isTb = window.matchMedia(BREAKPOINT_QUERIES.tb).matches;
  const isDk = window.matchMedia(BREAKPOINT_QUERIES.dk).matches;
  const isDkLg = window.matchMedia(BREAKPOINT_QUERIES.dkLg).matches;

  return {
    isMb,
    isTb,
    isDk,
    isDkLg,
    isSmallScreen: isMb || isTb,
    isBigScreen: isDk || isDkLg,
  };
}

/**
 * Subscribe to viewport changes; callback runs when any tracked breakpoint may have changed.
 * Returns an unsubscribe function.
 */
export function subscribeBreakpoints(onChange: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const mediaQueries = [
    window.matchMedia(BREAKPOINT_QUERIES.mb),
    window.matchMedia(BREAKPOINT_QUERIES.tb),
    window.matchMedia(BREAKPOINT_QUERIES.dk),
    window.matchMedia(BREAKPOINT_QUERIES.dkLg),
  ];

  const handler = () => {
    onChange();
  };

  mediaQueries.forEach((mq) => mq.addEventListener('change', handler));

  return () => {
    mediaQueries.forEach((mq) => mq.removeEventListener('change', handler));
  };
}
