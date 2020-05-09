import moment from 'moment';
import { capitalize } from 'underscore.string';
require('twix');

export default new class DateUtils {
    private _locale: string;

    public setup(locale: string) {
        this._locale = locale;
        moment.locale(this._locale);
    }

    /**
     * Format date
     * 
     * @param {string} date Date string
     * @param {string} dateFormat Date format
     * 
     * @category Helper
     */
    formatDate(date: string, dateFormat: string): string {
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
    startOfWeek(date?: string | Date | moment.Moment): moment.Moment {
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
    endOfWeek(date?: string | Date | moment.Moment): moment.Moment {
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
    getWeekdays(start: moment.Moment, dateFormat: string): string[] {
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
    getMonthName(monthNumber: number): string {
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
    getTimespanString(start: moment.Moment | string, end: moment.Moment | string, options: object = { monthFormat: 'MMMM', yearFormat: 'YYYY', hideYear: false, implicitYear: false }): string {
        if (typeof start === 'string') start = moment(start);
        if (typeof end === 'string') end = moment(end);
        return start['twix'](end, { allDay: true }).format(options).toLowerCase();
    }

    /**
     * Get month names 
    */
    getMonthNames(): string[] {
        return Array.apply(0, Array(12)).map((_: any, i: number) => moment().month(i).format('MMMM'));
    }
}