import gql from 'graphql-tag'

const projects = gql`
  query($customerKey: String, $sortBy: String) {
    projects(customerKey: $customerKey, sortBy: $sortBy) {
      id
      key
      name
      description
      webLink
      icon
      externalSystemURL
      customerKey
      customer {
        key
        name
      }
      labels {
        name
        description
        color
        icon
      }
      inactive
    }
    outlookCategories {
      id
      key
      displayName
      color
    }
  }
`

const timeentries = gql`
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

const createOutlookCategory = gql`
  mutation($category: String!) {
    result: createOutlookCategory(category: $category) {
      data
      success
      error {
        message
      }
    }
  }
`

export const createOrUpdateProject = gql`
  mutation($project: ProjectInput!, $update: Boolean) {
    result: createOrUpdateProject(project: $project, update: $update) {
      success
      error {
        message
      }
    }
  }
`

export default {
  query: { projects, timeentries },
  mutation: { createOutlookCategory, createOrUpdateProject },
}
