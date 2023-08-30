import { DateRangeType } from '@fluentui/react'
import { ITimesheetState, TimesheetDateRange } from '../types'
import { Overview } from '../Views/Overview'
import { ITimesheetReducerParameters } from './types'

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
 * Initializes state based on url parameters
 *
 * @param parameters - Timesheet reducer parameters
 *
 * @returns Initial state
 */
export function initState(
  parameters: ITimesheetReducerParameters
): ITimesheetState {
  const periods = []
  const dateRangeType = convertStringToDateRangeType(parameters.url.dateRange)
  const scope = new TimesheetDateRange(parameters.url.startDate, dateRangeType)
  // const selectedView =
  //   (parameters.url.view as TimesheetView) ?? TimesheetView.Overview
  return {
    periods,
    dateRange: scope,
    dateRangeType,
    selectedView: Overview,
    navHistory: []
  }
}
