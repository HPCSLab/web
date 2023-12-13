import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const modules: Record<string, any> = import.meta.glob(`/news/*/*.md`, { eager: true });

	let match: { path?: string; news?: any } = {};
	for (const [path, news] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug && path.split('/')[2] === params.year) {
			match = { path, news };
			break;
		}
	}

	const news = match?.news;

	if (!news || !news.metadata.published) {
		throw error(404); // Couldn't resolve the post
	}

	return {
		component: news.default,
		frontmatter: news.metadata
	};
};
