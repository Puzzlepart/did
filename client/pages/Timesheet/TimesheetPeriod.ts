/* eslint-disable @typescript-eslint/no-inferrable-types */
import { dateAdd, IPnPClientStore, ITypedHash, PnPClientStorage } from '@pnp/common'
import { TFunction } from 'i18next'
import { IProject } from 'types/IProject'
import { ITimeEntry } from 'types/ITimeEntry'
import { omit, filter } from 'underscore'
import { isBlank } from 'underscore.string'
import { capitalize } from 'underscore.string'
import dateUtils, { moment } from 'utils/date'
import { ITimesheetParams } from './types'

export interface ITimesheetPeriod {
  /**
   * Identifier for the period week_month_year
   */
  id: string

  /**
   * Week number
   */
  week: number

  /**
   * Month string
   */
  month: string

  /**
   * Start date time ISO string
   */
  startDateTime: string

  /**
   * End date time ISO string
   */
  endDateTime: string

  /**
   * Period confirmed
   */
  isConfirmed: boolean

  /**
   * Events
   */
  events: ITimeEntry[]

  /**
   * Is there an active forecast for the period
   */
  isForecasted: boolean

  /**
   * Is the period in the future
   */
  isForecast: boolean

  /**
   * Forecasted duration
   */
  forecastedDuration: number
}

export interface ITimesheetPeriodMatchedEvent {
  id: string
  projectId: string
  manualMatch: boolean
}

/**
 * Timesheet period data used when submitting/unsubmitting the period
 */
export interface ITimesheetPeriodData {
  /**
   * Identifier for the period week_month_year
   */
  id: string

  /**
   * Start date time ISO string
   */
  startDateTime: string

  /**
   * End date time ISO string
   */
  endDateTime: string

  /**
   * Matched events
   *
   * * {string} id
   * * {string} projectId
   * * {boolean} manualMatch
   */
  matchedEvents: ITimesheetPeriodMatchedEvent[]

  /**
   * Forecasted duration
   */
  forecastedDuration: number
}

/**
 * Timesheet period. Divided by week, month and year.
 * 
 * E.g. a week which spans both February and March will generate two periods:
 * 
 * * w_2_y
 * * w_3_y
 * 
 * Where x is the week number and y is the year 
 */
export class TimesheetPeriod {
  /**
   * Identifier for the period week_month_year
   */
  public id: string

  /**
   * Period confirmed
   */
  public isConfirmed?: boolean

  /**
   * Is there an active forecast for the period
   */
  public isForecasted: boolean

  /**
   * Is the period in the future and available for forecasting
   */
  public isForecast: boolean

  /**
   * Forecasted duration
   */
  public forecastedDuration: number

  /**
   * Events ignored in UI
   */
  private _uiIgnoredEvents: string[] = []

  /**
   * Events matched in UI
   */
  private _uiMatchedEvents: ITypedHash<any> = {}

  /**
   * Month string
   */
  private _month?: string

  /**
   * Start date time moment object
   */
  private _startDateTime?: moment.Moment

  /**
   * End date time moment object
   */
  private _endDateTime?: moment.Moment

  /**
   * Local storage
   */
  private _localStorage: IPnPClientStore = new PnPClientStorage().local

  /**
   * Storage key for events matched in UI
   */
  private _uiMatchedEventsStorageKey: string

  /**
   * Storage key for events ignored in UI
   */
  private _uiIgnoredEventsStorageKey: string

  /**
   * Default expire for storage
   */
  private _storageDefaultExpire: Date

  /**
   * Creates a new instance of TimesheetPeriod
   *
   * @param {ITimesheetPeriod} _period Period
   * @param {ITimesheetPeriod} params Params
   */
  constructor(private _period?: ITimesheetPeriod, params?: ITimesheetParams) {
    if (params) this.id = [params.week, params.month, params.year].filter(p => p).join('_')
    if (!_period) return
    this.id = _period.id
    this._month = capitalize(_period.month)
    this._startDateTime = moment(_period.startDateTime)
    this._endDateTime = moment(_period.endDateTime)
    this.isConfirmed = _period.isConfirmed
    this.isForecasted = _period.isForecasted
    this.isForecast = _period.isForecast
    this.forecastedDuration = _period.forecastedDuration
    this._uiMatchedEventsStorageKey = `did365_ui_matched_events_${this.id}`
    this._uiIgnoredEventsStorageKey = `did365_ui_ignored_events_${this.id}`
    this._uiIgnoredEvents = this._localStorage.get(this._uiIgnoredEventsStorageKey) || []
    this._uiMatchedEvents = this._localStorage.get(this._uiMatchedEventsStorageKey) || {}
    this._storageDefaultExpire = dateAdd(new Date(), 'month', 2)
  }

  /**
   * Get name of period
   *
   * @param {boolean} includeMonth Include month
   * @param {TFunction} t Translate function
   */
  public getName(includeMonth: boolean, t: TFunction) {
    let name = `${t('common.weekLabel')} ${this._period.week}`
    if (includeMonth) name += ` (${this._month})`
    return name
  }

