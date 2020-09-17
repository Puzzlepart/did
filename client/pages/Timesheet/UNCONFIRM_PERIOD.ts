import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
  mutation($period: TimesheetPeriodInput!) {
    result: unconfirmPeriod(period: $period) {
      success
      error {
        message
      }
    }
  }
`
