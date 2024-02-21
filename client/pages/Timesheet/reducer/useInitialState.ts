import { DateRangeType } from '@fluentui/react'
import { useParams } from 'react-router-dom'
import { useViews } from '../Views'
import { TimesheetDateRange } from '../types'
import { ITimesheetParameters } from '../types/ITimesheetParameters'
import { ITimesheetState } from '../types/ITimesheetState'

/**
 * Convert string value to `DateRangeType`
 *
 * @param dateRangeTypeString - Date range type in string format
 */
function convertStringToDateRangeType(dateRangeTypeString: string) {
  switch (dateRangeTypeString) {
    case 'week': {
      return DateRangeType.Week
    }
    case 'month': {
      return DateRangeType.Month
    }
    default: {
      return DateRangeType.Week
    }
  }
}

/**
 * Initializes state based on URL parameters
 *
 * @returns Initial state
 */
export function useInitialState(): ITimesheetState {
  const { getViewById } = useViews()
  const url = useParams<ITimesheetParameters>()
  const periods = []
  const dateRangeType = convertStringToDateRangeType(url.dateRange)
  const scope = new TimesheetDateRange(url.startDate, dateRangeType)
  const selectedView = getViewById(url.view)
  return {
    periods,
    dateRange: scope,
    dateRangeType,
    selectedView,
    navHistory: []
  }
}
