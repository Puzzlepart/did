import DateUtils, { DateInput } from 'utils/date'
import { DateObject } from 'utils/date.dateObject'
import { ITimesheetParams } from './types'

/**
 * Handles a scope, the period of time between a startDateTime and endDateTime
 *
 * @category Timesheet
 */
export class TimesheetScope {
  constructor(public startDateTime?: DateObject, public endDateTime?: DateObject) {
    this.startDateTime = DateUtils.createDateObject('2020-05-11')
    this.endDateTime = this.startDateTime.endOfWeek
  }

  /**
   * TODO: Need to set @startDateTime and @endDateTime from @params
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fromParams(params: ITimesheetParams): TimesheetScope {
    return this
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
    this.startDateTime = DateUtils.createDateObject(start)
    this.endDateTime = this.startDateTime.endOfWeek
    return this
  }

  /**
   * Get a day in the scope by index
   *
   * @param {number} index Index
   */
  public getDay(index: number): DateObject {
    return this.startDateTime.add(`${index}d`)
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
    return DateUtils.getTimespanString(this.startDateTime, this.endDateTime)
  }
}
