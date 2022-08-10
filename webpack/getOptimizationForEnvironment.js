/* eslint-disable unicorn/better-regex */
/* eslint-disable @typescript-eslint/no-var-requires */
const packageFile = require('../package.json')

/**
 * Get optimization config for webpack based on
 * node environment
 * 
 * Automatically split `vendor` and `commons`
 * - https://twitter.com/wSokra/status/969633336732905474
 * - https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
 * 
 * @param isDevelopment - Is development
 *
 * @returns optimization config for webpack
 */
function getOptimizationForEnvironment(isDevelopment) {
  let optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    },
    minimize: false,
    minimizer: []
  }
  if (!isDevelopment) {
    const TerserPlugin = require('terser-webpack-plugin')
    optimization.minimize = true
    optimization.minimizer.push(new TerserPlugin(packageFile.terser))
  }
  return optimization
}

exports.getOptimizationForEnvironment = getOptimizationForEnvironment
