/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('./app')
const http = require('http')
const env = require('./utils/env')
const port = env('PORT', '8080')
const log = require('debug')('server')
app._.set('port', port)

const server = http.createServer(app._)

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      log('\x1b[31m', `[${bind} requires elevated privileges]`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      log('\x1b[31m', `[${bind} is already in use]`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  log('\x1b[32m', `[Server listening on port ${port}]`)
}

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
