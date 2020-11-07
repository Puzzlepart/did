/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const path = require('path')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

let config = merge(
  require('./@base.js'),
  {
    mode: 'production',
    output: {
      path: path.resolve(__dirname, '../server-dist/public/js'),
      publicPath: '/js',
    },
    stats: 'errors-only',
    plugins: [
      new MomentLocalesPlugin({ localesToKeep: ['en-gb', 'nb'] }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../server/views/@template.hbs'),
        filename: path.resolve(__dirname, '../server-dist/views/index.hbs'),
        inject: true,
      }),
      new CompressionPlugin()
    ],
  })

module.exports = config
