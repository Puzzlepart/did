import dayjs from 'dayjs'
import { DateUtils, DateInput } from './date'

export class DateObject {
  public _: dayjs.Dayjs
  public jsDate: Date
  public endOfWeek: DateInput
  public isCurrentWeek: boolean

  constructor(date: DateInput, private _dateUtils: DateUtils) {
    this._ = dayjs(date)
    this.jsDate = this._.toDate()
    this.endOfWeek = _dateUtils.endOfWeek(date)
    this.isCurrentWeek = _dateUtils.isCurrentWeek(date)
  }

  /**
   * Get the formatted date according to the string of tokens passed in.
   *
   * To escape characters, wrap them in square brackets (e.g. [MM]).
   *
   * @param {string} template Template
   */
  public format(template?: string): string {
    return this._.format(template)
  }

  /**
   * To format as an ISO 8601 string
   */
  public get iso(): string {
    return this._dateUtils.toISOString(this._)
  }

  /**
   * This indicates whether the DateObject object is the same month the other supplied date-time.
   * 
   * @param {DateObject} date Date
   */
  isSameMonth(date: DateObject) {
    return this._.isSame(date._, 'month')
  }

   /**
   * This indicates whether the DateObject object is the same year the other supplied date-time.
   * 
   * @param {DateObject} date Date
   */
  isSameYear(date: DateObject) {
    return this._.isSame(date._, 'year')
  }
}
