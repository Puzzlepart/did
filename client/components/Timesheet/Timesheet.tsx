
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
import { TimesheetContext } from './TimesheetContext';
import { TimesheetPeriod } from './TimesheetPeriod';
import { TimesheetScope } from './TimesheetScope';
import { ITimesheetState, TimesheetView } from './types';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';

function reducer(state: ITimesheetState, action: { type: string; payload: any }): any {
    // eslint-disable-next-line prefer-const
    let newState = { ...state };
    switch (action.type) {
        case 'DATA_UPDATED': {
            newState.loading = action.payload.loading ? { label: 'Loading events', description: 'Please wait...' } : null
            if (action.payload.data) {
                newState.periods = action.payload.data.timesheet.map(period => new TimesheetPeriod(period));
            }
        }
            break;
        case 'CONFIRMING_PERIOD': {
            newState.loading = { label: 'Confirming period', description: 'Hang on a minute...' };
        }
            break;
        case 'UNCONFIRMING_PERIOD': {
            newState.loading = { label: 'Unconfirming period', description: 'Hang on a minute...' };
        }
            break;
        case 'UPDATE_SCOPE': {
            newState.scope = new TimesheetScope(action.payload);
        }
            break;
        case 'CHANGE_PERIOD': {
            newState.selectedPeriodId = action.payload;
        }
            break;
        case 'MANUAL_MATCH': {
            const { selectedPeriod, event, project } = action.payload;
            selectedPeriod.setManualMatch(event.id, project);
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriodId ? selectedPeriod : p);
        }
            break;
        case 'CLEAR_MANUAL_MATCH': {
            const { selectedPeriod, event } = action.payload;
            selectedPeriod.clearManualMatch(event.id);
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriodId ? selectedPeriod : p);
        }
            break;
        case 'IGNORE_EVENT': {
            const { selectedPeriod, event } = action.payload;
            selectedPeriod.ignoreEvent(event.id);
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriodId ? selectedPeriod : p);
        }
            break;
        case 'CLEAR_IGNORES': {
            const { selectedPeriod } = action.payload;
            selectedPeriod.clearIgnoredEvents();
            newState.periods = newState.periods.map(p => p.id === newState.selectedPeriodId ? selectedPeriod : p);
        }
            break;
        default: throw new Error();
    }
    if (newState.periods.length > 0) {
        newState.selectedPeriod = _.find(newState.periods, (p: TimesheetPeriod) => p.id === newState.selectedPeriodId) || _.first(newState.periods);
    }
    return newState;
}

const intialState = {
    loading: null,
    periods: [],
    selectedPeriodId: null,
    selectedPeriod: new TimesheetPeriod(),
    scope: new TimesheetScope(),
};

export const Timesheet = () => {
    const history = useHistory();
    const params = useParams<{ startDateTime: string; view: TimesheetView }>();
    const [{ loading, periods, selectedPeriod, scope }, dispatch]: any = React.useReducer<any>(reducer, intialState);
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


    React.useEffect(() => dispatch({ type: 'DATA_UPDATED', payload: timesheetQuery }), [timesheetQuery])
    React.useEffect(() => dispatch({ type: 'UPDATE_SCOPE', payload: params.startDateTime }), [params.startDateTime]);

    const onConfirmPeriod = async () => {
        dispatch({ type: 'CONFIRMING_PERIOD' });
        await confirmPeriod({ variables: { ...selectedPeriod.scope, entries: selectedPeriod.matchedEvents } });
        timesheetQuery.refetch();
    }

    const onUnconfirmPeriod = async () => {
        dispatch({ type: 'UNCONFIRMING_PERIOD' });
        await unconfirmPeriod({ variables: selectedPeriod.scope });
        timesheetQuery.refetch();
    }

    const onManualMatch = (event: ITimeEntry, project: IProject) => dispatch({ type: 'MANUAL_MATCH', payload: { selectedPeriod, event, project } });
    const onClearManualMatch = (event: ITimeEntry) => dispatch({ type: 'CLEAR_MANUAL_MATCH', payload: { selectedPeriod, event } });
    const onIgnoreEvent = (event: ITimeEntry) => dispatch({ type: 'IGNORE_EVENT', payload: { selectedPeriod, event } });
    const onClearIgnores = () => dispatch({ type: 'CLEAR_IGNORES', payload: { selectedPeriod } });

    return (
        <TimesheetContext.Provider value={{ periods, selectedPeriod, scope, loading: !!loading }}>
            <div className='c-Timesheet'>
                <ActionBar
                    onChangePeriod={periodId => dispatch({ type: 'CHANGE_PERIOD', payload: periodId })}
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