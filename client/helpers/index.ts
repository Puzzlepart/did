import getValue from 'get-value'
import setValue from 'set-value'

/**
 * Converts string to array buffer
 *
 * @param {string} str String
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
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export function currencyDisplay(num: number, currency: string = 'NOK', minimumFractionDigits: number = 0): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
  })
  return formatter.format(num)
}

/**
 * Get value from object
 *
 * @param {any} obj Obj
 * @param {string} exp Expression
 * @param {T} defaultValue Default value
 */
export function get<T = any>(obj: any, exp: string, defaultValue?: T): T {
  return getValue(obj, exp, defaultValue && { default: defaultValue })
}

/**
 * Set value in object
 *
 * @param {any} obj Obj
 * @param {string} exp Expression
 * @param {T} defaultValue Default value
 */
export function set<T = any>(obj: any, exp: string, value?: T): T {
  return set(obj, exp, value)
}

/**
 * Sort alphabetically
 *
 * @param {string[]} strArray Array of strings to sort
 */
export function sortAlphabetically(strArray: string[]): string[] {
  return strArray.sort((a, b) => {
    if (a > b) return 1
    if (a < b) return -1
    return 0
  })
}
