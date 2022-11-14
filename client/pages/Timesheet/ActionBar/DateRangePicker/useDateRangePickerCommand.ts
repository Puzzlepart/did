/* eslint-disable unicorn/prevent-abbreviations */
import { DateRangeType, IContextualMenuItem } from '@fluentui/react'
import { useTimesheetContext } from 'pages'
import { useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { CHANGE_DATE_RANGE_TYPE } from '../../reducer/actions'
import styles from './DateRangePicker.module.scss'

/**
 * @category Timesheet
 */
export function useDateRangePickerCommand(
  onClick: React.DispatchWithoutAction
) {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  const componentRef = useRef(null)
  const browserProps: Partial<IContextualMenuItem> = {
    text: state.dateRange.timespan,
    style: { paddingRight: 15 }
  }
  if (
    state.dateRangeType === DateRangeType.Week &&
    state.periods.length === 1
  ) {
    browserProps.text = `${state.selectedPeriod.getName(t)} (${
      state.dateRange.timespan
    })`
  }
  const mobileProps: Partial<IContextualMenuItem> = {
    iconProps: { iconName: 'Calendar' }
  }

  const dateRangePickerCommands: IContextualMenuItem[] = [
    {
      key: 'TOGGLE_DATE_RANGE_PICKER',
      componentRef,
      onClick,
      className: styles.dateRangePicker,
      disabled: !!state.loading,
      ...(isMobile ? mobileProps : browserProps)
    },
    {
      key: 'DATE_RANGE_WEEK',
      iconProps: { iconName: 'CalendarWeek' },
      text: t('timesheet.dateRangeWeek'),
      canCheck: true,
      checked: state.dateRangeType === DateRangeType.Week,
      onClick: () => {
        dispatch(CHANGE_DATE_RANGE_TYPE({ dateRangeType: DateRangeType.Week }))
      },
      className: styles.dateRangeItem,
      disabled: !!state.loading
    },
    {
      key: 'DATE_RANGE_MONTH',
      iconProps: { iconName: 'Calendar' },
      text: t('timesheet.dateRangeMonth'),
      canCheck: true,
      checked: state.dateRangeType === DateRangeType.Month,
      onClick: () => {
        dispatch(CHANGE_DATE_RANGE_TYPE({ dateRangeType: DateRangeType.Month }))
      },
      className: styles.dateRangeItem,
      disabled: !!state.loading
    }
  ]
  return {
    dateRangePickerCommands,
    target: componentRef?.current?._buttonElement?.current
  }
}
