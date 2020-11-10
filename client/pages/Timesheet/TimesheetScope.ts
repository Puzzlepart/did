import DateUtils, { DateInput, DateObject } from 'utils/date'
import { TimesheetQuery } from '../../../server/api/graphql/resolvers/types'
import { ITimesheetParams } from './types'

/**
 * Handles a scope, the period of time between a startDateTime and endDateTime
 *
 * @category Timesheet
 */
export class TimesheetScope {
  public startDate?: DateObject
  public endDate?: DateObject

  /**
   * Constructs a new TimesheetScope
   * 
   * @param {DateInput} startDate Optional start date
   */
  constructor(startDate?: DateInput) {
    this.startDate = new DateObject(startDate).startOfWeek
    this.endDate = this.startDate.endOfWeek
  }

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
   *
   * @param {string} template Template
   */
  public query(template: string = 'YYYY-MM-DD'): TimesheetQuery {
    if (!this.startDate) return null
    return {
      startDate: this.startDate.format(template),
      endDate: this.endDate.format(template)
    }
  }

  /**
   * Sets the scope
   * 
   * @param {string} add Add
   */
  public set(add: string): TimesheetScope {
    this.startDate = this.startDate.add(add)
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
