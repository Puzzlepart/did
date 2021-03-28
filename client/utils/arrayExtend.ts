import { arrayMap } from './arrayMap'

/**
 * Extends all items in the `array` with `props`
 * if `condition` equals `true`
 *
 * @param array - Array
 * @param props - Props to set
 * @param condition - Condition
 */
export function arrayExtend<T = any>(
  array: T[],
  props?: Record<keyof T, any>,
  condition = true
): T[] {
  if (!condition) return array
  return arrayMap(array, (element) => ({
    ...element,
    ...props
  }))
}
