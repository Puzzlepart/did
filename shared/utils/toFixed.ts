/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value - The number to be rounded.
 * @param precision - The number of decimal places to round to. Default is 2.
 *
 * @returns The rounded number.
 */
export const toFixed = (value: number, precision = 2) => {
  return Number.parseFloat(value.toFixed(precision))
}
