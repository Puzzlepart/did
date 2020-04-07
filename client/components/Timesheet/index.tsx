
import { dateAdd, IPnPClientStore, ITypedHash, PnPClientStorage } from '@pnp/common';
import { UserAllocation } from 'components/UserAllocation';
import * as hlp from 'helpers';
import * as config from './config';
import resource from 'i18n';
import { IProject, ITimeEntry } from 'interfaces';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import * as format from 'string-format';
import { client as graphql, FetchPolicy } from '../../graphql';
import { ActionBar } from './ActionBar';
import CONFIRM_PERIOD from './CONFIRM_PERIOD';
import { EventList } from './EventList';
import GET_TIMESHEET from './GET_TIMESHEET';
import { StatusBar } from './StatusBar';
import { SummaryView, SummaryViewType } from './SummaryView';
import { ITimesheetPeriod, ITimesheetProps, ITimesheetScope, ITimesheetState, TimesheetView } from './types';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';
import _ from 'underscore';

/**
 * @component Timesheet
 */
export class Timesheet extends React.Component<ITimesheetProps, ITimesheetState> {
    public static defaultProps: Partial<ITimesheetProps> = { groupHeaderDateFormat: 'dddd DD' };
    private _localStorage: IPnPClientStore = new PnPClientStorage().local;

    constructor(props: ITimesheetProps) {
        super(props);
        this.state = {
            scope: this._createScope(),
            periods: [],
            selectedView: 'overview',
        };
    }

    public async componentDidMount() {
        let period = await this._getData(false);
        this.setState({ selectedPeriodId: period.id });
    }

