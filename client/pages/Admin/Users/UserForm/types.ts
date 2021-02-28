import {User} from 'types';
import {IPanelProps} from 'office-ui-fabric-react';

export interface IUserFormProps extends IPanelProps {
	/**
	 * User to edit
	 */
	user?: User;
}
