import { gql } from '@apollo/client'

export const GET_PROJECTS = gql`
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

export const TIME_ENTRIES = gql`
  query($query: TimeEntriesQuery!) {
    timeentries(query: $query) {
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

export const CREATE_OUTLOOK_CATEGORY = gql`
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

export const CREATE_OR_UPDATE_PROJECT = gql`
  mutation($project: ProjectInput!, $update: Boolean) {
    result: createOrUpdateProject(project: $project, update: $update) {
      success
      error {
        message
      }
    }
  }
`
