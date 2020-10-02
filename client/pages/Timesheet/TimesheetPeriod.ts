/* eslint-disable prefer-const */
import { dateAdd, IPnPClientStore, ITypedHash, PnPClientStorage } from '@pnp/common'
import { TFunction } from 'i18next'
import { IProject } from 'types/IProject'
import { ITimeEntry } from 'types/ITimeEntry'
import { omit, filter } from 'underscore'
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
}

export interface ITimesheetPeriodMatchedEvent {
  id: string
  projectId: string
  manualMatch: boolean
}

export interface ITimesheetPeriodData {
  id: string
  startDateTime: string
  endDateTime: string
  matchedEvents: ITimesheetPeriodMatchedEvent[]
  isForecast: boolean
}

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
   * Is the period in the future
   */
  public isForecast: boolean

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
   * Creates a new instance of TimesheetPeriod
   *
   * @param {ITimesheetPeriod} _period Period
   * @param {ITimesheetPeriod} params Params
   */
  constructor(private _period?: ITimesheetPeriod, params?: ITimesheetParams) {
    if (params) this.id = [params.week, params.month, params.year].join('_')
    if (!_period) return
    this.id = _period.id
    this._month = capitalize(_period.month)
    this._startDateTime = moment(_period.startDateTime)
    this._endDateTime = moment(_period.endDateTime)
    this.isConfirmed = _period.isConfirmed
    this.isForecasted = _period.isForecasted
    this.isForecast = _period.isForecast
    this._uiMatchedEventsStorageKey = `did365_ui_matched_events_${this.id}`
    this._uiIgnoredEventsStorageKey = `did365_ui_ignored_events_${this.id}`
    this._uiIgnoredEvents = this._localStorage.get(this._uiIgnoredEventsStorageKey) || []
    this._uiMatchedEvents = this._localStorage.get(this._uiMatchedEventsStorageKey) || {}
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
    let manualMatch = this._uiMatchedEvents[event.id]
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
   */
  public get ignoredEvents() {
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
    return filter(this.events, event => !!event.project).reduce((sum, event) => (sum += event.duration), 0)
  }

  /*
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
    let matches = this._uiMatchedEvents
    matches[eventId] = project
    this._localStorage.put(this._uiMatchedEventsStorageKey, matches, dateAdd(new Date(), 'month', 1))
  }

  /**
   * Clear manual match from local storage
   *
   * @param {string} eventId Event id
   */
  public clearManualMatch(eventId: string) {
    this._uiMatchedEvents = omit(this._uiMatchedEvents, eventId)
    this._localStorage.put(this._uiMatchedEventsStorageKey, this._uiMatchedEvents, dateAdd(new Date(), 'month', 1))
  }

  /**
   * Store ignored event in browser storage
   *
   * @param {string} eventId Event id
   */
  public ignoreEvent(eventId: string) {
    this._uiIgnoredEvents = [...this._uiIgnoredEvents, eventId]
    this._localStorage.put(this._uiIgnoredEventsStorageKey, this._uiIgnoredEvents, dateAdd(new Date(), 'month', 1))
  }

  /**
   * Clear ignored events from browser storage
   */
  public clearIgnoredEvents() {
    this._uiIgnoredEvents = []
    this._localStorage.put(this._uiIgnoredEventsStorageKey, this._uiIgnoredEvents, dateAdd(new Date(), 'month', 1))
  }

  /**
   * Get matched events with properties id, projectId and manualMatch
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
   * Returns the id, startDateTime, endDateTime, matchedEvents and forecast
   */
  public get data(): ITimesheetPeriodData {
    return {
      id: this.id,
      startDateTime: this._startDateTime.toISOString(),
      endDateTime: this._endDateTime.toISOString(),
      matchedEvents: this.matchedEvents,
      isForecast: this.isForecast,
    }
  }

  /**
   * Get weekdays in the specified format
   * 
   * @param {string} dayFormat Day format
   */
  public weekdays(dayFormat = 'dddd DD'): string[] {
    if (!this._startDateTime) return []
    return dateUtils.getDays(this._startDateTime, this._endDateTime, dayFormat)
  }

  /**
   * Returns path for period
   */
  public get path() {
    return this.id
      .split('_')
      .filter(p => p)
      .join('/')
  }

  /**
   * Period is locked when it's either confirmed or forecasted
   */
  public get isLocked() {
    return this.isConfirmed || this.isForecasted
  }
}
