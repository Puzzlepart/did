import gql from 'graphql-tag'

export interface ITimeEntriesVariables {
  year: number
  minMonthNumber?: number
  maxMonthNumber?: number
}


export default gql`
  query($year: Int!, $minMonthNumber: Int, $maxMonthNumber: Int) {
    timeentries(year: $year, minMonthNumber: $minMonthNumber, maxMonthNumber: $maxMonthNumber) {
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
