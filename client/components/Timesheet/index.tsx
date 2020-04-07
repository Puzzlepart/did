
import { dateAdd, PnPClientStorage, PnPClientStore, TypedHash } from '@pnp/common';
import { UserAllocation } from 'components/UserAllocation';
import { endOfWeek, getDurationDisplay, getUrlHash, getValueTyped as value, getWeekdays, startOfWeek } from 'helpers';
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
import { ITimesheetData } from './ITimesheetData';
import { ITimesheetView } from './ITimesheetView';
import { ITimesheetProps } from './ITimesheetProps';
import { ITimesheetState, TimesheetView } from './ITimesheetState';
import { StatusBar } from './StatusBar';
import { SummaryView, SummaryViewType } from './SummaryView';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';
import i18n from 'i18next';

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
        this.state = { view: this._getPeriod(), selectedView: 'overview', errors: [] };
        this._store = new PnPClientStorage().local;
    }

    public componentDidMount() {
        this._getEventData(false);
    }

    public render() {
        const {
            loading,
            view,
            selectedView,
            isConfirmed,
            data,
            errors,
        } = this.state;

        return (
            <div className='c-Timesheet'>
                <div className='c-Timesheet-section-container'>
                    <div className='c-Timesheet-section-content'>
                        <ActionBar
                            view={view}
                            selectedView={selectedView}
                            onChangePeriod={this._onChangePeriod.bind(this)}
                            onConfirmWeek={this._confirmPeriod.bind(this)}
                            onUnconfirmWeek={this._unconfirmPeriod.bind(this)}
                            onReload={() => this._getEventData(false)}
                            disabled={{
                                CONFIRM_WEEK: loading || isConfirmed || errors.length > 0,
                                UNCONFIRM_WEEK: loading || !isConfirmed,
                                RELOAD: loading || isConfirmed,
                            }} />
                        <Pivot defaultSelectedKey={this.state.selectedView} onLinkClick={item => this.setState({ selectedView: item.props.itemKey as TimesheetView })}>
                            <PivotItem itemKey='overview' headerText={i18n.t('timesheet.overviewHeaderText')} itemIcon='CalendarWeek'>
                                <div className='c-Timesheet-overview'>
                                    <StatusBar
                                        isConfirmed={isConfirmed}
                                        events={value(data, 'events', [])}
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
                                        events={value(data, 'events', [])}
                                        dateFormat={'HH:mm'}
                                        isLocked={isConfirmed}
                                        groups={{
                                            fieldName: 'date',
                                            groupNames: getWeekdays(view.startDateTime, this.props.groupHeaderDateFormat),
                                            totalFunc: (items: ITimeEntry[]) => {
                                                let totalMins = items.reduce((sum, i) => sum += i.durationMinutes, 0);
                                                return ` (${getDurationDisplay(totalMins)})`;
                                            },
                                        }} />
                                </div>
                            </PivotItem>
                            <PivotItem itemKey='summary' headerText={i18n.t('timesheet.summaryHeaderText')} itemIcon='List'>
                                <SummaryView
                                    events={value(data, 'events', [])}
                                    enableShimmer={loading}
                                    view={view}
                                    type={SummaryViewType.UserWeek} />
                            </PivotItem>
                            <PivotItem itemKey='allocation' headerText={i18n.t('timesheet.allocationHeaderText')} itemIcon='ReportDocument'>
                                <div className='c-Timesheet-allocation'>
                                    <UserAllocation entries={value(data, 'events', [])} charts={{ 'project.name': i18n.t('timesheet.allocationProject'), 'customer.name': i18n.t('timesheet.allocationCustomer') }} />
                                </div>
                            </PivotItem>
                        </Pivot>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Get view
     * 
     * @param {ITimesheetView} view View
     */
    private _getPeriod(view: ITimesheetView = {}): ITimesheetView {
        if (!view.startDateTime) view.startDateTime = startOfWeek(getUrlHash()['week']);
        if (!view.endDateTime) view.endDateTime = endOfWeek(view.startDateTime || getUrlHash()['week']);
        return {
            ...view,
            ignoredKey: format(this._ignoredKey, view.startDateTime.unix(), view.endDateTime.unix()),
            resolvedKey: format(this._resolvedKey, view.startDateTime.unix(), view.endDateTime.unix()),
        };
    }

    /**
    * On change view
    *
    * @param {ITimesheetPeriod} view Period
    */
    private _onChangePeriod(view: ITimesheetView) {
        if (JSON.stringify(view) === JSON.stringify(this.state.view)) return;
        view = this._getPeriod(view);
        document.location.hash = `week=${view.startDateTime.toISOString()}`;
        this.setState({ view: view }, () => this._getEventData(false));
    };
    /**
     * Confirm period
     */
    private async _confirmPeriod() {
        this.setState({ loading: true });
        const entries = this.state.data.events
            .filter(event => !!event.project)
            .map(event => ({ id: event.id, projectId: event.project.id, isManualMatch: event.isManualMatch }));
        await graphql.mutate({
            mutation: CONFIRM_PERIOD,
            variables: {
                startDateTime: this.state.view.startDateTime,
                endDateTime: this.state.view.endDateTime,
                entries,
            },
        });
        await this._getEventData();
    };

    /**
     * Confirm period
     */
    private async _unconfirmPeriod() {
        this._clearResolve();
        this.setState({ loading: true });
        await graphql.mutate({
            mutation: UNCONFIRM_PERIOD,
            variables: this.state.view,
        });
        await this._getEventData();

    };

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
     * Get stored resolves from local storage
     *
    * @param {string} eventId Event id
    */
    private _getStoredResolves(eventId?: string): TypedHash<IProject> {
        let storedResolves = this._store.get(this.state.view.resolvedKey);
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
        this._store.put(this.state.view.resolvedKey, resolves, dateAdd(new Date(), 'month', 1));
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
        this._store.put(this.state.view.resolvedKey, resolves, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Store ignore in local storage
     *
    * @param {string} eventId Event id
    */
    private _storeIgnore(eventId: string) {
        let ignores = this._getStoredIgnores();
        ignores.push(eventId);
        this._store.put(this.state.view.ignoredKey, ignores, dateAdd(new Date(), 'month', 1));
    }

    /**
     * Get stored ignores from local storage
    */
    private _getStoredIgnores(): string[] {
        let storedIgnores = this._store.get(this.state.view.ignoredKey);
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
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                events: prevState.data.events.filter(e => e.id !== event.id)
            }
        }));
    }

    /**
     * Clear ignores
     */
    private _clearIgnores() {
        this._store.put(this.state.view.ignoredKey, [], dateAdd(new Date(), 'month', 1));
        this._getEventData(false, 'cache-only');
    }

    /**
     * Get event data for week number
     *
    * @param {boolean} skipLoading Skips setting loading in state
    * @param {any} fetchPolicy Fetch policy
    */
    private async _getEventData(skipLoading: boolean = true, fetchPolicy: FetchPolicy = 'network-only') {
        if (!skipLoading) this.setState({ loading: true });
        const variables = {
            startDateTime: this.state.view.startDateTime.toISOString(),
            endDateTime: this.state.view.endDateTime.toISOString(),
            dateFormat: this.props.groupHeaderDateFormat,
        };
        const { data: { timesheet } } = await graphql.query({
            query: GET_TIMESHEET,
            variables,
            fetchPolicy,
        });
        let data: ITimesheetData = { ...timesheet };
        let isConfirmed = data.confirmedDuration > 0
        let resolves = this._getStoredResolves();
        let ignores = this._getStoredIgnores();
        data.events = data.events
            .filter(event => !event.isIgnored && ignores.indexOf(event.id) === -1)
            .map(event => {
                if (resolves[event.id]) {
                    event.project = resolves[event.id];
                    event.customer = resolves[event.id].customer;
                    event.isManualMatch = true;
                }
                return event;
            });
        const errors = data.events.filter(evt => evt.error).map(evt => evt.error);
        this.setState({ data, loading: false, isConfirmed, errors });
    }
}
