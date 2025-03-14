/* eslint-disable unicorn/require-number-to-fixed-digits-argument */
// shared/utils/date.ts
/**
 * Shared date utilities used by both
 * the client and the server.
 *
 * @module DateUtils
 */
import $dayjs, { ConfigType, PluginFunc, UnitType } from 'dayjs'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/nb'
import 'dayjs/locale/nn'
import durationPlugin from 'dayjs/plugin/duration'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeekPlugin from 'dayjs/plugin/isoWeek'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import localeDataPlugin from 'dayjs/plugin/localeData'
import objectSupportPlugin from 'dayjs/plugin/objectSupport'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezonePlugin from 'dayjs/plugin/timezone'
import utcPlugin from 'dayjs/plugin/utc'
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { TFunction } from 'i18next'
import s from 'underscore.string'
import { DateObject } from './DateObject'
import { DateWithTimezone, IDateUtils, TimeSpanStringOptions } from './types'

export type DateInput = ConfigType

export enum DurationStringFormat {
  Short = 'ShortFormat',
  Long = 'LongFormat'
}

type GetDurationStringOptions = {
  format?: DurationStringFormat
  seconds?: boolean
}

export class DateUtils {
  constructor(private $: IDateUtils) {
    $dayjs.extend<PluginFunc>(weekOfYearPlugin)
    $dayjs.extend<PluginFunc>(localeDataPlugin)
    $dayjs.extend<PluginFunc>(durationPlugin)
    $dayjs.extend<PluginFunc>(objectSupportPlugin)
    $dayjs.extend<PluginFunc>(utcPlugin)
    $dayjs.extend<PluginFunc>(timezonePlugin)
    $dayjs.extend<PluginFunc>(isoWeekPlugin)
    $dayjs.extend<PluginFunc>(isoWeeksInYear)
    $dayjs.extend<PluginFunc>(isLeapYear)
    $dayjs.extend<PluginFunc>(localizedFormat)
    $dayjs.extend(relativeTime)
  }

  /**
   * Setup DateUtils class using dayjs with plugins
   *
   * @param locale - Locale
   */
  public setup(locale: string) {
    $dayjs.locale(locale)
  }

  /**
   * Get duration string
   *
   * E.g. 15.75 = 15h 45min with `DurationStringFormat.Short` and 15 hours 45 minutes with `DurationStringFormat.Long`
   * With seconds option, e.g. 15.7583 = 15h 45min 30s
   *
   * Using solution from https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
   * to handle floating point number precision.
   *
   * @param hours - Duration in hours
   * @param t - Translate function
   * @param options - Options for the duration string
   * @param options.format - Format (`DurationStringFormat.Short` or `DurationStringFormat.Long`)
   * @param options.seconds - Whether to include seconds in the output
   */
  public getDurationString(
    hours: number,
    t: TFunction,
    options: GetDurationStringOptions = {}
  ): string {
    const format = options.format ?? DurationStringFormat.Short
    let hoursPrecision = Number.parseFloat(
      Number.parseFloat(hours.toString()).toPrecision(options.seconds ? 7 : 5)
    )

    // Calculate minutes from the fractional part of hours
    const minutesTotal = (hoursPrecision % 1) * 60
    const minutes = Math.floor(minutesTotal)

    // Calculate seconds from the fractional part of minutes if seconds option is enabled
    const seconds = options.seconds ? Math.round((minutesTotal % 1) * 60) : 0

    // Get the whole hours
    hoursPrecision = Math.floor(hoursPrecision)

    const hrsString = t(
      `common.hours${format}_${hoursPrecision === 1 ? 'singular' : 'plural'}`,
      {
        hours: hoursPrecision
      }
    )

    const minsString = t(
      `common.minutes${format}_${minutes === 1 ? 'singular' : 'plural'}`,
      { minutes }
    )

    const secsString = options.seconds
      ? t(`common.seconds${format}_${seconds === 1 ? 'singular' : 'plural'}`, {
          seconds
        })
      : ''

    // Build the output string based on which components have values
    const components = []

    if (hoursPrecision > 0) components.push(hrsString)
    if (minutes > 0) components.push(minsString)
    if (options.seconds && seconds > 0) components.push(secsString)

    // Return empty string for zero duration
    if (components.length === 0) {
      return hoursPrecision === 0 &&
        minutes === 0 &&
        (!options.seconds || seconds === 0)
        ? t(`common.hours${format}_plural`, { hours: 0 })
        : ''
    }

    return components.join(' ')
  }

