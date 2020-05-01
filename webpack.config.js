require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const clientLib = path.resolve(__dirname, 'lib/client/');
const package = require('./package.json');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

console.log("NODE_ENV: %s", mode);
console.log("PACKAGE_VERSION: %s", package.version);

let config = {
  mode,
  entry: { [package.name]: './lib/client' },
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
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
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        'AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY': JSON.stringify(process.env.AZURE_APPLICATION_INSIGHTS_INSTRUMENTATION_KEY),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  stats: 'detailed',
};

switch (mode) {
  case 'development': {
    config.plugins.push(new (require('webpackbar'))());
  }
    break;
  case 'production': {
    config.stats = {
      chunks: false,
      assets: false,
      colors: false,
      timings: true,
      errors: true,
      warnings: false,
      errorDetails: true,
      logging: 'error',
      loggingTrace: false,
      modules: false,
      performance: false
    }
  }
    break;
}

module.exports = config;
