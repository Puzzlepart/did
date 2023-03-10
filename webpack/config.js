/* eslint-disable unicorn/numeric-separators-style */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const {
  MODE,
  IS_DEVELOPMENT,
  PUBLIC_JS_PATH,
  BUNDLE_FILE_NAME,
  SRC_PATH,
  TSCONFIG_COMPILER_OPTIONS,
  TSCONFIG_PATH,
} = require('./constants')
const { getResolves } = require('./getResolves')
const { getPluginsForEnvironment } = require('./getPluginsForEnvironment')
const { getOptimizationForEnvironment } = require('./getOptimizationForEnvironment')
const { getRules } = require('./getRules')

const config = {
  mode: MODE,
  entry: SRC_PATH,
  output: {
    path: PUBLIC_JS_PATH,
    filename: BUNDLE_FILE_NAME,
    publicPath: '/js',
    hashFunction: 'xxhash64'
  },
  optimization: getOptimizationForEnvironment(IS_DEVELOPMENT),
  module: {
    rules: getRules(
      TSCONFIG_PATH,
      IS_DEVELOPMENT
    )
  },
  resolve: getResolves(TSCONFIG_COMPILER_OPTIONS),
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
