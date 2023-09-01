import { DateRangeType } from '@fluentui/react'
import { ToolbarButtonProps } from '@fluentui/react-components'
import { Overview } from 'pages/Timesheet/Views/Overview'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../../context'
import { CalendarCancel, CalendarSync } from '../icons'

/**
 * Custom hook that returns button properties and text for confirming or unconfirming timesheet hours.
 *
 * @returns An object containing button properties and text.
 */
export function useConfirmButtons() {
  const { t } = useTranslation()
  const { state, onSubmitPeriod, onUnsubmitPeriod } = useTimesheetContext()
  const buttonProps: ToolbarButtonProps = useMemo(
    () => ({
      icon: state.selectedPeriod?.isConfirmed ? (
        <CalendarCancel />
      ) : (
        <CalendarSync />
      ),
      disabled: !!state.loading,
      onClick: () => {
        if (state.selectedPeriod?.isConfirmed) {
          onUnsubmitPeriod(false)
        } else {
          onSubmitPeriod(false)
        }
      },
      style: { margin: '0 0 0 6px' }
    }),
    [state.loading, state.selectedPeriod?.isConfirmed]
  )
  const buttonText = state.selectedPeriod?.isConfirmed
    ? t('timesheet.unconfirmHoursText')
    : t('timesheet.confirmHoursText')

  const isRangeWeek = state.dateRangeType === DateRangeType.Week
  const isOverview = state.selectedView?.id === Overview.id
  const isConfirmDisabled = !isRangeWeek && !isOverview

  return { buttonProps, buttonText, isConfirmDisabled }
}