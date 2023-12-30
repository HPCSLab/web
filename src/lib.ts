export function toSerialzable<T>(src: T): any {
  switch (typeof src) {
    case "bigint":
      return src;
    case "boolean":
      return src;
    case "function":
      return undefined;
    case "number":
      return src;
    case "object":
      if (Array.isArray(src)) {
        return src.map(toSerialzable);
      } else if (src) {
        return Object.fromEntries(
          Object.entries(src).map(([key, value]: [any, any]) => [
            toSerialzable(key),
            toSerialzable(value),
          ]),
        );
      } else {
        return {};
      }
    case "string":
      return src;
    case "symbol":
      return src;
    case "undefined":
      return src;
  }
  return src;
}
