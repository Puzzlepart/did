/* eslint-disable no-console */
/* eslint-disable unicorn/switch-case-braces */
/* eslint-disable unicorn/prefer-event-target */
import { EventEmitter } from 'events'
import { Logger } from './logger'

export class LogManager extends EventEmitter {
  private options: LogOptions = {
    minLevels: {
      '': 'debug'
    }
  }

  // Prevent the console logger from being added twice
  private consoleLoggerRegistered: boolean = false

  public configure(options: LogOptions): LogManager {
    this.options = Object.assign({}, this.options, options)
    return this
  }

  public getLogger(module: string): Logger {
    let minLevel = 'none'
    let match = ''

    for (const key in this.options.minLevels) {
      if (module.startsWith(key) && key.length >= match.length) {
        minLevel = this.options.minLevels[key]
        match = key
      }
    }

    return new Logger(this, module, minLevel)
  }

  public onLogEntry(listener: (logEntry: LogEntry) => void): LogManager {
    this.on('log', listener)
    return this
  }

  public registerConsoleLogger(): LogManager {
    if (this.consoleLoggerRegistered) return this

    this.onLogEntry((logEntry) => {
      const message = `${logEntry.location} [${logEntry.module}] ${logEntry.message}`
      switch (logEntry.level) {
        case 'trace':
          console.trace(message)
          break
        case 'debug':
          console.debug(message)
          break
        case 'info':
          console.info(message)
          break
        case 'warn':
          console.warn(message)
          break
        case 'error':
          console.error(message)
          break
        default:
          console.log(`{${logEntry.level}} ${message}`)
      }
    })

    this.consoleLoggerRegistered = true
    return this
  }
}

export interface LogEntry {
  level: string
  module: string
  location?: string
  message: string
}

export interface LogOptions {
  minLevels: { [module: string]: string }
}

export const logging = new LogManager()
