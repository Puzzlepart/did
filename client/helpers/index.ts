import * as get from 'get-value';
import * as moment from 'moment';
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
    let hrs = hours ? Math.floor(hours) : Math.floor(minutes / 60);
    let mins = hours ? ((hours % 1) * 60) : minutes % 60;
    return mins === 0 ? `${hrs}h` : hrs === 0
        ? `${mins}min`
        : [(`${hrs}h`), (`${mins}min`)].join(' ');
}

/**
 * Get url parameter
 * 
 * @param {string} name Name
 * @param {string} fallbackValue Fallback value
 * 
 * @category Helper
 */
export function getUrlParameter(name: string, fallbackValue: string = null): string {
    return new URL(document.location.href).searchParams.get(name) || fallbackValue;
}

/**
 * Converts string to array buffer
 * 
 * @param {string} str String
 * 
 * @category Helper
 */
export function stringToArrayBuffer(str: string) {
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
export function currencyDisplay(num: number, currency: string = 'NOK', minimumFractionDigits: number = 0) {
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
export function getValueTyped<T>(obj: any, exp: string, defaultValue: T): T {
    return get(obj, exp, { default: defaultValue });
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
export function endOfWeek(date?: string | Date): moment.Moment {
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
    return moment.weekdays(true).map((_, index) => moment(start).add(index, 'days').format(dateFormat));
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
export function getTimespanString(start: moment.Moment | string, end: moment.Moment | string, options: object = { monthFormat: 'MMMM', yearFormat: 'YYYY', hideYear: false, implicitYear: false }) {
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
export function parseUrlHash<T>(): T {
    var hash = window.location.hash.substr(1);
    return hash.split('&').reduce(function (result, item) {
        var parts = item.split('=');
        result[parts[0]] = parts[1];
        return result;
    }, {}) as T;
}

/**
 * Sort alphabetically
 * 
 * @param {string[]} strArray Array of strings to sort
 * 
 * @category Helper
 */
export function sortAlphabetically(strArray: string[]) {
    return strArray.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
}