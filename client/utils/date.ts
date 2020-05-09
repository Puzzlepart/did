import moment from 'moment';
import { capitalize } from 'underscore.string';
require('twix');

export { moment };

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
     */
    formatDate(date: string, dateFormat: string): string {
        const m = moment.utc(date);
        return m.add(-m.toDate().getTimezoneOffset(), 'minutes').format(dateFormat);
    }


    /**
     * Get start of week
     * 
     * @param {string | Date | moment.Moment} date Date string
     */
    startOfWeek(date?: string | Date | moment.Moment): moment.Moment {
        const m = moment.utc(date);
        return m.add(-m.toDate().getTimezoneOffset(), 'minutes').startOf('isoWeek');
    }

    /**
     * Get end of week
     * 
     * @param {string | Date} date Date string
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
     */
    getWeekdays(start: moment.Moment, dateFormat: string): string[] {
        return moment.weekdays(true).map((_, index) => {
            return capitalize(start.clone().add(index, 'days').locale(this._locale).format(dateFormat));
        });
    }


    /**
     * Get month name
     * 
     * @param {number} monthNumber Month number
     */
    getMonthName(monthNumber: number): string {
        return moment().locale(this._locale).month(monthNumber).format('MMMM');
    }

    /**
     * Get timespan string
     * 
     * @param {moment.Moment} start Start
     * @param {moment.Moment} end End
     * @param {object} options Options
     */
    getTimespanString(start: moment.Moment, end: moment.Moment, options: object = { monthFormat: 'MMMM', yearFormat: 'YYYY', hideYear: false, implicitYear: false }): string {
        return start.locale(this._locale)['twix'](end.locale(this._locale), { allDay: true }).format(options).toLowerCase();
    }

    /**
     * Get month names 
    */
    getMonthNames(): string[] {
        return Array.apply(0, Array(12)).map((_: any, i: number) => moment().month(i).format('MMMM'));
    }

    /**
     * Get a string representation of the moment date instance
     */
    toString(start: moment.Moment) {
        return start.toISOString().replace('Z', '');
    }
}