import { IUser } from 'interfaces/IUser'
import * as React from 'react'
import { ITheme } from 'office-ui-fabric-react/lib/Styling'

export interface IAppContext {
    user?: IUser;
    theme?: ITheme;
}

export const AppContext = React.createContext<IAppContext>({})
