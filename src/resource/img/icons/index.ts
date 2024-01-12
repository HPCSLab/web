export const src: [string, ImageMetadata][] = await Promise.all(
  Object.entries(import.meta.glob("./*.jpg")).map(async ([path, data]) => [
    path.slice(2, path.length),
    ((await data()) as { default: ImageMetadata }).default,
  ]),
);
export default new Map(src);
