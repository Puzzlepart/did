/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prevent-abbreviations */
const webpack = require('webpack')
const constants = require('./constants')

/**
 * Resolve a git metadata value from environment or the GitRevisionPlugin.
 *
 * @param {Object} options resolution options
 * @param {string} options.envKey environment variable to check first
 * @param {() => string | undefined} [options.getter] fallback getter
 * @param {string} [options.fallback] default value when neither source is available
 *
 * @returns {string} resolved value
 */
function resolveGitValue({ envKey, getter, fallback = 'unknown' }) {
  const envValue = process.env[envKey]
  if (typeof envValue === 'string' && envValue.trim() !== '') {
    return envValue.trim()
  }

  if (typeof getter !== 'function') {
    return fallback
  }

  try {
    const result = getter()
    if (typeof result === 'string' && result.trim() !== '') {
      return result.trim()
    }
    if (result) {
      return result
    }
  // eslint-disable-next-line unicorn/prefer-optional-catch-binding
  } catch (error) {
    // Swallow errors when git metadata is unavailable (e.g., .git not in Docker context)
  }

  return fallback
}

/**
 * Makes environment variables available to the client side
 * using the `DefinePlugin` from `webpack`.
 * 
 * @param {*} gitRevisionPlugin Git revision plugin
 * 
 * @returns {webpack.DefinePlugin} Webpack plugin
 */
function createExportedVarsPlugin(gitRevisionPlugin) {
  const repositoryUrl = constants.get('REPOSITORY_URL')
  const commithash = resolveGitValue({
    envKey: 'GIT_COMMIT',
    getter: () => gitRevisionPlugin?.commithash?.(),
  })
  const branch = resolveGitValue({
    envKey: 'GIT_BRANCH',
    getter: () => gitRevisionPlugin?.branch?.(),
  })
  const lastcommitdatetime = resolveGitValue({
    envKey: 'GIT_COMMIT_DATETIME',
    getter: () => gitRevisionPlugin?.lastcommitdatetime?.(),
  })
  const commiturl = `${repositoryUrl}/commit/${commithash}`
  const branchurl = `${repositoryUrl}/tree/${branch}`
  return new webpack.DefinePlugin({
    ...constants.get('EXPORTED_ENV_VARS'),
    COMMIT_HASH: JSON.stringify(commithash),
    BRANCH: JSON.stringify(branch),
    LAST_COMMIT_DATETIME: JSON.stringify(lastcommitdatetime),
    COMMIT_URL: JSON.stringify(commiturl),
    BRANCH_URL: JSON.stringify(branchurl),
  })
}

module.exports = createExportedVarsPlugin
