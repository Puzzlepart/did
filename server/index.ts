/* eslint-disable tsdoc/syntax */
/**
 * Main entry point for the http server (using `http`)
 *
 * @module /
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as http from 'http'
import app from './app'
import { environment } from './utils/environment'
const debug = require('debug')('server')

/**
 * Start server on the specified port
 *
 * @param port - Port
 */
export async function startServer(port: string) {
  await app.setup()
  app.instance.set('port', port)

  const server = http.createServer(app.instance)

  function onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch (error.code) {
      case 'EACCES':
        debug('\u001B[31m', `${bind} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        debug('\u001B[31m', `${bind} is already in use`)
        process.exit(1)
        break
      default:
        throw error
    }
  }

  function onListening() {
    debug('\u001B[32m', `Server listening on port [${port}]`)
  }

  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
}

export * from './app'

startServer(environment('PORT', '8080'))
