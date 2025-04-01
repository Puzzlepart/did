/**
 * Returns an array of values for a given property of an array of objects.
 *
 * @param array - The array of objects to map.
 * @param property - The property to map from each object in the array.
 * @param separators - The separators to split the property value by, first
 * is for all except the last, second is for the last. If no second is provided,
 * the first will be used for the last as well.
 *
 * @returns An array of values of the specified property from each object in the array.
 */
export function mapProperty<T, R = any>(
  array: T[],
  property: keyof T,
  separators: string[] = []
): R {
  if (!array) return [] as R
  const mappedArray = array.map((item) => item[property]).filter(Boolean)
  if (separators.length > 0) {
    if (mappedArray.length === 0) return '' as R
    if (mappedArray.length === 1) return mappedArray[0] as R
    if(separators.length === 1) {
      return mappedArray.join(separators[0]) as R
    }
    const [firstSeparator, lastSeparator] = separators
    return ([...mappedArray].slice(0, -1).join(firstSeparator) +
      lastSeparator +
      mappedArray[mappedArray.length - 1]) as R
  }
  return mappedArray as R
}
