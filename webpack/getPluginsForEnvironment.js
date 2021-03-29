/* eslint-disable @typescript-eslint/no-var-requires */
const tryRequire = require('try-require')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const {
  HTML_PLUGIN_TEMPLATE,
  HTML_PLUGIN_FILE_NAME,
  DEFINITIONS,
  IS_DEVELOPMENT,
  TSCONFIG_PATH
} = require('./constants')

/**
 * Get plugins config for webpack based on
 * node environment
 *
 * @returns plugins config for webpack
 */
function getPluginsForEnvironment() {
  let plugins = [
    new HtmlWebpackPlugin({
      template: HTML_PLUGIN_TEMPLATE,
      filename: HTML_PLUGIN_FILE_NAME,
      inject: true,
    }),
    new webpack.DefinePlugin(DEFINITIONS)
  ]
  if (!IS_DEVELOPMENT) return plugins
  const LiveReloadPlugin = tryRequire('webpack-livereload-plugin')
  const WebpackBuildNotifierPlugin = tryRequire('webpack-build-notifier')
  const ForkTsCheckerWebpackPlugin = tryRequire('fork-ts-checker-webpack-plugin')
  const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
  const { CustomCompileHooks } = require('./compileHooks')
  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: TSCONFIG_PATH,
        profile: process.env.FORK_TS_CHECKER_WEBPACK_PLUGIN_PROFILE === '1'
      },
      logger: { infrastructure: 'silent', issues: 'console' }
    }),
    new ForkTsCheckerNotifierWebpackPlugin({ skipSuccessful: true }),
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
