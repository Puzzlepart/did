/* eslint-disable unicorn/prevent-abbreviations */
import stringStripHtml from 'string-strip-html'

/**
 * Returns the number in fixed-point notation.
 *
 * @param num - Number value
 * @param fractionDigits - Fraction digits
 */
export function toFixed(num: number,fractionDigits = 0): number {
  return Number.parseFloat(num.toFixed(fractionDigits))
}
