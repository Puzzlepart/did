/* eslint-disable unicorn/better-regex */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Get optimization config for webpack based on
 * node environment
 * 
 * @param isDevelopment - Is development
 *
 * @returns optimization config for webpack
 */
function getOptimizationForEnvironment(isDevelopment) {
  let optimization = {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
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

exports.getOptimizationForEnvironment = getOptimizationForEnvironment
