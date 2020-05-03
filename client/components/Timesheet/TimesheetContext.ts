import * as React from 'react';
import { TimesheetPeriod } from './TimesheetPeriod';
import { TimesheetScope } from './TimesheetScope';

export const TimesheetContext = React.createContext<{ selectedPeriod?: TimesheetPeriod; loading?: boolean; scope?: TimesheetScope; periods?: TimesheetPeriod[] }>({});