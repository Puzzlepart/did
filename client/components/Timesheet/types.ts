import { TimesheetPeriod } from './TimesheetPeriod';
import { TimesheetScope } from './TimesheetScope';

/**
 * @category Timesheet
 */
export type TimesheetView = 'overview' | 'summary' | 'allocation';

/**
 * @category Timesheet
 */
export interface ITimesheetProps {
    groupHeaderDateFormat?: string;
}

/**
 * @category Timesheet
 */
export interface ITimesheetState {
    /**
     * Data loading
     */
    loading?: boolean;

    /**
     * The selected view/tab
     */
    selectedView?: TimesheetView;

    /**
     * Scope
     */
    scope: TimesheetScope;

    /**
     * Periods
     */
    periods?: TimesheetPeriod[];

    /**
     * Selected period id
     */
    selectedPeriodId?: string;
}