import { isEmpty } from 'underscore'

/**
 * Search object
 *
 * @param item - Item
 * @param searchStr - The string to search for
 */
export function searchObject<T = any>(item: T, searchString: string) {
  if (isEmpty(searchString)) return true
  try {
    return (
      JSON.stringify(item).toLowerCase().includes(searchString.toLowerCase())
    )
  } catch {
    return false
  }
}
