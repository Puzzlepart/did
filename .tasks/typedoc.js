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
       
       ${cyan('Generating documentation...')}
       
       `))

concurrently([
    { command: 'typedoc -options ./shared/typedoc.json ', name: 'typedoc/shared' },
    { command: 'typedoc -options ./server/typedoc.json', name: 'typedoc/server' },
    { command: 'typedoc -options ./client/typedoc.json', name: 'typedoc/client' }
], {})