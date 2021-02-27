/**
 * Makes a deep copy of the object
 *
 * @param obj - Object
 */
export default function deepCopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj))
}
