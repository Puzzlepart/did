import { useMutation, useQuery } from '@apollo/react-hooks'
import { HotkeyModal } from 'components'
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot'
import React, { useContext, useEffect, useMemo, useReducer } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { ActionBar } from './ActionBar'
import { AllocationView } from './AllocationView'
import hotkeys from './hotkeys'
import { Overview } from './Overview'
import reducer from './reducer'
import { SummaryView } from './SummaryView'
import styles from './Timesheet.module.scss'
import { ITimesheetContext, ITimesheetParams, ITimesheetPeriod, TimesheetContext, TimesheetPeriod, TimesheetScope, TimesheetView } from './types'
import graphql from './graphql'
import { AppContext } from 'AppContext'

/**
 * @category Timesheet
 */
export const Timesheet = () => {
    const context = useContext(AppContext)
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
            locale: context.user.preferredLanguage,
        },
        fetchPolicy: 'network-only',
    })

    useEffect(() => { dispatch({ type: 'DATA_UPDATED', payload: { query, t } }) }, [query])

    useEffect(() => { history.push(`/timesheet/${state.selectedView}/${state.selectedPeriod.path}`) }, [state.selectedView, state.selectedPeriod])

    const [[confirmPeriod], [unconfirmPeriod]] = [
        useMutation(graphql.mutation.confirmPeriod),
        useMutation(graphql.mutation.unconfirmPeriod)
    ]

    const onConfirmPeriod = () => {
        dispatch({ type: 'CONFIRMING_PERIOD', payload: { t } })
        const variables = { period: state.selectedPeriod.data }
        confirmPeriod({ variables }).then(query.refetch)
    }

    const onUnconfirmPeriod = () => {
        dispatch({ type: 'UNCONFIRMING_PERIOD', payload: { t } })
        const variables = { period: state.selectedPeriod.data }
        unconfirmPeriod({ variables }).then(query.refetch)
    }

    const ctx: ITimesheetContext = useMemo(() => ({
        ...state,
        onConfirmPeriod,
        onUnconfirmPeriod,
        dispatch,
    }), [state])

    const hotkeysProps = useMemo(() => hotkeys(ctx, t), [ctx])

    return (
        <GlobalHotKeys {...hotkeysProps}>
            <TimesheetContext.Provider value={ctx}>
                <div className={styles.root}>
                    <ActionBar />
                    <Pivot
                        defaultSelectedKey={state.selectedView}
                        onLinkClick={({ props }) => dispatch({
                            type: 'CHANGE_VIEW',
                            payload: props.itemKey as TimesheetView
                        })}>
                        <PivotItem
                            itemKey='overview'
                            headerText={t('timesheet.overviewHeaderText')}
                            itemIcon='CalendarWeek'>
                            <Overview dayFormat='dddd DD' timeFormat='HH:mm' />
                        </PivotItem>
                        <PivotItem
                            itemKey='summary'
                            headerText={t('timesheet.summaryHeaderText')}
                            itemIcon='List'>
                            <SummaryView />
                        </PivotItem>
                        <PivotItem
                            itemKey='allocation'
                            headerText={t('timesheet.allocationHeaderText')}
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
    )
}