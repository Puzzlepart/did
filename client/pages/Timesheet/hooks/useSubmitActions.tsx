/* eslint-disable tsdoc/syntax */
import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { SUBMITTING_PERIOD, UNSUBMITTING_PERIOD } from '../reducer/actions'
import $submitPeriod from './submitPeriod.gql'
import $unsubmitPeriod from './unsubmitPeriod.gql'

export type UseSubmitActionsHook = ReturnType<typeof useSubmitActions>

/**
 * Hook for Timesheet submit actions
 *
 * @category Timesheet Hooks
 */
export function useSubmitActions({ state, dispatch, refetch }) {
  const app = useAppContext()

  const [[submitPeriod], [unsubmitPeriod]] = [
    useMutation($submitPeriod),
    useMutation($unsubmitPeriod)
  ]

  const onSubmitPeriod = async (forecast: boolean): Promise<void> => {
    dispatch(SUBMITTING_PERIOD({ forecast }))
    const variables = {
      period: state.selectedPeriod.data,
      options: { forecast, tzOffset: new Date().getTimezoneOffset() }
    }
    await submitPeriod({ variables })
    refetch()
    app.notifications.refetch(250)
  }

  const onUnsubmitPeriod = async (forecast: boolean): Promise<void> => {
    dispatch(UNSUBMITTING_PERIOD({ forecast }))
    const variables = {
      period: state.selectedPeriod.data,
      options: { forecast }
    }
    await unsubmitPeriod({ variables })
    refetch()
    app.notifications.refetch(250)
  }

  return {
    onSubmitPeriod,
    onUnsubmitPeriod
  }
}
