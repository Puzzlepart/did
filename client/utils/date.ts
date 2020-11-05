/* eslint-disable max-classes-per-file */
import $dayjs, { ConfigType } from 'dayjs'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/nb'
import duration from 'dayjs/plugin/duration'
import isoWeek from 'dayjs/plugin/isoWeek'
import localeData from 'dayjs/plugin/localeData'
import objectSupport from 'dayjs/plugin/objectSupport'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { TFunction } from 'i18next'
import { capitalize } from 'underscore.string'
import { DateObject } from './date.dateObject'

interface IDateUtils {
  /**
   * Timezone offset
   * 
   * Retrieved from Date.getTimezoneOffset()
   */
  tzOffset: number;

  /**
   * Default month format
   */
  monthFormat: string;

  /**
   * Use ISO week
   */
  isoWeek: boolean;
}

export type DateInput = ConfigType

export class DateUtils {
  constructor(private $: IDateUtils) { }

  /**
   * Setup DateUtils class using @dayjs with @plugins
   *
   * @param {string} locale Locale
   */
  public setup(locale: string) {
    $dayjs.locale(locale)
    $dayjs.extend(weekOfYear)
    $dayjs.extend(localeData)
    $dayjs.extend(duration)
    $dayjs.extend(objectSupport)
    $dayjs.extend(utc)
    $dayjs.extend(isoWeek)
  }

  /**
   * Subtract timezone offset
   *
   * @param {DateInput} date Date
   */
  private _fixTzOffset(date: DateInput) {
    return $dayjs(date).subtract(this.$.tzOffset, 'minute')
  }

  /**
   * Create date
   *
   * @param {DateInput} date Date
   */
  public createDateObject(date: DateInput = new Date()): DateObject {
    return new DateObject(date)
  }

  /**
   * Get duration string
   *
   * @param {number} hours Duration in hours
   * @param {TFunction} t Translate function
   */
  public getDurationString(hours: number, t: TFunction): string {
    const hrs = Math.floor(hours)
    const mins = parseInt(((hours % 1) * 60).toFixed(0))
    const hrsStr = t('common.hoursShortFormat', { hrs })
    const minsStr = t('common.minutesShortFormat', { mins })
    if (mins === 0) return hrsStr
    if (hrs === 0) return minsStr
    return [hrsStr, minsStr].join(' ')
  }

  /**
   * Format date with the specified date format
   *
   * @param {DateInput} date Date
   * @param {string} template Date format
   */
  public formatDate(date: DateInput, template: string): string {
    return this._fixTzOffset(date).format(template)
  }

  /**
   * Get start of week
   *
   * @param {DateObject} date Date
   */
  public startOfWeek(date?: DateObject): DateObject {
    return new DateObject(date.$.startOf(this.$.isoWeek ? 'isoWeek' : 'w'))
  }

  /**
   * Get end of week
   *
   * @param {DateObject} date Date
   */
  public endOfWeek(date?: DateObject): DateObject {
    return new DateObject(date.$.endOf(this.$.isoWeek ? 'isoWeek' : 'w'))
  }

  /**
   * Get days between a start and end time in the specified template
   *
   * @param {DateInput} start Start
   * @param {DateInput} end End
   * @param {string} template Date template
   */
  getDays(start: DateInput, end: DateInput, template: string = 'dddd DD'): string[] {
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
   * @param {string} format Format
   * @param {boolean} captialize Capitalize
   */
  public getMonthName(monthIndex?: number): string {
    return $dayjs().set('month', monthIndex).format(this.$.monthFormat)
  }

  /**
   * Get timespan string
   *
   * @param {DateObject} start Start
   * @param {DateObject} end End
   * @param {object} options Options
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getTimespanString(start: DateObject, end: DateObject): string {
    const isSameMonth = start.isSameMonth(end)
    const isSameYear = start.isSameYear(end)
    const sFormat = ['DD']
    if (!isSameMonth) sFormat.push(this.$.monthFormat)
    if (!isSameYear) sFormat.push('YYYY')
    const eFormat = ['DD', this.$.monthFormat, 'YYYY']
    return [start.format(sFormat.join(' ')), end.format(eFormat.join(' '))].join(' - ')
  }

  /**
   * Get month names in a year
   */
  public getMonthNames(): string[] {
    return $dayjs.months().map((m) => capitalize(m))
  }

  /**
   * To format as an ISO 8601 string.
   *
   * @param {DateInput} date Optional date
   */
  public toISOString(date?: DateInput): string {
    return $dayjs(date).toISOString()
  }

  /**
   * Get week number
   *
   * @param {DateInput} date Optional date
   */
  public getWeek(date?: DateInput): number {
    return $dayjs(date).week()
  }

  /**
   * Get the month.
   *
   * Months are zero indexed, so January is month 0.
   *
   * @param {DateInput} date Optional date
   */
  public getMonthIndex(date?: DateInput): number {
    return $dayjs(date).month() + 1
  }

  /**
   * Get year
   *
   * @param {DateInput} date Optional date
   */
  public getYear(date?: DateInput): number {
    return $dayjs(date).year()
  }

  /**
   * Is current week
   *
   * @param {DateObject} date Optional date
   */
  public isCurrentWeek(date?: DateObject): boolean {
    return date.$.week() === $dayjs().week()
  }
}

export default new DateUtils({
  tzOffset: new Date().getTimezoneOffset(),
  monthFormat: 'MMMM',
  isoWeek: true
})

export { DateObject }
