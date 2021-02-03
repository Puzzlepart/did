import $dayjs, { ConfigType, PluginFunc } from 'dayjs'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/nb'
import durationPlugin from 'dayjs/plugin/duration'
import isoWeekPlugin from 'dayjs/plugin/isoWeek'
import localeDataPlugin from 'dayjs/plugin/localeData'
import objectSupportPlugin from 'dayjs/plugin/objectSupport'
import timezonePlugin from 'dayjs/plugin/timezone'
import utcPlugin from 'dayjs/plugin/utc'
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import { TFunction } from 'i18next'
import { capitalize } from 'underscore.string'
import { DateObject } from './date.dateObject'

interface IDateUtils {
  /**
   * Timezone offset
   *
   * Retrieved from Date.getTimezoneOffset()
   */
  tzOffset: number

  /**
   * Default month format
   */
  monthFormat: string

  /**
   * Use ISO week
   */
  isoWeek: boolean
}

export type DateInput = ConfigType

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
  }

  /**
   * Setup DateUtils class using @dayjs with @plugins
   *
   * @param {string} locale Locale
   */
  public setup(locale: string) {
    $dayjs.locale(locale)
  }

  /**
   * Get duration string
   * 
   * E.g. 15.75 => 15 hours 45 minutes
   * 
   * Using solution from https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
   * to handle floating point number precision.
   *
   * @param {number} hours Duration in hours
   * @param {TFunction} t Translate function
   */
  public getDurationString(hours: number, t: TFunction): string {
    const hoursPrecise = parseFloat(parseFloat(hours.toString()).toPrecision(5))
    const minutes = ((hoursPrecise % 1) * 60)
    const hrsStr = t('common.hoursShortFormat', { hours: Math.floor(hoursPrecise) })
    const minsStr = t('common.minutesShortFormat', { minutes })
    if (minutes === 0) return hrsStr
    if (hoursPrecise === 0) return minsStr
    return [hrsStr, minsStr].join(' ')
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
  formatDate(dateTime: ConfigType, template: string, locale?: string): string {
    if (locale) return $dayjs(dateTime).locale(locale).format(template)
    return $dayjs(dateTime).format(template)
  }

  /**
   * Get start of week
   *
   * @param {DateObject} date Date
   * @param {boolean} isoWeek Use ISO week
   */
  public startOfWeek(date?: DateObject, isoWeek: boolean = this.$.isoWeek): DateObject {
    return new DateObject(date.$.startOf(isoWeek ? 'isoWeek' : 'w'))
  }

  /**
   * Get end of week
   *
   * @param {DateObject} date Date
   * @param {boolean} isoWeek Use ISO week
   */
  public endOfWeek(date?: DateObject, isoWeek: boolean = this.$.isoWeek): DateObject {
    return new DateObject(date.$.endOf(isoWeek ? 'isoWeek' : 'w'))
  }

  /**
   * Get days between a start and end time in the specified template
   *
   * @param {DateInput} start Start
   * @param {DateInput} end End
   * @param {string} template Date template
   */
  public getDays(start: DateInput, end: DateInput, template: string = 'dddd DD'): string[] {
    const days = []
    let s = new DateObject(start)
    const e = new DateObject(end)
    while (s.isBeforeOrSame(e)) {
      days.push(capitalize(s.format(template)))
      s = s.add('1d')
    }
    return days
  }

  /**
   * Get month name for the speicifed month index
   *
   * @param {number} monthIndex Month index
   * @param {string} template Template
   */
  public getMonthName(monthIndex?: number, template: string = this.$.monthFormat): string {
    return $dayjs().set('month', monthIndex).format(template)
  }

  /**
   * Get timespan string
   *
   * @param {DateObject} start Start
   * @param {DateObject} end End
   * @param {string} monthFormat Month format
   */
  public getTimespanString(
    start: DateObject,
    end: DateObject,
    monthFormat: string = this.$.monthFormat
  ): string {
    const isSameMonth = start.isSameMonth(end)
    const isSameYear = start.isSameYear(end)
    const sFormat = ['DD']
    if (!isSameMonth) sFormat.push(monthFormat)
    if (!isSameYear) sFormat.push('YYYY')
    return [start.format(sFormat.join(' ')), end.format(`DD ${monthFormat} YYYY`)].join(' - ')
  }

  /**
   * Get month names in a year
   */
  public getMonthNames(): string[] {
    return $dayjs.months().map((m) => capitalize(m))
  }

  /**
   * Get week number
   *
   * If no @date parameter is specified the current week is returned
   *
   * @param {DateInput} date Optional date
   */
  public getWeek(date?: DateInput): number {
    return $dayjs(date).isoWeek()
  }

  /**
   * Get Iso Week number
   * Handles a weakness in dayjs, where week 53 occuring in january of a year
   * e.g. jan 1-3 2021, is returned as january 2022
   *
   * @param {number} isoWeek Iso week number
   * @param {number} year Year
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
   * @param {DateInput} date Optional date
   */
  public getMonthIndex(date?: DateInput): number {
    return $dayjs(date).month() + 1
  }

  /**
   * Get the year
   *
   * If no @date parameter is specified the current year is returned
   *
   * @param {DateInput} date Optional date
   */
  public getYear(date?: DateInput): number {
    return $dayjs(date).year()
  }

  /**
   * Is current week
   *
   * @param {DateObject} date Date
   */
  public isCurrentWeek(date: DateObject): boolean {
    return date.$.week() === $dayjs().isoWeek()
  }

  /**
   * Is current year
   *
   * @param {DateObject} date Date
   * @param {number} year Year
   */
  public isCurrentYear(date: DateObject, year?: number) {
    return (year || date.$.year()) === $dayjs().year()
  }

  /**
   * Is current year
   *
   * @param {DateInput} a Date a
   * @param {DateInput} a Date b
   */
  public isBefore(a: DateInput, b?: DateInput) {
    return $dayjs(a).isBefore(b)
  }

  /**
   * Get duration between two times in hours
   *
   * @param {ConfigType} startDateTime Start time
   * @param {ConfigType} endDateTime End time
   */
  public getDurationHours(startDateTime: ConfigType, endDateTime: ConfigType): number {
    return $dayjs(endDateTime).diff(startDateTime, 'minute') / 60
  }

  /**
   * Converts the date time to ISO format using the specified offset
   *
   * @param {ConfigType} dateTime Date
   * @param {number} tzOffset Offset in minutes
   */
  public toISOString(dateTime: ConfigType, tzOffset: number) {
    return $dayjs(`${dateTime} ${this.getTimezone(tzOffset)}`).toISOString()
  }

  /**
   * Get timezone from offset
   *
   * See https://stackoverflow.com/questions/24500375/get-clients-gmt-offset-in-javascript
   *
   * @param {number} tzOffset Offset in minutes
   */
  getTimezone(tzOffset: number) {
    function z(n: number) {
      return (n < 10 ? '0' : '') + n
    }
    const sign = tzOffset < 0 ? '+' : '-'
    tzOffset = Math.abs(tzOffset)
    return 'GMT ' + sign + z((tzOffset / 60) | 0) + z(tzOffset % 60)
  }

  /**
   * Is after today
   *
   * @param {ConfigType} dateTime Date
   */
  public isAfterToday(dateTime: ConfigType) {
    return $dayjs(dateTime).isAfter($dayjs())
  }

  /**
   * Get period id for the date
   *
   * @param {ConfigType} dateTime Date time
   */
  public getPeriod(dateTime: ConfigType): string {
    const date = $dayjs(dateTime)
    return [date.isoWeek(), date.month() + 1, date.year()].join('_')
  }

  /**
   * Is same month
   *
   * @param {ConfigType} a Date A
   * @param {ConfigType} b Date B
   */
  public isSameMonth(a: ConfigType, b: ConfigType) {
    return $dayjs(a).isSame($dayjs(b), 'month')
  }

  /**
   * Get start of month
   *
   * @param {DateObject} date Date
   */
  public startOfMonth(date: DateObject): DateObject {
    return new DateObject(date.$.startOf('month'))
  }

  /**
   * Get end of month
   *
   * @param {DateObject} date Date
   */
  public endOfMonth(date: DateObject): DateObject {
    return new DateObject(date.$.endOf('month'))
  }
}

export default new DateUtils({
  tzOffset: new Date().getTimezoneOffset(),
  monthFormat: 'MMMM',
  isoWeek: true
})

export { DateObject, $dayjs }
