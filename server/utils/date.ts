/* eslint-disable @typescript-eslint/no-unused-vars */
import stringStripHtml from 'string-strip-html'
import $dayjs, { ConfigType, PluginFunc } from 'dayjs'
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
export const getDurationHours = (startDateTime: ConfigType, endDateTime: ConfigType): any => {
  return $dayjs(startDateTime).diff(endDateTime, 'hour')
}

/**
 * Get period id for the date
 *
 * @param {ConfigType} dateTime Date time
 */
export const getPeriod = (dateTime: ConfigType) : string => {
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
 */
export const startOfMonth = (dateTime?: ConfigType): string => {
  return $dayjs(dateTime).startOf('month').toISOString()
}

/**
 * Get end of month as string
 *
 * @param {ConfigType} dateTime Date time
 */
export const endOfMonth = (dateTime: ConfigType): string => {
  return $dayjs(dateTime).startOf('month').toISOString()
}

/**
 * Get start of week
 *
 * @param {number} week Week number
 */
export const startOfWeek = (week: number): string => {
  return $dayjs().week(week).startOf('isoWeek').toISOString()
}

/**
 * Get end of week
 *
 * @param {number} week Week number
 */
export const endOfWeek = (week: number): string => {
  return $dayjs().week(week).endOf('isoWeek').toISOString()
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
export const formatDate = (dateTime: ConfigType, template: string, locale: string) => {
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
