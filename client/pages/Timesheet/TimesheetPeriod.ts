/* eslint-disable @typescript-eslint/no-inferrable-types */
import $date from 'DateUtils'
import { TFunction } from 'i18next'
import {
  ClientEventInput,
  EventObject,
  Project,
  TimesheetPeriodInput,
  TimesheetPeriodObject
} from 'types'
import _, { pick } from 'underscore'
import { BrowserStorage } from 'utils'

/**
 * Handles a part of a `TimesheetScope`. Represented
 * by the combination of weeek number, month index and
 * year.
 *
 * @remarks Look into creating a `react` hook
 * that can ease working with the periods
 *
 * @category Timesheet
 */
export class TimesheetPeriod {
  public id: string
  public readonly startDate: string
  public readonly endDate: string
  public readonly week: number
  public readonly isConfirmed?: boolean
  public readonly isForecasted: boolean
  public readonly isForecast: boolean
  public readonly forecastedHours: number
  public readonly month: string
  public readonly holidays: any[]

  /**
   * Events for the period
   */
  private events: EventObject[] = []

  /**
   * UI ignored events for the period
   */
  private _uiIgnoredEvents: string[] = []

  /**
   * UI matched events for the period
   */
  private _uiMatchedEvents: Record<string, Project> = {}

  /**
   * Matched events for the period persisted in browser storage
   */
  private _uiMatchedEventsStorage: BrowserStorage<Record<string, Project>>

  /**
   * Ignored events for the period persisted in browser storage
   */
  private _uiIgnoredEventsStorage: BrowserStorage<string[]>

  /**
   * Constructor for `TimesheetPeriod`
   *
   * @param period - Period
   */
  public initialize(period: TimesheetPeriodObject) {
    Object.assign(this, period)
    this._uiMatchedEventsStorage = new BrowserStorage(
      `timesheet_matched_events_${this.id}`
    )
    this._uiIgnoredEventsStorage = new BrowserStorage(
      `timesheet_ignored_events_${this.id}`
    )
    this._uiMatchedEvents = this._uiMatchedEventsStorage.get({})
    this._uiIgnoredEvents = this._uiIgnoredEventsStorage.get([])
    return this
  }

  /**
   * Get name of period
   *
   * @param t - Translate function
   * @param includeMonth - Include month
   * @memberof TimesheetPeriod
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
   * @param event - Event object
   *
   * @remarks A bit hacky this one, but it works for now.
   * Should be refactored in the near future though. Probably
   * using hooks or something similiar.
   *
   * @returns an extended event object
   *
   * @memberof TimesheetPeriod
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
   * @param includeUnmatched - Include unmatched events
   *
   * @memberof TimesheetPeriod
   */
  public getEvents(includeUnmatched: boolean = true): EventObject[] {
    return [...(this.events || [])]
      .filter((event) => {
        const isUiIgnored = this._uiIgnoredEvents.includes(event.id)
        const isMatched = !!event.project
        return (
          !event.isSystemIgnored &&
          !isUiIgnored &&
          (!includeUnmatched ? isMatched : true)
        )
      })
      .map((event) => this._checkUiManualMatch(event))
  }

  /**
   * Get ignored events for the period
   *
   * @memberof TimesheetPeriod
   */
  public get ignoredEvents(): string[] {
    return this._uiIgnoredEvents
  }

  /**
   * Get aggregated errors from the events in the period
   *
   * @memberof TimesheetPeriod
   */
  public get errors(): any[] {
    if (!this.getEvents) return []
    return _.filter(this.getEvents(), (event) => !!event.error).map(
      (event) => event.error
    )
  }

  /**
   * Get total duration of events in the period
   *
   * @memberof TimesheetPeriod
   */
  public get totalDuration(): number {
    return this.getEvents().reduce((sum, event) => (sum += event.duration), 0)
  }

