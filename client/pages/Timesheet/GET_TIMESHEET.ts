
import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
query ($startDateTime: String!, $endDateTime: String!, $dateFormat: String!) {
  timesheet(startDateTime: $startDateTime, endDateTime: $endDateTime, dateFormat: $dateFormat) {
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
          key
          name
          inactive
        }
      }
      customer {
        key
        name
        inactive
      }
      error {
        message
      }
    }
    confirmed
  }
}
`
