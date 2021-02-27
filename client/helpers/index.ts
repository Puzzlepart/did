import get from 'get-value'
import set from 'set-value'

/**
 * Get value from object
 *
 * @param obj - Obj
 * @param exp - Expression
 * @param defaultValue - Default value
 */
export function getValue<T = any>(obj: any, exp: string, defaultValue?: T): T {
  return get(obj, exp, defaultValue && { default: defaultValue })
}

/**
 * Set value in object
 *
 * @param obj - Obj
 * @param exp - Expression
 * @param defaultValue - Default value
 */
export function setValue<T = any>(obj: any, exp: string, value?: T): any {
  return set(obj, exp, value)
}

/**
 * Sort alphabetically
 *
 * @param strArray - Array of strings to sort
 */
export function sortAlphabetically(strArray: string[]): string[] {
  return strArray.sort((a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
}
