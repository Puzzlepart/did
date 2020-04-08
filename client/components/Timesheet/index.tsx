
import { dateAdd, PnPClientStorage, PnPClientStore, TypedHash } from '@pnp/common';
import { UserAllocation } from 'components/UserAllocation';
import { endOfWeek, getDurationDisplay, getUrlHash, getWeekdays, startOfWeek } from 'helpers';
import i18n from 'i18next';
import { IProject, ITimeEntry } from 'interfaces';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import * as format from 'string-format';
import _ from 'underscore';
import { client as graphql, FetchPolicy } from '../../graphql';
import { ActionBar } from './ActionBar';
import CONFIRM_PERIOD from './CONFIRM_PERIOD';
import { EventList } from './EventList';
import GET_TIMESHEET from './GET_TIMESHEET';
import { ITimesheetPeriod } from './ITimesheetPeriod';
import { ITimesheetProps } from './ITimesheetProps';
import { ITimesheetScope } from './ITimesheetScope';
import { ITimesheetState, TimesheetView } from './ITimesheetState';
import { StatusBar } from './StatusBar';
import { SummaryView, SummaryViewType } from './SummaryView';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';

const PERIOD_ALL = { id: 'all', name: 'All week', events: [], errors: [] };

/**
 * @component Timesheet
 */
export class Timesheet extends React.Component<ITimesheetProps, ITimesheetState> {
    public static defaultProps: Partial<ITimesheetProps> = { groupHeaderDateFormat: 'dddd DD' };
    private _store: PnPClientStore;
    private _resolvedKey = 'resolved_projects_{0}_{1}';
    private _ignoredKey = 'ignored_events_{0}_{1}';

    constructor(props: ITimesheetProps) {
        super(props);
        this.state = {
            scope: this._getScope(),
            periods: [PERIOD_ALL],
            selectedPeriod: PERIOD_ALL,
            selectedView: 'overview',
        };
        this._store = new PnPClientStorage().local;
    }

    public componentDidMount() {
        this._getData(false);
    }

