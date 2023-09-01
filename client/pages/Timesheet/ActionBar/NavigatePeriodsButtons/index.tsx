import { DateRangeType } from '@fluentui/react'
import { ToolbarButton } from '@fluentui/react-components'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../../context'
import { CHANGE_PERIOD } from '../../reducer/actions'

export const NavigatePeriodsButtons: FC = () => {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  const isRangeWeek = state.dateRangeType === DateRangeType.Week
  if (state.periods.length === 1 || !isRangeWeek) return null
  return (
    <>
      {state.periods.map((period, index) => {
        const isCurrent = state.selectedPeriod?.id === period.id
        return (
          <ToolbarButton
            key={`NavigatePeriodsButton-${index}`}
            appearance={isCurrent ? 'primary' : 'subtle'}
            onClick={() => dispatch(CHANGE_PERIOD({ id: period.id }))}
          >
            {period.getName(t, true)}
          </ToolbarButton>
        )
      })}
    </>
  )
}
