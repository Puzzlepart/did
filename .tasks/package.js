require('dotenv').config()
const concurrently = require('concurrently')
const chalk = require('chalk')
const { promisify } = require('util')
const rimraf = require('rimraf')
const rmdir = promisify(rimraf)
const path = require('path')
const archivePackage = require('./archivePackage')
const log = console.log

async function run() {
  if (process.env.CI !== 'true') {
    const dir = path.resolve(__dirname, '../', 'dist')
    log()
    log()
    log(`Cleaning directory ${chalk.cyan(dir)} 🗑️`)
    log()
    log()
    await rmdir(dir)
  }

  await concurrently([
    { command: 'npm run package:client', name: 'package:client' },
    { command: "npm run build:server", name: 'build:server' }
  ], {
    prefix: 'none'
  })
  await archivePackage({
    includeNodeModules: process.env.INCLUDE_NODE_MODULES === '1',
    includePackageLockFile: process.env.INCLUDE_PACKAGE_LOCK_FILE !== '0'
  })
}
run()