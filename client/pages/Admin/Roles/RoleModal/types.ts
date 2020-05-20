import gql from 'graphql-tag'
import { IRole } from 'interfaces/IRole'
import { IModalProps } from 'office-ui-fabric-react/lib/Modal'

export interface IRoleModalProps {
    modal?: IModalProps;
    role?: IRole;
    onSave: (role: IRole) => void;
}

/**
 * @ignore
 */
export const UPDATE_ROLE = gql`
    mutation($role: RoleInput!) { 
        updateRole(role: $role) {
            success
            error {
                message
            }
        }
    }
`