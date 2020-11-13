import get from 'get-value'
import set from 'set-value'

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
 * Get value from object
 *
 * @param {any} obj Obj
 * @param {string} exp Expression
 * @param {T} defaultValue Default value
 */
export function getValue<T = any>(obj: any, exp: string, defaultValue?: T): T {
  return get(obj, exp, defaultValue && { default: defaultValue })
}

/**
 * Set value in object
 *
 * @param {any} obj Obj
 * @param {string} exp Expression
 * @param {T} defaultValue Default value
 */
export function setValue<T = any>(obj: any, exp: string, value?: T): any {
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
