import { ITimesheetParams } from './types'

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
    // let start = moment()
    // if (value) {
    //   if (typeof value === 'string') {
    //     const startIsValid = !isNaN(Date.parse(value))
    //     if (startIsValid) start = moment(value)
    //   } else {
    //     start = moment().year(parseInt(value.year)).week(parseInt(value.week)).startOf('isoWeek')
    //   }
    // }
    // this._set(start)
  }

  /**
   *  Get the from and to date for the scope as string
   */
  public get dateStrings(): { startDateTime: string; endDateTime: string } {
    // TODO: rewrite to use date util
    return null
    // return {
    //   startDateTime: dateUtils.toString(this._startDateTime),
    //   endDateTime: dateUtils.toString(this._endDateTime)
    // }
  }

  /**
   * Get the from and to date for the scope as JS dates
   */
  public get date(): { startDateTime: Date; endDateTime: Date } {
    // TODO: rewrite to use date util
    return null
    // return {
    //   startDateTime: this._startDateTime.toDate(),
    //   endDateTime: this._endDateTime.toDate()
    // }
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
    // return this._startDateTime.clone().add(index, 'days' as moment.DurationInputArg2)
  }

  public get isCurrentWeek(): boolean {
    // TODO: rewrite to use date util
    return false
  }

  public get timespan(): string {
    // TODO: rewrite to use date util
    return null
    // return dateUtils.getTimespanString(this._startDateTime, this._endDateTime)
  }
}
