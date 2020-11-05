import { TFunction } from 'i18next'
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'
import 'dayjs/locale/nb'
import weekOfYear from 'dayjs/plugin/weekOfYear'

class DateUtils {
  /**
   * Setup DateUtils class
   *
   * @param {string} locale Locale
   */
  public setup(locale: 'en-gb' | 'nb') {
    dayjs.locale(locale)
    dayjs.extend(weekOfYear)
  }

  /**
   * Converts date string to m2oment, adding timezone offset
   *
   * @param {string} date Date string
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toM0ment(date: string) {
    return null
    // TODO: Fix
    // const m = m2oment(date)
    // return m.add(m.toDate().getTimezoneOffset(), 'minutes')
  }

  /**
   * Get duration string
   *
   * @param {number} durationHrs Duration in hours
   * @param {TFunction} t Translate function
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDurationString(durationHrs: number, t: TFunction): string {
    // TODO: Fix
    return null
    // const hrsShortFormat = t('common.hoursShortFormat')
    // const minShortFormat = t('common.minutesShortFormat')
    // const hrs = Math.floor(durationHrs)
    // const mins = parseInt(((durationHrs % 1) * 60).toFixed(0))
    // const hrsStr = format(hrsShortFormat, hrs)
    // const minStr = format(minShortFormat, mins)
    // if (mins === 0) return hrsStr
    // if (hrs === 0) return minStr
    // return `${hrsStr} ${minStr}`
  }

  /**
   * Format date with the specified date format
   *
   * @param {string} date Date string
   * @param {string} dateFormat Date format
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formatDate(date: string, dateFormat: string): string {
    // TODO: Fix
    return null
    // const m = m2oment.utc(date)
    // return m.add(-m.toDate().getTimezoneOffset(), 'minutes').format(dateFormat)
  }

  /**
   * Get start of week
   *
   * @param {unknown} date Date string
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startOfWeek(date?: unknown): unknown {
    // TODO: fix
    return null
    // const m = m2oment.utc(date)
    // return m.add(-m.toDate().getTimezoneOffset(), 'minutes').startOf('isoWeek')
  }

  /**
   * Get end of week
   *
   * @param {string | Date} date Date string
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endOfWeek(date?: unknown): unknown {
    // TODO: fix
    return null
    // const m = m2oment.utc(date)
    // return m.add(-m.toDate().getTimezoneOffset(), 'minutes').endOf('isoWeek')
  }

  /**
   * Get days between a start and end time
   *
   * @param {unknown} start Start
   * @param {unknown} end End
   * @param {string} dayFormat Date format
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDays(start: unknown, end: unknown, dayFormat: string): string[] {
    // TODO: fix
    return null
    // const days = []
    // for (let i = 0; i <= end.weekday() - start.weekday(); i++) {
    //   days.push(capitalize(start.clone().add(i, 'days').locale(this.m0mentLocale).format(dayFormat)))
    // }
    // return days
  }

  /**
   * Add 1 month to current date
   *
   * @param {number} amount Defaults to 1
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public addMonth(amount = 1) {
    // TODO: fix
    return null
    // return m2oment().add(amount, 'month')
  }

  /**
   * Subtract {amount} months from current date
   *
   * @param {number} amount Defaults to 1
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public subtractMonths(amount = 1) {
    // TODO: fix
    return null
    // return m2oment().subtract(amount, 'month')
  }

  /**
   * Get month and year for the current date
   *
   * @param date Date
   *
   * @returns
   * * {string} monthName
   * * {number} monthNumber
   * * {number} year
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getMonthYear(date: unknown = null) {
    // TODO: fix
    return null
    // return {
    //   monthName: date.format('MMMM'),
    //   monthNumber: date.month() + 1,
    //   year: date.year()
    // }
  }

  /**
   * Get month name for the speicifed month index
   *
   * Under 0: Subtracts {monthIndex} months from current month
   *
   * 0: Returns current month name
   *
   * Over 0: Returns the actual month with the speified index
   *
   *
   * @param {number} monthIndex Month number
   * @param {string} format Format
   * @param {boolean} captialize Capitalize
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMonthName(monthIndex?: number, format = 'MMMM', captialize = false): string {
    // TODO: fix
    return null
    // const date = m2oment().locale(this.m0mentLocale)
    // let name: string
    // if (monthIndex < 0) name = date.add(monthIndex, 'month').format(format)
    // else if (monthIndex === 0) name = date.format(format)
    // else name = date.month(monthIndex).format(format)
    // return captialize ? capitalize(name) : name
  }

  /**
   * Get timespan string
   *
   * @param {unknown} start Start
   * @param {unknown} end End
   * @param {object} options Options
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTimespanString(start: unknown, end: unknown, options: Record<string, any> = { monthFormat: 'MMMM', yearFormat: 'YYYY', hideYear: false, }): string {
    // TODO: fix
    return null
    // return start
    //   .locale(this.m0mentLocale)
    // ['twix'](end.locale(this.m0mentLocale), { allDay: true })
    //   .format(options)
    //   .toLowerCase()
  }

  /**
   * Get month names 0-11
   */
  getMonthNames(): string[] {
    // TODO: fix
    return null
    // return Array.apply(0, Array(12)).map((_: any, i: number) => {
    //   return capitalize(m2oment().month(i).format('MMMM'))
    // })
  }

  /**
   * Get a ISO string representation of the date
   * 
   * @param {dayjs.ConfigType} date Optional date
   */
  toString(date?: dayjs.ConfigType): string {
    return dayjs(date).toISOString()
  }

  /**
   * Get week number
   * 
   * @param {dayjs.ConfigType} date Optional date
   */
  getWeek(date?: dayjs.ConfigType): number {
    return dayjs(date).week()
  }

  /**
   * Get the month.
   * 
   * Months are zero indexed, so January is month 0.
   * 
   * @param {dayjs.ConfigType} date Optional date
   */
  getMonthIndex(date?: dayjs.ConfigType): number {
    return dayjs(date).month() + 1
  }

  /**
   * Get year
   * 
   * @param {dayjs.ConfigType} date Optional date
   */
  getYear(date?: dayjs.ConfigType): number {
    return dayjs(date).year()
  }
}

export default new DateUtils()
