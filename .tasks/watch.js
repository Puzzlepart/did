const concurrently = require('concurrently')
const chalk = require('chalk')
const rmdir = require('rimraf')
const path = require('path')
const log = console.log

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
       
       `))

const dir = path.resolve(__dirname, '../', 'server', 'public', 'js')

log(`Cleaning directory ${chalk.cyan(dir)} 🗑️`)

rmdir(dir, () => {
  concurrently([
    { command: 'nodemon ', name: 'server' },
    { command: 'webpack --watch', name: 'client' }
  ], {})
})