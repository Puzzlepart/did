import createDebug from 'debug'
import { isBlank } from 'underscore.string'
const debug = createDebug('environment')

/**
 * Get environment variable by key with optional fallbackvalue
 * 
 * Makes it easier to work with process.env.
 *
 * @param key - Key
 * @param fallbackValue - Fallback vaue if key is not found
 */
export function environment(key: string, fallbackValue: string = null) {
  const value = process.env[key]
  if (isBlank(value)) {
    debug('Missing environment variable %s. Using %s instead.', key, fallbackValue)
    return fallbackValue || null
  }
  return value
}
