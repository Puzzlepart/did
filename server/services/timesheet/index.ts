
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { find, isEmpty, omit } from 'underscore'
import { MSGraphService } from '..'
import DateUtils, { DateObject } from '../../../shared/utils/date'
import { Context } from '../../graphql/context'
import { TimesheetPeriodObject } from '../../graphql/resolvers/types'
import { firstPart } from '../../utils'
import {
  ConfirmedPeriodsService,
  ForecastedPeriodsService,
  ForecastedTimeEntryService,
  ProjectService,
  TimeEntryService
} from '../mongo'
import MatchingEngine from './matching'
import {
  IConnectEventsParameters,
  IGetTimesheetParameters,
  ISubmitPeriodParameters,
  IUnsubmitPeriodParameters
} from './types'

@Service({ global: false })
export class TimesheetService {
  /**
   * Constructor
   *
   * @param context - Injected context through typedi
   * @param _msgraphSvc - Injected `MSGraphService` through typedi
   * @param _projectSvc - Injected `ProjectService` through typedi
   * @param _teSvc - Injected `TimeEntryService` through typedi
   * @param _fteSvc - Injected `ForecastedTimeEntryService` through typedi
   * @param _cperiodSvc - Injected `ConfirmedPeriodsService` through typedi
   * @param _fperiodSvc - Injected `ForecastedPeriodsService` through typedi
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _msgraphSvc: MSGraphService,
    private readonly _projectSvc: ProjectService,
    private readonly _teSvc: TimeEntryService,
    private readonly _fteSvc: ForecastedTimeEntryService,
    private readonly _cperiodSvc: ConfirmedPeriodsService,
    private readonly _fperiodSvc: ForecastedPeriodsService
  ) {}

  /**
   * Get timesheet
   *
   * @param params - Timesheet params
   */
  public async getTimesheet(
    parameters: IGetTimesheetParameters
  ): Promise<any[]> {
    try {
      const periods = this.getPeriods(
        parameters.startDate,
        parameters.endDate,
        parameters.locale,
        this.context.userId
      )
      const data = await this._projectSvc.getProjectsData()
      for (let index = 0; index < periods.length; index++) {
        const { _id } = periods[index]
        const [confirmed, forecasted] = await Promise.all([
          this._cperiodSvc.collection.findOne({ _id }),
          this._fperiodSvc.collection.findOne({ _id })
        ])
        periods[index].isForecasted = !!forecasted
        periods[index].forecastedHours = forecasted?.hours || 0
        if (confirmed) {
          const entries = await this._teSvc.find({ periodId: _id })
          periods[index] = {
            ...periods[index],
            isConfirmed: true,
            events: this._connectEvents({
              ...parameters,
              ...data,
              events: entries
            })
          }
        } else {
          const engine = new MatchingEngine(data)
          const events = await this._msgraphSvc.getEvents(
            periods[index].startDate,
            periods[index].endDate,
            {
              tzOffset: parameters.tzOffset,
              returnIsoDates: false
            }
          )
          periods[index].events = engine.matchEvents(events).map((event_) => ({
            ...event_,
            date: DateUtils.formatDate(
              event_.startDateTime,
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
   * @param parameters - Submit period params
   */
  public async submitPeriod(
    parameters: ISubmitPeriodParameters
  ): Promise<void> {
    try {
      const events = await this._msgraphSvc.getEvents(
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
        hours: 0,
        forecastedHours: parameters.period.forecastedHours || 0
      }
      const entries = []
      // eslint-disable-next-line unicorn/no-array-reduce
      period.hours = parameters.period.matchedEvents.reduce((hours, m: any) => {
        const event = find(events, ({ id }) => id === m.id)
        if (!event) return null
        entries.push({
          ...m,
          ...event,
          _id: this._createUniqueEventId(event.id, event.startDateTime as Date),
          ...omit(period, '_id'),
          periodId: period._id
        })
        return hours + event.duration
      }, 0)
      const teSvc = parameters.forecast ? this._fteSvc : this._teSvc
      const periodSvc = parameters.forecast
        ? this._fperiodSvc
        : this._cperiodSvc
      await Promise.all([
        !isEmpty(entries)
          ? teSvc.insertMultiple(entries)
          : Promise.resolve(null),
        periodSvc.insert(period)
      ])
    } catch (error) {
      throw error
    }
  }

  /**
   * Unsubmit period
   *
   * @param parameters - Unsubmit period params
   */
  public async unsubmitPeriod(
    parameters: IUnsubmitPeriodParameters
  ): Promise<void> {
    try {
      const teSvc = parameters.forecast ? this._fteSvc : this._teSvc
      const periodSvc = parameters.forecast
        ? this._fperiodSvc
        : this._cperiodSvc
      const { _id } = this._getPeriodData(
        parameters.period.id,
        this.context.userId
      )
      await Promise.all([
        teSvc.collection.deleteMany({ periodId: _id }),
        periodSvc.collection.deleteOne({ _id })
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
   * * Returns week, month, year and userId
   *
   * @param id - Id
   * @param userId - User ID
   */
  private _getPeriodData(id: string, userId: string) {
    const [week, month, year] = id.split('_').map((p) => Number.parseInt(p, 10))
    return {
      _id: `${id}${userId}`.replace(/[^\dA-Za-z]/g, ''),
      userId,
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
   * @param userId - User ID
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
   * Connect events to projects and customers
   *
   * @see https://docs.mongodb.com/manual/reference/database-references/
   *
   * @param params - Connect events parameters
   */
  private _connectEvents({
    events,
    projects,
    customers,
    dateFormat,
    locale
  }: IConnectEventsParameters) {
    return events.map((event) => ({
      id: event._id,
      ...event,
      project: find(projects, ({ _id }) => _id === event.projectId),
      customer: find(
        customers,
        ({ key }) => key === firstPart(event.projectId)
      ),
      date: DateUtils.formatDate(event.startDateTime, dateFormat, locale)
    }))
  }
}
