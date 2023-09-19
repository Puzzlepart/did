/**
 * Returns an array of values for a given property of an array of objects.
 *
 * @param array - The array of objects to map.
 * @param property - The property to map from each object in the array.
 *
 * @returns An array of values for the given property.
 */
export function mapProperty<T, R = any>(array: T[], property: keyof T): R[] {
  if (!array) return []
  return array.map((item) => item[property]).filter(Boolean) as unknown as R[]
}
