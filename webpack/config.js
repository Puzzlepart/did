/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

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
  DEFINITIONS
} = require('./constants')
const { getResolves } = require('./getResolves')
const { getPluginsForEnvironment } = require('./getPluginsForEnvironment')
const { getOptimizationForEnvironment } = require('./getOptimizationForEnvironment')

const config = {
  mode: MODE,
  entry: SRC_PATH,
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
              configFile: TSCONFIG_PATH,
              transpileOnly: IS_DEVELOPMENT
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
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}

module.exports = config