    public render() {
        const {
            loading,
            scope,
            periods,
        } = this.state;
        return (
            <div className='c-Timesheet'>
                <div className='c-Timesheet-section-container'>
                    <div className='c-Timesheet-section-content'>
                        <ActionBar
                            timesheet={this.state}
                            selectedPeriod={this._selectedPeriod}
                            onChangeScope={this._onChangeScope.bind(this)}
                            onChangePeriod={this._onChangePeriod.bind(this)}
                            onConfirmPeriod={this._onConfirmPeriod.bind(this)}
                            onUnconfirmPeriod={this._onUnconfirmPeriod.bind(this)} />
                        <Pivot defaultSelectedKey={this.state.selectedView} onLinkClick={item => this.setState({ selectedView: item.props.itemKey as TimesheetView })}>
                            <PivotItem itemKey='overview' headerText={resource('TIMESHEET.OVERVIEW_HEADER_TEXT')} itemIcon='CalendarWeek'>
                                <div className='c-Timesheet-overview'>
                                    <StatusBar
                                        timesheet={this.state}
                                        selectedPeriod={this._selectedPeriod}
                                        ignoredEvents={this._getStoredIgnoredEvents()}
                                        onClearIgnores={this._clearIgnoredEvents.bind(this)} />
                                    {loading && <ProgressIndicator />}
                                    <EventList
                                        enableShimmer={loading}
                                        events={this._selectedPeriod.events}
                                        showEmptyDays={periods.length === 1}
                                        dateFormat={'HH:mm'}
                                        isLocked={this._selectedPeriod.isConfirmed}
                                        groups={{
                                            fieldName: 'date',
                                            groupNames: hlp.getWeekdays(scope.startDateTime, this.props.groupHeaderDateFormat),
                                            totalFunc: (items: ITimeEntry[]) => {
                                                let totalMins = items.reduce((sum, i) => sum += i.durationMinutes, 0);
                                                return ` (${hlp.getDurationDisplay(totalMins)})`;
                                            },
                                        }}
                                        onManualMatch={this._onManualMatch.bind(this)}
                                        onClearManualMatch={this._onClearManualMatch.bind(this)}
                                        onIgnoreEvent={this._onIgnoreEvent.bind(this)} />
                                </div>
                            </PivotItem>
                            <PivotItem itemKey='summary' headerText={resource('TIMESHEET.SUMMARY_HEADER_TEXT')} itemIcon='List'>
                                <SummaryView
                                    events={this._selectedPeriod.events}
                                    enableShimmer={loading}
                                    scope={scope}
                                    type={SummaryViewType.UserWeek} />
                            </PivotItem>
                            <PivotItem itemKey='allocation' headerText={resource('TIMESHEET.ALLOCATION_HEADER_TEXT')} itemIcon='ReportDocument'>
                                <div className='c-Timesheet-allocation'>
                                    <UserAllocation
                                        entries={this._selectedPeriod.events}
                                        charts={{
                                            'project.name': resource('TIMESHEET.ALLOCATION_PROJECT_CHART_TITLE'),
                                            'customer.name': resource('TIMESHEET.ALLOCATION_CUSTOMER_CHART_TITLE'),
                                        }} />
                                </div>
                            </PivotItem>
                        </Pivot>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Selected period retreived by state variable {selectedPeriodId}
     */
    private get _selectedPeriod(): ITimesheetPeriod {
        return _.find(this.state.periods, period => period.id === this.state.selectedPeriodId) || { events: [], errors: [] };
    }

    /**
     * Create scope
     * 
     * Calculates {startDateTime} and {endDateTime} and creates a {uiMatchedEventsStorageKey} and {uiIgnoredEventsStorageKey}
     * 
     * @param {ITimesheetScope} scope Scope
     */
    private _createScope(scope: ITimesheetScope = {}): ITimesheetScope {
        if (!scope.startDateTime) scope.startDateTime = hlp.startOfWeek(hlp.parseUrlHash<any>().week);
        if (!scope.endDateTime) scope.endDateTime = hlp.endOfWeek(scope.startDateTime || hlp.parseUrlHash<any>().week);
        const uiMatchedEventsStorageKey = format(config.UI_MATCHED_EVENT_SSTORAGE_KEY, scope.startDateTime.unix(), scope.endDateTime.unix(), this.state ? this.state.selectedPeriodId : -1);
        const uiIgnoredEventsStorageKey = format(config.UI_IGNORED_EVENTS_STORAGE_KEY, scope.startDateTime.unix(), scope.endDateTime.unix(), this.state ? this.state.selectedPeriodId : -1);
        return { ...scope, uiMatchedEventsStorageKey, uiIgnoredEventsStorageKey };
    }

    /**
    * On change scope (passing empty object defaults to current week)
    *
    * @param {ITimesheetPeriod} scope Scope
    */
    private _onChangeScope(scope: ITimesheetScope) {
        if (JSON.stringify(scope) === JSON.stringify(this.state.scope)) return;
        scope = this._createScope(scope);
        document.location.hash = `week=${scope.startDateTime.toISOString()}`;
        this.setState({ scope }, async () => {
            let period = await this._getData(false);
            this.setState({ selectedPeriodId: period.id });
        });
    };


    /**
     * On change period
    *
    * @param {ITimesheetPeriod} period Period
     */
    private _onChangePeriod(period: ITimesheetPeriod) {
        this.setState({ selectedPeriodId: period.id });
    }

    /**
     * Confirm period
     */
    private async _onConfirmPeriod() {
        this.setState({ loading: true });
        const entries = this._selectedPeriod.events
            .filter(event => !!event.project)
            .map(event => ({
                id: event.id,
                projectId: event.project.id,
                isManualMatch: event.isManualMatch,
            }));
        await graphql.mutate({
            mutation: CONFIRM_PERIOD,
            variables: {
                startDateTime: this._selectedPeriod.startDateTime,
                endDateTime: this._selectedPeriod.endDateTime,
                entries,
            },
        });
        await this._getData();
    };

    /**
     * Unconfirm period
     */
    private async _onUnconfirmPeriod() {
        this.setState({ loading: true });
        await graphql.mutate({
            mutation: UNCONFIRM_PERIOD,
            variables: {
                startDateTime: this._selectedPeriod.startDateTime,
                endDateTime: this._selectedPeriod.endDateTime,
            },
        });
        await this._getData();
    };

    /**
     * On clear manual match
     *
    * @param {ITimeEntry} event Event
    */
    private _onClearManualMatch(event: ITimeEntry) {
        this._clearManualMatch(event.id);
        this.setState(prevState => {
            let selectedPeriod = { ...this._selectedPeriod };
            selectedPeriod.events = selectedPeriod.events.map(e => {
                if (e.id === event.id) {
                    e.project = null;
                    e.customer = null;
                    e.isManualMatch = false;
                }
                return e;
            })
            return {
                periods: prevState.periods.map(p => p.id === selectedPeriod.id ? selectedPeriod : p),
            }
        });
    }

    /**
     * On manual match of event
     *
    * @param {ITimeEntry} event Event
    * @param {IProject} project Project
    */
    private _onManualMatch(event: ITimeEntry, project: IProject) {
        this._saveManualMatch(event.id, project);
        this.setState(prevState => {
            let selectedPeriod = { ...this._selectedPeriod };
            selectedPeriod.events = selectedPeriod.events.map(e => {
                if (e.id === event.id) {
                    e.project = project;
                    e.customer = project.customer;
                    e.isManualMatch = true;
                }
                return e;
            })
            return {
                periods: prevState.periods.map(p => p.id === selectedPeriod.id ? selectedPeriod : p),
            }
        });
    }

    /**
     * Get manual matches from browser storage
     *
    * @param {string} eventId Event id
    */
    private _getManualMatches(eventId?: string): ITypedHash<IProject> {
        let storedResolves = this._localStorage.get(this.state.scope.uiMatchedEventsStorageKey);
        if (!storedResolves) return {};
        if (eventId && storedResolves[eventId]) return storedResolves[eventId];
        return storedResolves;
    }

    /**
     * Save manual match in browser storage
     *
    * @param {string} eventId Event id
    * @param {IProject} project Project
    */
    private _saveManualMatch(eventId: string, project: IProject) {
        let matches = this._getManualMatches();
        matches[eventId] = project;
        this._localStorage.put(this.state.scope.uiMatchedEventsStorageKey, matches, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Clear manual match from local storage
     *
     * @param {string} eventId Event id
     */
    private _clearManualMatch(eventId: string) {
        let matches = this._getManualMatches();
        delete matches[eventId];
        this._localStorage.put(this.state.scope.uiMatchedEventsStorageKey, matches, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Store ignored event in browser storage
     *
    * @param {string} eventId Event id
    */
    private _storeIgnoredEvent(eventId: string) {
        let ignores = this._getStoredIgnoredEvents();
        ignores.push(eventId);
        this._localStorage.put(this.state.scope.uiIgnoredEventsStorageKey, ignores, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Get stored ignored events from browser storage
    */
    private _getStoredIgnoredEvents(): string[] {
        let storedIgnores = this._localStorage.get(this.state.scope.uiIgnoredEventsStorageKey);
        if (!storedIgnores) return [];
        return storedIgnores;
    }

    /**
     * On ignore event
     *
    * @param {ITimeEntry} event Event
    */
    private _onIgnoreEvent(event: ITimeEntry) {
        this._storeIgnoredEvent(event.id);
        this.setState(prevState => {
            let selectedPeriod = { ...this._selectedPeriod };
            selectedPeriod.events = selectedPeriod.events.filter(e => e.id !== event.id);
            return {
                periods: prevState.periods.map(p => p.id === selectedPeriod.id ? selectedPeriod : p),
            }
        });
    }

    /**
     * Clear ignored events from browser storage
     */
    private _clearIgnoredEvents() {
        this._localStorage.put(this.state.scope.uiIgnoredEventsStorageKey, [], dateAdd(new Date(), 'month', 1));
        this._getData(false, 'cache-only');
    }

    /**
     * Get timesheet data
     *
    * @param {boolean} skipLoading Skips setting loading in state
    * @param {any} fetchPolicy Fetch policy
    * 
    * @returns Returns the first period
    */
    private async _getData(skipLoading: boolean = true, fetchPolicy: FetchPolicy = 'network-only'): Promise<ITimesheetPeriod> {
        if (!skipLoading) this.setState({ loading: true });
        const variables = {
            startDateTime: this.state.scope.startDateTime.toISOString(),
            endDateTime: this.state.scope.endDateTime.toISOString(),
            dateFormat: this.props.groupHeaderDateFormat,
        };
        const { data: { timesheet: periods } } = await graphql.query<{ timesheet: ITimesheetPeriod[] }>({
            query: GET_TIMESHEET,
            variables,
            fetchPolicy,
        });
        const manualMatches = this._getManualMatches();
        const ignoredEvents = this._getStoredIgnoredEvents();

        for (let i = 0; i < periods.length; i++) {
            let period = periods[i];
            period.isConfirmed = period.confirmedDuration > 0;
            period.events = period.events
                .filter(event => !event.isIgnored && ignoredEvents.indexOf(event.id) === -1)
                .map(event => {
                    if (manualMatches[event.id]) {
                        event.project = manualMatches[event.id];
                        event.customer = manualMatches[event.id].customer;
                        event.isManualMatch = true;
                    }
                    return event;
                });
            period.errors = period.events.filter(event => event.error).map(event => event.error);
        }

        this.setState({ periods, loading: false });
        return periods[0];
    }
}
