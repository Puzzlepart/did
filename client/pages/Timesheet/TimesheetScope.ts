import date from 'utils/date'
import dateUtils, { DateObject } from 'utils/date'

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
    this.endDateTime = dateUtils.createDate('2020-11-08')
  }

  /**
  * Get the from and to date for the scope as ISO strings
   */
  public get dateStrings(): { startDateTime: string; endDateTime: string } {
    return {
      startDateTime: this.startDateTime.toISOString(),
      endDateTime: this.endDateTime.toISOString()
    }
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
    // TODO: rewrite to use date util
   */
  public add(): unknown {
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

  /**
   * Is the scope the current week
   */
  public get isCurrentWeek(): boolean {
    return dateUtils.isCurrentWeek(this.startDateTime)
  }

  /**
   * Get timespan string for the scope
   *
   * Used in WeekPicker
   */
  public get timespan(): string {
    return dateUtils.getTimespanString(this.startDateTime as any, this.endDateTime as any)
  }
}
