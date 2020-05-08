import { ITypedHash, stringIsNullOrEmpty } from '@pnp/common';
import getValue from 'get-value';
import resource from 'i18n';
import * as moment from 'moment';
import format from 'string-format';
import { capitalize } from 'underscore.string';
require('moment/locale/en-gb');
require('twix');

/**
 * Get duration display
 * 
 * @param {number} minutes Minutes
 * @param {number} hours Hours
 * 
 * @category Helper
 */
export function getDurationDisplay(minutes: number, hours?: number): string {
    const hrsShortFormat = resource('COMMON.HOURS_SHORTFORMAT');
    const minShortFormat = resource('COMMON.MINUTES_SHORTFORMAT');
    const hrs = hours ? Math.floor(hours) : Math.floor(minutes / 60);
    const mins = hours ? ((hours % 1) * 60) : minutes % 60;
    const hrsStr = format(hrsShortFormat, hrs);
    const minStr = format(minShortFormat, mins);;
    if (mins === 0) return hrsStr;
    if (hrs === 0) return minStr;
    return `${hrsStr} ${minStr}`;
}

/**
 * Converts string to array buffer
 * 
 * @param {string} str String
 * 
 * @category Helper
 */
export function stringToArrayBuffer(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== str.length; ++i) {
        view[i] = str.charCodeAt(i) & 0xFF;
    }
    return buf;
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
    return formatter.format(num);
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
export function value<T>(obj: any, exp: string, defaultValue: T): T {
    return getValue(obj, exp, { default: defaultValue });
}

/**
 * Format date
 * 
 * @param {string} date Date string
 * @param {string} dateFormat Date format
 * 
 * @category Helper
 */
export function formatDate(date: string, dateFormat: string): string {
    const m = moment.utc(date);
    return m.add(-m.toDate().getTimezoneOffset(), 'minutes').format(dateFormat);
}

/**
 * Get start of week
 * 
 * @param {string | Date | moment.Moment} date Date string
 * 
 * @category Helper
 */
export function startOfWeek(date?: string | Date | moment.Moment): moment.Moment {
    const m = moment.utc(date);
    return m.add(-m.toDate().getTimezoneOffset(), 'minutes').startOf('isoWeek');
}

/**
 * Get end of week
 * 
 * @param {string | Date} date Date string
 * 
 * @category Helper
 */
export function endOfWeek(date?: string | Date | moment.Moment): moment.Moment {
    const m = moment.utc(date);
    return m.add(-m.toDate().getTimezoneOffset(), 'minutes').endOf('isoWeek');
}

/**
 * Get weekdays
 * 
 * @param {moment.Moment | string} start Start
 * @param {string} dateFormat Date format
 * 
 * @category Helper
 */
export function getWeekdays(start: moment.Moment, dateFormat: string): string[] {
    const weekdays = moment.weekdays(true);
    return weekdays.map((_, index) => capitalize(moment(start).add(index, 'days').format(dateFormat)));
}

/**
 * Get timespan string
 * 
 * @param {moment.Moment | string} start Start
 * @param {moment.Moment | string} end End
 * @param {object} options Options
 * 
 * @category Helper
 */
export function getTimespanString(start: moment.Moment | string, end: moment.Moment | string, options: object = { monthFormat: 'MMMM', yearFormat: 'YYYY', hideYear: false, implicitYear: false }): string {
    if (typeof start === 'string') start = moment(start);
    if (typeof end === 'string') end = moment(end);
    return start['twix'](end, { allDay: true }).format(options).toLowerCase();
}

/**
 * Get month name
 * 
 * @param {number} monthNumber Month number
 * 
 * @category Helper
 */
export function getMonthName(monthNumber: number): string {
    return moment().month(monthNumber).format('MMMM');
}

/**
 * Parse URL hash
 * 
 * @category Helper
 */
export function parseUrlHash<T>(defaultValue: T = {} as T): T {
    const hash = window.location.hash.substr(1);
    if (stringIsNullOrEmpty(hash)) return defaultValue;
    const hashObject = hash.split('&').reduce(function (result, item) {
        const [key, value] = item.split('=');
        result[key] = decodeURIComponent(value);
        return result;
    }, {}) as T;
    return hashObject;
}

/**
 * Update URL hash
 * 
 * @param {ITypedHash} hashObject Hash object
 * @param {boolean} persistPrevious Persist previous hash
 * @param {boolean} redirect Redirect (defaults to true)
 */
export function updateUrlHash(hashObject: ITypedHash<string>, persistPrevious = true, redirect = true): string {
    if (persistPrevious) hashObject = { ...parseUrlHash(), ...hashObject };
    const urlHash = Object.keys(hashObject).map(key => `${key}=${hashObject[key]}`).join('&');
    if (redirect) document.location.hash = urlHash;
    return urlHash;
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
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
}