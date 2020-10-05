import gql from 'graphql-tag'

const unsubmitPeriod = gql`
  mutation($period: TimesheetPeriodInput!) {
    result: unsubmitPeriod(period: $period) {
      success
      error {
        message
      }
    }
  }
`

const submitPeriod = gql`
  mutation($period: TimesheetPeriodInput!) {
    result: submitPeriod(period: $period) {
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
      isConfirmed
      isForecasted
      isForecast
    }
  }
`

export default {
  query: { timesheet },
  mutation: { submitPeriod, unsubmitPeriod },
}
