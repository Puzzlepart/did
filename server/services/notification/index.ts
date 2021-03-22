/* eslint-disable tsdoc/syntax */
/* eslint-disable unicorn/no-array-reduce */

import get from 'get-value'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { any } from 'underscore'
import { ConfirmedPeriodsService, ForecastedPeriodsService } from '..'
import { DateObject } from '../../../shared/utils/date'
import { Context } from '../../graphql/context'
import { NotificationTemplates } from '../../graphql/resolvers/types'
import { TimesheetService } from '../timesheet'
import { ForecastNotification, UnconfirmedPeriodNotification } from './types'

/**
 * Notification service
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class NotificationService {
  /**
   * Constructor for `NotificationService`
   *
   * @param context - Injected context through `typedi`
   * @param _timesheetSvc - Injected `TimesheetService` through `typedi`
   * @param _cperiodSvc - Injected `ConfirmedPeriodsService` through `typedi`
   * @param _fperiodSvc - Injected `ForecastedPeriodsService` through `typedi`
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _timesheetSvc: TimesheetService,
    private readonly _cperiodSvc: ConfirmedPeriodsService,
    private readonly _fperiodSvc: ForecastedPeriodsService // eslint-disable-next-line unicorn/empty-brace-spaces
  ) {}

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
    for (let index = 0; index <= count; index++) {
      const startOfWeek = d.startOfWeek.format('YYYY-MM-DD')
      const endOfWeek = d.endOfWeek.format('YYYY-MM-DD')
      periods.push(
        ...this._timesheetSvc.getPeriods(
          startOfWeek,
          endOfWeek,
          locale,
          this.context.userId
        )
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

    const confirmedPeriods = await this._cperiodSvc.find({
      userId: this.context.userId
    })

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
      locale
    )

    const forecastedPeriods = await this._fperiodSvc.find({
      userId: this.context.userId
    })

    const nperiods: any[] = periods.reduce(($, period) => {
      const isForecasted = any(
        forecastedPeriods,
        ({ _id }) => _id === period._id
      )
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

export * from './types'
