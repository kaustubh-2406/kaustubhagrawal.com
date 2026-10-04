// ── Projects ────────────────────────────────────────────
import { getCollection } from 'astro:content';

/** Every project, most recently started first. */
export async function getProjects() {
	return (await getCollection('projects')).sort((a, b) => b.data.started.getTime() - a.data.started.getTime());
}

/** The newest project still being built. */
export async function getCurrentProject() {
	return (await getProjects()).find((project) => project.data.status === 'building');
}
