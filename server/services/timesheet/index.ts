import { Collection } from 'mongodb'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { find, isEmpty } from 'underscore'
import { MSGraphService } from '..'
import { DateObject, default as DateUtils } from '../../../shared/utils/date'
import { Context } from '../../graphql/context'
import { TimesheetPeriodObject } from '../../graphql/resolvers/timesheet/types'
import { MongoService } from '../mongo'
import MatchingEngine from './matching'
import {
  IConnectEventsParams,
  IGetTimesheetParams,
  ISubmitPeriodParams,
  IUnsubmitPeriodParams
} from './types'

@Service({ global: false })
export class TimesheetService {
  private _confirmed_periods: Collection
  private _forecasted_periods: Collection
  private _time_entries: Collection
  private _forecasted_time_entries: Collection
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
    const db = this.context.client.db('test')
    this._confirmed_periods = db.collection('confirmed_periods')
    this._forecasted_periods = db.collection('forecasted_periods')
    this._time_entries = db.collection('time_entries')
    this._forecasted_time_entries = db.collection('forecasted_time_entries')
  }

  /**
   * Get periods between startDate and endDate
   *
   * @param {string} startDate Start date
   * @param {string} endDate End date
   * @param {string} locale Locale
   */
  public getPeriods(startDate: string, endDate: string, locale: string): TimesheetPeriodObject[] {
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
      const periods = this.getPeriods(params.startDate, params.endDate, params.locale)
      const data = await this._mongo.project.getProjectsData()
      for (let i = 0; i < periods.length; i++) {
        const [confirmed, forecasted] = await Promise.all([
          this._confirmed_periods.findOne({
            id: periods[i].id,
            userId: this.context.userId
          }),
          this._forecasted_periods.findOne({
            id: periods[i].id,
            userId: this.context.userId
          })
        ])
        periods[i].isForecasted = !!forecasted
        periods[i].forecastedHours = forecasted?.hours || 0
        if (confirmed) {
          const entries = await this._time_entries
            .find({
              periodId: periods[i].id,
              userId: this.context.userId
            })
            .toArray()
          periods[i] = {
            ...periods[i],
            isConfirmed: true,
            events: this._connectEvents({
              ...params,
              events: entries,
              projects: data.projects
            })
          }
        } else {
          const engine = new MatchingEngine(data)
          const events = await this._msgraph.getEvents(periods[i].startDate, periods[i].endDate, {
            tzOffset: params.tzOffset,
            returnIsoDates: false
          })
          periods[i] = {
            ...periods[i],
            events: engine.matchEvents(events).map((e) => ({
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
      project: find(
        projects,
        ({ customerKey, key }) => [customerKey, key].join(' ') === event.projectId
      ),
      date: DateUtils.formatDate(event.startDateTime, dateFormat, locale)
    }))
  }

  /**
   * Submit period
   *
   * @param {ISubmitPeriodParams} params Submit period params
   */
  public async submitPeriod({ period, tzOffset, forecast }: ISubmitPeriodParams): Promise<void> {
    try {
      const { matchedEvents } = period
      const events = await this._msgraph.getEvents(period.startDate, period.endDate, {
        tzOffset,
        returnIsoDates: false
      })
      const [week, month, year] = period.id.split('_').map((p) => parseInt(p, 10))
      const _period: any = {
        id: period.id,
        startDate: new Date(period.startDate),
        endDate: new Date(period.endDate),
        userId: this.context.userId,
        week,
        month,
        year,
        hours: 0
      }
      if (!forecast) _period.forecastedHours = period.forecastedHours || 0
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
      const entry_colletion = forecast ? this._forecasted_time_entries : this._time_entries
      const period_collection = forecast ? this._forecasted_periods : this._confirmed_periods
      if (!isEmpty(entries)) await entry_colletion.insertMany(entries)
      await period_collection.insertOne(_period)
    } catch (error) {
      throw error
    }
  }

  /**
   * Unsubmit period
   *
   * @param {IUnsubmitPeriodParams} params Unsubmit period params
   */
  public async unsubmitPeriod({ period, forecast }: IUnsubmitPeriodParams): Promise<void> {
    const entry_colletion = forecast ? this._forecasted_time_entries : this._time_entries
    const period_collection = forecast ? this._forecasted_periods : this._confirmed_periods
    await Promise.all([
      entry_colletion.deleteMany({
        periodId: period.id,
        userId: this.context.userId
      }),
      period_collection.deleteOne({
        id: period.id,
        userId: this.context.userId
      })
    ])
  }
}
