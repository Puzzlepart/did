import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon } from 'utils/getFluentIcon'
import { useWeekStatusContext } from '../context'
import { ILockWeekButtonProps } from './types'
import { LockedPeriod } from 'types'

/**
 * Component logic hook for the `LockWeekButton` component. Handles
 * fetching of locked periods and locking/unlocking of periods.
 * Returns the text, icon and click handler for the button.
 *
 * @param props Props for the `LockWeekButton` component.
 */
export function useLockWeekButton(props: ILockWeekButtonProps) {
  const { t } = useTranslation()
  const context = useWeekStatusContext()
  const [lockedPeriod, setLockedPeriod] = useState<LockedPeriod>(null)
  const [confirmationDialog, getResponse] = useConfirmationDialog()

  useEffect(() => {
    setLockedPeriod(
      context.lockedPeriods?.find(
        ({ periodId }) => periodId === props.period?.id
      )
    )
  }, [context.lockedPeriods, props.period?.id])

  const text = Boolean(lockedPeriod)
    ? t('admin.weekStatus.unlockWeekButtonText')
    : t('admin.weekStatus.lockWeekButtonText')

  const icon = getFluentIcon(Boolean(lockedPeriod) ? 'LockClosed' : 'LockOpen')

  /**
   * Handles the click event for the button.
   * * If the period is not locked, a confirmation dialog is shown.
   * * If the user confirms, the period is locked/unlocked.
   * * If the period is locked, it is unlocked.
   * * If the period is unlocked, it is locked.
   * * If the period is unlocked, the user can provide a reason for locking.
   */
  const onClick = async () => {
    let reason = null
    if (!Boolean(lockedPeriod)) {
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
    context.onLockPeriod(props.period?.id, reason)
  }
  return { text, icon, onClick, lockedPeriod, confirmationDialog }
}
