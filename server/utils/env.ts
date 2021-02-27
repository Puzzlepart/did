import { isBlank } from 'underscore.string'
import createDebug from 'debug'
const debug = createDebug('env')

/**
 * Get environment variable by key with optional fallbackvalue
 *
 * @param key - Key
 * @param fallbackValue - Fallback vaue if key is not found
 */
export default function getEnvironmentVariable(key: string, fallbackValue: string = null) {
  const value = process.env[key]
  if (isBlank(value)) {
    debug('Missing environment variable %s', key)
    return fallbackValue || null
  }
  return value
}