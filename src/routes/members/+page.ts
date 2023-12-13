import type { PageLoad } from './$types';

type profile = {
    name: string;
    eng_name: string;
    occupation: string;
    grade: string;
    team: string;
    img: string;
    username: string;
}

const prof2rank = (prof: profile) => {
    if (prof.occupation === 'Research Student') {
        return 0;
    }
    if (prof.occupation === 'Student') {
        switch (prof.grade) {
            case 'B4':
                return 1;
            case 'M1':
                return 2;
            case 'M2':
                return 3;
            case 'D1':
                return 4;
            case 'D2':
                return 5;
            case 'D3':
                return 6;
        }
    }
    if (prof.occupation === 'Researcher') {
        return 7;
    }
    if (prof.occupation === 'Faculty') {
        switch (prof.grade) {
            case 'Assistant Professor':
                return 8;
            case 'Associate Professor':
                return 9;
            case 'Professor (Cooperative Graduate School Program)':
                return 10;
            case 'Professor':
                return 11;
        }
    }
    return -1;
};

export const load: PageLoad = async () => {
	const data = import.meta.glob(`/members/profiles/*.{md,svx,svelte.md}`);
    let profiles: profile[] = [];

	for (const [path, resolver] of Object.entries(data)) {
		const content: any = await resolver();
        profiles.push(content.metadata);
	}

    profiles.sort((a, b) => {
        const arank = prof2rank(a);
        const brank = prof2rank(b);
        if (arank == brank) {
            return 0;
        }
        if (arank < brank) {
            return 1;
        }
        return -1;
    });

    return {
        profiles,
    };
};