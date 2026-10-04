// ── Profile ─────────────────────────────────────────────
import Mail from '@lucide/astro/icons/mail';
import House from '@lucide/astro/icons/house';
import FolderKanban from '@lucide/astro/icons/folder-kanban';
import User from '@lucide/astro/icons/user';
import FileText from '@lucide/astro/icons/file-text';
import Github from '../components/icons/Github.astro';
import Linkedin from '../components/icons/Linkedin.astro';
import { yearMonth } from './career';
import type { Tech } from './tech';

export const profile = {
	name: 'Kaustubh Agrawal',
	firstName: 'Kaustubh',
	handle: 'kaustubh',
	tagline: 'a software developer in Raipur.',
	location: 'Raipur, India',
	timezone: 'IST',
	stack: ['TypeScript', 'Node', 'Python', 'Docker', 'Kafka'] satisfies Tech[], // 5 at most: one per line in the glance card
	email: 'kaustubhagrawal@gmail.com',
};

// Keyed so pages pick one by name; `socials` keeps the display order for icon rows.
export const social = {
	email: { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
	github: { label: 'GitHub', href: 'https://github.com/kaustubh-2406', icon: Github },
	linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kaustubh-agrl', icon: Linkedin },
};

export const socials = Object.values(social);

// ── Navigation ──────────────────────────────────────────
// The Resume is a PDF, not a page; `/resume` and `/cv` redirect here (astro.config.mjs).
export const resumePdf = '/kaustubh-agrawal-resume.pdf';

export const nav = [
	{ label: 'Home', href: '/', icon: House },
	{ label: 'Projects', href: '/projects', icon: FolderKanban },
	{ label: 'About', href: '/about', icon: User },
	{ label: 'Resume', href: resumePdf, icon: FileText },
];

// ── About page ──────────────────────────────────────────
export const learningFrom = [
	{
		label: 'taught me',
		people: [
			{ name: 'Traversy Media', note: 'web development crash courses' },
			{ name: 'Kevin Powell', note: 'CSS, explained properly' },
			{ name: 'Coding Garden', note: 'long, friendly live-coding streams' },
			{ name: 'Tsoding', note: 'building things from scratch, live' },
			{ name: 'ThePrimeagen', note: 'performance, tooling, and strong opinions' },
		],
	},
	{
		label: 'people I look up to',
		people: [
			{ name: 'Casey Muratori', note: 'Handmade Hero and performance-aware programming' },
			{ name: 'Jonathan Blow', note: 'game development and language design' },
		],
	},
];

/** Dated by hand: bump `updated` whenever the list changes. */
export const now = {
	updated: yearMonth('2026-10'),
	items: ["Following boot.dev's course to build basic-ai-agent, a small coding agent", 'Building this website'],
};
