/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const chalk = require('chalk')
const open = require('open')
const log = console.log

/**
 * Custom compile hooks for `watchRun`
 * and `done`
 */
class CustomCompileHooks {
  constructor(options) {
    this.options = options
    this.isFirstRun = true
    this.url = this.options.url
  }

  /**
   * Applies our hooks to the compiler
   * 
   * @param compiler - Compiler
   */
  apply(compiler) {
    compiler.hooks.watchRun.tapAsync(
      CustomCompileHooks.name,
      /**
       * Adding our `watchRun` hook for first run setup
       */
      async ({ }, callback) => {
        if (!this.isFirstRun) {
          return callback()
        }
        callback()
      }
    )
    compiler.hooks.done.tapAsync(
      CustomCompileHooks.name,
      /**
       * Adding our `done` hook that opens
       * the `url` in the browser using `open`
       * if `options.open` is specified.
       */
      ({ }, callback) => {
        if (!this.isFirstRun) {
          return callback()
        }
        log()
        log()
        log()
        log(`🎉 You can now view ${chalk.bold('did')} in the browser at ${chalk.bold(this.url)} 🎉`)
        log()
        log()
        log(`📓 Note that the development build ${chalk.bold('is not')} optimized.`)
        log()
        log()
        log(
          'To create a production build, use ' +
          `${chalk.cyan('NODE_ENV=prouction npm run package:client')}`
        )
        log()
        log()
        if (this.options.launchBrowser) {
          open(this.url)
        } else {
          log(`Set ${chalk.bold.cyan('LAUNCH_BROWSER')} to ${chalk.bold.cyan('1')} in your ${chalk.magenta.bold('.env')} file to automatially launch your browser.`)
          log()
          log()
        }
        this.isFirstRun = false
        callback()
      }
    )
  }
}

module.exports = CustomCompileHooks
