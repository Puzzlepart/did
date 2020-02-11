
import { dateAdd, PnPClientStorage, PnPClientStore, TypedHash } from '@pnp/common';
import { UserAllocation } from 'components/UserAllocation';
import { endOfWeek, formatDate, getValueTyped as value, getWeek, getYear, startOfWeek } from 'helpers';
import { IProject, ITimeEntry } from 'models';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import * as React from 'react';
import * as format from 'string-format';
import { client as graphql } from '../../graphql';
import { ActionBar } from './ActionBar';
import { GROUP_BY_DAY } from './ActionBar/GROUP_BY_DAY';
import { SCOPE_WEEK } from './ActionBar/SCOPE_WEEK';
import CONFIRM_PERIOD from './CONFIRM_PERIOD';
import { EventList } from './EventList';
import { EventOverview } from './EventOverview';
import GET_EVENT_DATA, { IGetEventData } from './GET_EVENT_DATA';
import { ITimesheetPeriod } from "./ITimesheetPeriod";
import { ITimesheetProps } from './ITimesheetProps';
import { ITimesheetState } from './ITimesheetState';
import { StatusBar } from './StatusBar';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';

/**
 * @component Timesheet
 * @description 
 */
export class Timesheet extends React.Component<ITimesheetProps, ITimesheetState> {
    private _store: PnPClientStore;
    private _resolvedKey = 'resolved_projects_{0}_{1}';
    private _ignoredKey = 'ignored_events_{0}_{1}';

    constructor(props: ITimesheetProps) {
        super(props);
        this.state = {
            period: this._getPeriod(),
            selectedView: 'overview',
            groupBy: GROUP_BY_DAY,
            scope: SCOPE_WEEK,
        };
        this._store = new PnPClientStorage().local;
    }

    public componentDidMount() {
        this._getEventData(false);
    }

