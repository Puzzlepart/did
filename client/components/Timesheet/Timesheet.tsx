
import { useMutation, useQuery } from '@apollo/react-hooks';
import EventList from 'common/components/EventList';
import { UserAllocation } from 'components/UserAllocation';
import * as helpers from 'helpers';
import resource from 'i18n';
import { IProject, ITimeEntry } from 'interfaces';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import * as React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'underscore';
import { ActionBar } from './ActionBar';
import CONFIRM_PERIOD from './CONFIRM_PERIOD';
import GET_TIMESHEET from './GET_TIMESHEET';
import { StatusBar } from './StatusBar';
import { SummaryView, SummaryViewType } from './SummaryView';
import { TimesheetPeriod } from './TimesheetPeriod';
import { TimesheetScope } from './TimesheetScope';
import { TimesheetView } from './types';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';

export const TimesheetContext = React.createContext<{ selectedPeriod?: TimesheetPeriod, loading?: boolean, scope?: TimesheetScope, periods?: TimesheetPeriod[] }>({});

export const Timesheet = () => {
    const history = useHistory();
    const params = useParams<{ startDateTime: string, view: TimesheetView }>();

    const [scope, setScope] = React.useState<TimesheetScope>(new TimesheetScope());
    const [periods, setPeriods] = React.useState<TimesheetPeriod[]>([]);
    const [selectedPeriodId, setSelectedPeriodId] = React.useState<string>();
    const { loading, data } = useQuery<{ timesheet: TimesheetPeriod[] }>(GET_TIMESHEET, {
        variables: {
            ...scope.iso,
            dateFormat: 'dddd DD',
        },
        fetchPolicy: 'network-only',
        skip: false
    });
    const [] = useMutation(CONFIRM_PERIOD);
    const [] = useMutation(UNCONFIRM_PERIOD);

    React.useEffect(() => {
        if (data) setPeriods(data.timesheet.map(period => new TimesheetPeriod(period)));
    }, [data]);


    let selectedPeriod = _.find(periods, p => p.id === selectedPeriodId) || _.first(periods) || new TimesheetPeriod();

    React.useEffect(() => setScope(new TimesheetScope(params.startDateTime)), [params.startDateTime]);

    const onConfirmPeriod = () => {
        //TODO: Mutation
    }

    const onUnconfirmPeriod = () => {
        //TODO: Mutation
    }

    const onManualMatch = (event: ITimeEntry, project: IProject) => {
        selectedPeriod.setManualMatch(event.id, project);
        setPeriods([...periods].map(p => p.id === selectedPeriodId ? selectedPeriod : p));
    }

    const onClearManualMatch = (event: ITimeEntry) => {
        selectedPeriod.clearManualMatch(event.id);
        setPeriods([...periods].map(p => p.id === selectedPeriodId ? selectedPeriod : p));
    }

    const onIgnoreEvent = (event: ITimeEntry) => {
        selectedPeriod.ignoreEvent(event.id);
        setPeriods([...periods].map(p => p.id === selectedPeriodId ? selectedPeriod : p));
    }

    const onClearIgnores = () => {
        selectedPeriod.clearIgnoredEvents();
        setPeriods([...periods].map(p => p.id === selectedPeriodId ? selectedPeriod : p));
    }

    return (
        <TimesheetContext.Provider value={{ periods, selectedPeriod, scope, loading }}>
            <div className='c-Timesheet'>
                <ActionBar
                    onChangePeriod={periodId => setSelectedPeriodId(periodId)}
                    onConfirmPeriod={onConfirmPeriod}
                    onUnconfirmPeriod={onUnconfirmPeriod} />
                <Pivot defaultSelectedKey={params.view} onLinkClick={item => history.push(`/timesheet/${item.props.itemKey}/${scope.iso.startDateTime}`)}>
                    <PivotItem itemKey='overview' headerText={resource('TIMESHEET.OVERVIEW_HEADER_TEXT')} itemIcon='CalendarWeek'>
                        <div className='c-Timesheet-overview'>
                            <StatusBar onClearIgnores={onClearIgnores} />
                            {loading && <ProgressIndicator />}
                            <EventList
                                enableShimmer={loading}
                                events={selectedPeriod.events}
                                showEmptyDays={periods.length === 1}
                                dateFormat={'HH:mm'}
                                groups={{
                                    fieldName: 'date',
                                    groupNames: scope.weekdays('dddd DD'),
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
                        <SummaryView type={SummaryViewType.UserWeek} />
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
        </TimesheetContext.Provider>
    );
}