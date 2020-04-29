require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const clientLib = path.resolve(__dirname, 'lib/client/');

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
  entry: {
    did365: [
      'webpack-hot-middleware/client',
      'core-js/stable',
      'regenerator-runtime/runtime',
      './lib/client/App.js',
    ],
  },
  resolve: {
    alias: {
      interfaces: path.resolve(clientLib, 'interfaces'),
      utils: path.resolve(clientLib, 'utils'),
      helpers: path.resolve(clientLib, 'helpers'),
      components: path.resolve(clientLib, 'components'),
      common: path.resolve(clientLib, 'common'),
      i18n: path.resolve(clientLib, 'i18n'),
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new WebpackBar(),
    new webpack.DefinePlugin({
      'process.env': {
        'AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY': JSON.stringify(process.env.AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY),
      },
    }),
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name].js',
  }
};