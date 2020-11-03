import { User } from 'types'
import * as React from 'react'

export interface IAppContext {
    /**
     * The currently logged in user
     */
    user?: User;

    /**
     * Checks if the currently logged in user has the specified permission
     */
    hasPermission?: (permissionId: string) => boolean;

    /**
     * Error
     */
    error?: Error;
}

export const AppContext = React.createContext<IAppContext>({})