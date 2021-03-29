import { getValue } from 'helpers'
import _ from 'underscore'

type Item = { [key: string]: any }

/**
 * Get sum for a property in the array using _.reduce.
 *
 * @param items - Items
 * @param property - Property key
 */
export function getSum(items: Item[], property: string): number {
  return _.reduce(
    items,
    (memo, item) => (memo += getValue<number>(item, property, 0)),
    0
  )
}
