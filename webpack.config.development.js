/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const tryRequire = require('try-require')
const path = require('path')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = tryRequire('webpack-livereload-plugin')
const WebpackBuildNotifierPlugin = tryRequire('webpack-build-notifier')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { merge } = require('webpack-merge')

let config = merge(
  require('./webpack.config.base.js'),
  {
    mode: 'development',
    output: {
      path: path.resolve(__dirname, 'server/public/js'),
      filename: '[name].[hash].js',
      publicPath: '/js',
    },
    stats: 'normal',
    watch: true,
    watchOptions: { aggregateTimeout: 200 },
    plugins: [
      new MomentLocalesPlugin({ localesToKeep: ['en-gb', 'nb'] }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'server/views/@template.hbs'),
        filename: path.resolve(__dirname, 'server/views/index.hbs'),
        inject: true,
      }),
      new WebpackBuildNotifierPlugin({
        logo: path.join(__dirname, '/server/public/images/favicon/mstile-150x150.png'),
        sound: process.env.WEBPACK_NOTIFICATIONS_SOUND,
        suppressSuccess: process.env.WEBPACK_NOTIFICATIONS_SUPPRESSSUCCESS === 'true',
        showDuration: process.env.WEBPACK_NOTIFICATIONS_SHOWDURATION === 'true',
      }),
      new LiveReloadPlugin(),
      new BundleAnalyzerPlugin({ analyzerMode: process.env.BUNDLE_ANALYZER_MODE })
    ]
  })

module.exports = config
