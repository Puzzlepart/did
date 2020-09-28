import gql from 'graphql-tag'

/**
 * @ignore
 */
export const CONFIRM_PERIOD = gql`
  mutation($entries: [TimeEntryInput!], $period: TimesheetPeriodInput!) {
    result: submitPeriod(entries: $entries, period: $period) {
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
    result: unsubmitPeriod(period: $period) {
      success
      error {
        message
      }
    }
  }
`