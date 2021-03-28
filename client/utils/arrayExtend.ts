import { arrayMap } from './arrayMap'

type ArrayExtendProps<T> = Record<keyof T, any> | ((element: T) => Record<keyof T, any>)

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
  props?: ArrayExtendProps<T>,
  condition = true
): T[] {
  if (!condition) return array
  return arrayMap(array, (element) => {
    if (typeof props === 'function') {
      return {
        ...element,
        ...props(element)
      }
    }
    return {
      ...element,
      ...props
    }
  })
}
