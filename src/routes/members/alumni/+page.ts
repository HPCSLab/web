import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const alumni_data = import.meta.glob(`/members/alumni.md`);

	for (const [path, resolver] of Object.entries(alumni_data)) {
		const content: any = await resolver();
		return {
			content,
		}
	}
};