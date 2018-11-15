const NodemonPlugin = require("nodemon-webpack-plugin");
const { join } = require("path");

module.exports = [
  {
    target: "node",
    entry: join(__dirname, "src/server/index.jsx"),
    mode: "development",
    output: {
      path: join(__dirname, "dist/server"),
      filename: "index.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [new NodemonPlugin()],
  },
  {
    entry: join(__dirname, "src/client/index.jsx"),
    mode: "development",
    output: {
      path: join(__dirname, "dist/client"),
      filename: "index.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  },
];
