import gql from 'graphql-tag'

export const TIME_ENTRIES = gql`
  query(
    $startDateTime: String
    $endDateTime: String
    $weekNumber: Int
    $monthNumber: Int
    $year: Int
    $forecast: Boolean
    $sortAsc: Boolean
  ) {
    timeentries(
      startDateTime: $startDateTime
      endDateTime: $endDateTime
      weekNumber: $weekNumber
      monthNumber: $monthNumber
      year: $year
      forecast: $forecast
      sortAsc: $sortAsc
    ) {
      title
      duration
      startDateTime
      endDateTime
      weekNumber
      monthNumber
      year
      resourceName
      monthNumber
      customer {
        key
        name
      }
      project {
        id
        name
      }
    }
  }
`
