import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
    html: {
        template: "./public/index.html",
    },
    output: {
        distPath: {
            root: "build",
        },
    },
    plugins: [pluginReact()],
});
