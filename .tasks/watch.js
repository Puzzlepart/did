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
  concurrently([
    { command: 'nodemon', name: 'server' },
    { command: webpackCmd, name: 'client' }
  ], {})
})