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
  TSCONFIG_PATH,
  TSCONFIG_COMPILER_OPTIONS,
  DEFINITIONS
} = require('./webpack.constants')

/**
 * Get resolve config for webpack based on
 * node environment
 * 
 * @returns resolve config for webpack
 */
function getResolves() {
  const { baseUrl, paths } = TSCONFIG_COMPILER_OPTIONS
  const alias = Object.keys(paths).reduce((aliases, key) => {
    aliases[key] = path.resolve('./client', baseUrl, paths[key][0])
    return aliases
  }, {})
  return {
    alias,
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.css',
      '.scss',
      '.gql'
    ],
  }
}

/**
 * Get plugins config for webpack based on
 * node environment
 * 
 * @returns plugins config for webpack
 */
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
    const { CustomCompileHooks } = require('./webpack-compile-hooks')
    plugins.push(
      new CustomCompileHooks({
        url: new URL(process.env.MICROSOFT_REDIRECT_URI).origin,
        localtunnel: {
          port: process.env.PORT || 9001,
          subdomain: process.env.LOCALTUNNEL_SUBDOMAIN,
          callback: '{0}/auth/azuread-openidconnect/callback'
        },
        launchBrowser: process.env.LAUNCH_BROWSER === '1'
      }),
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

/**
 * Get optimization config for webpack based on
 * node environment
 * 
 * @returns optimization config for webpack
 */
function getOptimizationForEnvironment() {
  let optimization = {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
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
              configFile: TSCONFIG_PATH
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
  resolve: getResolves(),
  plugins: getPluginsForEnvironment(),
  stats: {
    warnings: false,
    modules: false,
    assets: false
  }
}

module.exports = config
