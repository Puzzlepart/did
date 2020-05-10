require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const src = path.resolve(__dirname, 'client/');
const package = require('./package.json');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';

console.log("NODE_ENV: %s", mode);
console.log("PACKAGE_VERSION: %s", package.version);

let config = {
  mode,
  entry: { [package.name]: './client' },
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
        test: /\.ts(x?)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.scss$/, use: [
          { loader: "style-loader" },
          { loader: "css-modules-typescript-loader" },
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" },
        ]
      },
    ]
  },
  resolve: {
    alias: {
      interfaces: path.resolve(src, 'interfaces'),
      utils: path.resolve(src, 'utils'),
      helpers: path.resolve(src, 'helpers'),
      pages: path.resolve(src, 'pages'),
      components: path.resolve(src, 'components'),
      i18n: path.resolve(src, 'i18n'),
      AppContext: path.resolve(src, 'AppContext'),
    },
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
  },
  plugins: [
    new MomentLocalesPlugin({ localesToKeep: ['en-gb', 'nb'] }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  stats: {
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
};

switch (mode) {
  case 'development': {
    config.stats = 'errors-only';
  }
    break;
  case 'production': { }
    break;
}

module.exports = config;
