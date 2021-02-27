import { Collection } from 'mongodb'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { find, isEmpty, omit } from 'underscore'
import { MSGraphService } from '..'
import DateUtils, { DateObject } from '../../../shared/utils/date'
import { Context } from '../../graphql/context'
import { TimesheetPeriodObject } from '../../graphql/resolvers/types'
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
   * @param context - Context
   * @param _msgraph - MSGraphService
   * @param _mongo - MongoService
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _msgraph: MSGraphService,
    private readonly _mongo: MongoService
  ) {
    const { db } = this.context
    this._confirmed_periods = db.collection('confirmed_periods')
    this._forecasted_periods = db.collection('forecasted_periods')
    this._time_entries = db.collection('time_entries')
    this._forecasted_time_entries = db.collection('forecasted_time_entries')
  }

  /**
   * Get timesheet
   *
   * @param params - Timesheet params
   */
  public async getTimesheet(params: IGetTimesheetParams): Promise<any[]> {
    try {
      const periods = this.getPeriods(
        params.startDate,
        params.endDate,
        params.locale
      )
      const data = await this._mongo.project.getProjectsData()
      for (let i = 0; i < periods.length; i++) {
        const { _id } = this._getPeriodData(periods[i].id)
        const [confirmed, forecasted] = await Promise.all([
          this._confirmed_periods.findOne({ _id }),
          this._forecasted_periods.findOne({ _id })
        ])
        periods[i].isForecasted = !!forecasted
        periods[i].forecastedHours = forecasted?.hours || 0
        if (confirmed) {
          const entries = await this._time_entries
            .find({ _periodId: _id })
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
          const events = await this._msgraph.getEvents(
            periods[i].startDate,
            periods[i].endDate,
            {
              tzOffset: params.tzOffset,
              returnIsoDates: false
            }
          )
          periods[i].events = engine.matchEvents(events).map((e) => ({
            ...e,
            date: DateUtils.formatDate(
              e.startDateTime,
              params.dateFormat,
              params.locale
            )
          }))
        }
      }
      return periods
    } catch (error) {
      throw error
    }
  }

  /**
   * Submit period
   *
   * @param params - Submit period params
   */
  public async submitPeriod(params: ISubmitPeriodParams): Promise<void> {
    try {
      const events = await this._msgraph.getEvents(
        params.period.startDate,
        params.period.endDate,
        {
          tzOffset: params.tzOffset,
          returnIsoDates: false
        }
      )
      const period = {
        ...this._getPeriodData(params.period.id),
        startDate: new Date(params.period.startDate),
        endDate: new Date(params.period.endDate),
        submitted: new Date(),
        hours: 0,
        forecastedHours: params.period.forecastedHours || 0
      }
      const entries = []
      period.hours = params.period.matchedEvents.reduce((hours, m: any) => {
        const event = find(events, ({ id }) => id === m.id)
        if (!event) return null
        entries.push({
          ...m,
          ...event,
          _id: this._createUniqueEventId(event.id, event.startDateTime as Date),
          ...omit(period, '_id'),
          _periodId: period._id
        })
        return hours + event.duration
      }, 0)
      const entry_colletion = params.forecast
        ? this._forecasted_time_entries
        : this._time_entries
      const period_collection = params.forecast
        ? this._forecasted_periods
        : this._confirmed_periods
      await Promise.all([
        !isEmpty(entries)
          ? entry_colletion.insertMany(entries)
          : Promise.resolve(null),
        period_collection.insertOne(period)
      ])
    } catch (error) {
      throw error
    }
  }

  /**
   * Unsubmit period
   *
   * @param params - Unsubmit period params
   */
  public async unsubmitPeriod({
    period,
    forecast
  }: IUnsubmitPeriodParams): Promise<void> {
    try {
      const entry_colletion = forecast
        ? this._forecasted_time_entries
        : this._time_entries
      const period_collection = forecast
        ? this._forecasted_periods
        : this._confirmed_periods
      const { _id } = this._getPeriodData(period.id)
      await Promise.all([
        entry_colletion.deleteMany({
          _periodId: _id
        }),
        period_collection.deleteOne({ _id })
      ])
    } catch (error) {
      throw error
    }
  }

  /**
   * Create unique ID consisting of event ID + event start date time
   *
   * @param eventId - Event ID
   * @param startDateTime - Start date time
   */
  private _createUniqueEventId(eventId: string, startDateTime: Date) {
    return `${eventId}${startDateTime.getTime()}`.replace(/[^a-zA-Z0-9]/g, '')
  }

  /**
   * Get period data from id
   *
   * * Generates an _id for Mongo DB
   * * Returns week, month, year and _userId
   *
   * @param id - Id
   */
  private _getPeriodData(id: string) {
    const [week, month, year] = id.split('_').map((p) => parseInt(p, 10))
    return {
      _id: `${id}${this.context.userId}`.replace(/[^a-zA-Z0-9]/g, ''),
      _userId: this.context.userId,
      week,
      month,
      year
    }
  }

  /**
   * Get periods between startDate and endDate
   *
   * @param startDate - Start date
   * @param endDate - End date
   * @param locale - Locale
   */
  public getPeriods(
    startDate: string,
    endDate: string,
    locale: string
  ): TimesheetPeriodObject[] {
    const isSplit = !DateUtils.isSameMonth(startDate, endDate)
    const periods: TimesheetPeriodObject[] = [
      new TimesheetPeriodObject(
        startDate,
        isSplit
          ? new DateObject(startDate).endOfMonth.format('YYYY-MM-DD')
          : endDate,
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
   * Connect events to projects
   *
   * @param params - Connect events params
   */
  private _connectEvents({
    events,
    projects,
    dateFormat,
    locale
  }: IConnectEventsParams) {
    return events.map((event) => ({
      id: event._id,
      ...event,
      project: find(projects, ({ _id }) => _id === event.projectId),
      date: DateUtils.formatDate(event.startDateTime, dateFormat, locale)
    }))
  }
}
