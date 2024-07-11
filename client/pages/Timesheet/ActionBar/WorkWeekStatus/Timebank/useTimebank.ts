import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useTimesheetState } from 'pages/Timesheet/context'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ITimebankProps, ITimebankState } from './types'
import $updateUserTimebank from './update-user-timebank.gql'

/**
 * Component logic hook for the `<Timebank />` component. Handles
 * the logic for updating the user's timebank with the current balance adjustment.
 *
 * @param props - The <Timebank /> component props.
 */
export function useTimebank(props: ITimebankProps) {
  const { t } = useTranslation()
  const { user, displayToast } = useAppContext()
  const [updateUserTimebank] = useMutation($updateUserTimebank)
  const { periods } = useTimesheetState()
  const entryId = periods.map(({ id }) => id).join('_')
  const workWeekConfirmed = periods.every(({ isConfirmed }) => isConfirmed)

  const [state, setState] = useState<ITimebankState>({
    currentBalance: user.timebank?.balance ?? 0,
    balanceAdjustment: props.hours,
    isTimebankAdjusted: user.timebank.entries?.some(
      (entry) => entry.id === entryId
    )
  })

  /**
   * Updates the user's timebank with the current balance adjustment.
   *
   * @param reset - Indicates whether to reset the balance adjustment.
   */
  const onUpdateUserTimebank = async (reset = false) => {
    const { data } = await updateUserTimebank({
      variables: { entryId, balanceAdjustment: state.balanceAdjustment, reset }
    })
    setState({
      ...state,
      currentBalance: data.result.balance,
      isTimebankAdjusted: !reset
    })
    displayToast(
      t('timesheet.timebank.balanceAdjustedMessage', data.result),
      'success'
    )
  }

  return {
    timebankAdjustmentAvailable: workWeekConfirmed && !state.isTimebankAdjusted,
    state,
    setState,
    onUpdateUserTimebank
  }
}
