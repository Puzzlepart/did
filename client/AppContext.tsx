import { IUser } from 'interfaces/IUser';
import * as React from 'react';

export interface IVersionInfo {
    branch?: string;
    version?: string;
}

export interface IAppContext {
    user?: IUser;
    info?: IVersionInfo;
}

export const AppContext = React.createContext<IAppContext>({});
