import gql from 'graphql-tag'

/**
 * @ignore
 */
export const CONFIRM_PERIOD = gql`
  mutation($entries: [TimeEntryInput!], $period: TimesheetPeriodInput!) {
    result: confirmPeriod(entries: $entries, period: $period) {
      success
      error {
        message
      }
    }
  }
`

/**
 * @ignore
 */
export const UNCONFIRM_PERIOD = gql`
  mutation($period: TimesheetPeriodInput!) {
    result: unconfirmPeriod(period: $period) {
      success
      error {
        message
      }
    }
  }
`

/**
 * @ignore
 */
export const FORECAST_PERIOD = gql`
  mutation($entries: [TimeEntryInput!], $period: TimesheetPeriodInput!) {
    result: forecastPeriod(entries: $entries, period: $period) {
      success
      error {
        message
      }
    }
  }
`

/**
 * @ignore
 */
export const UNFORECAST_PERIOD = gql`
  mutation($period: TimesheetPeriodInput!) {
    result: unforecastPeriod(period: $period) {
      success
      error {
        message
      }
    }
  }
`
