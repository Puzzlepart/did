import { IUser } from 'interfaces/IUser';
import * as React from 'react';

export interface IAppContext {
    user?: IUser;
}

export const AppContext = React.createContext<IAppContext>({});
