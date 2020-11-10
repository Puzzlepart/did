import dayjs, { Dayjs, OpUnitType } from 'dayjs'
import { isEmpty, pick } from 'underscore'
import DateUtils, { DateInput } from './date'

export type ObjectInput = {
  week: number | string
  year: number | string
}

export class DateObject {
  /**
   * Using $ as we don't really care if it's dayjs, Temporal or luxon. This class should be
   * framework-agnostic, or maybe even framework-atheist
   */
  public $: Dayjs

  /**
   * Constructs a new DateObject from a date input
   *
   * Sending no value for date will use the current date
   *
   * @param {DateInput} date Date input
   */
  constructor(date?: DateInput) {
    this.$ = dayjs(date)
  }

  /**
   * Sets the DateObject date from an object consisting of week and year
   *
   * If @week and @year is not specified, today's date is used
   *
   * @param {ObjectInput} input Object input
   */
  public fromObject(input: ObjectInput): DateObject {
    this.$ = dayjs()
      .year(typeof input.year === 'string' ? parseInt(input.year) : input.year)
      .week(typeof input.week === 'string' ? parseInt(input.week) : input.week)
      .startOf('isoWeek')
    return this
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
    return DateUtils.endOfWeek(this)
  }

  /**
   * Get start of week
   */
  public get startOfWeek() {
    return DateUtils.startOfWeek(this)
  }

  /**
   * Is current week
   */
  public get isCurrentWeek() {
    return DateUtils.isCurrentWeek(this)
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
   * Returns a cloned DateObject with a specified amount of time added
   *
   * Currently only supporting int (whole numbers)
   *
   * If we want to support e.g. 1.5h, we could look into using parseFloat insteaf of parseInt
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

  /**
   * Returns an object representation of the DateObject
   *
   * @param {string[]} include Properties to include
   */
  toObject(...include: string[]) {
    const obj = {
      weekNumber: this.$.week(),
      monthNumber: this.$.month() + 1,
      year: this.$.year(),
      monthName: this.format('MMMM')
    }
    return isEmpty(include) ? obj : pick(obj, ...include)
  }
}
