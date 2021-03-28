/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const tryRequire = require('try-require')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const debug = require('debug')('webpack')

const {
  MODE,
  IS_DEVELOPMENT,
  SERVER_DIST,
  PUBLIC_JS_PATH,
  BUNDLE_FILE_NAME,
  HTML_PLUGIN_TEMPLATE,
  HTML_PLUGIN_FILE_NAME,
  SRC_PATH,
  DEFINITIONS
} = require('./webpack.constants')

function getPluginsForEnvironment() {
  let plugins = [
    new HtmlWebpackPlugin({
      template: HTML_PLUGIN_TEMPLATE,
      filename: HTML_PLUGIN_FILE_NAME,
      inject: true,
    }),
    new webpack.DefinePlugin(DEFINITIONS)
  ]
  if (IS_DEVELOPMENT) {
    const LiveReloadPlugin = tryRequire('webpack-livereload-plugin')
    const WebpackBuildNotifierPlugin = tryRequire('webpack-build-notifier')
    plugins.push(
      new LiveReloadPlugin(),
      new WebpackBuildNotifierPlugin({
        logo: path.resolve(__dirname, '/server/public/images/favicon/mstile-150x150.png'),
        sound: process.env.WEBPACK_NOTIFICATIONS_SOUND,
        suppressWarning: true,
        showDuration: true
      })
    )
  }
  return plugins
}

function getOptimizationForEnvironment() {
  let optimization = {
    splitChunks: {
      chunks: 'all'
    },
    minimize: false,
    minimizer: [],
    moduleIds: 'deterministic'
  }
  if (!IS_DEVELOPMENT) {
    const TerserPlugin = require('terser-webpack-plugin')
    optimization.minimize = true
    optimization.minimizer.push(new TerserPlugin({
      parallel: true,
      extractComments: false,
      terserOptions: {
        mangle: true,
        keep_classnames: false,
        keep_fnames: true,
        ie8: false,
        safari10: false,
        format: {
          comments: false,
        }
      },
    }))
  }
  return optimization
}

/** CONFIG */
const config = {
  mode: MODE,
  entry: './client',
  output: {
    path: PUBLIC_JS_PATH,
    filename: BUNDLE_FILE_NAME,
    publicPath: '/js',
  },
  optimization: getOptimizationForEnvironment(),
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
      package: path.resolve(SRC_PATH, '../package.json'),
      security: path.resolve(__dirname, 'shared/config/security'),
      common: path.resolve(SRC_PATH, 'common'),
      components: path.resolve(SRC_PATH, 'components'),
      config: path.resolve(SRC_PATH, 'config'),
      helpers: path.resolve(SRC_PATH, 'helpers'),
      hooks: path.resolve(SRC_PATH, 'hooks'),
      i18n: path.resolve(SRC_PATH, 'i18n'),
      pages: path.resolve(SRC_PATH, 'pages'),
      types: path.resolve(SRC_PATH, 'types'),
      utils: path.resolve(SRC_PATH, 'utils'),
      AppContext: path.resolve(SRC_PATH, 'app/context'),
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
  plugins: getPluginsForEnvironment(),
  stats: {
    warnings: false,
    modules: false,
    assets: false
  }
}

module.exports = config
