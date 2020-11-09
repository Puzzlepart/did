import DateUtils, { DateInput } from 'utils/date'
import { DateObject } from 'utils/date.dateObject'
import { ITimesheetParams } from './types'

/**
 * Handles a scope, the period of time between a startDateTime and endDateTime
 *
 * @category Timesheet
 */
export class TimesheetScope {
  constructor(public startDate?: DateObject, public endDate?: DateObject) {
    this.startDate = DateUtils.createDateObject('2020-05-11')
    this.endDate = this.startDate.endOfWeek
  }

  /**
   * TODO: Need to set @startDate and @endDate from @params
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fromParams(params: ITimesheetParams): TimesheetScope {
    return this
  }

  /**
   * Get the from and to date for the scope as ISO strings
   */
  public get query() {
    return {
      startDate: this.startDate.format('YYYY-MM-DD'),
      endDate: this.endDate.format('YYYY-MM-DD')
    }
  }

  /**
   * Sets the scope
   *
   * @param {DateInput} start Start of scope
   */
  public set(start: DateInput): TimesheetScope {
    this.startDate = DateUtils.createDateObject(start)
    this.endDate = this.startDate.endOfWeek
    return this
  }

  /**
   * Get a day in the scope by index
   *
   * @param {number} index Index
   */
  public getDay(index: number): DateObject {
    return this.startDate.add(`${index}d`)
  }

  /**
   * Is the scope the current week
   */
  public get isCurrentWeek(): boolean {
    return this.startDate.isCurrentWeek
  }

  /**
   * Get timespan string for the scope
   *
   * Used in WeekPicker
   */
  public get timespan(): string {
    return DateUtils.getTimespanString(this.startDate, this.endDate)
  }
}
