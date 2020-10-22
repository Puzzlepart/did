import { useMutation, useQuery } from '@apollo/react-hooks'
import { AppContext } from 'AppContext'
import { HotkeyModal } from 'components'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import React, { useContext, useEffect, useMemo, useReducer } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { ActionBar } from './ActionBar'
import { AllocationView } from './AllocationView'
import { ErrorBar } from './ErrorBar'
import graphql from './graphql'
import hotkeys from './hotkeys'
import { Overview } from './Overview'
import reducer from './reducer'
import { SummaryView } from './SummaryView'
import styles from './Timesheet.module.scss'
import {
    ITimesheetContext,
    ITimesheetParams,
    ITimesheetPeriod,
    TimesheetContext,
    TimesheetPeriod,
    TimesheetScope,
    TimesheetView
} from './types'

export const Timesheet = () => {
    const app = useContext(AppContext)
    const { t } = useTranslation()
    const history = useHistory()
    const params = useParams<ITimesheetParams>()
    const [state, dispatch] = useReducer(reducer, {
        periods: [],
        selectedPeriod: new TimesheetPeriod(undefined, params),
        scope: new TimesheetScope(params),
        selectedView: params.view || 'overview'
    })
    const query = useQuery<{ timesheet: ITimesheetPeriod[] }>(graphql.query.timesheet, {
        variables: {
            ...state.scope.dateStrings,
            dateFormat: 'dddd DD',
            locale: app.user.preferredLanguage,
        },
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
    })

    useEffect(() => dispatch({
        type: 'DATA_UPDATED',
        payload: { query, t }
    }), [query])

    useEffect(() => {
        history.push(`/timesheet/${state.selectedView}/${state.selectedPeriod.path}`)
    }, [state.selectedView, state.selectedPeriod])

    const [[submitPeriod], [unsubmitPeriod]] = [
        useMutation(graphql.mutation.submitPeriod),
        useMutation(graphql.mutation.unsubmitPeriod),
    ]

    const onSubmitPeriod = async (forecast: boolean) => {
        dispatch({ type: 'SUBMITTING_PERIOD', payload: { t } })
        const variables = { 
            period: state.selectedPeriod.data,        
            forecast
        }
        await submitPeriod({ variables })
        query.refetch()
    }

    const onUnsubmitPeriod = (forecast: boolean) => {
        dispatch({ type: 'UNSUBMITTING_PERIOD', payload: { t } })
        const variables = {
             period: state.selectedPeriod.data, 
             forecast
        }
        unsubmitPeriod({ variables }).then(query.refetch)
    }

    const context: ITimesheetContext = useMemo(() => ({
        ...state,
        refetch: query.refetch,
        onSubmitPeriod,
        onUnsubmitPeriod,
        dispatch,
        t,
    }), [state])

    query.refetch

    const hotkeysProps = useMemo(() => hotkeys(context, t), [context])

    return (
        <GlobalHotKeys {...hotkeysProps}>
            <TimesheetContext.Provider value={context}>
                <div className={styles.root}>
                    <ActionBar />
                    <ErrorBar error={context.error} />
                    <Pivot
                        hidden={!context.loading && !context.selectedPeriod.isLoaded}
                        defaultSelectedKey={state.selectedView}
                        onLinkClick={({ props }) => dispatch({
                            type: 'CHANGE_VIEW',
                            payload: props.itemKey as TimesheetView
                        })}>
                        <PivotItem
                            itemKey='overview'
                            headerText={t('timesheet.overviewHeaderText')}
                            itemIcon='CalendarWeek'
                            headerButtonProps={{ disabled: !!context.error }}>
                            <Overview dayFormat='dddd DD' timeFormat='HH:mm' />
                        </PivotItem>
                        <PivotItem
                            itemKey='summary'
                            headerText={t('timesheet.summaryHeaderText')}
                            itemIcon='List'
                            headerButtonProps={{ disabled: !!context.error }}>
                            <SummaryView />
                        </PivotItem>
                        <PivotItem
                            itemKey='allocation'
                            headerText={t('timesheet.allocationHeaderText')}
                            itemIcon='ReportDocument'
                            headerButtonProps={{ disabled: !!context.error }}>
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
    )
}