// ── Profile ─────────────────────────────────────────────
import Mail from '@lucide/astro/icons/mail';
import House from '@lucide/astro/icons/house';
import FolderKanban from '@lucide/astro/icons/folder-kanban';
import User from '@lucide/astro/icons/user';
import FileText from '@lucide/astro/icons/file-text';
import Github from '../components/icons/Github.astro';
import Linkedin from '../components/icons/Linkedin.astro';
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
// "How it started": `type` is the faint commit prefix, `line` always shows, `rest` opens on tap.
export const howItStarted = [
	{
		when: '2017',
		type: 'init',
		line: 'It started with C++ in 11th grade.',
		rest: 'What hooked me wasn’t the syntax but what sat under it: an int taking 4 bytes, an array laid out as one block of memory, pointers walking through it. The dreaded pointer clicked fast, thanks to a teacher who felt more like a friend. We’d find them after class, at lunch, in free periods.',
	},
	{
		when: '2020',
		type: 'chore',
		line: 'My real classroom was YouTube.',
		rest: 'COVID hit and I suddenly had a lot of free time. Traversy Media came first, then Tsoding, ThePrimeagen and a few others, and slowly the dots started connecting. Those channels did a lot to get me where I am.',
	},
	{
		when: 'college',
		type: 'feat',
		line: 'My first database was a CSV file.',
		rest: 'Our Java teacher threw out a challenge, not graded: build your own database. Mine was a tiny command-line tool that read and wrote a CSV file. No concurrency, honestly not much at all. It hooked me anyway, and databases have fascinated me ever since.',
	},
	{
		when: '2022',
		type: 'feat',
		line: 'At work, I ship.',
		rest: 'An internship at AlphaBI in 2022, a full-time role there, now Axy. My favourite kind of work is being handed something unfamiliar and figuring it out.',
	},
];

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
