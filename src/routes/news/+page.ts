import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';

export const load: PageLoad = async () => {
	const news_data = import.meta.glob(`/news/*/*.{md,svx,svelte.md}`);
    let news: { date: string, title: string, path: string }[] = [];
	for (const [path, resolver] of Object.entries(news_data)) {
		const content: any = await resolver();
        news.push({
            date: content.metadata.date,
            title: content.metadata.title,
            path: `/news/${content.metadata.date.slice(0, 4)}/${slugFromPath(path)}`,
        });
	}

    news.sort((a, b) => {
        const ad = Date.parse(a.date);
        const bd = Date.parse(b.date);
        if (ad == bd) return 0;
        if (ad < bd) return 1;
        return -1;
    });

    return {
        news,
    };
};