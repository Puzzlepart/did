import get from 'get-value'
import { Collection } from 'mongodb'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { find } from 'underscore'
import { DateObject } from '../../../shared/utils/date'
import { Context } from '../../graphql/context'
import { NotificationTemplates } from '../../graphql/resolvers/types'
import { TimesheetService } from '../timesheet'
import { ForecastNotification, UnconfirmedPeriodNotification } from './types'

@Service({ global: false })
export class NotificationService {
  private _confirmed_periods: Collection
  private _forecasted_periods: Collection
  /**
   * Constructor
   *
   * @param {Context} context Context
   * @param {TimesheetService} _timesheet Timesheet service
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _timesheet: TimesheetService
  ) {
    const db = this.context.client.db('test')
    this._confirmed_periods = db.collection('confirmed_periods')
    this._forecasted_periods = db.collection('forecasted_periods')
  }

  /**
   * Get unconfirmed periods notifications
   * 
   * @param {string} template Notification template
   * @param {string} locale Locale
   */
  private async _unconfirmedPeriods(template: string, locale: string) {
    const periods = []
    const unconfirmedPeriods = []
    let currentDate = new DateObject().add('-1w')

    for (let i = 0; i <= 5; i++) {
      const startOfWeek = currentDate.startOfWeek.format('YYYY-MM-DD')
      const endOfWeek = currentDate.endOfWeek.format('YYYY-MM-DD')
      periods.push(...this._timesheet.getPeriods(startOfWeek, endOfWeek, locale))
      currentDate = currentDate.add('-1w')
    }

    const confirmedPeriods = await this._confirmed_periods.find({
      userId: this.context.userId
    }).toArray()

    periods.forEach((period) => {
      if (!find(confirmedPeriods, ({ id }) => id === period.id)) {
        unconfirmedPeriods.push(period)
      }
    })

    return unconfirmedPeriods.map((period) => new UnconfirmedPeriodNotification(
      period,
      template
    ))
  }

  /**
   * Get forecast notifications
   * 
   * @param {string} template Notification template
   * @param {string} locale Locale
   */
  private async _forecast(template: string, locale: string) {
    if (!get(this.context, 'subscription.settings.forecast.enabled', { default: false })) return []
    const periods = []
    const unforecastedPeriods = []
    let currentDate = new DateObject().add('1w')

    for (
      let i = 0;
      i < get(this.context, 'subscription.settings.forecast.notifications', { default: 2 });
      i++
    ) {
      const startOfWeek = currentDate.startOfWeek.format('YYYY-MM-DD')
      const endOfWeek = currentDate.endOfWeek.format('YYYY-MM-DD')
      periods.push(...this._timesheet.getPeriods(startOfWeek, endOfWeek, locale))
      currentDate = currentDate.add('1w')
    }

    const forecastedPeriods = await this._forecasted_periods.find({
      userId: this.context.userId
    }).toArray()

    periods.forEach((period) => {
      if (!find(forecastedPeriods, ({ id }) => id === period.id))
        unforecastedPeriods.push(period)
    })

    return unforecastedPeriods.map((period) => new ForecastNotification(
      period,
      template
    ))
  }

  public async getNotifications(templates: NotificationTemplates, locale: string) {
    const notifications = await Promise.all([
      this._unconfirmedPeriods(templates.unconfirmedPeriods, locale),
      this._forecast(templates.forecast, locale),
    ])
    // eslint-disable-next-line prefer-spread
    return [].concat.apply([], notifications)
  }
}
