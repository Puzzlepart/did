import gql from 'graphql-tag'

const timeentries = gql`
  query($year: Int!, $monthNumber: Int) {
    timeentries(year: $year, monthNumber: $monthNumber, currentUser: true) {
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

export const query = { timeentries }
