export const slugFromPath = (path: string) =>
	path.match(/(([\w-]|[^\x01-\x7E])+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;