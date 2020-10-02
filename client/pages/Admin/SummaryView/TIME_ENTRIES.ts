import gql from 'graphql-tag'

export interface ITimeEntriesVariables {
  year: number
  startMonthIndex?: number
  endMonthIndex?: number
}

export default gql`
  query($year: Int!, $startMonthIndex: Int, $endMonthIndex: Int) {
    timeentries(year: $year, startMonthIndex: $startMonthIndex, endMonthIndex: $endMonthIndex) {
      duration
      weekNumber
      year
      monthNumber
      resourceName
      project {
        id
        name
        icon
      }
      customer {
        key
        name
      }
    }
  }
`
