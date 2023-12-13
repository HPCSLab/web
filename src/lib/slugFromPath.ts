export const slugFromPath = (path: string) =>
	path.match(/(([\w-]|[^\x01-\x7E])+)\.md/i)?.[1] ?? null;
