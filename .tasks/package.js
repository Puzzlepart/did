require('dotenv').config()
const concurrently = require('concurrently')
const chalk = require('chalk')
const { promisify } = require('util')
const rimraf = require('rimraf')
const rmdir = promisify(rimraf)
const path = require('path')
const archivePackage = require('./archivePackage')
const log = console.log

const DIST_PATH = path.resolve(__dirname, '../', 'dist')
const INCLUDE_NODE_MODULES = process.env.INCLUDE_NODE_MODULES === '1'
const INCLUDE_PACKAGE_LOCK_FILE = process.env.INCLUDE_PACKAGE_LOCK_FILE !== '0'

/**
 * Runs the package script, which cleans the `DIST_PATH` directory and then concurrently 
 * runs the `package:client` and `build:server` scripts. Finally, it archives the package.
 */
async function package() {
  if (process.env.CI !== 'true') {
    log()
    log()
    log(`Cleaning directory ${chalk.cyan(DIST_PATH)} 🗑️`)
    log()
    log()
    await rmdir(DIST_PATH)
  }

  await concurrently([
    { command: 'npm run package:client', name: 'package:client' },
    { command: "npm run build:server", name: 'build:server' }
  ], {
    prefix: 'none',
  })
  await archivePackage({
    includeNodeModules: INCLUDE_NODE_MODULES,
    includePackageLockFile: INCLUDE_PACKAGE_LOCK_FILE
  })
}

// Run the script
package()