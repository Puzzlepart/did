
import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
query ($startDateTime: String!, $endDateTime: String!, $dateFormat: String!, $locale: String!) {
  timesheet(startDateTime: $startDateTime, endDateTime: $endDateTime, dateFormat: $dateFormat, locale: $locale) {
    id
    week
    month
    startDateTime
    endDateTime
    events {
      key
      id
      title
      isOrganizer
      webLink
      duration
      startTime
      endTime
      date
      project {
        id
        key
        name
        description
        icon
        customer {
          id
          key
          name
          inactive
        }                
        labels {
          id
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
          id
          key
          name
          inactive
        }
      }
      customer {
        id
        key
        name
        inactive
      }
      error {
        message
      }
    }
    confirmedDuration
  }
}
`
