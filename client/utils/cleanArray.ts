import _ from 'underscore'

/**
 * Cleans an array removing `undefined` and `null`
 *
 * @param array - Array
 */
export function cleanArray<T = any>(array: T[]): T[] {
  return _.filter(array, Boolean)
}
