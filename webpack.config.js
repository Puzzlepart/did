require('dotenv').config()
const path = require('path')
const src = path.resolve(__dirname, 'client/')
const pkg = require('./package.json')
const webpack = require('webpack')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

let config = {
  mode,
  entry: { [pkg.name]: './client' },
  output: {
    path: path.resolve(__dirname, pkg.config.public, 'js'),
    filename: '[name].[hash].js',
    publicPath: '/js',
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
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-typescript-loader' },
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      common: path.resolve(src, 'common'),
      interfaces: path.resolve(src, 'interfaces'),
      utils: path.resolve(src, 'utils'),
      helpers: path.resolve(src, 'helpers'),
      pages: path.resolve(src, 'pages'),
      components: path.resolve(src, 'components'),
      i18n: path.resolve(src, 'i18n'),
      config: path.resolve(src, 'config'),
      AppContext: path.resolve(src, 'AppContext'),
    },
    extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: process.env }),
    new MomentLocalesPlugin({ localesToKeep: ['en-gb', 'nb'] }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'views/index_template.hbs'),
      filename: path.resolve(__dirname, 'views/index.hbs'),
      inject: true,
    }),
  ],
}

switch (mode) {
  case 'development':
    {
      config.stats = 'minimal'
      config.watch = true
      config.watchOptions = { aggregateTimeout: 200 }
      config.plugins.push(new LiveReloadPlugin())
      config.plugins.push(new WebpackBuildNotifierPlugin({ sound: 'growl' }))
    }
    break
  case 'production':
    {
      config.stats = 'errors-only'
      config.plugins.push(new CompressionPlugin())
    }
    break
}

module.exports = config
