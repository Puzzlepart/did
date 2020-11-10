import DateUtils, { DateInput, DateObject } from 'utils/date'
import { TimesheetQuery } from '../../../server/api/graphql/resolvers/types'
import { ITimesheetParams } from './types'

/**
 * Handles a scope, the period of time between a startDateTime and endDateTime
 *
 * @category Timesheet
 */
export class TimesheetScope {
  constructor(public startDate?: DateObject, public endDate?: DateObject) {}

  /**
   * Sets startDate/endDate from params
   * 
   * @param {ITimesheetParams} params Params
   */
  fromParams(params: ITimesheetParams): TimesheetScope {
    this.startDate = new DateObject().fromObject(params)
    this.endDate = this.startDate.endOfWeek
    return this
  }

  /**
   * Get TimesheetQuery for the scope
   */
  public get query(): TimesheetQuery {
    if (!this.startDate) return null
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
    this.startDate = new DateObject(start)
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
   * Used in @WeekPicker
   */
  public get timespan(): string {
    return DateUtils.getTimespanString(this.startDate, this.endDate)
  }
}
