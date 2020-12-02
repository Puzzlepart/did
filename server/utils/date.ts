/* eslint-disable @typescript-eslint/no-unused-vars */
import stringStripHtml from 'string-strip-html'
import $dayjs, { ConfigType, OpUnitType, PluginFunc } from 'dayjs'
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear'
import isoWeekPlugin from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/nb'
$dayjs.extend<PluginFunc>(weekOfYearPlugin)
$dayjs.extend<PluginFunc>(isoWeekPlugin)

/**
 * Strip html from string using string-strip-html
 * Used when fetching events from ms graph
 * Strips the html from event body
 *
 * @param {string} str String
 */
export const stripHtmlString = (str: string): string => stringStripHtml(str).result

/**
 * Get duration between two times in hours
 *
 * @param {ConfigType} startDateTime Start time
 * @param {ConfigType} endDateTime End time
 */
export const getDurationHours = (startDateTime: ConfigType, endDateTime: ConfigType): number => {
  return $dayjs(endDateTime).diff(startDateTime, 'minute') / 60
}

/**
 * Get period id for the date
 *
 * @param {ConfigType} dateTime Date time
 */
export const getPeriod = (dateTime: ConfigType): string => {
  const date = $dayjs(dateTime)
  return [date.week(), date.month() + 1, date.year()].join('_')
}

/**
 * Get week for the specified date
 *
 * @param {ConfigType} dateTime Date time
 */
export const getWeek = (dateTime?: ConfigType): number => {
  return $dayjs(dateTime).week()
}

/**
 * Get year for the specified date
 *
 * @param {ConfigType} dateTime Date time
 */
export const getYear = (dateTime?: ConfigType): number => {
  return $dayjs(dateTime).year()
}

/**
 * Get month index for the specified date
 *
 * @param {ConfigType} dateTime Date time
 */
export const getMonthIndex = (dateTime: ConfigType): number => {
  return $dayjs(dateTime).month() + 1
}

/**
 * Get start of month as string
 *
 * @param {ConfigType} dateTime Date time
 * @param {string} template Template
 */
export const startOfMonth = (dateTime: ConfigType, template: string): string => {
  return $dayjs(dateTime).startOf('month').format(template)
}

/**
 * Get end of month as string
 *
 * @param {ConfigType} dateTime Date time
 * @param {string} template Template
 */
export const endOfMonth = (dateTime: ConfigType, template: string): string => {
  return $dayjs(dateTime).endOf('month').format(template)
}

/**
 * Get start of week
 *
 * @param {number} week Week number
 * @param {string} template Template (defaults to YYYY-MM-DD)
 */
export const startOfWeek = (week: number, template: string = 'YYYY-MM-DD'): string => {
  return $dayjs().week(week).startOf('isoWeek').format(template)
}

/**
 * Get end of week
 *
 * @param {number} week Week number
 * @param {string} template Template (defaults to YYYY-MM-DD)
 */
export const endOfWeek = (week: number, template: string = 'YYYY-MM-DD'): string => {
  return $dayjs().week(week).endOf('isoWeek').format(template)
}

/**
 * Adds an amount of unit of time to the specified date
 *
 * @param {ConfigType} dateTime Date time
 * @param {OpUnitType} unit
 * @param {number} amount
 * @param {string} template Template
 */
export const add = (dateTime: ConfigType, unit: OpUnitType, amount: number): string => {
  return $dayjs(dateTime).add(amount, unit).toISOString()
}

/**
 * Get the formatted date according to the string of tokens passed in.
 *
 * To escape characters, wrap them in square brackets (e.g. [MM]).
 *
 * @param {ConfigType} dateTime Date
 * @param {string} template Date format
 * @param {string} locale Locale
 */
export const formatDate = (dateTime: ConfigType, template: string, locale: string): string => {
  return $dayjs(dateTime).locale(locale).format(template)
}

/**
 * Is after today
 *
 * @param {ConfigType} dateTime Date
 */
export const isAfterToday = (dateTime: ConfigType) => {
  return $dayjs(dateTime).isAfter($dayjs())
}

/**
 * Is same month
 *
 * @param {ConfigType} a Date A
 * @param {ConfigType} b Date B
 */
export const isSameMonth = (a: ConfigType, b: ConfigType) => {
  return $dayjs(a).isSame($dayjs(b), 'month')
}

/**
 * Converts the date time to ISO format using the specified offset
 *
 * @param {ConfigType} dateTime Date
 * @param {number} tzOffset Offset in minutes
 */
export const toISOString = (dateTime: ConfigType, tzOffset: number) => {
  return $dayjs(`${dateTime} ${getTimezone(tzOffset)}`).toISOString()
}

/**
 * Get timezone from offset
 *
 * See https://stackoverflow.com/questions/24500375/get-clients-gmt-offset-in-javascript
 *
 * @param {number} tzOffset Offset in minutes
 */
export const getTimezone = (tzOffset: number) => {
  function z(n: number) {
    return (n < 10 ? '0' : '') + n
  }
  const sign = tzOffset < 0 ? '+' : '-'
  tzOffset = Math.abs(tzOffset)
  return 'GMT ' + sign + z((tzOffset / 60) | 0) + z(tzOffset % 60)
}
