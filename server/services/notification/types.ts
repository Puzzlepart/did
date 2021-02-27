/* eslint-disable max-classes-per-file */
import format from 'string-format'

class BaseNotification {
  public text: string
  public moreLink: string

  constructor(
    public id: string,
    public type: number,
    public severity: number,
    period: any,
    template: string
  ) {
    this.text = format(template, period.week, period.month)
    this.moreLink = ['', 'timesheet/overview', ...period.id.split('_')].join(
      '/'
    )
  }
}

export class ForecastNotification extends BaseNotification {
  constructor(period: any, template: string) {
    super(`forecast_${period.id}`, 1, 2, period, template)
  }
}

export class UnconfirmedPeriodNotification extends BaseNotification {
  constructor(period: any, template: string) {
    super(`unconfirmed_period_${period.id}`, 0, 2, period, template)
  }
}
