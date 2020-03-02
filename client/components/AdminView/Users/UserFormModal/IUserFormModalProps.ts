import { IModalProps } from 'office-ui-fabric-react/lib/Modal';
import { IUser } from 'interfaces';

export interface IUserFormModalProps {
    title?: string;
    user?: IUser;
    modal?: IModalProps;
}
