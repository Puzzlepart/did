import { User } from 'types'
import { createContext } from 'react'

export interface IAppContext {
    /**
     * The currently logged in user
     */
    user: User;

    /**
     * Checks if the currently logged in user has the specified permission
     */
    hasPermission: (permissionId: string) => boolean;

    /**
     * Error
     */
    error?: any;
}

export const AppContext = createContext<IAppContext>(null)