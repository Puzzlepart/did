import { ITimesheetState, ITimesheetPeriod } from '../types';

export interface IStatusBarProps {
    /**
     * State of the Timesheet component
     */
    timesheet: ITimesheetState;

    /**
     * Selected period 
     */
    selectedPeriod?: ITimesheetPeriod;

    /**
     * Ignored events
     */
    ignoredEvents: string[];

    /**
     * On clear ignores handler
     */
    onClearIgnores: () => void;
}
