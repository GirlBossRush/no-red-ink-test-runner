"use strict"

var
  ENVIRONMENT = process.env.NODE_ENV || "development",
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  resolve = require("path").resolve

exports.devtool = "source-map"

exports.entry = [
  "./app/index.jsx"
]

exports.output = {
  filename: "[name].js",
  path: resolve(__dirname, "dist"),
  publicPath: "/",
  sourceMapFilename: "[name].map"
}

exports.plugins = [
  new HtmlWebpackPlugin({
    template: "app/index.html",
    meta: {
      title: "No Red Ink Test Runner"
    }
  })
]

exports.resolve = {
  modulesDirectories: [
    "app",
    "node_modules"
  ],
  extensions: [
    "",
    ".js",
    ".jsx",
    ".json"
  ]
}

exports.module = {
  loaders: [
    {test: /\.css$/, loader: "style-loader?singleton!css-loader!autoprefixer"},
    {test: /\.json$/, loader: "json-loader", exclude: [/node_modules/]},
    {test: /\.js$/, loader: "babel-loader?optional=runtime", exclude: [/node_modules/]}
  ],
  noParse: /\.min\.js/
}

var JSXconfig = {
  test: /\.jsx$/,
  loaders: ["babel-loader?optional=runtime"],
  exclude: [/node_modules/]
}

if (ENVIRONMENT === "development") {
  exports.debug = true
  exports.devtool = "eval"

  exports.entry.unshift(
    "webpack-dev-server/client?http://0.0.0.0:8080",
    "webpack/hot/only-dev-server"
  )

  exports.devServer = {
    contentBase: "./dist/"
  }

  JSXconfig.loaders.unshift("react-hot")

  exports.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}

exports.module.loaders.push(JSXconfig)
