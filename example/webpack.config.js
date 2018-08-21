// =============================================================================================================================
// EXAMPLE - WEBPACK CONFIG
// =============================================================================================================================
const reactImageElementLoader = require.resolve("../dist/index");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: reactImageElementLoader,
        options: {
          sizeLimit: 1024,
        },
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: { esmodules: true } }], ["@babel/preset-react"]],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, "src", "index.html"), to: path.join(__dirname, "dist", "index.html") },
    ]),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
