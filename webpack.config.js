require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

console.log("NODE_ENV: %s", mode);
console.log("ENTRY: %s", path.resolve('./lib/client'));

let config = {
  output: {
    path: path.resolve('./bin/public/js'),
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
  entry: path.resolve('./lib/client'),
  resolve: {
    alias: {
      interfaces: path.resolve('./lib/client/interfaces'),
      utils: path.resolve('./lib/client/utils'),
      helpers: path.resolve('./lib/client/helpers'),
      components: path.resolve('./lib/client/components'),
      common: path.resolve('./lib/client/common'),
      i18n: path.resolve('./lib/client/i18n'),
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
