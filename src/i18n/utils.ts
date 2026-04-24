import type { Locale } from './locales';
import es from './translations/es';
import en from './translations/en';

const translations = { es, en } as const;

export function useTranslations(lang: Locale) {
  return translations[lang];
}

/**
 * Swaps the locale prefix in a URL path.
 * e.g. getAlternateUrl('/es/About', 'en') → '/en/About'
 */
export function getAlternateUrl(url: string, targetLang: Locale): string {
  return url.replace(/^\/(es|en)(\/|$)/, `/${targetLang}$2`);
}
