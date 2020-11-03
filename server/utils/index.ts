import moment from 'moment'
import stripHtml from 'string-strip-html'

/**
 * Strip html from string using string-strip-html
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
export const getDurationHours = (startDateTime: string, endDateTime: string): number => {
  return moment.duration(moment(endDateTime).diff(moment(startDateTime))).asHours()
}

/**
 * Get period id for the date
 *
 * @param {*} date Date
 */
export const getPeriod = (date: any) => {
  const d = moment(date)
  return [d.isoWeek(), d.month() + 1, d.year()].join('_')
}

/**
 * Get week for the specified date
 *
 * @param {string | moment.Moment} date Date
 */
export const getWeek = (date?: string | moment.Moment) => {
  return moment(date).isoWeek()
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

/**
 * Converts a string to an array
 *
 * @param {*} str String
 * @param {*} separator String separator
 */
export const toArray = (str: string, separator: any = '|') => {
  return (str || '').split(separator).filter(p => p)
}

/**
 * Generate int
 *
 * @param {string} str String
 * @param {number} mod Modulator
 */
export const generateInt = (str: string, mod: number) => {
  return (
    str
      .split('')
      .map(c => c.charCodeAt(0))
      .reduce((a, b) => a + b) % mod
  )
}
