import gql from 'graphql-tag'

export const UNSUBMIT_PERIOD = gql`
  mutation($period: TimesheetPeriodInput!, $forecast: Boolean!) {
    result: unsubmitPeriod(period: $period, forecast: $forecast) {
      success
      error {
        message
      }
    }
  }
`

export const SUBMIT_PERIOD = gql`
  mutation($period: TimesheetPeriodInput!, $forecast: Boolean!) {
    result: submitPeriod(period: $period, forecast: $forecast) {
      success
      error {
        message
      }
    }
  }
`

export const TIMESHEET = gql`
  query($query: TimesheetQuery!, $options: TimesheetOptions!) {
    timesheet(query: $query, options: $options) {
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
      forecastedHours
    }
  }
`
