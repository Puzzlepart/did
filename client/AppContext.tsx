import { IUser } from 'interfaces/IUser'
import * as React from 'react'

export interface IAppContext {
    /**
     * The currently logged in user
     */
    user?: IUser;

    /**
     * Checks if the currently logged in user has the specified permission
     */
    hasPermission?: (permissionId: string) => boolean;
}

export const AppContext = React.createContext<IAppContext>({})
