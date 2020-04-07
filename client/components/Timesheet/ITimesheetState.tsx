import { ITimesheetData } from "./ITimesheetData";
import { ITimesheetView } from './ITimesheetView';

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
     * View
     */
    view: ITimesheetView;

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