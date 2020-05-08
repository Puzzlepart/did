import * as React from 'react';
import { TimesheetAction } from './TimesheetReducer';
import { ITimesheetState } from './types';

export interface ITimesheetContext {
    dispatch?: React.Dispatch<TimesheetAction>;
    state?: ITimesheetState;
}

export const TimesheetContext = React.createContext<ITimesheetContext>(null);