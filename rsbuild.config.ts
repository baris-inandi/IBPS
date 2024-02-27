import { defineConfig } from "@rsbuild/core";
import { pluginPreact } from "@rsbuild/plugin-preact";

export default defineConfig({
  source: {
    entry: {
      index: "./ibps-ide/index.tsx",
    },
  },
  dev: {
    hmr: true,
    liveReload: false,
    startUrl: false,
  },
  html: {
    template: "./public/index.html",
  },
  output: {
    distPath: {
      root: "build",
    },
  },
  plugins: [
    pluginPreact({
      reactAliasesEnabled: true,
    }),
  ],
});
