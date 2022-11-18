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
  HolidaysService,
  ProjectService,
  TimeEntryService,
  UserService
} from '../mongo'
import MatchingEngine from './matchingEngine'
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
   * @param _timeEntrySvc - Injected `TimeEntryService` through `typedi`
   * @param _forecastTimeEntrySvc - Injected `ForecastedTimeEntryService` through `typedi`
   * @param _confirmedPeriodSvc - Injected `ConfirmedPeriodsService` through `typedi`
   * @param _forecastPeriodSvc - Injected `ForecastedPeriodsService` through `typedi`
   * @param _userSvc - Injected `UserService` through `typedi`
   * @param _holidaysService - Injected `HolidaysService` through `typedi`
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    private readonly _msgraphSvc: MSGraphService,
    private readonly _googleCalSvc: GoogleCalendarService,
    private readonly _projectSvc: ProjectService,
    private readonly _timeEntrySvc: TimeEntryService,
    private readonly _forecastTimeEntrySvc: ForecastedTimeEntryService,
    private readonly _confirmedPeriodSvc: ConfirmedPeriodsService,
    private readonly _forecastPeriodSvc: ForecastedPeriodsService,
    private readonly _userSvc: UserService,
    private readonly _holidaysService: HolidaysService // eslint-disable-next-line unicorn/empty-brace-spaces
  ) { }

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
   * @param parameters - Timesheet parameters
   */
  public async getTimesheet(
    parameters: IGetTimesheetParameters
  ): Promise<any[]> {
    try {
      const periods = this.getPeriods(
        parameters.startDate,
        parameters.endDate,
        parameters.locale,
        this.context.userId,
        parameters.includeSplitWeeks
      )
      const holidays = await this._holidaysService.find({
        date: {
          $gte: new Date(parameters.startDate),
          $lt: new Date(parameters.endDate).setDate(new Date(parameters.endDate).getDate() + 1)
        }
      })
      // eslint-disable-next-line no-console
      console.log(holidays, new Date(parameters.endDate).setDate(new Date(parameters.endDate).getDate() + 1), periods[0])
      const data = await this._projectSvc.getProjectsData()
      for (let index = 0; index < periods.length; index++) {
        let period = periods[index]
        const [confirmed, forecasted] = await Promise.all([
          this._confirmedPeriodSvc.collection.findOne<TimesheetPeriodObject>({
            _id: period._id
          }),
          this._forecastPeriodSvc.collection.findOne<TimesheetPeriodObject>({
            _id: period._id
          })
        ])
        period.isForecasted = !!forecasted
        period.forecastedHours = forecasted?.hours ?? 0
        period.holidays = holidays
        if (confirmed) {
          period = {
            ...period,
            isConfirmed: true,
            events: this._connectEvents({
              ...parameters,
              ...data,
              events: confirmed.events
            })
          }
        } else {
          const engine = new MatchingEngine(data)
          period.events = await this._getEventsFromProvider({
            ...parameters,
            ...periods[index],
            provider: this.context.provider,
            engine
          })
        }
        periods[index] = period
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
      const teSvc = parameters.forecast
        ? this._forecastTimeEntrySvc
        : this._timeEntrySvc
      const periodSvc = parameters.forecast
        ? this._forecastPeriodSvc
        : this._confirmedPeriodSvc
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
      const teSvc = parameters.forecast
        ? this._forecastTimeEntrySvc
        : this._timeEntrySvc
      const periodSvc = parameters.forecast
        ? this._forecastPeriodSvc
        : this._confirmedPeriodSvc
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
    engine = null,
    configuration
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
      events = engine.matchEvents(events, configuration).map((event_) => ({
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
   * Get periods between `startDate` and `endDate`
   *
   * @param startDate - Start date
   * @param endDate - End date
   * @param locale - Locale
   * @param userId - User ID
   * @param includeSplitWeeks - Include split weeks (defaults to `true`)
   */
  public getPeriods(
    startDate: string,
    endDate: string,
    locale: string,
    userId: string,
    includeSplitWeeks = true
  ): TimesheetPeriodObject[] {
    const range = {
      startDate: new DateObject(startDate),
      endDate: new DateObject(startDate).endOfWeek
    }
    const periods: TimesheetPeriodObject[] = []
    while (range.startDate.isBeforeOrSame(new DateObject(endDate))) {
      const isSplit = !range.startDate.isSameMonth(range.endDate)
      periods.push(
        new TimesheetPeriodObject(
          range.startDate.format('YYYY-MM-DD'),
          isSplit
            ? range.startDate.endOfMonth.format('YYYY-MM-DD')
            : range.endDate.format('YYYY-MM-DD'),
          locale
        )
      )
      if (isSplit && includeSplitWeeks) {
        periods.push(
          new TimesheetPeriodObject(
            range.endDate.startOfMonth.format('YYYY-MM-DD'),
            range.endDate.format('YYYY-MM-DD'),
            locale
          )
        )
      }
      range.startDate = range.startDate.add('7d').startOfWeek
      range.endDate = range.startDate.endOfWeek
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
