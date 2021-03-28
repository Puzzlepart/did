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

class CustomCompileHooks {
  constructor(options) {
    this.options = options
    this.isFirstRun = true
    this.url = this.options.url
  }

  apply(compiler) {
    compiler.hooks.watchRun.tapAsync(
      CustomCompileHooks.name,
      async ({ compilation }, callback) => {
        if (!this.isFirstRun) return
        if (this.options.localtunnel.subdomain) {
          const { port, subdomain, callback } = this.options.localtunnel
          log(`[${CustomCompileHooks.name}] Setting up localtunnel at ${subdomain}:${port}`)
          const tunnel = await localtunnel({
            subdomain,
            port,
          })
          await writeFileAsync(
            path.resolve(__dirname, '.localtunnel'),
            format(callback, tunnel.url)
          )
          this.url = tunnel.url
        } else {
          await writeFileAsync(path.resolve(__dirname, '.localtunnel'), '')
        }
        callback()
      }
    )
    compiler.hooks.done.tapAsync(
      CustomCompileHooks.name,
      ({ compilation }, callback) => {
        if (!this.isFirstRun) return
        log()
        log()
        log()
        log(`🎉 You can now view ${chalk.bold('did')} in the browser at ${chalk.bold(this.url)} 🎉`)
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
        log()
        open(this.url)
        this.isFirstRun = false
        callback()
      }
    )
  }
}

module.exports = {
  CustomCompileHooks
}