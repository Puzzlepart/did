/* eslint-disable @typescript-eslint/no-inferrable-types */
import { dateAdd, IPnPClientStore, ITypedHash, PnPClientStorage } from '@pnp/common'
import { TFunction } from 'i18next'
import { EventInput, EventObject, Project, TimesheetPeriodInput, TimesheetPeriodObject } from 'types'
import { filter, omit } from 'underscore'
import { isBlank } from 'underscore.string'
import { ITimesheetParams } from './types'

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
  private _period?: TimesheetPeriodObject
  public id: string
  public week: number
  public isConfirmed?: boolean
  public isForecasted: boolean
  public isForecast: boolean
  public forecastedHours: number
  private _uiIgnoredEvents: string[] = []
  private _uiMatchedEvents: ITypedHash<any> = {}
  private _month?: string
  private _localStorage: IPnPClientStore = new PnPClientStorage().local
  private _uiMatchedEventsStorageKey: string
  private _uiIgnoredEventsStorageKey: string

  /**
   * Default expire for storage
   */
  private _storageDefaultExpire: Date

  setup(period?: TimesheetPeriodObject) {
    Object.assign(this, period)
    this._uiMatchedEventsStorageKey = `did365_ui_matched_events_${this.id}`
    this._uiIgnoredEventsStorageKey = `did365_ui_ignored_events_${this.id}`
    this._uiMatchedEvents = this._localStorage.get(this._uiMatchedEventsStorageKey) || {}
    this._storageDefaultExpire = dateAdd(new Date(), 'month', 2)
    // eslint-disable-next-line no-console
    console.log(this)
    return this
  }

  fromParams(params: ITimesheetParams): TimesheetPeriod {
    this.id = params.week ? [params.week, params.month, params.year].filter((p) => p).join('_') : '19_5_2020'
    return this
  }

  /**
   * Get name of period
   *
   * @param {boolean} includeMonth Include month
   * @param {TFunction} t Translate function
   */
  public getName(includeMonth: boolean, t: TFunction) {
    let name = `${t('common.weekLabel')} ${this.week}`
    if (includeMonth) name += ` (${this._month})`
    return name
  }

  /**
   * Check manual match
   *
   * @param {EventObject} event Event
   */
  private _checkManualMatch(event: EventObject) {
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
  public getEvents(): EventObject[] {
    if (this._period) {
      return [...this._period.events]
        .filter((event) => !event.isSystemIgnored && this._uiIgnoredEvents.indexOf(event.id) === -1)
        .map((event) => this._checkManualMatch(event))
    }
    return []
  }

  /**
   * Get ignored events
   */
  public get ignoredEvents(): string[] {
    return this._uiIgnoredEvents
  }

  /*
   * Get aggregated errors from the events in the period
   */
  public get errors(): any[] {
    if (!this.getEvents) return []
    return filter(this.getEvents(), (event) => !!event.error).map((event) => event.error)
  }

  /**
   * Get total duration of events in the period
   */
  public get totalDuration(): number {
    return this.getEvents().reduce((sum, event) => (sum += event.duration), 0)
  }

  /*
   * Get matched duration for the events in the period
   */
  public get matchedDuration(): number {
    return filter(this.getEvents(), (event) => !!event.project).reduce((sum, event) => sum + event.duration, 0)
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
   * @param {Project} project Project
   */
  public setManualMatch(eventId: string, project: Project) {
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
  private get matchedEvents(): EventInput[] {
    const events = filter([...this.getEvents()], (event) => !!event.project).map(
      (event) =>
        ({
          id: event.id,
          projectId: event.project.id,
          manualMatch: event.manualMatch
        } as EventInput)
    )
    return events
  }

  /**
   * Get data for the period
   *
   * @returns {TimesheetPeriodInput} Data for the period
   */
  public get data(): TimesheetPeriodInput {
    // TODO: Rewrite
    return null
    // if (!this.isLoaded) return null
    // return {
    //   id: this.id,
    //   startDateTime: this._startDateTime.toISOString(),
    //   endDateTime: this._endDateTime.toISOString(),
    //   matchedEvents: this.matchedEvents,
    //   forecastedHours: this.forecastedHours
    // }
  }

  /**
   * Get weekdays in the specified format
   *
   * @param {string} dayFormat Day format
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public weekdays(dayFormat: string = 'dddd DD'): string[] {
    return null
    // if (!this._startDateTime) return []
    // return dateUtils.getDays(this._startDateTime, this._endDateTime, dayFormat)
  }

  /**
   * Returns URL path for the period
   */
  public get path(): string {
    return this.id
      .split('_')
      .filter((p) => p)
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
    // TODO: Use date util
    return false
    // return this._endDateTime && this._endDateTime.isBefore()
  }
}
