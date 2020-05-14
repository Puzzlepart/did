import * as moment from 'moment';
import { TimesheetPeriod } from './TimesheetPeriod';

export type TimesheetView = 'overview' | 'summary' | 'allocation';

export interface ITimesheetProps {
    groupHeaderDateFormat?: string;
}

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

export interface ITimesheetScope {
    startDateTime?: moment.Moment;
    endDateTime?: moment.Moment;
}