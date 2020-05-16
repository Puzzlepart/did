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
     * Get end of month
     * 
     * @param {*} date Date
     */
    startOfMonth: (date) => {
        return moment(date).startOf('month')
    },

    /**
     * Get end of month
     * 
     * @param {*} date Date
     */
    endOfMonth: (date) => {
        return moment(date).endOf('month')
    },

    /**
     * Format date
     * 
     * @param {*} date Date
     * @param {*} dateFormat Date format
     * @param {*} locale Locale
     */
    formatDate: (date, dateFormat, locale) => {
        return moment(date).locale(locale).tz('Europe/Oslo').format(dateFormat)
    }
}