  /**
   * Get matched duration for the events in the period
   *
   * @memberof TimesheetPeriod
   */
  public get matchedDuration(): number {
    return _.filter(this.getEvents(), (event) => !!event.project).reduce(
      (sum, event) => sum + event.duration,
      0
    )
  }

  /**
   * Get unmatched duration for the events in the period
   *
   * @memberof TimesheetPeriod
   */
  public get unmatchedDuration(): number {
    return this.totalDuration - this.matchedDuration
  }

  /**
   * Save manual match in browser storage
   *
   * @param eventId - Event id
   * @param project - Project
   *
   * @memberof TimesheetPeriod
   */
  public setManualMatch(eventId: string, project: Project) {
    const matches = this._uiMatchedEvents
    matches[eventId] = project
    this._uiMatchedEventsStorage.set(matches)
  }

  /**
   * Clear manual match from local storage
   *
   * @param eventId - Event id
   *
   * @memberof TimesheetPeriod
   */
  public clearManualMatch(eventId: string) {
    this._uiMatchedEvents = _.omit(this._uiMatchedEvents, eventId)
    this._uiMatchedEventsStorage.set(this._uiMatchedEvents)
  }

  /**
   * Store ignored event in browser storage
   *
   * @param eventId - Event id
   *
   * @memberof TimesheetPeriod
   */
  public ignoreEvent(eventId: string) {
    this._uiIgnoredEvents = [...this._uiIgnoredEvents, eventId]
    this._uiIgnoredEventsStorage.set(this._uiIgnoredEvents)
  }

  /**
   * Clear ignored events from browser storage
   *
   * @memberof TimesheetPeriod
   */
  public clearIgnoredEvents() {
    this._uiIgnoredEvents = []
    this._uiIgnoredEventsStorage.set(this._uiIgnoredEvents)
  }

  /**
   * Get matched events with properties
   *
   * @memberof TimesheetPeriod
   */
  public get matchedEvents(): ClientEventInput[] {
    const events = _.filter(
      [...this.getEvents()],
      (event) => !!event.project
    ).map((event) => {
      let eventInput: ClientEventInput = {
        id: event.id,
        projectId: event.project.tag,
        manualMatch: event.manualMatch
      }
      if (event.adjustedMinutes) {
        eventInput = {
          ...eventInput,
          ...pick(
            event,
            'originalDuration',
            'startDateTime',
            'endDateTime',
            'duration',
            'adjustedMinutes'
          )
        }
      }
      return eventInput
    })
    return events
  }

  /**
   * Get data for the period. Returns
   * `id`, `startDate`, `endDate`, `forecastedHours`
   * and `matchedEvents`
   *
   * @returns Data for the period
   *
   * @memberof TimesheetPeriod
   */
  public get data(): TimesheetPeriodInput {
    return _.pick(
      this as any,
      'id',
      'startDate',
      'endDate',
      'forecastedHours',
      'matchedEvents'
    )
  }

  /**
   * Get weekdays in the specified format
   *
   * @param template - Template
   *
   * @memberof TimesheetPeriod
   */
  public weekdays<T = string>(template: string = 'dddd DD'): T[] {
    if (!this.startDate) return []
    return $date.getDays(this.startDate, this.endDate, template) as T[]
  }

  /**
   * Returns URL path for the period
   *
   * @example `11_3_2021` => `11/3/2021`
   *
   * @memberof TimesheetPeriod
   */
  public get path(): string {
    return this.id.replace(/_/g, '/')
  }

  /**
   * Period is complete meaning all events are matched
   *
   * @returns `true` if the unmatched duration (`unmatchedDuration`) is equal to zero (0)
   *
   * @memberof TimesheetPeriod
   */
  public get isComplete(): boolean {
    return this.unmatchedDuration === 0
  }

  /**
   * Period is in the past
   *
   * @returns `true` if the `endDate` is before today
   *
   * @memberof TimesheetPeriod
   */
  public get isPast(): boolean {
    return $date.isBefore(this.endDate)
  }
}
