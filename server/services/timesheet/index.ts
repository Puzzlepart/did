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
  IConnectEventsParameters,
  IGetTimesheetParameters,
  ISubmitPeriodParameters,
  IUnsubmitPeriodParameters
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
   * @param context - Injected context through typedi
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
  public async getTimesheet(parameters: IGetTimesheetParameters): Promise<any[]> {
    try {
      const periods = this.getPeriods(
        parameters.startDate,
        parameters.endDate,
        parameters.locale,
        this.context.userId
      )
      const data = await this._mongo.project.getProjectsData()
      for (let index = 0; index < periods.length; index++) {
        const { _id } = periods[index]
        const [confirmed, forecasted] = await Promise.all([
          this._confirmed_periods.findOne({ _id }),
          this._forecasted_periods.findOne({ _id })
        ])
        periods[index].isForecasted = !!forecasted
        periods[index].forecastedHours = forecasted?.hours || 0
        if (confirmed) {
          const entries = await this._time_entries
            .find({ _periodId: _id })
            .toArray()
          periods[index] = {
            ...periods[index],
            isConfirmed: true,
            events: this._connectEvents({
              ...parameters,
              events: entries,
              projects: data.projects
            })
          }
        } else {
          const engine = new MatchingEngine(data)
          const events = await this._msgraph.getEvents(
            periods[index].startDate,
            periods[index].endDate,
            {
              tzOffset: parameters.tzOffset,
              returnIsoDates: false
            }
          )
          periods[index].events = engine.matchEvents(events).map((e) => ({
            ...e,
            date: DateUtils.formatDate(
              e.startDateTime,
              parameters.dateFormat,
              parameters.locale
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
  public async submitPeriod(parameters: ISubmitPeriodParameters): Promise<void> {
    try {
      const events = await this._msgraph.getEvents(
        parameters.period.startDate,
        parameters.period.endDate,
        {
          tzOffset: parameters.tzOffset,
          returnIsoDates: false
        }
      )
      const period = {
        ...this._getPeriodData(parameters.period.id, this.context.userId),
        startDate: new Date(parameters.period.startDate),
        endDate: new Date(parameters.period.endDate),
        submitted: new Date(),
        hours: 0,
        forecastedHours: parameters.period.forecastedHours || 0
      }
      const entries = []
      period.hours = parameters.period.matchedEvents.reduce((hours, m: any) => {
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
      const entry_colletion = parameters.forecast
        ? this._forecasted_time_entries
        : this._time_entries
      const period_collection = parameters.forecast
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
   * @param period - Unsubmit period params
   */
  public async unsubmitPeriod({
    period,
    forecast
  }: IUnsubmitPeriodParameters): Promise<void> {
    try {
      const entry_colletion = forecast
        ? this._forecasted_time_entries
        : this._time_entries
      const period_collection = forecast
        ? this._forecasted_periods
        : this._confirmed_periods
      const { _id } = this._getPeriodData(period.id, this.context.userId)
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
    return `${eventId}${startDateTime.getTime()}`.replace(/[^\dA-Za-z]/g, '')
  }

  /**
   * Get period data from id
   *
   * * Generates an _id for Mongo DB
   * * Returns week, month, year and _userId
   *
   * @param id - Id
   * @param userId - User ID
   */
  private _getPeriodData(id: string, userId: string) {
    const [week, month, year] = id.split('_').map((p) => Number.parseInt(p, 10))
    return {
      _id: `${id}${userId}`.replace(/[^\dA-Za-z]/g, ''),
      _userId: userId,
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
   * @param _userId - User ID
   */
  public getPeriods(
    startDate: string,
    endDate: string,
    locale: string,
    userId: string
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

    return periods.map((period) => {
      return { ...this._getPeriodData(period.id, userId), ...period }
    })
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
  }: IConnectEventsParameters) {
    return events.map((event) => ({
      id: event._id,
      ...event,
      project: find(projects, ({ _id }) => _id === event.projectId),
      date: DateUtils.formatDate(event.startDateTime, dateFormat, locale)
    }))
  }
}
