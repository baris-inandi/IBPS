const path = require("path");
const cracoSwcPlugin = require("craco-swc");

module.exports = {
    plugins: [
        {
            plugin: {
                ...cracoSwcPlugin,
                overrideCracoConfig: ({ cracoConfig }) => {
                    if (typeof cracoConfig.eslint.enable !== "undefined") {
                        cracoConfig.disableEslint = !cracoConfig.eslint.enable;
                    }
                    delete cracoConfig.eslint;
                    return cracoConfig;
                },
                overrideWebpackConfig: ({ webpackConfig, cracoConfig }) => {
                    if (
                        typeof cracoConfig.disableEslint !== "undefined" &&
                        cracoConfig.disableEslint === true
                    ) {
                        webpackConfig.plugins = webpackConfig.plugins.filter(
                            (instance) =>
                                instance.constructor.name !==
                                "ESLintWebpackPlugin",
                        );
                    }
                    return webpackConfig;
                },
            },
            options: {
                swcLoaderOptions: {
                    jsc: {
                        externalHelpers: true,
                        target: "es5",
                        parser: {
                            syntax: "typescript",
                            jsx: true,
                            dynamicImport: true,
                            exportDefaultFrom: true,
                        },
                    },
                },
            },
        },
    ],
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src/"),
        },
    },
};
