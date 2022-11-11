import { DateRangeType } from '@fluentui/react'
import DateUtils, { DateInput, DateObject } from 'DateUtils'
import { TimesheetQuery } from 'types'
import { capitalize } from 'underscore.string'
import { ITimesheetParameters } from './types'

/**
 * Handles a scope, the period of time between
 * a `startDateTime` and `endDateTime`.
 *
 * @remarks Look into creating a `react` hook
 * that can ease working with the scope
 *
 * @category Timesheet
 */
export class TimesheetScope {
  public startDate?: DateObject
  public endDate?: DateObject

  /**
   * Constructs for `TimesheetScope`
   *
   * @param startDate - Optional start date
   * @param _dateRangeType - Optional date range type
   *
   * @memberof TimesheetScope
   */
  constructor(
    startDate?: DateInput,
    private _dateRangeType = DateRangeType.Week
  ) {
    this._init(startDate)
  }

  /**
   * Initializes the `TimesheetScope` from the specified `startDate`
   *
   * @param startDate - Start date
   */
  private _init(startDate?: DateInput) {
    this.startDate =
      this._dateRangeType === DateRangeType.Week
        ? new DateObject(startDate).startOfWeek
        : new DateObject(startDate).startOfMonth
    this.endDate =
      this._dateRangeType === DateRangeType.Week
        ? this.startDate.endOfWeek
        : this.startDate.endOfMonth
  }

  /**
   * Sets `startDate` and `endDate` from `params`
   *
   * @param parameters - Params
   *
   * @memberof TimesheetScope
   */
  public fromParams(parameters: ITimesheetParameters): TimesheetScope {
    const startDate = new DateObject().fromObject(parameters).jsDate
    this._init(startDate)
    return this
  }

  /**
   * Get TimesheetQuery for the scope
   *
   * @param template - Template
   *
   * @memberof TimesheetScope
   */
  public query(template: string = 'YYYY-MM-DD'): TimesheetQuery {
    if (!this.startDate) return null
    return {
      startDate: this.startDate.format(template),
      endDate: this.endDate.format(template)
    }
  }

  /**
   * Sets the scope and returns a cloned version of the TimesheetScope
   *
   * @param add - Add
   *
   * @memberof TimesheetScope
   */
  public set(add: string): TimesheetScope {
    this.startDate = this.startDate.add(add)
    this.endDate = this.startDate.endOfWeek
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  /**
   * Get a day in the scope by index
   *
   * @param index - Index
   *
   * @memberof TimesheetScope
   */
  public getDay(index: number): DateObject {
    return this.startDate.add(`${index}d`)
  }

  /**
   * Is the scope the current week
   *
   * @memberof TimesheetScope
   */
  public get isCurrentWeek(): boolean {
    return this.startDate.isCurrentWeek
  }

  /**
   * Get timespan string for the scope
   *
   * @memberof TimesheetScope
   */
  public get timespan(): string {
    switch (this._dateRangeType) {
      case DateRangeType.Week:
        return DateUtils.getTimespanString({
          startDate: this.startDate,
          endDate: this.endDate,
          includeMonth: {
            endDate: true
          }
        })
      case DateRangeType.Month:
        return capitalize(this.startDate.format('MMMM'))
    }
  }
}
