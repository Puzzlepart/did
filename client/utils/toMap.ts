/**
 * Converts an `object` to a `Map`
 *
 * @param object - Object
 */
export function toMap<V = any>(object: Record<string, V>): Map<string, V> {
  return new Map(Object.entries(object))
}
