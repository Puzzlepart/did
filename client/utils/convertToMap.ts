/**
 * Converts an `object` to a `Map`
 *
 * @param object - Object
 */
export function convertToMap<KeyType = string>(
  object: Record<string, any>
): Map<KeyType, any> {
  return new Map<KeyType, any>(Object.entries(object) as any)
}
