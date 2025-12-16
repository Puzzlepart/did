/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/empty-brace-spaces */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const tryRequire = require('try-require')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const constants = require('./constants')
const createExportedVarsPlugin = require('./exportedVarsPlugin')

/**
 * Get plugins config for webpack based on
 * node environment. If development, add
 * plugins for live reload, notifications, etc.
 *
 * @returns plugins config for webpack
 */
function getPluginsForEnvironment() {
  const gitDirectoryPath = path.resolve(process.cwd(), '.git')
  // Determine if we should enable the GitRevisionPlugin.
  // We require three things:
  //  1. A .git directory is present (mounted or cloned)
  //  2. The git binary exists in the runtime image
  //  3. The developer has not explicitly disabled it via SKIP_GIT_PLUGIN=1
  const hasGitDirectory = fs.existsSync(gitDirectoryPath)
  let hasGitBinary = false
  if (hasGitDirectory) {
    try {
      // Only check for the binary; avoid running git commands that assume a work tree.
      require('child_process').execSync('command -v git', { stdio: 'ignore' })
      hasGitBinary = true
    } catch {
      hasGitBinary = false
    }
  }
  const skipByEnv = process.env.SKIP_GIT_PLUGIN === '1'
  const shouldUseGitPlugin = hasGitDirectory && hasGitBinary && !skipByEnv
  if (!shouldUseGitPlugin && process.env.IS_DEVELOPMENT === '1') {
    // eslint-disable-next-line no-console
    console.log('[webpack] Git metadata plugin disabled:', JSON.stringify({ hasGitDirectory, hasGitBinary, skipByEnv }))
  }
  const gitRevisionPlugin = shouldUseGitPlugin ? new GitRevisionPlugin() : null
  const exportedVarsPlugin = createExportedVarsPlugin(gitRevisionPlugin)
  let plugins = [
    ...(gitRevisionPlugin ? [gitRevisionPlugin] : []),
    new HtmlWebpackPlugin({
      template: constants.get('HTML_PLUGIN_TEMPLATE'),
      filename: constants.get('HTML_PLUGIN_FILE_NAME'),
      inject: true,
    }),
    exportedVarsPlugin
  ]
  if (!constants.get('IS_DEVELOPMENT')) return plugins
  const LiveReloadPlugin = tryRequire('webpack-livereload-plugin')
  const ForkTsCheckerWebpackPlugin = tryRequire('fork-ts-checker-webpack-plugin')
  const CustomCompileHooks = require('./compileHooks')
  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: constants.get('TSCONFIG_PATH'),
        profile: process.env.FORK_TS_CHECKER_WEBPACK_PLUGIN_PROFILE === '1'
      },
      logger: {
        log: () => { },
        error: () => { }
      }
    }),
    new CustomCompileHooks({
      url: new URL(process.env.MICROSOFT_REDIRECT_URI).origin,
      launchBrowser: process.env.LAUNCH_BROWSER === '1'
    }),
    new LiveReloadPlugin()
  )
  return plugins
}
exports.getPluginsForEnvironment = getPluginsForEnvironment
