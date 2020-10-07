import { TFunction } from 'i18next'
import moment from 'moment'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import { capitalize } from 'underscore.string'
require('twix')

export { moment }

export default new (class DateUtils {
    private _momentLocale: string

    /**
     * Setup DateUtils class
     *
     * @param {string} locale Locale
     */
    public setup(locale: string) {
        this._momentLocale = locale
        moment.locale(this._momentLocale)
    }

    /**
     * Converts date string to moment, adding timezone offset
     *
     * @param {string} date Date string
     */
    toMoment(date: string) {
        const m = moment(date)
        return m.add(m.toDate().getTimezoneOffset(), 'minutes')
    }

    /**
     * Get duration string
     *
     * @param {number} durationHrs Duration in hours
     * @param {TFunction} t Translate function
     */
    getDurationString(durationHrs: number, t: TFunction): string {
        const hrsShortFormat = t('common.hoursShortFormat')
        const minShortFormat = t('common.minutesShortFormat')
        const hrs = Math.floor(durationHrs)
        const mins = parseInt(((durationHrs % 1) * 60).toFixed(0))
        const hrsStr = format(hrsShortFormat, hrs)
        const minStr = format(minShortFormat, mins)
        if (mins === 0) return hrsStr
        if (hrs === 0) return minStr
        return `${hrsStr} ${minStr}`
    }

    /**
     * Format date with the specified date format
     *
     * @param {string} date Date string
     * @param {string} dateFormat Date format
     */
    formatDate(date: string, dateFormat: string): string {
        const m = moment.utc(date)
        return m.add(-m.toDate().getTimezoneOffset(), 'minutes').format(dateFormat)
    }

    /**
     * Get start of week
     *
     * @param {string | Date | moment.Moment} date Date string
     */
    startOfWeek(date?: string | Date | moment.Moment): moment.Moment {
        const m = moment.utc(date)
        return m.add(-m.toDate().getTimezoneOffset(), 'minutes').startOf('isoWeek')
    }

    /**
     * Get end of week
     *
     * @param {string | Date} date Date string
     */
    endOfWeek(date?: string | Date | moment.Moment): moment.Moment {
        const m = moment.utc(date)
        return m.add(-m.toDate().getTimezoneOffset(), 'minutes').endOf('isoWeek')
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
        for (let i = 0; i <= end.weekday() - start.weekday(); i++) {
            days.push(capitalize(start.clone().add(i, 'days').locale(this._momentLocale).format(dayFormat)))
        }
        return days
    }

    /**
     * Get month name for the speicifed month index
     *
     * Under 0: Subtracts {monthIndex} months from current month
     *
     * 0: Returns current month name
     *
     * Over 0: Returns the actual month with the speified index
     *
     *
     * @param {number} monthIndex Month number
     * @param {string} format Format
     */
    getMonthName(monthIndex?: number, format: string = 'MMMM'): string {
        let m = moment().locale(this._momentLocale)
        if (monthIndex < 0) return capitalize(m.add(monthIndex, 'month').format(format))
        else if (monthIndex === 0) return capitalize(m.format(format))
        return capitalize(m.month(monthIndex).format(format))
    }

    /**
     * Get timespan string
     *
     * @param {moment.Moment} start Start
     * @param {moment.Moment} end End
     * @param {object} options Options
     */
    getTimespanString(
        start: moment.Moment,
        end: moment.Moment,
        options: object = {
            monthFormat: 'MMMM',
            yearFormat: 'YYYY',
            hideYear: false,
            implicitYear: false,
        }
    ): string {
        return start
            .locale(this._momentLocale)
        ['twix'](end.locale(this._momentLocale), { allDay: true })
            .format(options)
            .toLowerCase()
    }

    /**
     * Get month names 0-11
     */
    getMonthNames(): string[] {
        return Array.apply(0, Array(12)).map((_: any, i: number) => {
            return capitalize(moment().month(i).format('MMMM'))
        })
    }

    /**
     * Get a string representation of the moment date instance
     *
     * @param {moment.Moment} date Moment date
     *
     * @returns {string} Returns a ISO representation of the date without the Z
     */
    toString(date: moment.Moment): string {
        return date.toISOString().replace('Z', '')
    }

    /**
     * Get week number
     */
    getWeek(): number {
        return moment().week()
    }

    /**
     * Get month index
     *
     * 1: January
     *
     * 2: February
     *
     * etc.
     */
    getMonthIndex(): number {
        return moment().month() + 1
    }

    /**
     * Get year
     */
    getYear(): number {
        return moment().year()
    }
})()
