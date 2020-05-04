require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const src = path.resolve(__dirname, 'client/');
const package = require('./package.json');

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
        test: /\.module\.s(a|c)ss$/,
        loader: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: mode === 'development'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: mode === 'development'
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: mode === 'development'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      interfaces: path.resolve(src, 'interfaces'),
      utils: path.resolve(src, 'utils'),
      helpers: path.resolve(src, 'helpers'),
      pages: path.resolve(src, 'pages'),
      common: path.resolve(src, 'common'),
      i18n: path.resolve(src, 'i18n'),
    },
    extensions: ['.ts', '.tsx', '.js']
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
    config.watch = true;
    config.stats = 'errors-only';
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
