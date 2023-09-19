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

export const NavigatePeriodsButtons: StyledComponent<
  Pick<ToolbarRadioButtonProps, 'name'>
> = ({ name }) => {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const isRangeWeek = state.dateRangeType === DateRangeType.Week
  return (
    <ToolbarRadioGroup
      hidden={state.periods.length === 1 || !isRangeWeek}
      className={NavigatePeriodsButtons.className}
    >
      {state.periods.map((period, index) => {
        return (
          <ToolbarRadioButton
            className={mergeClasses(
              styles.navigatePeriodsButton,
              isMobile && styles.mobile
            )}
            key={index}
            name={name}
            value={period.id}
            size={isMobile ? 'small' : 'medium'}
          >
            {isMobile
              ? s.capitalize(period.month.slice(0, 3))
              : period.getName(t, true)}
          </ToolbarRadioButton>
        )
      })}
    </ToolbarRadioGroup>
  )
}

NavigatePeriodsButtons.displayName = 'Timesheet.NavigatePeriodsButtons'
NavigatePeriodsButtons.className = styles.navigatePeriodsButtons