  /**
   * Check manual match
   *
   * @param {ITimeEntry} event Event
   */
  private _checkManualMatch(event: ITimeEntry) {
    const manualMatch = this._uiMatchedEvents[event.id]
    if (event.manualMatch && !manualMatch) {
      event.manualMatch = false
      event.project = event.customer = null
    }
    if (!!manualMatch) {
      event.manualMatch = true
      event.project = manualMatch
      event.customer = manualMatch.customer
    }
    return event
  }

  /**
   * Get events
   */
  public get events(): ITimeEntry[] {
    if (this._period) {
      return [...this._period.events]
        .filter(event => !event.isSystemIgnored && this._uiIgnoredEvents.indexOf(event.id) === -1)
        .map(event => this._checkManualMatch(event))
    }
    return []
  }

  /**
   * Get ignored events
   *
   * @returns An array of event ids
   */
  public get ignoredEvents(): string[] {
    return this._uiIgnoredEvents
  }

  /*
   * Get aggregated errors from the events in the period
   */
  public get errors(): any[] {
    if (!this.events) return []
    return filter(this.events, event => !!event.error).map(event => event.error)
  }

  /**
   * Get total duration of events in the period
   */
  public get totalDuration(): number {
    return this.events.reduce((sum, event) => (sum += event.duration), 0)
  }

  /*
   * Get matched duration for the events in the period
   */
  public get matchedDuration(): number {
    return filter(this.events, event => !!event.project).reduce((sum, event) => sum + event.duration, 0)
  }

  /**
   * Get unmatched duration for the events in the period
   */
  public get unmatchedDuration(): number {
    return this.totalDuration - this.matchedDuration
  }

  /**
   * Save manual match in browser storage
   *
   * @param {string} eventId Event id
   * @param {IProject} project Project
   */
  public setManualMatch(eventId: string, project: IProject) {
    const matches = this._uiMatchedEvents
    matches[eventId] = project
    this._localStorage.put(this._uiMatchedEventsStorageKey, matches, this._storageDefaultExpire)
  }

  /**
   * Clear manual match from local storage
   *
   * @param {string} eventId Event id
   */
  public clearManualMatch(eventId: string) {
    this._uiMatchedEvents = omit(this._uiMatchedEvents, eventId)
    this._localStorage.put(this._uiMatchedEventsStorageKey, this._uiMatchedEvents, this._storageDefaultExpire)
  }

  /**
   * Store ignored event in browser storage
   *
   * @param {string} eventId Event id
   */
  public ignoreEvent(eventId: string) {
    this._uiIgnoredEvents = [...this._uiIgnoredEvents, eventId]
    this._localStorage.put(this._uiIgnoredEventsStorageKey, this._uiIgnoredEvents, this._storageDefaultExpire)
  }

  /**
   * Clear ignored events from browser storage
   */
  public clearIgnoredEvents() {
    this._uiIgnoredEvents = []
    this._localStorage.put(this._uiIgnoredEventsStorageKey, this._uiIgnoredEvents, this._storageDefaultExpire)
  }

  /**
   * Get matched events with properties
   *
   * @returns
   * * {string} id
   * * {string} projectId
   * * {boolean} manualMatch
   */
  private get matchedEvents(): ITimesheetPeriodMatchedEvent[] {
    const events = filter([...this.events], event => !!event.project).map(
      event =>
        ({
          id: event.id,
          projectId: event.project.id,
          manualMatch: event.manualMatch,
        } as ITimesheetPeriodMatchedEvent)
    )
    return events
  }

  /**
   * Get data for the period
   *
   * @returns
   * * {string} id
   * * {string} startDateTime
   * * {string} endDateTime
   * * {ITimesheetPeriodMatchedEvent[]} matchedEvents
   * * {boolean} forecast
   * * {number} forecastedDuration
   */
  public get data(): ITimesheetPeriodData {
    if (!this.isLoaded) return null
    return {
      id: this.id,
      startDateTime: this._startDateTime.toISOString(),
      endDateTime: this._endDateTime.toISOString(),
      matchedEvents: this.matchedEvents,
      forecastedDuration: this.forecastedDuration,
    }
  }

  /**
   * Get weekdays in the specified format
   *
   * @param {string} dayFormat Day format
   */
  public weekdays(dayFormat: string = 'dddd DD'): string[] {
    if (!this._startDateTime) return []
    return dateUtils.getDays(this._startDateTime, this._endDateTime, dayFormat)
  }

  /**
   * Returns URL path for the period
   */
  public get path(): string {
    return this.id
      .split('_')
      .filter(p => p)
      .join('/')
  }

  /**
   * Period is complete meaning all events are matched
   *
   * @returns true if the unmatched duration (unmatchedDuration) is equal to zero (0)
   */
  public get isComplete(): boolean {
    return this.unmatchedDuration === 0
  }

  /**
   * Period is locked when it's either confirmed or forecasted
   *
   * @returns true if the period is either confirmed (isConfirmed) or forecasted (isForecasted)
   */
  public get isLocked() {
    return this.isConfirmed || this.isForecasted
  }

  /**
   * Period data is loaded
   *
   * @returns true if the period id is not blank
   */
  public get isLoaded() {
    return !isBlank(this.id)
  }

  /**
   * Period is in the past
   *
   * @returns true if the period end date time is before today
   */
  public get isPast(): boolean {
    return this._endDateTime && this._endDateTime.isBefore()
  }
}
