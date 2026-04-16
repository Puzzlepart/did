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
  },
  watchOptions: {
    // Polling is required inside Docker on macOS (inotify events don't
    // propagate from the host volume into the container).
    poll: 2000,
    aggregateTimeout: 500,
    // Ignore node_modules and the HtmlWebpackPlugin output directory —
    // without this, writing index.hbs triggers an infinite rebuild loop.
    ignored: [/node_modules/, /server[\\/]views/, /server[\\/]public/]
  }
}

module.exports = config
