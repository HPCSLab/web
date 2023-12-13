import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const modules: Record<string, any> = import.meta.glob(`/publications/*/*.md`, { eager: true });

	let match: { path?: string; bib?: any } = {};
	for (const [path, bib] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			match = { path, bib };
			break;
		}
	}

	const bib = match?.bib;

	if (!bib) {
		throw error(404); // Couldn't resolve the post
	}

	return {
		component: bib.default,
		frontmatter: bib.metadata
	};
};
