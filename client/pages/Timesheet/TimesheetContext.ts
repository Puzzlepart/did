import * as React from 'react';
import { TimesheetAction } from './TimesheetReducer';
import { ITimesheetState } from './types';

export interface ITimesheetContext extends ITimesheetState {
    dispatch?: React.Dispatch<TimesheetAction>;
}

export const TimesheetContext = React.createContext<ITimesheetContext>(null);