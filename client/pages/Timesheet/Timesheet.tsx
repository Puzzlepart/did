//#region imports
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AppContext } from 'AppContext';
import { EventList, UserAllocation } from 'components';
import * as helpers from 'helpers';
import resource from 'i18n';
import { ITimeEntry } from 'interfaces';
import { Pivot, PivotItem, ProgressIndicator } from 'office-ui-fabric-react';
import * as React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { generateColumn as col } from 'utils/generateColumn';
import { ActionBar } from './ActionBar';
import CONFIRM_PERIOD from './CONFIRM_PERIOD';
import GET_TIMESHEET from './GET_TIMESHEET';
import ProjectColumn from './ProjectColumn';
import { StatusBar } from './StatusBar';
import { SummaryView, SummaryViewType } from './SummaryView';
import styles from './Timesheet.module.scss';
import { ITimesheetContext, TimesheetContext } from './TimesheetContext';
import hotkeys from './TimesheetHotkeys';
import { TimesheetPeriod } from './TimesheetPeriod';
import { reducer } from './TimesheetReducer';
import { TimesheetScope } from './TimesheetScope';
import { ITimesheetState } from './types';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';
///#endregion

const intialState: ITimesheetState = {
    periods: [],
    selectedPeriod: new TimesheetPeriod(),
    scope: new TimesheetScope(),
};

/**
 * @category Timesheet
 */
export const Timesheet = () => {
    const { user } = React.useContext(AppContext);
    const [state, dispatch] = React.useReducer(reducer, intialState);
    const timesheetQuery = useQuery<{ timesheet: TimesheetPeriod[] }>(GET_TIMESHEET, {
        variables: {
            ...state.scope.iso,
            dateFormat: 'dddd DD',
            locale: user.userLanguage,
        },
        fetchPolicy: 'network-only',
        skip: false
    });
    const [confirmPeriod] = useMutation<{ entries: any[]; startDateTime: string; endDateTime: string }>(CONFIRM_PERIOD);
    const [unconfirmPeriod] = useMutation<{ startDateTime: string; endDateTime: string }>(UNCONFIRM_PERIOD);

    React.useEffect(() => dispatch({
        type: 'DATA_UPDATED',
        payload: timesheetQuery,
    }), [timesheetQuery]);

    const onConfirmPeriod = () => {
        dispatch({ type: 'CONFIRMING_PERIOD' });
        const variables = {
            ...state.selectedPeriod.scope,
            entries: state.selectedPeriod.matchedEvents,
        };
        confirmPeriod({ variables }).then(timesheetQuery.refetch);
    }

    const onUnconfirmPeriod = () => {
        dispatch({ type: 'UNCONFIRMING_PERIOD' });
        unconfirmPeriod({ variables: state.selectedPeriod.scope }).then(timesheetQuery.refetch);
    }

    const contextValue: ITimesheetContext = React.useMemo(() => ({ state, dispatch }), [state]);

    return (
        <GlobalHotKeys {...hotkeys(contextValue)}>
            <TimesheetContext.Provider value={contextValue}>
                <div className={styles.root}>
                    <ActionBar {...{ onConfirmPeriod, onUnconfirmPeriod }} />
                    <Pivot>
                        <PivotItem
                            itemKey='overview'
                            headerText={resource('TIMESHEET.OVERVIEW_HEADER_TEXT')}
                            itemIcon='CalendarWeek'>
                            <div>
                                <StatusBar />
                                {state.loading && <ProgressIndicator {...state.loading} />}
                                <EventList
                                    enableShimmer={!!state.loading}
                                    events={state.selectedPeriod.events.filter(e => e.durationMinutes > 0)}
                                    showEmptyDays={state.periods.length === 1}
                                    dateFormat={'HH:mm'}
                                    groups={{
                                        fieldName: 'date',
                                        groupNames: state.scope.weekdays('dddd DD'),
                                        totalFunc: (items: ITimeEntry[]) => {
                                            const totalMins = items.reduce((sum, i) => sum = i.durationMinutes, 0);
                                            return ` (${helpers.getDurationDisplay(totalMins)})`;
                                        },
                                    }}
                                    additionalColumns={[
                                        col(
                                            'project',
                                            resource('COMMON.PROJECT'),
                                            { minWidth: 350, maxWidth: 350 },
                                            (event: ITimeEntry) => <ProjectColumn event={event} />
                                        ),
                                    ]} />
                            </div>
                        </PivotItem>
                        <PivotItem
                            itemKey='summary'
                            headerText={resource('TIMESHEET.SUMMARY_HEADER_TEXT')}
                            itemIcon='List'>
                            <SummaryView type={SummaryViewType.UserWeek} />
                        </PivotItem>
                        <PivotItem
                            itemKey='allocation'
                            headerText={resource('TIMESHEET.ALLOCATION_HEADER_TEXT')}
                            itemIcon='ReportDocument'>
                            <UserAllocation
                                entries={state.selectedPeriod.events}
                                charts={{
                                    'project.name': resource('TIMESHEET.ALLOCATION_PROJECT_CHART_TITLE'),
                                    'customer.name': resource('TIMESHEET.ALLOCATION_CUSTOMER_CHART_TITLE'),
                                }} />
                        </PivotItem>
                    </Pivot>
                </div>
            </TimesheetContext.Provider>
        </GlobalHotKeys>
    );
}