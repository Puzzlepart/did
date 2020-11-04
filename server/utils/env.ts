import { isBlank } from 'underscore.string'
import createDebug from 'debug'
const debug = createDebug('env')

/**
 * Get environment variable by key with optional fallbackvalue
 *
 * @param {string} key Key
 * @param {any} fallbackValue Fallback vaue if key is not found
 */
const getEnvironmentVariable = (key: string, fallbackValue: any = null) => {
  const value = process.env[key]
  if (isBlank(value)) {
    debug('Missing environment variable %s', key)
    return fallbackValue || null
  }
  return value
}

export default getEnvironmentVariable
