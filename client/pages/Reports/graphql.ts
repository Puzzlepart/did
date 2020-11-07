import { gql } from '@apollo/client'

export const TIME_ENTRIES = gql`
  query($query: TimeEntriesQuery!, $forecast: Boolean, $sortAsc: Boolean) {
    timeentries(query: $query, forecast: $forecast, sortAsc: $sortAsc) {
      title
      duration
      startDateTime
      endDateTime
      weekNumber
      year
      monthNumber
      customer {
        key
        name
      }
      project {
        id
        name
      }
      resource {
        givenName
        surname
        mail
        displayName
      }
    }
  }
`
