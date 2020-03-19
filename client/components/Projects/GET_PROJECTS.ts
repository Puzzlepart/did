
import gql from 'graphql-tag';
import { IProject } from 'interfaces';

export interface IGetProjectsEntries {
    projects: IProject[];
}

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
        }
        outlookCategories { 
            id
            key
            displayName
            color
        }
    }
`;