import { useMutation, useQuery } from '@apollo/client'
import { AppContext } from 'AppContext'
import { HotkeyModal } from 'components'
import { Pivot, PivotItem } from 'office-ui-fabric'
import React, { FunctionComponent, useContext, useLayoutEffect, useMemo, useReducer } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { isEmpty } from 'underscore'
import {
  TimesheetOptions,
  TimesheetPeriodObject,
  TimesheetQuery
} from '../../../server/graphql/resolvers/types'
import { ActionBar } from './ActionBar'
import AllocationView from './AllocationView'
import { ErrorBar } from './ErrorBar'
import hotkeys from './hotkeys'
import { Overview } from './Overview'
import reducer from './reducer'
import $submitPeriod from './submitPeriod.gql'
import { SummaryView } from './SummaryView'
import $timesheet from './timesheet.gql'
import styles from './Timesheet.module.scss'
import {
  ITimesheetContext,
  ITimesheetParams,
  TimesheetContext,
  TimesheetScope,
  TimesheetView
} from './types'
import $unsubmitPeriod from './unsubmitPeriod.gql'

export const Timesheet: FunctionComponent = () => {
  const app = useContext(AppContext)
  const { t } = useTranslation()
  const history = useHistory()
  const params = useParams<ITimesheetParams>()
  const [state, dispatch] = useReducer(reducer, {
    periods: [],
    scope: isEmpty(Object.keys(params))
      ? new TimesheetScope()
      : new TimesheetScope().fromParams(params),
    selectedView: params.view || 'overview'
  })
  const query = useQuery<
    { timesheet: TimesheetPeriodObject[] },
    { query: TimesheetQuery; options: TimesheetOptions }
  >($timesheet, {
    skip: !state.scope.query(),
    variables: {
      query: state.scope.query(),
      options: {
        dateFormat: 'dddd DD',
        locale: app.user.language,
        tzOffset: new Date().getTimezoneOffset()
      }
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all'
  })

  useLayoutEffect(() => dispatch({ type: 'DATA_UPDATED', payload: { query, t, params } }), [query])

  useLayoutEffect(() => {
    if (!state.selectedPeriod) return
    history.push(['/timesheet', state.selectedView, state.selectedPeriod.path].join('/'))
  }, [state.selectedView, state.selectedPeriod])

  const [[submitPeriod], [unsubmitPeriod]] = [
    useMutation($submitPeriod),
    useMutation($unsubmitPeriod)
  ]

  const onSubmitPeriod = async (forecast: boolean) => {
    dispatch({ type: 'SUBMITTING_PERIOD', payload: { t, forecast } })
    const variables = {
      period: state.selectedPeriod.data,
      options: { forecast, tzOffset: new Date().getTimezoneOffset() }
    }
    await submitPeriod({ variables })
    query.refetch()
  }

  const onUnsubmitPeriod = async (forecast: boolean) => {
    dispatch({ type: 'UNSUBMITTING_PERIOD', payload: { t, forecast } })
    const variables = {
      period: state.selectedPeriod.data,
      options: { forecast }
    }
    await unsubmitPeriod({ variables })
    query.refetch()
  }

  const context: ITimesheetContext = useMemo(
    () => ({
      ...state,
      refetch: query.refetch,
      onSubmitPeriod,
      onUnsubmitPeriod,
      dispatch,
      t
    }),
    [state]
  )

  const hotkeysProps = useMemo(() => hotkeys(context, t), [context])

  return (
    <GlobalHotKeys {...hotkeysProps}>
      <TimesheetContext.Provider value={context}>
        <div className={styles.root}>
          <ActionBar />
          <ErrorBar error={context.error} />
          <Pivot
            defaultSelectedKey={state.selectedView}
            onLinkClick={({ props }) =>
              dispatch({
                type: 'CHANGE_VIEW',
                payload: props.itemKey as TimesheetView
              })
            }>
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
        onDismiss={() => dispatch({ type: 'TOGGLE_SHORTCUTS' })}
      />
    </GlobalHotKeys>
  )
}
