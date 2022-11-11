import { DateRangeType } from '@fluentui/react'
import _ from 'underscore'
import {
  ITimesheetState, 
  TimesheetScope,
  TimesheetView
} from '../types'
import { ITimesheetReducerParameters } from './types'

/**
 * Convert string value to `DateRangeType`
 * 
 * @param dateRangeTypeString - Date range type in string format
 */
function convertStringToDateRangeType(dateRangeTypeString: string) {
  switch (dateRangeTypeString) {
    case 'week': return DateRangeType.Week
    case 'month': return DateRangeType.Month
    default: return DateRangeType.Week
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
  const scope = _.isEmpty(Object.keys(parameters.url))
    ? new TimesheetScope(undefined, dateRangeType)
    : new TimesheetScope(undefined, dateRangeType).fromParams(parameters.url)
  return {
    periods,
    scope,
    dateRangeType,
    selectedView:
      (parameters.url.view as TimesheetView) ?? TimesheetView.Overview,
    navHistory: []
  }
}
