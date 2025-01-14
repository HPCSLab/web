// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import "astro/astro-jsx";

// インポートするファイルの拡張子を指定します。
declare module "*.yml" {
  const value: any; // 必要であれば、ここに型の定義を追加します。
  export default value;
}

// https://github.com/ota-meshi/eslint-plugin-astro/issues/168#issuecomment-1439480332
declare global {
  namespace JSX {
    type Element = HTMLElement;
    // type Element = astroHTML.JSX.Element // We want to use this, but it is defined as any.
    type IntrinsicElements = astroHTML.JSX.IntrinsicElements;
  }
}
