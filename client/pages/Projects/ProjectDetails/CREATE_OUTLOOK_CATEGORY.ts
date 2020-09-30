import gql from 'graphql-tag'

/**
 * @ignore
 */
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
