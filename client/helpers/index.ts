import * as getValue from 'get-value';
import * as moment from 'moment-timezone';
require('moment/locale/en-gb');
require('twix');

/**
 * Get duration display
 * 
 * @param {number} minutes Minutes
 * @param {number} hours Hours
 */
export function getDurationDisplay(minutes: number, hours?: number): string {
    let hrs = hours ? Math.floor(hours) : Math.floor(minutes / 60);
    let mins = hours ? ((hours % 1) * 60) : minutes % 60;
    return [
        hrs && (`${hrs}h`),
        mins && (`${mins}min`)
    ].filter(c => c).join(' ');
}

/**
 * Get url parameter
 * 
 * @param {string} name Name
 * @param {string} fallbackValue Fallback value
 */
export function getUrlParameter(name: string, fallbackValue: string = null): string {
    return new URL(document.location.href).searchParams.get(name) || fallbackValue;
}

/**
 * Converts string to array buffer
 * 
 * @param {string} str String
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
 * */
export function getValueTyped<T>(obj: any, exp: string, defaultValue: T): T {
    return getValue(obj, exp, { default: defaultValue });
}

/**
 * Format date
 * 
 * @param {string} dateIso Date string
 * @param {string} dateFormat Date format
 * @param {string} timeZone Time zone
 */
export function formatDate(dateIso: string, dateFormat: string, timeZone: string = 'Europe/Oslo'): string {
    return moment(dateIso).tz(timeZone).format(dateFormat);
}

/**
 * Get start of week
 * 
 * @param {number} weekNumber Week number
 * @param {string} dateIso Date string
 */
export function startOfWeek(weekNumber: number, dateIso?: string): moment.Moment {
    let date = moment().week(weekNumber);
    if (dateIso) date = moment(dateIso);
    return date.startOf('isoWeek');
}

/**
 * Get end of week
 * 
 * @param {number} weekNumber Week number
 * @param {string} dateIso Date string
 */
export function endOfWeek(weekNumber: number = getWeek(), dateIso?: string): moment.Moment {
    let date = moment().week(weekNumber);
    if (dateIso) date = moment(dateIso);
    return date.endOf('isoWeek');
}

/**
 * Get weekdays
 */
export function getWeekdays(): string[] {
    return moment.weekdays(true);
}

/**
 * Get week number
 * 
 * @param {string} dateIso Date string
 */
export function getWeek(dateIso?: string): number {
    let date = moment();
    if (dateIso) date = moment(dateIso);
    return date.week();
}

/**
 * Get timespan string
 * 
 * @param {moment.Moment} start Start
 * @param {moment.Moment} end End
 * @param {object} options Options
 */
export function getTimespanString(start: moment.Moment, end: moment.Moment, options: object = { monthFormat: 'MMMM', yearFormat: 'YYYY', hideYear: false, implicitYear: false }) {
    return start['twix'](end, { allDay: true }).format(options).toLowerCase();
}

/**
 * Get month name
 * 
 * @param {number} monthNumber Month number
 */
export function getMonthName(monthNumber: number): string {
    return moment().month(monthNumber).format('MMMM');
}