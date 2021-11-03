/* eslint-disable no-console */
/* eslint-disable tsdoc/syntax */
/**
 * Main entry point for the http server (using [http](https://www.npmjs.com/package/http))
 *
 * @module /
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import chalk from 'chalk'
import * as http from 'node:http'
import app from './app'
import { sound } from './utils'
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

    if (environment('SERVER_STOPPED_SOUND')) {
      sound(__dirname, environment('SERVER_STOPPED_SOUND'))
    }

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
      default:
        throw error
    }
  }

  /**
   * On listening handler for the [http](https://www.npmjs.com/package/http)
   * server.
   *
   * @remarks If `NODE_ENV` is **development** and `SERVER_LISTENING_SOUND` is set,
   * a sound will be play when the server is listening. This can be helpful when
   * developing. But the *.mp3 files on the root server folder.
   */
  function onListening() {
    if (environment('SERVER_LISTENING_SOUND')) {
      sound(__dirname, environment('SERVER_LISTENING_SOUND'))
    }
    log()
    log(chalk.cyan(`Did server listening on port [${port}] 🚀`))
    log()
  }

  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
}

export * from './app'

startServer(environment('PORT', '9001'))
