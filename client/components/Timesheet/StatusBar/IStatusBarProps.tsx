import { ITimesheetState } from '../types';
import { TimesheetPeriod } from '../TimesheetPeriod';

/**
 * @category Timesheet
 */
export interface IStatusBarProps {
    /**
     * State of the Timesheet component
     */
    timesheet: ITimesheetState;

    /**
     * Selected period 
     */
    selectedPeriod?: TimesheetPeriod;

    /**
     * On clear ignores handler
     */
    onClearIgnores: () => void;
}
