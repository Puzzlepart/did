/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/empty-brace-spaces */
/* eslint-disable @typescript-eslint/no-var-requires */
const tryRequire = require('try-require')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const constants = require('./constants')
const gitRevisionPlugin = new GitRevisionPlugin()
const createExportedVarsPlugin = require('./exportedVarsPlugin')

/**
 * Get plugins config for webpack based on
 * node environment. If development, add
 * plugins for live reload, notifications, etc.
 *
 * @returns plugins config for webpack
 */
function getPluginsForEnvironment() {
  const exportedVarsPlugin = createExportedVarsPlugin(gitRevisionPlugin)
  let plugins = [
    gitRevisionPlugin,
    new HtmlWebpackPlugin({
      template: constants.get('HTML_PLUGIN_TEMPLATE'),
      filename: constants.get('HTML_PLUGIN_FILE_NAME'),
      inject: true,
    }),
    exportedVarsPlugin
  ]
  if (!constants.get('IS_DEVELOPMENT')) return plugins
  const LiveReloadPlugin = tryRequire('webpack-livereload-plugin')
  const WebpackBuildNotifierPlugin = tryRequire('webpack-build-notifier')
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
      localtunnel: {
        port: process.env.PORT || 9001,
        subdomain: process.env.LOCALTUNNEL_SUBDOMAIN,
        callback: '{0}/auth/azuread-openidconnect/callback'
      },
      launchBrowser: process.env.LAUNCH_BROWSER === '1'
    }),
    new LiveReloadPlugin(),
    new WebpackBuildNotifierPlugin({
      logo: path.resolve('./server/public/images/favicon/apple-touch-icon.png'),
      sound: process.env.WEBPACK_NOTIFICATIONS_SOUND,
      suppressWarning: true,
      showDuration: true
    })
  )
  return plugins
}
exports.getPluginsForEnvironment = getPluginsForEnvironment
