import { TFunction } from 'i18next'
import moment from 'moment'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import { capitalize } from 'underscore.string'

export default new (class DateUtils {
  private _momentLocale: string

  /**
   * Setup DateUtils class
   *
   * @param {string} locale Locale
   */
  public setup(locale: string) {
    this._momentLocale = locale
    moment.locale(this._momentLocale)
  }

  /**
   * Converts date string to moment, adding timezone offset
   *
   * @param {string} date Date string
   */
  toMoment(date: string) {
    const m = moment(date)
    return m.add(m.toDate().getTimezoneOffset(), 'minutes')
  }

  /**
   * Get duration string
   *
   * @param {number} durationHrs Duration in hours
   * @param {TFunction} t Translate function
   */
  getDurationString(durationHrs: number, t: TFunction): string {
    const hrsShortFormat = t('common.hoursShortFormat')
    const minShortFormat = t('common.minutesShortFormat')
    const hrs = Math.floor(durationHrs)
    const mins = parseInt(((durationHrs % 1) * 60).toFixed(0))
    const hrsStr = format(hrsShortFormat, hrs)
    const minStr = format(minShortFormat, mins)
    if (mins === 0) return hrsStr
    if (hrs === 0) return minStr
    return `${hrsStr} ${minStr}`
  }

  /**
   * Format date with the specified date format
   *
   * @param {string} date Date string
   * @param {string} dateFormat Date format
   */
  formatDate(date: string, dateFormat: string): string {
    const m = moment.utc(date)
    return m.add(-m.toDate().getTimezoneOffset(), 'minutes').format(dateFormat)
  }

  /**
   * Get start of week
   *
   * @param {string | Date | moment.Moment} date Date string
   */
  startOfWeek(date?: string | Date | moment.Moment): moment.Moment {
    const m = moment.utc(date)
    return m.add(-m.toDate().getTimezoneOffset(), 'minutes').startOf('isoWeek')
  }

  /**
   * Get end of week
   *
   * @param {string | Date} date Date string
   */
  endOfWeek(date?: string | Date | moment.Moment): moment.Moment {
    const m = moment.utc(date)
    return m.add(-m.toDate().getTimezoneOffset(), 'minutes').endOf('isoWeek')
  }

  /**
   * Get days between a start and end time
   *
   * @param {moment.Moment} start Start
   * @param {moment.Moment} end End
   * @param {string} dayFormat Date format
   */
  getDays(start: moment.Moment, end: moment.Moment, dayFormat: string): string[] {
    const days = []
    for (let i = 0; i <= end.weekday() - start.weekday(); i++) {
      days.push(capitalize(start.clone().add(i, 'days').locale(this._momentLocale).format(dayFormat)))
    }
    return days
  }

  /**
   * Add 1 month to current date
   *
   * @param {number} amount Defaults to 1
   */
  public addMonth(amount = 1) {
    return moment().add(amount, 'month')
  }

  /**
   * Subtract {amount} months from current date
   *
   * @param {number} amount Defaults to 1
   */
  public subtractMonths(amount = 1) {
    return moment().subtract(amount, 'month')
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
  public getMonthYear(date: moment.Moment = moment()) {
    return {
      monthName: date.format('MMMM'),
      monthNumber: date.month() + 1,
      year: date.year()
    }
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
  getMonthName(monthIndex?: number, format = 'MMMM', captialize = false): string {
    const date = moment().locale(this._momentLocale)
    let name: string
    if (monthIndex < 0) name = date.add(monthIndex, 'month').format(format)
    else if (monthIndex === 0) name = date.format(format)
    else name = date.month(monthIndex).format(format)
    return captialize ? capitalize(name) : name
  }

  /**
   * Get timespan string
   *
   * @param {moment.Moment} start Start
   * @param {moment.Moment} end End
   * @param {object} options Options
   */
  getTimespanString(
    start: moment.Moment,
    end: moment.Moment,
    options: Record<string, any> = {
      monthFormat: 'MMMM',
      yearFormat: 'YYYY',
      hideYear: false,
      implicitYear: false
    }
  ): string {
    return start
      .locale(this._momentLocale)
      ['twix'](end.locale(this._momentLocale), { allDay: true })
      .format(options)
      .toLowerCase()
  }

  /**
   * Get month names 0-11
   */
  getMonthNames(): string[] {
    return Array.apply(0, Array(12)).map((_: any, i: number) => {
      return capitalize(moment().month(i).format('MMMM'))
    })
  }

  /**
   * Get a string representation of the moment date instance
   *
   * @param {moment.Moment} date Moment date
   *
   * @returns {string} Returns a ISO representation of the date without the Z
   */
  toString(date: moment.Moment): string {
    return date.toISOString().replace('Z', '')
  }

  /**
   * Get week number
   */
  getWeek(): number {
    return moment().week()
  }

  /**
   * Get month index
   *
   * 1: January
   *
   * 2: February
   *
   * etc.
   */
  getMonthIndex(): number {
    return moment().month() + 1
  }

  /**
   * Get year
   */
  getYear(): number {
    return moment().year()
  }
})()
