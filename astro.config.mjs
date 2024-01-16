import { defineConfig } from "astro/config";
import YamlPlugin from "@rollup/plugin-yaml";
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
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
      },
    }),
  ],
});
