require('dotenv').config()
const concurrently = require('concurrently')
const chalk = require('chalk')
const { promisify } = require('util')
const rimraf = require('rimraf')
const rmdir = promisify(rimraf)
const path = require('path')
const package_archive = require('./package.archive')
const log = console.log

async function run() {
  log(chalk.white(`                                                              
                ddddddd                     ddddddd            
                d:::::d   iiii              d:::::d            
                d:::::d  i::::i             d:::::d            
                d:::::d   iiii              d:::::d            
                d:::::d                     d:::::d            
       ddddddddd::::::d  iiiiii    ddddddddd::::::d            
     d::::::::::::::::d  i::::i  d::::::::::::::::d            
    d:::::::ddddd:::::d  i::::i d:::::::ddddd:::::d            
    d::::::d    d:::::d  i::::i d::::::d    d:::::d            
    d:::::d     d:::::d  i::::i d:::::d     d:::::d            
    d:::::d     d:::::d  i::::i d:::::d     d:::::d            
    d::::::ddddd::::::d  i::::i d::::::ddddd::::::d            
     d::::::::::::::::d  i::::i d:::::::::::::::::d            
       dddddddddddddddd  iiiiii   ddddddddddddddddd 

  `))

  // if (process.env.NODE_ENV === 'development') {
  // const dir = path.resolve(__dirname, '../', 'dist')
  // log()
  // log()
  // log(`Cleaning directory ${chalk.cyan(dir)} 🗑️`)
  // log()
  // log()
  // await rmdir(dir)
  // }

  // await concurrently([
  //   { command: 'npm run package:client', name: 'package:client' },
  //   { command: "npm run build:server", name: 'build:server' }
  // ], {})
  await package_archive()
}
run()