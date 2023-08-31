import { ToolbarButtonProps } from '@fluentui/react-components'
import React from 'react'
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
  const isConfirmed = state.selectedPeriod?.isConfirmed
  const buttonProps: ToolbarButtonProps = {
    icon: isConfirmed ? <CalendarCancel /> : <CalendarSync />,
    disabled: !!state.loading,
    onClick: () => {
      if (isConfirmed) {
        onUnsubmitPeriod(false)
      } else {
        onSubmitPeriod(false)
      }
    }
  }
  const buttonText = isConfirmed
    ? t('timesheet.unconfirmHoursText')
    : t('timesheet.confirmHoursText')

  return { buttonProps, buttonText }
}
