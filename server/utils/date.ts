// import moment from 'moment' REMOVED
import stripHtml from 'string-strip-html'

// SERVER SIDE DATE UTILS USED:
/**
 * NAME --------- DESCRIPTION ----------------------- RETURNS
 * getDurationHours - duration in hours between two dates - number
 * getPeriod - 'weeknumber_monthnumber_yearnumber' for a given date - string
 * getWeek - week number based on date - string
 * getYear - year number based on date - string
 * getMonthIndex - month based on date, 1-indexed - string
 * startOfMonth - first day of month based on date - string
 * endOfMonth - last day of month based on date - string
 * startOfWeek - first day of week based on date - string
 * endOfWeek - last day of week based on date - string
 * 
 */

/**
 * Strip html from string using string-strip-html
 * Used when fetching events from ms graph
 * Strips the html from event body
 *  
 * @param {string} str String
 */
export const stripHtmlString = (str: string): string => stripHtml(str).result

/**
 * Get duration between two times in hours
 *
 * @param {string} startDateTime Start time
 * @param {string} endDateTime End time
 */
export const getDurationHours = (startDateTime: string, endDateTime: string): any => {
    return null;
    // TODO Return duration hours as number
    //   return moment.duration(moment(endDateTime).diff(moment(startDateTime))).asHours()
}

/**
 * Get period id for the date
 *
 * @param {*} date Date
 */
export const getPeriod = (date: any) => {
    return null
    // TODO RETURN weeknumber_monthnumber_yearnumber
}

/**
 * Get week for the specified date
 *
 * @param {string } date Date
 */
export const getWeek = (date?: any) => {
    // TODO RETURN specified Date's week OR current date's week
    return null
}

/**
 * Get year for the specified date
 *
 * @param {string} date Date
 */
export const getYear = (date?: string) => {
    return moment(date).year()
}

/**
 * Get month index for the specified date
 *
 * NOTE: Need to add +1 since moment.month is zero-indexed
 *
 * @param {*} date Date
 */
export const getMonthIndex = (date: any) => {
    return moment(date).month() + 1
}

/**
 * Get start of month as string
 *
 * @param {*} date Date
 */
export const startOfMonth = (date: any) => {
    const d = moment(date).startOf('month')
    return d.toISOString().replace('Z', '')
}

/**
 * Get end of month as string
 *
 * @param {*} date Date
 */
export const endOfMonth = (date: any) => {
    const d = moment(date).endOf('month')
    return d.toISOString().replace('Z', '')
}

/**
 * Get start of week
 *
 * @param {*} week Week number
 */
export const startOfWeek = (week: any) => {
    return moment().week(week).startOf('isoWeek')
}

/**
 * Get end of week
 *
 * @param {*} week Week number
 */
export const endOfWeek = (week: any) => {
    return moment().week(week).endOf('isoWeek')
}

/**
 * Format date
 *
 * @param {*} date Date
 * @param {*} dateFormat Date format
 * @param {*} locale Locale
 */
export const formatDate = (date: any, dateFormat: any, locale: any, timeZone = 'Europe/Oslo') => {
    return (moment(date) as any).locale(locale).tz(timeZone).format(dateFormat)
}

/**
 * Is after today
 *
 * @param {*} date Date
 */
export const isAfterToday = (date: any) => {
    return moment(date).isAfter(moment())
}
