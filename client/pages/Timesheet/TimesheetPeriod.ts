/* eslint-disable @typescript-eslint/no-inferrable-types */
import { TFunction } from 'i18next'
import {
  EventInput,
  EventObject,
  Project,
  TimesheetPeriodInput,
  TimesheetPeriodObject
} from 'types'
import { filter, omit } from 'underscore'
import { BrowserStorage } from 'utils/browserStorage'
import DateUtils from 'DateUtils'

export class TimesheetPeriod {
  public id: string
  private readonly startDate: string
  private readonly endDate: string
  public readonly week: number
  public readonly isConfirmed?: boolean
  public readonly isForecasted: boolean
  public readonly isForecast: boolean
  public readonly forecastedHours: number
  private readonly month: string
  private events: EventObject[] = []
  private _uiIgnoredEvents: string[] = []
  private _uiMatchedEvents: Record<string, Project> = {}
  private _uiMatchedEventsStorage: BrowserStorage<Record<string, Project>>
  private _uiIgnoredEventsStorage: BrowserStorage<string[]>

  /**
   * Initializes a new period instance
   *
   * @param {TimesheetPeriodObject} period Period
   */
  initialize(period: TimesheetPeriodObject) {
    Object.assign(this, period)
    this._uiMatchedEventsStorage = new BrowserStorage(`ui_matched_events_${this.id}`, 'local')
    this._uiIgnoredEventsStorage = new BrowserStorage(`ui_ignored_events_${this.id}`, 'local')
    this._uiMatchedEvents = this._uiMatchedEventsStorage.get({})
    this._uiIgnoredEvents = this._uiIgnoredEventsStorage.get([])
    return this
  }

  /**
   * Get name of period
   *
   * @param {TFunction} t Translate function
   * @param {boolean} includeMonth Include month
   */
  public getName(t: TFunction, includeMonth?: boolean) {
    let name = `${t('common.weekLabel')} ${this.week}`
    if (includeMonth) name += ` (${this.month})`
    return name
  }

  /**
   * Check manual match in localStorage
   *
   * If it find a match project/customer and manualMatch is set for the
   * event
   *
   * If the event has manualMatch set, but it cannot be found in localStorage
   * project/customer is set to null for the event
   *
   * @param {EventObject} event Event object
   *
   * @returns an extended event object
   */
  private _checkUiManualMatch(event: EventObject) {
    const manualMatch = this._uiMatchedEvents[event.id]

    if (!!manualMatch) {
      return {
        ...event,
        manualMatch: true,
        project: manualMatch,
        customer: manualMatch.customer
      }
    }
    if (event.manualMatch && !manualMatch) {
      return {
        ...event,
        manualMatch: false,
        project: null,
        customer: null
      }
    }
    return event
  }

  /**
   * Get events
   *
   * @param {boolean} includeUnmatched Include unmatched events
   */
  public getEvents(includeUnmatched: boolean = true): EventObject[] {
    return [...(this.events || [])]
      .filter((event) => {
        const isUiIgnored = this._uiIgnoredEvents.indexOf(event.id) !== -1
        const isMatched = !!event.project
        return !event.isSystemIgnored && !isUiIgnored && (!includeUnmatched ? isMatched : true)
      })
      .map((event) => this._checkUiManualMatch(event))
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
    return filter(this.getEvents(), (event) => !!event.project).reduce(
      (sum, event) => sum + event.duration,
      0
    )
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
    this._uiMatchedEventsStorage.set(matches)
  }

  /**
   * Clear manual match from local storage
   *
   * @param {string} eventId Event id
   */
  public clearManualMatch(eventId: string) {
    this._uiMatchedEvents = omit(this._uiMatchedEvents, eventId)
    this._uiMatchedEventsStorage.set(this._uiMatchedEvents)
  }

  /**
   * Store ignored event in browser storage
   *
   * @param {string} eventId Event id
   */
  public ignoreEvent(eventId: string) {
    this._uiIgnoredEvents = [...this._uiIgnoredEvents, eventId]
    this._uiIgnoredEventsStorage.set(this._uiIgnoredEvents)
  }

  /**
   * Clear ignored events from browser storage
   */
  public clearIgnoredEvents() {
    this._uiIgnoredEvents = []
    this._uiIgnoredEventsStorage.set(this._uiIgnoredEvents)
  }

  /**
   * Get matched events with properties
   */
  private get matchedEvents(): EventInput[] {
    const events = filter([...this.getEvents()], (event) => !!event.project).map(
      (event) =>
        ({
          id: event.id,
          projectId: event.project.tag,
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
    return {
      id: this.id,
      startDate: this.startDate,
      endDate: this.endDate,
      forecastedHours: this.forecastedHours,
      matchedEvents: this.matchedEvents
    }
  }

  /**
   * Get weekdays in the specified format
   *
   * @param {string} dayFormat Day format
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public weekdays(dayFormat: string = 'dddd DD'): string[] {
    if (!this.startDate) return []
    return DateUtils.getDays(this.startDate, this.endDate, dayFormat)
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
   * Period is in the past
   */
  public get isPast(): boolean {
    return DateUtils.isBefore(this.endDate)
  }
}
