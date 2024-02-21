/* eslint-disable unicorn/prevent-abbreviations */

import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useCallback } from 'react'
import { ITimesheetContext } from '../context'
import { SUBMITTING_PERIOD, UNSUBMITTING_PERIOD } from '../reducer/actions'
import { SubmitPeriodOptions } from '../types'
import $submitPeriod from './submitPeriod.gql'
import $unsubmitPeriod from './unsubmitPeriod.gql'

/**
 * Timesheet submit action callbacks using `React.useCallback`.
 *
 * - `onSubmitPeriod` - Submits the selected period with the given forecast flag and updates the state accordingly.
 * - `onUnsubmitPeriod` - Unsubmits the selected period with the given forecast flag and updates the state accordingly.
 *
 * @param context - The context object containing the state and dispatch function.
 *
 * @category Timesheet Hooks
 */
export function useSubmitActions({
  state,
  dispatch,
  refetch
}: Partial<ITimesheetContext>) {
  const appContext = useAppContext()
  const [submitPeriod] = useMutation($submitPeriod)
  const [unsubmitPeriod] = useMutation($unsubmitPeriod)

  /**
   * Submits the selected period with the given forecast flag and updates the state accordingly.
   *
   * @param options - The options for submitting the period.
   */
  const onSubmitPeriod = useCallback(
    async (options: SubmitPeriodOptions): Promise<void> => {
      dispatch(SUBMITTING_PERIOD({ forecast: options.forecast }))
      const variables = {
        period: state.selectedPeriod.data,
        options: { ...options, tzOffset: new Date().getTimezoneOffset() }
      }
      await submitPeriod({ variables })
      refetch()
      appContext.notifications.refetch(250)
    },
    [state.selectedPeriod]
  )

  /**
   * Callback function to unsubmit a period.
   *
   * @param options - The options for unsubmitting the period.
   */
  const onUnsubmitPeriod = useCallback(
    async (options: SubmitPeriodOptions): Promise<void> => {
      dispatch(UNSUBMITTING_PERIOD({ forecast: options.forecast }))
      const variables = {
        period: state.selectedPeriod.data,
        options
      }
      await unsubmitPeriod({ variables })
      refetch()
      appContext.notifications.refetch(250)
    },
    [state.selectedPeriod]
  )

  return {
    onSubmitPeriod,
    onUnsubmitPeriod
  }
}