  /**
   * Get the formatted date according to the string of tokens passed in.
   *
   * To escape characters, wrap them in square brackets (e.g. [MM]).
   *
   * @param dateTime - Date
   * @param template - Date format
   * @param locale - Locale to use for formatting
   * @param fallback - Fallback value if date is ´null` or `undefined`
   */
  formatDate(
    dateTime: ConfigType,
    template: string,
    locale?: string,
    fallback = null
  ): string {
    if (!dateTime) return fallback
    if (locale) return $dayjs(dateTime).locale(locale).format(template)
    return $dayjs(dateTime).format(template)
  }

  /**
   * Get start of week
   *
   * @param date - Date
   * @param isoWeek - Use ISO week
   */
  public startOfWeek(
    date?: DateObject,
    isoWeek: boolean = this.$.isoWeek
  ): DateObject {
    return new DateObject(date.$.startOf(isoWeek ? 'isoWeek' : 'w'))
  }

  /**
   * Get end of week
   *
   * @param date - Date
   * @param isoWeek - Use ISO week
   */
  public endOfWeek(
    date?: DateObject,
    isoWeek: boolean = this.$.isoWeek
  ): DateObject {
    return new DateObject(date.$.endOf(isoWeek ? 'isoWeek' : 'w'))
  }

  /**
   * Get days between a start and end time in the specified template
   *
   * @param start - Start
   * @param end - End
   * @param template - Date template
   */
  public getDays<T = string>(
    start: DateInput,
    end: DateInput,
    template: string = 'dddd DD'
  ): T[] {
    const days = []
    let startDateObject = new DateObject(start)
    const endDateObject = new DateObject(end)
    while (startDateObject.isBeforeOrSame(endDateObject)) {
      switch (template) {
        case 'jsDate': {
          {
            days.push(startDateObject.jsDate)
          }
          break
        }
        case 'DateObject': {
          {
            days.push(startDateObject)
          }
          break
        }
        default: {
          days.push(s.capitalize(startDateObject.format(template)))
        }
      }
      startDateObject = startDateObject.add('1d')
    }
    return days
  }

  /**
   * Get month name for the speicifed month index
   *
   * @param monthIndex - Month index
   * @param template -Template
   */
  public getMonthName(
    monthIndex?: number,
    template: string = this.$.monthFormat
  ): string {
    return s.capitalize($dayjs().set('month', monthIndex).format(template))
  }

  /**
   * Get timespan string
   *
   * Supports either start and end dates, or week
   * number and year. `monthFormat` and `yearFormat`
   * are optional.
   *
   * Date formats are based on if the dates are the same
   * month and year, and if the year is the current year.
   *
   * @param options - Timespan options
   */
  public getTimespanString({
    startDate,
    endDate,
    week,
    year,
    dayFormat = 'DD',
    monthFormat = this.$.monthFormat,
    yearFormat = this.$.yearFormat,
    includeMonth,
    includeTime
  }: TimeSpanStringOptions): string {
    startDate =
      startDate || new DateObject().fromObject({ week, year }).startOfWeek
    endDate = endDate || new DateObject().fromObject({ week, year }).endOfWeek
    const startDateFormat = [dayFormat]
    const endDateFormat = []
    if (!startDate.isSameDay(endDate)) endDateFormat.push(dayFormat)
    if (!startDate.isSameMonth(endDate) || includeMonth?.startDate)
      startDateFormat.push(monthFormat)
    if (!startDate.isSameMonth(endDate) || includeMonth?.endDate)
      endDateFormat.push(monthFormat)
    if (!startDate.isSameYear(endDate)) startDateFormat.push(yearFormat)
    if (!startDate.isSameYear(new DateObject())) endDateFormat.push(yearFormat)
    if (includeTime) {
      startDateFormat.push(includeTime)
      endDateFormat.push(includeTime)
    }
    return [
      startDate.format(startDateFormat.join(' ')),
      endDate.format(endDateFormat.join(' '))
    ].join(' - ')
  }

  /**
   * Get month names in a year
   */
  public getMonthNames(): string[] {
    return $dayjs.months().map((m) => s.capitalize(m))
  }

  /**
   * Get week number
   *
   * If no date parameter is specified the current week is returned
   *
   * @param date - Optional date
   */
  public getWeek(date?: DateInput): number {
    return $dayjs(date).isoWeek()
  }

  /**
   * Get Iso Week number
   * Handles a weakness in dayjs, where week 53 occuring in january of a year
   * e.g. jan 1-3 2021, is returned as january 2022
   *
   * @param isoWeek - Iso week number
   * @param year - Year
   */
  public getIsoWeek(isoWeek: number, year: number) {
    if (
      isoWeek === 53 &&
      $dayjs()
        .year(year - 1)
        .isoWeeksInYear() === 53
    )
      return 0
    return isoWeek
  }

