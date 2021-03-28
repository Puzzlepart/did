/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { promisify } = require('util')
const format = require('string-format')
const writeFileAsync = promisify(fs.writeFile)
const readFileAsync = promisify(fs.readFile)
const localtunnel = require('localtunnel')
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
    /**
     * Adding our `watchRun` hook that checks if 
     * `localtunnel` should be set up.
     */
    compiler.hooks.watchRun.tapAsync(
      CustomCompileHooks.name,
      async ({ compilation }, callback) => {
        if (!this.isFirstRun) {
          return callback()
        }
        if (this.options.localtunnel.subdomain) {
          const { port, subdomain, callback } = this.options.localtunnel
          log(`[${CustomCompileHooks.name}] Setting up localtunnel at ${subdomain}:${port}`)
          const tunnel = await localtunnel({
            subdomain,
            port,
          })
          await writeFileAsync(
            './.localtunnel',
            format(callback, tunnel.url)
          )
          this.url = tunnel.url
        } else {
          await writeFileAsync('./.localtunnel', '')
        }
        callback()
      }
    )

    /**
     * Adding our `done` hook that opens
     * the `url` in the browser using `open`
     * if `options.open` is specified.
     */
    compiler.hooks.done.tapAsync(
      CustomCompileHooks.name,
      ({ compilation }, callback) => {
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
          `${chalk.cyan('npm run package:client')}`
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

module.exports = {
  CustomCompileHooks
}