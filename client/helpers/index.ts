import getValue from 'get-value'

/**
 * Converts string to array buffer
 *
 * @param {string} str String
 *
 * @category Helper
 */
export function stringToArrayBuffer(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== str.length; ++i) {
    view[i] = str.charCodeAt(i) & 0xff
  }
  return buf
}

/**
 * Currency display
 *
 * @param {number} num Number
 * @param {string} currency Currency
 * @param {number} minimumFractionDigits Minimum fraction digits
 *
 * @category Helper
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export function currencyDisplay(
  num: number,
  currency = 'NOK',
  minimumFractionDigits = 0
): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
  })
  return formatter.format(num)
}

/**
 * Get value from object typed
 *
 * @param {any} obj Obj
 * @param {string} exp Expression
 * @param {T} defaultValue Default value
 *
 * @category Helper
 */
export function value<T>(obj: any, exp: string, defaultValue?: T): T {
  return getValue(obj, exp, defaultValue && { default: defaultValue })
}

/**
 * Sort alphabetically
 *
 * @param {string[]} strArray Array of strings to sort
 *
 * @category Helper
 */
export function sortAlphabetically(strArray: string[]): string[] {
  return strArray.sort((a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
}
