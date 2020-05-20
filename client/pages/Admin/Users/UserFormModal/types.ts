import { IModalProps } from 'office-ui-fabric-react/lib/Modal'
import { IUser, IRole } from 'interfaces'
import gql from 'graphql-tag'

/**
 * @category Admin
 */
export interface IUserFormModalProps {
    title?: string;
    user?: IUser;
    roles?: IRole[];
    modal?: IModalProps;
}


/**
 * @ignore
 */
export const ADD_USER = gql`
    mutation($user: UserInput!) { 
        addUser(user: $user) {
            success
            error {
                message
            }
        }
    }
`

/**
 * @ignore
 */
export const UPDATE_USER = gql`
    mutation($user: UserInput!) { 
        updateUser(user: $user) {
            success
            error {
                message
            }
        }
    }
`

