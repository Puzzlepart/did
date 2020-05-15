import getValue from 'get-value'
import { TFunction } from 'i18next'
import format from 'string-format'
require('twix')

/**
 * Get duration display
 * 
 * @param {number} duration Duration
 * @param {TFunction} t Translate function
 * 
 * @category Helper
 */
export function getDurationDisplay(duration: number, t?: TFunction): string {
    const hrsShortFormat = t ? t('hoursShortFormat', { ns: 'COMMON', defaultValue: undefined }) : '{0}h'
    const minShortFormat = t ? t('minutesShortFormat', { ns: 'COMMON', defaultValue: undefined }) : '{0}min'
    const hrs = Math.floor(duration)
    const mins = ((duration % 1) * 60)
    const hrsStr = format(hrsShortFormat, hrs)
    const minStr = format(minShortFormat, mins)
    if (mins === 0) return hrsStr
    if (hrs === 0) return minStr
    return `${hrsStr} ${minStr}`
}

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
        view[i] = str.charCodeAt(i) & 0xFF
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
export function currencyDisplay(num: number, currency = 'NOK', minimumFractionDigits = 0): string {
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