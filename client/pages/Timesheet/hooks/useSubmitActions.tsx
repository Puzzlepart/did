/* eslint-disable unicorn/prevent-abbreviations */

import { ApolloQueryResult, useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { Dispatch, useCallback } from 'react'
import { AnyAction } from 'redux'
import { SUBMITTING_PERIOD, UNSUBMITTING_PERIOD } from '../reducer/actions'
import { ITimesheetState } from '../types/ITimesheetState'
import $submitPeriod from './submitPeriod.gql'
import $unsubmitPeriod from './unsubmitPeriod.gql'

/**
 * Parameters type for `useSubmitActions`
 *
 * @category Timesheet Hooks
 */
export type UseSubmitActionsParams = {
  state: ITimesheetState
  dispatch: Dispatch<AnyAction>
  refetch: () => Promise<ApolloQueryResult<any>>
}

/**
 * Timesheet submit action callbacks using `React.useCallback`
 *
 * @category Timesheet Hooks
 */
export function useSubmitActions({
  state,
  dispatch,
  refetch
}: UseSubmitActionsParams) {
  const app = useAppContext()

  const [submitPeriod] = useMutation($submitPeriod)
  const [unsubmitPeriod] = useMutation($unsubmitPeriod)

  const onSubmitPeriod = useCallback(
    async (forecast: boolean): Promise<void> => {
      dispatch(SUBMITTING_PERIOD({ forecast }))
      const variables = {
        period: state.selectedPeriod.data,
        options: { forecast, tzOffset: new Date().getTimezoneOffset() }
      }
      await submitPeriod({ variables })
      refetch()
      app.notifications.refetch(250)
    },
    [state.selectedPeriod]
  )

  const onUnsubmitPeriod = useCallback(
    async (forecast: boolean): Promise<void> => {
      dispatch(UNSUBMITTING_PERIOD({ forecast }))
      const variables = {
        period: state.selectedPeriod.data,
        options: { forecast }
      }
      await unsubmitPeriod({ variables })
      refetch()
      app.notifications.refetch(250)
    },
    [state.selectedPeriod]
  )

  return {
    onSubmitPeriod,
    onUnsubmitPeriod
  }
}
