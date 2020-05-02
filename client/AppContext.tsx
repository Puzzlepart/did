import * as React from 'react';

export interface IVersionInfo {
    branch?: string;
}

export interface IAppContext {
    user?: any;
    info?: IVersionInfo;
}

export const AppContext = React.createContext<IAppContext>({});
