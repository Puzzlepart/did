import * as moment from 'moment';
import { TimesheetPeriod } from './TimesheetPeriod';

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
    scope: ITimesheetScope;

    /**
     * Periods
     */
    periods?: TimesheetPeriod[];

    /**
     * Selected period id
     */
    selectedPeriodId?: string;
}

/**
 * @category Timesheet
 */
export interface ITimesheetScope {
    startDateTime?: moment.Moment;
    endDateTime?: moment.Moment;
}