const moment = require('moment');

module.exports = {
    getDurationMinutes: (startTime, endTime) => {
        return moment.duration(moment(endTime).diff(moment(startTime))).asMinutes()
    },
    getDurationHours: (startTime, endTime) => {
        return moment.duration(moment(endTime).diff(moment(startTime))).asHours()
    },
    getWeek: (date) => {
        return moment(date).week();
    },
    getYear: (date) => {
        return moment(date).year();
    },
    getMonth: (date) => {
        return moment(date).month();
    }
}