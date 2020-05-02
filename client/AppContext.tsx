import * as React from 'react';

export interface IAppContext { user?: any; }

export const AppContext = React.createContext<IAppContext>({});
