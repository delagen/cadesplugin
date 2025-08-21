const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = {
    cache: false,
    mode: "development",
    devtool: "source-map",
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 5
                },
            }),
        ],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        library: {type: "self"}
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    compilerOptions: {
                        preserveConstEnums: true
                    }
                }
            }
        ]
    },
    target: ['web', 'es5'],
    resolve: {
        extensions: [".ts", ".js"]
    },
    devServer: {
        contentBase: __dirname,
        compress: true,
        host: "0.0.0.0",
        port: 9000,
        publicPath: "/build/",
        useLocalIp: true,
        overlay: true
    }
};

module.exports = [
    {
        ...baseConfig,
        entry: "./index.ts",
        output: {
            ...baseConfig.output,
            filename: "commonjs.js",
            library: {type: "commonjs-module"}
        }
    },
    {
        ...baseConfig,
        entry: "./index.ts",
        output: {
            ...baseConfig.output,
            filename: "umd.js",
            library: {
                name: 'cadesplugin',
                type: 'umd',
                umdNamedDefine: true,
            }
        }
    },
    {
        ...baseConfig,
        entry: "./index.ts",
        experiments: {
            outputModule: true,
        },
        output: {
            ...baseConfig.output,
            filename: "module.js",
            library: {type: "module"}
        },
        target: ['web'],
    },
    {
        ...baseConfig,
        entry: "./browser.ts",
        output: {
            ...baseConfig.output,
            filename: "browser.js"
        }
    },
    {
        ...baseConfig,
        entry: "./browser.polyfill.ts",
        output: {
            ...baseConfig.output,
            filename: "browser.polyfill.js"
        }
    }
];
