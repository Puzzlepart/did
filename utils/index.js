const moment = require('moment')

module.exports = {
    /**
     * Get duration between two times in minutes
     * 
     * @param {*} startDateTime Start time
     * @param {*} endDateTime End time
     */
    getDurationMinutes: (startDateTime, endDateTime) => {
        return moment.duration(moment(endDateTime).diff(moment(startDateTime))).asMinutes()
    },

    /**
     * Get duration between two times in hours
     * 
     * @param {*} startDateTime Start time
     * @param {*} endDateTime End time
     */
    getDurationHours: (startDateTime, endDateTime) => {
        return moment.duration(moment(endDateTime).diff(moment(startDateTime))).asHours()
    },

    /**
     * Get period id for the date
     * 
     * @param {*} date Date
     */
    getPeriod: (date) => {
        let d = moment(date)
        return [d.isoWeek(), d.month() + 1, d.year()].join('_')
    },

    /**
     * Get week for the specified date
     * 
     * @param {*} date Date
     */
    getWeek: (date) => {
        return moment(date).isoWeek()
    },

    /**
     * Get year for the specified date
     * 
     * @param {*} date Date
     */
    getYear: (date) => {
        return moment(date).year()
    },

    /**
     * Get month index for the specified date
     * 
     * NOTE: Need to add +1 since moment.month is zero-indexed
     * 
     * @param {*} date Date
     */
    getMonthIndex: (date) => {
        return moment(date).month() + 1
    },

    /**
     * Get start of month as string
     * 
     * @param {*} date Date
     */
    startOfMonth: (date) => {
        let d = moment(date).startOf('month')
        return d.toISOString().replace('Z', '')
    },

    /**
     * Get end of month as string
     * 
     * @param {*} date Date
     */
    endOfMonth: (date) => {
        let d = moment(date).endOf('month')
        return d.toISOString().replace('Z', '')
    },

    /**
     * Get start of week
     * 
     * @param {*} week Week number
     */
    startOfWeek: (week) => {
        return moment().week(week).startOf('isoWeek')
    },

    /**
     * Get end of week
     * 
     * @param {*} week Week number
     */
    endOfWeek: (week) => {
        return moment().week(week).endOf('isoWeek')
    },

    /**
     * Format date
     * 
     * @param {*} date Date
     * @param {*} dateFormat Date format
     * @param {*} locale Locale
     */
    formatDate: (date, dateFormat, locale, timeZone = 'Europe/Oslo') => {
        return moment(date).locale(locale).tz(timeZone).format(dateFormat)
    },

    /**
     * Converts a string to an array
     * 
     * @param {*} str String
     * @param {*} separator String separator
     */
    toArray: (str, separator) => {
        return (str || '').split(separator).filter(p => p)
    }
}