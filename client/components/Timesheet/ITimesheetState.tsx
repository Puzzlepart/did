import { ITimesheetPeriod } from "./ITimesheetPeriod";
import { ITimesheetScope } from './ITimesheetScope';

export type TimesheetView = 'overview' | 'summary' | 'allocation';

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
    periods?: ITimesheetPeriod[];

    /**
     * Selected period
     */
    selectedPeriod?: ITimesheetPeriod;
}