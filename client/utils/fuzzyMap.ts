/* eslint-disable unicorn/prevent-abbreviations */
import _ from 'underscore'

type FuzzyMapObjectType<T> = T[] | Record<string, T>
type FuzzyMapCallbackFunction<T, R> = (
  item: T,
  key: number | string,
  index?: number
) => R

/**
 * Maps over an array or object and returns a new array with the results of calling a provided function on every element.
 * The provided function can be used to filter out unwanted elements by returning a falsy value.
 *
 * @param obj The array or object to map over.
 *
 * @param callbackFunction The function to call on each element.
 */
export function fuzzyMap<T, R = T>(
  obj: FuzzyMapObjectType<T>,
  callbackFunction: FuzzyMapCallbackFunction<T, R>
) {
  if (_.isArray(obj))
    return obj
      .map((item, index) => callbackFunction(item, index))
      .filter(Boolean)
  return Object.entries(obj).map(([key, value], index) =>
    callbackFunction(value, key, index)
  )
}
