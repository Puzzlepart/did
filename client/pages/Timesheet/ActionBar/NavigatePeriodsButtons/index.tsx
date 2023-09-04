import { DateRangeType } from '@fluentui/react'
import {
  ToolbarRadioButton,
  ToolbarRadioButtonProps,
  ToolbarRadioGroup
} from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../../context'

export const NavigatePeriodsButtons: FC<Pick<ToolbarRadioButtonProps, 'name'>> =
  ({ name }) => {
    const { t } = useTranslation()
    const { state } = useTimesheetContext()
    const isRangeWeek = state.dateRangeType === DateRangeType.Week
    return (
      <ToolbarRadioGroup hidden={state.periods.length === 1 || !isRangeWeek}>
        {state.periods.map((period, index) => {
          return (
            <ToolbarRadioButton
              key={index}
              name={name}
              value={period.id}
              style={{ margin: '0 0 0 6px' }}
            >
              {period.getName(t, true)}
            </ToolbarRadioButton>
          )
        })}
      </ToolbarRadioGroup>
    )
  }
