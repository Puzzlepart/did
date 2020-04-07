const moment = require('moment');

module.exports = {
    /**
     * Get duration between two times in minutes
     * 
     * @param {*} startTime Start time
     * @param {*} endTime End time
     */
    getDurationMinutes: (startTime, endTime) => {
        return moment.duration(moment(endTime).diff(moment(startTime))).asMinutes()
    },

    /**
     * Get duration between two times in hours
     * 
     * @param {*} startTime Start time
     * @param {*} endTime End time
     */
    getDurationHours: (startTime, endTime) => {
        return moment.duration(moment(endTime).diff(moment(startTime))).asHours()
    },

    /**
     * Get week for the specified date
     * 
     * @param {*} date Date
     */
    getWeek: (date) => {
        return moment(date).isoWeek();
    },

    /**
     * Get year for the specified date
     * 
     * @param {*} date Date
     */
    getYear: (date) => {
        return moment(date).year();
    },

    /**
     * Get month index for the specified date
     * 
     * NOTE: Need to add +1 since moment.month is zero-indexed
     * 
     * @param {*} date Date
     */
    getMonthIndex: (date) => {
        return moment(date).month() + 1;
    },

    /**
     * Get end of month
     * 
     * @param {*} date Date
     */
    startOfMonth: (date) => {
        return moment(date).startOf('month');
    },

    /**
     * Get end of month
     * 
     * @param {*} date Date
     */
    endOfMonth: (date) => {
        return moment(date).endOf('month');
    },

    /**
     * Format date
     * 
     * @param {*} date Date
     * @param {*} dateFormat Date format
     */
    formatDate: (date, dateFormat) => {
        return require('moment')(date).tz('Europe/Oslo').format(dateFormat);
    }
}