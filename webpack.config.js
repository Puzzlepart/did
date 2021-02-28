/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const tryRequire = require('try-require')
const path = require('path')
const { name, version } = require('./package.json')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack').DefinePlugin
const debug = require('debug')('webpack')

/** CONSTANTS */
const MODE = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const IS_DEVELOPMENT = MODE === 'development'
const SERVER_DIST = IS_DEVELOPMENT ? 'server' : 'dist/server'
const BUNDLE_FILE_NAME = `[name].${version}.[hash].js`
const HTML_PLUGIN_FILE_NAME = IS_DEVELOPMENT ? path.resolve(__dirname, 'server/views/@template_dev.hbs') : resolve(__dirname, 'server/views/@template.hbs')
const SRC_PATH = path.resolve(__dirname, 'client/')

/** PRINTING HEADER */
debug('Compiling Did bundle')
debug('[MODE]: %s', MODE.toUpperCase())
debug('[SERVER DIST]: %s', SERVER_DIST.toUpperCase())
debug('[FILENAME]: %s', BUNDLE_FILE_NAME)
debug('[HBS TEMPLATE]: %s', HTML_PLUGIN_FILE_NAME)

/** CONFIG */
const config = {
  mode: MODE,
  entry: { [name]: './client' },
  output: {
    path: path.resolve(__dirname, SERVER_DIST, 'public/js'),
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
            options: {
              configFile: path.resolve(__dirname, 'client/tsconfig.json')
            }
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
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
    ],
  },
  resolve: {
    alias: {
      common: path.resolve(SRC_PATH, 'common'),
      types: path.resolve(SRC_PATH, 'types'),
      utils: path.resolve(SRC_PATH, 'utils'),
      helpers: path.resolve(SRC_PATH, 'helpers'),
      pages: path.resolve(SRC_PATH, 'pages'),
      components: path.resolve(SRC_PATH, 'components'),
      i18n: path.resolve(SRC_PATH, 'i18n'),
      config: path.resolve(SRC_PATH, 'config'),
      AppContext: path.resolve(SRC_PATH, 'AppContext'),
      AppConfig: path.resolve(SRC_PATH, 'App.config.json'),
      DateUtils: path.resolve(__dirname, 'shared/utils/date'),
    },
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.css',
      '.scss',
      '.gql'
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: HTML_PLUGIN_FILE_NAME,
      filename: path.resolve(__dirname, SERVER_DIST, 'views/index.hbs'),
      inject: true,
    }),
    new DefinePlugin({
      'process.env.VERSION': JSON.stringify(version),
      'process.env.LOG_LEVEL': JSON.stringify(process.env.CLIENT_LOG_LEVEL || 'SILENT')
    })
  ],
}

if (IS_DEVELOPMENT) {
  const { BundleAnalyzerPlugin } = tryRequire('webpack-bundle-analyzer')
  const LiveReloadPlugin = tryRequire('webpack-livereload-plugin')
  const WebpackBuildNotifierPlugin = tryRequire('webpack-build-notifier')
  config.stats = 'normal'
  config.watch = true
  config.watchOptions = { aggregateTimeout: 250 }
  config.plugins.push(
    new LiveReloadPlugin(),
    new WebpackBuildNotifierPlugin({
      logo: path.resolve(__dirname, '/server/public/images/favicon/mstile-150x150.png'),
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
