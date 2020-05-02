
import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import EventList from 'common/components/EventList';
import { UserAllocation } from 'components/UserAllocation';
import * as helpers from 'helpers';
import resource from 'i18n';
import { ITimeEntry, IProject } from 'interfaces';
import * as moment from 'moment';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import _ from 'underscore';
import { ActionBar } from './ActionBar';
import GET_TIMESHEET from './GET_TIMESHEET';
import { StatusBar } from './StatusBar';
import { SummaryView, SummaryViewType } from './SummaryView';
import { TimesheetPeriod } from './TimesheetPeriod';
import { ITimesheetProps, ITimesheetScope, TimesheetView } from './types';
import { FetchPolicy } from 'graphql';

/**
 * Make scope
 * 
 * 
 * 
 * @param {ITimesheetScope} scope Scope
 */
// TODO: Comment and fix
const makeScope = (scope: ITimesheetScope) => {
    if (!scope.startDateTime) scope.startDateTime = helpers.startOfWeek(scope.startDateTime ? scope.startDateTime.toISOString() : undefined);
    if (!scope.endDateTime) scope.endDateTime = helpers.endOfWeek(scope.startDateTime ? scope.startDateTime.toISOString() : undefined);
    return scope;
}

export const Timesheet = (props: ITimesheetProps) => {
    const [options] = React.useState<QueryHookOptions>({ fetchPolicy: 'network-only', skip: false });
    const [scope, setScope] = React.useState<ITimesheetScope>(makeScope({}));
    const { key: startDateTime } = useParams<{ key: string }>();
    const { loading, data } = useQuery(GET_TIMESHEET, {
        variables: {
            ...scope,
            dateFormat: 'dddd DD',
        },
        ...options,
    });

    const periods: TimesheetPeriod[] = data ? data.timesheet.map(period => new TimesheetPeriod(period)) : [new TimesheetPeriod()];
    const [selectedPeriodId, setSelectedPeriodId] = React.useState<string>();


    let selectedPeriod = _.find(periods, p => p.id === selectedPeriodId) || _.first(periods) || new TimesheetPeriod();

    const onChangeScope = (scope: ITimesheetScope) => setScope(scope);

    React.useEffect(() => setScope(makeScope({ startDateTime: startDateTime && moment(startDateTime) })), [startDateTime]);

    const onConfirmPeriod = () => {
        //TODO: Mutation
    }

    const onUnconfirmPeriod = () => {
        //TODO: Mutation
    }

    const onManualMatch = (event: ITimeEntry, project: IProject) => {
        selectedPeriod.setManualMatch(event.id, project);
    }

    const onClearManualMatch = (event: ITimeEntry) => {
        selectedPeriod.clearManualMatch(event.id);
    }

    const onIgnoreEvent = (event: ITimeEntry) => {
        selectedPeriod.ignoreEvent(event.id);
    }

    const onClearIgnores = () => {
        selectedPeriod.clearIgnoredEvents();
    }

    return (
        <div className='c-Timesheet'>
            <ActionBar
                timesheet={{ scope, loading, periods }}
                selectedPeriod={selectedPeriod}
                onChangeScope={onChangeScope}
                onChangePeriod={periodId => setSelectedPeriodId(periodId)}
                onConfirmPeriod={onConfirmPeriod}
                onUnconfirmPeriod={onUnconfirmPeriod} />
            <Pivot onLinkClick={item => this.setState({ selectedView: item.props.itemKey as TimesheetView })}>
                <PivotItem itemKey='overview' headerText={resource('TIMESHEET.OVERVIEW_HEADER_TEXT')} itemIcon='CalendarWeek'>
                    <div className='c-Timesheet-overview'>
                        <StatusBar
                            timesheet={{ scope, loading, periods }}
                            selectedPeriod={selectedPeriod}
                            onClearIgnores={onClearIgnores} />
                        {loading && <ProgressIndicator />}
                        <EventList
                            enableShimmer={loading}
                            events={selectedPeriod.events}
                            showEmptyDays={periods.length === 1}
                            dateFormat={'HH:mm'}
                            groups={{
                                fieldName: 'date',
                                groupNames: helpers.getWeekdays(scope.startDateTime, 'dddd DD'),
                                totalFunc: (items: ITimeEntry[]) => {
                                    let totalMins = items.reduce((sum, i) => sum += i.durationMinutes, 0);
                                    return ` (${helpers.getDurationDisplay(totalMins)})`;
                                },
                            }}
                            projectColumn={{
                                isLocked: selectedPeriod.isConfirmed,
                                onManualMatch,
                                onClearManualMatch,
                                onIgnoreEvent,
                            }} />
                    </div>
                </PivotItem>
                <PivotItem itemKey='summary' headerText={resource('TIMESHEET.SUMMARY_HEADER_TEXT')} itemIcon='List'>
                    <SummaryView
                        events={selectedPeriod.events}
                        enableShimmer={loading}
                        scope={scope}
                        type={SummaryViewType.UserWeek} />
                </PivotItem>
                <PivotItem itemKey='allocation' headerText={resource('TIMESHEET.ALLOCATION_HEADER_TEXT')} itemIcon='ReportDocument'>
                    <UserAllocation
                        entries={selectedPeriod.events}
                        charts={{
                            'project.name': resource('TIMESHEET.ALLOCATION_PROJECT_CHART_TITLE'),
                            'customer.name': resource('TIMESHEET.ALLOCATION_CUSTOMER_CHART_TITLE'),
                        }} />
                </PivotItem>
            </Pivot>
        </div>
    );
}