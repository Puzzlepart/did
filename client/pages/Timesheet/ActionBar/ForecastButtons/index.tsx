import { DateRangeType } from '@fluentui/react'
import { ToolbarButton } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { Overview } from 'pages/Timesheet/Views/Overview'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { useTimesheetContext } from '../../context'

/**
 * Renders the forecast buttons for the timesheet action bar.
 *
 * @returns JSX.Element
 */
export const ForecastButtons: FC = () => {
  const { t } = useTranslation()
  const { state, onSubmitPeriod, onUnsubmitPeriod } = useTimesheetContext()
  const { subscription } = useAppContext()
  const isRangeWeek = state.dateRangeType === DateRangeType.Week
  const isOverview = state.selectedView?.id === Overview.id
  if (
    !subscription.settings?.forecast?.enabled ||
    (!isRangeWeek && !isOverview)
  )
    return null
  return (
    <>
      <ToolbarButton
        icon={icon('Timer')}
        onClick={() => onSubmitPeriod(true)}
        disabled={!!state.loading}
        style={{ margin: '0 0 0 6px' }}
      >
        {t('timesheet.forecastHoursText')}
      </ToolbarButton>
      <ToolbarButton
        icon={icon('CalendarCancel')}
        onClick={() => onUnsubmitPeriod(true)}
        disabled={!!state.loading}
        style={{ margin: '0 0 0 6px' }}
      >
        {t('timesheet.unforecastHoursText')}
      </ToolbarButton>
    </>
  )
}
