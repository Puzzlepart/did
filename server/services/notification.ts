import { Db } from 'mongodb'
import 'reflect-metadata'
import format from 'string-format'
import { Inject, Service } from 'typedi'
import { find } from 'underscore'
import { DateObject } from '../../shared/utils/date'
import { Context } from '../graphql/context'
import { NotificationTemplates } from '../graphql/resolvers/types'
import { TimesheetService } from './timesheet'

@Service({ global: false })
export class NotificationService {
  private _db: Db
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
    this._db = this.context.client.db('test')
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

    const confirmedPeriods = await this._db.collection('confirmed_periods').find({
      userId: this.context.userId
    }).toArray()

    periods.forEach((period) => {
      if (!find(confirmedPeriods, ({ id }) => id === period.id)) {
        unconfirmedPeriods.push(period)
      }
    })

    return unconfirmedPeriods.map((period) => ({
      id: `unconfirmed_period_${period.id}`,
      type: 0,
      severity: 2,
      text: format(template, period.week, period.month),
      moreLink: ['', 'timesheet/overview', ...period.id.split('_')].join('/')
    }))
  }

  /**
   * Get forecast notifications
   * 
   * @param {string} template Notification template
   * @param {string} locale Locale
   */
  private async _forecast(template: string, locale: string) {
    // eslint-disable-next-line no-console
    console.log({ template, locale })
    return await Promise.resolve([])
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
