
import EventList from 'common/components/EventList';
import { UserAllocation } from 'components/UserAllocation';
import * as hlp from 'helpers';
import resource from 'i18n';
import { IProject, ITimeEntry } from 'interfaces';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import _ from 'underscore';
import { client as graphql, FetchPolicy } from '../../graphql';
import { ActionBar } from './ActionBar';
import CONFIRM_PERIOD from './CONFIRM_PERIOD';
import GET_TIMESHEET from './GET_TIMESHEET';
import { StatusBar } from './StatusBar';
import { SummaryView, SummaryViewType } from './SummaryView';
import { TimesheetPeriod } from './TimesheetPeriod';
import { ITimesheetProps, ITimesheetScope, ITimesheetState, TimesheetView } from './types';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';

/**
 * @category Timesheet
 */
export class Timesheet extends React.Component<ITimesheetProps, ITimesheetState> {
    public static defaultProps: Partial<ITimesheetProps> = { groupHeaderDateFormat: 'dddd DD' };

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
                                        onClearIgnores={this._clearIgnoredEvents.bind(this)} />
                                    {loading && <ProgressIndicator />}
                                    <EventList
                                        enableShimmer={loading}
                                        events={this._selectedPeriod.events}
                                        showEmptyDays={periods.length === 1}
                                        dateFormat={'HH:mm'}
                                        groups={{
                                            fieldName: 'date',
                                            groupNames: hlp.getWeekdays(scope.startDateTime, this.props.groupHeaderDateFormat),
                                            totalFunc: (items: ITimeEntry[]) => {
                                                let totalMins = items.reduce((sum, i) => sum += i.durationMinutes, 0);
                                                return ` (${hlp.getDurationDisplay(totalMins)})`;
                                            },
                                        }}
                                        projectColumn={{
                                            isLocked: this._selectedPeriod.isConfirmed,
                                            onManualMatch: this._onManualMatch.bind(this),
                                            onClearManualMatch: this._onClearManualMatch.bind(this),
                                            onIgnoreEvent: this._onIgnoreEvent.bind(this),
                                        }} />
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
    private get _selectedPeriod(): TimesheetPeriod {
        let selectedPeriod = _.find([...this.state.periods], period => period.id === this.state.selectedPeriodId);
        return selectedPeriod ? selectedPeriod : new TimesheetPeriod();
    }

    /**
     * Create scope
     * 
     * Calculates {startDateTime} and {endDateTime}
     * 
     * @param {ITimesheetScope} scope Scope
     */
    private _createScope(scope: ITimesheetScope = {}): ITimesheetScope {
        if (!scope.startDateTime) scope.startDateTime = hlp.startOfWeek(hlp.parseUrlHash<any>().week);
        if (!scope.endDateTime) scope.endDateTime = hlp.endOfWeek(scope.startDateTime || hlp.parseUrlHash<any>().week);
        return scope;
    }

    /**
    * On change scope (passing empty object defaults to current week)
    *
    * @param {ITimesheetScope} scope Scope
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
    * @param {string} periodId Period id
     */
    private _onChangePeriod(periodId: string) {
        this.setState({ selectedPeriodId: periodId });
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
        this._selectedPeriod.clearManualMatch(event.id);
        this.setState(prevState => {
            return {
                periods: prevState.periods.map(p => {
                    if (p.id === this._selectedPeriod.id) {
                        let events = p.events.map(e => {
                            if (e.id === event.id) {
                                e.project = null;
                                e.customer = null;
                                e.isManualMatch = false;
                            }
                            return e;
                        })
                        return new TimesheetPeriod({ ...p, events });
                    }
                    return p;
                }),
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
        this._selectedPeriod.saveManualMatch(event.id, project);
        this.setState(prevState => {
            return {
                periods: prevState.periods.map(p => {
                    if (p.id === this._selectedPeriod.id) {
                        let events = p.events.map(e => {
                            if (e.id === event.id) {
                                e.project = project;
                                e.customer = project.customer;
                                e.isManualMatch = true;
                            }
                            return e;
                        })
                        return new TimesheetPeriod({ ...p, events });
                    }
                    return p;
                }),
            }
        });
    }

    /**
     * On ignore event
     *
    * @param {ITimeEntry} event Event
    */
    private _onIgnoreEvent(event: ITimeEntry) {
        this._selectedPeriod.storeIgnoredEvent(event.id);
        this.setState(prevState => {
            return {
                periods: prevState.periods.map(p => {
                    if (p.id === this._selectedPeriod.id) {
                        let events = p.events.filter(e => e.id !== event.id);
                        return new TimesheetPeriod({ ...p, events });
                    }
                    return p;
                }),
            }
        });
    }

    /**
     * Clear ignored events from browser storage
     */
    private _clearIgnoredEvents() {
        this._selectedPeriod.clearIgnoredEvents();
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
    private async _getData(skipLoading: boolean = true, fetchPolicy: FetchPolicy = 'network-only'): Promise<TimesheetPeriod> {
        if (!skipLoading) this.setState({ loading: true });
        const variables = {
            startDateTime: this.state.scope.startDateTime.toISOString(),
            endDateTime: this.state.scope.endDateTime.toISOString(),
            dateFormat: this.props.groupHeaderDateFormat,
        };
        let { data: { timesheet } } = await graphql.query<{ timesheet: Partial<TimesheetPeriod>[] }>({
            query: GET_TIMESHEET,
            variables,
            fetchPolicy,
        });
        const periods = timesheet.map(period => new TimesheetPeriod(period));

        this.setState({ periods, loading: false });
        return periods[0];
    }
}
