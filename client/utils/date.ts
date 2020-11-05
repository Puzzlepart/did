/* eslint-disable max-classes-per-file */
import $dayjs, { ConfigType, Dayjs } from 'dayjs'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/nb'
import duration from 'dayjs/plugin/duration'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import objectSupport from 'dayjs/plugin/objectSupport'
import isoWeek from 'dayjs/plugin/isoWeek'
import utc from 'dayjs/plugin/utc'
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
  public createDate(date: DateInput): DateObject {
    return new DateObject(date)
  }

  /**
   * Get duration string
   *
   * @param {number} hours Duration in hours
   * @param {TFunction} t Translate function
   */
  getDurationString(hours: number, t: TFunction): string {
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
   * @param {string} dateFormat Date format
   */
  formatDate(date: DateInput, dateFormat: string): string {
    return this._fixTzOffset(date).format(dateFormat)
  }

  /**
   * Get start of week
   *
   * @param {DateInput} date Date
   */
  startOfWeek(date?: DateInput): Dayjs {
    return $dayjs(date).startOf('isoWeek')
  }

  /**
   * Get end of week
   *
   * @param {DateInput} date Date
   */
  endOfWeek(date?: DateInput): Dayjs {
    return $dayjs(date).endOf('isoWeek')
  }

  /**
   * Get days between a start and end time in the specified format
   *
   * @param {DateInput} start Start
   * @param {DateInput} end End
   * @param {string} format Date format
   */
  getDays(start: DateInput, end: DateInput, format: string = 'dddd DD'): string[] {
    const days = []
    let s = new DateObject(start)
    const e = new DateObject(end)
    while (s.isBeforeOrSame(e)) {
      days.push(capitalize(s.format(format)))
      s = s.add('1d')
    }
    return days
  }

  /**
   * Add {value} months from current date
   *
   * @param {number} value Defaults to 1
   */
  public addMonth(value: number = 1): Dayjs {
    return $dayjs().add(value, 'month')
  }

  /**
   * Subtract {value} months from current date
   *
   * @param {number} value Defaults to 1
   */
  public subtractMonths(value: number = 1): Dayjs {
    return $dayjs().subtract(value, 'month')
  }

  /**
   * Get monthName, monthNumber and year for the current date
   *
   * @param {DateInput} date Optional date
   */
  public getMonthYear(date?: DateInput) {
    const d = $dayjs(date)
    return {
      monthName: d.format('MMMM'),
      monthNumber: d.month() + 1,
      year: d.year()
    }
  }

  /**
   * Get month name for the speicifed month index
   *
   * @param {number} monthIndex Month index
   * @param {string} format Format
   * @param {boolean} captialize Capitalize
   */
  getMonthName(monthIndex?: number): string {
    return $dayjs().set('month', monthIndex).format('MMMM')
  }

  /**
   * Get timespan string
   *
   * @param {DateObject} start Start
   * @param {DateObject} end End
   * @param {object} options Options
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTimespanString(start: DateObject, end: DateObject): string {
    const isSameMonth = start.isSameMonth(end)
    const isSameYear = start.isSameYear(end)
    const sFormat = ['DD']
    if (!isSameMonth) sFormat.push('MMMM')
    if (!isSameYear) sFormat.push('YYYY')
    const eFormat = ['DD', 'MMMM', 'YYYY']
    return [start.format(sFormat.join(' ')), end.format(eFormat.join(' '))].join(' - ')
  }

  /**
   * Get month names in a year
   */
  getMonthNames(): string[] {
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
  getWeek(date?: DateInput): number {
    return $dayjs(date).week()
  }

  /**
   * Get the month.
   *
   * Months are zero indexed, so January is month 0.
   *
   * @param {DateInput} date Optional date
   */
  getMonthIndex(date?: DateInput): number {
    return $dayjs(date).month() + 1
  }

  /**
   * Get year
   *
   * @param {DateInput} date Optional date
   */
  getYear(date?: DateInput): number {
    return $dayjs(date).year()
  }

  /**
   * Is current week
   *
   * @param {DateInput} date Optional date
   */
  isCurrentWeek(date?: DateInput): boolean {
    return $dayjs(date).week() === $dayjs().week()
  }

  /**
   * Add days
   *
   * @param {DateObject} date Date object
   */
  addDays(startDateTime: DateObject, index: number): DateObject {
    throw new DateObject(startDateTime.$.add(index, 'day'))
  }
}

export default new DateUtils({
  tzOffset: new Date().getTimezoneOffset()
})

export { DateObject }
