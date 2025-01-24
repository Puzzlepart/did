import { DateRangeType } from '@fluentui/react'
import { ToolbarButtonProps } from '@fluentui/react-components'
import $date from 'DateUtils'
import { Overview } from 'pages/Timesheet/Views/Overview'
import { useMemo } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils'
import { useLockedPeriods } from '../../../Admin/WeekStatus'
import { useTimesheetContext } from '../../context'
import { IConfirmButtonsProps } from './types'

/**
 * Custom hook that returns button properties and text for confirming
 * or unconfirming timesheet hours.
 *
 * @param props - The properties for `ConfirmButtons`.
 *
 * @returns An object containing button properties and text.
 */
export function useConfirmButtons(props: IConfirmButtonsProps) {
  const { t } = useTranslation()
  const context = useTimesheetContext()
  const lockedPeriods = useLockedPeriods()
  const { selectedPeriod, loading, dateRangeType, selectedView } = context.state
  const isPeriodLocked = lockedPeriods.isLocked(selectedPeriod?.id)
  const isRangeWeek = dateRangeType === DateRangeType.Week
  const isOverview = selectedView?.id === Overview.id
  const isDisabled =
    !!loading ||
    (!isRangeWeek && !isOverview) ||
    (!selectedPeriod?.isComplete && !selectedPeriod?.isConfirmed) ||
    isPeriodLocked
  const [confirmIcons, undoIcons] = props.icons
  const [iconName, iconColor] = selectedPeriod?.isConfirmed
    ? undoIcons
    : confirmIcons

  const buttonProps: ToolbarButtonProps = useMemo(
    () => ({
      icon: isPeriodLocked
        ? icon('LockClosed', { bundle: true })
        : icon(iconName, { bundle: true, color: iconColor }),
      disabled: isDisabled,
      onClick: () => {
        if (selectedPeriod?.isConfirmed) {
          context.onUnsubmitPeriod({ forecast: false })
        } else {
          context.onSubmitPeriod({ forecast: false })
        }
      }
    }),
    [selectedPeriod, isDisabled]
  )

  const buttonText =
    isBrowser &&
    (selectedPeriod?.isConfirmed
      ? t('timesheet.unconfirmHoursText')
      : t('timesheet.confirmHoursText'))

  let tooltipText: string = null

  if (!selectedPeriod?.isConfirmed && buttonProps.disabled) {
    if (isPeriodLocked) {
      tooltipText = t('timesheet.periodLockedText')
    } else {
      tooltipText =
        selectedPeriod?.errors?.length > 0
          ? t('timesheet.unresolvedErrorText', {
              count: selectedPeriod.errors.length
            })
          : t('timesheet.hoursNotMatchedText', {
              hours: $date.getDurationString(
                selectedPeriod?.unmatchedDuration ?? 0,
                t
              )
            })
    }
  }

  return { buttonProps, buttonText, tooltipText }
}
