// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import lenis from 'astro-lenis';
import react from '@astrojs/react';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  integrations: [lenis(), react()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: 'Skrawk Serif',
      cssVariable: '--font-skrawk-serif',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Skrawk-Serif.otf'],
          },
        ],
      },
    },
  ],
});
