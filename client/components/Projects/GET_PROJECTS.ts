
import gql from 'graphql-tag';
import { IProject } from 'interfaces';

/**
 * {@docCategory Projects}
 */
export interface IGetProjectsData {
    projects: IProject[];
}

/**
 * @ignore
 */
export const GET_PROJECTS = gql`
    query($customerKey: String, $sortBy: String) {
        projects(customerKey: $customerKey, sortBy: $sortBy) {
            id
            key
            name
            description
            webLink
            icon
            customerKey
            customer {
                id
                name
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
`;