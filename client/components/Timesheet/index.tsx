
import { dateAdd, PnPClientStorage, PnPClientStore, TypedHash } from '@pnp/common';
import { UserAllocation } from 'components/UserAllocation';
import { endOfWeek, getDurationDisplay, getUrlHash, getWeekdays, startOfWeek } from 'helpers';
import i18n from 'i18next';
import { IProject, ITimeEntry } from 'interfaces';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import * as format from 'string-format';
import { client as graphql, FetchPolicy } from '../../graphql';
import { ActionBar } from './ActionBar';
import { EventList } from './EventList';
import GET_TIMESHEET from './GET_TIMESHEET';
import { ITimesheetProps } from './ITimesheetProps';
import { ITimesheetScope } from './ITimesheetScope';
import { ITimesheetState, TimesheetView } from './ITimesheetState';
import { StatusBar } from './StatusBar';
import { SummaryView, SummaryViewType } from './SummaryView';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';

const PERIOD_ALL = { id: 'all', name: 'All week', events: [] };

/**
 * @component Timesheet
 * @description 
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
            errors: []
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
            errors,
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
                            onConfirmWeek={this._confirmPeriod.bind(this)}
                            onUnconfirmWeek={this._unconfirmPeriod.bind(this)}
                            onReload={() => this._getData(false)}
                            disabled={{
                                CONFIRM_WEEK: loading || selectedPeriod.isConfirmed || errors.length > 0,
                                UNCONFIRM_WEEK: loading || !selectedPeriod.isConfirmed,
                                RELOAD: loading || selectedPeriod.isConfirmed,
                            }} />
                        <Pivot>
                            {periods.map(p => (
                                <PivotItem
                                    key={p.id}
                                    itemKey={p.id}
                                    itemID={p.id}
                                    headerText={p.name}>
                                    {this._renderContent(p.events)}
                                </PivotItem>
                            ))}
                        </Pivot>
                    </div>
                </div>
            </div>
        );
    }

    private _renderContent(events: any[]) {
        const {
            loading,
            scope,
            selectedPeriod,
            errors,
        } = this.state;
        return (
            <Pivot defaultSelectedKey={this.state.selectedView} onLinkClick={item => this.setState({ selectedView: item.props.itemKey as TimesheetView })}>
                <PivotItem itemKey='overview' headerText={i18n.t('timesheet.overviewHeaderText')} itemIcon='CalendarWeek'>
                    <div className='c-Timesheet-overview'>
                        <StatusBar
                            isConfirmed={selectedPeriod.isConfirmed}
                            events={events}
                            loading={loading}
                            errors={errors}
                            ignoredEvents={this._getStoredIgnores()}
                            onClearIgnores={this._clearIgnores.bind(this)} />
                        {loading && <ProgressIndicator />}
                        <EventList
                            onProjectSelected={this._onProjectSelected.bind(this)}
                            onProjectClear={this._onProjectClear.bind(this)}
                            onProjectIgnore={this._onProjectIgnore.bind(this)}
                            enableShimmer={loading}
                            events={events}
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
                        events={events}
                        enableShimmer={loading}
                        scope={scope}
                        type={SummaryViewType.UserWeek} />
                </PivotItem>
                <PivotItem itemKey='allocation' headerText={i18n.t('timesheet.allocationHeaderText')} itemIcon='ReportDocument'>
                    <div className='c-Timesheet-allocation'>
                        <UserAllocation entries={events} charts={{ 'project.name': i18n.t('timesheet.allocationProject'), 'customer.name': i18n.t('timesheet.allocationCustomer') }} />
                    </div>
                </PivotItem>
            </Pivot>
        );
    }

    /**
     * Get view
     * 
     * @param {ITimesheetScope} scope Scope
     */
    private _getScope(scope: ITimesheetScope = {}): ITimesheetScope {
        if (!scope.startDateTime) scope.startDateTime = startOfWeek(getUrlHash()['week']);
        if (!scope.endDateTime) scope.endDateTime = endOfWeek(scope.startDateTime || getUrlHash()['week']);
        return {
            ...scope,
            ignoredKey: format(this._ignoredKey, scope.startDateTime.unix(), scope.endDateTime.unix()),
            resolvedKey: format(this._resolvedKey, scope.startDateTime.unix(), scope.endDateTime.unix()),
        };
    }

    /**
    * On change scope
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
    private async _confirmPeriod() {
        this.setState({ loading: true });
        // const entries = this.state.data.events
        //     .filter(event => !!event.project)
        //     .map(event => ({ id: event.id, projectId: event.project.id, isManualMatch: event.isManualMatch }));
        // await graphql.mutate({
        //     mutation: CONFIRM_PERIOD,
        //     variables: {
        //         startDateTime: this.state.view.startDateTime,
        //         endDateTime: this.state.view.endDateTime,
        //         entries,
        //     },
        // });
        // await this._getEventData();
    };

    /**
     * Confirm period
     */
    private async _unconfirmPeriod() {
        this._clearResolve();
        this.setState({ loading: true });
        await graphql.mutate({
            mutation: UNCONFIRM_PERIOD,
            variables: this.state.scope,
        });
        await this._getData();

    };

    /**
     * On project clear
     *
    * @param {ITimeEntry} event Event
    */
    private _onProjectClear(event: ITimeEntry) {
        this._clearResolve(event.id);
        // this.setState(prevState => ({
        //     data: {
        //         ...prevState.data,
        //         events: prevState.data.events.map(e => {
        //             if (e.id === event.id) {
        //                 e.project = null;
        //                 e.customer = null;
        //                 e.isManualMatch = false;
        //             }
        //             return e;
        //         })
        //     }
        // }));
    }

    /**
     * On project selected
     *
    * @param {ITimeEntry} event Event
    * @param {IProject} project Project
    */
    private _onProjectSelected(event: ITimeEntry, project: IProject) {
        this._storeResolve(event.id, project);
        // this.setState(prevState => ({
        //     data: {
        //         ...prevState.data,
        //         events: prevState.data.events.map(e => {
        //             if (e.id === event.id) {
        //                 e.project = project;
        //                 e.customer = project.customer;
        //                 e.isManualMatch = true;
        //             }
        //             return e;
        //         })
        //     }
        // }));
    }

    /**
     * Get stored resolves from local storage
     *
    * @param {string} eventId Event id
    */
    private _getStoredResolves(eventId?: string): TypedHash<IProject> {
        let storedResolves = this._store.get(this.state.scope.resolvedKey);
        if (!storedResolves) return {};
        if (eventId && storedResolves[eventId]) return storedResolves[eventId];
        return storedResolves;
    }

    /**
     * Store resolve in local storage
     *
    * @param {string} eventId Event id
    * @param {IProject} project Project
    */
    private _storeResolve(eventId: string, project: IProject) {
        let resolves = this._getStoredResolves();
        resolves[eventId] = project;
        this._store.put(this.state.scope.resolvedKey, resolves, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Clear resolve
     *
    * @param {string} eventId Event id
     */
    private _clearResolve(eventId?: string) {
        let resolves = {};
        if (eventId) {
            resolves = this._getStoredResolves();
            delete resolves[eventId];
        }
        this._store.put(this.state.scope.resolvedKey, resolves, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Store ignore in local storage
     *
    * @param {string} eventId Event id
    */
    private _storeIgnore(eventId: string) {
        let ignores = this._getStoredIgnores();
        ignores.push(eventId);
        this._store.put(this.state.scope.ignoredKey, ignores, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Get stored ignores from local storage
    */
    private _getStoredIgnores(): string[] {
        let storedIgnores = this._store.get(this.state.scope.ignoredKey);
        if (!storedIgnores) return [];
        return storedIgnores;
    }

    /**
     * On project ignore
     *
    * @param {ITimeEntry} event Event
    */
    private _onProjectIgnore(event: ITimeEntry) {
        this._storeIgnore(event.id);
        // this.setState(prevState => ({
        //     data: {
        //         ...prevState.data,
        //         events: prevState.data.events.filter(e => e.id !== event.id)
        //     }
        // }));
    }

    /**
     * Clear ignores
     */
    private _clearIgnores() {
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
        const { data: { timesheet: periods } } = await graphql.query({
            query: GET_TIMESHEET,
            variables,
            fetchPolicy,
        });
        const resolves = this._getStoredResolves();
        const ignores = this._getStoredIgnores();
        // let data: ITimesheetData = { ...timesheet };
        // let isConfirmed = data.confirmedDuration > 0
        // data.events = data.events
        //     .filter(event => !event.isIgnored && ignores.indexOf(event.id) === -1)
        //     .map(event => {
        //         if (resolves[event.id]) {
        //             event.project = resolves[event.id];
        //             event.customer = resolves[event.id].customer;
        //             event.isManualMatch = true;
        //         }
        //         return event;
        //     });
        // const errors = data.events.filter(evt => evt.error).map(evt => evt.error);
        const errors = [];
        console.log(periods);
        this.setState({ periods, selectedPeriod: periods[0], loading: false, errors });
    }
}
