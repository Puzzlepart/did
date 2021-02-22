import { Db } from 'mongodb'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { find } from 'underscore'
import { MSGraphService } from '..'
import { DateObject, default as DateUtils } from '../../../shared/utils/date'
import { Context } from '../../graphql/context'
import { TimesheetPeriodObject } from '../../graphql/resolvers/timesheet/types'
import { MongoService } from '../mongo'
import MatchingEngine from './matching'
import { IConnectEventsParams, IGetTimesheetParams, ISubmitPeriodParams, IUnsubmitPeriodParams } from './types'

@Service({ global: false })
export class TimesheetService {
  private _db: Db
  /**
   * Constructor
   *
   * @param {Context} context Context
   * @param {MSGraphService} _msgraph MSGraphService
   * @param {MongoService} _mongo MongoService
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _msgraph: MSGraphService,
    private readonly _mongo: MongoService
  ) {
    this._db = this.context.client.db('test')
  }

  /**
   * Get periods between startDate and endDate
   *
   * @param {string} startDate Start date
   * @param {string} endDate End date
   * @param {string} locale Locale
   */
  private _getPeriods(startDate: string, endDate: string, locale: string): TimesheetPeriodObject[] {
    const isSplit = !DateUtils.isSameMonth(startDate, endDate)
    const periods: TimesheetPeriodObject[] = [
      new TimesheetPeriodObject(
        startDate,
        isSplit ? new DateObject(startDate).endOfMonth.format('YYYY-MM-DD') : endDate,
        locale
      )
    ]
    if (isSplit) {
      periods.push(
        new TimesheetPeriodObject(
          new DateObject(endDate).startOfMonth.format('YYYY-MM-DD'),
          endDate,
          locale
        )
      )
    }

    return periods
  }

  /**
   * Get timesheet
   *
   * @param {IGetTimesheetParams} params Timesheet params
   */
  public async getTimesheet(params: IGetTimesheetParams): Promise<any[]> {
    try {
      const periods = this._getPeriods(params.startDate, params.endDate, params.locale)
      const data = await this._mongo.project.getProjectsData()
      for (let i = 0; i < periods.length; i++) {
        const confirmed = await this._db
          .collection('confirmed_periods')
          .findOne({
            id: periods[i].id,
            userId: this.context.userId
          })
        if (confirmed) {
          const entries = await this._db
            .collection('time_entries')
            .find({
              periodId: periods[i].id,
              userId: this.context.userId
            })
            .toArray()
          periods[i] = {
            ...periods[i],
            isConfirmed: true,
            isForecasted: true,
            events: this._connectEvents({
              ...params,
              events: entries,
              projects: data.projects,
            })
          }
        } else {
          const engine = new MatchingEngine(data)
          const events = await this._msgraph.getEvents(params.startDate, params.endDate, {
            tzOffset: params.tzOffset,
            returnIsoDates: false
          })
          periods[i] = {
            ...periods[i],
            events: engine.matchEvents(events).map(e => ({
              ...e,
              date: DateUtils.formatDate(e.startDateTime, params.dateFormat, params.locale)
            }))
          }
        }
      }
      return periods
    } catch (error) {
      throw error
    }
  }

  /**
   * Connect events to project and labels
   *
   * @param {IConnectEventsParams} params Connect events params
   */
  private _connectEvents({ events, projects, dateFormat, locale }: IConnectEventsParams) {
    return events.map((event) => ({
      ...event,
      project: find(projects, (p) => p.tag === event.projectId),
      date: DateUtils.formatDate(event.startDateTime, dateFormat, locale)
    }))
  }

  /**
   * Submit period
   *
   * @param {ISubmitPeriodParams} params Submit period params
   */
  public async submitPeriod({ period, tzOffset }: ISubmitPeriodParams) {
    try {
      const { matchedEvents } = period
      const events = await this._msgraph.getEvents(
        period.startDate,
        period.endDate,
        {
          tzOffset,
          returnIsoDates: false
        })
      const [week, month, year] = period.id.split('_').map((p) => parseInt(p, 10))
      const _period = {
        id: period.id,
        startDate: new Date(period.startDate),
        endDate: new Date(period.endDate),
        userId: this.context.userId,
        week,
        month,
        year,
        forecastedHours: period.forecastedHours || 0,
        hours: 0
      }
      const entries = []
      _period.hours = matchedEvents.reduce((hours, m: any) => {
        const event = find(events, ({ id }) => id === m.id)
        if (!event) return null
        entries.push({
          ...m,
          ...event,
          periodId: _period.id,
          week,
          month,
          year,
          userId: this.context.userId
        })
        return hours + event.duration
      }, 0)
      await this._db.collection('time_entries').insertMany(entries)
      return await this._db.collection('confirmed_periods').insertOne(_period)
    } catch (error) {
      throw error
    }
  }

  /**
   * Unsubmit period
   *
   * @param {IUnsubmitPeriodParams} params Unsubmit period params
   */
  public async unsubmitPeriod({ period }: IUnsubmitPeriodParams) {
    return await Promise.all([
      this._db
        .collection('confirmed_periods')
        .deleteOne({
          id: period.id,
          userId: this.context.userId
        }),
      this._db
        .collection('time_entries')
        .deleteMany({
          periodId: period.id,
          userId: this.context.userId
        })
    ])
  }
}
