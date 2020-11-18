import chalk from 'chalk'
import logger, { LogLevelDesc } from 'loglevel'
import * as prefix from 'loglevel-plugin-prefix'

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red
}

prefix.reg(logger)
logger.setLevel(process.env.LOG_LEVEL as LogLevelDesc)

prefix.apply(logger, {
  format(level, name, timestamp) {
    return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](level)} ${chalk.green(`${name}:`)}`
  }
})

prefix.apply(logger.getLogger('critical'), {
  format(level, name, timestamp) {
    return chalk.red.bold(`[${timestamp}] ${level} ${name}:`)
  }
})

export default logger
