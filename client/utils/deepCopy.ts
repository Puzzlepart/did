/**
 * Makes a deep copy of the object
 *
 * @param object - Object
 */
export function deepCopy(object: any): any {
  return JSON.parse(JSON.stringify(object))
}
