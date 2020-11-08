/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv-safe').config({  allowEmptyValues: true,  example: process.env.CI ? '.env.ci' : '.env.sample'})
const tryRequire = require('try-require')
const { resolve } = require('path')
const { name, version } = require('./package.json')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const LiveReloadPlugin = tryRequire('webpack-livereload-plugin')
const WebpackBuildNotifierPlugin = tryRequire('webpack-build-notifier')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/** CONSTANTS */
const MODE = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const IS_DEVELOPMENT = MODE === 'development'
const SERVER_DIST = IS_DEVELOPMENT ? 'server' : 'server-dist'
const BUNDLE_FILE_NAME = `[name].${version}.[hash].js`
const HTML_PLUGIN_FILE_NAME = resolve(__dirname, 'server/views/@template.hbs')
const SRC_PATH = resolve(__dirname, 'client/')

/** PRINTING HEADER */
console.log('-----------------------------------')
console.log('------COMPILING DID BUNDLE---------')
console.log('-----------------------------------')
console.log('MODE:\t\t %s', MODE)
console.log('SERVER DIST:\t %s', SERVER_DIST)
console.log('FILENAME:\t\t %s', BUNDLE_FILE_NAME)
console.log('HBS TEMPLATE:\t %s', HTML_PLUGIN_FILE_NAME)
console.log('-----------------------------------')

/** CONFIG */
const config = {
  mode: MODE,
  entry: { [name]: './client' },
  output: {
    path: resolve(__dirname, SERVER_DIST, 'public/js'),
    filename: BUNDLE_FILE_NAME,
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
          { loader: 'css-loader', options: { modules: { auto: true } } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
    ],
  },
  resolve: {
    alias: {
      common: resolve(SRC_PATH, 'common'),
      types: resolve(SRC_PATH, 'types'),
      utils: resolve(SRC_PATH, 'utils'),
      helpers: resolve(SRC_PATH, 'helpers'),
      pages: resolve(SRC_PATH, 'pages'),
      components: resolve(SRC_PATH, 'components'),
      i18n: resolve(SRC_PATH, 'i18n'),
      config: resolve(SRC_PATH, 'config'),
      AppContext: resolve(SRC_PATH, 'AppContext'),
    },
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.css',
      '.scss',
      '.gql'
    ],
    plugins: [new TsconfigPathsPlugin({ configFile: './client/tsconfig.json' })]
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [
        'en-gb',
        'nb'
      ]
    }),
    new HtmlWebpackPlugin({
      template: HTML_PLUGIN_FILE_NAME,
      filename: resolve(__dirname, SERVER_DIST, 'views/index.hbs'),
      inject: true,
    }),
  ],
}

if (IS_DEVELOPMENT) {
  config.stats = 'normal'
  config.watch = true
  config.watchOptions = { aggregateTimeout: 250 }
  config.plugins.push(
    new LiveReloadPlugin(),
    new WebpackBuildNotifierPlugin({
      logo: resolve(__dirname, '/server/public/images/favicon/mstile-150x150.png'),
      sound: process.env.WEBPACK_NOTIFICATIONS_SOUND,
      suppressSuccess: process.env.WEBPACK_NOTIFICATIONS_SUPPRESSSUCCESS === 'true',
      showDuration: process.env.WEBPACK_NOTIFICATIONS_SHOWDURATION === 'true',
    }),
    new BundleAnalyzerPlugin({ analyzerMode: process.env.BUNDLE_ANALYZER_MODE })
  )
} else {
  config.stats = 'errors-only'
  config.plugins.push(new CompressionPlugin())
}

module.exports = config
