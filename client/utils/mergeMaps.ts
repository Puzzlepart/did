/**
 * Merges multiple maps into a single map.
 *
 * @param maps The maps to merge.
 *
 * @returns A new map containing all the entries from the input maps.
 */
export function mergeMaps<T = any>(...maps: Map<string, T>[]) {
  return maps.reduce((result, map) => {
    return new Map([
      ...Array.from(result.entries()),
      ...Array.from(map.entries())
    ])
  }, new Map<string, T>())
}
