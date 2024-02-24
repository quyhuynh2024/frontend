const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.tsx",
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|tsx|ts)$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            ,
            "css-loader",
          ],
        },
      ],
    },
    output: {
      filename: "js/bundle.[contenthash:6].js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/", // added this line to fix the case go directly to dynamic route (go directly route /products/:productId)
    },
    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            filter: (name) => {
              return !name.endsWith("index.html");
            },
          },
        ],
      }),
      new Dotenv(),
      new ReactRefreshPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? "css/[name].min.css" : "css/[name].css",
      }),
    ],
  };
};
