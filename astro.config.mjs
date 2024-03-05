import { defineConfig } from "astro/config";
import YamlPlugin from "@rollup/plugin-yaml";
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://www.hpcs.cs.tsukuba.ac.jp",
  vite: {
    plugins: [YamlPlugin()],
  },
  integrations: [
    mdx(),
    icon({
      include: {
        fluent: "*",
        ph: "*",
        icons8: "*",
        ic: "*",
        charm: "*",
      },
    }),
  ],
});
