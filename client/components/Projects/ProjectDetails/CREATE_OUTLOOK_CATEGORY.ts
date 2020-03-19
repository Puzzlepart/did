import gql from 'graphql-tag';

export const CREATE_OUTLOOK_CATEGORY = gql`
    mutation($category: OutlookCategoryInput!) {
        result: createOutlookCategory(category: $category)  {
            data
            success
            error {
                message
            }
        }
    }
`;