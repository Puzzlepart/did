import { reduce } from 'underscore'
import { getValue } from 'helpers'

/**
 * Get sum for a property in the array using underscore reduce
 *
 * @param {any[]} items Items
 * @param {string} property Property name
 *
 * @category Utility
 */
export function getSum(items: any[], property: string): number {
  return reduce(items, (memo, item) => (memo += getValue<number>(item, property, 0)), 0)
}
