import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
    const year = parseInt(params.year);

    if (isNaN(year)) {
        throw error(404);
    }

    if (2001 <= year && year < 2015) {
        let bibtex_lists: {
            journal: any[],
            conference: any[],
            poster: any[],
            domestic_symposium: any[],
            domestic_poster: any[],
            techreport: any[],
        } = {
            journal: [],
            conference: [],
            poster: [],
            domestic_symposium: [],
            domestic_poster: [],
            techreport: [],
        };
        const modules: Record<string, any> = import.meta.globEager(`/publications/*.{md,svx,svelte.md}`);
        for (const [path, content] of Object.entries(modules)) {
            if (slugFromPath(path) == params.year) {
                return {
                    year,
                    old_content: content,
                    bibtex_lists,
                };
            }
        }
        throw error(404);
    } else if (2015 <= year) {
        const modules: Record<string, any> = import.meta.globEager(`/publications/*/*.{md,svx,svelte.md}`);
        let bibtex_lists: {
            journal: any[],
            conference: any[],
            poster: any[],
            domestic_symposium: any[],
            domestic_poster: any[],
            techreport: any[],
        } = {
            journal: [],
            conference: [],
            poster: [],
            domestic_symposium: [],
            domestic_poster: [],
            techreport: [],
        };
        for (const [path, content] of Object.entries(modules)) {
            if (path.split('/')[2] == params.year) {
                switch (content.metadata.type) {
                    case 'journal':
                        bibtex_lists.journal.push(content);
                        break;
                    case 'conference':
                        bibtex_lists.conference.push(content);
                        break;
                    case 'poster':
                        bibtex_lists.poster.push(content);
                        break;
                    case 'domestic_symposium':
                        bibtex_lists.domestic_symposium.push(content);
                        break;
                    case 'domestic_poster':
                        bibtex_lists.domestic_poster.push(content);
                        break;
                    case 'techreport':
                        bibtex_lists.techreport.push(content);
                        break;
                    default:
                        break;
                }
            }
        }
        return {
            year,
            old_content: null,
            bibtex_lists,
        }
    }
    throw error(404);
};
