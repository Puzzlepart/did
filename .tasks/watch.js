const concurrently = require('concurrently')
const { cyan, white } = require('chalk')
const log = console.log

log(white(`                                                              
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
       
       ${cyan('Watching client and server changes concurrently...')}
       
       `))

concurrently([
    { command: 'nodemon ', name: 'server' },
    { command: 'webpack', name: 'client' },
    { command: 'node .tasks/open.js', name: 'open' },
    { command: 'node .tasks/localtunnel.js', name: 'localtunnel' },
], {})