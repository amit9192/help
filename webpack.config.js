const path = require("path");
const { ProvidePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const srcDirectory = path.resolve(__dirname, "src");
const buildDirectory = path.resolve(__dirname, "build");
const port = 3000;

module.exports = {
  mode: "development",
  devServer: {
    contentBase: buildDirectory,
    historyApiFallback: true,
    host: "0.0.0.0",
    port,
  },
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: buildDirectory,
  },
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader", // compiles PostCSS to CSS
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // **/* relative to webpack's output.path directory
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, srcDirectory, "docs"),
          to: buildDirectory,
        },
        {
          from: path.resolve(__dirname, srcDirectory, ".nojekyll"),
          to: buildDirectory,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      inject: false,
    }),
    new HtmlWebpackPlugin({
      template: "src/404.html",
      filename: "404.html",
      inject: false,
    }),
    new ProvidePlugin({
      $: "jquery",
    }),
  ],
};
