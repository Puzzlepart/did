import { ITimeEntry } from 'interfaces';
import { ITimesheetState } from '../ITimesheetState';

export interface IStatusBarProps {
    /**
     * State of the Timesheet component
     */
    timesheet: ITimesheetState;

    /**
     * Ignored events
     */
    ignoredEvents: string[];

    /**
     * On clear ignores handler
     */
    onClearIgnores: () => void;
}
