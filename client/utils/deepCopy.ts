/**
 * Makes a deep copy of the object
 *
 * @param {Object} obj Object
 */
export function deepCopy(obj: Object): Object {
  return JSON.parse(JSON.stringify(obj))
}
