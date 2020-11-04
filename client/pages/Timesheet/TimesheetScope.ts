import dateUtils, { moment } from 'utils/date'
import { ITimesheetParams } from './types'

export interface ITimesheetScopeOptions {
  amount: moment.DurationInputArg1
  unit: moment.unitOfTime.DurationConstructor
}

/**
 * Handles a scope, the period of time between a startDateTime and endDateTime
 *
 * @category Timesheet
 */
export class TimesheetScope {
  private _startDateTime?: moment.Moment
  private _endDateTime?: moment.Moment

  /**
   * Intializes a scope
   *
   * @param {ITimesheetParams | strin} value Init value
   */
  constructor(value?: ITimesheetParams | string) {
    let start = moment()
    if (value) {
      if (typeof value === 'string') {
        const startIsValid = !isNaN(Date.parse(value))
        if (startIsValid) start = moment(value)
      } else {
        start = moment().year(parseInt(value.year)).week(parseInt(value.week)).startOf('isoWeek')
      }
    }
    this._set(start)
  }

  /**
   *  Get the from and to date for the scope as string
   */
  public get dateStrings(): { startDateTime: string; endDateTime: string } {
    return {
      startDateTime: dateUtils.toString(this._startDateTime),
      endDateTime: dateUtils.toString(this._endDateTime)
    }
  }

  /**
   * Get the from and to date for the scope as JS dates
   */
  public get date(): { startDateTime: Date; endDateTime: Date } {
    return {
      startDateTime: this._startDateTime.toDate(),
      endDateTime: this._endDateTime.toDate()
    }
  }

  /**
   * Sets the scope
   */
  private _set(start: moment.Moment) {
    this._startDateTime = dateUtils.startOfWeek(start)
    this._endDateTime = dateUtils.endOfWeek(start)
  }

  /**
   * Add a unit of time to the scope
   *
   * @param {ITimesheetScopeOptions} options Options
   */
  public add(options: ITimesheetScopeOptions): TimesheetScope {
    const start = this._startDateTime.clone()
    start.add(options.amount, options.unit)
    const n = new TimesheetScope()
    n._set(start)
    return n
  }

  /**
   * Get a day in the scope by index
   *
   * @param {number} index Index
   */
  public getDay(index: number): moment.Moment {
    return this._startDateTime.clone().add(index, 'days' as moment.DurationInputArg2)
  }

  public get isCurrentWeek(): boolean {
    return this._startDateTime.week() === moment().week()
  }

  public get timespan(): string {
    return dateUtils.getTimespanString(this._startDateTime, this._endDateTime)
  }
}
