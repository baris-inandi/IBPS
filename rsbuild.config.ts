import { defineConfig } from "@rsbuild/core";
import { pluginPreact } from "@rsbuild/plugin-preact";

export default defineConfig({
    dev: {
        hmr: true,
        liveReload: false,
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
