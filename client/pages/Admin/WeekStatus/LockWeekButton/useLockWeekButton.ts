import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { getFluentIcon } from 'utils/getFluentIcon'
import lockPeriodMutation from './lock-period.gql'
import { ILockWeekButtonProps } from './types'
import { useLockedPeriodsQuery } from './useLockedPeriodsQuery'
import { useAppContext } from 'AppContext'

/**
 * Component logic hook for the `LockWeekButton` component. Handles
 * fetching of locked periods and locking/unlocking of periods.
 * Returns the text, icon and click handler for the button.
 *
 * @param props Props for the `LockWeekButton` component.
 */
export function useLockWeekButton(props: ILockWeekButtonProps) {
  const { t } = useTranslation()
  const { displayToast } = useAppContext()
  const [lockedPeriods] = useLockedPeriodsQuery()
  const [lockPeriod] = useMutation(lockPeriodMutation)
  const isLocked = useBoolean(false)

  useEffect(() => {
    isLocked.setValue(
      lockedPeriods?.some(
        (periodId) => periodId === props.period?.id
      )
    )
  }, [lockedPeriods, props.period?.id])

  const text = isLocked.value
    ? t('admin.weekStatus.unlockWeekButtonText')
    : t('admin.weekStatus.lockWeekButtonText')
  const icon = getFluentIcon(isLocked.value ? 'LockOpen' : 'LockClosed')

  /**
   * Handles the click event for the button.
   */
  const onClick = async () => {
    const { data } = await lockPeriod({
      variables: {
        periodId: props.period?.id,
        unlock: isLocked.value

      }
    })
    if (!data.result?.success) return
    if (isLocked.value) {
      displayToast(t('admin.weekStatus.weekUnlocked', props.period), 'success')
    } else {
      displayToast(t('admin.weekStatus.weekLocked', props.period), 'success')
    }
    isLocked.toggle()
  }
  return { text, icon, onClick }
}
