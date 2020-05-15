/* eslint-disable prefer-const */
import { dateAdd, IPnPClientStore, ITypedHash, PnPClientStorage } from '@pnp/common'
import { TFunction } from 'i18next'
import { IProject } from 'interfaces/IProject'
import { ITimeEntry } from 'interfaces/ITimeEntry'
import { omit } from 'underscore'
import { capitalize } from 'underscore.string'

/**
 * @category Timesheet
 */
export class TimesheetPeriod {
    public id?: string;
    public week?: number;
    public month?: string;
    public startDateTime?: string;
    public endDateTime?: string;
    public confirmedDuration?: number;
    public manualMatches: ITypedHash<any> = {};
    public ignoredEvents: string[] = [];
    private _localStorage: IPnPClientStore = new PnPClientStorage().local;
    private _uiMatchedEventsStorageKey: string;
    private _uiIgnoredEventsStorageKey: string;

    constructor(private _period?: Partial<TimesheetPeriod>) {
        if (_period) {
            this.id = _period.id
            this.week = _period.week
            this.month = capitalize(_period.month)
            this.startDateTime = _period.startDateTime
            this.endDateTime = _period.endDateTime
            this.confirmedDuration = _period.confirmedDuration
            this._uiMatchedEventsStorageKey = `did365_ui_matched_events_${this.id}`
            this._uiIgnoredEventsStorageKey = `did365_ui_ignored_events_${this.id}`
            this.ignoredEvents = this._localStorage.get(this._uiIgnoredEventsStorageKey) || []
            this.manualMatches = this._localStorage.get(this._uiMatchedEventsStorageKey) || {}
        }
    }

    public getName(includeMonth: boolean, t: TFunction) {
        let name = `${t('weekLabel', { ns: 'COMMON' })} ${this.week}`
        if (includeMonth) name += ` (${this.month})`
        return name
    }

    private _handleManualMatches(event: ITimeEntry) {
        let manualMatch = this.manualMatches[event.id]
        if (event.isManualMatch && !manualMatch) {
            event.isManualMatch = false
            event.project = event.customer = null
        }
        if (!!manualMatch) {
            event.isManualMatch = true
            event.project = manualMatch
            event.customer = manualMatch.customer
        }
        return event
    }

    public get events(): ITimeEntry[] {
        if (this._period) {
            return [...this._period.events]
                .filter(event => !event.isIgnored && this.ignoredEvents.indexOf(event.id) === -1)
                .map(event => this._handleManualMatches(event))
        }
        return []
    }

    public get isConfirmed(): boolean {
        return this.confirmedDuration > 0
    }

    public get errors(): Error[] {
        return this.events ? this.events.filter(event => event.error).map(event => event.error) : []
    }

    public get totalDuration(): number {
        return this.events.reduce((sum, event) => sum += event.duration, 0)
    }

    public get matchedDuration(): number {
        return this.events.filter(event => !!event.project).reduce((sum, event) => sum += event.duration, 0)
    }

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
        let matches = this.manualMatches
        matches[eventId] = project
        this._localStorage.put(this._uiMatchedEventsStorageKey, matches, dateAdd(new Date(), 'month', 1))
    }

    /**
     * Clear manual match from local storage
     *
     * @param {string} eventId Event id
     */
    public clearManualMatch(eventId: string) {
        this.manualMatches = omit(this.manualMatches, eventId)
        this._localStorage.put(this._uiMatchedEventsStorageKey, this.manualMatches, dateAdd(new Date(), 'month', 1))
    }

    /**
     * Store ignored event in browser storage
     *
    * @param {string} eventId Event id
    */
    public ignoreEvent(eventId: string) {
        this.ignoredEvents = [...this.ignoredEvents, eventId]
        this._localStorage.put(this._uiIgnoredEventsStorageKey, this.ignoredEvents, dateAdd(new Date(), 'month', 1))
    }

    /**
     * Clear ignored events from browser storage
     */
    public clearIgnoredEvents() {
        this.ignoredEvents = []
        this._localStorage.put(this._uiIgnoredEventsStorageKey, this.ignoredEvents, dateAdd(new Date(), 'month', 1))
    }

    /**
     * Get matched events with properties {id}, {projectId} and {isManualMatch}
     */
    public get matchedEvents() {
        const events = [...this.events]
            .filter(event => !!event.project)
            .map(event => ({
                id: event.id,
                projectId: event.project.id,
                isManualMatch: event.isManualMatch,
            }))
        return events
    }

    public get scope() {
        return {
            startDateTime: this.startDateTime,
            endDateTime: this.endDateTime,
        }
    }
}  