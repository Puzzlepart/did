import $dayjs, { Dayjs, OpUnitType } from 'dayjs'
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

  /**
  * This indicates whether the Day.js object is the same or before as the other supplied date-time.
  * 
  * @param {DateObject} date Date
  */
  isBeforeOrSame(date: DateObject) {
    return this.$.isBefore(date.$) || this.$.isSame(date.$)
  }

  /**
   * Returns a cloned DateObjectobject with a specified amount of time added.
   *
   * E.g. 1d to add day, or 1m to add 1 month
   * 
   * @param {string} add Add
   */
  public add(add: string) {
    const value = parseInt(add)
    const [, unit] = add.split(value.toString())
    return new DateObject(this.$.add(value, unit as OpUnitType))
  }

  /**
  * This indicates the difference between two date-time in the specified unit.
  * 
  * @param {DateObject} date Date   * 
  * @param {OpUnitType} unit Unit
  */
  diff(date: DateObject, unit: OpUnitType) {
    return this.$.diff(date.$, unit)
  }
}
