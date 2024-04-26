/**
 * Formats a number as a currency string with a specified prefix.
 *
 * @param x - The number to format as currency.
 * @param prefix - The prefix to prepend to the formatted currency string. Default is 'kr'.
 *
 * @returns The formatted currency string.
 */
export function formatCurrency(x: number | undefined, prefix = 'kr') {
  if (!x) return `${prefix} 0`
  if (typeof x !== 'number') return `${prefix} ${x}`
  return `${prefix} ${x?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}
