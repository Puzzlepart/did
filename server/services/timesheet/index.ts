/* eslint-disable tsdoc/syntax */
import get from 'get-value'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { GoogleCalendarService, MSGraphService } from '..'
import DateUtils, { DateObject } from '../../../shared/utils/date'
import { firstPart } from '../../../shared/utils/firstPart'
import { Context } from '../../graphql/context'
import {
  SubscriptionVacationSettings,
  TimesheetPeriodObject,
  VacationSummary
} from '../../graphql/resolvers/types'
import { toFixed } from '../../utils'
import {
  ConfirmedPeriodsService,
  ForecastedPeriodsService,
  ForecastedTimeEntryService,
  ProjectService,
  TimeEntryService,
  UserService
} from '../mongo'
import MatchingEngine from './matching'
import {
  IConnectEventsParameters,
  IGetTimesheetParameters,
  IProviderEventsParameters,
  ISubmitPeriodParameters,
  ITimesheetPeriodData,
  IUnsubmitPeriodParameters
} from './types'
import { mapMatchedEvents } from './utils'

/**
 * Timesheet service
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class TimesheetService {
  /**
   * Constructor
   *
   * @param context - Injected context through `typedi`
   * @param _msgraphSvc - Injected `MSGraphService` through `typedi`
   * @param _googleCalSvc - Injected `GoogleCalendarService` through `typedi`
   * @param _projectSvc - Injected `ProjectService` through `typedi`
   * @param _teSvc - Injected `TimeEntryService` through `typedi`
   * @param _fteSvc - Injected `ForecastedTimeEntryService` through `typedi`
   * @param _cperiodSvc - Injected `ConfirmedPeriodsService` through `typedi`
   * @param _fperiodSvc - Injected `ForecastedPeriodsService` through `typedi`
   * @param _userSvc - Injected `UserService` through `typedi`
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _msgraphSvc: MSGraphService,
    private readonly _googleCalSvc: GoogleCalendarService,
    private readonly _projectSvc: ProjectService,
    private readonly _teSvc: TimeEntryService,
    private readonly _fteSvc: ForecastedTimeEntryService,
    private readonly _cperiodSvc: ConfirmedPeriodsService,
    private readonly _fperiodSvc: ForecastedPeriodsService,
    private readonly _userSvc: UserService // eslint-disable-next-line unicorn/empty-brace-spaces
  ) {}

  /**
   * Get timesheet
   *
   * Retrieves periods between `parameters.startDate`
   * and `parameters.endDate` using `getPeriods`. Then
   * retrieves project data using `getProjectsData` from
   * `ProjectService`.
   *
   * For each period we're checking both the confirmed periods
   * and forecasted periods section for a entry. If a match is
   * found for a confirmed period, this period with the events
   * are returned.
   *
   * If no confirmed period is found, events are fetched from
   * Microsoft Graph using `MSGraphService`
   *
   * @param parameters - Timesheet params
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
          periods[index] = {
            ...periods[index],
            isConfirmed: true,
            events: this._connectEvents({
              ...parameters,
              ...data,
              events: confirmed.events
            })
          }
        } else {
          const engine = new MatchingEngine(data)
          periods[index].events = await this._getEventsFromProvider({
            ...parameters,
            ...periods[index],
            provider: this.context.provider,
            engine
          })
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
   * Events for the period are fetched from
   * Microsoft Graph using `MSGraphService`. We
   * then generate the period data (`ITimesheetPeriodData`),
   * map the events to their corresponding projects based
   * on `projectId` from the client.
   *
   * We add the period to the correct collection based on
   * if it's a forecast or an actual confirm. We embed the
   * events in the period document, as well as adding them
   * separetely to their corresponding time entry collection.
   *
   * @param parameters - Submit period params
   */
  public async submitPeriod(
    parameters: ISubmitPeriodParameters
  ): Promise<void> {
    try {
      const events = await this._getEventsFromProvider({
        ...parameters.period,
        ...parameters,
        provider: this.context.provider
      })
      const period: ITimesheetPeriodData = {
        ...this._getPeriodData(parameters.period.id, this.context.userId),
        hours: 0,
        forecastedHours: parameters.period.forecastedHours || 0
      }
      const { getEvents, hours } = mapMatchedEvents(
        period,
        parameters.period.matchedEvents,
        events
      )
      period.hours = hours
      period.events = getEvents(false)
      const teSvc = parameters.forecast ? this._fteSvc : this._teSvc
      const periodSvc = parameters.forecast
        ? this._fperiodSvc
        : this._cperiodSvc
      await Promise.all([
        teSvc.insertMultiple(getEvents(true)),
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
   * Get events from provider
   *
   * - Provider `google` uses `_googleCalSvc` (`GoogleCalendarService`)
   * - Default provider uses `_msgraphSvc` (`MSGraphService`)
   *
   * @param params - Parameters
   *
   * @returns Events
   */
  private async _getEventsFromProvider({
    provider,
    startDate,
    endDate,
    tzOffset,
    dateFormat,
    locale,
    engine = null
  }: IProviderEventsParameters) {
    const startDateTimeIso = DateUtils.toISOString(
      `${startDate}:00:00:00.000`,
      tzOffset
    )
    const endDateTimeIso = DateUtils.toISOString(
      `${endDate}:23:59:59.999`,
      tzOffset
    )
    let events: any[]
    switch (provider) {
      case 'google':
        {
          events = await this._googleCalSvc.getEvents(
            startDateTimeIso,
            endDateTimeIso
          )
        }
        break
      default: {
        events = await this._msgraphSvc.getEvents(
          startDateTimeIso,
          endDateTimeIso
        )
      }
    }
    if (engine) {
      return engine.matchEvents(events).map((event_) => ({
        ...event_,
        date: DateUtils.formatDate(event_.startDateTime, dateFormat, locale)
      }))
    }
    return events
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
  private _getPeriodData(id: string, userId: string): ITimesheetPeriodData {
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
      project: _.find(projects, ({ _id }) => _id === event.projectId),
      customer: _.find(
        customers,
        ({ key }) => key === firstPart(event.projectId)
      ),
      date: DateUtils.formatDate(event.startDateTime, dateFormat, locale)
    }))
  }

  /**
   * Get vacation summary for the current user.
   *
   * @param settings - Subscription vacation settings
   */
  public async getVacation(
    settings: SubscriptionVacationSettings
  ): Promise<VacationSummary> {
    try {
      const userConfiguration = await this._userSvc.getUserConfiguration(
        this.context.userId
      )
      const totalDays = get(userConfiguration, 'vacation.totalDays', {
        default: settings.totalDays
      })
      const events = await this._msgraphSvc.getVacation(settings.eventCategory)
      const usedHours = events.reduce((sum, event) => sum + event.duration, 0)
      const used = usedHours / 8
      return {
        category: settings.eventCategory,
        total: totalDays,
        usedHours: toFixed(usedHours, 2),
        used: toFixed(used, 2),
        remaining: toFixed(totalDays - used, 2)
      }
    } catch (error) {
      throw error
    }
  }
}
