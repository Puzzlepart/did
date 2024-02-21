/* eslint-disable unicorn/numeric-separators-style */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const constants = require('./constants')
const { getResolves } = require('./getResolves')
const { getPluginsForEnvironment } = require('./getPluginsForEnvironment')
const { getOptimizationForEnvironment } = require('./getOptimizationForEnvironment')
const { getRules } = require('./getRules')

const config = {
  mode: constants.get('MODE'),
  entry: constants.get('SRC_PATH'),
  output: {
    path: constants.get('PUBLIC_JS_PATH'),
    filename: constants.get('BUNDLE_FILE_NAME'),
    publicPath: '/js',
    hashFunction: 'xxhash64'
  },
  optimization: getOptimizationForEnvironment(constants.get('IS_DEVELOPMENT')),
  module: {
    rules: getRules(
      constants.get('TSCONFIG_PATH'), 
      constants.get('IS_DEVELOPMENT')
    )
  },
  resolve: getResolves(constants.get('TSCONFIG_COMPILER_OPTIONS')),
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
