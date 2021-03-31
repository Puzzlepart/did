/**
 * Sort alphabetically
 *
 * @param strArray - Array of strings to sort alphabetically
 */
export function sortAlphabetically(stringArray: string[]): string[] {
  return stringArray.sort((a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
}
