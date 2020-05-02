import { ITimeEntry } from 'interfaces/ITimeEntry';
import { ITypedHash, IPnPClientStore, dateAdd, PnPClientStorage } from '@pnp/common';
import { IProject } from 'interfaces/IProject';
import { TimesheetScope } from './TimesheetScope';

/**
 * @category Timesheet
 */
export class TimesheetPeriod {
    public id?: string;
    public name?: string;
    public startDateTime?: string;
    public endDateTime?: string;
    public confirmedDuration?: number;
    public manualMatches: ITypedHash<any>;
    public ignoredEvents: string[] = [];
    private _localStorage: IPnPClientStore = new PnPClientStorage().local;
    private _uiMatchedEventsStorageKey: string;
    private _uiIgnoredEventsStorageKey: string;

    constructor(private _period?: Partial<TimesheetPeriod>) {
        if (_period) {
            this.id = _period.id;
            this.name = _period.name;
            this.startDateTime = _period.startDateTime;
            this.endDateTime = _period.endDateTime;
            this.confirmedDuration = _period.confirmedDuration;
            this._uiMatchedEventsStorageKey = `did365_ui_matched_events_${this.id}`;
            this._uiIgnoredEventsStorageKey = `did365_ui_ignored_events_${this.id}`;
            this.ignoredEvents = this._localStorage.get(this._uiIgnoredEventsStorageKey) || [];
            this.manualMatches = this._localStorage.get(this._uiMatchedEventsStorageKey) || {};
        }
    }

    public get events(): ITimeEntry[] {
        if (this._period) {
            return this._period.events
                .filter(event => !event.isIgnored && this.ignoredEvents.indexOf(event.id) === -1)
                .map(event => {
                    if (this.manualMatches[event.id]) {
                        event.project = this.manualMatches[event.id];
                        event.customer = this.manualMatches[event.id].customer;
                        event.isManualMatch = true;
                    }
                    return event;
                });
        }
        return [];
    }

    public get isConfirmed(): boolean {
        return this.events.length > 0;
    }

    public get errors(): Error[] {
        return this.events ? this.events.filter(event => event.error).map(event => event.error) : [];
    }

    public get totalDuration(): number {
        return this.events.reduce((sum, event) => sum += event.durationMinutes, 0);
    }

    public get matchedDuration(): number {
        return this.events.filter(event => !!event.project).reduce((sum, event) => sum += event.durationMinutes, 0);
    }

    public get unmatchedDuration(): number {
        return this.totalDuration - this.matchedDuration;
    }

    /**
     * Save manual match in browser storage
     *
    * @param {string} eventId Event id
    * @param {IProject} project Project
    */
    public setManualMatch(eventId: string, project: IProject) {
        let matches = this.manualMatches;
        matches[eventId] = project;
        this._localStorage.put(this._uiMatchedEventsStorageKey, matches, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Clear manual match from local storage
     *
     * @param {string} eventId Event id
     */
    public clearManualMatch(eventId: string) {
        delete this.manualMatches[eventId];
        this._localStorage.put(this._uiMatchedEventsStorageKey, this.manualMatches, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Store ignored event in browser storage
     *
    * @param {string} eventId Event id
    */
    public ignoreEvent(eventId: string) {
        this.ignoredEvents = [...this.ignoredEvents, eventId];
        this._localStorage.put(this._uiIgnoredEventsStorageKey, this.ignoredEvents, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Clear ignored events from browser storage
     */
    public clearIgnoredEvents() {
        this.ignoredEvents = [];
        this._localStorage.put(this._uiIgnoredEventsStorageKey, this.ignoredEvents, dateAdd(new Date(), 'month', 1));
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
            }));
        return events;
    }

    public get scope() {
        return {
            startDateTime: this.startDateTime,
            endDateTime: this.endDateTime,
        }
    }
}  