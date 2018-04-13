"use strict";

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'react-test-util-to-class-component',
    libraryTarget: 'umd'
  },

  target: 'node',

  watchOptions: {
    aggregateTimeout: 100
  },

  plugins: [new webpack.NoEmitOnErrorsPlugin()],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader"
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
};
