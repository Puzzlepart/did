import { useTranslation } from 'react-i18next'
import { useBoolean } from 'usehooks-ts'
import { getFluentIcon } from 'utils/getFluentIcon'
import { ILockWeekButtonProps } from './types'
import $lockedPeriods from './locked-periods.gql'
import $lockPeriod from './lock-period.gql'
import { useMutation, useQuery } from '@apollo/client'
import { Subscription } from 'types'
import { useEffect } from 'react'

/**
 * Component logic hook for the `LockWeekButton` component. Handles
 * fetching of locked periods and locking/unlocking of periods.
 * Returns the text, icon and click handler for the button.
 *
 * @param props Props for the `LockWeekButton` component.
 */
export function useLockWeekButton(props: ILockWeekButtonProps) {
  const { t } = useTranslation()
  const { data } = useQuery<{ subscription: Subscription }>($lockedPeriods, {
    fetchPolicy: 'network-only'
  })
  const [lockPeriod] = useMutation($lockPeriod)
  const isLocked = useBoolean(false)

  useEffect(() => {
    isLocked.setValue(
      data?.subscription?.lockedPeriods?.some(
        (periodId) => periodId === props.period?.id
      )
    )
  }, [data?.subscription?.lockedPeriods, props.period?.id])

  const text = isLocked.value
    ? t('admin.weekStatus.unlockWeekButtonText')
    : t('admin.weekStatus.lockWeekButtonText')
  const icon = getFluentIcon(isLocked.value ? 'LockOpen' : 'LockClosed')

  /**
   * Handles the click event for the button.
   */
  const onClick = () => {
    lockPeriod({
      variables: {
        periodId: props.period?.id,
        unlock: isLocked.value
      }
    })
    isLocked.toggle()
  }
  return { text, icon, onClick }
}
