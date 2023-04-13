/* eslint-disable max-classes-per-file */
import format from 'string-format'

/**
 * Used as a base to create notifications to the user
 */
export class UserNotification {
  /**
   * Notification ID
   */
  public id: string

  /**
   * Notification text
   */
  public text: string

  constructor(
    id: string,
    public type: number,
    public severity: number,
    private _period: any,
    template: string
  ) {
    this.id = this._generateId(id)
    this.text = format(template, _period.week, _period.month)
  }

  /**
   * Generates a unique notification ID
   *
   * @param id - Id
   */
  private _generateId(id: string) {
    return id.replace(/[^\dA-Za-z]/g, '')
  }

  /**
   * More link for the notification in the format `/timesheet/week/overview/{startDate}`.
   */
  public get moreLink() {
    return ['', 'timesheet/week/overview', this._period.startDate].join('/')
  }
}

/**
 * @ignore
 */
export class ForecastNotification extends UserNotification {
  constructor(period: any, template: string) {
    super(`forecast${period.id}`, 1, 2, period, template)
  }
}

/**
 * @ignore
 */
export class UnconfirmedPeriodNotification extends UserNotification {
  constructor(period: any, template: string) {
    super(`unconfirmedperiod${period.id}`, 0, 2, period, template)
  }
}
