

export default gql`
  query($query: TimeEntriesQuery!) {
    timeentries(query: $query) {
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
