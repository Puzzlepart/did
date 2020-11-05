import { ITimesheetParams } from './types'
import dateUtils from 'utils/date'

/**
 * Handles a scope, the period of time between a startDateTime and endDateTime
 *
 * @category Timesheet
 */
export class TimesheetScope {
  private _startDateTime?: unknown
  private _endDateTime?: unknown

  /**
   * Intializes a scope
   *
   * @param {ITimesheetParams | strin} value Init value
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(value?: ITimesheetParams | string) {
    // TODO: Rewrite to use dateUtils
    // let start = m2oment()
    // if (value) {
    //   if (typeof value === 'string') {
    //     const startIsValid = !isNaN(Date.parse(value))
    //     if (startIsValid) start = m2oment(value)
    //   } else {
    //     start = m2oment().year(parseInt(value.year)).week(parseInt(value.week)).startOf('isoWeek')
    //   }
    // }
    // this._set(start)
  }

  /**
   *  Get the from and to date for the scope as string
   * 
   * Hardcoded to return 2020-11-02 - 2020-11-08
   */
  public get dateStrings(): { startDateTime: string; endDateTime: string } {
    // TODO: @hardcoded
    return {
      startDateTime: dateUtils.toString('2020-11-02'),
      endDateTime: dateUtils.toString('2020-11-08')
    }
  }

  /**
   * Get the from and to date for the scope as JS dates
   */
  public get date(): { startDateTime: Date; endDateTime: Date } {
    // TODO: rewrite to use date util
    return null
  }

  /**
   * Sets the scope
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _set(start: unknown) {
    // this._startDateTime = dateUtils.startOfWeek(start)
    // this._endDateTime = dateUtils.endOfWeek(start)
  }

  /**
   * Add a unit of time to the scope
   *
   * @param {unknown} options Options
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public add(options: unknown): unknown {
    // TODO: rewrite to use date util
    return null
    // const start = this._startDateTime.clone()
    // start.add(options.amount, options.unit)
    // const n = new TimesheetScope()
    // n._set(start)
    // return n
  }

  /**
   * Get a day in the scope by index
   *
   * @param {number} index Index
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getDay(index: number): any {
    // TODO: rewrite to use date util
    return null
    // return this._startDateTime.clone().add(index, 'days' as m2oment.DurationInputArg2)
  }

  public get isCurrentWeek(): boolean {
    // TODO: rewrite to use date util
    return false
  }

  /**
   * Get timespan string for the scope
   * 
   * Used in WeekPicker
   */
  public get timespan(): string {
    // TODO: rewrite to use date util
    return null
    // return dateUtils.getTimespanString(this._startDateTime, this._endDateTime)
  }
}
