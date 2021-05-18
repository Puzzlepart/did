/**
 * Makes a deep copy of the object
 *
 * @param obj - Object
 */
export function deepCopy(object: any): any {
  return JSON.parse(JSON.stringify(object))
}
