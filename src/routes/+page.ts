import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';

export const load: PageLoad = async () => {
	const news_data = import.meta.glob(`/src/news/*.{md,svx,svelte.md}`);
    let news: { date: string, title: string, path: string }[] = [];
	for (const [path, resolver] of Object.entries(news_data)) {
		const content: any = await resolver();
        news.push({
            date: content.metadata.date,
            title: content.metadata.title,
            path: `/news/${slugFromPath(path)}`,
        });
	}

    return {
        news,
    };
};