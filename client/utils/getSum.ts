
import get from 'get-value'
import _ from 'underscore'

type Item = { [key: string]: any }

/**
 * Get sum for a property in the array using `_.reduce`.
 *
 * @param items - Items
 * @param property - Property key
 */
export function getSum(items: Item[], property: string): number {
  return _.reduce(
    items,
    (sum, item) => (sum += get(item, property, { default: 0 })),
    0
  )
}
