/** @type {import('tailwindcss').Config} */
const path = require("path");
const fs = require("fs");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PROJECT_PATH = __dirname.replace(/\\/g, "/");

module.exports = async (env, arg) => {
  const WebpackConfigWithMode = await require(getWebpackConfigFilePathWithMode(
    arg.mode
  ));

  if (!WebpackConfigWithMode) return;

  return {
    mode: WebpackConfigWithMode.mode || arg.mode || "production",
    context: path.resolve(__dirname, "."),
    entry: {
      vue: ["vue"],
      app: {
        import: "/src/App.ts",
        dependOn: "vue",
      },
      ...(WebpackConfigWithMode.entry || {}),
    },
    output: {
      globalObject: "window",
      assetModuleFilename:
        arg.mode === "production" ? "[hash][ext]" : "assets/[name][ext]",
      clean: true,
      ...(WebpackConfigWithMode.output || {}),
    },
    resolve: {
      alias: {
        ...(resolveTsconfigPathsToAlias(
          path.resolve(PROJECT_PATH, "tsconfig.json")
        ) || {}),
        modules: [PROJECT_PATH],
        ...(WebpackConfigWithMode.resolve?.alias ?? {}),
      },
      extensions: [".ts", ".scss", ".js", ".vue"],
      modules: ["node_modules", path.resolve(__dirname, "./node_modules")],
    },
    devtool: WebpackConfigWithMode.devtool || false,
    devServer: WebpackConfigWithMode.devServer || {},
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [
            {
              // NOTE - We should use option 1 because if we use 'style-loader' then the import .css will be replace by <style></style> of sfc vue compiler
              // NOTE - Option 2
              // loader: "style-loader",

              // NOTE - Option 1
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                additionalData: '@import "assets/styles/main.scss";',
                sassOptions: {
                  hmr: true,
                  includePaths: [
                    "node_modules",
                    "assets",
                    "assets/styles",
                    "assets/fonts",
                    "assets/images",
                    "assets/videos",
                  ],
                  sourceMap: true,
                  warnRuleAsWarning: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
          type: "asset/resource",
        },
        ...(WebpackConfigWithMode?.module?.rules ?? []),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: false,
      }),
      new VueLoaderPlugin(),
      ...(WebpackConfigWithMode.plugins || []),
    ],
    cache: WebpackConfigWithMode.cache || true,
    optimization: WebpackConfigWithMode.optimization || {},
    experiments: WebpackConfigWithMode.experiments || {},
    externalsType: WebpackConfigWithMode.externalsType || "global",
    externals: WebpackConfigWithMode.externals || {},
    target: WebpackConfigWithMode.target || "web",
    node: WebpackConfigWithMode.node || {},
  };
};

/**
 * Libs inline support for webpack config
 */
const getWebpackConfigFilePathWithMode = (mode) => {
  if (!mode) return;

  return mode === "development"
    ? "./config/webpack.development.config.js"
    : "./config/webpack.production.config";
}; // getWebpackConfigFilePathWithMode(mode?: 'development' | 'production')

function resolveTsconfigPathsToAlias(tsconfigPath = "./tsconfig.json") {
  // const tsconfig = require(tsconfigPath)
  // const { paths, baseUrl } = tsconfig.compilerOptions
  // NOTE - Get json content without comment line (ignore error JSON parse some string have unexpected symbol)
  // https://stackoverflow.com/questions/40685262/read-json-file-ignoring-custom-comments
  const tsconfig = JSON.parse(
    fs
      .readFileSync(tsconfigPath)
      ?.toString()
      .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
        g ? "" : m
      )
  );
  const { paths, baseUrl } = tsconfig.compilerOptions;

  return Object.fromEntries(
    Object.entries(paths)
      .filter(([, pathValues]) => pathValues.length > 0)
      .map(([pathKey, pathValues]) => {
        const key = pathKey.replace("/*", "");
        const value = path.resolve(
          path.dirname(tsconfigPath),
          baseUrl,
          pathValues[0].replace(/[\/|\*]+(?:$)/g, "")
        );
        return [key, value];
      })
  );
} // resolveTsconfigPathsToAlias()
