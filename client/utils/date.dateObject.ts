import $dayjs, { Dayjs } from 'dayjs'
import DateUtils, { DateInput } from './date'

export class DateObject {
  public $: Dayjs

  constructor(date: DateInput) {
    this.$ = $dayjs(date)
  }

  /**
   * To get a copy of the native Date object parsed from the Day.js object use dayjs#toDate
   */
  public get jsDate() {
    return this.$.toDate()
  }

  /**
   * Get end of week
   */
  public get endOfWeek() {
    return DateUtils.endOfWeek(this.$)
  }

  /**
   * Is current week
   */
  public get isCurrentWeek() {
    return DateUtils.isCurrentWeek(this.$)
  }

  /**
   * Get the formatted date according to the string of tokens passed in.
   *
   * To escape characters, wrap them in square brackets (e.g. [MM]).
   *
   * @param {string} template Template
   */
  public format(template?: string): string {
    return this.$.format(template)
  }

  /**
   * To format as an ISO 8601 string
   */
  public get iso(): string {
    return DateUtils.toISOString(this.$)
  }

  /**
   * This indicates whether the DateObject object is the same month the other supplied date-time.
   * 
   * @param {DateObject} date Date
   */
  isSameMonth(date: DateObject) {
    return this.$.isSame(date.$, 'month')
  }

  /**
  * This indicates whether the DateObject object is the same year the other supplied date-time.
  * 
  * @param {DateObject} date Date
  */
  isSameYear(date: DateObject) {
    return this.$.isSame(date.$, 'year')
  }
}
