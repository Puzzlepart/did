import get from 'get-value'
import { Collection } from 'mongodb'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { any, first } from 'underscore'
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
   * @param context - Injected context through typedi
   * @param _timesheet - Timesheet service
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _timesheet: TimesheetService
  ) {
    this._confirmed_periods = this.context.db.collection('confirmed_periods')
    this._forecasted_periods = this.context.db.collection('forecasted_periods')
  }

  /**
   * Get periods
   *
   * @param add - Add
   * @param count - Count
   * @param locale - User locale
   */
  private _getPeriods(add: string, count: number, locale: string) {
    const periods = []
    let d = new DateObject().add(add)
    for (let i = 0; i <= count; i++) {
      const startOfWeek = d.startOfWeek.format('YYYY-MM-DD')
      const endOfWeek = d.endOfWeek.format('YYYY-MM-DD')
      periods.push(
        ...this._timesheet.getPeriods(startOfWeek, endOfWeek, locale, this.context.userId)
      )
      d = d.add(add)
    }
    return periods
  }

  /**
   * Get unconfirmed periods notifications
   *
   * @param template - Notification template
   * @param locale - Locale
   */
  private async _unconfirmedPeriods(template: string, locale: string) {
    const periods = this._getPeriods('-1w', 5, locale)

    const confirmedPeriods = await this._confirmed_periods
      .find({
        _userId: this.context.userId
      })
      .toArray()

    const nperiods: any[] = periods.reduce(($, period) => {
      const isConfirmed = any(confirmedPeriods, ({ _id }) => _id === period._id)
      if (!isConfirmed) $.push(period)
      return $
    }, [])

    return nperiods.map(
      (period) => new UnconfirmedPeriodNotification(period, template)
    )
  }

  /**
   * Get forecast notifications
   *
   * @param template - Notification template
   * @param locale - Locale
   */
  private async _forecast(template: string, locale: string) {
    if (
      !get(this.context, 'subscription.settings.forecast.enabled', {
        default: false
      })
    )
      return []
    const periods = this._getPeriods(
      '1w',
      get(this.context, 'subscription.settings.forecast.notifications', {
        default: 2
      }) - 1,
      locale,
    )

    const forecastedPeriods = await this._forecasted_periods
      .find({
        _userId: this.context.userId
      })
      .toArray()

    const nperiods: any[] = periods.reduce(($, period) => {
      const isForecasted = any(forecastedPeriods, ({ _id }) => _id === period._id)
      if (!isForecasted) $.push(period)
      return $
    }, [])

    return nperiods.map((period) => new ForecastNotification(period, template))
  }

  /**
   * Get notifications
   * 
   * @param templates - Templats
   * @param locale - User locale
   */
  public async getNotifications(
    templates: NotificationTemplates,
    locale: string
  ) {
    const notifications = await Promise.all([
      this._unconfirmedPeriods(templates.unconfirmedPeriods, locale),
      this._forecast(templates.forecast, locale)
    ])
    // eslint-disable-next-line prefer-spread
    return [].concat.apply([], notifications)
  }
}