  /**
   * Get the month.
   *
   * Months are zero indexed, so January is month 0 and December is 11 (obviously).
   *
   * @param date - Optional date
   */
  public getMonthIndex(date?: DateInput): number {
    return $dayjs(date).month() + 1
  }

  /**
   * Get the year
   *
   * If no date parameter is specified the current year is returned
   *
   * @param date - Optional date
   */
  public getYear(date?: DateInput): number {
    return $dayjs(date).year()
  }

  /**
   * Is current week
   *
   * @param date - Date
   */
  public isCurrentWeek(date: DateObject): boolean {
    return date.$.isoWeek() === $dayjs().isoWeek()
  }

  /**
   * Is current month
   *
   * @param date - Date
   */
  public isCurrentMonth(date: DateObject): boolean {
    return date.$.month() === $dayjs().month()
  }

  /**
   * Is current year
   *
   * @param date - Date
   * @param year - Year
   */
  public isCurrentYear(date: DateObject, year?: number) {
    return (year || date.$.year()) === $dayjs().year()
  }

  /**
   * Is the week split between two months
   *
   * @param date - Date
   */
  public isWeekSplit(date: DateObject): boolean {
    return date.startOfWeek.isSameMonth(date.endOfWeek) === false
  }

  /**
   * Is current year
   *
   * @param a - Date a
   * @param a - Date b
   */
  public isBefore(a: DateInput, b?: DateInput) {
    return $dayjs(a).isBefore(b)
  }

  public diff(a: DateInput, b: DateInput, unit: UnitType) {
    return $dayjs(a).diff(b, unit)
  }

  /**
   * Get duration between two times in hours
   *
   * @param startDateTime - Start time
   * @param endDateTime - End time
   */
  public getDurationHours(
    startDateTime: ConfigType,
    endDateTime: ConfigType
  ): number {
    return $dayjs(endDateTime).diff(startDateTime, 'minute') / 60
  }

  /**
   * Converts the date time to ISO format using the specified offset
   *
   * @param dateTime - Date
   * @param tzOffset - Offset in minutes
   */
  public toISOString(dateTime: ConfigType, tzOffset: number) {
    return $dayjs(`${dateTime} ${this.getTimezone(tzOffset)}`).toISOString()
  }

  /**
   * Get timezone from offset
   *
   * See https://stackoverflow.com/questions/24500375/get-clients-gmt-offset-in-javascript
   *
   * @param tzOffset - Offset in minutes
   */
  getTimezone(tzOffset: number) {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    function z(n: number) {
      return (n < 10 ? '0' : '') + n
    }
    const sign = tzOffset < 0 ? '+' : '-'
    tzOffset = Math.abs(tzOffset)
    // eslint-disable-next-line unicorn/prefer-math-trunc
    return 'GMT ' + sign + z((tzOffset / 60) | 0) + z(tzOffset % 60)
  }

  /**
   * Is after today
   *
   * @param dateTime - Date time
   */
  public isAfterToday(dateTime: ConfigType) {
    return $dayjs(dateTime).isAfter($dayjs())
  }

  /**
   * Get period id for the date
   *
   * @param dateTime - Date time
   */
  public getPeriod(dateTime: ConfigType): string {
    const date = $dayjs(dateTime)
    return [date.isoWeek(), date.month() + 1, date.year()].join('_')
  }

  /**
   * Is same month
   *
   * @param a - Date A
   * @param b - Date B
   */
  public isSameMonth(a: ConfigType, b: ConfigType) {
    return $dayjs(a).isSame($dayjs(b), 'month')
  }

  /**
   * Get start of month
   *
   * @param date - Date
   */
  public startOfMonth(date: DateObject): DateObject {
    return new DateObject(date.$.startOf('month'))
  }

  /**
   * Get end of month
   *
   * @param date - Date
   */
  public endOfMonth(date: DateObject): DateObject {
    return new DateObject(date.$.endOf('month'))
  }

  /**
   * Parse date with timezone
   *
   * @param date - Date with timezone
   *
   * @returns The JS date
   */
  public parseDateWithTimezone(date: DateWithTimezone): Date {
    return $dayjs
      .tz($dayjs(date.dateTime).format('YYYY-MM-DD HH:mm:ss'), date.timeZone)
      .toDate()
  }
}

export default new DateUtils({
  tzOffset: new Date().getTimezoneOffset(),
  monthFormat: 'MMMM',
  yearFormat: 'YYYY',
  isoWeek: true
})

export { default as $dayjs } from 'dayjs'
export { IDatePeriod } from './DateObject'
export * from './types'
