import { useMutation } from '@apollo/client'
import { AppContext } from 'AppContext'
import { useContext } from 'react'
import { SUBMITTING_PERIOD, UNSUBMITTING_PERIOD } from '../reducer/actions'
import $submitPeriod from './submitPeriod.gql'
import $unsubmitPeriod from './unsubmitPeriod.gql'

/**
 * Hook for Timesheet submit actions
 */
export function useSubmitActions({ state, dispatch, refetch }) {
  const app = useContext(AppContext)

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
    app.notificationsQuery.refetch(250)
  }

  const onUnsubmitPeriod = async (forecast: boolean): Promise<void> => {
    dispatch(UNSUBMITTING_PERIOD({ forecast }))
    const variables = {
      period: state.selectedPeriod.data,
      options: { forecast }
    }
    await unsubmitPeriod({ variables })
    refetch()
    app.notificationsQuery.refetch(250)
  }

  return {
    onSubmitPeriod,
    onUnsubmitPeriod
  }
}
