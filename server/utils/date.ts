import dateUtils from 'string-strip-html'

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
export const stripHtmlString = (str: string): string => dateUtils(str).result

/**
 * Get duration between two times in hours
 *
 * @param {string} startDateTime Start time
 * @param {string} endDateTime End time
 */
export const getDurationHours = (startDateTime: string, endDateTime: string): any => {
    return null;
    // TODO Return duration hours as number
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
    // TODO return year from specified date or current date
    return null
}

/**
 * Get month index for the specified date
 *
 *
 * @param {*} date Date
 */
export const getMonthIndex = (date: any) => {
    // TODO return month from specified date or current date
    // NOTE - MUST BE 1-INDEXED
    return null
}

/**
 * Get start of month as string
 *
 * @param {*} date Date
 */
export const startOfMonth = (date: any) => {
    // TODO return date of start of month from specified date or current date
    // toISOString minus Z
    return null
}

/**
 * Get end of month as string
 *
 * @param {*} date Date
 */
export const endOfMonth = (date: any) => {
    // TODO return date of end of month from specified date or current date
    // toISOString minus Z
    return null
}

/**
 * Get start of week
 *
 * @param {*} week Week number
 */
export const startOfWeek = (week: any) => {
    // TODO return date of start of week from specified date or current date
    return null
}

/**
 * Get end of week
 *
 * @param {*} week Week number
 */
export const endOfWeek = (week: any) => {
    // TODO return date of end of week from specified date or current date
    return null
}

/**
 * Format date
 *
 * @param {*} date Date
 * @param {*} dateFormat Date format
 * @param {*} locale Locale
 */
export const formatDate = (date: any, dateFormat: any, locale: any, timeZone = 'Europe/Oslo') => {
    // TODO return correct date format as string
    // remember locale and tz
    return null
}

/**
 * Is after today
 *
 * @param {*} date Date
 */
export const isAfterToday = (date: any) => {
    // return bool, whether the specified date is after now
    return null
}
