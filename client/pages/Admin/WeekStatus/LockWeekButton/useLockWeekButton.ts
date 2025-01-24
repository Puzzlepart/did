import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { getFluentIcon } from 'utils/getFluentIcon'
import lockPeriodMutation from './lock-period.gql'
import { ILockWeekButtonProps } from './types'
import { useLockedPeriodsQuery } from './useLockedPeriodsQuery'

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
  const [confirmationDialog, getResponse] = useConfirmationDialog()

  useEffect(() => {
    isLocked.setValue(
      lockedPeriods?.some(({ periodId }) => periodId === props.period?.id)
    )
  }, [lockedPeriods, props.period?.id])

  const text = isLocked.value
    ? t('admin.weekStatus.unlockWeekButtonText')
    : t('admin.weekStatus.lockWeekButtonText')

  const icon = getFluentIcon(isLocked.value ? 'LockClosed' : 'LockOpen')

  /**
   * Handles the click event for the button.
   */
  const onClick = async () => {
    let reason = null
    if (!isLocked.value) {
      const { response, comment } = await getResponse({
        title: t('admin.weekStatus.confirmLockTitle'),
        subText: t('admin.weekStatus.confirmLockSubText', {
          period:
            props.period?.weekNumber +
            (props.period.monthName ? ` (${props.period.monthName})` : '')
        }),
        responses: [
          [t('common.yes'), true, true],
          [t('common.no'), false, false]
        ],
        enableCommentsField: true,
        commentsFieldPlaceholder: t('admin.weekStatus.lockReasonPlaceholder')
      })
      if (!response) return
      reason = comment
    }
    const { data } = await lockPeriod({
      variables: {
        periodId: props.period?.id,
        unlock: isLocked.value,
        reason
      }
    })
    if (!data.result?.success) return
    const period =
      props.period?.weekNumber +
      (props.period.monthName ? ` (${props.period.monthName})` : '')
    if (isLocked.value) {
      displayToast(t('admin.weekStatus.weekUnlocked', { period }), 'success')
    } else {
      displayToast(t('admin.weekStatus.weekLocked', { period }), 'success')
    }
    isLocked.toggle()
  }
  return { text, icon, onClick, confirmationDialog }
}
