// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://kaustubhagrawal.com',
	// `about.html`, not `about/index.html`: Cloudflare Pages serves it at `/about` directly, so links skip a 307 to `/about/`.
	build: { format: 'file' },
	trailingSlash: 'never',

	redirects: { '/resume': '/kaustubh-agrawal-resume.pdf', '/cv': '/kaustubh-agrawal-resume.pdf' },

	// Self-hosted at build time. Quattro: headings + body; Mono: code and labels; Caveat: doodle headings only.
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'iA Writer Quattro',
			cssVariable: '--font-quattro',
			weights: [400, 700],
			styles: ['normal'], // italics add ~80 KB; not needed yet
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'iA Writer Mono',
			cssVariable: '--font-ia-mono',
			weights: [400],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['monospace'],
		},
		// The resume PDF's body font (prototype/cv-print.astro).
		{
			provider: fontProviders.fontsource(),
			name: 'IBM Plex Sans',
			cssVariable: '--font-plex',
			weights: [400, 700],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Caveat',
			cssVariable: '--font-caveat',
			weights: [500],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['cursive'],
		},
	],

	vite: {
		plugins: [tailwindcss()],
	},

	// Prototypes are local explorations, never indexed.
	integrations: [sitemap({ filter: (page) => !page.includes('/prototype/') })],
});
