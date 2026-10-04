// ── Career ─────────────────────────────────────────────
// One source for the site and the resume PDF, so they can't drift.

export function yearMonth(value: string): Date {
	const [year, month] = value.split('-').map(Number);
	return new Date(Date.UTC(year, month - 1, 1));
}

type Company = 'Axy' | 'AlphaBI';

interface Role {
	company: Company;
	title: string;
	start: Date;
	end: Date | null;
	location?: string;
	kind: 'full-time' | 'intern';
	bullets: string[]; // full detail, for the resume PDF
	highlights: string[]; // short and plain, for Home's career section; numbers only where they can't go stale
}

export const roles: Role[] = [
	{
		company: 'Axy',
		title: 'Software Developer',
		start: yearMonth('2025-08'),
		end: null,
		location: 'Remote',
		kind: 'full-time',
		bullets: [
			'Built the Electron desktop app’s auto-update flow and SHA-256 release manifest, shipping production releases for macOS, Windows and Linux.',
			'Built the React graph-exploration tools: interactive canvas, node and edge detail drawer, multi-tab sidebar, filterable connections view, and canvas state that survives sessions.',
			'Made the desktop app’s LLM agent safe to ship: read-only, time-limited graph queries at the database, native macOS process isolation, and network-failure handling that never loses user work.',
			'Led the search migration from Orama to Typesense, replacing an in-memory index that every redeploy wiped with a standalone search server, and rewrote the search API and its tests.',
			'Consolidated the legacy backend and its infrastructure into a TypeScript monorepo with shared types, and upgraded every Lambda to Node 22.',
		],
		highlights: [
			'Built the desktop app’s auto-update for macOS, Windows and Linux, its graph-exploration tools, and read-only graph access for its AI agent.',
			'Led the search migration from Orama to Typesense, after every redeploy wiped the in-memory index.',
		],
	},
	{
		company: 'AlphaBI',
		title: 'Full Stack Engineer',
		start: yearMonth('2023-06'),
		end: yearMonth('2025-07'),
		location: 'Hybrid',
		kind: 'full-time',
		bullets: [
			'Rebuilt the real-time pipeline for a sensor manufacturer’s second-generation IoT platform: SOAP ingestion, Kafka workers with per-plan rate limits and alerts, and live Socket.IO dashboards.',
			'Migrated the platform from MongoDB to Postgres, moving 156 customer accounts and 239 workspaces from v1, and added Stripe billing.',
			'Led a small team through the final phase and launch, owning client requirements (research and scoping), task planning, PR reviews, and architecture decisions.',
			'Built per-student, per-essay envelope encryption (AES-256 keys wrapped with RSA-OAEP) for an ed-tech essay platform, so a database dump alone doesn’t expose essays.',
		],
		highlights: [
			'Led a small team through the launch of a sensor manufacturer’s second-generation IoT platform; rebuilt its real-time pipeline and moved 156 customer accounts over from v1.',
			'Built per-student envelope encryption for an ed-tech essay platform, so a database dump alone doesn’t expose essays.',
		],
	},
	{
		company: 'AlphaBI',
		title: 'Full Stack Developer Intern',
		start: yearMonth('2022-11'),
		end: yearMonth('2023-05'),
		kind: 'intern',
		bullets: [
			'Rebuilt a finance client’s CSV import as a streaming pipeline on Cloud Functions and Pub/Sub (1,000-row chunks, 12 report types), fixing out-of-memory failures and cutting the largest imports from 30 to under 10 minutes.',
			'Built a RAG chatbot worker (OpenAI embeddings, Pinecone) on Kafka for an ed-tech college-admissions assistant, deployed to Azure Container Instances.',
		],
		highlights: ["Rebuilt a client's CSV import pipeline, cutting the largest imports from 30 to under 10 minutes."],
	},
];

export const currentRole = roles.find((role) => role.end === null && role.kind === 'full-time')!;

// The first full-time role's start: drives "N+ years" and "since …".
export const careerStart = new Date(
	Math.min(...roles.filter((role) => role.kind === 'full-time').map((role) => role.start.getTime())),
);

export const companySites: Record<Company, string> = {
	Axy: 'https://axy-app.com',
	AlphaBI: 'https://www.alphabi.co',
};

// ── Employers ───────────────────────────────────────────
// Roles grouped by company, newest first: AlphaBI's internship and full-time role become one employer.
export const employers = [...new Set(roles.map((role) => role.company))].map((company) => {
	const held = roles.filter((role) => role.company === company);
	// The full-time role's location speaks for the employer.
	const location = (held.find((role) => role.kind === 'full-time') ?? held[0]).location;
	return { company, location, roles: held };
});

export const education: { degree: string; institute: string; site: string; year: number } = {
	degree: 'B.Tech Computer Science',
	institute: 'Bhilai Institute of Technology, Durg',
	site: 'https://bitdurg.ac.in', // linked wherever the name shows: "BIT" alone reads as Birla's BIT/BITS
	year: 2023,
};

// ── Resume ─────────────────────────────────────────────
export const cvTitle = 'Full-Stack Developer'; // positioning line under the name; role lines keep exact titles
export const cvSummary = `Full-stack developer with ${yearsSince(careerStart)}+ years shipping products end to end, strongest on the backend: real-time pipelines, event-driven services and data migrations. Currently building ${currentRole.company}’s desktop app and its LLM agent.`;

// Grouped by type, backend line first, strongest first in each line.
export const skills = [
	{ category: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL', 'Python'] },
	{ category: 'Backend & data', items: ['Node.js', 'Kafka', 'PostgreSQL', 'MongoDB', 'Redis', 'WebSockets'] },
	{
		category: 'Cloud & infra',
		items: ['AWS (Lambda, SQS, SNS, S3)', 'GCP (Cloud Functions, Pub/Sub)', 'Terraform', 'Docker', 'GitHub Actions'],
	},
	{ category: 'Frontend & desktop', items: ['React', 'Next.js', 'Electron', 'Model Context Protocol (MCP)'] },
];

const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** Date(2025-08) → 'Aug 2025' */
export function formatMonth(date: Date): string {
	return monthFormatter.format(date);
}

type Span = { start: Date; end: Date | null };

/** 'Aug 2025 – now' / 'Feb 2023 – Jul 2025' */
export function formatRange({ start, end }: Span): string {
	return `${formatMonth(start)} – ${end ? formatMonth(end) : 'now'}`;
}

/** Whole years between a month and a date, for "N+ years". */
export function yearsSince(start: Date, at: Date = new Date()): number {
	const years = at.getUTCFullYear() - start.getUTCFullYear();
	return at.getUTCMonth() >= start.getUTCMonth() ? years : years - 1;
}
