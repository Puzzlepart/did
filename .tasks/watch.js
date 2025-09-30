require('dotenv').config()
const concurrently = require('concurrently')
const chalk = require('chalk')
const rmdir = require('rimraf')
const path = require('path')
const _ = require('underscore')
const log = console.log

const analyzeMode = _.contains(process.argv, 'analyze')

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
       
       ${chalk.cyan('Watching client and server changes concurrently...')}

       
       ${analyzeMode ? chalk.magenta('[Running webpack in analyze mode]') : ''}

  `))

const dir = path.resolve(__dirname, '../', 'server', 'public', 'js')

log()
log()
log(`Cleaning directory ${chalk.cyan(dir)} 🗑️`)
log()
log()

let webpackCmd = 'webpack --config webpack/config.js --watch'

if (_.contains(process.argv, 'analyze')) {
  webpackCmd += ' --analyze'
}

rmdir(dir, () => {
  log(chalk.yellow('[watch] Starting concurrent processes...'))
  log(chalk.yellow(`[watch] server: nodemon`))
  log(chalk.yellow(`[watch] client: ${webpackCmd}`))
  const cp = concurrently([
    { command: 'nodemon', name: 'server', prefixColor: 'blue' },
    { command: webpackCmd, name: 'client', prefixColor: 'magenta' }
  ], {
    killOthers: ['failure'],
    restartTries: 0,
    prefix: '{name} |',
    raw: false
  })

  // concurrently v6 returns an object with a .successPromise and .result may be undefined
  const promise = cp.success || cp.successPromise || cp.result || cp
  if (promise && typeof promise.then === 'function') {
    promise.then(() => {
      log(chalk.green('[watch] All processes exited cleanly'))
    }).catch((error) => {
      log(chalk.red('[watch] A process exited with error'))
      if (Array.isArray(error)) {
        error.forEach(e => log(chalk.red(`[watch]   -> ${e.command?.name || 'proc'} exited with code ${e.exitCode}`)))
      } else if (error) {
        log(chalk.red(`[watch]   -> ${error.message || error}`))
      }
    })
  } else {
    log(chalk.yellow('[watch] (info) Unable to attach completion promise; continuing'))
  }
})