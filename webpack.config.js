require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: process.env.NODE_ENV,
  entry: ['@babel/polyfill', './lib/client/App.js'],
  resolve: {
    alias: {
      interfaces: path.resolve(__dirname, 'lib/client/interfaces'),
      utils: path.resolve(__dirname, 'lib/client/utils'),
      helpers: path.resolve(__dirname, 'lib/client/helpers'),
      components: path.resolve(__dirname, 'lib/client/components'),
    }
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new WebpackBar(),
  ],
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'did365.bundle.js'
  }
};