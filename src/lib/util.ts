export function unwrap<T>(src: T | null | undefined): T {
  if (src) {
    return src;
  } else {
    throw new Error("unwrap");
  }
}
