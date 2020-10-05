import gql from 'graphql-tag'

export default gql`
  query($projectId: String) {
    timeentries(projectId: $projectId) {
      title
      duration
      startDateTime
      endDateTime
      weekNumber
      monthNumber
      year
      resource {
        givenName
        surname
        mail
        displayName
      }
    }
  }
`
