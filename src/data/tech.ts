// ── Tech logos ──────────────────────────────────────────
// Brand marks from Simple Icons, keyed by the name shown on the site.
// Every `profile.stack` entry must exist here, so a tech without a logo fails `pnpm check` instead of rendering a gap.
import { siApachekafka, siDocker, siNodedotjs, siPython, siTypescript } from 'simple-icons';

export const techLogos = {
	TypeScript: siTypescript,
	Node: siNodedotjs,
	Python: siPython,
	Docker: siDocker,
	Kafka: siApachekafka,
};

export type Tech = keyof typeof techLogos;