    public render() {
        const {
            loading,
            scope,
            selectedView,
            selectedPeriod,
            periods,
        } = this.state;
        return (
            <div className='c-Timesheet'>
                <div className='c-Timesheet-section-container'>
                    <div className='c-Timesheet-section-content'>
                        <ActionBar
                            scope={scope}
                            selectedView={selectedView}
                            onChangeScope={this._onChangeScope.bind(this)}
                            onConfirmPeriod={this._onConfirmPeriod.bind(this)}
                            onUnconfirmPeriod={this._onUnconfirmPeriod.bind(this)}
                            disabled={{
                                CONFIRM_WEEK: loading || selectedPeriod.isConfirmed || selectedPeriod.errors.length > 0,
                                UNCONFIRM_WEEK: loading || !selectedPeriod.isConfirmed,
                            }} />
                        <Pivot>
                            {periods.map(p => (
                                <PivotItem
                                    key={p.id}
                                    itemKey={p.id}
                                    itemID={p.id}
                                    headerText={p.name}>
                                    {this._renderPeriod()}
                                </PivotItem>
                            ))}
                        </Pivot>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Renders a timesheet period
     */
    private _renderPeriod() {
        const {
            loading,
            scope,
            periods,
            selectedPeriod,
        } = this.state;
        return (
            <Pivot defaultSelectedKey={this.state.selectedView} onLinkClick={item => this.setState({ selectedView: item.props.itemKey as TimesheetView })}>
                <PivotItem itemKey='overview' headerText={i18n.t('timesheet.overviewHeaderText')} itemIcon='CalendarWeek'>
                    <div className='c-Timesheet-overview'>
                        <StatusBar
                            isConfirmed={selectedPeriod.isConfirmed}
                            events={selectedPeriod.events}
                            loading={loading}
                            errors={selectedPeriod.errors}
                            ignoredEvents={this._getStoredIgnoredEvents()}
                            onClearIgnores={this._clearIgnoredEvents.bind(this)} />
                        {loading && <ProgressIndicator />}
                        <EventList
                            onProjectSelected={this._onProjectSelected.bind(this)}
                            onProjectClear={this._onProjectClear.bind(this)}
                            onIgnoreEvent={this._onIgnoreEvent.bind(this)}
                            enableShimmer={loading}
                            events={selectedPeriod.events}
                            showEmptyDays={periods.length === 1}
                            dateFormat={'HH:mm'}
                            isLocked={selectedPeriod.isConfirmed}
                            groups={{
                                fieldName: 'date',
                                groupNames: getWeekdays(scope.startDateTime, this.props.groupHeaderDateFormat),
                                totalFunc: (items: ITimeEntry[]) => {
                                    let totalMins = items.reduce((sum, i) => sum += i.durationMinutes, 0);
                                    return ` (${getDurationDisplay(totalMins)})`;
                                },
                            }} />
                    </div>
                </PivotItem>
                <PivotItem itemKey='summary' headerText={i18n.t('timesheet.summaryHeaderText')} itemIcon='List'>
                    <SummaryView
                        events={selectedPeriod.events}
                        enableShimmer={loading}
                        scope={scope}
                        type={SummaryViewType.UserWeek} />
                </PivotItem>
                <PivotItem itemKey='allocation' headerText={i18n.t('timesheet.allocationHeaderText')} itemIcon='ReportDocument'>
                    <div className='c-Timesheet-allocation'>
                        <UserAllocation entries={selectedPeriod.events} charts={{ 'project.name': i18n.t('timesheet.allocationProject'), 'customer.name': i18n.t('timesheet.allocationCustomer') }} />
                    </div>
                </PivotItem>
            </Pivot>
        );
    }

    /**
     * Get scope
     * 
     * @param {ITimesheetScope} scope Scope
     */
    private _getScope(scope: ITimesheetScope = {}): ITimesheetScope {
        // TODO: Make more readable
        if (!scope.startDateTime) scope.startDateTime = startOfWeek(getUrlHash()['week']);
        if (!scope.endDateTime) scope.endDateTime = endOfWeek(scope.startDateTime || getUrlHash()['week']);
        return {
            ...scope,
            ignoredKey: format(this._ignoredKey, scope.startDateTime.unix(), scope.endDateTime.unix()),
            resolvedKey: format(this._resolvedKey, scope.startDateTime.unix(), scope.endDateTime.unix()),
        };
    }

    /**
    * On change scope (passing empty object defaults to current week)
    *
    * @param {ITimesheetPeriod} scope Scope
    */
    private _onChangeScope(scope: ITimesheetScope) {
        if (JSON.stringify(scope) === JSON.stringify(this.state.scope)) return;
        scope = this._getScope(scope);
        document.location.hash = `week=${scope.startDateTime.toISOString()}`;
        this.setState({ scope: scope }, () => this._getData(false));
    };
    /**
     * Confirm period
     */
    private async _onConfirmPeriod() {
        this.setState({ loading: true });
        const entries = this.state.selectedPeriod.events
            .filter(event => !!event.project)
            .map(event => ({
                id: event.id,
                projectId: event.project.id,
                isManualMatch: event.isManualMatch,
            }));
        await graphql.mutate({
            mutation: CONFIRM_PERIOD,
            variables: {
                startDateTime: this.state.selectedPeriod.startDateTime,
                endDateTime: this.state.selectedPeriod.endDateTime,
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
        // TODO: Error handling
        // To get data: const data = await graphql.mutate; data.unconfirmPeriod, data.result
        await graphql.mutate({
            mutation: UNCONFIRM_PERIOD,
            variables: {
                startDateTime: this.state.selectedPeriod.startDateTime,
                endDateTime: this.state.selectedPeriod.endDateTime,
            },
        });
        await this._getData();
    };

    /**
     * On project clear
     *
    * @param {ITimeEntry} event Event
    */
   // TODO: Naming sucks
    private _onProjectClear(event: ITimeEntry) {
        this._clearManualMatch(event.id);
        this.setState(({ periods, selectedPeriod }) => {
            selectedPeriod.events = selectedPeriod.events.map(e => {
                if (e.id === event.id) {
                    e.project = null;
                    e.customer = null;
                    e.isManualMatch = false;
                }
                return e;
            })
            return {
                selectedPeriod,
                periods: periods.map(p => p.id === selectedPeriod.id ? selectedPeriod : p),
            }
        });
    }

    /**
     * On project selected
     *
    * @param {ITimeEntry} event Event
    * @param {IProject} project Project
    */
   // TODO: Naming sucks
    private _onProjectSelected(event: ITimeEntry, project: IProject) {
        this._saveManualMatch(event.id, project);
        this.setState(({ periods, selectedPeriod }) => {
            selectedPeriod.events = selectedPeriod.events.map(e => {
                if (e.id === event.id) {
                    e.project = project;
                    e.customer = project.customer;
                    e.isManualMatch = true;
                }
                return e;
            })
            return {
                selectedPeriod,
                periods: periods.map(p => p.id === selectedPeriod.id ? selectedPeriod : p),
            }
        });
    }

    /**
     * Get stored resolves from browser storage
     *
    * @param {string} eventId Event id
    */
    private _getManualMatches(eventId?: string): TypedHash<IProject> {
        let storedResolves = this._store.get(this.state.scope.resolvedKey);
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
        this._store.put(this.state.scope.resolvedKey, matches, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Clear manual match from local storage
     *
     * @param {string} eventId Event id
     */
    private _clearManualMatch(eventId: string) {
        let matches = this._getManualMatches();
        delete matches[eventId];
        this._store.put(this.state.scope.resolvedKey, matches, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Store ignored event in browser storage
     *
    * @param {string} eventId Event id
    */
    private _storeIgnoredEvent(eventId: string) {
        let ignores = this._getStoredIgnoredEvents();
        ignores.push(eventId);
        this._store.put(this.state.scope.ignoredKey, ignores, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Get stored ignored events from browser storage
    */
    private _getStoredIgnoredEvents(): string[] {
        let storedIgnores = this._store.get(this.state.scope.ignoredKey);
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
        this.setState(({ periods, selectedPeriod }) => {
            selectedPeriod.events = selectedPeriod.events.filter(e => e.id !== event.id);
            return {
                selectedPeriod,
                periods: periods.map(p => p.id === selectedPeriod.id ? selectedPeriod : p),
            }
        });
    }

    /**
     * Clear ignored events from browser storage
     */
    private _clearIgnoredEvents() {
        this._store.put(this.state.scope.ignoredKey, [], dateAdd(new Date(), 'month', 1));
        this._getData(false, 'cache-only');
    }

    /**
     * Get timesheet data
     *
    * @param {boolean} skipLoading Skips setting loading in state
    * @param {any} fetchPolicy Fetch policy
    */
    private async _getData(skipLoading: boolean = true, fetchPolicy: FetchPolicy = 'network-only') {
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
        const resolves = this._getManualMatches();
        const ignores = this._getStoredIgnoredEvents();

        for (let i = 0; i < periods.length; i++) {
            let period = periods[i];
            period.isConfirmed = period.confirmedDuration > 0;
            period.events = period.events
                .filter(event => !event.isIgnored && ignores.indexOf(event.id) === -1)
                .map(event => {
                    if (resolves[event.id]) {
                        event.project = resolves[event.id];
                        event.customer = resolves[event.id].customer;
                        event.isManualMatch = true;
                    }
                    return event;
                });
            period.errors = period.events.filter(event => event.error).map(event => event.error);
        }

        this.setState({ periods, selectedPeriod: periods[0], loading: false });
    }
}
