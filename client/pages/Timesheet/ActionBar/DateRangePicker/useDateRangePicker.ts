import { DateRangeType } from '@fluentui/react'
import { PopoverProps } from '@fluentui/react-components'
import { useState } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { FluentIconName } from 'utils'
import { useTimesheetContext } from '../../context'

/**
 * Custom hook that returns the trigger text for the date range picker component,
 * as well as the open state and the open change handler.
 *
 * @returns An object containing the trigger text, open state and open change handler.
 */
export function useDateRangePicker() {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const [open, setOpen] = useState(false)
  const handleOpenChange: PopoverProps['onOpenChange'] = (_, data) =>
    setOpen(data.open || false)
  let triggerText: string
  let triggerIcon: FluentIconName
  if (isBrowser) {
    triggerText = state.dateRange.timespan
    triggerIcon = 'CalendarDate'
    if (state.dateRangeType === DateRangeType.Week) {
      if (state.periods.length === 1) {
        triggerText = `${state.selectedPeriod.getName(t)} (${
          state.dateRange.timespan
        })`
      }
    } else {
      triggerIcon = 'ClipboardMonth'
    }
  }
  return { triggerText, triggerIcon, open, handleOpenChange }
}
