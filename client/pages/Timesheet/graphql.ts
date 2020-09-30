import gql from 'graphql-tag'

const unconfirmPeriod = gql`
  mutation($period: TimesheetPeriodInput!) {
    result: unconfirmPeriod(period: $period) {
      success
      error {
        message
      }
    }
  }
`

const confirmPeriod = gql`
  mutation($entries: [TimeEntryInput!], $period: TimesheetPeriodInput!) {
    result: confirmPeriod(entries: $entries, period: $period) {
      success
      error {
        message
      }
    }
  }
`

const timesheet = gql`
  query($startDateTime: String!, $endDateTime: String!, $dateFormat: String!, $locale: String!) {
    timesheet(startDateTime: $startDateTime, endDateTime: $endDateTime, dateFormat: $dateFormat, locale: $locale) {
      id
      week
      month
      startDateTime
      endDateTime
      events {
        id
        title
        isOrganizer
        webLink
        duration
        startDateTime
        endDateTime
        date
        project {
          id
          key
          name
          description
          icon
          customer {
            key
            name
            icon
            inactive
          }
          labels {
            name
            description
            color
            icon
          }
        }
        suggestedProject {
          id
          key
          name
          description
          customer {
            key
            name
            inactive
          }
        }
        customer {
          key
          name
          icon
          inactive
        }
        labels {
          name
          description
          color
          icon
        }
        isSystemIgnored
        error {
          code
        }
      }
      confirmed
    }
  }
`

export default {
  query: { timesheet },
  mutation: { confirmPeriod, unconfirmPeriod }
}