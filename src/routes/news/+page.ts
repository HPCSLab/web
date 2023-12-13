import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';

export const load: PageLoad = async () => {
    const news_data: Record<string, any> = import.meta.globEager(`/news/*/*.{md,svx,svelte.md}`);
    let news: { date: string, title: string, path: string }[] = [];
    for (const [path, content] of Object.entries(news_data)) {
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