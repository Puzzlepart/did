import { useMutation, useQuery } from '@apollo/client'
import { AppContext } from 'AppContext'
import React, { useContext, useLayoutEffect, useMemo } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import {
  TimesheetOptions,
  TimesheetPeriodObject,
  TimesheetQuery
} from 'types'
import hotkeys from './hotkeys'
import { useTimesheetReducer } from './reducer'
import $submitPeriod from './submitPeriod.gql'
import $timesheet from './timesheet.gql'
import {
  ITimesheetContext,
  ITimesheetParams,
  TimesheetContext
} from './types'
import $unsubmitPeriod from './unsubmitPeriod.gql'

export function useTimesheet() {
  const app = useContext(AppContext)
  const { t } = useTranslation()
  const history = useHistory()
  const url = useParams<ITimesheetParams>()
  const { state, dispatch } = useTimesheetReducer({ url, t })
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

  useLayoutEffect(() => dispatch({ type: 'DATA_UPDATED', payload: { query, t, params: url } }), [query])

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

  return {
    state,
    dispatch,
    context,
    onSubmitPeriod,
    onUnsubmitPeriod,
    hotkeysProps,
    TimesheetContextProvider: ({ children }) => (
      <GlobalHotKeys {...hotkeysProps}>
        <TimesheetContext.Provider value={context}>
          {children}
        </TimesheetContext.Provider>
      </GlobalHotKeys>
    ),
    t
  }
}
