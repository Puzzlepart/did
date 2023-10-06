import { DateRangeType } from '@fluentui/react'
import DateUtils, { DateInput, DateObject } from 'DateUtils'
import { TimesheetQuery } from 'types'
import s from 'underscore.string'

/**
 * Handles a date range, the period of time between
 * a `startDateTime` and `endDateTime`.
 *
 * @remarks Look into creating a `react` hook
 * that can ease working with the scope
 *
 * @category Timesheet
 */
export class TimesheetDateRange {
  public startDate?: DateObject
  public endDate?: DateObject

  /**
   * Constructs for `TimesheetDateRange`
   *
   * @param startDate - Optional start date
   * @param _dateRangeType - Optional date range type
   *
   * @memberof TimesheetDateRange
   */
  constructor(
    startDate?: DateInput,
    private _dateRangeType = DateRangeType.Week
  ) {
    this._init(startDate)
  }

  /**
   * Initializes the `TimesheetDateRange` from the specified `startDate`
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
   * Get TimesheetQuery for the scope
   *
   * @param template - Template
   *
   * @memberof TimesheetDateRange
   */
  public query(template: string = 'YYYY-MM-DD'): TimesheetQuery {
    if (!this.startDate) return null
    return {
      startDate: this.startDate.format(template),
      endDate: this.endDate.format(template)
    }
  }

  /**
   * Sets the scope and returns a cloned version of the TimesheetDateRange
   *
   * @param add - Add
   *
   * @memberof TimesheetDateRange
   */
  public set(add: string): TimesheetDateRange {
    const startDate = this.startDate.add(add).jsDate
    this._init(startDate)
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }

  /**
   * Get a day in the scope by index
   *
   * @param index - Index
   *
   * @memberof TimesheetDateRange
   */
  public getDay(index: number): DateObject {
    return this.startDate.add(`${index}d`)
  }

  /**
   * Is the scope the current week or month
   *
   * @memberof TimesheetDateRange
   */
  public get isCurrent(): boolean {
    return (
      (this._dateRangeType === DateRangeType.Week &&
        this.startDate.isCurrentWeek) ||
      (this._dateRangeType === DateRangeType.Month &&
        this.startDate.isCurrentMonth)
    )
  }

  /**
   * Get timespan string for the scope
   *
   * @memberof TimesheetDateRange
   */
  public get timespan(): string {
    switch (this._dateRangeType) {
      case DateRangeType.Week: {
        return DateUtils.getTimespanString({
          startDate: this.startDate,
          endDate: this.endDate,
          includeMonth: {
            endDate: true
          }
        })
      }
      case DateRangeType.Month: {
        return s.capitalize(this.startDate.format('MMMM'))
      }
    }
  }
}
