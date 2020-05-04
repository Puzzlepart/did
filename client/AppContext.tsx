import * as React from 'react';

export interface IVersionInfo {
    branch?: string;
    version?: string;
}

export interface IAppContext {
    user?: {
        fullName?: string;
        email?: string;
        role?: string;
        sub?: string;
        userLanguage?: 'en' | 'nb_no';
    };
    info?: IVersionInfo;
}

export const AppContext = React.createContext<IAppContext>({});
