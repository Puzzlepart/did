import moment from 'moment';
import { capitalize } from 'underscore.string';
require('twix');

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
    return moment.weekdays(true).map((_, index) => {
        return capitalize(start.clone().add(index, 'days').format(dateFormat));
    });
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
 * Get month names 
*/
export function getMonthNames(): string[] {
    return Array.apply(0, Array(12)).map((_: any, i: number) => moment().month(i).format('MMMM'));
}