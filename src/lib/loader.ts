export type Validator<T> = {
  parse: (src: any) => T;
};

export async function load<T>(
  imported: Record<string, () => Promise<unknown>>,
  validator?: (src: any) => T
): Promise<Map<string, T>> {
  const loaded: [string, T][] = await Promise.all(
    Object.entries(imported).map(async ([path, body]) => {
      if (validator) {
        return [path, validator(await body())];
      } else {
        return [path, (await body()) as T];
      }
    })
  );
  return new Map(loaded);
}
