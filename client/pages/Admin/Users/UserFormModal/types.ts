import { IRole, IUser } from 'interfaces'
import { IModalProps } from 'office-ui-fabric-react/lib/Modal'

/**
 * @category Admin
 */
export interface IUserFormModalProps {
    title?: string;
    users?: any[];
    user?: IUser;
    roles?: IRole[];
    modal?: IModalProps;
}

