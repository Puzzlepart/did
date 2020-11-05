import { TFunction } from 'i18next'
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/nb'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import duration from 'dayjs/plugin/duration'
import { capitalize } from 'underscore.string'

export type DateInput = dayjs.ConfigType
export type DateObject = dayjs.Dayjs

class DateUtils {
  /**
   * Setup DateUtils class using @dayjs with @plugins
   *
   * @param {string} locale Locale
   */
  public setup(locale: string) {
    dayjs.locale(locale)
    dayjs.extend(weekOfYear)
    dayjs.extend(localeData)
    dayjs.extend(duration)
  }

  /**
   * Create date
   * 
   * @param {DateInput} date Date
   */
  public createDate(date: DateInput): dayjs.Dayjs {
    return dayjs(date)
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
    return dayjs(date).format(dateFormat)
  }

  /**
   * Get start of week
   *
   * @param {DateInput} date Date
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startOfWeek(date?: DateInput): unknown {
    return dayjs(date).startOf('week')
  }

  /**
   * Get end of week
   *
   * @param {DateInput} date Date
   */
  endOfWeek(date?: DateInput): dayjs.Dayjs {
    return dayjs(date).endOf('week')
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
    let s = dayjs(start)
    const e = dayjs(end)

    while (s.isBefore(e) || s.isSame(e)) {
      days.push(capitalize(s.format(format)))
      s = s.add(1, 'day')
    }
    return days
  }

  /**
   * Add {value} months from current date
   *
   * @param {number} value Defaults to 1
   */
  public addMonth(value: number = 1): dayjs.Dayjs {
    return dayjs().add(value, 'month')
  }

  /**
   * Subtract {value} months from current date
   *
   * @param {number} value Defaults to 1
   */
  public subtractMonths(value: number = 1): dayjs.Dayjs {
    return dayjs().subtract(value, 'month')
  }

  /**
   * Get monthName, monthNumber and year for the current date
   *
   * @param {DateInput} date Optional date
   */
  public getMonthYear(date?: DateInput) {
    const d = dayjs(date)
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
    return dayjs().set('month', monthIndex).format('MMMM')
  }

  /**
   * Get timespan string
   *
   * @param {DateInput} start Start
   * @param {DateInput} end End
   * @param {object} options Options
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTimespanString(start: DateInput, end: DateInput): string {
    return 'WORK_IN_PROGRESS'
  }

  /**
   * Get month names in a year
   */
  getMonthNames(): string[] {
    return dayjs.months().map((m) => capitalize(m))
  }

  /**
   * Get a ISO string representation of the date
   *
   * @param {DateInput} date Optional date
   */
  toString(date?: DateInput): string {
    return dayjs(date).toISOString()
  }

  /**
   * Get week number
   *
   * @param {DateInput} date Optional date
   */
  getWeek(date?: DateInput): number {
    return dayjs(date).week()
  }

  /**
   * Get the month.
   *
   * Months are zero indexed, so January is month 0.
   *
   * @param {DateInput} date Optional date
   */
  getMonthIndex(date?: DateInput): number {
    return dayjs(date).month() + 1
  }

  /**
   * Get year
   *
   * @param {DateInput} date Optional date
   */
  getYear(date?: DateInput): number {
    return dayjs(date).year()
  }
}

export default new DateUtils()
