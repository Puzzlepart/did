/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { TSCONFIG_COMPILER_OPTIONS } = require('./constants')

/**
 * Get resolve config for webpack based on
 * node environment
 *
 * @returns resolve config for webpack
 */
function getResolves({ baseUrl, paths }) {
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
exports.getResolves = getResolves
