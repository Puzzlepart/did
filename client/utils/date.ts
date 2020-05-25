import { TFunction } from 'i18next';
import moment from 'moment';
import format from 'string-format';
import { capitalize } from 'underscore.string';
require('twix');

export { moment };

export default new class DateUtils {
    private _momentLocale: string;

    public setup(locale: string) {
        this._momentLocale = locale;
        moment.locale(this._momentLocale);
    }

    toMoment(date: string) {
        const m = moment(date);
        return m.add(m.toDate().getTimezoneOffset(), 'minutes')
    }

    getDurationDisplay(duration: number, t?: TFunction): string {
        const hrsShortFormat = t ? t('hoursShortFormat', { ns: 'common', defaultValue: undefined }) : '{0}h'
        const minShortFormat = t ? t('minutesShortFormat', { ns: 'common', defaultValue: undefined }) : '{0}min'
        const hrs = Math.floor(duration)
        const mins = parseInt(((duration % 1) * 60).toFixed(0))
        const hrsStr = format(hrsShortFormat, hrs)
        const minStr = format(minShortFormat, mins)
        if (mins === 0) return hrsStr
        if (hrs === 0) return minStr
        return `${hrsStr} ${minStr}`
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
     * Get days between a start and end time
     * 
     * @param {moment.Moment} start Start
     * @param {moment.Moment} end End
     * @param {string} dayFormat Date format
     */
    getDays(start: moment.Moment, end: moment.Moment, dayFormat: string): string[] {
        const days = []
        for (let i = 0; i <= (end.weekday() - start.weekday()); i++) {
            days.push(capitalize(start.clone().add(i, 'days').locale(this._momentLocale).format(dayFormat)));
        }
        return days;
    }


    /**
     * Get month name
     * 
     * @param {number} monthNumber Month number
     */
    getMonthName(monthNumber: number): string {
        return moment().locale(this._momentLocale).month(monthNumber).format('MMMM');
    }

    /**
     * Get timespan string
     * 
     * @param {moment.Moment} start Start
     * @param {moment.Moment} end End
     * @param {object} options Options
     */
    getTimespanString(start: moment.Moment, end: moment.Moment, options: object = { monthFormat: 'MMMM', yearFormat: 'YYYY', hideYear: false, implicitYear: false }): string {
        return start.locale(this._momentLocale)['twix'](end.locale(this._momentLocale), { allDay: true }).format(options).toLowerCase();
    }

    /**
     * Get month names 
    */
    getMonthNames(): string[] {
        return Array.apply(0, Array(12)).map((_: any, i: number) => capitalize(moment().month(i).format('MMMM')));
    }

    /**
     * Get a string representation of the moment date instance
     */
    toString(start: moment.Moment) {
        return start.toISOString().replace('Z', '');
    }
}