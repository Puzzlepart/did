import gql from 'graphql-tag'

const timeentries = gql`
  query($query: TimeEntriesQuery!) {
    timeentries(query: $query, currentUser: true) {
      title
      duration
      weekNumber
      year
      monthNumber
      startDateTime
      endDateTime
      project {
        id
        name
        icon
      }
      customer {
        key
        name
      }
      resource {
        displayName
      }
    }
  }
`