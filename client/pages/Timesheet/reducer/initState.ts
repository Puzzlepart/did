import { DateRangeType } from '@fluentui/react'
import {
  TimesheetDateRange
} from '../types'
import { ITimesheetParameters } from '../types/ITimesheetParameters'
import { ITimesheetState } from '../types/ITimesheetState'
import { Overview } from '../Views/Overview'

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
export function initState(url: ITimesheetParameters): ITimesheetState {
  const periods = []
  const dateRangeType = convertStringToDateRangeType(url.dateRange)
  const scope = new TimesheetDateRange(url.startDate, dateRangeType)
  return {
    periods,
    dateRange: scope,
    dateRangeType,
    selectedView: Overview,
    navHistory: []
  }
}
