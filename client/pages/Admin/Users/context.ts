import {Role, User} from 'types';
import {createContext} from 'react';

export interface IUsersContext {
	/**
	 * Available roles
	 */
	roles: Role[];

	/**
	 * Registered users
	 */
	users: User[];

	/**
	 * Active Directory users
	 */
	activeDirectoryUsers: User[];
}

export const UsersContext = createContext<IUsersContext>(null);
