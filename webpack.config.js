"use strict";

const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || "development";
const DEV = NODE_ENV === "development";
const PRODUCT = NODE_ENV === "product";

// const plugins = [
//   // new webpack.NoErrorsPlugin(),
//   new webpack.DefinePlugin({
//     'process.env': {
//       NODE_ENV: JSON.stringify(NODE_ENV),
//       DEV: JSON.stringify(DEV),
//       PRODUCT: JSON.stringify(PRODUCT)
//     }
//   })
// ];

// const productPlugins = [
//   new webpack.optimize.UglifyJsPlugin({
//     compress: { warnings: false, drop_console: true, unsafe: true }
//   })
// ];

module.exports = {
  // context: path.resolve(__dirname, 'src'),

  entry: path.resolve(__dirname, 'src', 'index.jsx'),

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'react-test-util-to-class-component',
    libraryTarget: 'umd'
  },

  // noInfo: true,

  target: 'node',

  watch: DEV,

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: DEV ? "cheap-source-map" : null,

  // plugins: PRODUCT ? plugins.concat(productPlugins) : plugins,

  // resolve: {
  //   // modulesDirectories: ['node_modules', 'src'],
  //   extentions: ['.js', '.jsx']
  // },

  resolveLoader: {
    // modulesDirectories: ['node_modules'],
    // moduleTemplates: ['*-loader', '*'],
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.js$/,
      loader: 'babel'
    }]
  }
};
