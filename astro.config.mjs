import { defineConfig } from "astro/config";
import YamlPlugin from "@rollup/plugin-yaml";
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://www.hpcs.cs.tsukuba.ac.jp",
  // 日本語は接頭辞なし (`/`)、英語は `/en/` 配下に出力する。
  // 実際のルーティングは src/pages/[...lang]/ の rest パラメータが担う。
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [YamlPlugin()],
  },
  integrations: [
    mdx(),
    icon({
      include: {
        fluent: "*",
        ph: "*",
        ic: "*",
        charm: "*",
      },
    }),
  ],
});
