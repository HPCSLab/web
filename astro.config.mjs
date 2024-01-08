import { defineConfig } from "astro/config";
import YamlPlugin from "@rollup/plugin-yaml";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [YamlPlugin()]
  },
  integrations: [mdx()]
});