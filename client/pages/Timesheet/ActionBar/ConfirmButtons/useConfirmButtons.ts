import { DateRangeType } from '@fluentui/react'
import { ToolbarButtonProps } from '@fluentui/react-components'
import { Overview } from 'pages/Timesheet/Views/Overview'
import { useMemo } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils'
import { useTimesheetContext } from '../../context'
import { IConfirmButtonsProps } from './types'

/**
 * Custom hook that returns button properties and text for confirming or unconfirming timesheet hours.
 *
 * @param props - The props to pass to the hook.
 *
 * @returns An object containing button properties and text.
 */
export function useConfirmButtons(props: IConfirmButtonsProps) {
  const { t } = useTranslation()
  const context = useTimesheetContext()
  const { selectedPeriod, loading, dateRangeType, selectedView } = context.state
  const [confirmIcons, undoIcons] = props.icons
  const [iconName, iconColor] = selectedPeriod?.isConfirmed
    ? undoIcons
    : confirmIcons
  const buttonProps: ToolbarButtonProps = useMemo(
    () => ({
      icon: icon(iconName, true, iconColor),
      disabled: !!loading,
      onClick: () => {
        if (selectedPeriod?.isConfirmed) {
          context.onUnsubmitPeriod(false)
        } else {
          context.onSubmitPeriod(false)
        }
      }
    }),
    [loading, selectedPeriod?.isConfirmed]
  )
  const buttonText =
    isBrowser &&
    (selectedPeriod?.isConfirmed
      ? t('timesheet.unconfirmHoursText')
      : t('timesheet.confirmHoursText'))

  const isRangeWeek = dateRangeType === DateRangeType.Week
  const isOverview = selectedView?.id === Overview.id
  const isConfirmDisabled =
    (!isRangeWeek && !isOverview) ||
    (!selectedPeriod?.isComplete && !selectedPeriod?.isConfirmed)

  return { buttonProps, buttonText, isConfirmDisabled }
}
