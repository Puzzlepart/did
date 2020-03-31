const moment = require('moment');

module.exports = {
    /**
     * Get duration between two times in minutes
     */
    getDurationMinutes: (startTime, endTime) => {
        return moment.duration(moment(endTime).diff(moment(startTime))).asMinutes()
    },

    /**
     * Get duration between two times in hours
     */
    getDurationHours: (startTime, endTime) => {
        return moment.duration(moment(endTime).diff(moment(startTime))).asHours()
    },

    /**
     * Get week for the specified date
     */
    getWeek: (date) => {
        return moment(date).isoWeek();
    },

    /**
     * Get year for the specified date
     */
    getYear: (date) => {
        return moment(date).year();
    },

    /**
     * Get month index for the specified date
     * 
     * Need to add +1 since moment.month is zero-indexed
     */
    getMonth: (date) => {
        return moment(date).month() + 1;
    },

    /**
     * Format date
     */
    formatDate: (date, dateFormat) => {
        return require('moment')(date).tz('Europe/Oslo').format(dateFormat);
    }
}