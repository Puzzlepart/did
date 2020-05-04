import * as React from 'react';
import { ITimesheetState } from './types';

export interface ITimesheetContext extends ITimesheetState { dispatch?: React.Dispatch<any> }

export const TimesheetContext = React.createContext<ITimesheetContext>(null);