import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const alumni_data: Record<string, any> = import.meta.glob(`/members/alumni.md`, { eager: true });

	for (const [path, content] of Object.entries(alumni_data)) {
		return {
			content,
		}
	}
};