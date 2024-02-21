/* eslint-disable no-console */
/**
 * Main entry point for the http server (using [http](https://www.npmjs.com/package/http))
 *
 * @module /
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import chalk from 'chalk'
import * as http from 'http'
import app from './app'
import { environment } from './utils/environment'
const log = console.log

/**
 * Start server on the specified `port`
 *
 * @param port - Port
 */
export async function startServer(port: string) {
  await app.setup()
  app.instance.set('port', port)

  const server = http.createServer(app.instance)

  /**
   * On error handler for the [http](https://www.npmjs.com/package/http)
   * server.
   *
   * @param error - Error
   */
  function onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch (error.code) {
      case 'EACCES': {
        log()
        log(
          chalk.red(
            `😭 Did server error: ${bind} requires elevated privileges 😭`
          )
        )
        log()
        process.exit(1)
      }
      case 'EADDRINUSE': {
        log()
        log(chalk.red(`😭 Did server error: ${bind} is already in use 😭`))
        log()
        process.exit(1)
      }
      default: {
        throw error
      }
    }
  }

  /**
   * On listening handler for the [http](https://www.npmjs.com/package/http)
   * server.
   */
  function onListening() {
    log()
    log(chalk.cyan(`Did server listening on port [${port}] 🚀`))
    log()
  }

  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
}

export * from './app'

// eslint-disable-next-line unicorn/prefer-top-level-await
startServer(environment('PORT', '9001'))
