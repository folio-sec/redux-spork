const { join } = require("path");
const express = require("express");

module.exports = {
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
  devServer: {
    before: (app, server) => app.use(express.static(join(__dirname, "static"))),
    contentBase: join(__dirname, "dist/client"),
  },
};
