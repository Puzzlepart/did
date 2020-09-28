import gql from 'graphql-tag'

/**
 * @ignore
 */
export const SUBMIT_PERIOD = gql`
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
export const UNSUBMIT_PERIOD = gql`
  mutation($period: TimesheetPeriodInput!) {
    result: unsubmitPeriod(period: $period) {
      success
      error {
        message
      }
    }
  }
`