import { DateRangeType } from '@fluentui/react'
import {
  mergeClasses,
  ToolbarRadioButton,
  ToolbarRadioButtonProps,
  ToolbarRadioGroup
} from '@fluentui/react-components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import s from 'underscore.string'
import { useTimesheetContext } from '../../context'
import styles from './NavigatePeriodsButtons.module.scss'

/**
 * Renders a group of radio buttons for navigating between periods. This is
 * only visible when the date range type is set to `DateRangeType.Week`, as
 * we have tabs for navigating between the periods when the date range type
 * is set to `DateRangeType.Month`.
 */
export const NavigatePeriodsButtons: StyledComponent<
  Pick<ToolbarRadioButtonProps, 'name'>
> = ({ name }) => {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const shouldRender =
    state.dateRangeType === DateRangeType.Week && state.periods.length > 1
  return (
    <ToolbarRadioGroup
      className={NavigatePeriodsButtons.className}
      style={{
        display: shouldRender ? 'flex' : 'none'
      }}
    >
      {state.periods.map((period, index) => (
        <ToolbarRadioButton
          className={mergeClasses(
            styles.navigatePeriodsButton,
            isMobile && styles.mobile
          )}
          key={index}
          name={name}
          defaultChecked={period.id === state.selectedPeriod?.id}
          value={period.id}
          size={isMobile ? 'small' : 'medium'}
          disabled={!!state.loading}
        >
          {isMobile
            ? s.capitalize(period.month.slice(0, 3))
            : period.getName(t, true)}
        </ToolbarRadioButton>
      ))}
    </ToolbarRadioGroup>
  )
}

NavigatePeriodsButtons.displayName = 'Timesheet.NavigatePeriodsButtons'
NavigatePeriodsButtons.className = styles.navigatePeriodsButtons
