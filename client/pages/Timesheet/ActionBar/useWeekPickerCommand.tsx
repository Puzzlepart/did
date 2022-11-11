/* eslint-disable unicorn/prevent-abbreviations */
import { IContextualMenuItem } from '@fluentui/react'
import { useTimesheetContext } from 'pages'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

/**
 * @category Timesheet
 */
export function useWeekPickerCommand(onClick: React.DispatchWithoutAction) {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const componentRef = useRef(null)
  const browserProps: Partial<IContextualMenuItem> = {
    text: '',
    style: { paddingRight: 15 }
  }
  if (state.periods.length === 1) {
    browserProps.text += `${state.selectedPeriod.getName(t)} (${
      state.scope.timespan
    })`
  } else {
    browserProps.text = state.scope.timespan
  }
  const mobileProps: Partial<IContextualMenuItem> = {
    iconProps: { iconName: 'Calendar' }
  }

  const weekPickerCommand: IContextualMenuItem = {
    key: 'TOGGLE_WEEK_PICKER',
    componentRef,
    onClick,
    ...(isMobile ? mobileProps : browserProps)
  }
  return {
    weekPickerCommand,
    target: componentRef?.current?._buttonElement?.current
  }
}
