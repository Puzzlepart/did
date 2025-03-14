/* eslint-disable @typescript-eslint/no-unused-vars */
import { isNullish } from './isNullish'

/**
 * Remove all nullish values from an object.
 *
 * @param object - Object to check
 */
export function removeNullishValues<T = any>(value: T): T {
  if (typeof value !== 'object' || value === null) {
    return value
  }
  return Object.keys(value).reduce((acc, key) => {
    const val = value[key as keyof T]
    if (!isNullish(val)) {
      acc[key as keyof T] = val
    }
    return acc
  }, {} as T)
}
