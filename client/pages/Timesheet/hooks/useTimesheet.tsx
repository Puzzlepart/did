import { useMutation } from '@apollo/client'
import React, { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { useTimesheetReducer } from '../reducer'
import { SUBMITTING_PERIOD, UNSUBMITTING_PERIOD } from '../reducer/actions'
import { ITimesheetContext, ITimesheetParams, TimesheetContext } from '../types'
import $submitPeriod from './submitPeriod.gql'
import $unsubmitPeriod from './unsubmitPeriod.gql'
import { useTimesheetQuery } from './useTimesheetQuery'

/**
 * Hook for Timesheet
 *
 * * Get history using useHistory
 * * Get URL params using useParams
 * * Using reducer from /reducer
 * * Using useTimesheetQuery with timesheet.gql
 * * Layout effects for initialiing state and updating state
 *   when the query is reloaded
 * * Returns TimesheetContextProvider with Timesheet context
 */
export function useTimesheet() {
  const { t } = useTranslation()
  const history = useHistory()
  const url = useParams<ITimesheetParams>()
  const { state, dispatch } = useTimesheetReducer({ url, t })

  const { refetch } = useTimesheetQuery(state, dispatch)

  useLayoutEffect(() => {
    if (!state.selectedPeriod) return
    history.push(['/timesheet', state.selectedView, state.selectedPeriod.path].join('/'))
  }, [state.selectedView, state.selectedPeriod])

  const [[submitPeriod], [unsubmitPeriod]] = [
    useMutation($submitPeriod),
    useMutation($unsubmitPeriod)
  ]

  const onSubmitPeriod = async (forecast: boolean) => {
    dispatch(SUBMITTING_PERIOD({ forecast }))
    const variables = {
      period: state.selectedPeriod.data,
      options: { forecast, tzOffset: new Date().getTimezoneOffset() }
    }
    await submitPeriod({ variables })
    refetch()
  }

  const onUnsubmitPeriod = async (forecast: boolean) => {
    dispatch(UNSUBMITTING_PERIOD({ forecast }))
    const variables = {
      period: state.selectedPeriod.data,
      options: { forecast }
    }
    await unsubmitPeriod({ variables })
    refetch()
  }

  const context: ITimesheetContext = useMemo(
    () => ({
      ...state,
      refetch: refetch,
      onSubmitPeriod,
      onUnsubmitPeriod,
      dispatch,
      t
    }),
    [state]
  )
  return {
    state,
    dispatch,
    context,
    onSubmitPeriod,
    onUnsubmitPeriod,
    TimesheetContextProvider: ({ children }) => (
      <TimesheetContext.Provider value={context}>
        {children}
      </TimesheetContext.Provider>
    ),
    t
  }
}
