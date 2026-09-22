/** Resolve when document fonts are ready (or immediately if unsupported). */
export function whenFontsReady(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve();
  if (!document.fonts?.ready) return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}
