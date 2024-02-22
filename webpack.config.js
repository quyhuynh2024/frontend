const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
    },
    plugins: [
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
