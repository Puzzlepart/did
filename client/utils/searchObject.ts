import { isEmpty } from 'underscore'
/**
 * Search object
 *
 * @param {string} item Item
 * @param {string} searchStr The string to search for
 */
export function searchObject<T = any>(item: T, searchStr: string) {
  if (isEmpty(searchStr)) return true
  try {
    return JSON.stringify(item).toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
  } catch (error) {
    return false
  }
}
