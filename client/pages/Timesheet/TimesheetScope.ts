import dateUtils, { DateInput } from 'utils/date'
import { DateObject } from 'utils/date.dateObject'

/**
 * Handles a scope, the period of time between a startDateTime and endDateTime
 *
 * @category Timesheet
 */
export class TimesheetScope {
  constructor(
    public startDateTime?: DateObject,
    public endDateTime?: DateObject
  ) {
    this.startDateTime = dateUtils.createDate('2020-11-02')
    this.endDateTime = dateUtils.createDate(this.startDateTime.endOfWeek)
  }

  /**
  * Get the from and to date for the scope as ISO strings
   */
  public get iso() {
    return {
      startDateTime: this.startDateTime.iso,
      endDateTime: this.endDateTime.iso
    }
  }

  /**
   * Sets the scope
   * 
   * @param {DateInput} start Start of scope
   */
  public set(start: DateInput): TimesheetScope {
    this.startDateTime = dateUtils.createDate(start)
    this.endDateTime = dateUtils.createDate(this.startDateTime.endOfWeek)
    return this
  }

  /**
   * Get a day in the scope by index
   *
   * @param {number} index Index
   */
  public getDay(index: number): DateObject {
    return dateUtils.addDays(this.startDateTime, index)
  }

  /**
   * Is the scope the current week
   */
  public get isCurrentWeek(): boolean {
    return this.startDateTime.isCurrentWeek
  }

  /**
   * Get timespan string for the scope
   *
   * Used in WeekPicker
   */
  public get timespan(): string {
    return dateUtils.getTimespanString(this.startDateTime, this.endDateTime)
  }
}
