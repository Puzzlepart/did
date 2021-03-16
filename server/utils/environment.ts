import createDebug from 'debug'
import { isBlank } from 'underscore.string'
const debug = createDebug('environment')

type EnvironmentParseOptions = { splitBy?: string }

/**
 * Get environment variable by key with optional fallbackvalue
 *
 * Makes it easier to work with process.env.
 *
 * @param key - Key
 * @param fallbackValue - Fallback vaue if key is not found
 * @param options - options
 */
export function environment<T = string>(
  key: string,
  fallbackValue?: string,
  options: EnvironmentParseOptions = {}
): T {
  const value = process.env[key]
  if (isBlank(value)) {
    debug(
      'Missing environment variable %s. Using %s instead.',
      key,
      fallbackValue
    )
    return (fallbackValue as unknown) as T
  }
  if (options.splitBy) return (value.split(options.splitBy) as unknown) as T
  return (value as unknown) as T
}
