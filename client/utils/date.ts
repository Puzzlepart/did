import $dayjs, { ConfigType } from 'dayjs'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/nb'
import durationPlugin from 'dayjs/plugin/duration'
import isoWeekPlugin from 'dayjs/plugin/isoWeek'
import localeDataPlugin from 'dayjs/plugin/localeData'
import objectSupportPlugin from 'dayjs/plugin/objectSupport'
import utcPlugin from 'dayjs/plugin/utc'
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear'
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
    $dayjs.extend(weekOfYearPlugin)
    $dayjs.extend(localeDataPlugin)
    $dayjs.extend(durationPlugin)
    $dayjs.extend(objectSupportPlugin)
    $dayjs.extend(utcPlugin)
    $dayjs.extend(isoWeekPlugin)
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
  public getTimespanString(start: DateObject, end: DateObject, monthFormat: string = this.$.monthFormat): string {
    const isSameMonth = start.isSameMonth(end)
    const isSameYear = start.isSameYear(end)
    const sFormat = ['DD']
    if (!isSameMonth) sFormat.push(monthFormat)
    if (!isSameYear) sFormat.push('YYYY')
    return [
      start.format(sFormat.join(' ')),
      end.format(`DD ${monthFormat} YYYY`)
    ].join(' - ')
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
  public isCurrentWeek(date: DateObject): boolean {
    return date.$.week() === $dayjs().week()
  }
}

export default new DateUtils({
  tzOffset: new Date().getTimezoneOffset(),
  monthFormat: 'MMMM',
  isoWeek: true
})

export { DateObject }
