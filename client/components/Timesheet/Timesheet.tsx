
import { useMutation, useQuery } from '@apollo/react-hooks';
import EventList from 'common/components/EventList';
import { UserAllocation } from 'components/UserAllocation';
import * as helpers from 'helpers';
import resource from 'i18n';
import { IProject, ITimeEntry } from 'interfaces';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ProgressIndicator, IProgressIndicatorProps } from 'office-ui-fabric-react/lib/ProgressIndicator';
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
import { TimesheetContext } from './TimesheetContext';

export const Timesheet = () => {
    const history = useHistory();
    const params = useParams<{ startDateTime: string; view: TimesheetView }>();
    const [loading, setLoading] = React.useState<IProgressIndicatorProps>({});
    const [scope, setScope] = React.useState<TimesheetScope>(new TimesheetScope());
    const [periods, setPeriods] = React.useState<TimesheetPeriod[]>([]);
    const [selectedPeriodId, setSelectedPeriodId] = React.useState<string>();
    const timesheetQuery = useQuery<{ timesheet: TimesheetPeriod[] }>(GET_TIMESHEET, {
        variables: {
            ...scope.iso,
            dateFormat: 'dddd DD',
        },
        fetchPolicy: 'network-only',
        skip: false
    });
    const [confirmPeriod] = useMutation<{ entries: any[]; startDateTime: string; endDateTime: string }>(CONFIRM_PERIOD);
    const [unconfirmPeriod] = useMutation<{ startDateTime: string; endDateTime: string }>(UNCONFIRM_PERIOD);

    React.useEffect(() => {
        setLoading(timesheetQuery.loading ? { label: 'Loading events', description: 'Please wait...' } : null);
        if (timesheetQuery.data) setPeriods(timesheetQuery.data.timesheet.map(period => new TimesheetPeriod(period)));
    }, [timesheetQuery]);

    const selectedPeriod = React.useMemo(() => _.find(periods, p => p.id === selectedPeriodId) || _.first(periods) || new TimesheetPeriod(), [periods, selectedPeriodId]);

    React.useEffect(() => setScope(new TimesheetScope(params.startDateTime)), [params.startDateTime]);

    const onConfirmPeriod = async () => {
        setLoading({ label: 'Confirming period', description: 'Hang on a minute...' });
        await confirmPeriod({ variables: { ...selectedPeriod.scope, entries: selectedPeriod.matchedEvents } });
        timesheetQuery.refetch();
    }

    const onUnconfirmPeriod = async () => {
        setLoading({ label: 'Unconfirming period', description: 'Hang on a minute...' });
        await unconfirmPeriod({ variables: selectedPeriod.scope });
        timesheetQuery.refetch();
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
        <TimesheetContext.Provider value={{ periods, selectedPeriod, scope, loading: !!loading }}>
            <div className='c-Timesheet'>
                <ActionBar
                    onChangePeriod={periodId => setSelectedPeriodId(periodId)}
                    onConfirmPeriod={onConfirmPeriod}
                    onUnconfirmPeriod={onUnconfirmPeriod} />
                <Pivot defaultSelectedKey={params.view} onLinkClick={item => history.push(`/timesheet/${item.props.itemKey}/${scope.iso.startDateTime}`)}>
                    <PivotItem itemKey='overview' headerText={resource('TIMESHEET.OVERVIEW_HEADER_TEXT')} itemIcon='CalendarWeek'>
                        <div className='c-Timesheet-overview'>
                            <StatusBar onClearIgnores={onClearIgnores} />
                            {loading && <ProgressIndicator {...loading} />}
                            <EventList
                                enableShimmer={!!loading}
                                events={selectedPeriod.events.filter(e => e.durationMinutes > 0)}
                                showEmptyDays={periods.length === 1}
                                dateFormat={'HH:mm'}
                                groups={{
                                    fieldName: 'date',
                                    groupNames: scope.weekdays('dddd DD'),
                                    totalFunc: (items: ITimeEntry[]) => {
                                        const totalMins = items.reduce((sum, i) => sum += i.durationMinutes, 0);
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