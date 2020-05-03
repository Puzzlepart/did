import { IProgressIndicatorProps } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { TimesheetPeriod } from './TimesheetPeriod';
import { TimesheetScope } from './TimesheetScope';

/**
 * @category Timesheet
 */
export type TimesheetView = 'overview' | 'summary' | 'allocation';

/**
 * @category Timesheet
 */
export interface ITimesheetState {
    periods: TimesheetPeriod[];
    selectedPeriod: TimesheetPeriod;
    scope: TimesheetScope;
    selectedPeriodId?: string;
    loading?: IProgressIndicatorProps;
}