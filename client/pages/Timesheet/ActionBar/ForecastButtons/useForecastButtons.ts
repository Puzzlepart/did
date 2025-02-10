import { DateRangeType } from '@fluentui/react'
import { ToolbarButtonProps } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { Overview } from 'pages/Timesheet/Views/Overview'
import { useMemo } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { useLockedPeriods } from '../../../Admin/WeekStatus'
import { useTimesheetContext } from '../../context'
import { IForecastButtonsProps } from './types'

/**
 * Custom hook that returns button properties and text for forecasting or unforecasting timesheet hours.
 *
 * @param props - The properties for `ForecastButtons`.
 *
 * @returns An object containing button properties and text.
 */
export function useForecastButtons(props: IForecastButtonsProps) {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
  const context = useTimesheetContext()
  const lockedPeriods = useLockedPeriods()
  const { selectedPeriod, loading, dateRangeType, selectedView } = context.state
  const isPeriodLocked = lockedPeriods.isLocked(selectedPeriod?.id)
  const isForecasted = selectedPeriod?.isForecasted
  const [forecastIcons, undoIcons] = props.icons
  const [iconName, iconColor] = isForecasted ? undoIcons : forecastIcons
  const buttonProps: ToolbarButtonProps = useMemo(
    () => ({
      icon: icon(iconName, { bundle: true, color: iconColor }),
      disabled: !!loading,
      onClick: () => {
        if (isForecasted) {
          context.onUnsubmitPeriod({ forecast: true })
        } else {
          context.onSubmitPeriod({ forecast: true })
        }
      }
    }),
    [loading, isForecasted]
  )

  const buttonText =
    isBrowser &&
    (isForecasted
      ? t('timesheet.unforecastHoursText')
      : t('timesheet.forecastHoursText'))

  const isRangeWeek = dateRangeType === DateRangeType.Week
  const isOverview = selectedView?.id === Overview.id

  /**
   * The forecast actions are disabled if the forecast feature is disabled for the subscription or
   * if the current view is not **Overview** or the current date range is not **Week**.
   */
  const isForecastDisabled =
    !subscription.settings?.forecast?.enabled ||
    (!isRangeWeek && !isOverview) ||
    isPeriodLocked

  return { buttonProps, buttonText, isForecastDisabled }
}