    public render() {
        const { loading, period, groupBy, isConfirmed, data } = this.state;

        return (
            <div className='c-Timesheet'>
                <div className='c-Timesheet-section-container'>
                    <div className='c-Timesheet-section-content'>
                        <Pivot defaultSelectedKey={this.state.selectedView} onLinkClick={item => this.setState({ selectedView: item.props.itemKey })}>
                            <PivotItem itemKey='overview' headerText='Overview' itemIcon='CalendarWeek'>
                                {this._renderActionBar()}
                                <StatusBar
                                    isConfirmed={isConfirmed}
                                    events={value(data, 'events', [])}
                                    loading={loading}
                                    ignoredEvents={this._getStoredIgnores()}
                                    onClearIgnores={this._clearIgnores.bind(this)} />
                                <EventList
                                    onProjectSelected={this._onProjectSelected.bind(this)}
                                    onProjectClear={this._onProjectClear.bind(this)}
                                    onProjectIgnore={this._onProjectIgnore.bind(this)}
                                    enableShimmer={loading}
                                    events={value(data, 'events', [])}
                                    dateFormat={groupBy.data.dateFormat}
                                    isLocked={isConfirmed || closed}
                                    hideColumns={[...groupBy.data.hideColumns, 'customer']}
                                    groups={groupBy.data.groups} />
                            </PivotItem>
                            <PivotItem itemKey='summary' headerText='Summary' itemIcon='List'>
                                {this._renderActionBar()}
                                <EventOverview
                                    events={value(data, 'events', [])}
                                    enableShimmer={loading}
                                    period={period} />
                            </PivotItem>
                            <PivotItem itemKey='allocation' headerText='Allocation' itemIcon='ReportDocument'>
                                {this._renderActionBar()}
                                <UserAllocation entries={value(data, 'events', [])} charts={{ 'project.name': 'Allocation per project', 'customer.name': 'Allocation per customer' }} />
                            </PivotItem>
                        </Pivot>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Render action bar
     */
    private _renderActionBar() {
        const { loading, period, groupBy, scope, isConfirmed } = this.state;
        return (
            <ActionBar
                period={period}
                groupBy={groupBy}
                scope={scope}
                onClick={{
                    CHANGE_PERIOD: this._onChangePeriod.bind(this),
                    CHANGE_GROUPBY: (groupBy: IContextualMenuItem) => this.setState({ groupBy }),
                    CHANGE_SCOPE: (scope: IContextualMenuItem) => this.setState({ scope }),
                    CONFIRM_WEEK: this._onConfirmWeek.bind(this),
                    UNCONFIRM_WEEK: this._onUnconfirmWeek.bind(this),
                    RELOAD: () => this._getEventData(false),
                }}
                disabled={{
                    CONFIRM_WEEK: loading || closed || isConfirmed,
                    UNCONFIRM_WEEK: loading || closed || !isConfirmed,
                    RELOAD: loading || closed || isConfirmed,
                }} />
        );
    }

    /**
     * On project clear
     *
    * @param {ITimeEntry} event Event
    */
    private _onProjectClear(event: ITimeEntry) {
        this._clearResolve(event.id);
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                events: prevState.data.events.map(e => {
                    if (e.id === event.id) {
                        e.project = null;
                        e.customer = null;
                        e.isManualMatch = false;
                    }
                    return e;
                })
            }
        }));
    }

    /**
     * On project ignore
     *
    * @param {ITimeEntry} event Event
    */
    private _onProjectIgnore(event: ITimeEntry) {
        this._storeIgnore(event.id);
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                events: prevState.data.events.filter(e => e.id !== event.id)
            }
        }));
    }

    /**
     * On project selected
     *
    * @param {ITimeEntry} event Event
    * @param {IProject} project Project
    */
    private _onProjectSelected(event: ITimeEntry, project: IProject) {
        this._storeResolve(event.id, project);
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                events: prevState.data.events.map(e => {
                    if (e.id === event.id) {
                        e.project = project;
                        e.customer = project.customer;
                        e.isManualMatch = true;
                    }
                    return e;
                })
            }
        }));
    }

    /**
     * Get period
     * 
     * @param {ITimesheetPeriod} period Period
     */
    private _getPeriod(period?: ITimesheetPeriod): ITimesheetPeriod {
        let [, start] = document.location.hash.substring(1).split('=');
        let periodStart = period ? startOfWeek(period.week, period.year) : startOfWeek(undefined, undefined, start);
        let periodEnd = period ? endOfWeek(period.week, period.year) : endOfWeek(undefined, undefined, start);
        return {
            week: period ? period.week : getWeek(start),
            year: period ? period.year : getYear(start),
            startDateTime: periodStart.toISOString(),
            endDateTime: periodEnd.toISOString(),
            ignoredKey: format(this._ignoredKey, periodStart.unix(), periodEnd.unix()),
            resolvedKey: format(this._resolvedKey, periodStart.unix(), periodEnd.unix()),
        };
    }

    /**
    * On change week
    *
    * @param {ITimesheetPeriod} period Period
    */
    private _onChangePeriod(period: ITimesheetPeriod) {
        if (JSON.stringify(period) === JSON.stringify(this.state.period)) return;
        period = this._getPeriod(period);
        document.location.hash = `week=${period.startDateTime}`;
        this.setState({ period }, () => this._getEventData(false));
    };

    /**
     * On confirm week
     */
    private async _onConfirmWeek() {
        this.setState({ loading: true });
        const entries = this.state.data.events
            .filter(event => !!event.project)
            .map(event => ({ id: event.id, projectId: event.project.id }));
        await graphql.mutate({
            mutation: CONFIRM_PERIOD,
            variables: {
                startDateTime: this.state.period.startDateTime,
                endDateTime: this.state.period.endDateTime,
                entries,
            },
        });
        await this._getEventData();
    };

    /**
     * On unconfirm week
     */
    private async _onUnconfirmWeek() {
        this._clearResolve();
        this.setState({ loading: true });
        await graphql.mutate({
            mutation: UNCONFIRM_PERIOD,
            variables: {
                startDateTime: this.state.period.startDateTime,
                endDateTime: this.state.period.endDateTime,
            },
        });
        await this._getEventData();

    };

    /**
     * Get stored resolves from local storage
     *
    * @param {string} eventId Event id
    */
    private _getStoredResolves(eventId?: string): TypedHash<IProject> {
        let storedResolves = this._store.get(this.state.period.resolvedKey);
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
        this._store.put(this.state.period.resolvedKey, resolves, dateAdd(new Date(), 'month', 1));
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
        this._store.put(this.state.period.resolvedKey, resolves, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Store ignore in local storage
     *
    * @param {string} eventId Event id
    */
    private _storeIgnore(eventId: string) {
        let ignores = this._getStoredIgnores();
        ignores.push(eventId);
        this._store.put(this.state.period.ignoredKey, ignores, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Get stored ignores from local storage
    */
    private _getStoredIgnores(): string[] {
        let storedIgnores = this._store.get(this.state.period.ignoredKey);
        if (!storedIgnores) return [];
        return storedIgnores;
    }

    /**
     * Clear ignores
     */
    private _clearIgnores() {
        this._store.put(this.state.period.ignoredKey, [], dateAdd(new Date(), 'month', 1));
        this._getEventData(false, 'cache-only');
    }

    /**
     * Get event data for week number
     *
    * @param {boolean} skipLoading Skips setting loading in state
    * @param {any} fetchPolicy Fetch policy
    */
    private async _getEventData(skipLoading: boolean = true, fetchPolicy: any = 'network-only') {
        if (!skipLoading) this.setState({ loading: true });
        const { data: { eventData, weeks } } = await graphql.query({
            query: GET_EVENT_DATA,
            variables: {
                startDateTime: this.state.period.startDateTime,
                endDateTime: this.state.period.endDateTime
            },
            fetchPolicy,
        });
        let data: IGetEventData = { ...eventData, weeks };
        let isConfirmed = data.confirmedDuration > 0
        let resolves = this._getStoredResolves();
        let ignores = this._getStoredIgnores();
        data.events = data.events
            .filter(event => !event.isIgnored && ignores.indexOf(event.id) === -1)
            .map(event => {
                event.day = formatDate(event.startTime, 'dddd');
                if (resolves[event.id]) {
                    event.project = resolves[event.id];
                    event.customer = resolves[event.id].customer;
                    event.isManualMatch = true;
                }
                return event;
            });
        this.setState({ data, loading: false, isConfirmed });
    }
}