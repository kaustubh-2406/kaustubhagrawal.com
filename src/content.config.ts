import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { yearMonth } from './data/career';

const month = z
	.string()
	.regex(/^\d{4}-\d{2}$/, "expected 'YYYY-MM'")
	.transform(yearMonth);

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			oneLiner: z.string(),
			cvLine: z.string().optional(), // the CV's line for this project, when it should say more than the one-liner
			status: z.enum(['building', 'shipped', 'archived']),
			type: z.string().optional(), // e.g. 'Course project'
			started: month,
			stack: z.array(z.string()).min(1).max(4),
			repo: z.url().optional(),
			live: z.url().optional(), // only while the demo is actually up
			learning: z.string().optional(), // 'Learning: …' while building, one outcome once shipped
			cover: image().optional(), // 16:9 screenshot or GIF
			gallery: z.array(z.object({ src: image(), alt: z.string() })).default([]),
		}),
});

export const collections = { projects };
