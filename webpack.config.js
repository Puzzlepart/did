require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

console.log("NODE_ENV: %s", mode);
console.log("ENTRY: %s", path.resolve(__dirname, './lib/client'));
console.log("OUTPUT: %s", path.resolve(__dirname, './bin/public/js'));

let config = {
  output: {
    path: path.resolve(__dirname, './bin/public/js'),
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
  entry: path.resolve(__dirname, './lib/client'),
  resolve: {
    alias: {
      interfaces: path.resolve(__dirname, './lib/client/interfaces'),
      utils: path.resolve(__dirname, './lib/client/utils'),
      helpers: path.resolve(__dirname, './lib/client/helpers'),
      components: path.resolve(__dirname, './lib/client/components'),
      common: path.resolve(__dirname, './lib/client/common'),
      i18n: path.resolve(__dirname, './lib/client/i18n'),
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
