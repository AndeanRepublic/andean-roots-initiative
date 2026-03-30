// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			name: "Skrawk Serif",
			cssVariable: "--font-skrawk-serif",
			provider: fontProviders.local(),
			options: {
				variants: [
					{
						src: ["./src/assets/fonts/Skrawk-Serif.otf"],
					},
				],
			},
		},
	],
});
