import get from 'get-value'
import _ from 'underscore'

/**
 * Get sum for a property in the array using `_.reduce`.
 *
 * @param items - Items
 * @param property - Property key
 */
export function getSum<T extends object = any>(
  items: T[],
  property: keyof T
): number {
  return _.reduce(
    items,
    (sum, item) => (sum += get(item, property as string, { default: 0 })),
    0
  )
}
