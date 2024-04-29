/* eslint-disable unicorn/error-message */
import EventEmitter from 'events'
import { LogEntry } from './logging'

/* eslint-disable unicorn/prefer-ternary */
export class Logger {
  private logManager: EventEmitter
  private minLevel: number
  private module: string
  private readonly levels: { [key: string]: number } = {
    trace: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5
  }

  constructor(logManager: EventEmitter, module: string, minLevel: string) {
    this.logManager = logManager
    this.module = module
    this.minLevel = this.levelToInt(minLevel)
  }

  /**
   * Converts a string level (trace/debug/info/warn/error) into a number
   *
   * @param minLevel
   */
  private levelToInt(minLevel: string): number {
    if (minLevel.toLowerCase() in this.levels)
      return this.levels[minLevel.toLowerCase()]
    else return 99
  }

  /**
   * Central logging method.
   * @param logLevel
   * @param message
   */
  public log(logLevel: string, message: string): void {
    const level = this.levelToInt(logLevel)
    if (level < this.minLevel) return

    const logEntry: LogEntry = { level: logLevel, module: this.module, message }

    // Obtain the line/file through a thoroughly hacky method
    // This creates a new stack trace and pulls the caller from it.  If the caller
    // if .trace()
    const error = new Error('')
    if (error.stack) {
      const cla = error.stack.split('\n')
      let index = 1
      while (index < cla.length && cla[index].includes('at Logger.Object.'))
        index++
      if (index < cla.length) {
        logEntry.location = cla[index].slice(
          cla[index].indexOf('at ') + 3,
          cla[index].length
        )
      }
    }

    this.logManager.emit('log', logEntry)
  }

  public trace(message: string): void {
    this.log('trace', message)
  }
  public debug(message: string): void {
    this.log('debug', message)
  }
  public info(message: string): void {
    this.log('info', message)
  }
  public warn(message: string): void {
    this.log('warn', message)
  }
  public error(message: string): void {
    this.log('error', message)
  }
}
