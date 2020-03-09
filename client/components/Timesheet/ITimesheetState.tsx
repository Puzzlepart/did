import { ITimesheetData } from "./ITimesheetData";
import { ITimesheetPeriod } from './ITimesheetPeriod';

export type TimesheetView = 'overview' | 'summary' | 'allocation';

export interface ITimesheetState {
    /**
     * Data loading
     */
    loading?: boolean;

    /**
     * The selected view
     */
    selectedView?: TimesheetView;

    /**
     * Period
     */
    period: ITimesheetPeriod;

    /**
     * Is the week confirmed
     */
    isConfirmed?: boolean;

    /**
     * Data
     */
    data?: ITimesheetData;

    /**
     * Errors
     */
    errors?: Error[];
}