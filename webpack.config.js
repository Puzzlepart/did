require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const clientLib = path.resolve(__dirname, 'lib/client/');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

console.log("NODE_ENV: %s", mode)

let config = {
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'did365.js'
  },
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
  mode,
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    './lib/client/App.js',
  ],
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
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'did365.js'
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        'AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY': JSON.stringify(process.env.AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY),
      },
    })
  ],
  stats: 'detailed',
};

switch (mode) {
  case 'development': {
    config.plugins.push(new (require('webpackbar'))());
  }
    break;
  case 'production': {
    config.stats = 'errors-only';
  }
    break;
}

module.exports = config;