/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// インポートするファイルの拡張子を指定します。
declare module "*.yml" {
  const value: any; // 必要であれば、ここに型の定義を追加します。
  export default value;
}
