import gql from 'graphql-tag'

const timeentries = gql`
  query($year: Int!, $startMonthIndex: Int, $endMonthIndex: Int) {
    timeentries(year: $year, startMonthIndex: $startMonthIndex, endMonthIndex: $endMonthIndex, currentUser: true) {
      title
      duration
      weekNumber
      year
      monthNumber
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
