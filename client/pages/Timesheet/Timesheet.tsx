import { useMutation, useQuery } from '@apollo/react-hooks';
import { AppContext } from 'AppContext';
import { HotkeyModal } from 'components';
import resource from 'i18n';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { useHistory, useParams } from 'react-router-dom';
import { ActionBar } from './ActionBar';
import { AllocationView } from './AllocationView';
import CONFIRM_PERIOD from './CONFIRM_PERIOD';
import GET_TIMESHEET from './GET_TIMESHEET';
import hotkeys from './hotkeys';
import { Overview } from './Overview';
import { SummaryView } from './SummaryView';
import styles from './Timesheet.module.scss';
import { ITimesheetContext, TimesheetContext } from './TimesheetContext';
import { reducer } from './TimesheetReducer';
import { ITimesheetParams, TimesheetPeriod, TimesheetScope } from './types';
import UNCONFIRM_PERIOD from './UNCONFIRM_PERIOD';


/**
 * @category Timesheet
 */
export const Timesheet = () => {
    const { user } = React.useContext(AppContext);
    const history = useHistory();
    const [state, dispatch] = React.useReducer(reducer, {
        periods: [],
        selectedPeriod: new TimesheetPeriod(),
        scope: new TimesheetScope(useParams<ITimesheetParams>()),
    });
    const timesheetQuery = useQuery<{ timesheet: TimesheetPeriod[] }>(GET_TIMESHEET, {
        variables: {
            ...state.scope.dateStrings,
            dateFormat: 'dddd DD',
            locale: user.userLanguage,
        },
        fetchPolicy: 'cache-and-network',
    });
    const [confirmPeriod] = useMutation<{ entries: any[]; startDateTime: string; endDateTime: string }>(CONFIRM_PERIOD);
    const [unconfirmPeriod] = useMutation<{ startDateTime: string; endDateTime: string }>(UNCONFIRM_PERIOD);

    React.useEffect(() => {
        dispatch({ type: 'DATA_UPDATED', payload: timesheetQuery });
    }, [timesheetQuery]);

    React.useEffect(() => {
        history.push(`/timesheet/${state.scope.path}`)
    }, [state.scope]);

    const onConfirmPeriod = () => {
        dispatch({ type: 'CONFIRMING_PERIOD' });
        confirmPeriod({ variables: { ...state.selectedPeriod.scope, entries: state.selectedPeriod.matchedEvents } }).then(timesheetQuery.refetch);
    }

    const onUnconfirmPeriod = () => {
        dispatch({ type: 'UNCONFIRMING_PERIOD' });
        unconfirmPeriod({ variables: state.selectedPeriod.scope }).then(timesheetQuery.refetch);
    }

    const contextValue: ITimesheetContext = React.useMemo(() => ({
        ...state,
        onConfirmPeriod,
        onUnconfirmPeriod,
        dispatch,
    }), [state]);

    const hotkeysProps = React.useMemo(() => hotkeys(contextValue, resource), [contextValue]);

    return (
        <GlobalHotKeys {...hotkeysProps}>
            <TimesheetContext.Provider value={contextValue}>
                <div className={styles.root}>
                    <ActionBar />
                    <Pivot>
                        <PivotItem
                            itemKey='overview'
                            headerText={resource('TIMESHEET.OVERVIEW_HEADER_TEXT')}
                            itemIcon='CalendarWeek'>
                            <Overview dayFormat='dddd DD' timeFormat='HH:mm' />
                        </PivotItem>
                        <PivotItem
                            itemKey='summary'
                            headerText={resource('TIMESHEET.SUMMARY_HEADER_TEXT')}
                            itemIcon='List'>
                            <SummaryView />
                        </PivotItem>
                        <PivotItem
                            itemKey='allocation'
                            headerText={resource('TIMESHEET.ALLOCATION_HEADER_TEXT')}
                            itemIcon='ReportDocument'>
                            <AllocationView />
                        </PivotItem>
                    </Pivot>
                </div>
            </TimesheetContext.Provider>
            <HotkeyModal
                {...hotkeysProps}
                isOpen={state.showHotkeysModal}
                onDismiss={() => dispatch({ type: 'TOGGLE_SHORTCUTS' })} />
        </GlobalHotKeys>
    );
}